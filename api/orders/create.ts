import { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(455).json({ error: "Method not allowed" });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: "Server configuration missing: Supabase keys not set." });
  }

  // Khởi tạo Supabase Admin Client (được quyền bypass RLS)
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
  });

  // 1. Xác thực người dùng qua Access Token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing auth token." });
  }

  const token = authHeader.split(" ")[1];
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: "Unauthorized: Invalid token. " + (authError?.message || "") });
  }

  const { recipientName, recipientPhone, shippingAddress, shippingMethod, paymentMethod } = req.body;

  if (!recipientName || !recipientPhone || !shippingAddress || !paymentMethod) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // 2. Lấy giỏ hàng của user
    const { data: cartItems, error: cartError } = await supabaseAdmin
      .from("cart_items")
      .select("*, products(*)")
      .eq("user_id", user.id);

    if (cartError) {
      return res.status(500).json({ error: "Error loading cart items: " + cartError.message });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty." });
    }

    // 3. Tính toán tổng tiền & Kiểm tra stock trên server
    let subtotal = 0;
    const itemsToInsert = [];
    const stockUpdates = [];

    for (const item of cartItems) {
      const product = item.products;
      if (!product) {
        return res.status(400).json({ error: `Product not found for cart item.` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Sản phẩm "${product.name}" không đủ số lượng trong kho. Chỉ còn lại ${product.stock} cái.`
        });
      }

      const price = Number(product.price);
      subtotal += price * item.quantity;

      itemsToInsert.push({
        product_id: product.id,
        quantity: item.quantity,
        price: price,
        color: item.color,
        size: item.size
      });

      stockUpdates.push({
        id: product.id,
        newStock: product.stock - item.quantity
      });
    }

    const shippingFee = 30000; // Phí ship cố định
    const total = subtotal + shippingFee;

    // Sinh mã đơn hàng dạng bigint ngẫu nhiên (tối đa 15 chữ số) để khớp với payOS
    // Sử dụng timestamp kết hợp số ngẫu nhiên 4 chữ số
    const timestampStr = Date.now().toString().slice(-10); // Lấy 10 chữ số cuối của timestamp
    const randStr = Math.floor(1000 + Math.random() * 9000).toString(); // Sinh 4 chữ số ngẫu nhiên
    const orderCode = BigInt(timestampStr + randStr);

    // 4. Bắt đầu transaction chèn dữ liệu (sử dụng các API đơn lẻ tuần tự)
    // Tạo record Order
    const { data: newOrder, error: orderInsertError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: user.id,
        order_code: orderCode.toString(), // Supabase chấp nhận chuỗi số cho cột bigint
        recipient_name: recipientName.trim(),
        recipient_phone: recipientPhone.trim(),
        shipping_address: shippingAddress.trim(),
        shipping_method: shippingMethod || "standard",
        shipping_fee: shippingFee,
        payment_method: paymentMethod,
        payment_status: "pending",
        order_status: "pending",
        subtotal: subtotal,
        total: total
      })
      .select()
      .single();

    if (orderInsertError || !newOrder) {
      return res.status(500).json({ error: "Failed to create order: " + (orderInsertError?.message || "") });
    }

    // Tạo các record Order Items
    const orderItemsPayload = itemsToInsert.map(item => ({
      ...item,
      order_id: newOrder.id
    }));

    const { error: itemsInsertError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItemsPayload);

    if (itemsInsertError) {
      // Rollback order bằng cách xoá
      await supabaseAdmin.from("orders").delete().eq("id", newOrder.id);
      return res.status(500).json({ error: "Failed to save order items: " + itemsInsertError.message });
    }

    // Cập nhật stock cho từng sản phẩm
    for (const update of stockUpdates) {
      const { error: stockErr } = await supabaseAdmin
        .from("products")
        .update({ stock: update.newStock })
        .eq("id", update.id);
      
      if (stockErr) {
        console.error("Lỗi cập nhật stock sản phẩm:", update.id, stockErr.message);
        // Ở đây trong production thực tế nên có cơ chế rollback, tạm thời log error
      }
    }

    // Xoá giỏ hàng sau khi đặt thành công
    const { error: cartDeleteError } = await supabaseAdmin
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (cartDeleteError) {
      console.error("Lỗi xoá giỏ hàng sau checkout:", cartDeleteError.message);
    }

    // Trả về kết quả
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      orderId: newOrder.id,
      orderCode: orderCode.toString(),
      total: total
    });

  } catch (err: any) {
    return res.status(500).json({ error: err.message || "An unexpected error occurred." });
  }
}
