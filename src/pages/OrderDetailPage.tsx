import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";
import { supabase } from "../lib/supabaseClient";

type OrderItem = {
  id: string;
  product_id: string | null;
  quantity: number;
  price: number;
  color: string;
  size: string;
  products: {
    name: string;
    image_urls: string[];
  } | null;
};

type OrderDetail = {
  id: string;
  order_code: string;
  order_status: string;
  payment_method: string;
  payment_status: string;
  recipient_name: string;
  recipient_phone: string;
  shipping_address: string;
  shipping_fee: number;
  subtotal: number;
  total: number;
  created_at: string;
  order_items: OrderItem[];
};

const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Cho xac nhan",
  preparing: "Cho lay hang",
  shipping: "Dang giao",
  delivered: "Da giao",
  cancelled: "Da huy",
};

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const orderId = (searchParams.get("orderId") || location.state?.orderId) as string | undefined;
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    void fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    if (!orderId) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(
        "id, order_code, order_status, payment_method, payment_status, recipient_name, recipient_phone, shipping_address, shipping_fee, subtotal, total, created_at, order_items(id, product_id, quantity, price, color, size, products(name, image_urls))"
      )
      .eq("id", orderId)
      .single();

    if (error) {
      console.error("Loi tai chi tiet don hang:", error.message);
      setOrder(null);
    } else {
      setOrder(data as OrderDetail);
    }
    setLoading(false);
  };

  const totalItems = order?.order_items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="bg-background text-on-background min-h-screen pb-20 font-sans relative antialiased select-none">
      <GrainTexture />

      <header className="flex justify-between items-center px-container-padding h-16 w-full sticky top-0 z-50 bg-background border-b border-outline-variant">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:opacity-80 transition-opacity cursor-pointer w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary tracking-tighter uppercase">
          AOVIE
        </h1>
        <div className="flex items-center">
          <button
            onClick={() => navigate("/thanh-toan")}
            className="text-primary hover:opacity-80 transition-opacity cursor-pointer w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-primary">shopping_cart</span>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-container-padding py-6 space-y-6 relative z-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="animate-spin material-symbols-outlined text-3xl text-primary">progress_activity</span>
          </div>
        ) : !order ? (
          <div className="bg-surface p-6 border border-outline-variant rounded-lg text-center space-y-4">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Khong tim thay don hang nay hoac ban khong co quyen xem.
            </p>
            <button
              type="button"
              onClick={() => navigate("/don-hang")}
              className="bg-primary text-on-primary px-5 py-3 rounded-lg font-label-md text-label-md uppercase tracking-wider"
            >
              Quay lai don hang
            </button>
          </div>
        ) : (
          <>
            <section className="bg-surface-container-low p-5 border border-outline-variant rounded-lg space-y-3 shadow-xs">
              <div className="flex justify-between items-center">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest font-bold">
                  Ma don hang
                </span>
                <span className="font-body-lg text-body-lg font-bold text-primary">#{order.order_code}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest font-bold">
                  Trang thai
                </span>
                <div className="flex items-center gap-2 text-secondary">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  <span className="font-headline-md text-headline-md text-secondary font-bold text-base">
                    {ORDER_STATUS_LABELS[order.order_status] || order.order_status}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-outline-variant/30">
                <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
                  Dat luc {new Date(order.created_at).toLocaleString("vi-VN")}. Thanh toan {order.payment_method.toUpperCase()} - {order.payment_status === "paid" ? "da thanh toan" : "chua thanh toan"}.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-label-md text-label-md text-primary uppercase tracking-widest border-b border-outline-variant pb-2 font-bold">
                Danh sach san pham
              </h2>
              {order.order_items.map((item) => {
                const imageUrl = item.products?.image_urls?.[0] || "https://placehold.co/240x320?text=AoVie";
                const title = item.products?.name || "San pham khong con ton tai";

                return (
                  <div key={item.id} className="flex gap-4 items-start py-2">
                    <div className="w-24 h-32 flex-shrink-0 bg-surface-container-highest overflow-hidden border border-outline-variant rounded-lg">
                      <img alt={title} className="w-full h-full object-cover" src={imageUrl} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-32 py-1">
                      <div>
                        <h3 className="font-body-lg text-body-lg font-bold text-primary leading-tight text-sm">
                          {title}
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                          Mau: {item.color || "Mac dinh"} | Size: {item.size || "Mac dinh"} | So luong: {item.quantity}
                        </p>
                      </div>
                      <p className="font-body-lg text-body-lg font-bold text-secondary">
                        {Number(item.price).toLocaleString("vi-VN")}d
                      </p>
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="space-y-4">
              <h2 className="font-label-md text-label-md text-primary uppercase tracking-widest border-b border-outline-variant pb-2 font-bold">
                Thong tin giao hang
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface p-5 border border-outline-variant rounded-lg shadow-xs">
                <div className="space-y-1">
                  <p className="font-label-md text-label-md text-on-surface-variant font-bold">
                    NGUOI NHAN
                  </p>
                  <p className="font-body-lg text-body-lg text-on-surface font-bold">
                    {order.recipient_name}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">{order.recipient_phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-label-md text-label-md text-on-surface-variant font-bold">Dia chi</p>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    {order.shipping_address}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-surface-container p-5 border border-outline-variant rounded-lg shadow-xs">
              <div className="space-y-3">
                <div className="flex justify-between font-body-md text-body-md">
                  <span className="text-on-surface-variant">Tam tinh ({totalItems} san pham)</span>
                  <span className="text-on-surface">{Number(order.subtotal).toLocaleString("vi-VN")}d</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md">
                  <span className="text-on-surface-variant">Phi van chuyen</span>
                  <span className="text-on-surface">{Number(order.shipping_fee).toLocaleString("vi-VN")}d</span>
                </div>
                <div className="pt-3 border-t border-outline-variant flex justify-between items-center">
                  <span className="font-label-md text-label-md text-primary uppercase font-bold">
                    Tong thanh toan
                  </span>
                  <span className="font-headline-lg text-headline-lg text-secondary font-bold">
                    {Number(order.total).toLocaleString("vi-VN")}d
                  </span>
                </div>
              </div>
            </section>

            <div className="pt-4">
              <button
                onClick={() => navigate("/ho-tro")}
                className="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded-lg uppercase tracking-widest hover:bg-primary-container transition-all flex items-center justify-center gap-2 font-bold active:scale-[0.98] shadow-md shadow-primary/10"
              >
                <span className="material-symbols-outlined">support_agent</span>
                Lien he ho tro
              </button>
            </div>
          </>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-gutter pb-safe bg-surface border-t border-outline-variant">
        <button
          onClick={() => navigate("/trang-chu")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-2 w-16"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-md text-label-md">Trang chu</span>
        </button>
        <button
          onClick={() => navigate("/danh-muc")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-2 w-16"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-label-md">Danh muc</span>
        </button>
        <button
          onClick={() => navigate("/don-hang")}
          className="flex flex-col items-center justify-center text-secondary font-bold relative px-2 w-16"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            receipt_long
          </span>
          <span className="font-label-md text-label-md font-bold">Don hang</span>
          <div className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full"></div>
        </button>
        <button
          onClick={() => navigate("/thong-bao")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-2 w-16"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-label-md text-label-md">Thong bao</span>
        </button>
        <button
          onClick={() => navigate("/toi")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors px-2 w-16"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-md text-label-md">Toi</span>
        </button>
      </nav>
    </div>
  );
}
