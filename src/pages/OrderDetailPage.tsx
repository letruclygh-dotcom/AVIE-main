import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

export default function OrderDetailPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background min-h-screen pb-20 font-sans relative antialiased select-none">
      <GrainTexture />

      {/* TopAppBar */}
      <header className="flex justify-between items-center px-container-padding h-16 w-full sticky top-0 z-50 bg-background border-b border-outline-variant">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:opacity-80 transition-opacity cursor-pointer w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary tracking-tighter uppercase">
          AOVIE
        </h1>
        <div className="flex items-center">
          <button
            onClick={() => alert("Giỏ hàng đang tải...")}
            className="text-primary hover:opacity-80 transition-opacity cursor-pointer w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-primary">shopping_cart</span>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-container-padding py-6 space-y-6 relative z-10">
        {/* Order Identification & Status */}
        <section className="bg-surface-container-low p-5 border border-outline-variant rounded-lg space-y-3 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest font-bold">
              Mã đơn hàng
            </span>
            <span className="font-body-lg text-body-lg font-bold text-primary">#AV12345</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest font-bold">
              Trạng thái
            </span>
            <div className="flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              <span className="font-headline-md text-headline-md text-secondary font-bold text-base">
                Đang giao
              </span>
            </div>
          </div>
          <div className="pt-4 border-t border-outline-variant/30">
            <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
              Niềm tự hào di sản đang trên đường tới bạn. Dự kiến giao vào Thứ Năm, 24/10.
            </p>
          </div>
        </section>

        {/* Product List */}
        <section className="space-y-4">
          <h2 className="font-label-md text-label-md text-primary uppercase tracking-widest border-b border-outline-variant pb-2 font-bold">
            Danh sách sản phẩm
          </h2>
          <div className="flex gap-4 items-start py-2">
            <div className="w-24 h-32 flex-shrink-0 bg-surface-container-highest overflow-hidden border border-outline-variant rounded-lg">
              <img
                alt="Áo Thun Unisex - 100% COTTON - “Bánh Mì”"
                className="w-full h-full object-cover"
                src="https://i.ibb.co/PG3p6wTs/6.png"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between h-32 py-1">
              <div>
                <h3 className="font-body-lg text-body-lg font-bold text-primary leading-tight text-sm">
                  Áo Thun Unisex - 100% COTTON - “Bánh Mì”
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Size: L | Số lượng: 1
                </p>
              </div>
              <p className="font-body-lg text-body-lg font-bold text-secondary">225.000đ</p>
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => navigate("/danh-gia")}
              className="px-4 py-2 bg-secondary text-white font-label-md text-xs uppercase tracking-wider rounded font-bold hover:opacity-90 active:scale-95 transition-all"
            >
              Viết Đánh Giá
            </button>
          </div>
        </section>

        {/* Shipping & Recipient Information */}
        <section className="space-y-4">
          <h2 className="font-label-md text-label-md text-primary uppercase tracking-widest border-b border-outline-variant pb-2 font-bold">
            Thông tin giao hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface p-5 border border-outline-variant rounded-lg shadow-xs">
            <div className="space-y-1">
              <p className="font-label-md text-label-md text-on-surface-variant font-bold">
                NGƯỜI NHẬN
              </p>
              <p className="font-body-lg text-body-lg text-on-surface font-bold">
                Nguyễn Minh Hoàng
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">090 123 4567</p>
            </div>
            <div className="space-y-1">
              <p className="font-label-md text-label-md text-on-surface-variant font-bold">Địa chỉ</p>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                123 Đường Tôn Thất Đạm, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
              </p>
            </div>
          </div>
        </section>

        {/* Payment Summary */}
        <section className="bg-surface-container p-5 border border-outline-variant rounded-lg shadow-xs">
          <div className="space-y-3">
            <div className="flex justify-between font-body-md text-body-md">
              <span className="text-on-surface-variant">Tạm tính (1 sản phẩm)</span>
              <span className="text-on-surface">225.000đ</span>
            </div>
            <div className="flex justify-between font-body-md text-body-md">
              <span className="text-on-surface-variant">Phí vận chuyển</span>
              <span className="text-on-surface">30.000đ</span>
            </div>
            <div className="flex justify-between font-body-md text-body-md">
              <span className="text-on-surface-variant">Giảm giá</span>
              <span className="text-on-surface text-secondary font-bold">-0đ</span>
            </div>
            <div className="pt-3 border-t border-outline-variant flex justify-between items-center">
              <span className="font-label-md text-label-md text-primary uppercase font-bold">
                Tổng thanh toán
              </span>
              <span className="font-headline-lg text-headline-lg text-secondary font-bold">
                255.000đ
              </span>
            </div>
          </div>
        </section>

        {/* Contact Support Button */}
        <div className="pt-4">
          <button
            onClick={() => navigate("/ho-tro")}
            className="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded-lg uppercase tracking-widest hover:bg-primary-container transition-all flex items-center justify-center gap-2 font-bold active:scale-[0.98] shadow-md shadow-primary/10"
          >
            <span className="material-symbols-outlined">support_agent</span>
            Liên hệ hỗ trợ tận tâm
          </button>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-gutter pb-safe bg-surface border-t border-outline-variant">
        {/* Trang chủ */}
        <button
          onClick={() => navigate("/trang-chu")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-2 w-16"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-md text-label-md">Trang chủ</span>
        </button>
        {/* Danh mục */}
        <button
          onClick={() => navigate("/bo-loc")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-2 w-16"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-label-md">Danh mục</span>
        </button>
        {/* Đơn hàng (Active) */}
        <button
          onClick={() => navigate("/don-hang")}
          className="flex flex-col items-center justify-center text-secondary font-bold relative px-2 w-16"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            receipt_long
          </span>
          <span className="font-label-md text-label-md font-bold">Đơn hàng</span>
          <div className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full"></div>
        </button>
        {/* Thông báo */}
        <button
          onClick={() => navigate("/thong-bao")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-2 w-16"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-label-md text-label-md">Thông báo</span>
        </button>
        {/* Tôi */}
        <button
          onClick={() => navigate("/toi")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-2 w-16"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-md text-label-md">Tôi</span>
        </button>
      </nav>
    </div>
  );
}
