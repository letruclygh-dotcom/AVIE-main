import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabaseClient";

type OrderTab = "all" | "pending" | "preparing" | "shipping" | "delivered" | "cancelled";

const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDL2jCIqw8BEpkrE79bfxIWss5TaiX9SVcBOxJjCu-ldSXuMTW-Hk-SS2M0ULJCgnenVS7WFimJ94pvMvYsgBJPgwCw7qALwJr6OiAqWc12cB5JbqVH-JQJRp01snyWl2j2V6iYwzS2Xgav6328MTzP6sytgrROqK47OW8M3Hgm1urFK49LfSfgWEFhp7bwA9gklKgI5JD-phr4yCgBqpL1D3JfnbTaBTtTmGKiSY9FmuxfsN0K75QpfUWjZ5V08PJMCJwt4o5ZZ9_h-h0";

const TABS: { id: OrderTab; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "pending", label: "Chờ xác nhận" },
  { id: "preparing", label: "Chờ lấy hàng" },
  { id: "shipping", label: "Đang giao" },
  { id: "delivered", label: "Đã giao" },
  { id: "cancelled", label: "Đã huỷ" },
];

function tabClass(active: boolean) {
  return active
    ? "px-4 py-1 text-secondary font-label-md text-label-md relative after:absolute after:bottom-[-12px] after:left-0 after:w-full after:h-[2px] after:bg-secondary"
    : "px-4 py-1 text-on-surface-variant font-label-md text-label-md hover:opacity-80";
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<OrderTab>("all");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        setLoading(false);
        return;
      }
      fetchUserOrders();
    }
  }, [user, authLoading]);

  const fetchUserOrders = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*, products(*))")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Lỗi fetch đơn hàng:", error.message);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const handleCancelOrder = async (orderId: string, orderCode: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng #${orderCode}?`)) {
      const { error } = await supabase
        .from("orders")
        .update({ order_status: "cancelled" })
        .eq("id", orderId);

      if (error) {
        alert("Lỗi khi hủy đơn hàng: " + error.message);
      } else {
        alert(`Đơn hàng #${orderCode} đã được hủy thành công.`);
        fetchUserOrders();
      }
    }
  };

  const handleBuyAgain = async (items: any[]) => {
    if (!user) return;
    try {
      for (const item of items) {
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: item.product_id,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        });
      }
      alert("Đã thêm lại các sản phẩm vào giỏ hàng!");
      navigate("/thanh-toan");
    } catch (err: any) {
      alert("Lỗi mua lại đơn hàng: " + err.message);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.order_status === activeTab;
  });

  if (authLoading) {
    return (
      <div className="bg-background text-on-surface min-h-screen flex items-center justify-center">
        <span className="animate-spin material-symbols-outlined text-4xl text-primary">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="orders-page bg-background text-on-background min-h-screen flex flex-col pb-20">
      {/* TopAppBar */}
      <header className="sticky top-0 bg-surface border-b border-outline-variant flex items-center px-container-padding w-full h-16 z-40 justify-between">
        <div className="flex items-center w-12 justify-start">
          <button
            type="button"
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 transition-transform"
            onClick={() => navigate("/tim-kiem")}
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
        <h1 className="absolute left-1/2 -translate-x-1/2 font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary w-max flex items-center justify-center">
          <img alt="AoVie Logo" className="object-contain mx-auto h-8" src={LOGO_SRC} />
        </h1>
        <div className="flex items-center gap-4 justify-end">
          <button
            type="button"
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 transition-transform"
            onClick={() => navigate("/thanh-toan")}
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-surface sticky top-16 z-30 overflow-x-auto border-b border-outline-variant no-scrollbar">
        <div className="flex whitespace-nowrap px-container-padding py-3">
          {TABS.map((tab) => (
            <button key={tab.id} type="button" className={tabClass(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-container-padding space-y-4 mb-20 max-w-2xl mx-auto w-full">
        {!user ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: "64px" }}>
              lock
            </span>
            <p className="font-body-lg text-on-surface-variant">Vui lòng đăng nhập để xem đơn hàng của bạn.</p>
            <button onClick={() => navigate("/dang-nhap")} className="bg-primary text-white px-6 py-2 rounded font-bold uppercase text-xs">
              Đăng nhập ngay
            </button>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <span className="animate-spin material-symbols-outlined text-3xl text-primary">progress_activity</span>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-outline-variant mb-4" style={{ fontSize: "64px" }}>
              shopping_bag
            </span>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Không có đơn hàng nào trong trạng thái này.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredOrders.map((order) => {
              const firstItem = order.order_items?.[0];
              const firstItemProduct = firstItem?.products;
              const img = firstItemProduct?.image_urls?.[0] || "https://placehold.co/100?text=AoVie";
              const title = firstItemProduct?.name || "Sản phẩm AoVie";
              const count = order.order_items?.length || 0;

              return (
                <article key={order.id} className="bg-surface-container rounded-lg border border-outline-variant overflow-hidden p-4 flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                    <span className="font-label-md text-label-md text-on-surface-variant">MÃ ĐƠN: #{order.order_code}</span>
                    <span className="font-label-md text-label-md text-secondary font-bold tracking-wider uppercase">
                      {order.order_status === "pending" && "CHỜ XÁC NHẬN"}
                      {order.order_status === "preparing" && "CHỜ LẤY HÀNG"}
                      {order.order_status === "shipping" && "ĐANG GIAO HÀNG"}
                      {order.order_status === "delivered" && "ĐÃ GIAO HÀNG"}
                      {order.order_status === "cancelled" && "ĐÃ HỦY"}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <img alt={title} className="w-20 h-24 object-cover rounded border border-outline-variant" src={img} />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-body-md text-body-md font-bold text-on-surface line-clamp-1">{title}</h3>
                        {count > 1 && (
                          <p className="text-xs text-on-surface-variant mt-0.5">và {count - 1} sản phẩm khác</p>
                        )}
                        <p className="text-xs text-on-surface-variant mt-1">
                          Thanh toán: <span className="uppercase font-bold">{order.payment_method}</span> ({order.payment_status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"})
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-body-md text-body-md text-secondary font-semibold">
                          {Number(order.total).toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-outline-variant flex justify-between items-center gap-3">
                    <div className="text-xs text-on-surface-variant">
                      {new Date(order.created_at).toLocaleDateString("vi-VN")}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => navigate("/chi-tiet-don-hang", { state: { orderId: order.id } })}
                        className="border border-primary text-primary px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider"
                      >
                        Chi tiết
                      </button>

                      {order.order_status === "pending" && (
                        <button
                          type="button"
                          onClick={() => handleCancelOrder(order.id, order.order_code)}
                          className="bg-primary text-white px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider"
                        >
                          Hủy đơn
                        </button>
                      )}

                      {(order.order_status === "delivered" || order.order_status === "cancelled") && (
                        <button
                          type="button"
                          onClick={() => handleBuyAgain(order.order_items)}
                          className="bg-secondary text-white px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider"
                        >
                          Mua lại
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-gutter bg-surface border-t border-outline-variant z-50">
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors py-1 flex-1"
          to="/trang-chu"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-md text-label-md">Trang chủ</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors py-1 flex-1"
          to="/danh-muc"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-label-md">Danh mục</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-secondary py-1 flex-1 transition-colors hover:bg-surface-container-low relative"
          to="/don-hang"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            receipt_long
          </span>
          <span className="font-label-md text-label-md">Đơn hàng</span>
          <div className="absolute bottom-0 w-1 h-1 bg-secondary rounded-full"></div>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors py-1 flex-1"
          to="/thong-bao"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-label-md text-label-md">Thông báo</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors py-1 flex-1"
          to="/toi"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-md text-label-md">Tôi</span>
        </Link>
      </nav>
    </div>
  );
}
