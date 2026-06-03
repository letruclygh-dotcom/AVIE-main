import { useLocation, useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

interface Notification {
  id: string;
  category: "order" | "promo" | "system";
  icon: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const CATEGORY_LABEL: Record<string, string> = {
  order: "Đơn hàng",
  promo: "Khuyến mãi",
  system: "Hệ thống",
};

const CATEGORY_COLOR: Record<string, string> = {
  order: "bg-secondary-fixed text-on-secondary-container",
  promo: "bg-error-container text-on-error-container",
  system: "bg-surface-variant text-on-surface-variant",
};

// Suggested actions per category
const ACTIONS: Record<string, { label: string; icon: string; onClick?: () => void }[]> = {
  order: [
    { label: "Theo dõi đơn hàng", icon: "local_shipping" },
    { label: "Liên hệ shipper", icon: "call" },
  ],
  promo: [
    { label: "Mua ngay", icon: "shopping_bag" },
    { label: "Sao chép mã giảm giá", icon: "content_copy" },
  ],
  system: [
    { label: "Cập nhật ngay", icon: "system_update" },
    { label: "Xem chi tiết", icon: "open_in_new" },
  ],
};

// Default notification if navigated directly without state (demo fallback)
const DEFAULT_NOTIF: Notification = {
  id: "demo",
  category: "order",
  icon: "local_shipping",
  title: "Đơn hàng #AV-20250312 đang giao",
  body:
    "Đơn hàng của bạn đã rời kho lúc 08:30 sáng và hiện đang trên đường giao tới địa chỉ của bạn. Shipper sẽ liên hệ trước khi đến khoảng 15–30 phút. Vui lòng giữ điện thoại ở trạng thái sẵn sàng.",
  time: "5 phút trước",
  read: true,
};

export default function NotificationDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const notif: Notification = (location.state as any)?.notif ?? DEFAULT_NOTIF;
  const actions = ACTIONS[notif.category] ?? [];

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant shrink-0">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            className="hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10"
            onClick={() => navigate(-1)}
            type="button"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-primary uppercase text-headline-md tracking-wider whitespace-nowrap">
            Chi tiết thông báo
          </h1>
          <button
            className="hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10 text-outline"
            type="button"
            onClick={() => alert("Đã xóa thông báo này.")}
            title="Xóa thông báo"
          >
            <span className="material-symbols-outlined text-[22px]">delete_outline</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-28 px-container-padding max-w-md mx-auto w-full flex flex-col gap-6 mt-2">
        {/* Notification Card */}
        <section className="bg-surface border border-outline-variant rounded-lg overflow-hidden shadow-xs">
          {/* Category Banner */}
          <div
            className={`flex items-center gap-2 px-4 py-2.5 ${CATEGORY_COLOR[notif.category]}`}
          >
            <span className="material-symbols-outlined text-[16px]">{notif.icon}</span>
            <span className="font-label-md text-[10px] uppercase tracking-wider font-bold">
              {CATEGORY_LABEL[notif.category]}
            </span>
            <span className="ml-auto font-label-md text-[10px] uppercase tracking-wide opacity-70">
              {notif.time}
            </span>
          </div>

          {/* Title + Body */}
          <div className="p-5 flex flex-col gap-3">
            <h2 className="font-headline-md text-primary text-[18px] font-bold leading-snug">
              {notif.title}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {notif.body}
            </p>
          </div>
        </section>

        {/* Timeline / Detail steps (for order category) */}
        {notif.category === "order" && (
          <section className="bg-surface border border-outline-variant rounded-lg p-5 flex flex-col gap-1 shadow-xs">
            <h3 className="font-headline-md text-primary uppercase tracking-wider text-xs font-bold mb-3">
              Trạng thái đơn hàng
            </h3>
            {[
              { icon: "task_alt", label: "Đơn hàng đã đặt thành công", sub: "12/03/2025 — 08:00", done: true },
              { icon: "inventory_2", label: "Đang đóng gói hàng hóa", sub: "12/03/2025 — 10:15", done: true },
              { icon: "local_shipping", label: "Đang vận chuyển", sub: "12/03/2025 — 08:30", done: true, active: true },
              { icon: "home", label: "Giao hàng thành công", sub: "Dự kiến hôm nay", done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 relative">
                {/* Connector line */}
                {i < 3 && (
                  <div className="absolute left-[11px] top-7 bottom-0 w-[2px] bg-outline-variant/30" />
                )}
                <div
                  className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center z-10 mt-0.5 ${
                    step.active
                      ? "bg-secondary text-white"
                      : step.done
                      ? "bg-secondary-fixed text-on-secondary-container"
                      : "bg-surface-container-low text-outline border border-outline-variant"
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">{step.icon}</span>
                </div>
                <div className="flex-grow pb-4">
                  <p
                    className={`font-body-md text-sm leading-tight ${
                      step.active ? "text-primary font-bold" : step.done ? "text-on-surface" : "text-outline"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="font-label-md text-[10px] text-outline uppercase tracking-wide mt-0.5">
                    {step.sub}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Promo detail */}
        {notif.category === "promo" && (
          <section className="bg-surface border border-outline-variant rounded-lg p-5 flex flex-col gap-3 shadow-xs">
            <h3 className="font-headline-md text-primary uppercase tracking-wider text-xs font-bold">
              Chi tiết ưu đãi
            </h3>
            <div className="bg-error-container/30 border border-error-container rounded p-3 flex flex-col gap-1">
              <p className="font-label-md text-[10px] uppercase tracking-wider text-on-error-container font-bold">
                Mã giảm giá
              </p>
              <p className="font-display-lg text-error text-xl font-bold tracking-widest">AOVIE30</p>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant text-xs leading-relaxed">
              Áp dụng cho đơn hàng từ <strong>500.000đ</strong>. Không áp dụng cùng các ưu đãi khác.
              Hạn sử dụng: <strong>31/12/2025</strong>.
            </p>
          </section>
        )}

        {/* Action Buttons */}
        <section className="flex flex-col gap-3">
          {actions.map((action, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (action.label.includes("Theo dõi")) navigate("/theo-doi-don-hang");
                else if (action.label.includes("Mua ngay")) navigate("/trang-chu");
                else alert(`${action.label}...`);
              }}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-label-md text-xs uppercase tracking-wider font-bold transition-all active:scale-[0.98] ${
                i === 0
                  ? "bg-primary text-white hover:opacity-90 shadow-sm"
                  : "bg-surface border border-outline-variant text-primary hover:bg-surface-container-low"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{action.icon}</span>
              {action.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => navigate("/thong-bao")}
            className="text-center font-label-md text-[10px] uppercase tracking-wider text-outline hover:text-primary transition-colors mt-1"
          >
            ← Quay lại danh sách thông báo
          </button>
        </section>
      </main>
    </div>
  );
}
