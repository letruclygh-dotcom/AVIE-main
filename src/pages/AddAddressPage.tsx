import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DISTRICTS: Record<string, { value: string; label: string }[]> = {
  hcm: [
    { value: "q1", label: "Quận 1" },
    { value: "q3", label: "Quận 3" },
    { value: "bt", label: "Bình Thạnh" },
  ],
  hn: [
    { value: "q1", label: "Quận Ba Đình" },
    { value: "q3", label: "Quận Hoàn Kiếm" },
    { value: "bt", label: "Quận Cầu Giấy" },
  ],
  dn: [
    { value: "q1", label: "Quận Hải Châu" },
    { value: "q3", label: "Quận Sơn Trà" },
    { value: "bt", label: "Quận Ngũ Hành Sơn" },
  ],
};

const WARDS = [
  { value: "p1", label: "Phường 1" },
  { value: "p2", label: "Phường 2" },
  { value: "p3", label: "Phường 3" },
];

export default function AddAddressPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "success">("idle");

  const districtOptions = province ? DISTRICTS[province] ?? [] : [];

  const handleProvinceChange = (value: string) => {
    setProvince(value);
    setDistrict("");
    setWard("");
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setWard("");
  };

  const labelClass = (field: string) =>
    `font-label-md text-label-md transition-colors ${
      focusedField === field ? "text-secondary" : "text-on-surface-variant"
    }`;

  const handleSave = () => {
    if (saveState !== "idle") return;

    setSaveState("saving");
    setTimeout(() => {
      setSaveState("success");
      setTimeout(() => {
        alert("Địa chỉ đã được lưu thành công!");
        navigate(-1);
      }, 800);
    }, 1200);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
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
            Thêm địa chỉ mới
          </h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content Canvas */}
      <main
        className="flex-1 px-container-padding max-w-screen-md mx-auto w-full flex flex-col pt-16 pb-32"
        style={{ minHeight: "calc(100dvh - 168px)" }}
      >
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <form className="space-y-6 w-full flex flex-col" onSubmit={(e) => e.preventDefault()}>
            {/* Contact Info Section */}
            <div className="space-y-4 pt-8">
              <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Thông tin liên hệ
              </h2>
              <div className="space-y-1">
                <label className={labelClass("full_name")} htmlFor="full_name">
                  Họ và tên
                </label>
                <input
                  className="w-full bg-surface border-0 border-b border-outline-variant px-0 py-3 font-body-md text-body-md placeholder:text-outline focus:ring-0 focus:border-secondary transition-colors"
                  id="full_name"
                  placeholder="Vd: Helen Chen"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onFocus={() => setFocusedField("full_name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              <div className="space-y-1">
                <label className={labelClass("phone")} htmlFor="phone">
                  Số điện thoại
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

            {/* Address Section */}
            <div className="space-y-4 pt-8">
              <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Địa chỉ nhận hàng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className={labelClass("province")} htmlFor="province">
                    Tỉnh/Thành phố
                  </label>
                  <select
                    className="w-full bg-surface border-0 border-b border-outline-variant px-0 py-3 font-body-md text-body-md focus:ring-0 focus:border-secondary transition-colors appearance-none"
                    id="province"
                    value={province}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    onFocus={() => setFocusedField("province")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    <option value="hcm">Hồ Chí Minh</option>
                    <option value="hn">Hà Nội</option>
                    <option value="dn">Đà Nẵng</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className={labelClass("district")} htmlFor="district">
                    Quận/Huyện
                  </label>
                  <select
                    className="w-full bg-surface border-0 border-b border-outline-variant px-0 py-3 font-body-md text-body-md focus:ring-0 focus:border-secondary transition-colors appearance-none disabled:opacity-50"
                    id="district"
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    onFocus={() => setFocusedField("district")}
                    onBlur={() => setFocusedField(null)}
                    disabled={!province}
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {districtOptions.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className={labelClass("ward")} htmlFor="ward">
                    Phường/Xã
                  </label>
                  <select
                    className="w-full bg-surface border-0 border-b border-outline-variant px-0 py-3 font-body-md text-body-md focus:ring-0 focus:border-secondary transition-colors appearance-none disabled:opacity-50"
                    id="ward"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    onFocus={() => setFocusedField("ward")}
                    onBlur={() => setFocusedField(null)}
                    disabled={!district}
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {district &&
                      WARDS.map((w) => (
                        <option key={w.value} value={w.value}>
                          {w.label}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className={labelClass("street")} htmlFor="street">
                  Địa chỉ cụ thể
                </label>
                <textarea
                  className="w-full bg-surface border-0 border-b border-outline-variant px-0 py-3 font-body-md text-body-md placeholder:text-outline focus:ring-0 focus:border-secondary transition-colors resize-none"
                  id="street"
                  placeholder="Số nhà, tên đường, tòa nhà..."
                  rows={2}
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  onFocus={() => setFocusedField("street")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            {/* Default Checkbox */}
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
                Đặt làm địa chỉ mặc định
              </label>
            </div>
          </form>
        </div>
      </main>

      {/* Bottom Action Button Container */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-outline-variant px-container-padding py-6 md:py-8 z-40">
        <div className="max-w-screen-md mx-auto">
          <button
            className={`w-full text-on-primary py-4 rounded-lg font-label-md text-label-md uppercase tracking-widest active:scale-95 transition-all shadow-sm disabled:opacity-70 ${
              saveState === "success" ? "bg-secondary" : "bg-primary hover:bg-primary-container"
            }`}
            onClick={handleSave}
            disabled={saveState === "saving"}
            type="button"
          >
            {saveState === "saving"
              ? "Đang lưu..."
              : saveState === "success"
                ? "Thành công"
                : "Lưu địa chỉ"}
          </button>
        </div>
      </div>
    </div>
  );
}
