import { useNavigate } from "react-router-dom";

export default function RegisterHeader() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding h-14 bg-surface border-b border-outline-variant">
      <button
        className="flex items-center justify-center w-10 h-10 hover:opacity-80 transition-opacity"
        onClick={() => navigate(-1)}
        type="button"
      >
        <span className="material-symbols-outlined text-primary">arrow_back</span>
      </button>

      <div className="flex items-center justify-center flex-grow -ml-10">
        <img
          alt="AoVie Logo"
          className="w-auto object-contain h-10"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcIPD84yYr7rPbyV9aQoB_0-ohExBb9LqiCjjE9Alytn3BOY3XH0iwPNgndyadYouViu8xQ0lFZDNuQvy0f0A6r07Lo6DEsJvntOpS36k-2wXfBdL392dB0xTr7o1igh91hhU8tcevDyFlG5aF1i7vpt1zhT_rgFvM9GgC9jNAnc3O8ePnnFYkYOzNggpNulXxiXLEhbjIOwGGYAtJvn9Hj07dquNOVuzMX5eQnioAcs6YIEDhUpfjmQR-VMw2NGO8fMEZlMCAO5cQKLM"
        />
      </div>

      <div className="w-10" />
    </header>
  );
}

