import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  tag: "Nhà" | "Văn phòng" | "Khác";
  isDefault: boolean;
}

const INITIAL_ADDRESSES: Address[] = [
  {
    id: "a1",
    name: "Nguyễn Văn A",
    phone: "090 123 4567",
    street: "24 Đặng Thị Nhu",
    ward: "Phường Nguyễn Thái Bình",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    tag: "Nhà",
    isDefault: true,
  },
  {
    id: "a2",
    name: "Nguyễn Văn A",
    phone: "090 123 4567",
    street: "125 Pasteur",
    ward: "Phường Võ Thị Sáu",
    district: "Quận 3",
    city: "TP. Hồ Chí Minh",
    tag: "Văn phòng",
    isDefault: false,
  },
  {
    id: "a3",
    name: "Nguyễn Thị B",
    phone: "098 765 4321",
    street: "52 Trường Chinh",
    ward: "Phường 12",
    district: "Quận Tân Bình",
    city: "TP. Hồ Chí Minh",
    tag: "Khác",
    isDefault: false,
  },
];

const TAG_COLOR: Record<string, string> = {
  Nhà: "bg-secondary-fixed text-on-secondary-container",
  "Văn phòng": "bg-surface-variant text-on-surface-variant",
  Khác: "bg-surface-container-low text-outline",
};

