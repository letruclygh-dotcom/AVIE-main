import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

export default function SuccessPage() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  // Trigger entrance animations
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Top App Bar (Header) */}
      <header className="flex justify-between items-center px-container-padding h-16 w-full sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-outline-variant shrink-0">
        <button
          className="text-primary hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
          type="button"
          onClick={() => alert("Chức năng tìm kiếm sản phẩm đang được xây dựng!")}
        >
          <span className="material-symbols-outlined">search</span>
        </button>
        <div className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary tracking-tighter uppercase font-sans">
          AOVIE
        </div>
        <button
          className="text-primary hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
          type="button"
          onClick={() => alert("Chức năng giỏ hàng đang được xây dựng!")}
        >
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-container-padding py-12 max-w-md mx-auto w-full">
        {/* Urban Nostalgia Hero Image */}
        <div
          className={[
            "relative w-full max-w-xs aspect-[4/5] mb-8 overflow-hidden bg-surface-container rounded-lg border border-outline-variant transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <img
            alt="Success Illustration"
            className="w-full h-full object-cover mix-blend-multiply opacity-90"
            src="https://i.ibb.co/FvnTxYt/11.png"
          />
          {/* Terracotta Overlay with scaling checkmark */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-[2px]">
            <div
              className={[
                "w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 ease-out delay-200",
                isMounted ? "scale-100 opacity-100" : "scale-50 opacity-0",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-white !text-5xl font-bold">check</span>
            </div>
          </div>
        </div>

        {/* Success Message Section */}
        <div
          className={[
            "text-center space-y-4 max-w-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150",
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
            Đặt hàng thành công!
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed px-2">
            Cảm ơn quý khách đã tin tưởng lựa chọn AOVIE. Đơn hàng của bạn đang được chúng tôi chuẩn bị một cách tỉ mỉ nhất.
          </p>
          <div className="inline-block py-2 px-6 bg-surface-container border border-outline-variant rounded-full">
            <span className="font-label-md text-label-md text-secondary opacity-80 mr-2 uppercase">Mã đơn hàng:</span>
            <span className="font-label-md text-label-md text-primary font-bold">#AV12345</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={[
            "w-full max-w-xs mt-10 space-y-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300",
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={() => alert("Đang định vị mã đơn hàng #AV12345...")}
            className="w-full py-4 bg-secondary text-white font-label-md text-label-md uppercase tracking-widest rounded transition-all hover:bg-secondary/95 active:scale-95 shadow-sm font-semibold"
          >
            Theo dõi đơn hàng
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-4 border border-secondary text-secondary font-label-md text-label-md uppercase tracking-widest rounded transition-all hover:bg-secondary hover:text-white active:scale-95 font-semibold"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </main>
    </div>
  );
}
