import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabaseClient";

type ShippingMethod = "standard";
type PaymentMethod = "cod" | "payos";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  
  // States cho Form
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  
  // States cho Giỏ hàng
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  // 1. Check Auth & Load profile data
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        alert("Vui lòng đăng nhập để thực hiện thanh toán!");
        navigate("/dang-nhap");
        return;
      }
      setRecipientName(profile?.full_name || "");
      setRecipientPhone(profile?.phone || "");
      
      // Load address mặc định của user nếu có
      loadDefaultAddress();
      // Load giỏ hàng
      loadCartItems();
    }
  }, [user, authLoading, profile]);

  const loadDefaultAddress = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_default", true)
      .maybeSingle();
    
    if (!error && data) {
      setShippingAddress(data.address_detail);
    }
  };

  const loadCartItems = async () => {
    if (!user) return;
    setCartLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select("*, products(*)")
      .eq("user_id", user.id);
    
    if (error) {
      console.error("Lỗi load giỏ hàng:", error.message);
    } else {
      setCartItems(data || []);
    }
    setCartLoading(false);
  };

  // 2. Logic tăng giảm xóa giỏ hàng
  const handleUpdateQuantity = async (itemId: string, currentQty: number, change: number, stock: number) => {
    const newQty = currentQty + change;
    if (newQty <= 0) {
      // Xoá item
      handleDeleteItem(itemId);
      return;
    }
    if (newQty > stock) {
      alert(`Không thể tăng! Chỉ còn ${stock} sản phẩm trong kho.`);
      return;
    }

    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: newQty })
        .eq("id", itemId);
      
      if (error) {
        alert("Không thể cập nhật số lượng: " + error.message);
      } else {
        // Cập nhật state local
        setCartItems((prev) =>
          prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
        );
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?")) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);
      
      if (error) {
        alert("Lỗi khi xoá sản phẩm: " + error.message);
      } else {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      }
    }
  };

  // 3. Tính tổng tiền
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.products ? Number(item.products.price) : 0;
    return acc + price * item.quantity;
  }, 0);

  const shippingFee = cartItems.length > 0 ? 30000 : 0;
  const total = subtotal + shippingFee;

  // 4. Submit đặt hàng
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    if (paymentMethod === "payos") {
      alert("Cổng thanh toán payOS đang được phát triển ở Phần 9! Vui lòng chọn COD để tiếp tục test.");
      return;
    }

    setIsProcessing(true);

    try {
      // Lấy session token hiện tại của user để gửi lên API server-side
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert("Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.");
        navigate("/dang-nhap");
        return;
      }

      // Gọi API Vercel Serverless Function
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          recipientName,
          recipientPhone,
          shippingAddress,
          shippingMethod,
          paymentMethod
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Đã xảy ra lỗi khi tạo đơn hàng.");
      }

      // Đặt hàng thành công
      setIsProcessing(false);
      // Chuyển hướng sang trang thành công kèm theo orderCode
      navigate("/dat-hang-thanh-cong", { state: { orderCode: result.orderCode } });

    } catch (err: any) {
      alert("Đặt hàng thất bại: " + err.message);
      setIsProcessing(false);
    }
  };

  if (authLoading || cartLoading) {
    return (
      <div className="bg-background text-on-surface min-h-screen flex items-center justify-center">
        <span className="animate-spin material-symbols-outlined text-4xl text-primary">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface selection:bg-secondary-container selection:text-on-secondary-container min-h-screen pb-32 font-sans relative antialiased select-none">
      <GrainTexture />

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-[0.2em] text-primary uppercase">
            AoVie
          </h1>
          <button
            type="button"
            onClick={() => navigate("/danh-muc")}
            className="hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-20 pb-12 px-container-padding max-w-md mx-auto font-sans relative z-10">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant/60">
            Giỏ hàng
          </span>
          <span className="h-px bg-outline-variant flex-grow mx-4"></span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-bold border-b-2 border-primary pb-1">
            Thanh toán
          </span>
          <span className="h-px bg-outline-variant flex-grow mx-4"></span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant/60">
            Hoàn tất
          </span>
        </div>

        {/* Section 0: Giỏ hàng chi tiết */}
        <section className="mb-8">
          <h2 className="font-headline-md text-headline-md mb-4 flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined">shopping_cart</span>
            Sản phẩm đã chọn
          </h2>
          
          {cartItems.length === 0 ? (
            <div className="p-6 bg-surface-container rounded-xl border border-outline-variant text-center">
              <p className="text-on-surface-variant mb-4">Giỏ hàng của bạn đang trống.</p>
              <button
                type="button"
                onClick={() => navigate("/danh-muc")}
                className="bg-primary text-white px-6 py-2 rounded text-xs font-bold uppercase tracking-wider"
              >
                Mua sắm ngay
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => {
                const product = item.products;
                if (!product) return null;
                const img = product.image_urls && product.image_urls.length > 0 ? product.image_urls[0] : "https://placehold.co/150x200?text=AoVie";
                
                return (
                  <div key={item.id} className="flex gap-4 p-4 bg-surface-container rounded-xl border border-outline-variant items-center">
                    <img src={img} alt={product.name} className="w-16 h-20 object-cover rounded border border-outline-variant" />
                    
                    <div className="flex-grow">
                      <h3 className="font-body-md font-bold text-on-surface line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Màu: {item.color || "Mặc định"} | Size: {item.size || "Mặc định"}
                      </p>
                      <p className="text-sm text-secondary font-bold mt-1">
                        {Number(product.price).toLocaleString("vi-VN")}đ
                      </p>
                    </div>

                    {/* Bộ chỉnh số lượng */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center border border-outline-variant rounded bg-surface">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, -1, product.stock)}
                          className="w-8 h-8 flex items-center justify-center text-primary font-bold hover:bg-surface-container-low transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 text-sm font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, 1, product.stock)}
                          className="w-8 h-8 flex items-center justify-center text-primary font-bold hover:bg-surface-container-low transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-error hover:underline text-xs flex items-center gap-1 mt-1"
                      >
                        <span className="material-symbols-outlined !text-[14px]">delete</span>
                        Xoá
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <form onSubmit={handleSubmit} className="space-y-section-gap">
          {/* Section 1: Thông tin người nhận */}
          <section>
            <h2 className="font-headline-md text-headline-md mb-6 flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined">account_circle</span>
              Thông tin người nhận
            </h2>
            <div className="space-y-6">
              <div className="relative">
                <label
                  className={`font-label-md text-label-md mb-2 block uppercase tracking-wider transition-colors ${
                    activeInput === "name" ? "text-secondary font-bold" : "text-on-surface-variant"
                  }`}
                >
                  Họ tên
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  onFocus={() => setActiveInput("name")}
                  onBlur={() => setActiveInput(null)}
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-all placeholder:text-on-surface-variant/40 font-sans"
                  placeholder="Helen Chen"
                  required
                />
              </div>
              <div className="relative">
                <label
                  className={`font-label-md text-label-md mb-2 block uppercase tracking-wider transition-colors ${
                    activeInput === "phone" ? "text-secondary font-bold" : "text-on-surface-variant"
                  }`}
                >
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  onFocus={() => setActiveInput("phone")}
                  onBlur={() => setActiveInput(null)}
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-all placeholder:text-on-surface-variant/40 font-sans"
                  placeholder="0938752999"
                  required
                />
              </div>
            </div>
          </section>

          {/* Section 2: Địa chỉ giao hàng */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-md text-headline-md flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined">distance</span>
                Địa chỉ giao hàng
              </h2>
            </div>
            <div className="relative">
              <label
                className={`font-label-md text-label-md mb-2 block uppercase tracking-wider transition-colors ${
                  activeInput === "address" ? "text-secondary font-bold" : "text-on-surface-variant"
                }`}
              >
                Địa chỉ chi tiết
              </label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                onFocus={() => setActiveInput("address")}
                onBlur={() => setActiveInput(null)}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-all resize-none placeholder:text-on-surface-variant/40 font-sans"
                placeholder="Số 45, Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh"
                rows={2}
                required
              />
            </div>
          </section>

          {/* Section 3: Phương thức vận chuyển */}
          <section>
            <h2 className="font-headline-md text-headline-md mb-6 flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined">package_2</span>
              Phương thức vận chuyển
            </h2>
            <label className="flex items-center justify-between p-5 bg-surface-container-low border border-outline-variant rounded-xl cursor-pointer hover:border-secondary/50 transition-all group">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === "standard"}
                  onChange={() => setShippingMethod("standard")}
                  className="w-5 h-5 text-secondary bg-surface border-outline-variant focus:ring-secondary focus:ring-offset-background"
                />
                <div>
                  <p className="font-body-md text-body-md font-bold text-on-surface font-sans">
                    Giao hàng tiêu chuẩn
                  </p>
                  <p className="font-label-md text-label-md text-on-surface-variant italic font-sans">
                    Dự kiến nhận hàng sau 3-5 ngày
                  </p>
                </div>
              </div>
              <span className="font-body-md text-body-md text-secondary font-bold font-sans">
                30.000đ
              </span>
            </label>
          </section>

          {/* Section 4: Phương thức thanh toán */}
          <section>
            <h2 className="font-headline-md text-headline-md mb-6 flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined">account_balance_wallet</span>
              Phương thức thanh toán
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-4 p-5 bg-surface-container-low border border-outline-variant rounded-xl hover:bg-surface-container transition-colors cursor-pointer group">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-5 h-5 text-secondary bg-surface border-outline-variant focus:ring-secondary focus:ring-offset-background"
                />
                <span className="font-body-md text-body-md uppercase tracking-wide text-on-surface font-sans">
                  Thanh toán khi nhận hàng (COD)
                </span>
              </label>
              <label className="flex items-center gap-4 p-5 bg-surface-container-low border border-outline-variant rounded-xl hover:bg-surface-container transition-colors cursor-pointer group">
                <input
                  type="radio"
                  name="payment"
                  value="payos"
                  checked={paymentMethod === "payos"}
                  onChange={() => setPaymentMethod("payos")}
                  className="w-5 h-5 text-secondary bg-surface border-outline-variant focus:ring-secondary focus:ring-offset-background"
                />
                <span className="font-body-md text-body-md uppercase tracking-wide text-on-surface font-sans">
                  Thanh toán trực tuyến (payOS)
                </span>
              </label>
            </div>
          </section>

          {/* Section 5: Tóm tắt đơn hàng */}
          <section className="bg-surface-container p-6 rounded-2xl border border-outline-variant font-sans">
            <h2 className="font-label-md text-label-md mb-6 uppercase tracking-[0.15em] text-on-surface-variant font-bold border-b border-outline-variant pb-3">
              Tóm tắt đơn hàng
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-body-md text-body-md text-on-surface-variant font-sans">
                  Tạm tính
                </span>
                <span className="font-body-md text-body-md font-medium font-sans">
                  {subtotal.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-md text-body-md text-on-surface-variant font-sans">
                  Phí vận chuyển
                </span>
                <span className="font-body-md text-body-md font-medium font-sans">
                  {shippingFee.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 mt-2 border-t border-outline-variant">
                <span className="font-headline-md text-headline-md text-primary font-sans">
                  Tổng cộng
                </span>
                <span className="font-headline-md text-headline-md text-secondary font-sans">
                  {total.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>
          </section>

          {/* Section 6: CTA Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isProcessing || cartItems.length === 0}
              className={`w-full bg-primary text-on-primary py-4 rounded-xl font-label-md text-label-md uppercase tracking-[0.2em] font-bold active:scale-[0.98] transition-all shadow-xl shadow-primary/20 font-sans ${
                isProcessing || cartItems.length === 0 ? "opacity-70 cursor-not-allowed" : "hover:bg-on-primary-fixed-variant"
              }`}
            >
              {isProcessing ? "ĐANG XỬ LÝ..." : "Xác nhận đặt hàng"}
            </button>
            <p className="text-center font-label-md text-label-md text-on-surface-variant mt-6 px-4 leading-relaxed italic opacity-80 font-sans">
              Nhấn "Xác nhận đặt hàng" đồng nghĩa với việc bạn đồng ý với Điều khoản mua hàng của AoVie.
            </p>
          </div>
        </form>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface/90 backdrop-blur-md font-sans">
        <div className="flex justify-around items-center h-16 px-2 pb-safe w-full max-w-screen-xl mx-auto">
          {/* Trang chủ */}
          <button
            onClick={() => navigate("/trang-chu")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Trang chủ</span>
          </button>
          {/* Danh mục */}
          <button
            onClick={() => navigate("/danh-muc")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">grid_view</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Danh mục</span>
          </button>
          {/* Đơn hàng */}
          <button
            onClick={() => navigate("/don-hang")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">receipt_long</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Đơn hàng</span>
          </button>
          {/* Thông báo */}
          <button
            onClick={() => navigate("/thong-bao")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Thông báo</span>
          </button>
          {/* Tôi */}
          <button
            onClick={() => navigate("/toi")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Tôi</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
