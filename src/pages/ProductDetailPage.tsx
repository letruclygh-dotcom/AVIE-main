import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const IMAGES = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAohwbHi7p9B2Z6JhEzwH4hmrR1doKFOY0x6bO4hE8qox3oS-IRUvcHXu8OchG5Ru-RahHE6LXbAfXZ7QJTMUN9CA_4bqHULnwX2raGfWzS0cYTlp4m5En6iN0VKKGGIxm72kaM2IlDWtmzeuvjLRm9NTLTf59nDUnXyrycNZKGVsr4KUtuHeVsf-13AZgKe7cZ21oP46OaJ5jLukTd59PjOM8LXDhGk5HO0PB6EhSn3GFarp81rG-lWeePT3u7ahkz_CFJKE0F1Ptp_s8",
    alt: "Áo Thun Unisex - Bánh Mì - Đen",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiN97XrQ9jFicK72BXiDCImDNO_Ti-BFZKiFG1rk3Tq6mBK7yqErgI0gY4vEgHkqu7SvJ_7bXqBOuUErCMkjZ6o5AmrvP4f240mSssJF_lK9sxSOosgQfGez3lM8vU-7IoUb24zzshTFwYdu01uwo3TMdwiApXbLxTCsaoCfKsr-R-ePT3j7aWAvNDJQcncHrzxE-yCJvQ71jSvJZAIVyWb12pO9NWE-sV8igbl-Rwca822NVzyQgjrLVyRbIOmCQ0clfrZYawjXnOgTQ",
    alt: "Áo Thun Unisex - Bánh Mì - Trắng",
  },
];

const COLORS = [
  { id: "den", label: "Đen", className: "bg-black" },
  { id: "trang", label: "Trắng", className: "bg-white" },
];

const SIZES = ["S", "M", "L", "XL"];

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("den");
  const [selectedSize, setSelectedSize] = useState("S");
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  const handleGalleryScroll = () => {
    const el = galleryRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveImage(index);
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
                <img
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  src={image.src}
                />
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
              Áo Thun Unisex - &quot;bánh mì&quot;
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
                        scrollToImage(color.id === "den" ? 0 : 1);
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
              onClick={() => setActiveTab("description")}
              className={`pb-4 font-label-md text-label-md uppercase tracking-wider ${
                activeTab === "description"
                  ? "border-b-2 border-primary text-primary"
                  : "text-on-surface-variant"
              }`}
            >
              Mô tả chi tiết
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 font-label-md text-label-md uppercase tracking-wider ${
                activeTab === "reviews"
                  ? "border-b-2 border-primary text-primary"
                  : "text-on-surface-variant"
              }`}
            >
              Đánh giá (12)
            </button>
          </div>

          {activeTab === "description" ? (
            <div className="font-body-md text-body-md text-on-surface-variant space-y-2">
              <p>– Chất liệu: 100% Cotton 2 chiều, định lượng 250gsm, dày dặn, đứng form.</p>
              <p>– Hình in: Công nghệ in lụa cao cấp, bền màu, không bong tróc.</p>
              <p>– Kiểu dáng: Boxy/Oversize unisex phù hợp cho cả nam và nữ.</p>
              <p>– Xuất xứ: Tự hào sản xuất tại Việt Nam bởi đội ngũ AOVIE.</p>
            </div>
          ) : (
            <div className="font-body-md text-body-md text-on-surface-variant space-y-4">
              <div className="border-b border-outline-variant/50 pb-4">
                <div className="flex items-center gap-1 text-secondary mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-label-md text-label-md text-primary mb-1">Minh Anh</p>
                <p>Chất áo dày, form đẹp. Hình in bánh mì rất có vibe Việt Nam!</p>
              </div>
              <div className="border-b border-outline-variant/50 pb-4">
                <div className="flex items-center gap-1 text-secondary mb-1">
                  {[1, 2, 3, 4].map((star) => (
                    <span
                      key={star}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span className="material-symbols-outlined text-[16px] text-outline-variant">
                    star
                  </span>
                </div>
                <p className="font-label-md text-label-md text-primary mb-1">Hoàng Tuấn</p>
                <p>Giao hàng nhanh, size L vừa vặn. Rất hài lòng với chất lượng cotton.</p>
              </div>
            </div>
          )}
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
          className="flex flex-col items-center justify-center text-primary pt-1 transition-colors active:scale-90"
          to="/danh-muc"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            grid_view
          </span>
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
    </div>
  );
}
