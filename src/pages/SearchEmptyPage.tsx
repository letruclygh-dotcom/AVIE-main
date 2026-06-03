import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

export default function SearchEmptyPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("Áo khoác da");

  const handleBottomNav = (path: string) => {
    navigate(path);
  };

  const handleClear = () => {
    setKeyword("");
  };

  return (
    <div className="bg-background text-on-surface min-h-screen pb-28 font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Top Navigation Bar Header */}
      <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant shrink-0">
        <div className="flex items-center justify-between px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:opacity-80 active:scale-95 transition-all w-10 h-10 flex items-center justify-center shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          {/* Prefilled Active Search Bar Input */}
          <div className="flex-1 mx-4 relative">
            <input
              className="w-full bg-surface-container-low border-none rounded-none py-2 px-10 text-body-md font-body-md focus:ring-1 focus:ring-secondary text-primary"
              placeholder="Tìm kiếm..."
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            {keyword && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors flex items-center"
                type="button"
              >
                <span className="material-symbols-outlined !text-[18px]">close</span>
              </button>
            )}
          </div>

          <button
            onClick={() => alert("Giỏ hàng đang chuẩn bị...")}
            className="text-primary hover:opacity-80 active:scale-95 transition-all w-10 h-10 flex items-center justify-center shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-screen-xl mx-auto">
        {/* Empty State Section */}
        <section className="flex flex-col items-center justify-center px-container-padding text-center py-20">
          <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined !text-[36px] text-outline">search_off</span>
          </div>

          <h1 className="font-headline-md text-headline-md text-primary mb-4 font-bold">Không tìm thấy kết quả</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mb-8 leading-relaxed">
            Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù hợp với từ khóa "{keyword || "từ khóa trống"}".
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
            <button
              onClick={() => navigate("/trang-chu")}
              className="w-full bg-primary text-on-primary py-4 font-label-md text-label-md rounded-none tracking-widest hover:bg-primary/95 transition-colors font-bold uppercase"
            >
              XEM SẢN PHẨM MỚI
            </button>
            <button
              onClick={() => navigate("/trang-chu")}
              className="w-full border border-primary text-primary py-4 font-label-md text-label-md rounded-none tracking-widest hover:bg-surface-variant transition-colors font-bold uppercase"
            >
              QUAY LẠI TRANG CHỦ
            </button>
          </div>
        </section>

        {/* Suggested Products */}
        <section className="px-container-padding pt-8 border-t border-outline-variant/40">
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-headline-md text-headline-md text-primary font-bold">Sản phẩm gợi ý cho bạn</h2>
            <button
              onClick={() => navigate("/bo-loc")}
              className="text-label-md font-label-md text-secondary border-b border-secondary font-bold tracking-wider hover:text-secondary/80"
            >
              XEM TẤT CẢ
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {/* Product Card 1 */}
            <div className="flex flex-col group cursor-pointer" onClick={() => alert("Sản phẩm: Áo Thun Unisex - “Bánh Mì”")}>
              <div className="aspect-[3/4] bg-surface-variant overflow-hidden relative rounded border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Cotton Tee Banh Mi"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaR-tnzfTdhsBTXfnwf2cw6YcgDD3wu797TYNUGqgXScbJ8IlFz0ZAHYmPuRgAeapJNohGfTrMcBYQ4Hi0OBmX4RCrT-beOdEFFz_JuC6RBJ06CddwvDaOAae5RTG26Ulc4FJVoPfpSh-Lw6znusNleXHbRuh14mVEUO5RJkDLW8L1-Ur6L1BJSFxTl4Jf9Bz14c5aHv1DeBkioFXKTr5qU0Do8030mz6IIbXMTgShcqnLSyvDKFJeC4HML26X6HHYliNgNfjOFJvU884"
                />
                <span className="absolute top-2 left-2 bg-secondary text-on-secondary px-2.5 py-1 text-[10px] font-label-md uppercase tracking-wider font-bold">
                  MỚI
                </span>
              </div>
              <div className="py-3">
                <h3 className="font-body-md text-body-md font-bold text-primary mb-1 line-clamp-1 group-hover:text-secondary transition-colors">
                  Áo Thun Unisex - 100% COTTON - “Bánh Mì”
                </h3>
                <p className="font-body-md text-body-md text-secondary font-bold">225.000đ</p>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="flex flex-col group cursor-pointer" onClick={() => alert("Sản phẩm: Áo Thun Unisex - “Nón Lá”")}>
              <div className="aspect-[3/4] bg-surface-variant overflow-hidden relative rounded border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Cotton Tee Non La"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuABDgWTxPT71xgQThD-WD8FPYd6hPQGAdPGCl3DfvblfBYVQRwGpuZ-LpKil9rWJXdi4o27Fg4mLTidyXL04ObCJ644-PK4wQXc3wzOHPlqAcK5WPRp7NA7_iQft6EOUAIRhGenzWl_ZdCXQcixXookv9UMhWrwQQI1PJvF16gCVZP-MLC0sriYzfRW4FrxE5Z7xMlR6MNMRLjXBqAaMPuEGjCJ9v1oD2bXSg1HKLEeWBe8-GIxW1H9q_1Fg0cJp9WuUFFALkIEk9P55SU"
                />
              </div>
              <div className="py-3">
                <h3 className="font-body-md text-body-md font-bold text-primary mb-1 line-clamp-1 group-hover:text-secondary transition-colors">
                  Áo Thun Unisex - 100% COTTON - "Nón Lá"
                </h3>
                <p className="font-body-md text-body-md text-secondary font-bold">225.000đ</p>
              </div>
            </div>

            {/* Product Card 3 (Desktop Only / Hidden on mobile) */}
            <div className="hidden md:flex flex-col group cursor-pointer" onClick={() => alert("Sản phẩm: Heavyweight Boxy Tee")}>
              <div className="aspect-[3/4] bg-surface-variant overflow-hidden relative rounded border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Heavyweight Boxy Tee"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd5KziS4W6bBcwIYKn9RhN2-b9kK5bR6qgZTA1r9EyOQ7NdWxXihj_rG633T3l9v5wOZzzLTfsb5f9jcInJE1wZy5Mzq_xe49qiQ4Fho2sMdPUQgPXkVDV_oecarOBoxD6nYTugPx-tMmQTRTRQUSlAb9SUz-oKktodQJNsbNgSLiiuXpluuitgHGOdogoatU4t81vJr-CsviiMrCX4LIaFW86hMTzEu4AJk2d1ZAV0oRaAFmLZSfv2KgwjI02sE_f3sUmXbFeo8_J"
                />
              </div>
              <div className="py-3">
                <h3 className="font-body-md text-body-md font-bold text-primary mb-1 line-clamp-1 group-hover:text-secondary transition-colors">
                  Heavyweight Boxy Tee
                </h3>
                <p className="font-body-md text-body-md text-secondary font-bold">420.000đ</p>
              </div>
            </div>

            {/* Product Card 4 (Desktop Only / Hidden on mobile) */}
            <div className="hidden md:flex flex-col group cursor-pointer" onClick={() => alert("Sản phẩm: Organic Cotton Basic")}>
              <div className="aspect-[3/4] bg-surface-variant overflow-hidden relative rounded border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Organic Cotton Basic"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrHJ25Bzae-q75MX57AnlEgwnyAQE_E3mn4FJAde3oWfwfbxXVj2Yx__2mN7KZ6otmWRUXnYp5888FFmNfVBDTJ8DrqDUi0rp_qseMU1BrhjJrHTcO3ShPq_sYxCN0_vrmcvE9hO6OXua2G5YO6_vpuIguU-NP6gKywHJY0VSMnuzx5tLU7wGfo1JFT7-jg7ycijZujy4wLEuNTnsv0rTmLB2SaiaprdoQgQqpegAFZTymW84oRYTCCEw0-2iLV4zJfk1sbRDCpMTB"
                />
              </div>
              <div className="py-3">
                <h3 className="font-body-md text-body-md font-bold text-primary mb-1 line-clamp-1 group-hover:text-secondary transition-colors">
                  Organic Cotton Basic
                </h3>
                <p className="font-body-md text-body-md text-secondary font-bold">280.000đ</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom NavBar */}
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
          className="flex flex-col items-center justify-center text-secondary relative active:scale-95 w-16"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            grid_view
          </span>
          <span className="font-label-md text-[10px] uppercase font-bold">Danh mục</span>
          <div className="absolute -bottom-1 w-1.5 h-1.5 bg-secondary rounded-full" />
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
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-label-md text-[10px] uppercase font-semibold">Thông báo</span>
        </button>
        <button
          onClick={() => handleBottomNav("/toi")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-md text-[10px] uppercase font-semibold">Tôi</span>
        </button>
      </nav>
    </div>
  );
}
