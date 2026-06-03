import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

export default function RatingPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitText, setSubmitText] = useState("Gửi đánh giá");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const ratingOptions = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá sản phẩm.");
      return;
    }

    setIsSubmitting(true);
    setSubmitText("Đang gửi...");

    setTimeout(() => {
      setSubmitText("Đã hoàn tất");
      setSubmitSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setSubmitText("Gửi đánh giá");
        setSubmitSuccess(false);
        alert("Cảm ơn bạn đã gửi đánh giá sản phẩm!");
        navigate(-1);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="bg-background text-on-surface flex flex-col min-h-screen font-sans relative antialiased select-none pb-24">
      <GrainTexture />

      {/* Top App Bar (Header) */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="active:scale-95 transition-transform w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold uppercase tracking-tight">
            Đánh giá sản phẩm
          </h1>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow pt-20 pb-24 px-container-padding max-w-screen-sm mx-auto w-full relative z-10">
        {/* Product Section (Heritage Style) */}
        <div className="flex gap-4 mb-section-gap">
          <div className="w-24 h-32 flex-shrink-0 bg-surface-variant overflow-hidden rounded-lg border border-outline-variant">
            <img
              alt="Heritage Tee Kem"
              className="w-full h-full object-cover"
              src="https://i.ibb.co/PG3p6wTs/6.png"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-label-md text-label-md text-secondary uppercase mb-1 font-bold">
              Mới nhất
            </span>
            <h2 className="font-headline-md text-headline-md text-primary leading-tight font-bold">
              Áo thun Unisex - 100% COTTON - “Bánh Mì”
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Phân loại: Kem / Size L
            </p>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-surface p-6 rounded-xl border border-outline-variant mb-gutter">
          <div className="text-center mb-6">
            <p className="font-body-lg text-body-lg text-primary font-semibold mb-4 uppercase tracking-widest">
              Chất lượng sản phẩm
            </p>
            <div className="flex justify-center gap-2" id="star-container">
              {[0, 1, 2, 3, 4].map((idx) => {
                const isActive = rating > idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleStarClick(idx)}
                    className="star-btn active:scale-90 transition-transform w-10 h-10 flex items-center justify-center"
                  >
                    <span
                      className={`material-symbols-outlined text-4xl transition-colors ${
                        isActive ? "text-secondary font-fill" : "text-outline-variant hover:text-secondary"
                      }`}
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      star
                    </span>
                  </button>
                );
              })}
            </div>
            <p
              className={`font-label-md text-label-md text-secondary mt-3 transition-opacity font-bold ${
                rating > 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              {rating > 0 ? ratingOptions[rating - 1] : ""}
            </p>
          </div>

          {/* Review Content */}
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full h-32 p-4 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-0 focus:border-secondary transition-colors font-body-md text-body-md placeholder:text-outline resize-none custom-scrollbar font-sans"
                placeholder="Hãy chia sẻ trải nghiệm của bạn về sản phẩm..."
              />
            </div>

            {/* Image Upload Section */}
            <div className="flex flex-wrap gap-3" id="upload-container">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg cursor-pointer hover:bg-surface-variant transition-colors group bg-transparent"
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                  add_a_photo
                </span>
                <span className="font-label-md text-[10px] text-on-surface-variant mt-1 uppercase tracking-tighter font-bold">
                  Tải ảnh
                </span>
              </button>

              {uploadedImages.map((src, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border border-outline-variant animate-in fade-in zoom-in duration-300 shrink-0"
                >
                  <img src={src} className="w-full h-full object-cover" alt="Review upload" />
                  <button
                    onClick={() => removeUploadedImage(index)}
                    className="absolute top-1 right-1 bg-primary/80 text-white rounded-full p-0.5 hover:bg-primary transition-colors w-5 h-5 flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3 bg-surface-container-high rounded-lg mb-10 border border-outline-variant/20">
          <span
            className="material-symbols-outlined text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <p className="font-label-md text-label-md text-on-surface-variant leading-relaxed">
            Đánh giá của bạn sẽ giúp AoVie có cái nhìn chính xác hơn về sản phẩm này.
          </p>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 w-full bg-surface border-t border-outline-variant p-container-padding z-50">
        <div className="max-w-screen-sm mx-auto">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full text-on-primary py-4 rounded-lg font-label-md text-label-md uppercase font-bold tracking-widest transition-all shadow-lg shadow-primary/10 ${
              submitSuccess
                ? "bg-secondary"
                : "bg-primary hover:bg-on-primary-fixed-variant"
            } ${isSubmitting ? "opacity-70 cursor-not-allowed" : "active:scale-[0.98]"}`}
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
}
