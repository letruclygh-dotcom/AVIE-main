import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type OrderTab = "all" | "pending" | "preparing" | "shipping" | "delivered" | "cancelled";

interface OrderItem {
  id: string;
  code: string;
  price: string;
  imageSrc: string;
  title: string;
  color?: string;
  quantity: string;
  status: OrderTab;
}

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

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: "o1",
    code: "AV2409101",
    price: "225.000đ",
    imageSrc: "https://i.ibb.co/PG3p6wTs/6.png",
    title: 'Áo Thun Unisex - 100% COTTON - "Bánh Mì"',
    color: "Kem",
    quantity: "01",
    status: "pending",
  },
  {
    id: "o2",
    code: "AV2409102",
    price: "225.000đ",
    imageSrc: "https://i.ibb.co/zhP9w9gz/10.png",
    title: 'Áo Thun Unisex - 100% COTTON - "Nón Lá"',
    color: "Đen Than",
    quantity: "01",
    status: "pending",
  },
  {
    id: "s1",
    code: "AV29481",
    price: "225.000đ",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiJIQaGt2qAJBXqi9b_U8QojMAoLzAo4IX3t8BWkDbu_2Hz-XxPYi0e0LdwgMTrQ8Bjx2rfbZCI8Ft3qeFoxfGD0dEwuuU-Nau_WfxKd5Ngs9e4sE5gBDA4uyPco03tKGLhvMk_N2PmsNjk7RcXo1UYHiVYiFttY2cZ0BrfajFsosG-fYl19jMq-6XribpeSxXRuNzX3CAvEOgCuw8XP9CgrOmMNtmc-N4hc6IQwMRLGVGz0F7jjaCGu97wfeeA7MZc7jqqG4WF69MWoU",
    title: 'Áo Thun Unisex - 100% COTTON - "Bánh Mì"',
    color: "Đen",
    quantity: "01",
    status: "shipping",
  },
  {
    id: "s2",
    code: "AV29512",
    price: "225.000đ",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtx3QYLWai7nh-3-uanIMKyCBuno4Gnj81DYo1lHPN5V3weL-Ndi8G3EZslj4mrc3uqO0Cni-GQLDg6Ew8_4eCc5bWhMIeT8tHf7vlj9Mk5-8LPNbhx7CuLjtkebXf_KKdcu32KwKQSQrylLKG9cQSUWyHdekcaHTYtOMjOpMPnrPfAXV9VEUDTvISmfsdupJRk_VjtxE_mt7ixZ9G1zk14SsH1zysH4F527JfhO5uZSI7HoMM_Kkrrt97rFvuhOoaDgCFzXWGsGSaIps",
    title: 'Áo Thun Unisex - 100% COTTON - "Nón Lá"',
    color: "Hồng",
    quantity: "01",
    status: "shipping",
  },
  {
    id: "s3",
    code: "AV29600",
    price: "59.000đ",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD25mSR0nab7psgUQ0fY-zvj7omQGoi03Y13rI1C2U5oKECYTcbYd6E0sWp-FZXKt2gMgVadife9DEnNoRf60Fp2R3BUrE67hJQHtrs1_LTkmah7nkEqASqApP9wlxY1Vo7AuRJAA2TQQcEGvyV7ZLEGlZVgOYtP3M7Vg62Ooy--lzZe6AEJO8fdaj3picqldskAv6GyLDnRalIKc8rUoEENHdS1kDcN9XRSB2AVwF4vubrOYR7Qb38MLoimyVERTOOF6QVdK3xDW2ue4s",
    title: "Túi Tote Canvas In Hình Việt Nam",
    quantity: "01",
    status: "shipping",
  },
  {
    id: "d1",
    code: "AV29800",
    price: "225.000đ",
    imageSrc: "https://i.ibb.co/hxBR2WM3/3.png",
    title: 'Áo Thun Unisex - 100% Cotton - "Độc Lập"',
    color: "Hồng",
    quantity: "01",
    status: "delivered",
  },
  {
    code: "AV-100201",
    price: "225.000đ",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiAISQ2-AuJ-c6rn-2Dk2JfrKiFrVA85vQWy1-Uqo2p9hYmeMFG4YHNIhYMk8-w8E1S8Jv5YGzQ2ZDXilgAuWCOfv6UJw9pLpKGXYVeMFnmW9kg6g746wO_JhK2JdeRiUgPRdT12qOUCdeHPO_7CEdkZLLB_MLHLUqyHe5eRkfsP58TPxZkwI6eR2uYtyqJXkQqG5wETINysJQp-rmt--EVEay4eGoivcAYB976B8WUOnCJuraKBUBUV21FVTFBn9isjfSZBlgHhyFxnE",
    title: 'Áo Thun Unisex - 100% Cotton - "Độc Lập"',
    color: "Trắng",
    quantity: "01",
    status: "cancelled",
  },
  {
    id: "c2",
    code: "AV-100202",
    price: "59.000đ",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAn0i-txvNYeRkVswuPdN3DPUpPe6P3HEDMZ6KdcRpUZ5GS7P0RiU8rIGftOaMjpk18pnbDXMDlVR83LBmozNdnYB7JLliBmza74zxc_FNvNEDGfLUab6tS5aPkdwEvTv4nQLrQqjAFld8Xa7Me9EZH3LM77dTiSR9-J3MTRdXeEVdAPhmXhIIQnDTDj7RCVkqNvZRbkviOyUEbtzUvV2c7o3pfBOC7rFfzkZXH8lHjLyOukXjAy8k3qphaLd-Z6QlRnqRzlo1gw99K56k",
    title: "Túi Tote Canvas In Hình Tháp Rùa",
    quantity: "01",
    status: "cancelled",
  },
  {
    id: "c3",
    code: "AV-100203",
    price: "59.000đ",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjUB8kv7om8rLiCODfQmBxECbIymY9Yr_4BTyxWQyEXUo29KavlM4t2I0CZDLp6GpehDAn0Na3EtCnYRqF5mUDWesKy5oK4ZZe3Hu9Tf7XoCyaGxdGp0B_eUoHeq94ysRAKlLJjxKWaOsgo6q85siXKDdhpEIJlrcrmzegdpSy8GkWQToNTakz5NOpOi7sgWWcVStFRk1Zya4PWP0eBMhvKMdHzt3GYsOCj1r8QwQb1qlPQDo4UWMYt2Kuc9g0HmXoftJBJ7Y8KuhJJlo",
    title: "Túi Tote Canvas In Hình Hạ Long Bay",
    quantity: "01",
    status: "cancelled",
  },
];

