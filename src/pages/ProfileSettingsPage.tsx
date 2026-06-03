import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileSettingsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const items = document.querySelectorAll(".cursor-pointer");
    const handlers: Array<{
      el: Element;
      mousedown: () => void;
      mouseup: () => void;
      mouseleave: () => void;
    }> = [];

    items.forEach((item) => {
      const el = item as HTMLElement;
      const mousedown = () => {
        el.style.transform = "scale(0.98)";
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
    <div className="bg-background text-on-surface min-h-screen flex flex-col profile-settings">
      {/* TopAppBar (From JSON) */}
      <header className="flex justify-between items-center px-container-padding h-16 w-full sticky top-0 z-50 bg-background border-b border-outline-variant">
        <button
          type="button"
          className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 transition-transform"
          onClick={() => navigate("/tim-kiem")}
        >
          <span className="material-symbols-outlined" data-icon="search">
            search
          </span>
        </button>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary tracking-tighter uppercase">
          <img
            alt="AOVIE Logo"
            className="h-10 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3y9Uiw9HI-8sbfKZn9Dmh5OxN8JzZ7h2TSF_Y9OW9KimqBVbDEbWX28eEwl9v1PV6e0Si5FqvRbtT83kpr_WbaclXCZWwEq2mHlMKb5nia_8sWHLPZnC3pyNUq4zrEkDwd7qkuCHHI0AkhtkO6E87LV8hsDTC8n16TuhQPOAR-GimuExKOEEptonlJRxvk-EcAe5Ss6Re40NKLi76fAxSUoc5VeGbSMi-Nyii_w2tTh0-E64waf8eJoMsfFj_eKuw9TPVX-AUzCQ"
          />
        </h1>
        <button
          type="button"
          className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 transition-transform relative"
          onClick={() => navigate("/thanh-toan")}
        >
          <span className="material-symbols-outlined" data-icon="shopping_cart">
            shopping_cart
          </span>
          <span className="absolute -top-1 -right-1 bg-secondary text-white text-[8px] px-1 rounded-full">
            2
          </span>
        </button>
      </header>

      {/* Main Canvas */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-container-padding py-section-gap overflow-y-auto custom-scrollbar">
        {/* Profile Header Section */}
        <section className="flex flex-col items-center mb-10">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border border-outline-variant overflow-hidden bg-surface-container">
              <img
                className="w-full h-full object-cover"
                data-alt="A portrait of a stylish young Vietnamese man in a minimalist earth-toned studio setting. The lighting is soft and warm, reminiscent of late afternoon sun in Saigon. He wears a high-quality brown linen shirt that aligns with the brand's rugged yet refined aesthetic. The background is a clean, neutral tan color that creates a high-end lookbook feel."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmcQLLBc9IUdGbgELw-Nrt73xEwIxwER6R2B3tJUNget63iEy0thGJt5UCCv9q-9Tha8NWXDhs2ERfYMPtuANAb2Ro2Zo5ocp_mKin2808Blh1Uknriax8Kv_a5fBo22UYNZdFlVP-DKvhUvp0nIUbuesbuOFZKPnCd2fmcS3yWGWroMXIr36x4VPjBvMA8YFmNWb5H4l8Of84EeY5swiSqGujAcDmgYq2hS_Fa7KOZV88oPHyDzriCdjjLf2_uko34VsoJVMoAYMxbw"
              />
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-sm hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined !text-[16px]" data-icon="edit">
                edit
              </span>
            </button>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary">Helen Chen</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">helenchen@gmail.com</p>
        </section>

        {/* Settings List */}
        <div className="space-y-gutter">
          {/* Group: Thông tin cá nhân */}
          <div className="bg-surface rounded-lg border border-outline-variant overflow-hidden">
            <div className="px-gutter py-3 bg-surface-container-low border-b border-outline-variant">
              <span className="font-label-md text-label-md text-outline uppercase tracking-widest">
                CHỈNh Sửa Hồ sơ
                <span
                  className="material-symbols-outlined !text-[14px] ml-1.5 align-middle text-on-surface-variant"
                  data-icon="edit"
                >
                  edit
                </span>
              </span>
            </div>
            <div className="divide-y divide-outline-variant">
              <div
                className="flex justify-between items-center px-gutter py-4 hover:bg-surface-container-low transition-colors cursor-pointer group"
                style={{ transform: "scale(1)" }}
              >
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant">Họ tên</span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">Helen Chen</span>
                </div>
              </div>
              <div
                className="flex justify-between items-center px-gutter py-4 hover:bg-surface-container-low transition-colors cursor-pointer group"
                style={{ transform: "scale(1)" }}
              >
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant">Email</span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    helen.chen@gmail.com
                  </span>
                </div>
              </div>
              <div
                className="flex justify-between items-center px-gutter py-4 hover:bg-surface-container-low transition-colors cursor-pointer group"
                style={{ transform: "scale(1)" }}
              >
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface-variant">Số điện thoại</span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">0938752999</span>
                </div>
              </div>
            </div>
          </div>

          {/* Group: Bảo mật & Tùy chọn */}
          <div className="bg-surface rounded-lg border border-outline-variant overflow-hidden">
            <div className="px-gutter py-3 bg-surface-container-low border-b border-outline-variant">
              <span className="font-label-md text-label-md text-outline uppercase tracking-widest">
                Bảo mật và Tùy chọn
                <span
                  className="material-symbols-outlined !text-[14px] ml-1.5 align-middle text-on-surface-variant"
                  data-icon="edit"
                >
                  edit
                </span>
              </span>
            </div>
            <div className="divide-y divide-outline-variant">
              {/* Đổi mật khẩu */}
              <div
                className="flex items-center px-gutter py-4 hover:bg-surface-container-low transition-colors cursor-pointer group"
                style={{ transform: "scale(1)" }}
              >
                <span className="material-symbols-outlined mr-4 text-primary" data-icon="lock_reset">
                  lock_reset
                </span>
                <span className="flex-1 font-body-md text-body-md text-on-surface">Đổi mật khẩu</span>
                <span
                  className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors"
                  data-icon="chevron_right"
                >
                  chevron_right
                </span>
              </div>
              {/* Cài đặt thông báo */}
              <div
                className="flex items-center px-gutter py-4 hover:bg-surface-container-low transition-colors cursor-pointer group"
                style={{ transform: "scale(1)" }}
              >
                <span className="material-symbols-outlined mr-4 text-primary" data-icon="notifications">
                  notifications
                </span>
                <span className="flex-1 font-body-md text-body-md text-on-surface">Cài đặt thông báo</span>
                <div className="flex items-center">
                  <span className="font-label-md text-label-md text-outline mr-2">Bật</span>
                  <span
                    className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors"
                    data-icon="chevron_right"
                  >
                    chevron_right
                  </span>
                </div>
              </div>
              {/* Ngôn ngữ */}
              <div
                className="flex items-center px-gutter py-4 hover:bg-surface-container-low transition-colors cursor-pointer group"
                style={{ transform: "scale(1)" }}
              >
                <span className="material-symbols-outlined mr-4 text-primary" data-icon="language">
                  language
                </span>
                <span className="flex-1 font-body-md text-body-md text-on-surface">Ngôn ngữ</span>
                <div className="flex items-center">
                  <span className="font-label-md text-label-md text-outline mr-2">Tiếng Việt</span>
                  <span
                    className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors"
                    data-icon="chevron_right"
                  >
                    chevron_right
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Group: Khác */}
          <div className="bg-surface rounded-lg border border-outline-variant overflow-hidden">
            <div className="px-gutter py-3 bg-surface-container-low border-b border-outline-variant">
              <span className="font-label-md text-label-md text-outline uppercase tracking-widest">
                Khác
                <span
                  className="material-symbols-outlined !text-[14px] ml-1.5 align-middle text-on-surface-variant"
                  data-icon="edit"
                >
                  edit
                </span>
              </span>
            </div>
            <div className="divide-y divide-outline-variant">
              {/* Về AoVie */}
              <div className="flex items-center px-gutter py-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
                <span className="material-symbols-outlined mr-4 text-primary" data-icon="info">
                  info
                </span>
                <div className="flex-1 flex flex-col">
                  <span className="font-body-md text-body-md text-on-surface">Về AoVie</span>
                  <span className="font-label-md text-[10px] text-outline">Phiên bản 1.0.4</span>
                </div>
                <span
                  className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors"
                  data-icon="chevron_right"
                >
                  chevron_right
                </span>
              </div>
              {/* Help center */}
              <div className="flex items-center px-gutter py-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
                <span className="material-symbols-outlined mr-4 text-primary" data-icon="help_center">
                  help_center
                </span>
                <span className="flex-1 font-body-md text-body-md text-on-surface">Trung tâm trợ giúp</span>
                <span
                  className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors"
                  data-icon="chevron_right"
                >
                  chevron_right
                </span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            className="w-full mt-8 py-4 bg-transparent border border-error text-error font-label-md text-label-md uppercase tracking-widest rounded transition-all hover:bg-error hover:text-white active:scale-95"
          >
            Đăng xuất
          </button>

          {/* Bottom Margin for safe area */}
          <div className="h-20"></div>
        </div>
      </main>

      {/* BottomNavBar (From JSON) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-gutter pb-safe bg-surface border-t border-outline-variant">
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
          to="/trang-chu"
        >
          <span className="material-symbols-outlined" data-icon="home">
            home
          </span>
          <span className="font-label-md text-label-md">Trang chủ</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
          to="/danh-muc"
        >
          <span className="material-symbols-outlined" data-icon="grid_view">
            grid_view
          </span>
          <span className="font-label-md text-label-md">Danh mục</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
          to="/don-hang"
        >
          <span className="material-symbols-outlined" data-icon="receipt_long">
            receipt_long
          </span>
          <span className="font-label-md text-label-md">Đơn hàng</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
          to="/thong-bao"
        >
          <span className="material-symbols-outlined" data-icon="notifications">
            notifications
          </span>
          <span className="font-label-md text-label-md">Thông báo</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-secondary font-bold relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-secondary after:rounded-full"
          to="/toi"
        >
          <span
            className="material-symbols-outlined"
            data-icon="person"
            data-weight="fill"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            person
          </span>
          <span className="font-label-md text-label-md">Tôi</span>
        </Link>
      </nav>
    </div>
  );
}
