import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

type SortOption = "newest" | "price_asc" | "price_desc";
type SizeOption = "S" | "M" | "L" | "XL";
type ColorOption = "black" | "white" | "terracotta" | "beige";
type CategoryOption = "tops" | "jeans" | "accessories";

export default function FilterPage() {
  const navigate = useNavigate();

  // Filter States
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1500000);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>("M");
  const [selectedColors, setSelectedColors] = useState<ColorOption[]>(["black"]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);

  // Helper formatting
  const formatVND = (value: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
      .format(value)
      .replace(/\s?₫/, "đ");
  };

  // Reset all states
  const handleClearAll = () => {
    setSortBy("newest");
    setMinPrice(0);
    setMaxPrice(1500000);
    setSelectedSize(null);
    setSelectedColors([]);
    setSelectedCategory(null);
  };

  // Preset price options
  const applyPricePreset = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  // Toggle Color
  const handleToggleColor = (color: ColorOption) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  // Apply filters
  const handleApply = () => {
    const filters = {
      sortBy,
      priceRange: [minPrice, maxPrice],
      size: selectedSize,
      colors: selectedColors,
      category: selectedCategory,
    };
    alert("Đã áp dụng bộ lọc:\n" + JSON.stringify(filters, null, 2));
    navigate(-1);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Top App Bar Header */}
      <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant/30 flex items-center justify-between px-container-padding h-16 w-full max-w-screen-xl mx-auto shrink-0">
        <div className="flex items-center gap-4">
          <button
            className="active:scale-90 transition-transform duration-200 w-10 h-10 flex items-center justify-center"
            onClick={() => navigate(-1)}
            type="button"
          >
            <span className="material-symbols-outlined text-on-surface-variant font-light">close</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight uppercase text-lg font-sans">
            Bộ lọc
          </h1>
        </div>
        <button
          onClick={handleClearAll}
          className="font-label-md text-label-md text-secondary/70 hover:text-secondary transition-colors active:scale-95 uppercase tracking-widest font-sans font-semibold"
        >
          Xóa tất cả
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col max-w-screen-xl mx-auto w-full px-container-padding py-8 gap-section-gap overflow-y-auto pb-32">
        {/* Sắp xếp theo */}
        <section className="flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-wider text-sm font-bold font-sans">
            Sắp xếp theo
          </h2>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setSortBy("newest")}
              className={[
                "px-5 py-2.5 font-label-md text-label-md rounded-none active:scale-95 transition-all uppercase tracking-widest font-sans font-semibold",
                sortBy === "newest"
                  ? "bg-secondary text-on-secondary"
                  : "border border-outline-variant text-on-surface-variant hover:bg-surface-variant/30",
              ].join(" ")}
            >
              Mới nhất
            </button>
            <button
              onClick={() => setSortBy("price_asc")}
              className={[
                "px-5 py-2.5 font-label-md text-label-md rounded-none active:scale-95 transition-all uppercase tracking-widest font-sans font-semibold",
                sortBy === "price_asc"
                  ? "bg-secondary text-on-secondary"
                  : "border border-outline-variant text-on-surface-variant hover:bg-surface-variant/30",
              ].join(" ")}
            >
              Giá: Thấp đến Cao
            </button>
            <button
              onClick={() => setSortBy("price_desc")}
              className={[
                "px-5 py-2.5 font-label-md text-label-md rounded-none active:scale-95 transition-all uppercase tracking-widest font-sans font-semibold",
                sortBy === "price_desc"
                  ? "bg-secondary text-on-secondary"
                  : "border border-outline-variant text-on-surface-variant hover:bg-surface-variant/30",
              ].join(" ")}
            >
              Giá: Cao đến Thấp
            </button>
          </div>
        </section>

        {/* Khoảng giá */}
        <section className="flex flex-col gap-6">
          <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-wider text-sm font-bold font-sans">
            Khoảng giá
          </h2>
          <div className="px-1">
            {/* Range Slider Inputs */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="relative pt-4">
                <input
                  type="range"
                  min="0"
                  max="1500000"
                  step="50000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
                  className="w-full h-1 bg-outline-variant/50 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <span className="font-label-md text-[10px] text-outline uppercase tracking-widest font-sans">
                    Tối thiểu
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="1500000"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 rounded-none text-on-surface font-body-md text-body-md font-sans focus:outline-none focus:border-secondary"
                  />
                </div>
                <div className="h-[1px] w-4 bg-outline-variant/50 mt-6 shrink-0" />
                <div className="flex-1 flex flex-col gap-1.5">
                  <span className="font-label-md text-[10px] text-outline uppercase tracking-widest font-sans">
                    Tối đa
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="1500000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 rounded-none text-on-surface font-body-md text-body-md font-sans focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyPricePreset(0, 200000)}
                className="px-3 py-1.5 bg-surface border border-outline-variant/30 text-on-surface-variant rounded-none font-label-md text-[11px] tracking-widest hover:border-secondary transition-colors uppercase font-sans font-semibold"
              >
                0 - 200k
              </button>
              <button
                type="button"
                onClick={() => applyPricePreset(200000, 500000)}
                className="px-3 py-1.5 bg-surface border border-outline-variant/30 text-on-surface-variant rounded-none font-label-md text-[11px] tracking-widest hover:border-secondary transition-colors uppercase font-sans font-semibold"
              >
                200k - 500k
              </button>
              <button
                type="button"
                onClick={() => applyPricePreset(500000, 1000000)}
                className="px-3 py-1.5 bg-surface border border-outline-variant/30 text-on-surface-variant rounded-none font-label-md text-[11px] tracking-widest hover:border-secondary transition-colors uppercase font-sans font-semibold"
              >
                500k - 1tr
              </button>
            </div>
          </div>
        </section>

        {/* Kích thước */}
        <section className="flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-wider text-sm font-bold font-sans">
            Kích thước
          </h2>
          <div className="grid grid-cols-4 gap-2.5">
            {(["S", "M", "L", "XL"] as SizeOption[]).map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(isSelected ? null : size)}
                  className={[
                    "h-12 flex items-center justify-center font-label-md text-label-md rounded-none uppercase transition-all active:scale-95 tracking-widest font-sans font-bold",
                    isSelected
                      ? "border-2 border-primary bg-primary text-on-primary"
                      : "border border-outline-variant text-on-surface-variant hover:bg-secondary/5 hover:border-secondary",
                  ].join(" ")}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </section>

        {/* Màu sắc */}
        <section className="flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-wider text-sm font-bold font-sans">
            Màu sắc
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Color Option: Đen */}
            <button
              type="button"
              onClick={() => handleToggleColor("black")}
              className="flex items-center gap-3 p-3 border border-outline-variant/50 rounded-none hover:bg-surface-variant/30 transition-colors group text-left"
            >
              <div className="w-6 h-6 rounded-full border border-outline bg-black shrink-0" />
              <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface uppercase tracking-wider text-[13px] font-sans">
                Đen
              </span>
              {selectedColors.includes("black") && (
                <span className="material-symbols-outlined ml-auto text-secondary text-lg">check_circle</span>
              )}
            </button>

            {/* Color Option: Trắng */}
            <button
              type="button"
              onClick={() => handleToggleColor("white")}
              className="flex items-center gap-3 p-3 border border-outline-variant/50 rounded-none hover:bg-surface-variant/30 transition-colors group text-left"
            >
              <div className="w-6 h-6 rounded-full border border-outline bg-white shrink-0" />
              <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface uppercase tracking-wider text-[13px] font-sans">
                Trắng
              </span>
              {selectedColors.includes("white") && (
                <span className="material-symbols-outlined ml-auto text-secondary text-lg">check_circle</span>
              )}
            </button>

            {/* Color Option: Terracotta */}
            <button
              type="button"
              onClick={() => handleToggleColor("terracotta")}
              className="flex items-center gap-3 p-3 border border-outline-variant/50 rounded-none hover:bg-surface-variant/30 transition-colors group text-left"
            >
              <div className="w-6 h-6 rounded-full border border-outline bg-[#e7bdb1] shrink-0" />
              <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface uppercase tracking-wider text-[13px] font-sans">
                Terracotta
              </span>
              {selectedColors.includes("terracotta") && (
                <span className="material-symbols-outlined ml-auto text-secondary text-lg">check_circle</span>
              )}
            </button>

            {/* Color Option: Be */}
            <button
              type="button"
              onClick={() => handleToggleColor("beige")}
              className="flex items-center gap-3 p-3 border border-outline-variant/50 rounded-none hover:bg-surface-variant/30 transition-colors group text-left"
            >
              <div className="w-6 h-6 rounded-full border border-outline bg-[#f0eee9] shrink-0" />
              <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface uppercase tracking-wider text-[13px] font-sans">
                Be
              </span>
              {selectedColors.includes("beige") && (
                <span className="material-symbols-outlined ml-auto text-secondary text-lg">check_circle</span>
              )}
            </button>
          </div>
        </section>

        {/* Danh mục sản phẩm */}
        <section className="flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-wider text-sm font-bold font-sans">
            Danh mục sản phẩm
          </h2>
          <div className="flex flex-col border-t border-outline-variant/20">
            {/* Tops */}
            <button
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === "tops" ? null : "tops")}
              className={[
                "flex items-center justify-between py-4 border-b border-outline-variant/20 transition-colors px-1 text-left w-full",
                selectedCategory === "tops" ? "bg-secondary-fixed/30" : "active:bg-surface-variant/20",
              ].join(" ")}
            >
              <span className="font-body-lg text-body-lg text-on-surface-variant uppercase tracking-widest text-[13px] font-sans font-semibold">
                Áo thun & Tank top
              </span>
              <span
                className={[
                  "material-symbols-outlined text-outline font-light transition-transform",
                  selectedCategory === "tops" ? "rotate-90 text-secondary" : "",
                ].join(" ")}
              >
                chevron_right
              </span>
            </button>

            {/* Jeans */}
            <button
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === "jeans" ? null : "jeans")}
              className={[
                "flex items-center justify-between py-4 border-b border-outline-variant/20 transition-colors px-1 text-left w-full",
                selectedCategory === "jeans" ? "bg-secondary-fixed/30" : "active:bg-surface-variant/20",
              ].join(" ")}
            >
              <span className="font-body-lg text-body-lg text-on-surface-variant uppercase tracking-widest text-[13px] font-sans font-semibold">
                Quần Jeans & Khakis
              </span>
              <span
                className={[
                  "material-symbols-outlined text-outline font-light transition-transform",
                  selectedCategory === "jeans" ? "rotate-90 text-secondary" : "",
                ].join(" ")}
              >
                chevron_right
              </span>
            </button>

            {/* Accessories */}
            <button
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === "accessories" ? null : "accessories")}
              className={[
                "flex items-center justify-between py-4 border-b border-outline-variant/20 transition-colors px-1 text-left w-full",
                selectedCategory === "accessories" ? "bg-secondary-fixed/30" : "active:bg-surface-variant/20",
              ].join(" ")}
            >
              <span className="font-body-lg text-body-lg text-on-surface-variant uppercase tracking-widest text-[13px] font-sans font-semibold">
                Phụ kiện dạo phố
              </span>
              <span
                className={[
                  "material-symbols-outlined text-outline font-light transition-transform",
                  selectedCategory === "accessories" ? "rotate-90 text-secondary" : "",
                ].join(" ")}
              >
                chevron_right
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-container-padding bg-background/95 backdrop-blur-md border-t border-outline-variant/30 flex items-center justify-center z-50">
        <div className="w-full max-w-screen-xl">
          <button
            type="button"
            onClick={handleApply}
            className="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded-none shadow-xl uppercase tracking-[0.2em] active:scale-[0.98] transition-all font-semibold font-sans hover:bg-primary/95"
          >
            ÁP DỤNG
          </button>
        </div>
      </div>
    </div>
  );
}
