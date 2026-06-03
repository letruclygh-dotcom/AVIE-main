import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";
import RegisterHeader from "../components/RegisterHeader";

type RegisterValues = {
  full_name: string;
  phone: string;
  email: string;
  password: string;
  confirm_password: string;
};

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

function normalizePhone(input: string) {
  return input.replace(/[^\d]/g, "");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegisterPage() {
  const [values, setValues] = useState<RegisterValues>({
    full_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [toast, setToast] = useState<{ kind: "success" | "error"; message: string } | null>(null);

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      values.full_name.trim().length > 0 &&
      values.phone.trim().length > 0 &&
      values.email.trim().length > 0 &&
      values.password.length > 0 &&
      values.confirm_password.length > 0
    );
  }, [values]);

  function validate(v: RegisterValues): RegisterErrors {
    const next: RegisterErrors = {};

    if (!v.full_name.trim()) next.full_name = "Vui lòng nhập họ và tên.";

    const phoneDigits = normalizePhone(v.phone);
    if (!v.phone.trim()) next.phone = "Vui lòng nhập số điện thoại.";
    else if (phoneDigits.length < 9 || phoneDigits.length > 11) next.phone = "Số điện thoại không hợp lệ.";

    if (!v.email.trim()) next.email = "Vui lòng nhập email.";
    else if (!isValidEmail(v.email.trim())) next.email = "Email không hợp lệ.";

    if (!v.password) next.password = "Vui lòng nhập mật khẩu.";
    else if (v.password.length < 6) next.password = "Mật khẩu phải có ít nhất 6 ký tự.";

    if (!v.confirm_password) next.confirm_password = "Vui lòng xác nhận mật khẩu.";
    else if (v.confirm_password !== v.password) next.confirm_password = "Mật khẩu xác nhận không khớp.";

    return next;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setToast(null);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setToast({ kind: "error", message: "Vui lòng kiểm tra lại thông tin." });
      return;
    }

    setToast({ kind: "success", message: "Đăng ký thành công! Chào mừng bạn đến với AoVie." });
  }

  return (
    <div className="bg-background text-on-surface flex flex-col min-h-screen">
      <GrainTexture />
      <RegisterHeader />

      <main className="flex-grow flex flex-col items-center justify-center px-container-padding pt-24 pb-12">
        <div className="w-full max-w-md text-center">
          <div className="mb-section-gap">
            <h2 className="font-display-lg text-display-lg text-primary mb-2">Tham gia cùng AoVie</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[280px] mx-auto">
              Nơi thời trang Việt được tái hiện
            </p>
          </div>

          <form className="space-y-6 text-left" id="registrationForm" onSubmit={onSubmit} noValidate>
            <div className="relative field-lift">
              <label className="block font-label-md text-label-md text-outline mb-1 uppercase" htmlFor="full_name">
                Họ và Tên
              </label>
              <input
                className="w-full border-b border-outline-variant py-3 px-1 focus:outline-none focus:border-secondary transition-colors font-body-md text-body-md placeholder:text-outline-variant bg-transparent"
                id="full_name"
                name="full_name"
                placeholder="Nguyễn Văn A"
                type="text"
                value={values.full_name}
                onChange={(e) => setValues((s) => ({ ...s, full_name: e.target.value }))}
                aria-invalid={Boolean(errors.full_name)}
              />
              {errors.full_name ? (
                <p className="mt-2 font-body-md text-body-md text-error">{errors.full_name}</p>
              ) : null}
            </div>

            <div className="relative field-lift">
              <label className="block font-label-md text-label-md text-outline mb-1 uppercase" htmlFor="phone">
                Số điện thoại
              </label>
              <input
                className="w-full border-b border-outline-variant py-3 px-1 focus:outline-none focus:border-secondary transition-colors font-body-md text-body-md placeholder:text-outline-variant bg-transparent"
                id="phone"
                name="phone"
                placeholder="090 123 4567"
                type="tel"
                value={values.phone}
                onChange={(e) => setValues((s) => ({ ...s, phone: e.target.value }))}
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone ? <p className="mt-2 font-body-md text-body-md text-error">{errors.phone}</p> : null}
            </div>

            <div className="relative field-lift">
              <label className="block font-label-md text-label-md text-outline mb-1 uppercase" htmlFor="email">
                Email
              </label>
              <input
                className="w-full border-b border-outline-variant py-3 px-1 focus:outline-none focus:border-secondary transition-colors font-body-md text-body-md placeholder:text-outline-variant bg-transparent"
                id="email"
                name="email"
                placeholder="example@email.com"
                type="email"
                value={values.email}
                onChange={(e) => setValues((s) => ({ ...s, email: e.target.value }))}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? <p className="mt-2 font-body-md text-body-md text-error">{errors.email}</p> : null}
            </div>

            <div className="relative field-lift">
              <label className="block font-label-md text-label-md text-outline mb-1 uppercase" htmlFor="password">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  className="w-full border-b border-outline-variant py-3 px-1 focus:outline-none focus:border-secondary transition-colors font-body-md text-body-md placeholder:text-outline-variant bg-transparent"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type={showPass ? "text" : "password"}
                  value={values.password}
                  onChange={(e) => setValues((s) => ({ ...s, password: e.target.value }))}
                  aria-invalid={Boolean(errors.password)}
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-outline-variant"
                  onClick={() => setShowPass((s) => !s)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPass ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.password ? <p className="mt-2 font-body-md text-body-md text-error">{errors.password}</p> : null}
            </div>

            <div className="relative field-lift">
              <label
                className="block font-label-md text-label-md text-outline mb-1 uppercase"
                htmlFor="confirm_password"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  className="w-full border-b border-outline-variant py-3 px-1 focus:outline-none focus:border-secondary transition-colors font-body-md text-body-md placeholder:text-outline-variant bg-transparent"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="••••••••"
                  type={showConfirm ? "text" : "password"}
                  value={values.confirm_password}
                  onChange={(e) => setValues((s) => ({ ...s, confirm_password: e.target.value }))}
                  aria-invalid={Boolean(errors.confirm_password)}
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-outline-variant"
                  onClick={() => setShowConfirm((s) => !s)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showConfirm ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.confirm_password ? (
                <p className="mt-2 font-body-md text-body-md text-error">{errors.confirm_password}</p>
              ) : null}
            </div>

            <button
              className="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded transition-all active:scale-95 shadow-sm uppercase tracking-widest mt-8"
              type="submit"
              disabled={!canSubmit}
            >
              Đăng ký
            </button>

            {toast ? (
              <div
                className={[
                  "mt-4 font-body-md text-body-md",
                  toast.kind === "success" ? "text-secondary" : "text-error"
                ].join(" ")}
                role="status"
              >
                {toast.message}
              </div>
            ) : null}
          </form>

          <div className="mt-8 text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Bạn đã có tài khoản?
              <Link className="text-secondary font-bold ml-1 hover:underline" to="/dang-nhap">
                Đăng nhập
              </Link>
            </p>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex-grow h-px bg-outline-variant" />
            <span className="font-label-md text-label-md text-outline-variant uppercase">Hoặc</span>
            <div className="flex-grow h-px bg-outline-variant" />
          </div>

          <div className="mt-8 flex justify-center gap-6">
            <button className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container-high transition-colors">
              <img
                alt="Google"
                className="w-6 h-6 object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2OiguEqXV5YmQrcRCM8sHvaEQyYfJX3EJyDOcD9DjdjqhD3T9rNVyO2TwmgR_dJx8-WtJ_R1twEEcTFf8_IoEVFrtQY_szKTHhfg8Px3cLmJGV-VPzJ0w9pYxtGZpLjC6hUwiTN2OPSZ_HqmDCwNbXkNA_fUHnofrvCLy8csyX-RD0jhDv9eQoN9HqnjQ6QeLX6kBty1lu70GNOUtb_Nal_jxW9tlyY4WRVjHFzw9EtE-kmBf7XbI_NzSF5pz5B1Vl7mePWv8qN2sX-M"
              />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container-high transition-colors">
              <img
                alt="Facebook"
                className="w-6 h-6 object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKV2ka54S8KBjErg57mBvGLwa8eWT8a6hUYr_eQQgt4snclPAiO4ZgydvNnHEp6TXnQunsaZ5LE5PwKgEj9cODfF8ZocLynf5RLr55AnIgEfWOt0lsAHSfdD4Lb-fE1duwIctuEP4yxRF46Zq8vujJLCYb2N7PuurKh9kv5QrJa0NeLUe1S6iCjAo55gyDWzs0PTQNyQCyQulhNdgc2jQkCcG7uVDuBeSAjNsoB9-MJS5mQ1ZYM_K_A-iaVBMM4rxduzZ9PtDsN02P9Sk"
              />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

