import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

export default function ErrorPage() {
  const navigate = useNavigate();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      alert("Hệ thống kết nối mạng đã được khôi phục!");
      navigate("/trang-chu");
    }, 1500);
  };

  const handleBottomNav = (path: string) => {
    navigate(path);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Top App Bar Header */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-surface-variant shrink-0">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-7xl mx-auto">
          <button
            onClick={() => alert("Chức năng tìm kiếm sản phẩm đang được chuẩn bị!")}
            className="hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
            type="button"
          >
            <span className="material-symbols-outlined text-primary">search</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary uppercase flex items-center justify-center">
            <img
              alt="AoVie Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfIO8WBhKFVf0WvznCMIIVwNPaEGE8CAAerGxx9Dt4PLRV1Ldq0Oj-hGxHXSRI8rQsaT7R0iMLQueiZ4UM_mE1lEfEai89paofLkElKGsCS7Ac8xMKhN6WKjceRJKaSZvwqPHL5Q0Sg1s6nSaVxxfcZHdJMXMFGL1myD6a_YqqBiU0bQLeF6Z7JL6bYJpx6MtNuIDp1RPAEw9ZE6KYe7EAkK0r0XOXSZ18SC8JLPyI3gPcGAG9RM_SDDSWUHE42eO-S_zBpxdruY-N"
            />
          </h1>
          <button
            onClick={() => alert("Chức năng giỏ hàng đang được chuẩn bị!")}
            className="hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
            type="button"
          >
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center pb-24 px-container-padding pt-24">
        <div className="max-w-md w-full text-center space-y-8 animate-[fadeInScale_0.7s_ease-out_forwards]">
          {/* Error Message */}
          <div className="space-y-4 px-4">
            {/* Minimalist Error Icon backdrop */}
            <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="material-symbols-outlined !text-[44px]">wifi_off</span>
            </div>

            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
              Rất tiếc, đã có lỗi xảy ra
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-[280px] mx-auto leading-relaxed">
              Vui lòng kiểm tra kết nối mạng của bạn hoặc thử lại sau ít phút.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-4 max-w-[300px] mx-auto">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className={[
                "w-full py-4 bg-primary text-on-primary rounded font-label-md text-label-md uppercase tracking-widest transition-all shadow-md font-bold",
                isRetrying ? "opacity-60 cursor-not-allowed" : "hover:opacity-90 active:scale-95",
              ].join(" ")}
            >
              {isRetrying ? "ĐANG TẢI..." : "THỬ LẠI"}
            </button>
            <button
              onClick={() => navigate("/trang-chu")}
              disabled={isRetrying}
              className="block w-full text-center font-label-md text-label-md text-secondary uppercase tracking-widest hover:underline font-semibold py-2"
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
      </main>

      {/* BottomNavBar */}
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
          onClick={() => handleBottomNav("/loi")}
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

      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.97); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
