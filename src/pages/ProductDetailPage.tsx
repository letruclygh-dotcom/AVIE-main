import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SizeChartModal from "../components/SizeChartModal";
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

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) {
        console.error("Lỗi fetch sản phẩm:", error.message);
      } else {
        setProduct(data);
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      }
      setLoading(false);
    }
    fetchProduct();
  }, [slug]);

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

  const handleAddToCart = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert("Vui lòng đăng nhập để thực hiện mua hàng!");
      navigate("/dang-nhap");
      return;
    }

    if (!product) return;

    if (product.stock <= 0) {
      alert("Sản phẩm đã hết hàng trong kho!");
      return;
    }

    setAddingToCart(true);
    try {
      // Check existing item in database cart
      const { data: existing } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("product_id", product.id)
        .eq("color", selectedColor)
        .eq("size", selectedSize)
        .maybeSingle();

      if (existing) {
        const newQty = existing.quantity + 1;
        if (newQty > product.stock) {
          alert(`Không thể thêm! Chỉ còn ${product.stock} sản phẩm trong kho.`);
          setAddingToCart(false);
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
            color: selectedColor,
            size: selectedSize,
          });
      }

      navigate("/thanh-toan");
    } catch (err: any) {
      alert("Lỗi thêm vào giỏ hàng: " + err.message);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-background text-on-surface min-h-screen flex items-center justify-center">
        <span className="animate-spin material-symbols-outlined text-4xl text-primary">progress_activity</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-body-lg text-body-lg text-on-surface-variant">Không tìm thấy sản phẩm này.</p>
        <Link to="/trang-chu" className="text-primary hover:underline">Về trang chủ</Link>
      </div>
    );
  }

  const images = product.image_urls && product.image_urls.length > 0 ? product.image_urls : ["https://placehold.co/600x800?text=AoVie"];

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
            {images.map((imgUrl: string, index: number) => (
              <div key={index} className="snap-center shrink-0 w-full">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover"
                  src={imgUrl}
                />
              </div>
            ))}
          </div>

          {/* Image Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_: any, index: number) => (
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
          )}

          {/* Stock tag */}
          <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-3 py-1 font-label-md text-label-md uppercase tracking-wider">
            {product.stock > 0 ? `Còn lại: ${product.stock}` : "Hết hàng"}
          </div>
        </div>

        {/* Product Info */}
        <section className="px-container-padding md:max-w-xl py-6 space-y-4">
          <div className="space-y-2">
            <h2 className="font-headline-lg text-headline-lg text-primary uppercase">
              {product.name}
            </h2>
            <div className="flex items-baseline gap-4">
              <p className="font-headline-md text-headline-md text-secondary">
                {Number(product.price).toLocaleString("vi-VN")}đ
              </p>
              {product.original_price && Number(product.original_price) > Number(product.price) && (
                <span className="font-label-md text-label-md text-on-surface-variant line-through">
                  {Number(product.original_price).toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>
          </div>

          <div className="h-px bg-outline-variant" />

          {/* Options */}
          <div className="space-y-6">
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest block mb-3">
                  Màu sắc
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color: string) => {
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => {
                          setSelectedColor(color);
                        }}
                        className={`group flex flex-col items-center gap-1 transition-opacity ${
                          isSelected ? "" : "opacity-50 hover:opacity-100"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full ${getColorClass(color)} ring-1 ring-offset-2 ${
                            isSelected ? "ring-primary" : "ring-outline-variant"
                          }`}
                        />
                        <span className="font-label-md text-label-md">{color}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
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
                  {product.sizes.map((size: string) => {
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
            )}
          </div>

          {/* Action */}
          <div className="pt-4 space-y-4">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={addingToCart || product.stock <= 0}
              className="w-full bg-primary text-on-primary py-4 font-label-md text-label-md uppercase tracking-[0.2em] rounded-lg shadow-lg shadow-primary/10 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingToCart ? "Đang xử lý..." : product.stock > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
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

          <div className="font-body-md text-body-md text-on-surface-variant whitespace-pre-line leading-relaxed">
            {product.description || "Chưa có mô tả cho sản phẩm này."}
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

      {showSizeChart && <SizeChartModal onClose={() => setShowSizeChart(false)} />}
    </div>
  );
}
