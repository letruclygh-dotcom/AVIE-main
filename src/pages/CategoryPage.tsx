import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image_url: string[];
  colors: string[];
  stock: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Áo Thun Unisex - 100% COTTON - “Bánh Mì”",
    category: "ÁO",
    price: "225.000đ",
    image_url: ["https://i.ibb.co/PG3p6wTs/6.png", "https://i.ibb.co/BKF66ZPz/7.png"],
    colors: ["Màu đen", "Màu trắng"],
    stock: 100
  },
  {
    id: 2,
    name: "Áo Thun Unisex  - 100% COTTON - \"Nón Lá\"",
    category: "ÁO",
    price: "225.000đ",
    image_url: ["https://i.ibb.co/zhP9w9gz/10.png", "https://i.ibb.co/ynWcFRFG/9.png", "https://i.ibb.co/S7Qmrfv9/8.png"],
    colors: ["Màu đen", "Màu trắng", "Màu hồng"],
    stock: 100
  },
  {
    id: 3,
    name: "Áo Thun Unisex - 100% Cotton - “Độc Lập”",
    category: "ÁO",
    price: "225.000đ",
    image_url: ["https://i.ibb.co/hxBR2WM3/3.png", "https://i.ibb.co/d02Tz6GF/2.png", "https://i.ibb.co/CK3rvyfb/1.png"],
    colors: ["Màu đen", "Màu trắng", "Màu hồng"],
    stock: 100
  },
  {
    id: 4,
    name: "Túi Tote Canvas In Hình Hạ Long Bay",
    category: "TÚI",
    price: "59.000đ",
    image_url: ["https://i.ibb.co/nsFs3RHn/13.png"],
    colors: [],
    stock: 100
  },
  {
    id: 5,
    name: "Túi Tote Canvas In Hình Tháp Rùa",
    category: "TÚI",
    price: "59.000đ",
    image_url: ["https://i.ibb.co/1JR1HBXr/12.png"],
    colors: [],
    stock: 100
  },
  {
    id: 6,
    name: "Túi Tote Canvas In Hình Việt Nam",
    category: "TÚI",
    price: "59.000đ",
    image_url: ["https://i.ibb.co/FvnTxYt/11.png"],
    colors: [],
    stock: 100
  }
];

