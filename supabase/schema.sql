-- 1. Bật UUID extension
create extension if not exists "uuid-ossp";

-- 2. Tạo bảng profiles (Liên kết với Auth Users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  role text default 'user' check (role in ('user', 'admin')),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Tạo bảng categories
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Tạo bảng products
create table public.products (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  price numeric not null check (price >= 0),
  original_price numeric check (original_price >= price),
  description text,
  image_urls text[] not null,
  colors text[] default '{}',
  sizes text[] default '{}',
  stock integer default 0 check (stock >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. Tạo bảng addresses
create table public.addresses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  recipient_name text not null,
  recipient_phone text not null,
  address_detail text not null,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 6. Tạo bảng cart_items
create table public.cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  quantity integer not null default 1 check (quantity > 0),
  color text,
  size text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, product_id, color, size)
);

-- 7. Tạo bảng orders
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  order_code bigint not null unique, -- Dùng bigint để tương thích với payOS
  recipient_name text not null,
  recipient_phone text not null,
  shipping_address text not null,
  shipping_method text not null default 'standard',
  shipping_fee numeric not null default 30000,
  payment_method text not null check (payment_method in ('cod', 'payos')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  order_status text not null default 'pending' check (order_status in ('pending', 'preparing', 'shipping', 'delivered', 'cancelled')),
  subtotal numeric not null check (subtotal >= 0),
  total numeric not null check (total >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 8. Tạo bảng order_items
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  quantity integer not null check (quantity > 0),
  price numeric not null check (price >= 0),
  color text,
  size text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 9. Tạo bảng payments (Tích hợp thông tin giao dịch)
create table public.payments (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  payment_gateway text not null, -- 'payos' hoặc 'cod'
  transaction_id text, -- mã giao dịch bên payOS
  amount numeric not null,
  status text not null, -- e.g., 'pending', 'completed', 'failed'
  payos_order_code bigint unique,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 10. Tạo trigger tự động thêm profile khi có user mới đăng ký
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone', 'user');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
