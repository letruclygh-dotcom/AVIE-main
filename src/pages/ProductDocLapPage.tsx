import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SizeChartModal from "../components/SizeChartModal";

const IMAGES = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIw-3yHYlUw2GxUkqBmx6s5u-m155ygOsKQyJMgyjL2_26KuwxA99_mWD-9-_ibMYAoOYC4hTuuyBI3m5zzvrh8Ah-744Z_bL016RffhuXQzFdXQZKgSzCnBSnAKRJr2M6ltSCKy6-bI1IolbUNnDBgLIaMSYYbby2KuOdCt_d5zs5TqNUuAPInOcmxRgSiYjPREfSXtFRSeCQo5FjD1vaUwo4Dfkw35NkMV0nPq-vTGCQpQw7RW9a2ae7hVInLdt11-D-U2RWn7PW",
    alt: "Áo Thun Unisex - Độc Lập - Đen",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa1aq3YZOc8UQY6TA3JwsTyZJlyuHNKIh2CeJnz2ywPrWkjfzCYDuCS345aS1LU3sIizfqBDJqLP7Y-gOn7-DDhOMPr2PQwEdIwisjj_VMnFCqhXu1LiJ4WQ44SKfqcSwNco_d5LzEKroAlRCVeJd_uz5IzjR-qwUo_GUKHu4VI7kz0TtIEuVAG-DesHrqGS4ao-4IZVscSaYat1D7bNBU3744MQCVd8rFQgsOpe4Y2DxN4yzS3wO3VpChQm_0F9XZD2O2cx59RXOv",
    alt: "Áo Thun Unisex - Độc Lập - Trắng",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoZWrI7dLN4m-xuFwqfQO3IeElvGhyeLS4NTHQHwem4uvCqOlxuSQCQv2T5txWP36pgpab3bsb-h0StlxkunSuMPW8QAr0rOP8wxXKaoXHS7QBEnY--OzIxvpiHWDXr5CLVSwmoSKrn2Z87jLnTmMgAWqTAiBDG9NC0FRFS8L2DxZOAQbXU8EVl4FJ9d0uXCJxbOgQYCYDIEkrgpHKCmn_rJ4cSs2VZJF84djX7QgNLw8Js8CiIH2in5ov4Z1CgmILipKNuYFzh-W8",
    alt: "Áo Thun Unisex - Độc Lập - Hồng",
  },
];

const COLORS = [
  { id: "den", label: "Đen", className: "bg-black", imageIndex: 0 },
  { id: "trang", label: "Trắng", className: "bg-white", imageIndex: 1 },
  { id: "hong", label: "Hồng", className: "bg-[#f8c8dc]", imageIndex: 2 },
];

const SIZES = ["S", "M", "L", "XL"];

