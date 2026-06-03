import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PaymentCardsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const cards = document.querySelectorAll(".rounded-xl");
    const handlers: Array<{
      el: HTMLElement;
      mousedown: () => void;
      mouseup: () => void;
      mouseleave: () => void;
    }> = [];

    cards.forEach((card) => {
      const el = card as HTMLElement;
      const mousedown = () => {
        el.style.transform = "scale(0.98)";
        el.style.transition = "transform 0.1s ease";
      };
      const mouseup = () => {
        el.style.transform = "scale(1)";
      };
      const mouseleave = () => {
        el.style.transform = "scale(1)";
      };
      el.addEventListener("mousedown", mousedown);
      el.addEventListener("mouseup", mouseup);
      el.addEventListener("mouseleave", mouseleave);
      handlers.push({ el, mousedown, mouseup, mouseleave });
    });

    return () => {
      handlers.forEach(({ el, mousedown, mouseup, mouseleave }) => {
        el.removeEventListener("mousedown", mousedown);
        el.removeEventListener("mouseup", mouseup);
        el.removeEventListener("mouseleave", mouseleave);
      });
    };
  }, []);

  return (
    <div className="payment-cards-page bg-background text-on-surface font-body-md selection:bg-secondary-container min-h-screen">
      {/* TopAppBar */}
      <header className="bg-surface sticky top-0 z-[60] border-b border-outline-variant flex items-center justify-between px-container-padding w-full h-16">
        <button
          type="button"
          className="hover:opacity-80 transition-opacity active:scale-95 transition-transform"
          onClick={() => navigate("/tim-kiem")}
        >
          <span className="material-symbols-outlined text-primary" data-icon="search">
            search
          </span>
        </button>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary">
          <img
            alt="AoVie Logo"
            className="h-10 w-auto mx-auto"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH8M4C3q7tB3wKbO60sE1uSHXvFND6kZYkVlf74WphJ3qJbhzwm5d3vyhsJAKkiPMPY-9SY_ipLill0jXiGHY5ArGSS21w_-DeVGtnLBq2cP8Zq1sSHZyrpYAp3qzp9Vn5Yc_HTQqiACRiGglYjh2qln1T0E-0gFoeMbUu2CiRtPuRuEmyFq702Hhz93GEaHRHbUqqWJ_ULW1ARYQr5yPzstdUNK-_4HD2NOKhbgIfLo1uewZQ0AZwDoJmhbDUKJO3hALO-hjXBj0"
          />
        </h1>
        <button
          type="button"
          className="hover:opacity-80 transition-opacity active:scale-95 transition-transform"
          onClick={() => navigate("/thanh-toan")}
        >
          <span className="material-symbols-outlined text-primary" data-icon="shopping_bag">
            shopping_bag
          </span>
        </button>
      </header>

      <main className="max-w-md mx-auto px-container-padding pb-32">
        {/* Page Title & Security Header */}
        <div className="mt-section-gap mb-6">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Thẻ thanh toán</h2>
          <div className="flex items-center gap-2 p-3 bg-surface-container rounded-lg border border-outline-variant">
            <span
              className="material-symbols-outlined text-on-surface-variant text-[18px]"
              data-icon="verified_user"
            >
              verified_user
            </span>
            <p className="font-label-md text-label-md text-on-surface-variant">
              Thông tin thanh toán của bạn được mã hóa an toàn.
            </p>
          </div>
        </div>

        {/* Payment Cards Container */}
        <div className="space-y-6">
          {/* Card 1: Visa Gold (Luxury Dark) */}
          <div
            className="relative w-full aspect-[1.58/1] rounded-xl overflow-hidden shadow-xl bg-primary card-texture"
            style={{ transform: "scale(1)", transition: "transform 0.1s" }}
          >
            <div className="absolute inset-0 glass-shine"></div>
            <div className="relative h-full p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-primary-container opacity-80 uppercase tracking-widest">
                    Thẻ ưu tiên
                  </span>
                  <span className="font-headline-md text-headline-md text-white mt-1">VISA</span>
                </div>
                <span
                  className="material-symbols-outlined text-secondary-fixed-dim text-4xl"
                  data-icon="contactless"
                >
                  contactless
                </span>
              </div>
              <div className="space-y-4">
                <p className="font-headline-md text-headline-md text-white tracking-[0.2em]">
                  •••• •••• •••• 8866
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-label-md text-label-md text-on-primary-container opacity-60 uppercase">
                      Chủ thẻ
                    </p>
                    <p className="font-body-lg text-body-lg text-white font-medium">TRAN BOI NGHI</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-md text-label-md text-on-primary-container opacity-60 uppercase">
                      Hết hạn
                    </p>
                    <p className="font-body-lg text-body-lg text-white font-medium">08/28</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Mastercard Beige (Retro Saigonese) */}
          <div
            className="relative w-full aspect-[1.58/1] rounded-xl overflow-hidden shadow-lg bg-surface-container-high border border-outline-variant"
            style={{ transform: "scale(1)", transition: "transform 0.1s" }}
          >
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #442a22 0, #442a22 1px, transparent 0, transparent 50%)",
                  backgroundSize: "8px 8px",
                }}
              ></div>
            </div>
            <div className="relative h-full p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                    Tiêu chuẩn
                  </span>
                  <img
                    alt="Mastercard"
                    className="h-8 w-auto mt-2 opacity-90"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGPK5j7IwXbbXxs_UQnuN04TBUPiM-bbzjL3RDlBaur8KzwbQ6nh9CVebVgHnPHSDV1pYGGv0D_ADyXTnf7C3q1mr6gRI18i-jxuQRgMAgWfoHzHX4xKVwA_koTZYP8wE9Kp_N6OgIZJqQGwFmekpHD15VpulETtIb_eeLZ7bMiWBXBYeQhHSecxgpkQtGZitYzT4JCbx6oP5KfIWy-C7IaToGffKneFoZzqvfQNbSPzd8vUrIuVM4nGGkJYUqEA36ggPaU3zsWjut"
                  />
                </div>
                <span
                  className="material-symbols-outlined text-primary opacity-40 text-4xl"
                  data-icon="chip_extraction"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  chip_extraction
                </span>
              </div>
              <div className="space-y-4">
                <p className="font-headline-md text-headline-md text-primary tracking-[0.2em]">
                  •••• •••• •••• 1234
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-label-md text-label-md text-on-surface-variant opacity-70 uppercase">
                      Chủ thẻ
                    </p>
                    <p className="font-body-lg text-body-lg text-primary font-medium">TRAN BOI NGHI</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-md text-label-md text-on-surface-variant opacity-70 uppercase">
                      Hết hạn
                    </p>
                    <p className="font-body-lg text-body-lg text-primary font-medium">12/25</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Card Button */}
          <button
            type="button"
            className="w-full h-20 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-xl hover:bg-surface-container transition-colors group active:scale-[0.98]"
          >
            <span
              className="material-symbols-outlined text-outline group-hover:text-primary transition-colors"
              data-icon="add_circle"
            >
              add_circle
            </span>
            <span className="font-label-md text-label-md uppercase text-on-surface-variant mt-2 tracking-widest group-hover:text-primary transition-colors">
              Thêm thẻ mới
            </span>
          </button>
        </div>

        {/* Management Options */}
        <section className="mt-section-gap space-y-4">
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest px-1">
            Tùy chọn quản lý
          </h3>
          <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
            <button
              type="button"
              className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-b-0 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" data-icon="lock">
                    lock
                  </span>
                </div>
                <span className="font-body-lg text-body-lg">Quản lý mã PIN thẻ</span>
              </div>
              <span
                className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform"
                data-icon="chevron_right"
              >
                chevron_right
              </span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-b-0 group"
              onClick={() => navigate("/vi-tien")}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" data-icon="history">
                    history
                  </span>
                </div>
                <span className="font-body-lg text-body-lg">Lịch sử giao dịch ví</span>
              </div>
              <span
                className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform"
                data-icon="chevron_right"
              >
                chevron_right
              </span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-b-0 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-error-container/10 flex items-center justify-center text-error">
                  <span className="material-symbols-outlined" data-icon="no_accounts">
                    no_accounts
                  </span>
                </div>
                <span className="font-body-lg text-body-lg text-error">Hủy liên kết tất cả</span>
              </div>
              <span
                className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform"
                data-icon="chevron_right"
              >
                chevron_right
              </span>
            </button>
          </div>
        </section>

        {/* Aesthetic Imagery Footer */}
        <div className="mt-section-gap"></div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-gutter bg-surface border-t border-outline-variant z-50">
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-4 py-1 rounded-lg"
          to="/trang-chu"
        >
          <span className="material-symbols-outlined" data-icon="home">
            home
          </span>
          <span className="font-label-md text-label-md">Trang chủ</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-4 py-1 rounded-lg"
          to="/danh-muc"
        >
          <span className="material-symbols-outlined" data-icon="grid_view">
            grid_view
          </span>
          <span className="font-label-md text-label-md">Danh mục</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-4 py-1 rounded-lg"
          to="/don-hang"
        >
          <span className="material-symbols-outlined" data-icon="receipt_long">
            receipt_long
          </span>
          <span className="font-label-md text-label-md">Đơn hàng</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-4 py-1 rounded-lg"
          to="/thong-bao"
        >
          <span className="material-symbols-outlined" data-icon="notifications">
            notifications
          </span>
          <span className="font-label-md text-label-md">Thông báo</span>
        </Link>
        {/* Active Tab: Tôi (Me/Profile) */}
        <Link
          className="flex flex-col items-center justify-center text-secondary scale-95 transition-transform px-4 py-1 rounded-lg"
          to="/toi"
        >
          <span
            className="material-symbols-outlined"
            data-icon="person"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            person
          </span>
          <span className="font-label-md text-label-md">Tôi</span>
          <div className="w-1 h-1 bg-secondary rounded-full mt-0.5"></div>
        </Link>
      </nav>
    </div>
  );
}
