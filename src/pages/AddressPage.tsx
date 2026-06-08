import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabaseClient";

type Address = {
  id: string;
  recipient_name: string;
  recipient_phone: string;
  address_detail: string;
  is_default: boolean;
};

export default function AddressPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setAddresses([]);
      setLoading(false);
      return;
    }

    void loadAddresses();
  }, [authLoading, user]);

  const loadAddresses = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("addresses")
      .select("id, recipient_name, recipient_phone, address_detail, is_default")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Loi tai danh sach dia chi:", error.message);
      alert("Khong the tai dia chi giao hang.");
      setAddresses([]);
    } else {
      setAddresses(data || []);
    }

    setLoading(false);
  };

  const handleSetDefault = async (addressId: string) => {
    if (!user || updatingId) return;

    setUpdatingId(addressId);

    const { error: clearError } = await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user.id);

    if (clearError) {
      alert("Khong the cap nhat dia chi mac dinh.");
      setUpdatingId(null);
      return;
    }

    const { error: setError } = await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", addressId)
      .eq("user_id", user.id);

    if (setError) {
      alert("Khong the dat dia chi mac dinh.");
    } else {
      await loadAddresses();
    }

    setUpdatingId(null);
  };

  return (
    <div className="address-page bg-background text-on-surface min-h-screen flex flex-col pb-32">
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            type="button"
            className="hover:opacity-80 transition-opacity active:scale-95 transition-transform"
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-widest text-primary uppercase">
            Dia chi giao hang
          </h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="mt-16 px-container-padding flex-grow w-full max-w-2xl mx-auto py-6">
          {!user && !authLoading ? (
          <div className="py-20 text-center space-y-4">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Vui long dang nhap de quan ly dia chi giao hang.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dang-nhap")}
              className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md uppercase tracking-wider"
            >
              Dang nhap
            </button>
          </div>
        ) : loading || authLoading ? (
          <div className="flex justify-center py-20">
            <span className="animate-spin material-symbols-outlined text-3xl text-primary">progress_activity</span>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Chon dia chi nhan hang cua ban hoac them moi de tiep tuc thanh toan.
              </p>
            </div>

            <div className="space-y-4">
              {addresses.length === 0 ? (
                <div className="p-6 bg-surface border border-outline-variant rounded-lg text-center space-y-3">
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Ban chua co dia chi giao hang nao.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/them-dia-chi-moi")}
                    className="bg-primary text-on-primary px-5 py-3 rounded-lg font-label-md text-label-md uppercase tracking-wider"
                  >
                    Them dia chi moi
                  </button>
                </div>
              ) : (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`relative p-4 rounded-lg transition-all duration-300 ${
                      address.is_default
                        ? "bg-surface border-2 border-primary"
                        : "bg-surface-container-low border border-outline-variant"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2 gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-headline-md text-headline-md text-on-surface">
                          {address.recipient_name}
                        </span>
                        {address.is_default && (
                          <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md px-2 py-0.5 rounded-sm">
                            Mac dinh
                          </span>
                        )}
                      </div>
                      {!address.is_default && (
                        <button
                          type="button"
                          onClick={() => handleSetDefault(address.id)}
                          disabled={updatingId === address.id}
                          className="text-secondary hover:underline font-label-md text-label-md uppercase disabled:opacity-60"
                        >
                          {updatingId === address.id ? "Dang cap nhat" : "Dat mac dinh"}
                        </button>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        {address.recipient_phone}
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant flex items-start gap-2">
                        <span className="material-symbols-outlined text-sm mt-0.5" style={{ fontSize: "16px" }}>
                          location_on
                        </span>
                        {address.address_detail}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>

      <div className="fixed bottom-16 left-0 w-full p-container-padding z-40 bg-gradient-to-t from-background via-background/90 to-transparent pt-8">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => navigate("/them-dia-chi-moi")}
            className="w-full py-4 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Them dia chi moi
          </button>
        </div>
      </div>

      <nav className="fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface">
        <div className="flex justify-around items-center h-16 px-2 pb-safe w-full max-w-screen-xl mx-auto">
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
            to="/trang-chu"
          >
            <span className="material-symbols-outlined" data-icon="home">
              home
            </span>
            <span className="font-label-md text-label-md">Trang chu</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
            to="/danh-muc"
          >
            <span className="material-symbols-outlined" data-icon="category">
              grid_view
            </span>
            <span className="font-label-md text-label-md">Danh muc</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
            to="/don-hang"
          >
            <span className="material-symbols-outlined" data-icon="receipt_long">
              receipt_long
            </span>
            <span className="font-label-md text-label-md">Don hang</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform"
            to="/thong-bao"
          >
            <span className="material-symbols-outlined" data-icon="notifications">
              notifications
            </span>
            <span className="font-label-md text-label-md">Thong bao</span>
          </Link>
          <Link
            className="flex flex-col items-center justify-center text-secondary relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-secondary after:rounded-full active:scale-90 transition-transform"
            to="/toi"
          >
            <span
              className="material-symbols-outlined"
              data-icon="person"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person
            </span>
            <span className="font-label-md text-label-md">Toi</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
