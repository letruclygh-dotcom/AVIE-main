export default function LoginFooter() {
  return (
    <footer className="py-8 px-container-padding flex flex-col items-center gap-4 border-t border-outline-variant/30">
      <p className="font-label-md text-label-md text-primary/80 uppercase tracking-[0.15em] mb-2 italic">
        Thời trang mang tinh thần Việt
      </p>
      <div className="flex gap-6">
        <a className="text-outline hover:text-primary transition-colors" href="#">
          <span className="material-symbols-outlined text-[20px]">public</span>
        </a>
        <a className="text-outline hover:text-primary transition-colors" href="#">
          <span className="material-symbols-outlined text-[20px]">mail</span>
        </a>
        <a className="text-outline hover:text-primary transition-colors" href="#">
          <span className="material-symbols-outlined text-[20px]">share</span>
        </a>
      </div>
      <p className="font-label-md text-label-md text-outline uppercase tracking-widest">© 2024 AOVIE&nbsp;</p>
    </footer>
  );
}

