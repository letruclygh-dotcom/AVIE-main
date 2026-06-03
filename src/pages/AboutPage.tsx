import { FormEvent, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBUoiPsfz5qeFCNODxP1Xu7ghpk6-E81wfvFLplyRAkqOAr0Jy-ytmMGetA8_9YLgmKawmTfTt0yVpDNZIt7enK78Sx9KELQEvjHc9ABqOXx8UhHhPEiUKslvzoKVy8Ey81EXAje8fhkxjT7TNws5oohUNICBQlKzbzpvO-c0BlHYQDNCFwiPFN4foTp1uyiPu_3RgesZ_7kQeoT6p4RmUVqSneo5a_XR4tNXrPzW7xJ8Y4GJnA7Ye1Rj6v8sjEXQGaEaE-aOKfzZBO9H8";

export default function AboutPage() {
  const navigate = useNavigate();
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

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

  const handleNewsletter = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="brand-story-page bg-background text-on-surface font-body-md min-h-screen">
      {/* Top Navigation */}
      <header className="fixed top-0 z-50 w-full bg-surface h-16 flex items-center justify-between px-container-padding border-b border-outline-variant">
        <button
          type="button"
          className="hover:opacity-80 transition-opacity active:scale-95 transition-transform"
          onClick={() => navigate("/tim-kiem")}
        >
          <span className="material-symbols-outlined text-primary">search</span>
        </button>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary font-extrabold">
          <img alt="AoVie" className="h-8 w-auto" src={LOGO_SRC} />
        </h1>
        <button
          type="button"
          className="hover:opacity-80 transition-opacity active:scale-95 transition-transform"
          onClick={() => navigate("/thanh-toan")}
        >
          <span className="material-symbols-outlined text-primary">shopping_bag</span>
        </button>
      </header>

      <main className="pt-24 pb-32 px-container-padding max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4 block">
            Câu chuyện thương hiệu
          </span>
          <h2 className="font-display-lg text-display-lg text-primary leading-tight [text-wrap:balance]">
            Nét hoài niệm
            <span style={{ letterSpacing: "-0.02em" }}>&nbsp;trong</span>
            <div> dòng chảy hiện đại.</div>
          </h2>
        </section>

        {/* The Inspiration Cards (Asymmetric Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h3 className="text-primary mb-4 italic [text-wrap:balance] font-headline-md text-headline-md">
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
              data-alt="A minimalist and high-fashion studio shot of a traditional Vietnamese Nón Lá conical hat resting on a textured clay pedestal. The lighting is dramatic, coming from one side to create deep shadows and highlight the intricate weave of the palm leaves. The background is a warm, sun-baked earth tone, consistent with a retro-nostalgic and quiet luxury aesthetic. The overall mood is serene, grounded, and artistic, emphasizing craftsmanship and geometry."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsIKOHjwRLRAQP9F2y8F_emexNRMPfQYCgvEoXTjR8b1AjKDfZwFA0SRw_FSr00WXkvJLRWFeXQX4sKqOc9R6UAHpFAKxdyViY-mtVzuR0yUgE9CABY7VGSKNwVkQye-Gz5Yx8BLDRd6HfoKdPRCXm_ib7ucw9odPBtJAx9bY9JjwdCkxoPRE7WNRJWc13SbVP--CvAClpVvHv7YtoNmliIMp2KC_7VKJFF1auqzlbL1Y7MLQ3Q2o2BJb3YIqedlaEDoYkHtTe4IU1XxI"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="px-8">
            <img
              ref={setImgRef(1)}
              alt="Vietnamese Banh Mi"
              className="w-full h-auto asymmetric-border border border-outline-variant p-2"
              data-alt="A close-up, artistic food photograph of a crusty Vietnamese Banh Mi sandwich on a piece of vintage brown parchment paper. The setting is a sun-drenched wooden table in an old-style cafe. The focus is sharp on the golden-brown crust and fresh herbs, while the background remains softly blurred. The color palette is rich in earthy oranges and warm browns, evoking a sense of home and nostalgic Saigon street culture through a high-end minimalist lens."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg17BdkEa7skKwqwhWDynZmNPKAfD39nL_Q_hf16V-AVU-pdseVX9aFXl9CYdiFHCSRKlYN1qkugpI8lQT2IT9HE_EEAHWcKaQ3F7DNXbdZddg81WdlemCPRb64YgBFE_t_PPyxLV3TcXfIb8wfVHakfaVt745zREjc49w37aifAvuoqI1iEQmovKBNI1bppMTinPATiDcH0nHiCVzD3HJZ2VmIPxS8Y-XwxlxLccOL_ZHrJmRTw7C74bpn2gEJLplAG0VUvgvlPRd"
            />
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md text-primary mb-4 italic [text-wrap:balance]">
              Bánh Mì: Vị đậm đà của đời thường
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">
              Sự giao thoa văn hóa trong ổ bánh mì - giòn rụm bên ngoài, mềm mại bên trong - chính là
              tinh thần mà AoVie hướng tới. Chúng tôi kết hợp chất liệu thô mộc truyền thống với phom
              dáng street-wear hiện đại, tạo nên một bản phối đầy cảm hứng cho người mặc.
            </p>
            <div className="h-px w-20 bg-secondary"></div>
          </div>
        </div>

        {/* Quote Section */}
        <section className="py-16 px-8 bg-surface-container-low text-center rounded-xl border border-outline-variant border-dashed mb-20 mt-16">
          <blockquote className="font-headline-md text-headline-md text-primary italic leading-relaxed max-w-2xl mx-auto">
            &quot;AoVie không chỉ bán quần áo, chúng tôi đóng gói những mảnh ký ức và lòng tự hào
            Việt vào từng thớ vải.&quot;
          </blockquote>
          <cite className="font-label-md text-label-md text-on-surface-variant uppercase mt-6 block tracking-widest not-italic">
            — Đội ngũ sáng lập AoVie
          </cite>
        </section>

        {/* Minimalist Blog Layout Content */}
        <article className="prose prose-stone mx-auto">
          <h4 className="font-headline-md text-headline-md text-primary mb-6 [text-wrap:balance]">
            Tinh thần Việt trong từng nhịp thở
          </h4>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
            Tại AoVie, chúng tôi tin rằng thời trang là một ngôn ngữ không lời nhưng đầy sức nặng.
            Mỗi bộ sưu tập được ra mắt đều là kết quả của những chuyến đi dọc chiều dài đất nước,
            từ những xưởng dệt lụa thủ công ở lạng sơn đến những góc phố nhỏ nhộn nhịp tại Sài Gòn.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 leading-relaxed">
            Chúng tôi sử dụng bảng màu sun-baked earth - những tông màu của đất, của nắng, và của
            thời gian. Đó là màu nâu đất của những mảng tường cũ, màu cam gạch nung, và màu kem của
            những tờ báo cũ. Tất cả tạo nên một hệ sinh thái thẩm mỹ &quot;tĩnh&quot; giữa thế giới
            thời trang nhanh đầy biến động.
          </p>
        </article>

        {/* Newsletter / Footer Sign-off */}
        <div className="mt-section-gap border-t border-outline-variant pt-12 text-center">
          <h5 className="font-headline-md text-headline-md text-primary mb-2 [text-wrap:balance]">
            Đồng hành cùng chúng tôi
          </h5>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Nhận những bản tin lookbook định kỳ và câu chuyện cảm hứng từ AoVie.
          </p>
          <form
            className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
            onSubmit={handleNewsletter}
          >
            <input
              className="flex-1 bg-surface border-0 border-b border-outline focus:ring-0 focus:border-secondary font-body-md"
              placeholder="Email của bạn"
              type="email"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary px-8 py-3 rounded-sm font-label-md uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Tham gia
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
