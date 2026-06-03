import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

export default function PolicyPage() {
  const navigate = useNavigate();

  const handleBottomNav = (path: string) => {
    navigate(path);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-sans relative select-none">
      <GrainTexture />

      {/* TopAppBar */}
      <header className="bg-surface sticky top-0 z-50 flex items-center justify-between px-container-padding w-full h-16 border-b border-outline-variant shrink-0">
        <button
          className="hover:opacity-80 transition-opacity active:scale-95 transition-transform flex items-center justify-center w-10 h-10"
          onClick={() => navigate(-1)}
          type="button"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary flex items-center justify-center">
          <img
            alt="AoVie"
            className="w-auto object-contain mx-auto h-8"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDTPRcjK8Ci24lzkiU1jsVYcbwDUUUlWGpE93URSy0AYtmlD776LSfW8Td0NIj4vK1oyNgkPbeeTNsbc3ai5qEQnK1E371E_q5sZP6d-pUJ0zmO-XB1rK3cVE2c6I04cSerrqWbfyKQbEwLD-5kHy_X0Gk5-YFx7NooJ6yVqWUL5s6N3gC12m-kdlCAC1lGhvpoTkq_-afKP4MFDKp-kwrF4n6ScNdLgrk71T85jJ_XsN-QhAFXtwMd4gT7-_zDlfm-DrRTeS_vyqZZdU"
          />
        </h1>
        <button
          className="hover:opacity-80 transition-opacity active:scale-95 transition-transform flex items-center justify-center w-10 h-10"
          type="button"
          onClick={() => alert("Chức năng giỏ hàng đang được chuẩn bị!")}
        >
          <span className="material-symbols-outlined text-primary">shopping_bag</span>
        </button>
      </header>

      <main className="max-w-screen-xl mx-auto pb-24 flex-grow w-full">
        {/* Hero Section */}
        <section className="px-container-padding pt-8 pb-12 bg-surface-container-low text-center">
          <h2 className="text-primary mb-2 font-headline-md text-headline-md">Chính sách Đổi trả &amp; Bảo hành</h2>
          <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
            Cam kết mang đến trải nghiệm mua sắm an tâm nhất với quy trình đơn giản và minh bạch trong 7 ngày.
          </p>
        </section>

        {/* Core Policy Highlight Cards */}
        <section className="px-container-padding -mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-surface p-4 border border-outline-variant flex flex-col items-center text-center shadow-sm">
              <span className="material-symbols-outlined text-secondary text-[32px] mb-2">restart_alt</span>
              <span className="font-label-md text-label-md text-on-surface uppercase font-semibold">7 Ngày Đổi Trả</span>
            </div>
            <div className="bg-surface p-4 border border-outline-variant flex flex-col items-center text-center shadow-sm">
              <span className="material-symbols-outlined text-secondary text-[32px] mb-2">verified</span>
              <span className="font-label-md text-label-md text-on-surface uppercase font-semibold">Bảo Hành 6 Tháng</span>
            </div>
            <div className="bg-surface p-4 border border-outline-variant flex flex-col items-center text-center shadow-sm">
              <span className="material-symbols-outlined text-secondary text-[32px] mb-2">local_shipping</span>
              <span className="font-label-md text-label-md text-on-surface uppercase font-semibold">Hỗ Trợ Tận Nơi</span>
            </div>
            <div className="bg-surface p-4 border border-outline-variant flex flex-col items-center text-center shadow-sm">
              <span className="material-symbols-outlined text-secondary text-[32px] mb-2">support_agent</span>
              <span className="font-label-md text-label-md text-on-surface uppercase font-semibold">Tư Vấn 24/7</span>
            </div>
          </div>
        </section>

        {/* Process Steps (Timeline Style) */}
        <section className="px-container-padding mt-section-gap">
          <h3 className="font-headline-md text-headline-md text-primary mb-6 border-l-4 border-secondary pl-3">
            Quy trình Đổi trả
          </h3>
          <div className="space-y-0">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-label-md z-10 font-bold">1</div>
                <div className="w-[1px] h-full bg-outline-variant"></div>
              </div>
              <div className="pb-8 pt-1 flex-grow">
                <h4 className="font-body-lg font-bold text-on-surface mb-1 uppercase tracking-wider">Kiểm tra điều kiện</h4>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Sản phẩm còn nguyên tem mác, chưa qua sử dụng và trong vòng 7 ngày kể từ khi nhận hàng.
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
                  <img
                    className="w-full h-24 object-cover border border-outline-variant rounded"
                    alt="Garment label close-up"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZEw5J_GYm9XbpyTHvSe_cWtlBb9mS13TLn43N0zw-4V0-ZSSBKPzIGM0UbST8KYtAQp9fSexRtVabFOBcLnxMiWPgpRlbHUDQDZbJjfPEbGRav7BpgyQpp-Dm1qROGdHcULefg5J-e2YR39dDeAyzE3ZEcYomj0xsBCpkgI-7H3Lj4avS7d0stdXchBxqilbilDYFn_ZAgfgY3rAr_dEHQXbLSIes7xHLARngAA7N2UAm0KBTrJwmegQYUeWgpce3P8cvaCwNVo47"
                  />
                  <div className="bg-surface-container-high p-3 flex items-center rounded border border-outline-variant/30">
                    <span className="font-label-md text-on-surface-variant italic text-[11px] leading-relaxed">
                      Giữ lại hóa đơn và bao bì gốc.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-label-md z-10 font-bold">2</div>
                <div className="w-[1px] h-full bg-outline-variant"></div>
              </div>
              <div className="pb-8 pt-1 flex-grow">
                <h4 className="font-body-lg font-bold text-on-surface mb-1 uppercase tracking-wider">Đăng ký đổi trả</h4>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Liên hệ qua Hotline hoặc Inbox Fanpage kèm theo hình ảnh thực tế của sản phẩm.
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => alert("Đang kết nối tới tổng đài AoVie (1900-xxxx)...")}
                    className="bg-primary text-white font-label-md text-label-md px-6 py-3 uppercase tracking-widest hover:opacity-90 transition-all font-bold"
                  >
                    Liên hệ ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-label-md z-10 font-bold">3</div>
                <div className="w-[1px] h-full bg-outline-variant"></div>
              </div>
              <div className="pb-8 pt-1 flex-grow">
                <h4 className="font-body-lg font-bold text-on-surface mb-1 uppercase tracking-wider">Đóng gói &amp; Gửi hàng</h4>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Đóng gói cẩn thận và gửi về kho của AoVie. Chúng tôi sẽ hỗ trợ điều phối shipper đến lấy tận nhà.
                </p>
                <div className="mt-3 flex items-center gap-3 p-3 bg-secondary-container/10 border border-secondary/20 rounded max-w-lg">
                  <span className="material-symbols-outlined text-secondary shrink-0">info</span>
                  <span className="font-body-md text-on-secondary-container leading-relaxed">
                    Miễn phí phí vận chuyển đổi trả nếu lỗi từ nhà sản xuất.
                  </span>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-label-md z-10 font-bold">4</div>
              </div>
              <div className="pb-2 pt-1 flex-grow">
                <h4 className="font-body-lg font-bold text-on-surface mb-1 uppercase tracking-wider">Hoàn tất</h4>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  AoVie sẽ kiểm tra sản phẩm và gửi hàng đổi mới hoặc hoàn tiền trong vòng 3-5 ngày làm việc.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Warranty Detailed Info */}
        <section className="px-container-padding mt-section-gap">
          <div className="bg-primary text-white p-6 relative overflow-hidden rounded-lg shadow-sm">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[120px]">shield</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-4 relative z-10 font-bold">Chính sách Bảo hành</h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-secondary-container shrink-0">check_circle</span>
                <div>
                  <p className="font-body-lg font-semibold leading-snug">Bảo hành 6 tháng</p>
                  <p className="text-on-primary-container text-sm leading-relaxed mt-0.5">
                    Áp dụng cho các lỗi đường chỉ và form dáng sau khi giặt đúng cách.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-secondary-container shrink-0">check_circle</span>
                <div>
                  <p className="font-body-lg font-semibold leading-snug">Sửa chữa miễn phí</p>
                  <p className="text-on-primary-container text-sm leading-relaxed mt-0.5">
                    Hỗ trợ lên gấu, bóp eo hoặc chỉnh sửa nhỏ để vừa vặn hơn với dáng người.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Mini Section */}
        <section className="px-container-padding mt-section-gap mb-12">
          <h3 className="font-headline-md text-headline-md text-primary mb-6 font-bold">Câu hỏi thường gặp</h3>
          <div className="space-y-3 max-w-3xl">
            <details className="group bg-surface border border-outline-variant rounded transition-all duration-200">
              <summary className="flex justify-between items-center p-4 cursor-pointer font-body-md font-semibold uppercase tracking-tight list-none outline-none select-none">
                <span>Sản phẩm khuyến mãi có được đổi trả không?</span>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-4 pb-4 font-body-md text-on-surface-variant border-t border-outline-variant/30 pt-3 leading-relaxed">
                Sản phẩm giảm giá trên 30% sẽ không áp dụng đổi trả trừ trường hợp lỗi từ nhà sản xuất. Vui lòng kiểm tra kỹ bảng size trước khi mua.
              </div>
            </details>
            <details className="group bg-surface border border-outline-variant rounded transition-all duration-200">
              <summary className="flex justify-between items-center p-4 cursor-pointer font-body-md font-semibold uppercase tracking-tight list-none outline-none select-none">
                <span>Tôi có thể đổi sang sản phẩm khác không?</span>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-4 pb-4 font-body-md text-on-surface-variant border-t border-outline-variant/30 pt-3 leading-relaxed">
                Có, bạn có thể đổi sang sản phẩm có giá trị bằng hoặc cao hơn (vui lòng bù chênh lệch). Nếu thấp hơn, AoVie không hoàn lại tiền thừa.
              </div>
            </details>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-gutter bg-surface border-t border-outline-variant z-50 shrink-0 select-none">
        <button
          onClick={() => handleBottomNav("/trang-chu")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors w-16"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-md text-label-md">Trang chủ</span>
        </button>
        <button
          onClick={() => handleBottomNav("/bo-loc")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors w-16"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-label-md">Danh mục</span>
        </button>
        <button
          onClick={() => handleBottomNav("/don-hang")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors w-16"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-label-md text-label-md">Đơn hàng</span>
        </button>
        <button
          onClick={() => handleBottomNav("/thong-bao")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors w-16"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-label-md text-label-md">Thông báo</span>
        </button>
        <button
          onClick={() => handleBottomNav("/toi")}
          className="flex flex-col items-center justify-center text-secondary relative active:scale-90 transition-transform w-16"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>person</span>
          <span className="font-label-md text-label-md font-bold">Tôi</span>
          <div className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full"></div>
        </button>
      </nav>
    </div>
  );
}
