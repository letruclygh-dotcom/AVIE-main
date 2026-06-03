import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

type CategoryFilter = "all" | "tops" | "jeans" | "accessories";

export default function HomePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const products = [
    {
      id: "p1",
      title: "Áo Thun Unisex - 100% COTTON - “Bánh Mì”",
      price: 225000,
      category: "tops",
      tag: "Mới",
      image:
        "https://i.ibb.co/PG3p6wTs/6.png",
    },
    {
      id: "p2",
      title: 'Áo Thun Unisex - 100% COTTON - "Nón Lá"',
      price: 225000,
      category: "tops",
      tag: "",
      image:
        "https://i.ibb.co/zhP9w9gz/10.png",
    },
    {
      id: "p3",
      title: "Heavyweight Boxy Tee - “Độc Lập”",
      price: 420000,
      category: "tops",
      tag: "HOT",
      image:
        "https://i.ibb.co/hxBR2WM3/3.png",
    },
    {
      id: "p4",
      title: "Organic Cotton Basic",
      price: 280000,
      category: "tops",
      tag: "",
      image:
        "https://i.ibb.co/FvnTxYt/11.png",
    },
  ];

  const handleBottomNav = (path: string) => {
    navigate(path);
  };

  const formatVND = (value: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
      .format(value)
      .replace(/\s?₫/, "đ");
  };

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  return (
    <div className="bg-background text-on-surface min-h-screen pb-28 font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Top App Bar Header */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-surface-variant shrink-0">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          {/* Click to search */}
          <button
            onClick={() => navigate("/tim-kiem")}
            className="hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
            type="button"
          >
            <span className="material-symbols-outlined text-primary">search</span>
          </button>

          {/* Centered Logo */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwh7yrVOTAGqdin7eM3AB4NddGwgjYXL0uhlU42-nMJtT8DcJWGpytyfED7UrfmS1t9lZdxw-Cqo3LHuonO7XGT5z_H-k3cyhDp1_OwRFpdibfhlSCsQHVcVJrQPBc_dUfLsaoXk_vqTqGSMbCuucwee8nfTKTlaBfU4WkODCqwFEo3NVR7_-uJSjWKVR4foLaMGo4e_LHNpR52KFpQElMTzFPIiCy93mAFN3P7krJ4-npb2ftHMKuecPr0PvE2gcZHGxHDVLVzxlfhVvw"
            alt="AoVie Logo"
            className="h-7 w-auto object-contain"
          />

          <button
            onClick={() => alert("Giỏ hàng đang được chuẩn bị...")}
            className="hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
            type="button"
          >
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-16 max-w-screen-xl mx-auto w-full">
        {/* Saigon Alleyway Atmospheric Hero Banner */}
        <section className="px-container-padding py-6">
          <div className="relative overflow-hidden rounded-xl border border-outline-variant h-80 shadow-md">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYkIYGEquZt9wpoKCMu1YUUxU25Gx1IRzTwB5oN4fmjkr43vPLNfTlAvwxHZGz3LNMNYE18zF9D73O8mSXUDaOCBNUdfRX8NLsAW_a__qkP2eObn7KubukWWEp76EdDh9r91hTHWdQtR3OYxmNt9Y5AWgC23dC53mAzTKkNTJaFgPhaVjjGHejmuXfiDBLBcbvVyhYVwYT7kQZj6YKZfc4DL5jQTApv6QRj_W4K4ZSwScjoppNyk-UYYYbZ1pkBLPrynqX8_4hw7P6"
              alt="Saigon Tailoring Shop"
              className="w-full h-full object-cover brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="font-label-md text-[10px] text-primary-fixed uppercase tracking-[0.2em] font-semibold bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded w-fit mb-2">
                Heritage urban line
              </span>
              <h2 className="font-display-lg text-primary-fixed text-xl md:text-2xl font-bold tracking-wide uppercase leading-tight">
                Bộ Sưu Tập Di Sản Đô Thị
              </h2>
              <p className="font-body-md text-primary-fixed-dim mt-1.5 max-w-md text-xs leading-relaxed opacity-90">
                Lấy cảm hứng từ góc tiệm may Saigon cổ kính dưới vệt nắng chiếu nghiêng ấm áp, kiến tạo chất liệu đương đại mộc mạc và sang trọng.
              </p>
              <button
                onClick={() => navigate("/bo-loc")}
                className="mt-4 bg-secondary text-white py-3 px-6 rounded font-label-md text-label-md uppercase tracking-wider font-bold shadow-md hover:bg-secondary/95 active:scale-95 transition-all w-fit"
              >
                KHÁM PHÁ NGAY
              </button>
            </div>
          </div>
        </section>

        {/* Quick Category Carousel */}
        <section className="px-container-padding mb-6 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {(
            [
              { id: "all", label: "Tất cả" },
              { id: "tops", label: "Áo thun & Tank top" },
              { id: "jeans", label: "Quần Jeans" },
              { id: "accessories", label: "Phụ kiện" },
            ] as const
          ).map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id === "jeans" || cat.id === "accessories") {
                    alert("Các sản phẩm của danh mục này đang chuẩn bị ra mắt!");
                  }
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-label-md text-label-md uppercase font-semibold transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "bg-secondary text-white shadow-sm"
                    : "border border-outline-variant text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </section>

        {/* Product Catalog Grid */}
        <section className="px-container-padding pb-6">
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-headline-md text-primary font-bold">Sản phẩm nổi bật</h3>
            <button
              onClick={() => navigate("/bo-loc")}
              className="text-label-md font-label-md text-secondary border-b border-secondary font-bold tracking-wider hover:text-secondary/80"
            >
              XEM TẤT CẢ
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  if (
                    window.confirm(
                      `Bạn muốn chọn mua nhanh sản phẩm "${p.title}" với giá ${formatVND(
                        p.price
                      )}?`
                    )
                  ) {
                    navigate("/thanh-toan");
                  }
                }}
                className="flex flex-col group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-surface-variant overflow-hidden relative rounded border border-outline-variant/30">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={p.title}
                    src={p.image}
                  />
                  {p.tag && (
                    <span className="absolute top-2 left-2 bg-secondary text-white px-2.5 py-1 text-[10px] font-label-md uppercase tracking-wider font-bold rounded-xs">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="py-3">
                  <h4 className="font-body-md font-bold text-primary mb-1 line-clamp-1 group-hover:text-secondary transition-colors">
                    {p.title}
                  </h4>
                  <p className="font-body-md text-secondary font-bold">{formatVND(p.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Banner */}
        <section className="px-container-padding mb-8">
          <div className="bg-surface-container border border-outline-variant/50 p-5 rounded-lg flex flex-col md:flex-row gap-4 items-center justify-around text-center md:text-left">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-[32px]">shield</span>
              <div>
                <p className="font-body-md font-bold text-primary">Mua Sắm An Toàn 100%</p>
                <p className="font-label-md text-on-surface-variant text-[11px]">Bảo mật mã hóa giao dịch tuyệt đối.</p>
              </div>
            </div>
            <div className="w-[1px] h-10 bg-outline-variant/30 hidden md:block" />
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-[32px]">restart_alt</span>
              <div>
                <p className="font-body-md font-bold text-primary">7 Ngày Đổi Hàng</p>
                <p className="font-label-md text-on-surface-variant text-[11px]">Đổi trả cực kỳ dễ dàng miễn phí.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom NavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-gutter pb-safe bg-surface border-t border-outline-variant">
        <button
          onClick={() => handleBottomNav("/trang-chu")}
          className="flex flex-col items-center justify-center text-secondary relative active:scale-95 w-16"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            home
          </span>
          <span className="font-label-md text-[10px] mt-1 font-bold">Trang chủ</span>
          <div className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full"></div>
        </button>
        <button
          onClick={() => handleBottomNav("/bo-loc")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-[10px] mt-1 font-semibold">Danh mục</span>
        </button>
        {/* Link directly to orders page /don-hang */}
        <button
          onClick={() => handleBottomNav("/don-hang")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-label-md text-[10px] mt-1 font-semibold">Đơn hàng</span>
        </button>
        <button
          onClick={() => handleBottomNav("/thong-bao")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-label-md text-[10px] mt-1 font-semibold">Thông báo</span>
        </button>
        <button
          onClick={() => handleBottomNav("/toi")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-md text-[10px] mt-1 font-semibold">Tôi</span>
        </button>
      </nav>
    </div>
  );
}
