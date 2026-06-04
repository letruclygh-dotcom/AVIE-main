import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddressPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const cards = document.querySelectorAll(".address-card-active, .bg-surface-container-low");
    const handlers: Array<{ el: Element; click: () => void }> = [];

    cards.forEach((card) => {
      const click = () => {
        console.log("Address card clicked");
      };
      card.addEventListener("click", click);
      handlers.push({ el: card, click });
    });

    return () => {
      handlers.forEach(({ el, click }) => {
        el.removeEventListener("click", click);
      });
    };
  }, []);

  return (
    <div className="address-page bg-background text-on-surface min-h-screen flex flex-col pb-32">
      {/* Top AppBar */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            type="button"
            className="hover:opacity-80 transition-opacity active:scale-95 transition-transform"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-widest text-primary uppercase">
            Địa chỉ giao hàng
          </h1>
          <div className="w-6"></div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="mt-16 px-container-padding flex-grow w-full max-w-2xl mx-auto py-6">
        {/* Descriptive Context (Optional Visual Element) */}
        <div className="mb-8">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Chọn địa chỉ nhận hàng của bạn hoặc thêm mới để trải nghiệm mua sắm tốt nhất.
          </p>
        </div>

        {/* Address List */}
        <div className="space-y-4">
          {/* Default Address Card */}
          <div className="relative group p-4 bg-surface border-2 border-primary rounded-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-headline-md text-headline-md text-on-surface">Helen Chen</span>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md px-2 py-0.5 rounded-sm">
                  Mặc định
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate("/them-dia-chi-moi")}
                className="text-secondary hover:underline font-label-md text-label-md uppercase"
              >
                Chỉnh sửa
              </button>
            </div>
            <div className="space-y-1">
              <p className="font-body-md text-body-md text-on-surface-variant flex items-start gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5" style={{ fontSize: "16px" }}>
                  location_on
                </span>
                Số 45, Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
              </p>
            </div>
          </div>

          {/* Secondary Address Card */}
          <div className="p-4 bg-surface-container-low border border-outline-variant rounded-lg hover:border-outline transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <span className="font-headline-md text-headline-md text-on-surface">Ndip Nè</span>
              <button
                type="button"
                onClick={() => navigate("/them-dia-chi-moi")}
                className="text-secondary hover:underline font-label-md text-label-md uppercase"
              >
                Chỉnh sửa
              </button>
            </div>
            <div className="space-y-1">
              <p className="font-body-md text-body-md text-on-surface-variant flex items-start gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5" style={{ fontSize: "16px" }}>
                  location_on
                </span>
                Khu đô thị Sala, Phường An Lợi Đông, TP. Thủ Đức, TP. Hồ Chí Minh
              </p>
            </div>
          </div>

          {/* Map View Visualization (Decorative for Premium UI) */}
          <div className="mt-8 overflow-hidden rounded-xl border border-outline-variant h-40 relative group">
            <img
              alt="Map View"
              className="w-full h-full object-cover grayscale-[30%] opacity-80 group-hover:scale-105 transition-transform duration-700"
              data-alt="A clean, minimalist aerial map view of a sophisticated urban district in Ho Chi Minh City, featuring elegant architecture and sun-baked earth tones. The lighting is soft and golden, characteristic of late afternoon Saigon, reflecting a nostalgic and quiet mood. The color palette is composed of warm tans, soft whites, and muted greens, perfectly aligning with the AoVie brand identity and modern street fashion aesthetic."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf6fADNUtnLy8ZrI4j3hT1qBQGQ2fdBNNbUb8fIcyfISnjlZyu7Xf_1JDW8wQe42XABBDGKYVdD3WqtaJQMRzP_nGlwj0RCzRqp0JCT8mqFAmoVPDA8eJJi91pIt4NvyMgg70b6enlMXWKWUw2-3dyHP97XiAWMGxldg95LblAuGlZg0cJ197w0ERLlhGqXXPg9at7CGgyPVpIH5IlEhRzYwkPdLI1QZjCReThNvkjeGm3lh5cz2M-tIUh0pECOPO0z_dYiFY4A-f0"
            />
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
              <div className="bg-surface px-4 py-2 rounded-full shadow-lg border border-outline-variant flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
                <span className="font-label-md text-label-md text-primary uppercase">
                  Xem bản đồ các địa chỉ
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Action Button Section */}
      <div className="fixed bottom-16 left-0 w-full p-container-padding z-40 bg-gradient-to-t from-background via-background/90 to-transparent pt-8">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => navigate("/them-dia-chi-moi")}
            className="w-full py-4 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Thêm địa chỉ mới
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface">
        <div className="flex justify-around items-center h-16 px-2 pb-safe w-full max-w-screen-xl mx-auto">
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
            to="/trang-chu"
          >
            <span className="material-symbols-outlined" data-icon="home">
              home
            </span>
            <span className="font-label-md text-label-md">Trang chủ</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
            to="/danh-muc"
          >
            <span className="material-symbols-outlined" data-icon="category">
              grid_view
            </span>
            <span className="font-label-md text-label-md">Danh mục</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
            to="/don-hang"
          >
            <span className="material-symbols-outlined" data-icon="receipt_long">
              receipt_long
            </span>
            <span className="font-label-md text-label-md">Đơn hàng</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
            to="/thong-bao"
          >
            <span className="material-symbols-outlined" data-icon="notifications">
              notifications
            </span>
            <span className="font-label-md text-label-md">Thông báo</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-secondary relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-secondary after:rounded-full active:scale-90 transition-transform"
            to="/toi"
          >
            <span
              className="material-symbols-outlined"
              data-icon="person"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person
            </span>
            <span className="font-label-md text-label-md">Tôi</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