function tabClass(active: boolean) {
  return active
    ? "px-4 py-1 text-secondary font-label-md text-label-md relative after:absolute after:bottom-[-12px] after:left-0 after:w-full after:h-[2px] after:bg-secondary"
    : "px-4 py-1 text-on-surface-variant font-label-md text-label-md hover:opacity-80";
}

function ShippingOrderCard({
  order,
  onTrack,
  onViewReviews,
}: {
  order: OrderItem;
  onTrack: () => void;
  onViewReviews: () => void;
}) {
  return (
    <article className="bg-surface-container rounded-lg border border-outline-variant overflow-hidden">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="font-label-md text-label-md text-on-surface-variant">MÃ ĐƠN: #{order.code}</span>
          <span className="font-label-md text-label-md text-secondary font-bold tracking-wider">ĐANG GIAO</span>
        </div>
        <div className="flex gap-4">
          <div className="w-24 h-24 bg-surface-container-highest rounded border border-outline-variant flex-shrink-0 overflow-hidden">
            <img alt={order.title} className="w-full h-full object-cover" src={order.imageSrc} />
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-body-md text-body-md font-bold text-on-surface">{order.title}</h3>
              <p className="font-label-md text-label-md text-on-surface-variant mt-1">
                Số lượng: {order.quantity}
              </p>
              {order.color && <div>Màu sắc: {order.color}</div>}
            </div>
            <div className="text-right">
              <span className="font-body-md text-body-md text-secondary font-semibold">{order.price}</span>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-outline-variant flex justify-between items-center gap-3">
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant">Tổng tiền</p>
            <p className="font-headline-md text-headline-md text-primary">{order.price}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onViewReviews}
              className="border border-primary text-primary px-4 py-2 rounded font-label-md text-label-md uppercase tracking-wider active:scale-95 transition-transform"
            >
              Xem đánh giá
            </button>
            <button
              type="button"
              onClick={onTrack}
              className="bg-primary text-on-primary px-6 py-2 rounded font-label-md text-label-md uppercase tracking-widest active:scale-95 transition-transform shadow-sm"
            >
              THEO DÕI ĐƠN
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function CancelledOrderCard({
  order,
  onDetail,
  onBuyAgain,
  buyAgainLabel,
}: {
  order: OrderItem;
  onDetail: () => void;
  onBuyAgain: () => void;
  buyAgainLabel: string;
}) {
  return (
    <div className="order-card bg-surface-container border border-outline-variant p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-outline-variant pb-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "18px" }}>
            receipt
          </span>
          <span className="font-label-md text-label-md text-on-surface-variant">{order.code}</span>
        </div>
        <span className="font-label-md text-label-md text-error uppercase tracking-wider">Đã hủy</span>
      </div>
      <div className="flex gap-4">
        <div className="w-24 h-24 flex-shrink-0 bg-surface-variant overflow-hidden">
          <img alt={order.title} className="w-full h-full object-cover" src={order.imageSrc} />
        </div>
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-body-md text-body-md text-on-surface font-semibold line-clamp-2 uppercase">
              {order.title}
            </h3>
            <p className="font-label-md text-label-md text-on-surface-variant mt-1">
              <span style={{ fontFamily: '"Be Vietnam Pro"', letterSpacing: "0.6px" }}>
                Số lượng: {order.quantity}
              </span>
            </p>
            {order.color && (
              <div style={{ fontFamily: '"Be Vietnam Pro"', letterSpacing: "0.6px" }}>
                Màu sắc: {order.color}
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="font-label-md text-label-md text-secondary text-lg">{order.price}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-2 border-t border-outline-variant">
        <div className="flex justify-between items-center">
          <span className="font-label-md text-label-md text-on-surface-variant">Tổng số tiền:</span>
          <span className="font-headline-md text-headline-md text-secondary">{order.price}</span>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onDetail}
            className="px-6 py-2 border border-primary text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-all active:scale-95"
          >
            Xem chi tiết
          </button>
          <button
            type="button"
            onClick={onBuyAgain}
            className="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:opacity-90 transition-all active:scale-95"
          >
            {buyAgainLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<OrderTab>("shipping");
  const [orders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [buyAgainIds, setBuyAgainIds] = useState<Record<string, string>>({});

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  useEffect(() => {
    const buttons = document.querySelectorAll("button");
    const handlers: Array<{ btn: HTMLButtonElement; down: () => void; up: () => void; leave: () => void }> =
      [];

    buttons.forEach((button) => {
      const btn = button as HTMLButtonElement;
      const down = () => btn.classList.add("scale-95");
      const up = () => btn.classList.remove("scale-95");
      const leave = () => btn.classList.remove("scale-95");
      btn.addEventListener("mousedown", down);
      btn.addEventListener("mouseup", up);
      btn.addEventListener("mouseleave", leave);
      handlers.push({ btn, down, up, leave });
    });

    return () => {
      handlers.forEach(({ btn, down, up, leave }) => {
        btn.removeEventListener("mousedown", down);
        btn.removeEventListener("mouseup", up);
        btn.removeEventListener("mouseleave", leave);
      });
    };
  }, [activeTab, filteredOrders.length]);

  const handleBuyAgain = (id: string) => {
    setBuyAgainIds((prev) => ({ ...prev, [id]: "ĐÃ THÊM" }));
    setTimeout(() => {
      setBuyAgainIds((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 2000);
  };

  const handleCancelOrder = (id: string, code: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng #${code}?`)) {
      alert(`Đơn hàng #${code} đã được hủy.`);
    }
  };

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
      <div className="bg-surface sticky top-16 z-30 overflow-x-auto border-b border-outline-variant">
        <div className="flex whitespace-nowrap px-container-padding py-3">
          {TABS.map((tab) => (
            <button key={tab.id} type="button" className={tabClass(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`flex-grow ${
          activeTab === "cancelled"
            ? "max-w-screen-md mx-auto px-container-padding py-6 flex flex-col gap-4 mb-20"
            : "p-container-padding space-y-4 mb-20"
        }`}
      >
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-outline-variant mb-4" style={{ fontSize: "64px" }}>
              {activeTab === "cancelled" ? "history" : "shopping_bag"}
            </span>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {activeTab === "cancelled"
                ? "Không có đơn hàng nào bị hủy."
                : "Không có đơn hàng nào"}
            </p>
          </div>
        ) : (
          <div
            className={
              activeTab === "cancelled"
                ? "flex flex-col gap-4"
                : "space-y-4 max-w-2xl mx-auto w-full"
            }
          >
            {filteredOrders.map((order) => {
              if (order.status === "shipping" && (activeTab === "shipping" || activeTab === "all")) {
                return (
                  <ShippingOrderCard
                    key={order.id}
                    order={order}
                    onTrack={() => navigate("/theo-doi-don-hang")}
                    onViewReviews={() => navigate("/xem-danh-gia")}
                  />
                );
              }
              if (order.status === "cancelled" && (activeTab === "cancelled" || activeTab === "all")) {
                return (
                  <CancelledOrderCard
                    key={order.id}
                    order={order}
                    buyAgainLabel={buyAgainIds[order.id] ?? "Mua lại"}
                    onDetail={() => navigate("/chi-tiet-don-hang")}
                    onBuyAgain={() => handleBuyAgain(order.id)}
                  />
                );
              }
              if (activeTab === "cancelled" || activeTab === "shipping") {
                return null;
              }
              return (
                <GenericOrderCard
                  key={order.id}
                  order={order}
                  onCancel={handleCancelOrder}
                  onNavigate={navigate}
                />
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

function GenericOrderCard({
  order,
  onCancel,
  onNavigate,
}: {
  order: OrderItem;
  onCancel: (id: string, code: string) => void;
  onNavigate: (path: string) => void;
}) {
  const statusLabel: Record<OrderTab, string> = {
    all: "",
    pending: "CHỜ XÁC NHẬN",
    preparing: "CHỜ LẤY HÀNG",
    shipping: "ĐANG GIAO",
    delivered: "ĐÃ GIAO",
    cancelled: "ĐÃ HỦY",
  };

  return (
    <article className="bg-surface-container rounded-lg border border-outline-variant overflow-hidden">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="font-label-md text-label-md text-on-surface-variant">MÃ ĐƠN: #{order.code}</span>
          <span className="font-label-md text-label-md text-secondary font-bold tracking-wider">
            {statusLabel[order.status]}
          </span>
        </div>
        <div className="flex gap-4">
          <div className="w-24 h-24 bg-surface-container-highest rounded border border-outline-variant flex-shrink-0 overflow-hidden">
            <img alt={order.title} className="w-full h-full object-cover" src={order.imageSrc} />
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-body-md text-body-md font-bold text-on-surface">{order.title}</h3>
              <p className="font-label-md text-label-md text-on-surface-variant mt-1">Số lượng: {order.quantity}</p>
              {order.color && (
                <p className="font-label-md text-label-md text-on-surface-variant">Màu sắc: {order.color}</p>
              )}
            </div>
            <div className="text-right">
              <span className="font-body-md text-body-md text-secondary font-semibold">{order.price}</span>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-outline-variant flex justify-between items-center gap-3 flex-wrap">
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant">Tổng tiền</p>
            <p className="font-headline-md text-headline-md text-primary">{order.price}</p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <button
              type="button"
              onClick={() => onNavigate("/xem-danh-gia")}
              className="px-4 py-2 border border-primary text-primary font-label-md text-label-md uppercase rounded"
            >
              Xem đánh giá
            </button>
          {order.status === "pending" && (
            <>
              <button
                type="button"
                onClick={() => onNavigate("/chi-tiet-don-hang")}
                className="px-4 py-2 border border-primary text-primary font-label-md text-label-md uppercase rounded"
              >
                Chi tiết
              </button>
              <button
                type="button"
                onClick={() => onCancel(order.id, order.code)}
                className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase rounded"
              >
                Hủy đơn
              </button>
            </>
          )}
          {order.status === "delivered" && (
            <button
              type="button"
              onClick={() => onNavigate("/danh-gia")}
              className="bg-secondary text-on-secondary px-6 py-2 rounded font-label-md text-label-md uppercase"
            >
              ĐÁNH GIÁ
            </button>
          )}
          </div>
        </div>
      </div>
    </article>
  );
}
