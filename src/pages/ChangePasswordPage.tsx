import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type SubmitState = "idle" | "processing" | "success";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (submitState !== "idle") return;

    setSubmitState("processing");
    setTimeout(() => {
      setSubmitState("success");
      setTimeout(() => {
        setSubmitState("idle");
      }, 2000);
    }, 1500);
  };

  const toggleVisibility = (visible: boolean, setVisible: (v: boolean) => void) => {
    setVisible(!visible);
  };

  return (
    <div className="change-password-page bg-background text-on-background min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant transition-opacity">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            type="button"
            aria-label="Go back"
            className="active:scale-95 transition-transform hover:opacity-80 p-2"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight text-primary">
            Đổi mật khẩu
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-32 px-container-padding max-w-md mx-auto w-full">
        {/* Visual Anchor (Photography) */}
        <div className="mb-section-gap">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg border border-outline-variant">
            <img
              alt="Nostalgic Door Detail"
              className="w-full h-full object-cover grayscale-[0.2] brightness-90"
              data-alt="A cinematic, atmospheric shot of a traditional wooden door in old Saigon, with warm morning sunlight filtering through ornate iron bars. The lighting is soft and golden, creating a sense of security and history. The color palette features deep browns, warm tans, and earthy oranges, perfectly aligned with a minimalist retro-nostalgic aesthetic. The mood is quiet, private, and grounded in artisanal heritage."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfDfN1e-Mjoc_PP3B707x0no3-CMCHYdHoKHvU_KS1psF1JANCrTA0kCrqX7u69pfg-C2RJQ53Rq_xWxdiqaGJ185XRwYdQFXe8vod-RxykC43kkybt-T5dliesbKkBGKlcvUq8mvm2WbQxObRK7LKhZPyc8-G7zy7_Yv6kZEVjQhGcV6FTiIH7XSRwD3yzGc3PlD5xiy6nl6SVmFUJIq2PVC2lo5JzJiWa5xy8p5_Kwa2ycvZ28b44FoG2Dv7BI2MIt8-J-6vlAg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>
        </div>

        <section>
          <p className="font-body-md text-on-surface-variant mb-8 text-center px-4">
            Vui lòng nhập mật khẩu hiện tại và mật khẩu mới để bảo vệ tài khoản của bạn.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Current Password */}
            <div className="relative border-b border-outline focus-within:border-secondary transition-colors py-2">
              <label className="block font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                Mật khẩu hiện tại
              </label>
              <div className="flex items-center">
                <input
                  className="w-full bg-transparent border-none focus:ring-0 p-0 font-body-lg text-body-lg text-primary placeholder:text-outline-variant/50"
                  placeholder="••••••••"
                  type={showCurrent ? "text" : "password"}
                />
                <button
                  type="button"
                  className="material-symbols-outlined text-on-surface-variant text-body-lg"
                  onClick={() => toggleVisibility(showCurrent, setShowCurrent)}
                >
                  {showCurrent ? "visibility" : "visibility_off"}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="relative border-b border-outline focus-within:border-secondary transition-colors py-2">
              <label className="block font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                Mật khẩu mới
              </label>
              <div className="flex items-center">
                <input
                  className="w-full bg-transparent border-none focus:ring-0 p-0 font-body-lg text-body-lg text-primary placeholder:text-outline-variant/50"
                  placeholder="••••••••"
                  type={showNew ? "text" : "password"}
                />
                <button
                  type="button"
                  className="material-symbols-outlined text-on-surface-variant text-body-lg"
                  onClick={() => toggleVisibility(showNew, setShowNew)}
                >
                  {showNew ? "visibility" : "visibility_off"}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="relative border-b border-outline focus-within:border-secondary transition-colors py-2">
              <label className="block font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                Xác nhận mật khẩu mới
              </label>
              <div className="flex items-center">
                <input
                  className="w-full bg-transparent border-none focus:ring-0 p-0 font-body-lg text-body-lg text-primary placeholder:text-outline-variant/50"
                  placeholder="••••••••"
                  type={showConfirm ? "text" : "password"}
                />
                <button
                  type="button"
                  className="material-symbols-outlined text-on-surface-variant text-body-lg"
                  onClick={() => toggleVisibility(showConfirm, setShowConfirm)}
                >
                  {showConfirm ? "visibility" : "visibility_off"}
                </button>
              </div>
            </div>

            {/* Guidance/Security Note */}
            <div className="bg-surface-container-low p-4 rounded-lg flex gap-3">
              <span className="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
              <p className="font-label-md text-label-md text-on-surface-variant leading-relaxed">
                Mật khẩu mạnh bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt để đảm bảo an toàn tuyệt
                đối.
              </p>
            </div>

            {/* Submit Button */}
            <button
              className={`w-full py-4 px-6 rounded-lg font-label-md text-label-md uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all shadow-sm flex justify-center items-center gap-2 mt-8 ${
                submitState === "success" ? "bg-green-700 text-on-primary" : "bg-primary text-on-primary"
              }`}
              type="submit"
              disabled={submitState !== "idle"}
            >
              {submitState === "processing" && (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  ĐANG XỬ LÝ...
                </>
              )}
              {submitState === "success" && (
                <>
                  ĐÃ CẬP NHẬT <span className="material-symbols-outlined">check_circle</span>
                </>
              )}
              {submitState === "idle" && (
                <>
                  Cập nhật&nbsp;
                </>
              )}
            </button>
          </form>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface border-t border-outline-variant">
        <div className="flex justify-around items-center h-16 px-2 pb-safe w-full max-w-screen-xl mx-auto">
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-transform hover:text-secondary"
            to="/trang-chu"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="font-label-md text-label-md">Trang chủ</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-transform hover:text-secondary"
            to="/danh-muc"
          >
            <span className="material-symbols-outlined">category</span>
            <span className="font-label-md text-label-md">Danh mục</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-transform hover:text-secondary"
            to="/don-hang"
          >
            <span className="material-symbols-outlined">receipt_long</span>
            <span className="font-label-md text-label-md">Đơn hàng</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-transform hover:text-secondary"
            to="/thong-bao"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="font-label-md text-label-md">Thông báo</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-secondary relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-secondary after:rounded-full active:scale-90 transition-transform"
            to="/toi"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              person
            </span>
            <span className="font-label-md text-label-md">Tôi</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
