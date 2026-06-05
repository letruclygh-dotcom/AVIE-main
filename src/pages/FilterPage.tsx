import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

type SortOption = "newest" | "price_asc" | "price_desc";
type SizeOption = "S" | "M" | "L" | "XL";
type ColorOption = "black" | "white" | "pink";
type CategoryOption = "tshirt" | "bag";

export default function FilterPage() {
  const navigate = useNavigate();

  // Filter States
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1500000);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>("M");
  const [selectedColors, setSelectedColors] = useState<ColorOption[]>(["black"]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);

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

  // Percentages for dual slider track
  const minPercent = (minPrice / 1500000) * 100;
  const maxPercent = (maxPrice / 1500000) * 100;

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans relative antialiased select-none">
      <GrainTexture />

      {/* CSS overrides for double range slider */}
      <style>{`
        .double-range-slider input[type=range] {
          -webkit-appearance: none;
          pointer-events: none;
          background: transparent;
        }
        .double-range-slider input[type=range]::-webkit-slider-runnable-track {
          background: transparent;
        }
        .double-range-slider input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #95491a;
          cursor: pointer;
          pointer-events: auto;
          border: 2px solid #fbf9f4;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-top: -8px;
        }
        .double-range-slider input[type=range]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #95491a;
          cursor: pointer;
          pointer-events: auto;
          border: 2px solid #fbf9f4;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* Top App Bar Header */}
      <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant flex items-center justify-between px-container-padding h-16 w-full max-w-screen-xl mx-auto shrink-0">
        <div className="flex items-center gap-4">
          <button
            className="active:scale-95 transition-transform duration-200"
            onClick={() => navigate(-1)}
            type="button"
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
            Bộ lọc
          </h1>
        </div>
        <button
          onClick={handleClearAll}
          className="font-label-md text-label-md text-secondary hover:opacity-80 transition-opacity active:scale-95"
        >
          Xóa tất cả
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col max-w-screen-xl mx-auto w-full px-container-padding py-6 gap-section-gap overflow-y-auto custom-scrollbar pb-32">
        {/* Sắp xếp theo */}
        <section className="flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Sắp xếp theo</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSortBy("newest")}
              className={[
                "px-5 py-2.5 font-label-md text-label-md rounded-lg active:scale-95 transition-all",
                sortBy === "newest"
                  ? "border-2 border-secondary bg-secondary/5 text-secondary"
                  : "border border-outline text-on-surface-variant hover:bg-surface-variant",
              ].join(" ")}
            >
              Mới nhất
            </button>
            <button
              onClick={() => setSortBy("price_asc")}
              className={[
                "px-5 py-2.5 font-label-md text-label-md rounded-lg active:scale-95 transition-all",
                sortBy === "price_asc"
                  ? "border-2 border-secondary bg-secondary/5 text-secondary"
                  : "border border-outline text-on-surface-variant hover:bg-surface-variant",
              ].join(" ")}
            >
              Giá: Thấp đến Cao
            </button>
            <button
              onClick={() => setSortBy("price_desc")}
              className={[
                "px-5 py-2.5 font-label-md text-label-md rounded-lg active:scale-95 transition-all",
                sortBy === "price_desc"
                  ? "border-2 border-secondary bg-secondary/5 text-secondary"
                  : "border border-outline text-on-surface-variant hover:bg-surface-variant",
              ].join(" ")}
            >
              Giá: Cao đến Thấp
            </button>
          </div>
        </section>

        {/* Khoảng giá */}
        <section className="flex flex-col gap-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Khoảng giá</h2>
          <div className="px-2">
            <div className="relative w-full h-1 bg-outline-variant rounded-full mb-8 double-range-slider">
              <div
                className="absolute h-full bg-secondary rounded-full"
                style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
              />
              <input
                type="range"
                min="0"
                max="1500000"
                step="50000"
                value={minPrice}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), maxPrice - 50000);
                  setMinPrice(val);
                }}
                className="absolute top-1/2 -translate-y-1/2 left-0 w-full"
                style={{ zIndex: minPrice > 750000 ? 5 : 3 }}
              />
              <input
                type="range"
                min="0"
                max="1500000"
                step="50000"
                value={maxPrice}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), minPrice + 50000);
                  setMaxPrice(val);
                }}
                className="absolute top-1/2 -translate-y-1/2 left-0 w-full"
                style={{ zIndex: 4 }}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <span className="font-label-md text-label-md text-outline uppercase">Tối thiểu</span>
                <input
                  type="number"
                  min="0"
                  max="1500000"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
                  className="bg-surface-container border border-outline-variant px-4 py-3 rounded text-on-surface font-body-md text-body-md focus:outline-none focus:border-secondary"
                />
              </div>
              <div className="h-px w-4 bg-outline-variant mt-5" />
              <div className="flex-1 flex flex-col gap-1">
                <span className="font-label-md text-label-md text-outline uppercase">Tối đa</span>
                <input
                  type="number"
                  min="0"
                  max="1500000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
                  className="bg-surface-container border border-outline-variant px-4 py-3 rounded text-on-surface font-body-md text-body-md focus:outline-none focus:border-secondary"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPricePreset(0, 200000)}
              className="px-4 py-2 bg-surface-container-low border border-outline-variant text-on-surface-variant rounded font-label-md text-label-md hover:border-secondary transition-colors"
            >
              0 - 200k
            </button>
            <button
              onClick={() => applyPricePreset(200000, 500000)}
              className="px-4 py-2 bg-surface-container-low border border-outline-variant text-on-surface-variant rounded font-label-md text-label-md hover:border-secondary transition-colors"
            >
              200k - 500k
            </button>
            <button
              onClick={() => applyPricePreset(500000, 1000000)}
              className="px-4 py-2 bg-surface-container-low border border-outline-variant text-on-surface-variant rounded font-label-md text-label-md hover:border-secondary transition-colors"
            >
              500k - 1tr
            </button>
          </div>
        </section>

        {/* Kích thước */}
        <section className="flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Kích thước</h2>
          <div className="grid grid-cols-4 gap-3">
            {(["S", "M", "L", "XL"] as SizeOption[]).map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(isSelected ? null : size)}
                  className={[
                    "h-12 flex items-center justify-center font-label-md text-label-md rounded uppercase transition-all active:scale-95",
                    isSelected
                      ? "border-2 border-secondary bg-secondary/5 text-secondary"
                      : "border border-outline text-on-surface-variant hover:bg-secondary/10 hover:border-secondary",
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
          <h2 className="font-headline-md text-headline-md text-on-surface">Màu sắc</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Color Option: Đen */}
            <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-variant transition-colors group">
              <input
                type="checkbox"
                checked={selectedColors.includes("black")}
                onChange={() => handleToggleColor("black")}
                className="hidden peer"
              />
              <div className="w-8 h-8 rounded-full border border-outline bg-black" />
              <span className="font-body-md text-body-md text-on-surface-variant peer-checked:text-on-surface peer-checked:font-semibold">
                Đen
              </span>
              <span
                className="material-symbols-outlined ml-auto opacity-0 peer-checked:opacity-100 text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </label>

            {/* Color Option: Trắng */}
            <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-variant transition-colors group">
              <input
                type="checkbox"
                checked={selectedColors.includes("white")}
                onChange={() => handleToggleColor("white")}
                className="hidden peer"
              />
              <div className="w-8 h-8 rounded-full border border-outline-variant bg-white" />
              <span className="font-body-md text-body-md text-on-surface-variant peer-checked:text-on-surface peer-checked:font-semibold">
                Trắng
              </span>
              <span
                className="material-symbols-outlined ml-auto opacity-0 peer-checked:opacity-100 text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </label>

            {/* Color Option: Hồng */}
            <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-variant transition-colors group">
              <input
                type="checkbox"
                checked={selectedColors.includes("pink")}
                onChange={() => handleToggleColor("pink")}
                className="hidden peer"
              />
              <div className="w-8 h-8 rounded-full border border-outline-variant bg-[#FFC0CB]" />
              <span className="font-body-md text-body-md text-on-surface-variant peer-checked:text-on-surface peer-checked:font-semibold">
                Hồng
              </span>
              <span
                className="material-symbols-outlined ml-auto opacity-0 peer-checked:opacity-100 text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </label>
          </div>
        </section>

        {/* Danh mục sản phẩm */}
        <section className="flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Danh mục sản phẩm</h2>
          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === "tshirt" ? null : "tshirt")}
              className={[
                "flex items-center justify-between py-3 border-b border-outline-variant w-full text-left",
                selectedCategory === "tshirt" ? "font-bold text-secondary" : "",
              ].join(" ")}
            >
              <span className="font-body-lg text-body-lg text-on-surface-variant">Áo thun</span>
              <span
                className={[
                  "material-symbols-outlined text-outline transition-transform",
                  selectedCategory === "tshirt" ? "rotate-90 text-secondary" : "",
                ].join(" ")}
              >
                chevron_right
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === "bag" ? null : "bag")}
              className={[
                "flex items-center justify-between py-3 border-b border-outline-variant w-full text-left",
                selectedCategory === "bag" ? "font-bold text-secondary" : "",
              ].join(" ")}
            >
              <span className="font-body-lg text-body-lg text-on-surface-variant">Túi</span>
              <span
                className={[
                  "material-symbols-outlined text-outline transition-transform",
                  selectedCategory === "bag" ? "rotate-90 text-secondary" : "",
                ].join(" ")}
              >
                chevron_right
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-container-padding bg-surface/95 backdrop-blur-sm border-t border-outline-variant flex items-center justify-center z-50">
        <div className="w-full max-w-screen-xl flex gap-3">
          <button
            type="button"
            onClick={handleApply}
            className="flex-grow bg-primary text-on-primary font-label-md text-label-md py-4 rounded shadow-lg uppercase tracking-widest active:scale-[0.98] transition-all"
          >
            ÁP DỤNG
          </button>
        </div>
      </div>
    </div>
  );
}
