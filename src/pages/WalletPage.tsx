import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

type FilterType = "all" | "deposit" | "purchase" | "refund";

type Transaction = {
  id: string;
  title: string;
  type: "deposit" | "purchase" | "refund";
  time: string;
  amount: number;
  status: "success" | "pending";
  icon: string;
  month: string;
};

export default function WalletPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const transactions: Transaction[] = [
    {
      id: "AV20491",
      title: "Thanh toán đơn hàng #AV20491",
      type: "purchase",
      time: "14:20, 24/10/2025",
      amount: -850000,
      status: "success",
      icon: "shopping_cart",
      month: "Tháng 10, 2025",
    },
    {
      id: "DEP001",
      title: "Nạp tiền vào ví",
      type: "deposit",
      time: "09:15, 22/10/2025",
      amount: 1000000,
      status: "success",
      icon: "add_card",
      month: "Tháng 10, 2025",
    },
    {
      id: "AV19882",
      title: "Hoàn tiền đơn hàng #AV19882",
      type: "refund",
      time: "17:45, 18/10/2025",
      amount: 420000,
      status: "pending",
      icon: "assignment_return",
      month: "Tháng 10, 2025",
    },
    {
      id: "AV18776",
      title: "Thanh toán đơn hàng #AV18776",
      type: "purchase",
      time: "11:05, 30/09/2025",
      amount: -1200000,
      status: "success",
      icon: "shopping_cart",
      month: "Tháng 09, 2025",
    },
  ];

  const handleBottomNav = (path: string) => {
    navigate(path);
  };

  const handleAction = (actionName: string) => {
    alert(`Chức năng ${actionName} đang được bảo trì hệ thống ví! Vui lòng thử lại sau.`);
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    if (activeFilter === "all") return true;
    return tx.type === activeFilter;
  });

  // Group filtered transactions by month
  const groupedTransactions = filteredTransactions.reduce<Record<string, Transaction[]>>((groups, tx) => {
    if (!groups[tx.month]) {
      groups[tx.month] = [];
    }
    groups[tx.month].push(tx);
    return groups;
  }, {});

  const formatVND = (value: number) => {
    const formatted = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
      .format(Math.abs(value))
      .replace(/\s?₫/, "đ");
    return value < 0 ? `- ${formatted}` : `+ ${formatted}`;
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans relative antialiased select-none">
      <GrainTexture />

      {/* Top App Bar Header */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-surface-variant shrink-0">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10"
            type="button"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwh7yrVOTAGqdin7eM3AB4NddGwgjJXL0uhlU42-nMJtT8DcJWGpytyfED7UrfmS1t9lZdxw-Cqo3LHuoO7XGT5z_H-k3cyhDp1_OwRFpdibfhlSCsQHVcVJrQPBc_dUfLsaoXk_vqTqGSMbCuucwee8nfTKTlaBfU4WkODCqwFEo3NVR7_-uJSjWKVR4foLaMGo4e_LHNpR52KFpQElMTzFPIiCy93mAFN3P7krJ4-npb2ftHMKuecPr0PvE2gcZHGxHDVLVzxlfhVvw"
            alt="AoVie Logo"
            className="h-7 w-auto object-contain"
          />
          <button
            onClick={() => alert("Chức năng giỏ hàng đang được chuẩn bị!")}
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10"
            type="button"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="pt-16 pb-28 flex-grow max-w-7xl mx-auto w-full">
        {/* Wallet Balance Card */}
        <section className="px-container-padding py-6">
          <div className="bg-primary-container text-on-primary-container p-6 rounded-lg relative overflow-hidden shadow-sm">
            {/* Background Texture Mimic */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="relative z-10">
              <p className="font-label-md text-label-md text-primary-fixed uppercase tracking-widest mb-1">
                Số dư hiện tại
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-[32px] text-primary-fixed font-bold">2.450.000</span>
                <span className="font-headline-md text-headline-md text-primary-fixed opacity-80 font-semibold">
                  đ
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-3 relative z-10">
              <button
                onClick={() => handleAction("Nạp tiền")}
                className="flex-1 bg-white text-primary font-label-md text-label-md py-3 rounded uppercase font-bold hover:bg-surface-variant transition-colors flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Nạp tiền
              </button>
              <button
                onClick={() => handleAction("Rút tiền")}
                className="flex-1 border border-primary-fixed text-primary-fixed font-label-md text-label-md py-3 rounded uppercase font-bold hover:bg-primary/20 transition-colors flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                Rút tiền
              </button>
            </div>
          </div>
        </section>

        {/* Transaction Filters */}
        <section className="px-container-padding mb-6 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {(
            [
              { id: "all", label: "Tất cả" },
              { id: "deposit", label: "Nạp tiền" },
              { id: "purchase", label: "Thanh toán" },
              { id: "refund", label: "Hoàn tiền" },
            ] as const
          ).map((btn) => {
            const isActive = activeFilter === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={[
                  "whitespace-nowrap px-4 py-2 rounded-full font-label-md text-label-md uppercase font-semibold transition-all duration-200 active:scale-95",
                  isActive
                    ? "bg-secondary text-white shadow-sm"
                    : "border border-outline-variant text-on-surface-variant hover:bg-surface-container",
                ].join(" ")}
              >
                {btn.label}
              </button>
            );
          })}
        </section>

        {/* Transaction List */}
        {filteredTransactions.length > 0 ? (
          <section className="px-container-padding flex flex-col gap-1">
            {Object.keys(groupedTransactions).map((month) => (
              <div key={month} className="mb-4">
                <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-2 px-1 font-semibold">
                  {month}
                </h2>
                <div className="space-y-2">
                  {groupedTransactions[month].map((tx) => (
                    <div
                      key={tx.id}
                      onClick={() => alert(`Chi tiết giao dịch #${tx.id}:\n- Loại: ${tx.title}\n- Thời gian: ${tx.time}\n- Số tiền: ${formatVND(tx.amount)}`)}
                      className="bg-surface border border-surface-variant p-4 flex items-center justify-between hover:bg-surface-container-low transition-all duration-200 cursor-pointer group active:scale-[0.99] rounded shadow-xs"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded group-hover:bg-secondary-fixed/30 transition-colors shrink-0">
                          <span
                            className={[
                              "material-symbols-outlined",
                              tx.type === "purchase" ? "text-secondary" : "",
                              tx.type === "deposit" ? "text-on-secondary-container" : "",
                              tx.type === "refund" ? "text-primary" : "",
                            ].join(" ")}
                          >
                            {tx.icon}
                          </span>
                        </div>
                        <div>
                          <p className="font-body-md text-body-md font-bold text-primary leading-tight group-hover:text-secondary transition-colors">
                            {tx.title}
                          </p>
                          <p className="font-label-md text-label-md text-on-surface-variant mt-1">{tx.time}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p
                          className={[
                            "font-body-md text-body-md font-bold leading-tight",
                            tx.amount < 0 ? "text-on-background" : "text-secondary",
                          ].join(" ")}
                        >
                          {formatVND(tx.amount)}
                        </p>
                        <span
                          className={[
                            "font-label-md text-[10px] uppercase tracking-tighter px-1.5 py-0.5 rounded mt-1 inline-block",
                            tx.status === "success" ? "bg-secondary-fixed text-secondary font-semibold" : "bg-surface-variant text-primary font-semibold",
                          ].join(" ")}
                        >
                          {tx.status === "success" ? "Thành công" : "Đang xử lý"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ) : (
          /* Empty State Block */
          <section className="px-container-padding flex flex-col items-center justify-center py-20 text-center select-none">
            <span className="material-symbols-outlined text-[64px] text-outline-variant mb-4">history</span>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed font-semibold">
              Bạn chưa có giao dịch nào trong danh mục này.
            </p>
          </section>
        )}
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-gutter bg-surface border-t border-outline-variant z-50 shrink-0 select-none">
        <button
          onClick={() => handleBottomNav("/hub")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-md text-[10px] uppercase font-semibold">Trang chủ</span>
        </button>
        <button
          onClick={() => handleBottomNav("/bo-loc")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-md text-[10px] uppercase font-semibold">Danh mục</span>
        </button>
        <button
          onClick={() => handleBottomNav("/dat-hang-thanh-cong")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-label-md text-[10px] uppercase font-semibold">Đơn hàng</span>
        </button>
        <button
          onClick={() => handleBottomNav("/")}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 w-16"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="font-label-md text-[10px] uppercase font-semibold">Thông báo</span>
        </button>
        <button
          onClick={() => handleBottomNav("/toi")}
          className="flex flex-col items-center justify-center text-secondary relative active:scale-95 w-16"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            person
          </span>
          <span className="font-label-md text-[10px] uppercase font-bold">Tôi</span>
          <div className="absolute -bottom-1 w-1.5 h-1.5 bg-secondary rounded-full" />
        </button>
      </nav>
    </div>
  );
}
