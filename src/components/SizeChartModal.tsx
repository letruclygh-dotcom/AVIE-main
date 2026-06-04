import { Link } from "react-router-dom";

const SIZE_ROWS = [
  { size: "S", chest: "<84", waist: "63-66", weight: "40-47kg" },
  { size: "M", chest: "86-88", waist: "67-71", weight: "48-52kg" },
  { size: "L", chest: "89-92", waist: "72-76", weight: "53-57kg" },
  { size: "XL", chest: "93-96", waist: "77-81", weight: "58-60kg" },
  { size: "XXL", chest: "97-99", waist: "82-86", weight: "61-65kg" },
  { size: "3XL", chest: "<105", waist: ">86", weight: "65-70kg", highlight: true },
];

interface SizeChartModalProps {
  onClose: () => void;
}

export default function SizeChartModal({ onClose }: SizeChartModalProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-background min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-container-padding h-16">
        <button
          type="button"
          onClick={onClose}
          className="hover:opacity-80 transition-opacity active:scale-95 duration-150 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-widest uppercase">
          Bảng size
        </h1>
        <button
          type="button"
          onClick={onClose}
          className="hover:opacity-80 transition-opacity active:scale-95 duration-150 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-primary">close</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="mt-16 mb-20 flex-grow px-container-padding py-8 flex flex-col items-center overflow-y-auto">
        {/* Brand Identity Section */}
        <div className="w-full max-w-2xl mb-12 text-center">
          <h2 className="font-display-lg text-display-lg text-primary mb-2">AoVie</h2>
        </div>

        {/* Size Guide Card */}
        <div className="w-full max-w-2xl bg-surface-container-low border border-outline-variant p-1 rounded-sm shadow-sm">
          <div className="bg-surface p-6 sm:p-8">
            {/* Table Header */}
            <div className="grid grid-cols-4 border-b-2 border-primary pb-4 mb-4">
              <div className="font-headline-md text-headline-md text-primary text-center">Size</div>
              <div className="font-headline-md text-headline-md text-primary text-center">Ngực</div>
              <div className="font-headline-md text-headline-md text-primary text-center">Eo</div>
              <div className="font-headline-md text-headline-md text-primary text-center">Cân Nặng</div>
            </div>

            {/* Table Body */}
            <div className="space-y-0">
              {SIZE_ROWS.map((row) => (
                <div
                  key={row.size}
                  className={`grid grid-cols-4 py-4 border-b hover:bg-surface-container transition-colors group ${
                    row.highlight ? "border-primary" : "border-outline-variant"
                  }`}
                >
                  <div className="font-headline-md text-headline-md text-secondary text-center group-hover:scale-110 transition-transform">
                    {row.size}
                  </div>
                  <div className="font-body-lg text-body-lg text-on-surface text-center flex items-center justify-center">
                    {row.chest}
                  </div>
                  <div className="font-body-lg text-body-lg text-on-surface text-center flex items-center justify-center">
                    {row.waist}
                  </div>
                  <div className="font-body-lg text-body-lg text-on-surface text-center flex items-center justify-center">
                    {row.weight}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">info</span>
              <p className="font-label-md text-label-md text-secondary italic">
                Bảng size áp dụng với chiều cao 1m5-1m65
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="w-full max-w-2xl mt-12 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full max-w-xs bg-primary text-white py-5 rounded-sm font-label-md text-label-md uppercase tracking-[0.2em] hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg active:scale-95 font-bold"
          >
            Chọn sản phẩm ngay
          </button>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface border-t border-outline-variant flex justify-around items-center py-2">
        <Link
          to="/trang-chu"
          onClick={onClose}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-md text-label-md mt-1">Trang chủ</span>
        </Link>
        <Link
          to="/danh-muc"
          onClick={onClose}
          className="flex flex-col items-center justify-center text-secondary font-bold relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-secondary after:rounded-full active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-label-md mt-1">Danh mục</span>
        </Link>
        <Link
          to="/don-hang"
          onClick={onClose}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className="font-label-md text-label-md mt-1">Đơn hàng</span>
        </Link>
        <Link
          to="/thong-bao"
          onClick={onClose}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-label-md text-label-md mt-1">Thông báo</span>
        </Link>
        <Link
          to="/toi"
          onClick={onClose}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-md text-label-md mt-1">Tôi</span>
        </Link>
      </nav>
    </div>
  );
}
