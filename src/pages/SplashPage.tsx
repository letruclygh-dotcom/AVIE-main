import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically transition to homepage after 2.5 seconds
    const timer = setTimeout(() => {
      navigate("/trang-chu");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="relative h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden select-none">
      {/* Centered Logo Section */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center px-container-padding animate-[fadeInScale_1.2s_cubic-bezier(0.22,1,0.36,1)_forwards]">
          <img
            alt="AoVie Logo"
            className="w-full max-w-[260px] mx-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVSqvJ3ZUR3v1m0iqR6zSydy7VEpg2NnfFG0sdGmcec1NUjNh9Qd77zQePk6hZTuxOaMWHmwPZAgdfp8KME6-wKCQJBCXqOUsFS7j0estl5-3MNmnWJI72yQe940QRYnrQGbqx8p1zaxPFgmf9cNXiEtSJkkg6Fz_6OUUyGdkG11kcqWsuoUsJF3HjBChfQHG8BJ9-0IiGJS7e5Gsm5hr1sdQTvfuzGGWVOyut_8Z1BpEPBh5qN3PT4FgAPMIrumAYICb2C0nkPqKEhmM"
          />
          {/* Tagline */}
          <p className="font-label-md text-label-md text-on-surface-variant tracking-[0.15em] uppercase px-4 text-center max-w-xs leading-relaxed mt-5 opacity-0 animate-[subtleSlideUp_0.8s_cubic-bezier(0.22,1,0.36,1)_0.6s_forwards]">
            THỜI TRANG MANG TINH THẦN VIỆT
          </p>
        </div>
      </div>

      {/* Quiet Loading Dots */}
      <div className="absolute bottom-16 flex flex-col items-center gap-4 opacity-0 animate-[subtleSlideUp_0.8s_cubic-bezier(0.22,1,0.36,1)_1s_forwards]">
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-[pulse_1.5s_infinite_ease-in-out]" />
          <div
            className="w-1.5 h-1.5 bg-secondary rounded-full animate-[pulse_1.5s_infinite_ease-in-out]"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-1.5 h-1.5 bg-secondary rounded-full animate-[pulse_1.5s_infinite_ease-in-out]"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>

      {/* Inline styles for keyframes to keep file self-contained and clean */}
      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes subtleSlideUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
