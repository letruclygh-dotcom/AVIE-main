import { Link } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";
import LoginFooter from "../components/LoginFooter";

export default function HubPage() {
  const routes = [
    {
      path: "/",
      title: "Màn hình Chào (Splash)",
      desc: "Splash screen giới thiệu của AoVie với các hiệu ứng chuyển động logo mượt mà.",
      icon: "movie_filter",
      badge: "Cơ Bản",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/trang-chu",
      title: "Trang Chủ E-Commerce",
      desc: "Trang chủ với banner tiệm may Saigon cổ kính, danh mục trượt ngang và lưới sản phẩm.",
      icon: "home",
      badge: "Cập Nhật",
      badgeColor: "bg-secondary-fixed text-on-secondary-container font-semibold",
    },
    {
      path: "/dang-nhap",
      title: "Đăng Nhập",
      desc: "Trang đăng nhập tài khoản khách hàng AoVie với giao diện tối giản.",
      icon: "login",
      badge: "Cơ Bản",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/dang-ky",
      title: "Đăng Ký",
      desc: "Trang đăng ký thành viên mới của AoVie, hỗ trợ điền thông tin và xác nhận.",
      icon: "person_add",
      badge: "Cơ Bản",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/thanh-toan",
      title: "Thông tin Giao hàng & Thanh toán (Checkout)",
      desc: "Màn hình nhập thông tin người nhận, địa chỉ giao hàng, phương thức vận chuyển và thanh toán tóm tắt đơn hàng.",
      icon: "shopping_bag",
      badge: "Mới Thiết Kế",
      badgeColor: "bg-secondary-fixed text-on-secondary-container font-bold",
    },
    {
      path: "/chon-phuong-thuc-thanh-toan",
      title: "Chọn Phương thức thanh toán",
      desc: "Lựa chọn phương thức thanh toán an toàn tiện lợi như COD, Momo, ZaloPay, Chuyển khoản.",
      icon: "payments",
      badge: "Thiết Kế",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/bo-loc",
      title: "Bộ lọc sản phẩm",
      desc: "Bộ lọc nâng cao với sắp xếp, khoảng giá, kích thước, màu sắc và danh mục sản phẩm.",
      icon: "tune",
      badge: "Cơ Bản",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/dat-hang-thanh-cong",
      title: "Đặt hàng thành công",
      desc: "Màn hình thông báo giao dịch thành công sang trọng kèm mã đơn hàng tỉ mỉ.",
      icon: "task_alt",
      badge: "Thiết Kế",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/don-hang",
      title: "Màn hình Đơn hàng - Chờ xác nhận",
      desc: "Danh sách đơn hàng của bạn được chia theo các tab trạng thái: Tất cả, Chờ xác nhận, Đang giao, Đã giao, Đã hủy.",
      icon: "receipt_long",
      badge: "Mới Thiết Kế",
      badgeColor: "bg-secondary-fixed text-on-secondary-container font-bold",
    },
    {
      path: "/chi-tiet-don-hang",
      title: "Chi tiết đơn hàng",
      desc: "Màn hình chi tiết của một đơn hàng, hiển thị trạng thái giao, người nhận, địa chỉ và nút liên hệ hỗ trợ hoặc đánh giá.",
      icon: "assignment",
      badge: "Mới Thiết Kế",
      badgeColor: "bg-secondary-fixed text-on-secondary-container font-bold",
    },
    {
      path: "/danh-gia",
      title: "Đánh giá sản phẩm",
      desc: "Màn hình đánh giá sản phẩm đã mua với chọn số sao, viết bình luận và tải ảnh chụp thực tế.",
      icon: "rate_review",
      badge: "Mới Thiết Kế",
      badgeColor: "bg-secondary-fixed text-on-secondary-container font-bold",
    },
    {
      path: "/theo-doi-don-hang",
      title: "Theo dõi đơn hàng (Vận chuyển)",
      desc: "Lộ trình giao nhận đơn hàng trực quan, bản đồ Saigon và phím liên hệ gọi Shipper.",
      icon: "local_shipping",
      badge: "Thiết Kế",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/dia-chi-giao-hang",
      title: "Danh sách Địa chỉ Giao hàng",
      desc: "Quản lý địa chỉ giao hàng: thêm, xóa, đặt mặc định với form nhập thông tin đầy đủ.",
      icon: "location_on",
      badge: "Thiết Kế",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/vi-tien",
      title: "Lịch sử giao dịch ví",
      desc: "Bản sao thẻ ví Terracotta, bộ lọc nạp/thanh toán và danh sách biến động số dư.",
      icon: "account_balance_wallet",
      badge: "Thiết Kế",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/toi",
      title: "Trang Cá Nhân (Tôi)",
      desc: "Màn hình thông tin tài khoản, ví số dư, thẻ loyalty Gold và tùy chọn chính sách.",
      icon: "person",
      badge: "Cập Nhật",
      badgeColor: "bg-secondary-fixed text-on-secondary-container font-semibold",
    },
    {
      path: "/thong-bao",
      title: "Trung tâm Thông báo",
      desc: "Danh sách thông báo đơn hàng, khuyến mãi, hệ thống với bộ lọc tab và trạng thái đã đọc/chưa đọc.",
      icon: "notifications",
      badge: "Thiết Kế",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/chi-tiet-thong-bao",
      title: "Chi tiết Thông báo",
      desc: "Màn hình chi tiết thông báo với timeline giao hàng, coupon khuyến mãi và nút hành động ngữ cảnh.",
      icon: "notification_important",
      badge: "Thiết Kế",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/ho-tro",
      title: "Hỗ trợ Khách hàng",
      desc: "Giao diện CSKH 3 tab FAQ accordion, chat trực tuyến và kênh liên hệ (hotline, email, Zalo).",
      icon: "headset_mic",
      badge: "Thiết Kế",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/chinh-sach",
      title: "Chính sách đổi trả & bảo hành",
      desc: "Trình bày quy trình đổi hàng 4 bước chi tiết, chính sách bảo hành 6 tháng và FAQs.",
      icon: "shield",
      badge: "Thiết Kế",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/tim-kiem",
      title: "Tìm kiếm không kết quả",
      desc: "Thanh tìm kiếm nhập sẵn từ khóa áo da, thông báo trống và sản phẩm gợi ý.",
      icon: "search_off",
      badge: "Thiết Kế",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/loi",
      title: "Trạng thái lỗi kết nối",
      desc: "Màn hình thông báo mất kết nối mạng tối giản với các nút hành động thử lại trực quan.",
      icon: "wifi_off",
      badge: "Thiết Kế",
      badgeColor: "bg-surface-variant text-on-surface-variant",
    },
    {
      path: "/gioi-thieu",
      title: "Giới thiệu thương hiệu",
      desc: "Câu chuyện thương hiệu AoVie - nét hoài niệm trong dòng chảy hiện đại, cảm hứng từ Nón Lá và Bánh Mì Việt Nam.",
      icon: "auto_stories",
      badge: "Mới Thiết Kế",
      badgeColor: "bg-secondary-fixed text-on-secondary-container font-bold",
    },
  ];

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans relative antialiased">
      <GrainTexture />

      {/* Decorative Top Accent */}
      <div className="h-1.5 w-full bg-secondary" />

      {/* Header section */}
      <header className="py-10 px-container-padding text-center border-b border-outline-variant/30 bg-surface/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-3">
          <img
            alt="AoVie Logo"
            className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlittWyMBAuOHRrzcRhUDtGmEtOI1eRDXiGm3VqJgucgN_rANfboezkfy2odcIimAHCAxsXU5_2r1OZ7h3fH9OUFwQ-7KP0y_sMq3VZfkqxGZ_3T2sC6hNTFiJ0C-Yx7MEemxUeZreDLwC-rGcBYxbB_GL8axzRlJWLimMnreHr7_wUZheWSMxYuOJ5xEjJ6sTsUTpO6ons6NqCBaZSM_xxVrpN7UqEPGxVF7mPXK3ZN75IZiUVd5f7uLkOSK2TMGuBq7_Zx5rN7a2C6Upg"
          />
          <h1 className="font-display-lg text-primary text-2xl md:text-3xl tracking-widest uppercase mt-2">
            AoVie Workspace
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg leading-relaxed">
            Nơi thời trang đương đại giao thoa cùng di sản Việt Nam đậm chất mộc mạc và hoài niệm đô thị.
          </p>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-grow max-w-screen-xl mx-auto w-full px-container-padding py-12">
        <div className="mb-10 text-center">
          <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-wide mb-2 font-bold">
            Danh Mục Màn Hình Hệ Thống
          </h2>
          <p className="font-body-md text-body-md text-outline">
            Chọn một màn hình bên dưới để truy cập trực tiếp và kiểm tra trải nghiệm người dùng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, idx) => (
            <Link
              key={idx}
              to={route.path}
              className="group relative flex flex-col justify-between p-6 bg-surface border border-outline-variant/50 hover:border-secondary rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-secondary/0 via-secondary/0 to-secondary/0 group-hover:from-secondary/50 group-hover:via-secondary group-hover:to-secondary/50 transition-all duration-500" />

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center border border-outline-variant/30 group-hover:bg-secondary-fixed group-hover:border-secondary/20 transition-all duration-300">
                    <span className="material-symbols-outlined text-primary text-2xl group-hover:text-secondary transition-colors">
                      {route.icon}
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full font-label-md text-[10px] uppercase tracking-wider ${route.badgeColor}`}>
                    {route.badge}
                  </span>
                </div>

                <h3 className="font-headline-md text-headline-md text-primary group-hover:text-secondary transition-colors mb-2 font-bold text-base">
                  {route.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface leading-relaxed mb-6">
                  {route.desc}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-secondary font-label-md text-label-md uppercase tracking-wider font-bold group-hover:translate-x-1.5 transition-transform duration-300">
                Truy cập màn hình
                <span className="material-symbols-outlined text-[16px] font-bold">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}
