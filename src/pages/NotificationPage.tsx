import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

type NotifCategory = "all" | "order" | "promo" | "system";

interface Notification {
  id: string;
  category: "order" | "promo" | "system";
  icon: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    category: "order",
    icon: "local_shipping",
    title: "Đơn hàng #AV-20250312 đang giao",
    body: "Đơn hàng của bạn đang trên đường giao tới. Shipper sẽ liên hệ trước khi đến.",
    time: "5 phút trước",
    read: false,
  },
  {
    id: "n2",
    category: "promo",
    icon: "sell",
    title: "Flash Sale Áo Dài Cổ Điển — Giảm 30%",
    body: "Chỉ còn 2 giờ! Săn ngay BST áo dài Thu Đông 2025 với ưu đãi lên đến 30%.",
    time: "1 giờ trước",
    read: false,
  },
  {
    id: "n3",
    category: "order",
    icon: "task_alt",
    title: "Đặt hàng thành công",
    body: "Đơn hàng #AV-20250311 đã được xác nhận. Dự kiến giao trong 2–3 ngày làm việc.",
    time: "Hôm qua, 14:32",
    read: true,
  },
  {
    id: "n4",
    category: "system",
    icon: "verified_user",
    title: "Xác minh tài khoản thành công",
    body: "Tài khoản của bạn đã được xác minh qua số điện thoại. Hưởng đầy đủ quyền lợi thành viên Gold.",
    time: "Hôm qua, 09:15",
    read: true,
  },
  {
    id: "n5",
    category: "promo",
    icon: "card_giftcard",
    title: "Quà tặng sinh nhật đang chờ bạn!",
    body: "Nhận ngay voucher 50.000đ tri ân thành viên Gold. Hạn sử dụng đến 31/12/2025.",
    time: "2 ngày trước",
    read: true,
  },
  {
    id: "n6",
    category: "system",
    icon: "update",
    title: "Cập nhật ứng dụng AoVie v2.1",
    body: "Phiên bản mới mang đến trải nghiệm mượt mà hơn, hỗ trợ thanh toán ZaloPay và nhiều tính năng mới.",
    time: "3 ngày trước",
    read: true,
  },
  {
    id: "n7",
    category: "order",
    icon: "rate_review",
    title: "Đánh giá đơn hàng của bạn",
    body: "Bạn đã nhận đơn hàng #AV-20250308. Chia sẻ cảm nhận để nhận thêm điểm thưởng.",
    time: "5 ngày trước",
    read: true,
  },
];

const TABS: { key: NotifCategory; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "order", label: "Đơn hàng" },
  { key: "promo", label: "Khuyến mãi" },
  { key: "system", label: "Hệ thống" },
];

const CATEGORY_COLOR: Record<string, string> = {
  order: "bg-secondary-fixed text-on-secondary-container",
  promo: "bg-error-container text-on-error-container",
  system: "bg-surface-variant text-on-surface-variant",
};

export default function NotificationPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<NotifCategory>("all");
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const filtered =
    activeTab === "all" ? notifications : notifications.filter((n) => n.category === activeTab);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotifClick = (notif: Notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    navigate("/chi-tiet-thong-bao", { state: { notif } });
  };

  const handleBottomNav = (path: string) => navigate(path);

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
          <h1 className="font-headline-lg-mobile text-primary uppercase text-headline-md tracking-wider whitespace-nowrap flex items-center gap-2">
            Thông báo
            {unreadCount > 0 && (
              <span className="bg-error text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-tight">
                {unreadCount}
              </span>
            )}
          </h1>
          <button
            className="hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10 text-primary disabled:opacity-40"
            type="button"
            onClick={markAllRead}
            disabled={unreadCount === 0}
            title="Đánh dấu tất cả đã đọc"
          >
            <span className="material-symbols-outlined text-[22px]">done_all</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-0 border-t border-outline-variant/30 bg-background overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 min-w-max px-4 py-2.5 font-label-md text-[11px] uppercase tracking-wider font-semibold transition-all border-b-2 ${
                activeTab === tab.key
                  ? "border-secondary text-secondary"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-28 pb-28 max-w-md mx-auto w-full flex flex-col">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow gap-4 py-20 px-container-padding text-center">
            <span className="material-symbols-outlined text-outline text-[64px]">notifications_off</span>
            <p className="font-headline-md text-on-surface-variant uppercase tracking-wide text-sm">
              Không có thông báo
            </p>
            <p className="font-body-md text-body-md text-outline text-xs leading-relaxed">
              Chưa có thông báo nào trong danh mục này.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-outline-variant/20">
            {filtered.map((notif) => (
              <li key={notif.id}>
                <button
                  onClick={() => handleNotifClick(notif)}
                  className={`w-full text-left flex items-start gap-4 px-container-padding py-4 transition-colors active:scale-[0.99] ${
                    notif.read
                      ? "bg-background hover:bg-surface-container-low/50"
                      : "bg-secondary-fixed/20 hover:bg-secondary-fixed/30"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 ${CATEGORY_COLOR[notif.category]}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{notif.icon}</span>
                  </div>

                  {/* Body */}
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p
                        className={`font-body-md text-sm leading-tight ${
                          notif.read ? "text-on-surface font-medium" : "text-primary font-bold"
                        } line-clamp-1`}
                      >
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <span className="shrink-0 w-2 h-2 bg-secondary rounded-full mt-1" />
                      )}
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant text-xs leading-relaxed mt-1 line-clamp-2">
                      {notif.body}
                    </p>
                    <p className="font-label-md text-[10px] text-outline uppercase tracking-wide mt-1.5">
                      {notif.time}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Bottom NavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-gutter bg-surface border-t border-outline-variant z-50 shrink-0 select-none">
        <button
          onClick={() => handleBottomNav("/trang-chu")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-md text-[10px] uppercase font-semibold">Trang chủ</span>
        </button>
        <button
          onClick={() => handleBottomNav("/bo-loc")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-[10px] uppercase font-semibold">Danh mục</span>
        </button>
        <button
          onClick={() => handleBottomNav("/dat-hang-thanh-cong")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-label-md text-[10px] uppercase font-semibold">Đơn hàng</span>
        </button>
        <button
          onClick={() => handleBottomNav("/thong-bao")}
          className="flex flex-col items-center justify-center text-secondary relative active:scale-95 w-16"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            notifications
          </span>
          <span className="font-label-md text-[10px] uppercase font-bold">Thông báo</span>
          <div className="absolute -bottom-1 w-1.5 h-1.5 bg-secondary rounded-full" />
        </button>
        <button
          onClick={() => handleBottomNav("/toi")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-md text-[10px] uppercase font-semibold">Tôi</span>
        </button>
      </nav>
    </div>
  );
}
