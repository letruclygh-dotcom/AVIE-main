import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

type OrderTab = "all" | "pending" | "preparing" | "shipping" | "delivered" | "cancelled";

interface OrderItem {
  id: string;
  code: string;
  price: string;
  imageSrc: string;
  title: string;
  details: string;
  quantity: string;
  itemCount: string;
  status: OrderTab;
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<OrderTab>("shipping");

  const tabs = [
    { id: "all" as OrderTab, label: "Tất cả" },
    { id: "pending" as OrderTab, label: "Chờ xác nhận" },
    { id: "preparing" as OrderTab, label: "Chờ lấy hàng" },
    { id: "shipping" as OrderTab, label: "Đang giao" },
    { id: "delivered" as OrderTab, label: "Đã giao" },
    { id: "cancelled" as OrderTab, label: "Đã hủy" },
  ];

  const initialOrders: OrderItem[] = [
    // Đơn chờ xác nhận
    {
      id: "o1",
      code: "AV2409101",
      price: "225.000đ",
      imageSrc: "https://i.ibb.co/PG3p6wTs/6.png",
      title: 'Áo Thun Unisex - 100% COTTON - "Bánh Mì"',
      details: "Phân loại: Kem / Size L",
      quantity: "x1",
      itemCount: "1 sản phẩm",
      status: "pending",
    },
    {
      id: "o2",
      code: "AV2409102",
      price: "225.000đ",
      imageSrc: "https://i.ibb.co/zhP9w9gz/10.png",
      title: 'Áo Thun Unisex - 100% COTTON - "Nón Lá"',
      details: "Phân loại: Đen Than / Standard",
      quantity: "x1",
      itemCount: "1 sản phẩm",
      status: "pending",
    },
    {
      id: "o3",
      code: "AV2409105",
      price: "225.000đ",
      imageSrc: "https://i.ibb.co/hxBR2WM3/3.png",
      title: 'Áo Thun Unisex - 100% Cotton - "Độc Lập"',
      details: "Phân loại: Đất Sét / Size XL",
      quantity: "x2",
      itemCount: "2 sản phẩm",
      status: "pending",
    },
    // Đơn đang giao
    {
      id: "s1",
      code: "AV29481",
      price: "225.000đ",
      imageSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCiJIQaGt2qAJBXqi9b_U8QojMAoLzAo4IX3t8BWkDbu_2Hz-XxPYi0e0LdwgMTrQ8Bjx2rfbZCI8Ft3qeFoxfGD0dEwuuU-Nau_WfxKd5Ngs9e4sE5gBDA4uyPco03tKGLhvMk_N2PmsNjk7RcXo1UYHiVYiFttY2cZ0BrfajFsosG-fYl19jMq-6XribpeSxXRuNzX3CAvEOgCuw8XP9CgrOmMNtmc-N4hc6IQwMRLGVGz0F7jjaCGu97wfeeA7MZc7jqqG4WF69MWoU",
      title: 'Áo Thun Unisex - 100% COTTON - "Bánh Mì"',
      details: "Màu sắc: Đen",
      quantity: "x1",
      itemCount: "1 sản phẩm",
      status: "shipping",
    },
    {
      id: "s2",
      code: "AV29512",
      price: "225.000đ",
      imageSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCtx3QYLWai7nh-3-uanIMKyCBuno4Gnj81DYo1lHPN5V3weL-Ndi8G3EZslj4mrc3uqO0Cni-GQLDg6Ew8_4eCc5bWhMIeT8tHf7vlj9Mk5-8LPNbhx7CuLjtkebXf_KKdcu32KwKQSQrylLKG9cQSUWyHdekcaHTYtOMjOpMPnrPfAXV9VEUDTvISmfsdupJRk_VjtxE_mt7ixZ9G1zk14SsH1zysH4F527JfhO5uZSI7HoMM_Kkrrt97rFvuhOoaDgCFzXWGsGSaIps",
      title: 'Áo Thun Unisex - 100% COTTON - "Nón Lá"',
      details: "Màu sắc: Hồng",
      quantity: "x1",
      itemCount: "1 sản phẩm",
      status: "shipping",
    },
    {
      id: "s3",
      code: "AV29600",
      price: "59.000đ",
      imageSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD25mSR0nab7psgUQ0fY-zvj7omQGoi03Y13rI1C2U5oKECYTcbYd6E0sWp-FZXKt2gMgVadife9DEnNoRf60Fp2R3BUrE67hJQHtrs1_LTkmah7nkEqASqApP9wlxY1Vo7AuRJAA2TQQcEGvyV7ZLEGlZVgOYtP3M7Vg62Ooy--lzZe6AEJO8fdaj3picqldskAv6GyLDnRalIKc8rUoEENHdS1kDcN9XRSB2AVwF4vubrOYR7Qb38MLoimyVERTOOF6QVdK3xDW2ue4s",
      title: "Túi Tote Canvas In Hình Việt Nam",
      details: "",
      quantity: "x1",
      itemCount: "1 sản phẩm",
      status: "shipping",
    },
  ];

  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);

  const handleCancelOrder = (id: string, code: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng #${code}?`)) {
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status: "cancelled" } : order))
      );
      alert(`Đơn hàng #${code} đã được hủy.`);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  const statusLabel: Record<OrderTab, string> = {
    all: "",
    pending: "CHỜ XÁC NHẬN",
    preparing: "CHỜ LẤY HÀNG",
    shipping: "ĐANG GIAO",
    delivered: "ĐÃ GIAO",
    cancelled: "ĐÃ HỦY",
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans relative antialiased select-none pb-20">
      <GrainTexture />

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            onClick={() => alert("Chức năng tìm kiếm đơn hàng...")}
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">search</span>
          </button>

          {/* Centered Logo */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwh7yrVOTAGqdin7eM3AB4NddGwgjYXL0uhlU42-nMJtT8DcJWGpytyfED7UrfmS1t9lZdxw-Cqo3LHuonO7XGT5z_H-k3cyhDp1_OwRFpdibfhlSCsQHVcVJrQPBc_dUfLsaoXk_vqTqGSMbCuucwee8nfTKTlaBfU4WkODCqwFEo3NVR7_-uJSjWKVR4foLaMGo4e_LHNpR52KFpQElMTzFPIiCy93mAFN3P7krJ4-npb2ftHMKuecPr0PvE2gcZHGxHDVLVzxlfhVvw"
            alt="AoVie Logo"
            className="h-7 w-auto object-contain"
          />

          <button
            onClick={() => navigate("/thanh-toan")}
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16 pb-20 relative z-10">
        {/* Sticky Order Tabs */}
        <div className="sticky top-16 z-40 bg-surface border-b border-outline-variant overflow-x-auto hide-scrollbar">
          <nav className="flex px-4 min-w-max h-12 items-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-label-md text-label-md uppercase tracking-wider whitespace-nowrap font-sans h-full flex items-center px-4 transition-all ${
                    isActive
                      ? "text-secondary border-b-2 border-secondary font-bold"
                      : "text-on-surface-variant hover:text-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Order List */}
        <div className="p-4 space-y-4 max-w-2xl mx-auto">
          {filteredOrders.length === 0 ? (
            <div className="pt-20 flex flex-col items-center opacity-30 select-none">
              <span className="material-symbols-outlined text-6xl mb-2">shopping_bag</span>
              <p className="font-label-md text-label-md uppercase font-sans">
                Không có đơn hàng nào
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <article
                key={order.id}
                className="bg-surface-container rounded-lg border border-outline-variant overflow-hidden"
              >
                <div className="p-4 flex flex-col gap-4">
                  {/* Order Header */}
                  <div className="flex justify-between items-center">
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      MÃ ĐƠN: #{order.code}
                    </span>
                    <span className="font-label-md text-label-md text-secondary font-bold tracking-wider">
                      {statusLabel[order.status]}
                    </span>
                  </div>

                  {/* Product Row */}
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-surface-container-highest rounded border border-outline-variant flex-shrink-0 overflow-hidden">
                      <img
                        alt={order.title}
                        className="w-full h-full object-cover"
                        src={order.imageSrc}
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-body-md text-body-md font-bold text-on-surface">
                          {order.title}
                        </h3>
                        <p className="font-label-md text-label-md text-on-surface-variant mt-1">
                          Số lượng: {order.quantity.replace("x", "")}
                        </p>
                        {order.details && (
                          <p className="font-label-md text-label-md text-on-surface-variant">
                            {order.details}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="font-body-md text-body-md text-secondary font-semibold">
                          {order.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer: total + action */}
                  <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                    <div>
                      <p className="font-label-md text-label-md text-on-surface-variant">Tổng tiền</p>
                      <p className="font-headline-md text-headline-md text-primary">{order.price}</p>
                    </div>

                    {order.status === "shipping" && (
                      <button
                        onClick={() => navigate("/theo-doi-don-hang")}
                        className="bg-primary text-on-primary px-6 py-2 rounded font-label-md text-label-md uppercase tracking-widest active:scale-95 transition-transform shadow-sm"
                      >
                        THEO DÕI ĐƠN
                      </button>
                    )}

                    {order.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate("/chi-tiet-don-hang")}
                          className="px-4 py-2 border border-primary text-primary font-label-md text-label-md uppercase hover:bg-primary hover:text-on-primary transition-all rounded font-semibold"
                        >
                          Chi tiết
                        </button>
                        <button
                          onClick={() => handleCancelOrder(order.id, order.code)}
                          className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase hover:opacity-90 transition-opacity rounded font-semibold"
                        >
                          Hủy đơn
                        </button>
                      </div>
                    )}

                    {order.status === "preparing" && (
                      <button
                        onClick={() => navigate("/chi-tiet-don-hang")}
                        className="bg-primary text-on-primary px-6 py-2 rounded font-label-md text-label-md uppercase tracking-widest active:scale-95 transition-transform shadow-sm"
                      >
                        XEM CHI TIẾT
                      </button>
                    )}

                    {order.status === "delivered" && (
                      <button
                        onClick={() => navigate("/danh-gia")}
                        className="bg-secondary text-on-secondary px-6 py-2 rounded font-label-md text-label-md uppercase tracking-widest active:scale-95 transition-transform shadow-sm"
                      >
                        ĐÁNH GIÁ
                      </button>
                    )}

                    {order.status === "cancelled" && (
                      <span className="font-label-md text-label-md text-error uppercase tracking-wider font-bold">
                        ĐÃ HỦY
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}

          {/* End of list stamp */}
          {filteredOrders.length > 0 && (
            <div className="pt-10 flex flex-col items-center opacity-30 select-none">
              <span className="material-symbols-outlined text-6xl mb-2">shopping_bag</span>
              <p className="font-label-md text-label-md uppercase font-sans">
                Hết danh sách đơn hàng
              </p>
            </div>
          )}
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface">
        <div className="flex justify-around items-center h-16 px-2 pb-safe w-full">
          <button
            onClick={() => navigate("/trang-chu")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Trang chủ</span>
          </button>
          <button
            onClick={() => navigate("/bo-loc")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">grid_view</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Danh mục</span>
          </button>
          <button
            onClick={() => navigate("/don-hang")}
            className="flex flex-col items-center justify-center text-secondary relative active:scale-90 w-16"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              receipt_long
            </span>
            <span className="font-label-md text-[10px] mt-1 font-sans font-bold">Đơn hàng</span>
            <div className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full"></div>
          </button>
          <button
            onClick={() => navigate("/thong-bao")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Thông báo</span>
          </button>
          <button
            onClick={() => navigate("/toi")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Tôi</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
