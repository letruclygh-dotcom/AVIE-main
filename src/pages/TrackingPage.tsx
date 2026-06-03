import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

export default function TrackingPage() {
  const navigate = useNavigate();

  const handleBottomNav = (path: string) => {
    navigate(path);
  };

  const handleContactShipper = (type: "call" | "message") => {
    if (type === "call") {
      alert("Đang mô phỏng cuộc gọi thoại tới Shipper Nguyễn Văn A (090 123 4xxx)...");
    } else {
      alert("Đang mở hộp thoại nhắn tin SMS với Shipper Nguyễn Văn A...");
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen pb-28 font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Top App Bar (Header) */}
      <header className="bg-surface border-b border-outline-variant fixed top-0 w-full z-50 h-16 flex items-center justify-between px-container-padding shrink-0">
        <button
          className="flex items-center justify-center w-10 h-10 hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center"
          onClick={() => navigate(-1)}
          type="button"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary font-bold">
          Theo dõi đơn hàng
        </h1>
        <button
          className="flex items-center justify-center w-10 h-10 hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center"
          type="button"
          onClick={() => alert("Giỏ hàng đang được tải...")}
        >
          <span className="material-symbols-outlined text-primary">shopping_bag</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 px-container-padding max-w-2xl mx-auto w-full">
        {/* Order Identification Card */}
        <section className="bg-surface border border-outline-variant p-container-padding rounded-lg mb-6 flex flex-col gap-1 mt-2 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Mã vận đơn</p>
              <h2 className="font-headline-md text-headline-md text-primary mt-1 font-bold">AV-92837410</h2>
            </div>
            <div className="bg-secondary-container text-on-secondary-container px-3.5 py-1 rounded-full font-label-md text-label-md font-semibold shrink-0">
              Đang giao
            </div>
          </div>
          <hr className="border-outline-variant/50 my-3" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg border border-outline-variant shrink-0">
              <span className="material-symbols-outlined text-secondary text-2xl">local_shipping</span>
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant">Đơn vị vận chuyển</p>
              <p className="font-body-md text-body-md font-semibold text-on-surface">Saigon Express Delivery</p>
            </div>
          </div>
        </section>

        {/* Dynamic Map/Status Visual */}
        <section className="mb-6 relative overflow-hidden rounded-xl border border-outline-variant h-48 shadow-sm">
          <img
            className="w-full h-full object-cover grayscale-[20%] opacity-80"
            alt=" Saigon Street Map"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8fKsVLt6Mhj7fCGeRsD2WgZEYlWy-qpGZvtnCK91QGtELhu6FMjw-gPODgTstINc1ygc6NmAZ0pEnr8nsf2Wfn06l4w-coo_3jPsiDtwm-VJjRLEZ2yEWEM16yKQTfgB_RFqO4uHTEGtblV5O0VJyQ0jnkICeVi-5XuUfCojmIlQTP15QqOeRp5bFi6rNtYxfjc1omu1xW9ONTg8HAzlbJerB9ivzbrFOCM0hPxI0k4TzDXJHIO67WIhFYd2jbEPISM4Q-C-nN3YP"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent flex items-end p-4">
            <div className="flex items-center gap-2 bg-surface px-3 py-2 border border-outline-variant rounded-lg shadow-md">
              <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
              <p className="font-label-md text-label-md font-bold text-on-surface">
                Dự kiến giao: 14:30 - 16:30 Hôm nay
              </p>
            </div>
          </div>
        </section>

        {/* Tracking Timeline */}
        <section className="bg-surface-container-low border border-outline-variant p-container-padding rounded-lg shadow-xs">
          <h3 className="font-headline-md text-headline-md text-primary mb-6 font-bold">Lộ trình vận chuyển</h3>
          <div className="flex flex-col gap-6 relative pl-2">
            {/* Step 1: Đã đặt */}
            <div className="relative pl-8 group">
              <div className="w-[2px] bg-outline-variant/60 absolute left-[7px] top-[24px] bottom-[-24px] z-0" />
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-secondary border-2 border-surface flex items-center justify-center z-10" />
              <div>
                <p className="font-body-md text-body-md font-bold text-on-surface leading-tight">
                  Đơn hàng đã đặt thành công
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                  Đơn hàng của bạn đã được tiếp nhận và đang chờ xử lý.
                </p>
                <p className="font-label-md text-[11px] text-outline mt-1 font-semibold">08:12, 12 Thg 10</p>
              </div>
            </div>

            {/* Step 2: Đã xác nhận */}
            <div className="relative pl-8 group">
              <div className="w-[2px] bg-outline-variant/60 absolute left-[7px] top-[24px] bottom-[-24px] z-0" />
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-secondary border-2 border-surface z-10" />
              <div>
                <p className="font-body-md text-body-md font-bold text-on-surface leading-tight">
                  Đã xác nhận thanh toán
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                  Hệ thống đã xác nhận thanh toán thành công qua Ví MoMo.
                </p>
                <p className="font-label-md text-[11px] text-outline mt-1 font-semibold">09:45, 12 Thg 10</p>
              </div>
            </div>

            {/* Step 3: Đang giao (Active) */}
            <div className="relative pl-8 group">
              <div className="w-[2px] bg-outline-variant/60 absolute left-[7px] top-[24px] bottom-[-24px] z-0" />
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-secondary border-2 border-surface ring-4 ring-secondary/20 z-10 animate-pulse" />
              <div>
                <p className="font-body-md text-body-md font-bold text-secondary leading-tight">
                  Đang trên đường giao đến bạn
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                  Shipper Nguyễn Văn A đang vận chuyển đơn hàng. SĐT: 090 123 4xxx
                </p>
                <p className="font-label-md text-[11px] text-secondary mt-1 font-semibold">10:30, Hôm nay</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleContactShipper("call")}
                    className="bg-primary text-on-primary px-4 py-2.5 rounded font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>GỌI SHIPPER
                  </button>
                  <button
                    onClick={() => handleContactShipper("message")}
                    className="border border-primary text-primary px-4 py-2.5 rounded font-label-md text-label-md uppercase tracking-wider hover:bg-primary/5 active:scale-95 transition-all font-bold"
                  >
                    NHẮN TIN
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4: Thành công */}
            <div className="relative pl-8 group">
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-outline-variant border-2 border-surface z-10" />
              <div>
                <p className="font-body-md text-body-md font-bold text-on-surface-variant leading-tight">
                  Giao hàng thành công
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                  Đơn hàng sẽ được bàn giao trực tiếp cho người nhận.
                </p>
                <p className="font-label-md text-[11px] text-outline mt-1 font-semibold">Dự kiến chiều nay</p>
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary Mini Card */}
        <section className="mt-8 border-t border-outline-variant/40 pt-6">
          <h4 className="font-headline-md text-headline-md text-primary mb-4 font-bold">Chi tiết kiện hàng</h4>
          <div className="flex gap-4 p-4 bg-surface border border-outline-variant rounded-lg shadow-xs">
            <img
              className="w-20 h-24 object-cover rounded shadow-sm shrink-0 border border-outline-variant/30"
              alt="Cotton Tee"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC933uWNGL8cKAdl3RCKxlF5iCfotfmuNz-lnV1JSktDzGF2RAa1D1WnA8dwrV8gGCXD59jat0KHxjkrTlgHMcL6nr5FBXLm1qyapZDu_HHxz-R6DJfh4MuepvMbGFTXNwNgO7Q0tSOCNzHnXG3F1HPjtB42dW-8WG4IuMcy98BHxnt_V3Z4U5-F7YtadCw0SDzsrVwWRbCNtyr7bDLuKF6e4KKN_LtUN_QOPoFoO6emM_uBgGIDNP-vgEnFq0IPvGKuX1Qcn4pjYkyRAo"
            />
            <div className="flex-grow flex flex-col justify-between py-1">
              <div>
                <p className="font-body-md text-body-md font-bold text-on-surface leading-tight">
                  Áo Thun Unisex - 100% Cotton - “Độc Lập”
                </p>
                <p className="font-label-md text-label-md text-on-surface-variant mt-1 font-semibold">
                  Size: L | Số lượng: 1
                </p>
              </div>
              <p className="font-body-md text-body-md font-bold text-secondary mt-2">225.000đ</p>
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
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-[10px] uppercase font-semibold">Danh mục</span>
        </button>
        <button
          onClick={() => handleBottomNav("/dat-hang-thanh-cong")}
          className="flex flex-col items-center justify-center text-secondary relative active:scale-95 w-16"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            receipt_long
          </span>
          <span className="font-label-md text-[10px] uppercase font-bold">Đơn hàng</span>
          <div className="absolute -bottom-1 w-1.5 h-1.5 bg-secondary rounded-full" />
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
