import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import LoginFooter from "../components/LoginFooter";

type LoginValues = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [values, setValues] = useState<LoginValues>({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!values.username.trim() || !values.password) {
      setMessage({ kind: "error", text: "Vui lòng nhập đầy đủ thông tin." });
      return;
    }

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsProcessing(false);
    setMessage({ kind: "success", text: "Đăng nhập thành công." });
  }

  return (
    <div className="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
      <header className="w-full flex justify-center items-center py-6 px-container-padding">
        <img
          alt="AoVie Logo"
          className="h-24 w-auto object-contain"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlittWyMBAuOHRrzcRhUDtGmEtOI1eRDXiGm3VqJGucgN_rANfboezkfy2odcIimAHCAxsXU5_2r1OZ7h3fH9OFwQ-7KP0y_sMq3VZfkqxGZ_3T2sC6hNTFiJ0C-Yx7MEemxUeZreDLwC-rGcBYxbB_GL8axzRlJWLimMnreHr7_wUZheWSMxYuOJ5xEjJ6sTsUTpO6ons6NqCBaZSM_xxVrpN7UqEPGxVF7mPXK3Z75IZiUVd5f7uLkOSK2TMGuBq7_Zx5rN7a2C6Upg"
        />
      </header>

      <main className="flex-grow flex items-center justify-center px-container-padding pb-20">
        <div className="w-full max-w-[400px] flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <h2 className="font-headline-md text-headline-md text-primary mb-2">Chào mừng trở lại</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Khám phá bản sắc của bạn.</p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
              <div className="group relative border-b border-outline-variant transition-all duration-300 focus-within:border-b-secondary">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-tighter opacity-60 group-focus-within:opacity-100 transition-opacity">
                  Email hoặc Số điện thoại
                </label>
                <div className="flex items-center gap-3 py-2">
                  <span className="material-symbols-outlined text-outline text-[20px]">person</span>
                  <input
                    className="bg-transparent border-none w-full p-0 font-body-lg text-body-lg focus:ring-0 text-on-surface placeholder:text-outline/40"
                    placeholder="username@email.com"
                    type="text"
                    value={values.username}
                    onChange={(e) => setValues((s) => ({ ...s, username: e.target.value }))}
                    disabled={isProcessing}
                  />
                </div>
              </div>

              <div className="group relative border-b border-outline-variant transition-all duration-300 focus-within:border-b-secondary">
                <div className="flex justify-between items-end">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-tighter opacity-60 group-focus-within:opacity-100 transition-opacity">
                    Mật khẩu
                  </label>
                  <a className="font-label-md text-label-md text-secondary hover:underline underline-offset-4" href="#">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <span className="material-symbols-outlined text-outline text-[20px]">lock</span>
                  <input
                    className="bg-transparent border-none w-full p-0 font-body-lg text-body-lg focus:ring-0 text-on-surface placeholder:text-outline/40"
                    placeholder="••••••••"
                    type={showPass ? "text" : "password"}
                    value={values.password}
                    onChange={(e) => setValues((s) => ({ ...s, password: e.target.value }))}
                    disabled={isProcessing}
                  />
                  <button
                    className="text-outline hover:text-primary transition-colors"
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    disabled={isProcessing}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPass ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  className={[
                    "w-full bg-secondary text-on-secondary py-4 px-6 font-label-md text-label-md uppercase tracking-[0.2em] font-bold rounded-lg transition-all duration-200 active:scale-95 shadow-lg shadow-secondary/20 hover:bg-on-secondary-fixed-variant",
                    isProcessing ? "opacity-80" : ""
                  ].join(" ")}
                  type="submit"
                  disabled={isProcessing}
                >
                  {isProcessing ? "ĐANG XỬ LÝ..." : "Đăng nhập"}
                </button>
              </div>

              {message ? (
                <div
                  className={[
                    "font-body-md text-body-md",
                    message.kind === "success" ? "text-secondary" : "text-error"
                  ].join(" ")}
                  role="status"
                >
                  {message.text}
                </div>
              ) : null}
            </form>

            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] flex-grow bg-outline-variant" />
              <span className="font-label-md text-label-md text-outline">HOẶC</span>
              <div className="h-[1px] flex-grow bg-outline-variant" />
            </div>

            <div className="text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Chưa có tài khoản?
                <Link
                  className="font-label-md text-label-md text-primary font-bold uppercase underline underline-offset-4 ml-1 hover:text-secondary transition-colors"
                  to="/dang-ky"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}

