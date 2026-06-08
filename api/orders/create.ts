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
    const { data, error } = await supabaseAdmin.rpc("create_order_from_cart", {
      p_user_id: user.id,
      p_recipient_name: recipientName,
      p_recipient_phone: recipientPhone,
      p_shipping_address: shippingAddress,
      p_shipping_method: shippingMethod || "standard",
      p_payment_method: paymentMethod,
    });

    if (error || !data || data.length === 0) {
      return res.status(500).json({ error: error?.message || "Failed to create order." });
    }

    const [result] = data;

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      orderId: result.order_id,
      orderCode: String(result.order_code),
      total: Number(result.total),
    });

  } catch (err: any) {
    return res.status(500).json({ error: err.message || "An unexpected error occurred." });
  }
}
