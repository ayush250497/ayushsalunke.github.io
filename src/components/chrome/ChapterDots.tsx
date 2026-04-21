import { useEffect, useState } from "react";
import { scrollTo } from "../../lib/motion";

const TILES = [
  { id: "#hero", label: "Hero", accent: "#0a84ff" },
  { id: "#stats", label: "Impact", accent: "#30d158" },
  { id: "#now", label: "Now", accent: "#5e5ce6" },
  { id: "#experience", label: "Experience", accent: "#0b2545" },
  { id: "#skills", label: "Skills", accent: "#ff375f" },
  { id: "#pothole", label: "Pothole", accent: "#ff9f0a" },
  { id: "#projedu", label: "Projects + Edu", accent: "#64d2ff" },
  { id: "#contact", label: "Contact", accent: "#0a84ff" },
];

export function ChapterDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    TILES.forEach((tile, i) => {
      const el = document.querySelector(tile.id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(i);
          });
        },
        { threshold: 0.45 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {TILES.map((t, i) => (
        <button
          key={t.id}
          onClick={() => scrollTo(t.id)}
          aria-label={`Jump to ${t.label}`}
          aria-current={active === i}
          data-cursor="hover"
          className="group relative h-3 w-3 grid place-items-center"
        >
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: active === i ? 10 : 6,
              height: active === i ? 10 : 6,
              background: active === i ? t.accent : "rgba(255,255,255,0.35)",
            }}
          />
          <span className="absolute right-5 text-[10px] font-mono tracking-widest uppercase text-light/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}
