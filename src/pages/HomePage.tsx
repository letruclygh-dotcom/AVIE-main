import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [savedVouchers, setSavedVouchers] = useState<Record<string, boolean>>({});

  const products: Product[] = [
    {
      id: "p1",
      title: "Áo Thun Unisex - 100% COTTON - “Bánh Mì”",
      price: "225.000đ",
      image: "https://i.ibb.co/PG3p6wTs/6.png",
    },
    {
      id: "p2",
      title: 'Áo Thun Unisex  - 100% COTTON - "Nón Lá"',
      price: "225.000đ",
      image: "https://i.ibb.co/zhP9w9gz/10.png",
    },
    {
      id: "p3",
      title: "Áo Thun Unisex - 100% Cotton - “Độc Lập”",
      price: "225.000đ",
      image: "https://i.ibb.co/hxBR2WM3/3.png",
    },
    {
      id: "p4",
      title: "Túi Tote Canvas In Hình Hạ Long Bay",
      price: "59.000đ",
      image: "https://i.ibb.co/nsFs3RHn/13.png",
    },
  ];

  const handleProductClick = (product: Product) => {
    if (
      window.confirm(
        `Bạn muốn chọn mua nhanh sản phẩm "${product.title}" với giá ${product.price}?`
      )
    ) {
      navigate("/thanh-toan");
    }
  };

  const handleSaveVoucher = (code: string) => {
    if (savedVouchers[code]) return;
    setSavedVouchers((prev) => ({ ...prev, [code]: true }));
    alert(`Đã lưu mã giảm giá "${code}" thành công!`);
  };

  return (
    <div className="bg-background text-on-background min-h-screen pb-24 font-sans relative antialiased select-none">
      <GrainTexture />

      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background border-b border-outline-variant px-container-padding h-20 flex flex-col justify-center gap-2">
        <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
          <button 
            onClick={() => navigate("/tim-kiem")}
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-150 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          
          <div className="flex items-center justify-center">
            <img 
              alt="AoVie Logo" 
              className="object-contain h-10 cursor-pointer" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV_6lNmIh8kV1bS5JBIpDTcLHkFVwU9tr29aW_qOH-d0BEgN6Uh0kZC-S0lSyRuFNGXEVKJ5uZ-A90OtF0kEMGGjTF5pwANinlr-HI6QBJd6owfKlXhsYl4wVjAb718K5UB0R9YR3h8j6nCh9g8PSKZNWLOkUoV6SHatrDd3OE41cEpsAMUpkmJdbydAU_svqDrQgA5hhsC3fyunggSOWxltN-0nkDv7ow4UIPlqmX72TxwPoGl8k0DN5xHH3t4f8t4MoE1LCC5b6D"
              onClick={() => navigate("/hub")}
            />
          </div>
          
          <button 
            onClick={() => navigate("/thanh-toan")}
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-150 relative flex items-center justify-center"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">2</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mt-24 px-container-padding space-y-section-gap max-w-screen-xl mx-auto w-full">
        {/* Voucher Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-beVietnamPro font-bold text-[18px] text-primary tracking-tight">
              Ưu đãi hôm nay
            </h2>
            <button 
              onClick={() => navigate("/bo-loc")}
              className="text-secondary font-beVietnamPro font-medium text-[12px] uppercase tracking-wider hover:opacity-85 transition-opacity"
            >
              Xem tất cả
            </button>
          </div>
          
          <div className="flex overflow-x-auto gap-4 hide-scrollbar -mx-container-padding px-container-padding">
            {/* Voucher Card 1 */}
            <div className="flex-shrink-0 w-[280px] bg-secondary-container rounded-lg p-4 flex justify-between items-center border border-outline-variant overflow-hidden relative">
              <div className="relative z-10">
                <p className="font-beVietnamPro font-bold text-on-secondary-container text-[14px]">Mã AOVIE21</p>
                <p className="font-beVietnamPro text-on-secondary-container text-[12px] opacity-80">Giảm 10% đơn đầu tiên</p>
              </div>
              <button 
                onClick={() => handleSaveVoucher("AOVIE21")}
                className={`relative z-10 px-4 py-2 rounded font-beVietnamPro text-[11px] font-bold uppercase active:scale-95 transition-all ${
                  savedVouchers["AOVIE21"] 
                    ? "bg-[#5d4037] text-white/70 cursor-default" 
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {savedVouchers["AOVIE21"] ? "Đã lưu" : "Lưu mã"}
              </button>
              {/* Decorative Element */}
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-on-secondary-container opacity-10 rounded-full"></div>
            </div>
            
            {/* Voucher Card 2 */}
            <div className="flex-shrink-0 w-[280px] bg-tertiary-fixed-dim rounded-lg p-4 flex justify-between items-center border border-outline-variant overflow-hidden relative">
              <div className="relative z-10">
                <p className="font-beVietnamPro font-bold text-on-tertiary-fixed text-[14px]">Mã RETROVIBE</p>
                <p className="font-beVietnamPro text-on-tertiary-fixed text-[12px] opacity-80">Miễn phí vận chuyển</p>
              </div>
              <button 
                onClick={() => handleSaveVoucher("RETROVIBE")}
                className={`relative z-10 px-4 py-2 rounded font-beVietnamPro text-[11px] font-bold uppercase active:scale-95 transition-all ${
                  savedVouchers["RETROVIBE"] 
                    ? "bg-[#5d4037] text-white/70 cursor-default" 
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {savedVouchers["RETROVIBE"] ? "Đã lưu" : "Lưu mã"}
              </button>
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-beVietnamPro font-bold text-[18px] text-primary tracking-tight">Sản phẩm nổi bật</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => navigate("/bo-loc")}
                className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center active:scale-90 transition-transform hover:bg-surface-variant/30"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-3 gap-y-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer block"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-[3/4] bg-surface-container overflow-hidden rounded mb-3 relative">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-beVietnamPro text-[14px] font-bold text-primary leading-tight line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="font-beVietnamPro text-[14px] text-secondary font-bold">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Story Banner */}
        <section className="py-4">
          <div className="bg-primary-container rounded-xl p-8 flex flex-col items-center text-center space-y-4">
            <span className="material-symbols-outlined text-primary-fixed-dim text-4xl">history_edu</span>
            <h3 className="font-beVietnamPro font-bold text-primary-fixed text-[20px]">Câu chuyện AoVie</h3>
            <p className="font-beVietnamPro text-primary-fixed-dim text-[13px] leading-relaxed max-w-[280px]">
              Kết nối hơi thở đường phố hiện đại với những giá trị hoài cổ của Việt Nam.
            </p>
            <button 
              onClick={() => navigate("/gioi-thieu")}
              className="bg-background text-primary px-6 py-2.5 rounded-full font-beVietnamPro text-[12px] font-bold uppercase tracking-widest active:scale-95 transition-transform hover:bg-background/95"
            >
              KHÁM PHÁ NGAY
            </button>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 border-t border-outline-variant bg-background">
        <div className="flex justify-around items-center px-2 pb-safe w-full max-w-screen-xl mx-auto h-14">
          {/* Trang chủ (Active) */}
          <button 
            onClick={() => navigate("/trang-chu")}
            className="flex flex-col items-center justify-center relative active:scale-90 transition-transform"
          >
            <span 
              className="material-symbols-outlined text-[24px]" 
              style={{ color: "rgb(93, 64, 55)", fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            >
              home
            </span>
            <span className="font-medium text-[10px]" style={{ color: "rgb(93, 64, 55)" }}>Trang chủ</span>
            <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" style={{ backgroundColor: "rgb(93, 64, 55)" }}></span>
          </button>
          
          {/* Danh mục */}
          <button 
            onClick={() => navigate("/danh-muc")}
            className="flex flex-col items-center justify-center text-on-surface-variant transition-colors active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[24px]">grid_view</span>
            <span className="font-medium text-[10px]">Danh mục</span>
          </button>
          
          {/* Đơn hàng */}
          <button 
            onClick={() => navigate("/don-hang")}
            className="flex flex-col items-center justify-center text-on-surface-variant transition-colors active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[24px]">receipt_long</span>
            <span className="font-medium text-[10px]">Đơn hàng</span>
          </button>
          
          {/* Thông báo */}
          <button 
            onClick={() => navigate("/thong-bao")}
            className="flex flex-col items-center justify-center text-on-surface-variant transition-colors active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="font-medium text-[10px]">Thông báo</span>
          </button>
          
          {/* Tôi */}
          <button 
            onClick={() => navigate("/toi")}
            className="flex flex-col items-center justify-center text-on-surface-variant transition-colors active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[24px]">person</span>
            <span className="font-medium text-[10px]">Tôi</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
