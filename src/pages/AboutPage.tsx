import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

export default function AboutPage() {
  const navigate = useNavigate();
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const handleBottomNav = (path: string) => {
    navigate(path);
  };

  // Smooth fade-in interaction for images via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    imgRefs.current.forEach((img) => {
      if (!img) return;
      img.style.opacity = "0";
      img.style.transition = "opacity 1s ease-in-out, transform 1s ease-out";
      img.style.transform = "translateY(10px)";

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              img.style.opacity = "1";
              img.style.transform = "translateY(0)";
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(img);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const setImgRef = (index: number) => (el: HTMLImageElement | null) => {
    imgRefs.current[index] = el;
  };

  return (
    <div className="bg-background text-on-surface min-h-screen font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant shrink-0">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            onClick={() => navigate("/tim-kiem")}
            className="hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
            type="button"
          >
            <span className="material-symbols-outlined text-primary">search</span>
          </button>

          {/* Centered Logo */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUoiPsfz5qeFCNODxP1Xu7ghpk6-E81wfvFLplyRAkqOAr0Jy-ytmMGetA8_9YLgmKawmTfTt0yVpDNZIt7enK78Sx9KELQEvjHc9ABqOXx8UhHhPEiUKslvzoKVy8Ey81EXAje8fhkxjT7TNws5oohUNICBQlKzbzpvO-c0BlHYQDNCFwiPFN4foTp1uyiPu_3RgesZ_7kQeoT6p4RmUVqSneo5a_XR4tNXrPzW7xJ8Y4GJnA7Ye1Rj6v8sjEXQGaEaE-aOKfzZBO9H8"
            alt="AoVie"
            className="h-8 w-auto"
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

      {/* Main Content */}
      <main className="pt-24 pb-32 px-container-padding max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4 block">
            Câu chuyện thương hiệu
          </span>
          <h2 className="font-display-lg text-display-lg text-primary leading-tight" style={{ textWrap: "balance" }}>
            Nét hoài niệm&nbsp;trong
            <div>dòng chảy hiện đại.</div>
          </h2>
        </section>

        {/* The Inspiration Cards (Asymmetric Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h3
              className="text-primary mb-4 italic font-headline-md text-headline-md"
              style={{ textWrap: "balance" }}
            >
              Nón Lá: Vòng tròn của sự che chở
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">
              Không chỉ là vật dụng che nắng mưa, Nón Lá với chúng tôi là biểu tượng của sự tinh tế,
              bền bỉ và nét đẹp khiêm nhường. Những đường khâu tỉ mỉ, phom dáng hình chóp hoàn hảo
              truyền cảm hứng cho những đường cắt cấu trúc trong các thiết kế đương đại của AoVie.
            </p>
            <div className="h-px w-20 bg-secondary"></div>
          </div>
          <div className="order-1 md:order-2 px-8">
            <img
              ref={setImgRef(0)}
              alt="Traditional Conical Hat"
              className="w-full h-auto asymmetric-border border border-outline-variant p-2"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaPGNschqBurcekEoRbHl9JF1iaqcJIaeAVzB6mrNMZ39KreIMFbuK87YFUQntIFohbGt7VMlVOyJuMy_cotB8TU53BwIfnLomvZkTDuxB705p7qag9iviqfPPq6EXUkOXCrKdzn-ehckC2c-qJsm5YrAtyQ9bqeWBZLG_387fBHjJs8O0Q13ofl1mkFfGG6dkifvH4uPUsvt2N7xT00fscyhqPIcKLxU1hF7Y_AJ25PsbTkGb6y8KBNcppebT4vd4KDphinKdMGw8j8Q"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="px-8">
            <img
              ref={setImgRef(1)}
              alt="Vietnamese Banh Mi"
              className="w-full h-auto asymmetric-border border border-outline-variant p-2"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAv6Xs84mx_KK9i1iKLguspaUfSnfPzKPFNII2OSOFeQeDEJLDkFrkMKufpV6VkTTh0c835DGflC6H1SuzvA-SXyuLO475xJM1rm6boX-IpA-6qoTRNOPd00vsf5kNm9gie8rbqeTcafd2Wzh0zX1x-UGB7rU3omtn_dwPPRzieNY1Jm4y2MDUhKikOw7qOqb7325JQgxX8UEMeWCPfynvxz6INR7-SoECEwYacSZg5zPZFsxr66QOYIavMcUw4yMRid0UQWOuVF3Bwec"
            />
          </div>
          <div>
            <h3
              className="font-headline-md text-headline-md text-primary mb-4 italic"
              style={{ textWrap: "balance" }}
            >
              Bánh Mì: Vị đậm đà của đời thường
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">
              Sự giao thoa văn hóa trong ổ bánh mì - giòn rụm bên ngoài, mềm mại bên trong - chính là
              tinh thần mà AoVie hướng tới. Chúng tôi kết hợp chất liệu thô mộc truyền thống với phom
              dáng street-hiện đại, tạo nên một bản phối đầy cảm hứng cho người mặc.
            </p>
            <div className="h-px w-20 bg-secondary"></div>
          </div>
        </div>

        {/* Quote Section */}
        <section className="py-16 px-8 bg-surface-container-low text-center rounded-xl border border-outline-variant border-dashed mb-20 mt-16">
          <blockquote className="font-headline-md text-headline-md text-primary italic leading-relaxed max-w-2xl mx-auto">
            "AoVie không chỉ bán quần áo, chúng tôi đóng gói những mảnh ký ức và lòng tự hào Việt vào
            từng thớ vải."
          </blockquote>
          <cite className="font-label-md text-label-md text-on-surface-variant uppercase mt-6 block tracking-widest not-italic">
            Đội ngũ sáng lập AoVie
          </cite>
        </section>

        {/* Minimalist Blog Layout Content */}
        <article className="mx-auto">
          <h4
            className="font-headline-md text-headline-md text-primary mb-6"
            style={{ textWrap: "balance" }}
          >
            Tinh thần Việt trong từng nhịp thở
          </h4>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
            Tại AoVie, chúng tôi tin rằng thời trang là một ngôn ngữ không lời nhưng đầy sức nặng. Mỗi
            bộ sưu tập được ra mắt đều là kết quả của những chuyến đi dọc chiều dài đất nước, từ những
            xưởng dệt lụa thủ công ở lạng sơn đến những góc phố nhỏ nhộn nhịp tại Sài Gòn.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 leading-relaxed">
            Chúng tôi sử dụng bảng màu sun-baked earth - những tông màu của đất, của nắng, và của thời
            gian. Đó là màu nâu đất của những mảng tường cũ, màu cam gạch nung, và màu kem của những tờ
            báo cũ. Tất cả tạo nên một hệ sinh thái thẩm mỹ "tĩnh" giữa thế giới thời trang nhanh đầy
            biến động.
          </p>
        </article>

        {/* Newsletter / Footer Sign-off */}
        <div className="mt-section-gap border-t border-outline-variant pt-12 text-center">
          <h5
            className="font-headline-md text-headline-md text-primary mb-2"
            style={{ textWrap: "balance" }}
          >
            Đồng hành cùng chúng tôi
          </h5>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Nhận những bản tin lookbook định kỳ và câu chuyện cảm hứng từ AoVie.
          </p>
          <form
            className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Cảm ơn bạn đã đăng ký nhận bản tin AoVie!");
            }}
          >
            <input
              className="flex-1 bg-surface border-0 border-b border-outline focus:ring-0 focus:border-secondary font-body-md text-body-md px-2 py-3"
              placeholder="Email của bạn"
              type="email"
            />
            <button
              className="bg-primary text-on-primary px-8 py-3 rounded-sm font-label-md text-label-md uppercase tracking-wider hover:opacity-90 transition-opacity"
              type="submit"
            >
              Tham gia
            </button>
          </form>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-gutter pb-safe bg-surface border-t border-outline-variant">
        <button
          onClick={() => handleBottomNav("/trang-chu")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-md text-[10px] mt-1 font-semibold">Trang chủ</span>
        </button>
        <button
          onClick={() => handleBottomNav("/bo-loc")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-[10px] mt-1 font-semibold">Danh mục</span>
        </button>
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
          className="flex flex-col items-center justify-center text-secondary relative active:scale-95 w-16"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            person
          </span>
          <span className="font-label-md text-[10px] mt-1 font-bold">Tôi</span>
          <div className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full"></div>
        </button>
      </nav>
    </div>
  );
}
