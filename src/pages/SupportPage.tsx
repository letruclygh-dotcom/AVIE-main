import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

type SupportTab = "faq" | "chat" | "contact";

interface FAQ {
  q: string;
  a: string;
}

const FAQS: FAQ[] = [
  {
    q: "Tôi có thể đổi hàng sau khi nhận được không?",
    a: "Có, AoVie hỗ trợ đổi hàng trong vòng 7 ngày kể từ ngày nhận. Sản phẩm phải còn nguyên tem, chưa qua sử dụng và có hóa đơn mua hàng.",
  },
  {
    q: "Phí vận chuyển đổi/trả hàng là bao nhiêu?",
    a: "AoVie hỗ trợ miễn phí vận chuyển đổi/trả hàng lần đầu tiên. Từ lần thứ hai trở đi, phí vận chuyển 25.000đ sẽ được trừ vào tổng hoàn tiền.",
  },
  {
    q: "Thời gian hoàn tiền mất bao lâu?",
    a: "Sau khi xác nhận đổi/trả hàng, tiền hoàn sẽ được cộng vào Ví AoVie trong vòng 24–48 giờ làm việc. Hoàn về tài khoản ngân hàng mất 3–5 ngày.",
  },
  {
    q: "Tôi chưa nhận được đơn hàng nhưng trạng thái hiển thị đã giao?",
    a: "Vui lòng liên hệ hotline 1800-AoVie hoặc chat với tổng đài trong vòng 24 giờ từ khi cập nhật trạng thái để được hỗ trợ khiếu nại.",
  },
  {
    q: "AoVie có hỗ trợ đặt hàng số lượng lớn (wholesale) không?",
    a: "Có! Dành cho đơn từ 10 sản phẩm trở lên, liên hệ email wholesale@aovie.vn hoặc hotline để được tư vấn giá ưu đãi và ưu tiên xử lý.",
  },
];

const CONTACT_ITEMS = [
  {
    icon: "call",
    label: "Hotline",
    value: "1800-268-432",
    sub: "Miễn phí · Thứ 2–7, 8:00–21:00",
    action: () => alert("Gọi 1800-268-432"),
  },
  {
    icon: "mail",
    label: "Email hỗ trợ",
    value: "hotro@aovie.vn",
    sub: "Phản hồi trong 2 giờ làm việc",
    action: () => alert("Soạn email đến hotro@aovie.vn"),
  },
  {
    icon: "near_me",
    label: "Cửa hàng",
    value: "24 Đặng Thị Nhu, Quận 1, TP.HCM",
    sub: "Thứ 2–CN, 9:00–20:00",
    action: () => alert("Mở bản đồ chỉ đường"),
  },
];

