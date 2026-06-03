import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

type PaymentMethod = "cod" | "momo" | "zalopay" | "bank";

export default function PaymentMethodPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  const options = [
    {
      id: "cod" as PaymentMethod,
      title: "Thanh toán khi nhận hàng (COD)",
      description: "Thanh toán bằng tiền mặt khi shipper giao tới",
      iconType: "icon",
      iconName: "payments",
    },
    {
      id: "momo" as PaymentMethod,
      title: "Ví điện tử Momo",
      description: "Nhanh chóng, tiện lợi qua ứng dụng Momo",
      iconType: "image",
      iconSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCG5PSsXh38oNzH00PEFCGSOQSMY7kS9r020yFrXFh_W50VMF4aFWO-Hj2KLQqXFTuO8mCCPbT0MULCE8VNPsd05jrrKlILk3BFNrg7Q98P7q-zVaP7P6bECvG8nYNeK7stbcI8HebaPC82dRrkAsI4nBA4qJSD0W_g-NsDRbzMu-vTbbU_H8fbofL8-mYbutZBtGRESDJpc0feWcsk9P_Q3ksSh9O7hzPuFsRKWmMKzpKDpjszX8RBpsaK20EsyEA7Dh8zIGd01Ubz",
    },
    {
      id: "zalopay" as PaymentMethod,
      title: "Ví điện tử ZaloPay",
      description: "Thanh toán an toàn qua ZaloPay",
      iconType: "image",
      iconSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAZBN02RdyDz9bMy6R-v-I2DZJA8_W1SZ-dCNF0ixGxF2adx54Rh14WzfttfEgzdHhyRA5eyKgeMnwIDhBADHBdNGS_DPxX40eR-CaHlAZPtsVkuj39vpoMiC9NFiSgrj3l608FP7HtOKAR__K7nawY0--mLybB5XOnLb9TNKI6mc8oiIv9a3ekEOcMRi7Q9mGWd5iyXKvrv9AdncM3tTq9faoSfd8C0SJhkJYlretI5OSpnrUXUGZ345nVV3GjkQLUCS-VlrtqXB-l",
    },
    {
      id: "bank" as PaymentMethod,
      title: "Chuyển khoản ngân hàng",
      description: "Chuyển khoản trực tiếp qua ngân hàng nội địa",
      iconType: "icon",
      iconName: "account_balance",
    },
  ];

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Đã chọn phương thức: " + selectedMethod.toUpperCase());
      setIsProcessing(false);
      navigate("/dat-hang-thanh-cong");
    }, 1000);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            type="button"
            className="hover:opacity-80 transition-opacity active:scale-95 transition-transform"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-primary uppercase text-[18px] tracking-wide">
            Phương thức thanh toán
          </h1>
          <div className="w-10"></div> {/* Visual Balance Spacer */}
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow pt-20 pb-24 px-container-padding max-w-screen-md mx-auto w-full relative z-10">
        {/* Summary Section */}
        <div className="mb-section-gap">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Lựa chọn thanh toán</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Chọn phương thức thanh toán an toàn và tiện lợi nhất cho bạn. AoVie cam kết bảo mật thông tin giao dịch tuyệt đối.
          </p>
        </div>

        {/* Payment Options Group */}
        <div className="space-y-4">
          {options.map((option) => {
            const isActive = selectedMethod === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelectedMethod(option.id)}
                disabled={isProcessing}
                className={`w-full text-left relative flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 group active:scale-[0.99] ${
                  isActive
                    ? "border-secondary bg-[#fef4ee]"
                    : "border-outline-variant bg-surface hover:border-secondary"
                }`}
              >
                <div className="flex items-center w-full">
                  <div
                    className={`w-10 h-10 flex items-center justify-center bg-surface-container rounded-lg mr-4 transition-colors overflow-hidden shrink-0 ${
                      isActive ? "bg-secondary-fixed text-secondary" : "group-hover:bg-secondary-fixed"
                    }`}
                  >
                    {option.iconType === "icon" ? (
                      <span className="material-symbols-outlined text-secondary">{option.iconName}</span>
                    ) : (
                      <img
                        alt={option.title}
                        className="w-8 h-8 rounded-md object-contain"
                        src={option.iconSrc}
                      />
                    )}
                  </div>
                  <div className="flex-grow pr-4">
                    <p className="font-body-lg text-body-lg font-semibold text-on-surface leading-tight">
                      {option.title}
                    </p>
                    <p className="font-label-md text-label-md text-on-surface-variant mt-1 leading-normal">
                      {option.description}
                    </p>
                  </div>
                  <div
                    className={`radio-dot w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center shrink-0 ${
                      isActive ? "border-secondary bg-secondary shadow-[inset_0_0_0_3px_#ffffff]" : "border-outline-variant"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Informational Banner */}
        <div className="mt-8 p-4 bg-surface-container rounded-lg flex items-start space-x-3 border border-outline-variant/30">
          <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">shield</span>
          <p className="font-label-md text-label-md text-on-surface-variant leading-relaxed">
            Mọi thông tin thanh toán của bạn được mã hóa 256-bit theo tiêu chuẩn quốc tế. AoVie không lưu trữ thông tin thẻ của khách hàng.
          </p>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 w-full bg-background border-t border-outline-variant p-4 z-50">
        <div className="max-w-screen-md mx-auto">
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className={`w-full bg-primary text-on-primary py-4 rounded font-label-md text-label-md uppercase tracking-widest transition-all hover:opacity-90 shadow-md font-bold ${
              isProcessing ? "opacity-70 cursor-not-allowed" : "active:scale-[0.98]"
            }`}
          >
            {isProcessing ? "ĐANG XỬ LÝ..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
}
