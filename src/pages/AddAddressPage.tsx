import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabaseClient";

export default function AddAddressPage() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "success">("idle");

  useEffect(() => {
    if (!profile) return;
    setFullName(profile.full_name || "");
    setPhone(profile.phone || "");
  }, [profile]);

  const labelClass = (field: string) =>
    `font-label-md text-label-md transition-colors ${
      focusedField === field ? "text-secondary" : "text-on-surface-variant"
    }`;

  const handleSave = async () => {
    if (saveState !== "idle") return;
    if (!user) {
      navigate("/dang-nhap");
      return;
    }
    if (!fullName.trim() || !phone.trim() || !street.trim()) {
      alert("Vui long nhap day du thong tin dia chi.");
      return;
    }

    setSaveState("saving");

    if (isDefault) {
      const { error: clearError } = await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", user.id);

      if (clearError) {
        alert("Khong the cap nhat dia chi mac dinh.");
        setSaveState("idle");
        return;
      }
    }

    const { error } = await supabase.from("addresses").insert({
      user_id: user.id,
      recipient_name: fullName.trim(),
      recipient_phone: phone.trim(),
      address_detail: street.trim(),
      is_default: isDefault,
    });

    if (error) {
      alert("Khong the luu dia chi: " + error.message);
      setSaveState("idle");
      return;
    }

    setSaveState("success");
    setTimeout(() => {
      navigate("/dia-chi-giao-hang", { replace: true });
    }, 600);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            type="button"
            className="active:scale-95 transition-transform hover:opacity-80 flex items-center justify-center w-10 h-10"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-widest text-primary uppercase">
            Them dia chi moi
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main
        className="flex-1 px-container-padding max-w-screen-md mx-auto w-full flex flex-col pt-16 pb-32"
        style={{ minHeight: "calc(100dvh - 168px)" }}
      >
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          {!user && !authLoading ? (
            <div className="w-full py-20 text-center space-y-4">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Vui long dang nhap de them dia chi giao hang.
              </p>
              <button
                type="button"
                onClick={() => navigate("/dang-nhap")}
                className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md uppercase tracking-wider"
              >
                Dang nhap
              </button>
            </div>
          ) : (
            <form className="space-y-6 w-full flex flex-col" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4 pt-8">
                <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Thong tin lien he
                </h2>
                <div className="space-y-1">
                  <label className={labelClass("full_name")} htmlFor="full_name">
                    Ho va ten
                  </label>
                  <input
                    className="w-full bg-surface border-0 border-b border-outline-variant px-0 py-3 font-body-md text-body-md placeholder:text-outline focus:ring-0 focus:border-secondary transition-colors"
                    id="full_name"
                    placeholder="Nguoi nhan"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onFocus={() => setFocusedField("full_name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelClass("phone")} htmlFor="phone">
                    So dien thoai
                  </label>
                  <input
                    className="w-full bg-surface border-0 border-b border-outline-variant px-0 py-3 font-body-md text-body-md placeholder:text-outline focus:ring-0 focus:border-secondary transition-colors"
                    id="phone"
                    placeholder="0938752999"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Dia chi nhan hang
                </h2>
                <div className="space-y-1">
                  <label className={labelClass("street")} htmlFor="street">
                    Dia chi cu the
                  </label>
                  <textarea
                    className="w-full bg-surface border-0 border-b border-outline-variant px-0 py-3 font-body-md text-body-md placeholder:text-outline focus:ring-0 focus:border-secondary transition-colors resize-none"
                    id="street"
                    placeholder="So nha, ten duong, phuong/xa, quan/huyen, tinh/thanh pho"
                    rows={3}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    onFocus={() => setFocusedField("street")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2 pb-6">
                <input
                  className="w-5 h-5 rounded-sm border-2 border-outline-variant text-secondary focus:ring-offset-0 focus:ring-0 checked:bg-secondary"
                  id="default_address"
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                />
                <label
                  className="font-body-md text-body-md text-on-surface select-none cursor-pointer"
                  htmlFor="default_address"
                >
                  Dat lam dia chi mac dinh
                </label>
              </div>
            </form>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-outline-variant px-container-padding py-6 md:py-8 z-40">
        <div className="max-w-screen-md mx-auto">
          <button
            className={`w-full text-on-primary py-4 rounded-lg font-label-md text-label-md uppercase tracking-widest active:scale-95 transition-all shadow-sm disabled:opacity-70 ${
              saveState === "success" ? "bg-secondary" : "bg-primary hover:bg-primary-container"
            }`}
            onClick={handleSave}
            disabled={saveState === "saving" || authLoading || !user}
            type="button"
          >
            {saveState === "saving"
              ? "Dang luu..."
              : saveState === "success"
                ? "Thanh cong"
                : "Luu dia chi"}
          </button>
        </div>
      </div>
    </div>
  );
}
