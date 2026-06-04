import { useState } from "react";
import { Link } from "react-router-dom";

const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuABoCj7xaqBkBQ9xs2chjdJ2tWOhMWjYth2JTrTqm1jfRwQhCVs4Ng54nBIpLQ-qB-9PJiKhsoHNG40s6j__z8dMJsmNEPxECn935qAWd1zoY0WgkK9hR8doaiUv26kKJiBcGEuuGxgnhJUMmCi_bHySyDPAt-Xn8TUlVf9odJML6nZ5rJWnJwA6Fv5_p8KSLHd5oDfZDmI2G6x7R5fUYNdFTBjFVNDyYxeXd9owsDB5-0fI6CrDCVn8ZBd_-HtFHmWIdQ7CIoTg8_jiNk";

type FilterId = "all" | "five-star" | "with-photo";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "five-star", label: "5 Sao (980)" },
  { id: "with-photo", label: "Có ảnh (450)" },
];

interface Review {
  id: string;
  author: string;
  date: string;
  category: string;
  content: string;
  helpful: number;
  stars: number;
  image?: string;
  imageAlt?: string;
  hasPhoto: boolean;
}

const REVIEWS: Review[] = [
  {
    id: "1",
    author: "ng***1",
    date: "12/10/2025",
    category: 'Phân loại: Áo Thun Unisex - 100% COTTON - "Bánh Mì" / Size L',
    content:
      "Chất vải rất dày dặn, đúng chuẩn cotton 100%. Form áo rộng rãi thoải mái cực kỳ, mặc lên rất đẹp đúng vibe mình thích. Giao hàng nhanh và đóng gói rất cẩn thận.",
    helpful: 24,
    stars: 5,
    hasPhoto: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVMMWhd8aQJzGgvxJ7mtEbPGXAsYIuQKJtalNnXSEkkzGmd-HL8N3HPBmqV_Ov4OqfQacOXwz3dDiJfItgOXoxCUzYwcLE3qwnadvPvxiB6U0bsO8t0akWhes0lbMuEQeM13Qhf0mmuJ2qXskbbmrtn76DgNaLEsYGE9jYqoPZixVlR5TgOV93YbTcKkmNabUoS0veJpmCCepi4YuergA1HwxNuLx9qcTXdNXOzfhQ3KUqxveBgVnRk5ajFtBHvNVAz_Zl0BCduTO4tQk",
    imageAlt:
      "A close-up photograph of a premium white cotton t-shirt with a vintage texture, hanging on a rustic wooden wall.",
  },
  {
    id: "2",
    author: "mi***_h",
    date: "08/10/2025",
    category: "Phân loại: Túi Tote Canvas In Hình Tháp Rùa / 1 Size",
    content:
      "Túi to hơn mình nghĩ, đựng được cả laptop 14 inch. Quai đeo chắc chắn, đường may đều và đẹp. Màu đen hơi bám bụi một chút nhưng phủi là sạch. Rất hài lòng với chất lượng so với giá tiền.",
    helpful: 12,
    stars: 5,
    hasPhoto: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC36tV6gL8X2mcxEpEA3qy3HVl5IwyG-bKu6xVX_NWi63TUdaEc9Irp7ZweT5M0pFR3Qjjev77AEVy-2nLq62I3STvw5CeGgTcjXx2RfPNlT6DdaVLyEQmWW2vpT9NP0ZwcSDiPPSTI5z0OfTMaIGl3Pj7XmvT7cuUaiFNQYFK0pjRAU-gbnkmAq2G_YQ37T5MshgE10CS7XSDybLs-glnd8_FwYwgbTPI0oxSbtqYqcWRd8R6A54haRS6_vmL7z3J0jyBZ2xBbKSY3R6k",
    imageAlt:
      "A detailed shot of a black canvas tote bag with clean, minimalist lines placed against a textured concrete wall.",
  },
  {
    id: "3",
    author: "tr***an",
    date: "05/10/2025",
    category: 'Phân loại: Áo Thun Unisex  - 100% COTTON - "Nón Lá" / Size M',
    content: "Áo xinh lắm luôn, chất liệu mặc rất thoáng mát. Sẽ ủng hộ shop lâu dài nha!!",
    helpful: 5,
    stars: 5,
    hasPhoto: false,
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 text-secondary">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-[16px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  const filteredReviews = REVIEWS.filter((review) => {
    if (activeFilter === "five-star") return review.stars === 5;
    if (activeFilter === "with-photo") return review.hasPhoto;
    return true;
  });

  const handleHelpful = (id: string, base: number) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? base) + 1,
    }));
  };

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen pb-24">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-surface-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-7xl mx-auto">
          <Link
            className="hover:opacity-80 transition-opacity active:scale-95 transition-transform"
            to="/tim-kiem"
          >
            <span className="material-symbols-outlined text-primary">search</span>
          </Link>
          <Link to="/trang-chu">
            <img src={LOGO_SRC} alt="AoVie Logo" className="h-8 w-auto object-contain mx-auto" />
          </Link>
          <Link
            className="hover:opacity-80 transition-opacity active:scale-95 transition-transform"
            to="/thanh-toan"
          >
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
          </Link>
        </div>
      </header>

      <main className="pt-20 pb-24 max-w-7xl mx-auto px-container-padding">
        {/* Summary Header Section */}
        <section className="mb-section-gap py-6 border-b border-outline-variant">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-primary">5</span>
              <span className="font-headline-md text-headline-md text-on-surface-variant">/ 5</span>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-1 text-secondary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Dựa trên 1,248 lượt đánh giá thực tế
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 border font-label-md text-label-md uppercase rounded-lg transition-colors ${
                      isActive
                        ? "border-primary text-primary hover:bg-primary hover:text-white"
                        : "border-outline-variant text-on-surface-variant"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Reviews List */}
        <div className="space-y-10">
          {filteredReviews.map((review, index) => (
            <div key={review.id}>
              {index > 0 && <div className="h-px bg-outline-variant/30 w-full mb-10" />}
              <article className="flex flex-col gap-4 group">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <h3 className="font-body-md text-body-md font-bold text-primary">{review.author}</h3>
                    <div className="mt-1">
                      <StarRow count={review.stars} />
                    </div>
                  </div>
                  <span className="font-label-md text-label-md text-outline">{review.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-surface-container font-label-md text-label-md text-on-surface-variant rounded">
                    {review.category}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  {review.content}
                </p>
                {review.image && (
                  <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                    <div className="w-32 h-40 flex-shrink-0 bg-surface-variant rounded overflow-hidden">
                      <img
                        className="w-full h-full object-cover grayscale-[20%] hover:scale-110 transition-transform duration-500"
                        alt={review.imageAlt ?? "Ảnh đánh giá"}
                        src={review.image}
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => handleHelpful(review.id, review.helpful)}
                    className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                    Hữu ích ({helpfulCounts[review.id] ?? review.helpful})
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button
            type="button"
            className="w-full md:w-auto px-12 py-3 border border-primary text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary hover:text-white transition-all active:scale-95"
          >
            Xem thêm đánh giá
          </button>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-gutter bg-surface border-t border-outline-variant z-50">
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors py-1 flex-1"
          to="/trang-chu"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-md text-label-md">Trang chủ</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors py-1 flex-1"
          to="/danh-muc"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-label-md">Danh mục</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-secondary py-1 flex-1 transition-colors hover:bg-surface-container-low relative"
          to="/don-hang"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            receipt_long
          </span>
          <span className="font-label-md text-label-md">Đơn hàng</span>
          <div className="absolute bottom-0 w-1 h-1 bg-secondary rounded-full" />
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors py-1 flex-1"
          to="/thong-bao"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-label-md text-label-md">Thông báo</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors py-1 flex-1"
          to="/toi"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-md text-label-md">Tôi</span>
        </Link>
      </nav>
    </div>
  );
}