export default function AddressPage() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [showForm, setShowForm] = useState(false);

  // Simple new address form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    ward: "",
    district: "",
    city: "TP. Hồ Chí Minh",
    tag: "Nhà" as Address["tag"],
  });

  const setDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const deleteAddress = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa địa chỉ này?")) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleAddNew = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.street.trim()) {
      alert("Vui lòng điền đầy đủ: Tên, Số điện thoại, Địa chỉ.");
      return;
    }
    const newAddr: Address = {
      id: `a${Date.now()}`,
      ...form,
      isDefault: addresses.length === 0,
    };
    setAddresses((prev) => [...prev, newAddr]);
    setForm({ name: "", phone: "", street: "", ward: "", district: "", city: "TP. Hồ Chí Minh", tag: "Nhà" });
    setShowForm(false);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant shrink-0">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            className="hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10"
            onClick={() => navigate(-1)}
            type="button"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-primary uppercase text-headline-md tracking-wider whitespace-nowrap">
            Địa chỉ giao hàng
          </h1>
          <button
            className="hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10 text-primary"
            type="button"
            onClick={() => setShowForm(true)}
            title="Thêm địa chỉ mới"
          >
            <span className="material-symbols-outlined text-[24px]">add_location_alt</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-28 px-container-padding max-w-md mx-auto w-full flex flex-col gap-4 mt-2">
        {/* Address count label */}
        <p className="font-label-md text-[10px] uppercase tracking-wider text-outline font-bold">
          {addresses.length} địa chỉ đã lưu
        </p>

        {/* Address Cards */}
        {addresses.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <span className="material-symbols-outlined text-outline text-[64px]">location_off</span>
            <p className="font-headline-md text-on-surface-variant uppercase tracking-wide text-sm">
              Chưa có địa chỉ nào
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-primary text-white font-label-md text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-lg hover:opacity-90 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Thêm địa chỉ mới
            </button>
          </div>
        )}

        {addresses.map((addr) => (
          <section
            key={addr.id}
            className={`bg-surface border rounded-lg overflow-hidden shadow-xs transition-all ${
              addr.isDefault ? "border-secondary" : "border-outline-variant"
            }`}
          >
            {/* Default badge */}
            {addr.isDefault && (
              <div className="bg-secondary text-white flex items-center gap-1.5 px-4 py-1.5">
                <span className="material-symbols-outlined text-[14px]">where_to_vote</span>
                <span className="font-label-md text-[10px] uppercase tracking-wider font-bold">
                  Địa chỉ mặc định
                </span>
              </div>
            )}

            <div className="p-4 flex flex-col gap-2">
              {/* Name + Tag + Phone */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-headline-md text-primary text-sm font-bold">{addr.name}</p>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${TAG_COLOR[addr.tag]}`}>
                    {addr.tag}
                  </span>
                </div>
                <p className="font-label-md text-[11px] text-outline shrink-0">{addr.phone}</p>
              </div>

              {/* Full address */}
              <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed">
                {addr.street}, {addr.ward}, {addr.district}, {addr.city}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-1 pt-3 border-t border-outline-variant/20">
                {!addr.isDefault && (
                  <button
                    onClick={() => setDefault(addr.id)}
                    className="flex items-center gap-1.5 text-secondary font-label-md text-[10px] uppercase tracking-wider font-semibold hover:opacity-80 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[14px]">radio_button_unchecked</span>
                    Đặt mặc định
                  </button>
                )}
                <button
                  onClick={() => alert("Mở form chỉnh sửa địa chỉ...")}
                  className="flex items-center gap-1.5 text-primary font-label-md text-[10px] uppercase tracking-wider font-semibold hover:opacity-80 transition-opacity ml-auto"
                >
                  <span className="material-symbols-outlined text-[14px]">edit</span>
                  Sửa
                </button>
                {!addr.isDefault && (
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="flex items-center gap-1.5 text-error font-label-md text-[10px] uppercase tracking-wider font-semibold hover:opacity-80 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete_outline</span>
                    Xóa
                  </button>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* Add New Address Button (persistent) */}
        {addresses.length > 0 && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-dashed border-outline-variant text-outline hover:border-secondary hover:text-secondary transition-all active:scale-[0.98] font-label-md text-xs uppercase tracking-wider font-semibold"
          >
            <span className="material-symbols-outlined text-[20px]">add_location_alt</span>
            Thêm địa chỉ mới
          </button>
        )}
      </main>

      {/* Add Address Drawer / Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm">
          <div className="bg-background rounded-t-2xl max-h-[90vh] overflow-y-auto">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-outline-variant rounded-full" />
            </div>

            <div className="px-container-padding pb-8">
              <div className="flex items-center justify-between py-4 border-b border-outline-variant/30">
                <h2 className="font-headline-md text-primary uppercase tracking-wider text-sm font-bold">
                  Thêm địa chỉ mới
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-8 h-8 flex items-center justify-center text-outline hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-4 mt-4">
                {[
                  { label: "Họ và tên *", key: "name", placeholder: "Nguyễn Văn A", type: "text" },
                  { label: "Số điện thoại *", key: "phone", placeholder: "090 xxx xxxx", type: "tel" },
                  { label: "Địa chỉ cụ thể *", key: "street", placeholder: "Số nhà, tên đường", type: "text" },
                  { label: "Phường / Xã", key: "ward", placeholder: "Phường Nguyễn Thái Bình", type: "text" },
                  { label: "Quận / Huyện", key: "district", placeholder: "Quận 1", type: "text" },
                  { label: "Tỉnh / Thành phố", key: "city", placeholder: "TP. Hồ Chí Minh", type: "text" },
                ].map((field) => (
                  <div key={field.key} className="flex flex-col gap-1.5">
                    <label className="font-label-md text-[10px] uppercase tracking-wider text-outline font-bold">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={(form as any)[field.key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-sm font-body-md text-on-surface placeholder-outline focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                ))}

                {/* Tag selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-[10px] uppercase tracking-wider text-outline font-bold">
                    Loại địa chỉ
                  </label>
                  <div className="flex gap-2">
                    {(["Nhà", "Văn phòng", "Khác"] as Address["tag"][]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setForm((prev) => ({ ...prev, tag: t }))}
                        className={`flex-1 py-2.5 rounded-lg font-label-md text-[10px] uppercase tracking-wider font-bold transition-all border ${
                          form.tag === t
                            ? "border-secondary bg-secondary-fixed text-on-secondary-container"
                            : "border-outline-variant bg-surface text-outline hover:border-primary"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleAddNew}
                className="mt-6 w-full bg-primary text-white font-label-md text-xs uppercase tracking-wider font-bold py-3.5 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
              >
                Lưu địa chỉ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
