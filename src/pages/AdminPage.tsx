import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabaseClient";

type AdminTab = "orders" | "products";

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("orders");
  
  // States quản lý đơn hàng
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  
  // States quản lý sản phẩm
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // 1. Kiểm tra quyền Admin
  useEffect(() => {
    if (!loading) {
      if (!user) {
        alert("Vui lòng đăng nhập!");
        navigate("/dang-nhap");
        return;
      }
      if (profile?.role !== "admin") {
        alert("Bạn không có quyền truy cập trang quản trị!");
        navigate("/trang-chu");
      }
    }
  }, [user, profile, loading, navigate]);

  // Load Đơn hàng
  useEffect(() => {
    if (profile?.role === "admin" && activeTab === "orders") {
      fetchOrders();
    }
  }, [profile, activeTab]);

  // Load Sản phẩm
  useEffect(() => {
    if (profile?.role === "admin" && activeTab === "products") {
      fetchProducts();
    }
  }, [profile, activeTab]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*, products(*))")
      .order("created_at", { ascending: false });
    
    if (error) {
      alert("Lỗi tải đơn hàng: " + error.message);
    } else {
      setOrders(data || []);
    }
    setOrdersLoading(false);
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("name", { ascending: true });
    
    if (error) {
      alert("Lỗi tải sản phẩm: " + error.message);
    } else {
      setProducts(data || []);
    }
    setProductsLoading(false);
  };

  // Cập nhật trạng thái đơn hàng
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ order_status: status })
      .eq("id", orderId);
    
    if (error) {
      alert("Lỗi cập nhật: " + error.message);
    } else {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, order_status: status } : o))
      );
    }
  };

  // Cập nhật trạng thái thanh toán
  const handleUpdatePaymentStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ payment_status: status })
      .eq("id", orderId);
    
    if (error) {
      alert("Lỗi cập nhật: " + error.message);
    } else {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, payment_status: status } : o))
      );
    }
  };

  // Cập nhật số lượng kho nhanh
  const handleUpdateStock = async (productId: string, currentStock: number, change: number) => {
    const newStock = Math.max(0, currentStock + change);
    const { error } = await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", productId);
    
    if (error) {
      alert("Lỗi cập nhật kho: " + error.message);
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
      );
    }
  };

  if (loading || profile?.role !== "admin") {
    return (
      <div className="bg-background text-on-surface min-h-screen flex items-center justify-center">
        <span className="animate-spin material-symbols-outlined text-4xl text-primary">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface min-h-screen pb-24 font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            onClick={() => navigate("/trang-chu")}
            className="hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center text-primary"
          >
            <span className="material-symbols-outlined">home</span>
          </button>
          <h1 className="font-headline-md text-primary uppercase tracking-wide">
            Quản Trị AOVIE
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-20 px-container-padding max-w-screen-lg mx-auto relative z-10 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-outline-variant">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-4 font-bold text-sm uppercase tracking-wider ${
              activeTab === "orders" ? "border-b-2 border-primary text-primary" : "text-on-surface-variant/60"
            }`}
          >
            Đơn hàng ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 py-4 font-bold text-sm uppercase tracking-wider ${
              activeTab === "products" ? "border-b-2 border-primary text-primary" : "text-on-surface-variant/60"
            }`}
          >
            Sản phẩm ({products.length})
          </button>
        </div>

        {/* Tab content: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {ordersLoading ? (
              <div className="text-center py-12">
                <span className="animate-spin material-symbols-outlined text-3xl text-primary">progress_activity</span>
              </div>
            ) : orders.length === 0 ? (
              <p className="text-center py-12 text-on-surface-variant">Chưa có đơn hàng nào.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="p-5 bg-surface-container rounded-xl border border-outline-variant space-y-4 text-xs">
                  {/* Mã đơn & Ngày */}
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                    <span className="font-bold text-sm text-primary">ĐƠN HÀNG: #{order.order_code}</span>
                    <span className="text-on-surface-variant">{new Date(order.created_at).toLocaleString("vi-VN")}</span>
                  </div>

                  {/* Thông tin khách hàng */}
                  <div className="grid grid-cols-2 gap-2 text-on-surface-variant">
                    <p><span className="font-bold text-on-surface">Khách:</span> {order.recipient_name}</p>
                    <p><span className="font-bold text-on-surface">SĐT:</span> {order.recipient_phone}</p>
                    <p className="col-span-2"><span className="font-bold text-on-surface">Địa chỉ:</span> {order.shipping_address}</p>
                  </div>

                  {/* Items */}
                  <div className="bg-surface p-3 rounded border border-outline-variant/30 space-y-2">
                    {order.order_items?.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center text-[11px]">
                        <span>
                          {item.products?.name} (Màu: {item.color || "K"}, Size: {item.size || "K"}) x {item.quantity}
                        </span>
                        <span className="font-bold">{Number(item.price).toLocaleString("vi-VN")}đ</span>
                      </div>
                    ))}
                  </div>

                  {/* Thanh toán & Giao hàng */}
                  <div className="flex justify-between items-center flex-wrap gap-2 text-[11px]">
                    <div>
                      <p>Thanh toán: <span className="font-bold uppercase text-secondary">{order.payment_method}</span></p>
                      <p>Tổng tiền: <span className="font-bold text-sm text-secondary">{Number(order.total).toLocaleString("vi-VN")}đ</span></p>
                    </div>

                    <div className="flex gap-3">
                      {/* Cập nhật thanh toán */}
                      <div className="flex flex-col gap-1">
                        <label className="font-bold">Thanh toán:</label>
                        <select
                          value={order.payment_status}
                          onChange={(e) => handleUpdatePaymentStatus(order.id, e.target.value)}
                          className="bg-surface border border-outline-variant rounded p-1 text-[11px]"
                        >
                          <option value="pending">Chờ xử lý</option>
                          <option value="paid">Đã thanh toán</option>
                          <option value="failed">Thanh toán lỗi</option>
                        </select>
                      </div>

                      {/* Cập nhật đơn hàng */}
                      <div className="flex flex-col gap-1">
                        <label className="font-bold">Đơn hàng:</label>
                        <select
                          value={order.order_status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-surface border border-outline-variant rounded p-1 text-[11px]"
                        >
                          <option value="pending">Chờ xác nhận</option>
                          <option value="preparing">Chờ lấy hàng</option>
                          <option value="shipping">Đang giao hàng</option>
                          <option value="delivered">Đã giao hàng</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab content: Products */}
        {activeTab === "products" && (
          <div className="space-y-3">
            {productsLoading ? (
              <div className="text-center py-12">
                <span className="animate-spin material-symbols-outlined text-3xl text-primary">progress_activity</span>
              </div>
            ) : products.length === 0 ? (
              <p className="text-center py-12 text-on-surface-variant">Chưa có sản phẩm nào.</p>
            ) : (
              <div className="bg-surface-container rounded-xl border border-outline-variant overflow-hidden">
                <div className="divide-y divide-outline-variant">
                  {products.map((prod) => {
                    const img = prod.image_urls && prod.image_urls.length > 0 ? prod.image_urls[0] : "https://placehold.co/100?text=AoVie";
                    return (
                      <div key={prod.id} className="p-4 flex justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                          <img src={img} alt={prod.name} className="w-12 h-14 object-cover rounded border" />
                          <div>
                            <h3 className="font-bold text-sm line-clamp-1">{prod.name}</h3>
                            <p className="text-xs text-secondary font-bold mt-1">
                              {Number(prod.price).toLocaleString("vi-VN")}đ
                            </p>
                          </div>
                        </div>

                        {/* Quản lý stock */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-on-surface-variant mr-1">Kho:</span>
                          <div className="flex items-center border border-outline-variant rounded bg-surface">
                            <button
                              type="button"
                              onClick={() => handleUpdateStock(prod.id, prod.stock, -5)}
                              className="w-8 h-8 flex items-center justify-center font-bold text-xs hover:bg-surface-container-low"
                              title="-5"
                            >
                              -5
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateStock(prod.id, prod.stock, -1)}
                              className="w-8 h-8 flex items-center justify-center font-bold text-sm hover:bg-surface-container-low"
                              title="-1"
                            >
                              -
                            </button>
                            <span className="px-3 text-sm font-bold w-12 text-center">{prod.stock}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateStock(prod.id, prod.stock, 1)}
                              className="w-8 h-8 flex items-center justify-center font-bold text-sm hover:bg-surface-container-low"
                              title="+1"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateStock(prod.id, prod.stock, 5)}
                              className="w-8 h-8 flex items-center justify-center font-bold text-xs hover:bg-surface-container-low"
                              title="+5"
                            >
                              +5
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
