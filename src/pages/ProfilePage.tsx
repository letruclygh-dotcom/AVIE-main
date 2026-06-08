import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, loading, logout } = useAuth();

  const handleBottomNav = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi tài khoản AoVie?")) {
      await logout();
      navigate("/dang-nhap");
    }
  };

  if (loading) {
    return (
      <div className="bg-background text-on-surface min-h-screen flex items-center justify-center">
        <span className="animate-spin material-symbols-outlined text-4xl text-primary">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Top App Bar Header */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant shrink-0">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            className="hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10"
            type="button"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-primary uppercase text-headline-md tracking-wide whitespace-nowrap">
            Cá nhân
          </h1>
          <button
            className="hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10"
            type="button"
            onClick={() => alert("Mở cài đặt cá nhân...")}
          >
            <span className="material-symbols-outlined text-primary">settings</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-20 pb-28 px-container-padding max-w-md mx-auto w-full flex flex-col gap-6 relative z-10">
        {/* User Profile Header Card */}
        <section className="bg-surface border border-outline-variant p-5 rounded-lg flex items-center gap-4 mt-2 shadow-xs">
          {/* Avatar frame */}
          <div className="w-16 h-16 rounded-full border-2 border-secondary overflow-hidden shrink-0 bg-surface-container flex items-center justify-center">
            {user ? (
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmcQLLBc9IUdGbgELw-Nrt73xEwIxwER6R2B3tJUNget63iEy0thGJt5UCCv9q-9Tha8NWXDhs2ERfYMPtuANAb2Ro2Zo5ocp_mKin2808Blh1Uknriax8Kv_a5fBo22UYNZdFlVP-DKvhUvp0nIUbuesbuOFZKPnCd2fmcS3yWGWroMXIr36x4VPjBvMA8YFmNWb5H4l8Of84EeY5swiSqGujAcDmgYq2hS_Fa7KOZV88oPHyDzriCdjjLf2_uko34VsoJVMoAYMxbw"
                alt="Avatar"
              />
            ) : (
              <span className="material-symbols-outlined text-[40px] text-outline">account_circle</span>
            )}
          </div>

          {/* User Meta */}
          <div className="flex-grow">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-md text-primary text-[18px] font-bold leading-tight">
                    {profile?.full_name || "Thành viên AoVie"}
                  </h2>
                  <span className="bg-secondary-fixed text-on-secondary-container text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0">
                    {profile?.role === "admin" ? "Admin" : "Member"}
                  </span>
                </div>
                <p className="font-label-md text-label-md text-on-surface-variant mt-1">
                  {profile?.phone || "Chưa cập nhật SĐT"}
                </p>
                <p className="font-label-md text-label-md text-on-surface-variant text-[11px]">{user.email}</p>
              </>
            ) : (
              <>
                <h2 className="font-headline-md text-primary text-[18px] font-bold leading-tight">Khách</h2>
                <p className="font-label-md text-label-md text-on-surface-variant mt-1">
                  Đăng nhập để đặt hàng & theo dõi đơn hàng
                </p>
                <button
                  onClick={() => navigate("/dang-nhap")}
                  className="mt-2 text-xs bg-secondary text-on-secondary px-3 py-1 rounded font-bold uppercase tracking-wider"
                >
                  Đăng nhập
                </button>
              </>
            )}
          </div>
        </section>

        {/* Quick Wallet Summary Card */}
        <section
          onClick={() => navigate("/vi-tien")}
          className="bg-primary text-white p-5 rounded-lg relative overflow-hidden shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer group"
        >
          <div className="absolute right-[-10px] top-[-10px] opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-[90px]">account_balance_wallet</span>
          </div>

          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="font-label-md text-[10px] text-primary-fixed uppercase tracking-wider opacity-70">
                Ví AoVie của bạn
              </p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-display-lg text-[24px] text-primary-fixed font-bold">2.450.000</span>
                <span className="font-headline-md text-headline-md text-primary-fixed opacity-80">đ</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded text-xs font-bold tracking-wider uppercase">
              Xem lịch sử
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </div>
          </div>
        </section>

        {/* Account Menu Section */}
        <section className="bg-surface border border-outline-variant rounded-lg overflow-hidden shadow-xs shrink-0">
          {/* Menu Items */}
          <div className="flex flex-col">
            {/* Account Info */}
            <button
              onClick={() => navigate("/thong-tin-ca-nhan")}
              className="flex items-center justify-between p-4 border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">person</span>
                <span className="font-body-md text-body-md font-bold text-on-surface uppercase tracking-wide text-xs">
                  Thông tin cá nhân
                </span>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
            </button>

            {/* Payment Cards */}
            <button
              onClick={() => navigate("/the-thanh-toan")}
              className="flex items-center justify-between p-4 border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">credit_card</span>
                <span className="font-body-md text-body-md font-bold text-on-surface uppercase tracking-wide text-xs">
                  Thẻ thanh toán
                </span>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
            </button>

            {/* Vouchers */}
            <button
              onClick={() => navigate("/uu-dai")}
              className="flex items-center justify-between p-4 border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">confirmation_number</span>
                <span className="font-body-md text-body-md font-bold text-on-surface uppercase tracking-wide text-xs">
                  Ưu đãi của bạn
                </span>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
            </button>

            {/* Order Tracking (Point to /don-hang instead of SuccessPage!) */}
            <button
              onClick={() => navigate("/don-hang")}
              className="flex items-center justify-between p-4 border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">receipt_long</span>
                <span className="font-body-md text-body-md font-bold text-on-surface uppercase tracking-wide text-xs">
                  Đơn hàng của tôi
                </span>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
            </button>

            {/* Address */}
            <button
              onClick={() => navigate("/dia-chi-giao-hang")}
              className="flex items-center justify-between p-4 border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">location_on</span>
                <span className="font-body-md text-body-md font-bold text-on-surface uppercase tracking-wide text-xs">
                  Địa chỉ giao hàng
                </span>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
            </button>

            {/* Policy Page */}
            <button
              onClick={() => navigate("/chinh-sach")}
              className="flex items-center justify-between p-4 border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">shield</span>
                <span className="font-body-md text-body-md font-bold text-on-surface uppercase tracking-wide text-xs">
                  Chính sách đổi trả & bảo hành
                </span>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
            </button>

            {/* Support */}
            <button
              onClick={() => navigate("/ho-tro")}
              className="flex items-center justify-between p-4 border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">headset_mic</span>
                <span className="font-body-md text-body-md font-bold text-on-surface uppercase tracking-wide text-xs">
                  Hỗ trợ khách hàng
                </span>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
            </button>



            {/* Logout / Login */}
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-between p-4 hover:bg-error-container/30 transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error text-[22px]">logout</span>
                  <span className="font-body-md text-body-md font-bold text-error uppercase tracking-wide text-xs group-hover:underline">
                    Đăng xuất
                  </span>
                </div>
                <span className="material-symbols-outlined text-error opacity-70 text-[20px]">chevron_right</span>
              </button>
            ) : (
              <button
                onClick={() => navigate("/dang-nhap")}
                className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">login</span>
                  <span className="font-body-md text-body-md font-bold text-primary uppercase tracking-wide text-xs group-hover:underline">
                    Đăng nhập tài khoản
                  </span>
                </div>
                <span className="material-symbols-outlined text-primary opacity-70 text-[20px]">chevron_right</span>
              </button>
            )}
          </div>
        </section>
      </main>

      {/* Unified Bottom NavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-gutter pb-safe bg-surface border-t border-outline-variant">
        <button
          onClick={() => handleBottomNav("/trang-chu")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-md text-[10px] mt-1 font-sans">Trang chủ</span>
        </button>
        <button
          onClick={() => handleBottomNav("/danh-muc")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-[10px] mt-1 font-sans">Danh mục</span>
        </button>
        <button
          onClick={() => handleBottomNav("/don-hang")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-label-md text-[10px] mt-1 font-sans">Đơn hàng</span>
        </button>
        <button
          onClick={() => handleBottomNav("/thong-bao")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-label-md text-[10px] mt-1 font-sans">Thông báo</span>
        </button>
        <button
          onClick={() => handleBottomNav("/toi")}
          className="flex flex-col items-center justify-center text-secondary relative active:scale-90 w-16"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            person
          </span>
          <span className="font-label-md text-[10px] mt-1 font-sans font-bold">Tôi</span>
          <div className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full"></div>
        </button>
      </nav>
    </div>
  );
}
