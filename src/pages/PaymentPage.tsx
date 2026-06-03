import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

type ShippingMethod = "standard";
type PaymentMethod = "cod" | "bank" | "wallet";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [recipientName, setRecipientName] = useState("Nguyễn Văn A");
  const [recipientPhone, setRecipientPhone] = useState("090 1234 567");
  const [shippingAddress, setShippingAddress] = useState(
    "Số nhà, tên đường, phường/xã, quận/huyện..."
  );
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  // Focus styles helper
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      alert(
        "Cảm ơn bạn đã đặt hàng! AoVie sẽ liên hệ sớm nhất để xác nhận đơn hàng."
      );
      setIsProcessing(false);
      navigate("/dat-hang-thanh-cong");
    }, 1500);
  };

  return (
    <div className="bg-background text-on-surface selection:bg-secondary-container selection:text-on-secondary-container min-h-screen pb-32 font-sans relative antialiased select-none">
      <GrainTexture />

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-[0.2em] text-primary uppercase">
            AoVie
          </h1>
          <button
            type="button"
            onClick={() => alert("Giỏ hàng đang được tải...")}
            className="hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-20 pb-12 px-container-padding max-w-md mx-auto font-sans relative z-10">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant/60">
            Giỏ hàng
          </span>
          <span className="h-px bg-outline-variant flex-grow mx-4"></span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-bold border-b-2 border-primary pb-1">
            Thanh toán
          </span>
          <span className="h-px bg-outline-variant flex-grow mx-4"></span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant/60">
            Hoàn tất
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-section-gap">
          {/* Section 1: Thông tin người nhận */}
          <section>
            <h2 className="font-headline-md text-headline-md mb-6 flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined">account_circle</span>
              Thông tin người nhận
            </h2>
            <div className="space-y-6">
              <div className="relative">
                <label
                  className={`font-label-md text-label-md mb-2 block uppercase tracking-wider transition-colors ${
                    activeInput === "name" ? "text-secondary font-bold" : "text-on-surface-variant"
                  }`}
                >
                  Họ tên
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  onFocus={() => setActiveInput("name")}
                  onBlur={() => setActiveInput(null)}
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-all placeholder:text-on-surface-variant/40 font-sans"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <div className="relative">
                <label
                  className={`font-label-md text-label-md mb-2 block uppercase tracking-wider transition-colors ${
                    activeInput === "phone" ? "text-secondary font-bold" : "text-on-surface-variant"
                  }`}
                >
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  onFocus={() => setActiveInput("phone")}
                  onBlur={() => setActiveInput(null)}
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-all placeholder:text-on-surface-variant/40 font-sans"
                  placeholder="090 1234 567"
                  required
                />
              </div>
            </div>
          </section>

          {/* Section 2: Địa chỉ giao hàng */}
          <section>
            <h2 className="font-headline-md text-headline-md mb-6 flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined">distance</span>
              Địa chỉ giao hàng
            </h2>
            <div className="relative">
              <label
                className={`font-label-md text-label-md mb-2 block uppercase tracking-wider transition-colors ${
                  activeInput === "address" ? "text-secondary font-bold" : "text-on-surface-variant"
                }`}
              >
                Địa chỉ chi tiết
              </label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                onFocus={() => setActiveInput("address")}
                onBlur={() => setActiveInput(null)}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-all resize-none placeholder:text-on-surface-variant/40 font-sans"
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                rows={2}
                required
              />
            </div>
          </section>

          {/* Section 3: Phương thức vận chuyển */}
          <section>
            <h2 className="font-headline-md text-headline-md mb-6 flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined">package_2</span>
              Phương thức vận chuyển
            </h2>
            <label className="flex items-center justify-between p-5 bg-surface-container-low border border-outline-variant rounded-xl cursor-pointer hover:border-secondary/50 transition-all group">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === "standard"}
                  onChange={() => setShippingMethod("standard")}
                  className="w-5 h-5 text-secondary bg-surface border-outline-variant focus:ring-secondary focus:ring-offset-background"
                />
                <div>
                  <p className="font-body-md text-body-md font-bold text-on-surface font-sans">
                    Giao hàng tiêu chuẩn
                  </p>
                  <p className="font-label-md text-label-md text-on-surface-variant italic font-sans">
                    Dự kiến nhận hàng sau 3-5 ngày
                  </p>
                </div>
              </div>
              <span className="font-body-md text-body-md text-secondary font-bold font-sans">
                30.000đ
              </span>
            </label>
          </section>

          {/* Section 4: Phương thức thanh toán */}
          <section>
            <h2 className="font-headline-md text-headline-md mb-6 flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined">account_balance_wallet</span>
              Phương thức thanh toán
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-4 p-5 bg-surface-container-low border border-outline-variant rounded-xl hover:bg-surface-container transition-colors cursor-pointer group">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-5 h-5 text-secondary bg-surface border-outline-variant focus:ring-secondary focus:ring-offset-background"
                />
                <span className="font-body-md text-body-md uppercase tracking-wide text-on-surface font-sans">
                  Thanh toán khi nhận hàng (COD)
                </span>
              </label>
              <label className="flex items-center gap-4 p-5 bg-surface-container-low border border-outline-variant rounded-xl hover:bg-surface-container transition-colors cursor-pointer group">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="w-5 h-5 text-secondary bg-surface border-outline-variant focus:ring-secondary focus:ring-offset-background"
                />
                <span className="font-body-md text-body-md uppercase tracking-wide text-on-surface font-sans">
                  Chuyển khoản ngân hàng
                </span>
              </label>
              <label className="flex items-center gap-4 p-5 bg-surface-container-low border border-outline-variant rounded-xl hover:bg-surface-container transition-colors cursor-pointer group">
                <input
                  type="radio"
                  name="payment"
                  value="wallet"
                  checked={paymentMethod === "wallet"}
                  onChange={() => setPaymentMethod("wallet")}
                  className="w-5 h-5 text-secondary bg-surface border-outline-variant focus:ring-secondary focus:ring-offset-background"
                />
                <span className="font-body-md text-body-md uppercase tracking-wide text-on-surface font-sans">
                  Ví điện tử (Momo/ZaloPay)
                </span>
              </label>
            </div>
          </section>

          {/* Section 5: Tóm tắt đơn hàng */}
          <section className="bg-surface-container p-6 rounded-2xl border border-outline-variant font-sans">
            <h2 className="font-label-md text-label-md mb-6 uppercase tracking-[0.15em] text-on-surface-variant font-bold border-b border-outline-variant pb-3">
              Tóm tắt đơn hàng
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-body-md text-body-md text-on-surface-variant font-sans">
                  Tạm tính
                </span>
                <span className="font-body-md text-body-md font-medium font-sans">
                  225.000đ
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-md text-body-md text-on-surface-variant font-sans">
                  Phí vận chuyển
                </span>
                <span className="font-body-md text-body-md font-medium font-sans">
                  30.000đ
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 mt-2 border-t border-outline-variant">
                <span className="font-headline-md text-headline-md text-primary font-sans">
                  Tổng cộng
                </span>
                <span className="font-headline-md text-headline-md text-secondary font-sans">
                  255.000đ
                </span>
              </div>
            </div>
          </section>

          {/* Section 6: CTA Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full bg-primary text-on-primary py-4 rounded-xl font-label-md text-label-md uppercase tracking-[0.2em] font-bold active:scale-[0.98] transition-all shadow-xl shadow-primary/20 font-sans ${
                isProcessing ? "opacity-70 cursor-not-allowed" : "hover:bg-on-primary-fixed-variant"
              }`}
            >
              {isProcessing ? "ĐANG XỬ LÝ..." : "Xác nhận đặt hàng"}
            </button>
            <p className="text-center font-label-md text-label-md text-on-surface-variant mt-6 px-4 leading-relaxed italic opacity-80 font-sans">
              Nhấn "Xác nhận đặt hàng" đồng nghĩa với việc bạn đồng ý với Điều khoản mua hàng của AoVie.
            </p>
          </div>
        </form>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface/90 backdrop-blur-md font-sans">
        <div className="flex justify-around items-center h-16 px-2 pb-safe w-full max-w-screen-xl mx-auto">
          {/* Trang chủ */}
          <button
            onClick={() => navigate("/trang-chu")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Trang chủ</span>
          </button>
          {/* Danh mục */}
          <button
            onClick={() => navigate("/bo-loc")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">grid_view</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Danh mục</span>
          </button>
          {/* Đơn hàng (ACTIVE) */}
          <button
            onClick={() => navigate("/don-hang")}
            className="flex flex-col items-center justify-center text-secondary relative active:scale-90 w-16"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              receipt_long
            </span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Đơn hàng</span>
            <div className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full"></div>
          </button>
          {/* Thông báo */}
          <button
            onClick={() => navigate("/thong-bao")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Thông báo</span>
          </button>
          {/* Tôi */}
          <button
            onClick={() => navigate("/toi")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Tôi</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
