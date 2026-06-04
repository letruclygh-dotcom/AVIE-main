import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  useEffect(() => {
    const cards = document.querySelectorAll(".group");
    const touchHandlers: Array<{
      el: Element;
      touchstart: () => void;
      touchend: () => void;
    }> = [];

    cards.forEach((card) => {
      const touchstart = () => card.classList.add("opacity-90");
      const touchend = () => card.classList.remove("opacity-90");
      card.addEventListener("touchstart", touchstart);
      card.addEventListener("touchend", touchend);
      touchHandlers.push({ el: card, touchstart, touchend });
    });

    const searchBtn = document.querySelector('[data-icon="search"]')?.parentElement;
    const onSearchClick = () => {
      console.log("Search interface overlay triggered");
    };
    searchBtn?.addEventListener("click", onSearchClick);

    return () => {
      touchHandlers.forEach(({ el, touchstart, touchend }) => {
        el.removeEventListener("touchstart", touchstart);
        el.removeEventListener("touchend", touchend);
      });
      searchBtn?.removeEventListener("click", onSearchClick);
    };
  }, []);

  return (
    <div className="bg-background text-on-background min-h-screen pb-24">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background border-b border-outline-variant px-container-padding h-20 flex flex-col justify-center gap-2">
        <div className="flex justify-between items-center w-full">
          <Link
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-150"
            to="/tim-kiem"
          >
            <span className="material-symbols-outlined" data-icon="search">
              search
            </span>
          </Link>
          <div className="flex items-center justify-center">
            <img
              alt="AoVie Logo"
              className="object-contain h-10"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV_6lNmIh8kV1bS5JBIpDTcLHkFVwU9tr29aW_qOH-d0BEgN6Uh0kZC-S0lSyRuFNGXEVKJ5uZ-A90OtF0kEMGGjTF5pwANinlr-HI6QBJd6owfKlXhsYl4wVjAb718K5UB0R9YR3h8j6nCh9g8PSKZNWLOkUoV6SHatrDd3OE41cEpsAMUpkmJdbydAU_svqDrQgA5hhsC3fyunggSOWxltN-0nkDv7ow4UIPlqmX72TxwPoGl8k0DN5xHH3t4f8t4MoE1LCC5b6D"
            />
          </div>
          <Link
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-150 relative"
            to="/thanh-toan"
          >
            <span className="material-symbols-outlined" data-icon="shopping_bag">
              shopping_bag
            </span>
            <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              2
            </span>
          </Link>
        </div>
      </header>

      <main className="mt-24 px-container-padding space-y-section-gap">
        {/* Voucher Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-beVietnamPro font-bold text-[18px] text-primary tracking-tight">
              Ưu đãi hôm nay
            </h2>
            <Link
              className="text-secondary font-beVietnamPro font-medium text-[12px] uppercase tracking-wider"
              to="/danh-muc"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 hide-scrollbar -mx-container-padding px-container-padding">
            {/* Voucher Card 1 */}
            <div className="flex-shrink-0 w-[280px] bg-secondary-container rounded-lg p-4 flex justify-between items-center border border-outline-variant overflow-hidden relative">
              <div className="relative z-10">
                <p className="font-beVietnamPro font-bold text-on-secondary-container text-[14px]">
                  Mã AOVIE21
                </p>
                <p className="font-beVietnamPro text-on-secondary-container text-[12px] opacity-80">
                  Giảm 10% đơn đầu tiên
                </p>
              </div>
              <button
                type="button"
                className="relative z-10 bg-primary text-white px-4 py-2 rounded font-beVietnamPro text-[11px] font-bold uppercase active:scale-95 transition-transform"
              >
                Lưu mã
              </button>
              {/* Decorative Element */}
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-on-secondary-container opacity-10 rounded-full"></div>
            </div>
            {/* Voucher Card 2 */}
            <div className="flex-shrink-0 w-[280px] bg-tertiary-fixed-dim rounded-lg p-4 flex justify-between items-center border border-outline-variant overflow-hidden relative">
              <div className="relative z-10">
                <p className="font-beVietnamPro font-bold text-on-tertiary-fixed text-[14px]">
                  Mã RETROVIBE
                </p>
                <p className="font-beVietnamPro text-on-tertiary-fixed text-[12px] opacity-80">
                  Miễn phí vận chuyển
                </p>
              </div>
              <button
                type="button"
                className="relative z-10 bg-primary text-white px-4 py-2 rounded font-beVietnamPro text-[11px] font-bold uppercase active:scale-95 transition-transform"
              >
                Lưu mã
              </button>
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-beVietnamPro font-bold text-[18px] text-primary tracking-tight">
              Sản phẩm nổi bật
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8">
            {/* Product 1 */}
            <Link className="group cursor-pointer block" to="/san-pham/ao-banh-mi">
              <div className="aspect-[3/4] bg-surface-container overflow-hidden rounded mb-3 relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="A minimalist high-quality lifestyle photograph of a classic white cotton t-shirt with a vintage-inspired 'Banh Mi' illustration on the chest."
                  src="https://i.ibb.co/PG3p6wTs/6.png"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-beVietnamPro text-[14px] font-bold text-primary leading-tight">
                  Áo Thun Unisex - 100% COTTON - “Bánh Mì”
                </h3>
                <p className="font-beVietnamPro text-[14px] text-secondary font-bold">225.000đ</p>
              </div>
            </Link>
            {/* Product 2 */}
            <Link className="group cursor-pointer block" to="/san-pham/ao-non-la">
              <div className="aspect-[3/4] bg-surface-container overflow-hidden rounded mb-3 relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="A premium flat lay of a cream-colored organic cotton t-shirt featuring a subtle linear graphic of a Vietnamese 'Non La' hat."
                  src="https://i.ibb.co/zhP9w9gz/10.png"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-beVietnamPro text-[14px] font-bold text-primary leading-tight">
                  {'Áo Thun Unisex  - 100% COTTON - "Nón Lá"'}
                </h3>
                <p className="font-beVietnamPro text-[14px] text-secondary font-bold">225.000đ</p>
              </div>
            </Link>
            {/* Product 3 */}
            <Link className="group cursor-pointer block" to="/san-pham/ao-doc-lap">
              <div className="aspect-[3/4] bg-surface-container overflow-hidden rounded mb-3 relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="A high-end canvas tote bag displayed in a minimalist boutique setting."
                  src="https://i.ibb.co/hxBR2WM3/3.png"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-beVietnamPro text-[14px] font-bold text-primary leading-tight">
                  Áo Thun Unisex - 100% Cotton - “Độc Lập”
                </h3>
                <p className="font-beVietnamPro text-[14px] text-secondary font-bold">225.000đ</p>
              </div>
            </Link>
            {/* Product 4 */}
            <Link className="group cursor-pointer block" to="/thanh-toan">
              <div className="aspect-[3/4] bg-surface-container overflow-hidden rounded mb-3 relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="Close-up shot of a minimalist tote bag with a stylized line drawing of the Turtle Tower in Hanoi."
                  src="https://i.ibb.co/nsFs3RHn/13.png"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-beVietnamPro text-[14px] font-bold text-primary leading-tight">
                  Túi Tote Canvas In Hình Hạ Long Bay
                </h3>
                <p className="font-beVietnamPro text-[14px] text-secondary font-bold">59.000đ</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Câu chuyện thương hiệu */}
        <section className="py-4">
          <Link
            to="/gioi-thieu"
            className="bg-primary-container rounded-xl p-8 flex flex-col items-center text-center space-y-4 block active:scale-[0.99] transition-transform hover:opacity-95"
          >
            <span className="material-symbols-outlined text-primary-fixed-dim text-4xl">history_edu</span>
            <h3 className="font-beVietnamPro font-bold text-primary-fixed text-[20px]">
              Câu chuyện thương hiệu
            </h3>
            <p className="font-beVietnamPro text-primary-fixed-dim text-[13px] leading-relaxed max-w-[280px]">
              Nét hoài niệm trong dòng chảy hiện đại — cảm hứng từ Nón Lá và Bánh Mì Việt Nam.
            </p>
            <span className="bg-background text-primary px-6 py-2.5 rounded-full font-beVietnamPro text-[12px] font-bold uppercase tracking-widest">
              ĐỌC CÂU CHUYỆN
            </span>
          </Link>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 border-t border-outline-variant bg-background">
        <div className="flex justify-around items-center px-2 pb-safe w-full max-w-screen-xl mx-auto h-14">
          {/* Trang chủ (Active) */}
          <Link
            className="flex flex-col items-center justify-center relative active:scale-90 transition-transform"
            to="/trang-chu"
          >
            <span
              className="material-symbols-outlined text-[24px]"
              data-icon="home"
              style={{
                color: "rgb(93, 64, 55)",
                fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24',
              }}
            >
              home
            </span>
            <span className="font-medium text-[10px]" style={{ color: "rgb(93, 64, 55)" }}>
              Trang chủ
            </span>
            <span
              className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
              style={{ backgroundColor: "rgb(93, 64, 55)" }}
            ></span>
          </Link>
          {/* Danh mục */}
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant transition-colors active:scale-90 transition-transform"
            to="/danh-muc"
          >
            <span className="material-symbols-outlined text-[24px]" data-icon="category">
              grid_view
            </span>
            <span className="font-medium text-[10px]">Danh mục</span>
          </Link>
          {/* Đơn hàng */}
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant transition-colors active:scale-90 transition-transform"
            to="/don-hang"
          >
            <span className="material-symbols-outlined text-[24px]" data-icon="receipt_long">
              receipt_long
            </span>
            <span className="font-medium text-[10px]">Đơn hàng</span>
          </Link>
          {/* Thông báo */}
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant transition-colors active:scale-90 transition-transform"
            to="/thong-bao"
          >
            <span className="material-symbols-outlined text-[24px]" data-icon="notifications">
              notifications
            </span>
            <span className="font-medium text-[10px]">Thông báo</span>
          </Link>
          {/* Tôi */}
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant transition-colors active:scale-90 transition-transform"
            to="/toi"
          >
            <span className="material-symbols-outlined text-[24px]" data-icon="person">
              person
            </span>
            <span className="font-medium text-[10px]">Tôi</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