export default function ProductDocLapPage() {
  const navigate = useNavigate();
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("den");
  const [selectedSize, setSelectedSize] = useState("S");
  const [showSizeChart, setShowSizeChart] = useState(false);

  const handleGalleryScroll = () => {
    const el = galleryRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveImage(index);
    const color = COLORS.find((c) => c.imageIndex === index);
    if (color) setSelectedColor(color.id);
  };

  const scrollToImage = (index: number) => {
    const el = galleryRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
    setActiveImage(index);
  };

  const handleAddToCart = () => {
    navigate("/thanh-toan");
  };

  return (
    <div className="bg-background text-on-surface selection:bg-primary-fixed-dim font-body-md text-body-md min-h-screen pb-24">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-outline-variant flex justify-between items-center px-container-padding h-14 bg-surface">
        <Link
          className="text-primary hover:opacity-70 transition-opacity active:scale-95"
          to="/tim-kiem"
        >
          <span className="material-symbols-outlined">search</span>
        </Link>
        <Link to="/trang-chu">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg026bO7m54LRcITEXtZ9lVmxHPB25RwPSTf0abpgOXMir6CbRRy1_N8yZOXV7NKJvtw5mjK3Oz5kgywNiLWPGSYlsTWTWw4gYUArsaIs7RE_7Q8qc1tgSN66Toi7s_fwKMrTWBKMCzr0EYpPBlzbtlat9G7bob_mkZ94uCEhVRROASLuo2vyon4mRZHrvjBPo3cPn121mFoCDKy7rKHjruMmY73pgpK0Z6eVD4mLTFmMkmq70mYIjQJadJUedvHDuqYhyhcVJehPP"
            alt="AOVIE Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>
        <Link
          className="text-primary hover:opacity-70 transition-opacity active:scale-95"
          to="/thanh-toan"
        >
          <span className="material-symbols-outlined">shopping_bag</span>
        </Link>
      </header>

      <main className="pt-14 pb-24 max-w-screen-xl mx-auto">
        {/* Image Gallery */}
        <div className="relative group">
          <div
            ref={galleryRef}
            onScroll={handleGalleryScroll}
            className="overflow-x-auto snap-x snap-mandatory hide-scrollbar flex aspect-[3/4] md:aspect-square"
          >
            {IMAGES.map((image, index) => (
              <div key={index} className="snap-center shrink-0 w-full">
                <img alt={image.alt} className="w-full h-full object-cover" src={image.src} />
              </div>
            ))}
          </div>

          {/* Image Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {IMAGES.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToImage(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  activeImage === index ? "bg-primary" : "bg-outline-variant"
                }`}
                aria-label={`Ảnh ${index + 1}`}
              />
            ))}
          </div>

          {/* New tag */}
          <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-3 py-1 font-label-md text-label-md uppercase tracking-wider">
            Mới
          </div>
        </div>

        {/* Product Info */}
        <section className="px-container-padding md:max-w-xl py-6 space-y-4">
          <div className="space-y-2">
            <h2 className="font-headline-lg text-headline-lg text-primary uppercase">
              Áo Thun Unisex &quot;Độc lập&quot;
            </h2>
            <div className="flex items-baseline gap-4">
              <p className="font-headline-md text-headline-md text-secondary">225.000đ</p>
              <span className="font-label-md text-label-md text-on-surface-variant line-through">
                295.000đ
              </span>
            </div>
          </div>

          <div className="h-px bg-outline-variant" />

          {/* Options */}
          <div className="space-y-6">
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest block mb-3">
                Màu sắc
              </label>
              <div className="flex gap-3">
                {COLORS.map((color) => {
                  const isSelected = selectedColor === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color.id);
                        scrollToImage(color.imageIndex);
                      }}
                      className={`group flex flex-col items-center gap-1 transition-opacity ${
                        isSelected ? "" : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full ${color.className} ring-1 ring-offset-2 ${
                          isSelected ? "ring-primary" : "ring-outline-variant"
                        }`}
                      />
                      <span className="font-label-md text-label-md">{color.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                  Kích cỡ
                </label>
                <button
                  type="button"
                  onClick={() => setShowSizeChart(true)}
                  className="text-secondary font-label-md text-label-md flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">straighten</span>
                  Bảng size
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {SIZES.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`border py-3 font-label-md text-label-md transition-colors ${
                        isSelected
                          ? "border-primary text-primary bg-primary-fixed-dim"
                          : "border-outline-variant hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 space-y-4">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-primary text-on-primary py-4 font-label-md text-label-md uppercase tracking-[0.2em] rounded-lg shadow-lg shadow-primary/10 active:scale-[0.98] transition-transform"
            >
              Thêm vào giỏ hàng
            </button>
            <div className="flex items-center justify-center gap-2 text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              100% Cotton Premium - Local Proud
            </div>
          </div>
        </section>

        {/* Product Description Tabs */}
        <section className="px-container-padding py-6">
          <div className="border-b border-outline-variant flex gap-8 mb-4">
            <button
              type="button"
              className="pb-4 border-b-2 border-primary font-label-md text-label-md uppercase tracking-wider text-primary"
            >
              Mô tả chi tiết
            </button>
            <button
              type="button"
              onClick={() => navigate("/xem-danh-gia")}
              className="pb-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
            >
              Đánh giá (12)
            </button>
          </div>

          <div className="font-body-md text-body-md text-on-surface-variant space-y-2">
            <p>– Chất liệu: 100% Cotton 2 chiều, định lượng 250gsm, dày dặn, đứng form.</p>
            <p>– Hình in: Công nghệ in lụa cao cấp, bền màu, không bong tróc.</p>
            <p>– Kiểu dáng: Boxy/Oversize unisex phù hợp cho cả nam và nữ.</p>
            <p>– Xuất xứ: Tự hào sản xuất tại Việt Nam bởi đội ngũ AOVIE.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/xem-danh-gia")}
            className="mt-4 w-full py-3 border border-primary text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary hover:text-white transition-all active:scale-95"
          >
            Xem tất cả đánh giá
          </button>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-surface pb-safe h-16 border-t border-outline-variant z-50">
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant pt-1 hover:text-primary transition-colors active:scale-90"
          to="/trang-chu"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-md text-label-md">Trang chủ</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant pt-1 hover:text-primary transition-colors active:scale-90"
          to="/danh-muc"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-label-md">Danh mục</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant pt-1 hover:text-primary transition-colors active:scale-90"
          to="/don-hang"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-label-md text-label-md">Đơn hàng</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant pt-1 hover:text-primary transition-colors active:scale-90"
          to="/thong-bao"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-label-md text-label-md">Thông báo</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant pt-1 hover:text-primary transition-colors active:scale-90"
          to="/toi"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-md text-label-md">Tôi</span>
        </Link>
      </nav>

      {showSizeChart && <SizeChartModal onClose={() => setShowSizeChart(false)} />}
    </div>
  );
}
