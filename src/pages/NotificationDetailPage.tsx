import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface NotificationItem {
  id: string;
  category: "order" | "promo" | "system";
  icon: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const PROMO_DEFAULT = {
  title: "Ưu Đãi Đậm Chất Việt – Sắm Áo Thun Và Túi Canvas Cùng AoVie",
  time: "24 THÁNG 5, 2026 • 09:30 AM",
  datetime: "2026-05-24",
  badge: "Khuyến mãi",
};

export default function NotificationDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const notif = (location.state as { notif?: NotificationItem } | null)?.notif;

  const [headerScrolled, setHeaderScrolled] = useState(false);

  const title = notif?.title ?? PROMO_DEFAULT.title;
  const displayTime = notif?.time ?? PROMO_DEFAULT.time;
  const badgeLabel =
    notif?.category === "order"
      ? "Đơn hàng"
      : notif?.category === "system"
        ? "Hệ thống"
        : PROMO_DEFAULT.badge;

  useEffect(() => {
    const onScroll = () => {
      setHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="notification-detail-page bg-background text-on-surface antialiased min-h-screen">
      <div className="grainy-overlay" aria-hidden="true"></div>

      {/* Top AppBar */}
      <header
        className={`fixed top-0 w-full z-50 border-b border-outline-variant h-16 flex items-center px-container-padding transition-all ${
          headerScrolled ? "shadow-sm bg-background/95 backdrop-blur-md" : "bg-background"
        }`}
      >
        <div className="max-w-screen-xl mx-auto w-full flex justify-between items-center">
          <button
            type="button"
            aria-label="Go back"
            className="w-10 h-10 flex items-center justify-start text-primary active:scale-95 transition-transform"
            onClick={() => navigate(-1)}
            onTouchStart={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.5";
            }}
            onTouchEnd={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
            Chi tiết
          </h1>
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-end text-primary active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-16 pb-24 min-h-screen relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Hero Image Section */}
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <img
              alt="Vietnam cultural collage"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVkizBRZAm3qq7JiuOfsUfv5Y66f3i5XAqpYFleneO5FIDG-XRfUE0fJkZSVaEBtjUCFPxSUDwiNRL4L7jlpbi4gAHigrhdi52fpCvIetQNNIkV31cUvZvNO62FK_vHPiQSfIjSFhD9fLgiEkd7AV7YFmiWDQUsPZxQsacCdFgYyF5Tng4h9f0HK-0i_sivDODZ_obghAddCOc6qF64rl1Nr8kRtMne9ufOF5CccMlAqyzYQ8TgbuG8QQZxrc8uQ7hIQIO5PD5gj4"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-secondary text-on-secondary px-3 py-1 font-label-md text-label-md rounded-sm uppercase tracking-wider">
                {badgeLabel}
              </span>
            </div>
          </div>

          {/* Content Container */}
          <article className="px-container-padding pt-8">
            {/* Header Info */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                <time className="font-label-md text-label-md tracking-wide" dateTime={PROMO_DEFAULT.datetime}>
                  {displayTime}
                </time>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary leading-tight mb-4">{title}</h2>
              <div className="h-px w-12 bg-secondary mb-6"></div>
            </header>

            {/* Detailed Body */}
            <section className="space-y-6 text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
              {notif?.body && notif.category !== "promo" ? (
                <p>{notif.body}</p>
              ) : (
                <>
                  <p>
                    Chào bạn,&nbsp;AoVie mang đến chương trình ưu đãi đặc biệt dành cho những ai yêu thích phong
                    cách thời trang trẻ trung, gần gũi và mang dấu ấn văn hóa Việt.Các sản phẩm áo thun và túi
                    canvas của AoVie được lấy cảm hứng từ những hình ảnh quen thuộc trong đời sống Việt Nam, kết
                    hợp cùng tinh thần retro hiện đại để tạo nên vẻ ngoài vừa cá tính, vừa dễ ứng dụng hằng ngày.
                  </p>
                  <p>
                    Đây là dịp phù hợp để bạn chọn cho mình những thiết kế mang bản sắc riêng, vừa làm mới phong
                    cách cá nhân, vừa lan tỏa niềm tự hào về văn hóa Việt qua từng món đồ thời trang. Mỗi món đồ
                    đều được chăm chút tỉ mỉ từ chất liệu vải đũi tự nhiên đến những đường may thủ công đặc
                    trưng. Đây không chỉ là trang phục, mà là lời kể về một thời đại rực rỡ qua lăng kính thời
                    trang đương đại.
                  </p>
                </>
              )}

              {/* Feature Box */}
              <div className="bg-surface-container-low border border-outline-variant p-6 my-8 rounded-lg">
                <h3 className="font-headline-md text-headline-md text-primary mb-4">Thông tin ưu đãi:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                    <span>
                      Giảm giá trực tiếp <strong>15%</strong>&nbsp;tất cả sản phẩm dành cho khách hàng mới.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                    <span>
                      Mã ưu đãi:{" "}
                      <strong className="text-secondary tracking-[0.1em] font-bold">AOVIENEW</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                    <span>Thời gian áp dụng: Từ nay đến hết 31/10/2026.</span>
                  </li>
                </ul>
              </div>

              <p>
                Khám phá AoVie ngay hôm nay để chọn cho mình những chiếc áo thun và túi canvas mang đậm tinh thần
                Việt, trẻ trung và khác biệt.
              </p>
            </section>

            {/* Action Button */}
            <footer className="mt-12 mb-16">
              <button
                type="button"
                className="w-full bg-primary text-on-primary py-4 font-label-md text-label-md uppercase tracking-[0.2em] rounded-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                onClick={() => navigate("/danh-muc")}
              >
                Khám phá bộ sưu tập Aovie ngay
              </button>
              <div className="mt-8 flex justify-center items-center gap-6">
                <button
                  type="button"
                  className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md uppercase tracking-widest hover:text-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">share</span> Chia sẻ
                </button>
                <div className="w-px h-4 bg-outline-variant"></div>
                <button
                  type="button"
                  className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md uppercase tracking-widest hover:text-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">archive</span> Lưu tin
                </button>
              </div>
            </footer>
          </article>

          {/* Related Items (Bento Style) */}
          <aside className="px-container-padding mb-12">
            <h4 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-[0.2em] mb-6">
              Có thể bạn quan tâm
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="relative group cursor-pointer overflow-hidden aspect-square rounded-sm text-left"
                onClick={() => navigate("/trang-chu")}
              >
                <img
                  alt="Áo thun Bánh Mì"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBdVUh5Xt0oEpPsP4qmt-hgtGuJ4OB0tvc-iJEvGkgm3dCKfzQO8Pq3bYPd79yU2DHRSnpyBH3waXGDyuWMKSShluL0jhZSVhVRpo0LL2f0Sz3ycLIWewK63CKWO8WtfYfHoTCih5DkMRsRbAc4Uxl4kT96DXKLBjCHzU63t1LNqAwtDM0T649hgjCK2YEMk8u7TB9YUhF8EiXQAkSZftQbeJZBrX1ASYbSen3FB8aATN8Pi2Jy5_C7qU8lJiQ1Ncfu8eGz_vxf2s"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white font-label-md text-label-md truncate">ÁO THUN BÁNH MÌ</p>
                </div>
              </button>
              <button
                type="button"
                className="relative group cursor-pointer overflow-hidden aspect-square rounded-sm text-left"
                onClick={() => navigate("/danh-muc")}
              >
                <img
                  alt="Túi Ha Long Bay"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCee62vsNBDzGeyiMfY0FxEJ0Hjs28pHfx0mahhbI1uauMfpzQLH7PrQzhmKp4I5edBsqCeyiZAAjD_KTE7so_MQ5rD0Mw1CxRE7ipreR1mgZrS_ZfTHHvkVWRthYNkFFsrQcge4gr32iIQMQVRJAFJVUmFDAb0Hk8xYjDvMMydh_pzo8cHqggiWyxnvO8I4OZNWDbpI6B22g2LH3TegRQxfBaS1GjItSUJq49Ffx63d3ltjCVS6vMD4JOMgv1rGhXJ7yGd3VEjkTQ"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white font-label-md text-label-md truncate">TÚI HA LONG BAY</p>
                </div>
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
