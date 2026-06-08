import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";
import { supabase } from "../lib/supabaseClient";

const getColorClass = (colorLabel: string) => {
  const map: Record<string, string> = {
    "Đen": "bg-black",
    "Trắng": "bg-white border border-outline-variant",
    "Hồng": "bg-pink-400",
    "Kem": "bg-amber-100",
    "Đen Than": "bg-zinc-800",
    "Đỏ": "bg-red-600",
    "Xanh": "bg-blue-600",
  };
  return map[colorLabel] || "bg-gray-300";
};

export default function CategoryPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [addedStates, setAddedStates] = useState<Record<string, boolean>>({});
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      // Fetch categories
      const { data: catData, error: catErr } = await supabase
        .from("categories")
        .select("*");
      if (!catErr) {
        setCategories(catData || []);
      }

      // Fetch products
      const { data: prodData, error: prodErr } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (!prodErr) {
        setProducts(prodData || []);
      }

      // Load cart count
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { count, error: cartError } = await supabase
          .from("cart_items")
          .select("*", { count: "exact", head: true })
          .eq("user_id", session.user.id);
        if (!cartError && count !== null) {
          setCartCount(count);
        }
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleProductClick = (slug: string) => {
    navigate(`/san-pham/${slug}`);
  };

  const handleAddClick = async (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ!");
      navigate("/dang-nhap");
      return;
    }

    if (product.stock <= 0) {
      alert("Sản phẩm đã hết hàng!");
      return;
    }

    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : "";
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : "";

    try {
      const { data: existing } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("product_id", product.id)
        .eq("color", defaultColor)
        .eq("size", defaultSize)
        .maybeSingle();

      if (existing) {
        const newQty = existing.quantity + 1;
        if (newQty > product.stock) {
          alert(`Không thể thêm! Chỉ còn ${product.stock} sản phẩm trong kho.`);
          return;
        }
        await supabase
          .from("cart_items")
          .update({ quantity: newQty })
          .eq("id", existing.id);
      } else {
        await supabase
          .from("cart_items")
          .insert({
            user_id: session.user.id,
            product_id: product.id,
            quantity: 1,
            color: defaultColor,
            size: defaultSize,
          });
      }

      // Update cart count
      setCartCount((c) => c + 1);

      // Visual feedback
      setAddedStates((prev) => ({ ...prev, [product.id]: true }));
      setTimeout(() => {
        setAddedStates((prev) => ({ ...prev, [product.id]: false }));
      }, 1500);
    } catch (err: any) {
      alert("Lỗi thêm vào giỏ hàng: " + err.message);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategoryId === "all") return true;
    return product.category_id === selectedCategoryId;
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
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Sub-Header & Filters */}
      <section className="px-container-padding pt-6 pb-4 bg-background">
        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-container-padding px-container-padding no-scrollbar scroll-smooth">
          <button 
            onClick={() => setSelectedCategoryId("all")}
            className={`px-4 py-2 font-label-md text-label-md rounded-[2px] uppercase whitespace-nowrap transition-colors ${
              selectedCategoryId === "all" 
                ? "bg-primary text-on-primary" 
                : "border border-outline text-primary hover:bg-surface-variant/30"
            }`}
          >
            Tất cả
          </button>
          
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`px-4 py-2 font-label-md text-label-md rounded-[2px] uppercase whitespace-nowrap transition-colors ${
                selectedCategoryId === cat.id 
                  ? "bg-primary text-on-primary" 
                  : "border border-outline text-primary hover:bg-surface-variant/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content: Product Grid */}
      <main className="flex-grow px-container-padding pb-24">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="animate-spin material-symbols-outlined text-4xl text-primary">progress_activity</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-on-surface-variant py-20">Không có sản phẩm nào trong danh mục này.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-gutter gap-y-8 max-w-screen-xl mx-auto">
            {filteredProducts.map((product) => {
              const img = product.image_urls && product.image_urls.length > 0 ? product.image_urls[0] : "https://placehold.co/300x400?text=AoVie";
              return (
                <div 
                  key={product.id}
                  className="flex flex-col group cursor-pointer"
                  onClick={() => handleProductClick(product.slug)}
                >
                  <div className="aspect-[3/4] bg-surface-variant relative overflow-hidden mb-3 border border-outline-variant">
                    <img 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      src={img} 
                    />
                    <button 
                      onClick={(e) => handleAddClick(e, product)}
                      disabled={product.stock <= 0}
                      className="absolute bottom-2 right-2 w-8 h-8 bg-surface/90 flex items-center justify-center rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity active:scale-90 disabled:opacity-50"
                    >
                      {addedStates[product.id] ? (
                        <span 
                          className="material-symbols-outlined text-[18px] text-secondary" 
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          {product.stock > 0 ? "add" : "block"}
                        </span>
                      )}
                    </button>
                  </div>
                  
                  <h3 className="font-headline-md text-body-md font-bold truncate text-[#5d4037]">
                    {product.name}
                  </h3>
                  
                  <p className="font-body-md mt-1 text-[#5d4037]">
                    {Number(product.price).toLocaleString("vi-VN")}đ
                  </p>
                  
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {product.colors.map((color: string, cIdx: number) => (
                        <div 
                          key={cIdx} 
                          className={`w-3 h-3 rounded-full border border-outline-variant ${getColorClass(color)}`}
                          title={color}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
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
