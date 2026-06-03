import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type VoucherTab = "all" | "mine" | "expired";

export default function VouchersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<VoucherTab>("all");

  useEffect(() => {
    const buttons = document.querySelectorAll("button");
    const handlers: Array<{ btn: HTMLButtonElement; mousedown: () => void }> = [];

    buttons.forEach((button) => {
      const btn = button as HTMLButtonElement;
      const mousedown = () => {
        btn.classList.add("opacity-70");
        setTimeout(() => btn.classList.remove("opacity-70"), 150);
      };
      btn.addEventListener("mousedown", mousedown);
      handlers.push({ btn, mousedown });
    });

    return () => {
      handlers.forEach(({ btn, mousedown }) => {
        btn.removeEventListener("mousedown", mousedown);
      });
    };
  }, []);

  const tabClass = (tab: VoucherTab) =>
    activeTab === tab
      ? "px-6 py-2 bg-primary text-on-primary font-label-md text-label-md rounded shadow-sm"
      : "px-6 py-2 bg-surface-variant text-on-surface-variant font-label-md text-label-md rounded border border-outline-variant hover:bg-surface-container transition-colors";

  return (
    <div className="vouchers-page bg-background text-on-surface font-body-md min-h-screen pb-20">
      {/* Top AppBar */}
      <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant">
        <div className="flex items-center justify-between px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <div className="w-10 flex justify-start">
            <button
              type="button"
              className="hover:opacity-80 transition-opacity active:scale-95 transition-transform duration-200"
              onClick={() => navigate("/tim-kiem")}
            >
              <span className="material-symbols-outlined text-primary">search</span>
            </button>
          </div>
          <img
            alt="AoVie Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhwG02ErAXIEikcwL0vbOXma0QYmU73PSPhHPdN9RljJFJTG-uZaZri6GBaiMoMkMARxhbJWT4GVZwcLQRABtNcadBeiSfoANmxCjiOzkRfgi_4UszYEPlaOdXuZyCNDYSCIdDK6eUSnB1DsRguE0CgTiuhCz4tEsTI7XRCDK0OgVh2aq_PYe1YV6nhkAGxWy8JmV5aXVqGA0ie_0yB9qMmfqP5662zbzjg1klJB-ftl3-4kP1qZBEIN4RdWN7bNgJ9sfYmQijsU0"
          />
          <div className="w-10 flex justify-end">
            <button
              type="button"
              className="hover:opacity-80 transition-opacity active:scale-95 transition-transform duration-200"
              onClick={() => navigate("/thanh-toan")}
            >
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-screen-xl mx-auto px-container-padding pt-6 pb-24">
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="font-headline-md text-headline-md text-primary mb-1">Ưu đãi của bạn</h2>
          <p className="font-label-md text-label-md text-on-surface-variant">
            Khám phá các mã giảm giá dành riêng cho phong cách của bạn.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar">
          <button type="button" className={tabClass("all")} onClick={() => setActiveTab("all")}>
            Tất cả
          </button>
          <button type="button" className={tabClass("mine")} onClick={() => setActiveTab("mine")}>
            Của tôi
          </button>
          <button type="button" className={tabClass("expired")} onClick={() => setActiveTab("expired")}>
            Hết hạn
          </button>
        </div>

        {/* Voucher List (Asymmetric Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Voucher Item 1: Free Shipping */}
          <div className="relative flex flex-col sm:flex-row border-2 border-dashed border-outline-variant rounded p-4 hover:border-secondary transition-colors group bg-surface-container-low">
            <div className="sm:w-1/3 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r-2 border-dashed border-outline-variant pb-4 sm:pb-0 sm:pr-4">
              <div className="bg-secondary text-on-secondary p-3 rounded-full mb-2">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_shipping
                </span>
              </div>
              <span className="font-headline-md text-headline-md text-secondary text-center">Miễn phí</span>
            </div>
            <div className="sm:w-2/3 flex flex-col justify-between pt-4 sm:pt-0 sm:pl-6">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-headline-md text-headline-md text-primary">Vận chuyển 0đ</h3>
                  <span className="bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                    Mới
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                  Áp dụng cho đơn hàng từ 500k trở lên trên toàn quốc.
                </p>
                <div className="flex items-center gap-2 text-label-md font-label-md text-outline">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  <span>Hết hạn: 30 Th11, 2023</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 border border-primary text-primary font-label-md text-label-md uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all active:scale-95"
                >
                  Lưu mã
                </button>
              </div>
            </div>
          </div>

          {/* Voucher Item 2: Cash Discount */}
          <div className="relative flex flex-col sm:flex-row border-2 border-dashed border-outline-variant rounded p-4 hover:border-secondary transition-colors group bg-surface-container-low">
            <div className="sm:w-1/3 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r-2 border-dashed border-outline-variant pb-4 sm:pb-0 sm:pr-4">
              <div className="bg-primary text-on-primary p-3 rounded-full mb-2">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sell
                </span>
              </div>
              <span className="font-headline-md text-headline-md text-primary text-center">Giảm 50k</span>
            </div>
            <div className="sm:w-2/3 flex flex-col justify-between pt-4 sm:pt-0 sm:pl-6">
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-1">
                  Dành Cho Khách Hàng Thân Thiết
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                  Áp dụng cho đơn hàng từ 300k trở lên
                </p>
                <div className="flex items-center gap-2 text-label-md font-label-md text-outline">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  <span>Hết hạn: 15 Th12, 2026</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest active:scale-95 transition-transform"
                >
                  Dùng ngay
                </button>
              </div>
            </div>
          </div>

          {/* Voucher Item 3: Percentage Discount */}
          <div className="relative flex flex-col sm:flex-row border-2 border-dashed border-outline-variant rounded p-4 hover:border-secondary transition-colors group bg-surface-container-low">
            <div className="sm:w-1/3 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r-2 border-dashed border-outline-variant pb-4 sm:pb-0 sm:pr-4">
              <div className="bg-tertiary-container text-on-tertiary-container p-3 rounded-full mb-2">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  percent
                </span>
              </div>
              <span className="font-headline-md text-headline-md text-on-tertiary-container text-center">
                Giảm 15%
              </span>
            </div>
            <div className="sm:w-2/3 flex flex-col justify-between pt-4 sm:pt-0 sm:pl-6">
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-1">Dành Cho Khách Hàng Mới</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                  Ưu đãi dành riêng cho thành viên&nbsp; mới của AoVie.
                </p>
                <div className="flex items-center gap-2 text-label-md font-label-md text-outline">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  <span>Hết hạn: 31 Th12, 2026</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest active:scale-95 transition-transform"
                >
                  Dùng ngay
                </button>
              </div>
            </div>
          </div>

          {/* Promotional Banner (Visual Break) */}
          <div className="relative rounded-lg overflow-hidden h-48 md:h-auto group">
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              data-alt="A stylish, high-end editorial shot of a male model wearing a minimalist beige trench coat and vintage brown loafers. He is standing against a textured sun-baked clay wall in a quiet Saigon alleyway during golden hour. The soft warm light creates long shadows and highlights the premium linen texture of the clothing. The overall mood is nostalgic, serene, and sophisticated, perfectly matching the earthy brown and beige color palette of the brand."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv_nyFcfHoFpNVllPsejiSoJNzXQPkNVp0ZML8XtG3lLdbOw7QmfAZ-EfsstacyyOmO9q0c7tqIBQaL3zLlUlkL9YAM5M2jqFkbjA71nkijkhr8YuveliyptfsFytMQk5clMkxLGGBRU49XlKp3ZDHKXdVUan-O7YrIQayGUXX4s8UiRZWt3twSWwa_pPzKYOa9HrvEnEUxKgTENQqA_jS12dopXzp6KSjXbi95A4GkOnSxEKvFqkkB49aOvz7p6v9UBmCf98GnyE"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <span className="font-label-md text-label-md text-secondary-fixed mb-1 uppercase tracking-widest">
                Bộ sưu tập Áo Thun
              </span>
              <h4 className="font-headline-lg text-white mb-2">AOVIE 2026</h4>
              <Link
                className="text-white border-b border-white w-fit font-label-md text-label-md pb-1 uppercase"
                to="/danh-muc"
              >
                Khám phá ngay
              </Link>
            </div>
          </div>
        </div>

        {/* Empty State / Load More Suggestion */}
        <div className="mt-12 py-10 border-t border-outline-variant text-center">
          <span className="material-symbols-outlined text-outline text-4xl mb-4">confirmation_number</span>
          <p className="font-body-md text-on-surface-variant max-w-xs mx-auto">
            Bạn đã xem hết các ưu đãi khả dụng hiện tại. Hãy quay lại sau để cập nhật thêm!
          </p>
          <button
            type="button"
            className="mt-6 font-label-md text-label-md text-secondary underline decoration-2 underline-offset-4 uppercase tracking-widest"
          >
            Xem các ưu đãi đã nhận
          </button>
        </div>
      </main>

      {/* Bottom Navigation Shell */}
      <nav className="fixed bottom-0 w-full flex justify-around items-center h-14 bg-surface border-t border-outline-variant z-50">
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors active:scale-90 transition-transform duration-150"
          to="/trang-chu"
        >
          <span className="material-symbols-outlined" data-icon="home">
            home
          </span>
          <span className="font-label-md text-label-md">Trang chủ</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors active:scale-90 transition-transform duration-150"
          to="/danh-muc"
        >
          <span className="material-symbols-outlined" data-icon="grid_view">
            grid_view
          </span>
          <span className="font-label-md text-label-md">Danh mục</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors active:scale-90 transition-transform duration-150"
          to="/don-hang"
        >
          <span className="material-symbols-outlined" data-icon="receipt_long">
            receipt_long
          </span>
          <span className="font-label-md text-label-md">Đơn hàng</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors active:scale-90 transition-transform duration-150"
          to="/thong-bao"
        >
          <span className="material-symbols-outlined" data-icon="notifications">
            notifications
          </span>
          <span className="font-label-md text-label-md">Thông báo</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-secondary border-b-2 border-secondary pb-1 active:scale-90 transition-transform duration-150"
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
      </nav>
    </div>
  );
}
