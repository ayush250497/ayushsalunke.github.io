import { useEffect, useState } from "react";
import { scrollTo } from "../../lib/motion";

const LINKS = [
  { id: "#stats", label: "Impact" },
  { id: "#now", label: "Now" },
  { id: "#experience", label: "Experience" },
  { id: "#skills", label: "Skills" },
  { id: "#pothole", label: "Work" },
  { id: "#contact", label: "Contact" },
];

export function TopNav() {
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        shrunk
          ? "h-12 bg-dark/70 backdrop-blur-xl border-b border-white/5"
          : "h-16 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
        <button
          onClick={() => scrollTo("#hero")}
          className="text-light font-semibold tracking-tight text-sm"
          data-cursor="hover"
        >
          AS<span className="text-hero">.</span>
        </button>
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className="text-light/70 hover:text-light text-[13px] transition-colors"
                data-cursor="hover"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
