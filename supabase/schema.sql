create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  role text not null default 'user' check (role in ('user', 'admin')),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  price numeric not null check (price >= 0),
  original_price numeric check (original_price is null or original_price >= price),
  description text,
  image_urls text[] not null default '{}',
  colors text[] not null default '{}',
  sizes text[] not null default '{}',
  stock integer not null default 0 check (stock >= 0),
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.addresses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  recipient_name text not null,
  recipient_phone text not null,
  address_detail text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  quantity integer not null default 1 check (quantity > 0),
  color text not null default '',
  size text not null default '',
  created_at timestamptz not null default timezone('utc'::text, now()),
  unique(user_id, product_id, color, size)
);

create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  order_code bigint not null unique,
  recipient_name text not null,
  recipient_phone text not null,
  shipping_address text not null,
  shipping_method text not null default 'standard',
  shipping_fee numeric not null default 30000 check (shipping_fee >= 0),
  payment_method text not null check (payment_method in ('cod', 'payos')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  order_status text not null default 'pending' check (order_status in ('pending', 'preparing', 'shipping', 'delivered', 'cancelled')),
  subtotal numeric not null check (subtotal >= 0),
  total numeric not null check (total >= 0),
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  quantity integer not null check (quantity > 0),
  price numeric not null check (price >= 0),
  color text not null default '',
  size text not null default '',
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  payment_gateway text not null check (payment_gateway in ('cod', 'payos')),
  transaction_id text,
  amount numeric not null check (amount >= 0),
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed')),
  payos_order_code bigint unique,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists categories_slug_idx on public.categories(slug);
create index if not exists products_slug_idx on public.products(slug);
create index if not exists cart_items_user_id_idx on public.cart_items(user_id);
create index if not exists addresses_user_id_idx on public.addresses(user_id);
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists payments_order_id_idx on public.payments(order_id);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    'user'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create or replace function public.create_order_from_cart(
  p_user_id uuid,
  p_recipient_name text,
  p_recipient_phone text,
  p_shipping_address text,
  p_shipping_method text default 'standard',
  p_payment_method text default 'cod'
)
returns table (
  order_id uuid,
  order_code bigint,
  subtotal numeric,
  shipping_fee numeric,
  total numeric
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid;
  v_order_code bigint;
  v_subtotal numeric := 0;
  v_shipping_fee numeric := 30000;
  v_total numeric := 0;
  v_item record;
begin
  if p_user_id is null then
    raise exception 'User is required';
  end if;

  if coalesce(trim(p_recipient_name), '') = '' then
    raise exception 'Recipient name is required';
  end if;

  if coalesce(trim(p_recipient_phone), '') = '' then
    raise exception 'Recipient phone is required';
  end if;

  if coalesce(trim(p_shipping_address), '') = '' then
    raise exception 'Shipping address is required';
  end if;

  if p_payment_method not in ('cod', 'payos') then
    raise exception 'Unsupported payment method';
  end if;

  if not exists (
    select 1
    from public.cart_items
    where user_id = p_user_id
  ) then
    raise exception 'Cart is empty';
  end if;

  for v_item in
    select
      ci.id,
      ci.product_id,
      ci.quantity,
      ci.color,
      ci.size,
      p.name as product_name,
      p.price,
      p.stock
    from public.cart_items ci
    join public.products p on p.id = ci.product_id
    where ci.user_id = p_user_id
    order by ci.created_at
    for update of ci, p
  loop
    if v_item.stock < v_item.quantity then
      raise exception 'Sản phẩm "%" không đủ số lượng trong kho. Chỉ còn % cái.', v_item.product_name, v_item.stock;
    end if;

    v_subtotal := v_subtotal + (v_item.price * v_item.quantity);
  end loop;

  v_total := v_subtotal + v_shipping_fee;
  v_order_code := ((extract(epoch from clock_timestamp())::bigint % 10000000000) * 10000)
    + floor(random() * 9000 + 1000)::bigint;

  insert into public.orders (
    user_id,
    order_code,
    recipient_name,
    recipient_phone,
    shipping_address,
    shipping_method,
    shipping_fee,
    payment_method,
    payment_status,
    order_status,
    subtotal,
    total
  )
  values (
    p_user_id,
    v_order_code,
    trim(p_recipient_name),
    trim(p_recipient_phone),
    trim(p_shipping_address),
    coalesce(nullif(trim(p_shipping_method), ''), 'standard'),
    v_shipping_fee,
    p_payment_method,
    'pending',
    'pending',
    v_subtotal,
    v_total
  )
  returning id into v_order_id;

  insert into public.order_items (
    order_id,
    product_id,
    quantity,
    price,
    color,
    size
  )
  select
    v_order_id,
    ci.product_id,
    ci.quantity,
    p.price,
    ci.color,
    ci.size
  from public.cart_items ci
  join public.products p on p.id = ci.product_id
  where ci.user_id = p_user_id;

  update public.products p
  set stock = p.stock - ci.quantity
  from public.cart_items ci
  where ci.user_id = p_user_id
    and p.id = ci.product_id;

  insert into public.payments (
    order_id,
    payment_gateway,
    amount,
    status,
    payos_order_code
  )
  values (
    v_order_id,
    p_payment_method,
    v_total,
    case when p_payment_method = 'cod' then 'pending' else 'pending' end,
    case when p_payment_method = 'payos' then v_order_code else null end
  );

  delete from public.cart_items
  where user_id = p_user_id;

  return query
  select v_order_id, v_order_code, v_subtotal, v_shipping_fee, v_total;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.addresses enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.categories to anon, authenticated;
grant select on public.products to anon, authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.addresses to authenticated;
grant select, insert, update, delete on public.cart_items to authenticated;
grant select, update on public.orders to authenticated;
grant select on public.order_items to authenticated;
grant select on public.payments to authenticated;
grant execute on function public.create_order_from_cart(uuid, text, text, text, text, text) to authenticated;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid() and role = 'user');

drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all"
on public.profiles for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read"
on public.categories for select
using (true);

drop policy if exists "categories_admin_all" on public.categories;
create policy "categories_admin_all"
on public.categories for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
on public.products for select
using (true);

drop policy if exists "products_admin_all" on public.products;
create policy "products_admin_all"
on public.products for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "addresses_own_all" on public.addresses;
create policy "addresses_own_all"
on public.addresses for all
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "cart_items_own_all" on public.cart_items;
create policy "cart_items_own_all"
on public.cart_items for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "cart_items_admin_read" on public.cart_items;
create policy "cart_items_admin_read"
on public.cart_items for select
using (public.is_admin());

drop policy if exists "orders_select_own_or_admin" on public.orders;
create policy "orders_select_own_or_admin"
on public.orders for select
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "orders_user_cancel_own_pending" on public.orders;
create policy "orders_user_cancel_own_pending"
on public.orders for update
using (user_id = auth.uid() and order_status = 'pending')
with check (user_id = auth.uid() and order_status = 'cancelled');

drop policy if exists "orders_admin_all" on public.orders;
create policy "orders_admin_all"
on public.orders for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "order_items_select_own_or_admin" on public.order_items;
create policy "order_items_select_own_or_admin"
on public.order_items for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);

drop policy if exists "order_items_admin_all" on public.order_items;
create policy "order_items_admin_all"
on public.order_items for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "payments_select_own_or_admin" on public.payments;
create policy "payments_select_own_or_admin"
on public.payments for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.orders
    where orders.id = payments.order_id
      and orders.user_id = auth.uid()
  )
);

drop policy if exists "payments_admin_all" on public.payments;
create policy "payments_admin_all"
on public.payments for all
using (public.is_admin())
with check (public.is_admin());