export default function SupportPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SupportTab>("faq");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    {
      from: "bot",
      text: "Xin chào! Tôi là Trợ lý AoVie. Hôm nay tôi có thể giúp gì cho bạn? 🌿",
    },
  ]);

  const sendMsg = () => {
    if (!chatMsg.trim()) return;
    const userText = chatMsg.trim();
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setChatMsg("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Cảm ơn bạn đã liên hệ! Đội ngũ hỗ trợ sẽ phản hồi trong vòng 5 phút. Trong lúc chờ, bạn có thể xem phần FAQ phía trên để tìm câu trả lời nhanh nhất. 🙏",
        },
      ]);
    }, 1200);
  };

  const TABS: { key: SupportTab; label: string; icon: string }[] = [
    { key: "faq", label: "FAQ", icon: "quiz" },
    { key: "chat", label: "Chat", icon: "chat_bubble" },
    { key: "contact", label: "Liên hệ", icon: "contact_phone" },
  ];

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
            Hỗ trợ khách hàng
          </h1>
          <div className="w-10 h-10" />
        </div>

        {/* Tab Bar */}
        <div className="flex gap-0 border-t border-outline-variant/30 bg-background">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 font-label-md text-[10px] uppercase tracking-wider font-semibold transition-all border-b-2 ${
                activeTab === tab.key
                  ? "border-secondary text-secondary"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow pt-32 pb-24 max-w-md mx-auto w-full flex flex-col">
        {/* ---- FAQ TAB ---- */}
        {activeTab === "faq" && (
          <div className="px-container-padding flex flex-col gap-3 py-4">
            <p className="font-label-md text-[10px] uppercase tracking-wider text-outline font-bold">
              Câu hỏi thường gặp
            </p>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-surface border border-outline-variant rounded-lg overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-start justify-between gap-3 px-4 py-3.5 hover:bg-surface-container-low transition-colors"
                >
                  <p className="font-body-md text-sm text-primary font-bold leading-snug">
                    {faq.q}
                  </p>
                  <span
                    className={`material-symbols-outlined text-outline text-[20px] shrink-0 mt-0.5 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 pt-1 border-t border-outline-variant/20">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ---- CHAT TAB ---- */}
        {activeTab === "chat" && (
          <div className="flex flex-col flex-grow h-full">
            {/* Messages area */}
            <div className="flex-grow overflow-y-auto px-container-padding py-4 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.from === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-container flex items-center justify-center shrink-0 mr-2 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">support_agent</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-primary text-white rounded-tr-sm font-body-md"
                        : "bg-surface border border-outline-variant text-on-surface rounded-tl-sm font-body-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="border-t border-outline-variant bg-surface px-container-padding py-3 flex items-center gap-3">
              <input
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-grow bg-surface-container-low border border-outline-variant rounded-full px-4 py-2 text-sm font-body-md text-on-surface placeholder-outline focus:outline-none focus:border-secondary transition-colors"
              />
              <button
                onClick={sendMsg}
                disabled={!chatMsg.trim()}
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-40 hover:opacity-90 active:scale-95 transition-all shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </div>
          </div>
        )}

        {/* ---- CONTACT TAB ---- */}
        {activeTab === "contact" && (
          <div className="px-container-padding flex flex-col gap-5 py-4">
            <p className="font-label-md text-[10px] uppercase tracking-wider text-outline font-bold">
              Kênh liên hệ
            </p>
            {CONTACT_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className="bg-surface border border-outline-variant rounded-lg p-4 flex items-center gap-4 hover:border-secondary transition-all active:scale-[0.98] shadow-xs text-left"
              >
                <div className="w-12 h-12 rounded-full bg-secondary-fixed text-on-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                </div>
                <div className="flex-grow">
                  <p className="font-label-md text-[10px] uppercase tracking-wider text-outline">
                    {item.label}
                  </p>
                  <p className="font-body-md text-sm text-primary font-bold mt-0.5">{item.value}</p>
                  <p className="font-label-md text-[10px] text-on-surface-variant">{item.sub}</p>
                </div>
                <span className="material-symbols-outlined text-outline-variant text-[20px]">
                  chevron_right
                </span>
              </button>
            ))}

            {/* Social media row */}
            <div className="bg-surface border border-outline-variant rounded-lg p-4 flex flex-col gap-3">
              <p className="font-label-md text-[10px] uppercase tracking-wider text-outline font-bold">
                Mạng xã hội
              </p>
              <div className="flex gap-3">
                {[
                  { icon: "public", label: "Website", url: "aovie.vn" },
                  { icon: "photo_camera", label: "Instagram", url: "@aovievn" },
                  { icon: "groups", label: "Facebook", url: "AoVie Official" },
                ].map((s, i) => (
                  <button
                    key={i}
                    onClick={() => alert(`Mở ${s.label}: ${s.url}`)}
                    className="flex-1 flex flex-col items-center gap-1.5 p-3 bg-surface-container-low rounded-lg hover:bg-secondary-fixed transition-colors active:scale-95"
                  >
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      {s.icon}
                    </span>
                    <span className="font-label-md text-[9px] uppercase tracking-wider text-on-surface-variant">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