export default function CategoryPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "ÁO" | "TÚI">("all");
  const [addedStates, setAddedStates] = useState<Record<number, boolean>>({});

  const handleProductClick = (product: Product) => {
    console.log("Navigating to SCREEN_101 with product:", product);
    if (
      window.confirm(
        `Bạn muốn chọn mua nhanh sản phẩm "${product.name}" với giá ${product.price}?`
      )
    ) {
      navigate("/thanh-toan");
    }
  };

  const handleAddClick = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    // Visual feedback
    setAddedStates((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedStates((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory === "all") return true;
    return product.category === selectedCategory;
  });

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-sans relative antialiased select-none pb-24">
      <GrainTexture />

      {/* TopAppBar */}
      <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant">
        <div className="flex items-center justify-between px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button 
            onClick={() => navigate("/tim-kiem")}
            className="hover:opacity-80 transition-opacity active:scale-95 transition-transform duration-200"
          >
            <span className="material-symbols-outlined text-primary">search</span>
          </button>
          
          <img 
            alt="AoVie Logo" 
            className="h-10 object-contain mx-auto cursor-pointer" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQbEwRM79UkI2YRpU3o6OXzkXhObXjNUD6c_SYnSqKTNR_Cjpu0SbwxRS9PS2w145ITdDj2gx-BHLrobLPHupEATS53SZDnzmuzFqoLI7nLXVOVuTddtley2tlIXHjBKhjUEn9Ip8VvxiAIvTel0w6tSnxWdGnFh77JgoEFxoTTAEKPcfLvNoWXBnjvvS4d9PB6KXI0xTJkTRb-4zk8qz5prreQdeLAaUa4g9lRYkmviRsYEdsfkHE5ggoXGEn_PKmqrPQV1uqdiYM"
            onClick={() => navigate("/trang-chu")}
          />
          
          <button 
            onClick={() => navigate("/thanh-toan")}
            className="hover:opacity-80 transition-opacity active:scale-95 transition-transform duration-200 relative"
          >
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
            <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">2</span>
          </button>
        </div>
      </header>

      {/* Sub-Header & Filters */}
      <section className="px-container-padding pt-6 pb-4 bg-background">
        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-container-padding px-container-padding no-scrollbar scroll-smooth">
          <button 
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 font-label-md text-label-md rounded-[2px] uppercase whitespace-nowrap transition-colors ${
              selectedCategory === "all" 
                ? "bg-primary text-on-primary" 
                : "border border-outline text-primary hover:bg-surface-variant/30"
            }`}
          >
            Tất cả
          </button>
          
          <button 
            onClick={() => setSelectedCategory("ÁO")}
            className={`px-4 py-2 font-label-md text-label-md rounded-[2px] uppercase whitespace-nowrap transition-colors ${
              selectedCategory === "ÁO" 
                ? "bg-primary text-on-primary" 
                : "border border-outline text-primary hover:bg-surface-variant/30"
            }`}
          >
            Áo thun
          </button>
          
          <button 
            onClick={() => setSelectedCategory("TÚI")}
            className={`px-4 py-2 font-label-md text-label-md rounded-[2px] uppercase whitespace-nowrap transition-colors ${
              selectedCategory === "TÚI" 
                ? "bg-primary text-on-primary" 
                : "border border-outline text-primary hover:bg-surface-variant/30"
            }`}
          >
            Túi
          </button>
        </div>
      </section>

      {/* Main Content: Product Grid */}
      <main className="flex-grow px-container-padding pb-24">
        <div className="grid grid-cols-2 gap-x-gutter gap-y-8 max-w-screen-xl mx-auto">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="flex flex-col group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="aspect-[3/4] bg-surface-variant relative overflow-hidden mb-3 border border-outline-variant">
                <img 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={product.image_url[0]} 
                />
                <button 
                  onClick={(e) => handleAddClick(e, product)}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-surface/90 flex items-center justify-center rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
                >
                  {addedStates[product.id] ? (
                    <span 
                      className="material-symbols-outlined text-[18px] text-secondary" 
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[18px] text-primary">add</span>
                  )}
                </button>
              </div>
              
              <h3 className="font-headline-md text-body-md font-bold truncate text-[#5d4037]">
                {product.name}
              </h3>
              
              <p className="font-body-md mt-1 text-[#5d4037]">
                {product.price}
              </p>
              
              {product.colors.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {product.colors.map((color, cIdx) => {
                    let colorClass = "bg-white";
                    if (color === "Màu đen") colorClass = "bg-[#2a2a2a]";
                    if (color === "Màu hồng") colorClass = "bg-pink-200";
                    return (
                      <div 
                        key={cIdx} 
                        className={`w-3 h-3 rounded-full border border-outline-variant ${colorClass}`}
                        title={color}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Floating Filter Button */}
      <button 
        onClick={() => navigate("/bo-loc")}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#5d4037] text-on-primary px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-40 active:scale-95 transition-transform hover:opacity-95"
      >
        <span className="material-symbols-outlined text-[20px]">tune</span>
        <span className="font-label-md text-label-md uppercase tracking-wider">Lọc &amp; Sắp xếp</span>
      </button>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 border-t border-outline-variant bg-background">
        <div className="flex justify-around items-center px-2 pb-safe w-full max-w-screen-xl mx-auto h-14">
          {/* Trang chủ */}
          <button 
            onClick={() => navigate("/trang-chu")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[24px]">home</span>
            <span className="font-medium text-[10px]">Trang chủ</span>
          </button>
          
          {/* Danh mục (Active) */}
          <button 
            onClick={() => navigate("/danh-muc")}
            className="flex flex-col items-center justify-center relative active:scale-90 transition-transform"
          >
            <span 
              className="material-symbols-outlined text-[24px]" 
              style={{ color: "rgb(93, 64, 55)", fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            >
              grid_view
            </span>
            <span className="font-medium text-[10px]" style={{ color: "rgb(93, 64, 55)" }}>Danh mục</span>
            <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" style={{ backgroundColor: "rgb(93, 64, 55)" }}></span>
          </button>
          
          {/* Đơn hàng */}
          <button 
            onClick={() => navigate("/don-hang")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[24px]">receipt_long</span>
            <span className="font-medium text-[10px]">Đơn hàng</span>
          </button>
          
          {/* Thông báo */}
          <button 
            onClick={() => navigate("/thong-bao")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="font-medium text-[10px]">Thông báo</span>
          </button>
          
          {/* Tôi */}
          <button 
            onClick={() => navigate("/toi")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[24px]">person</span>
            <span className="font-medium text-[10px]">Tôi</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
