import { useEffect, useRef } from "react";
import { experiences } from "../../data/resume";
import { gsap, ScrollTrigger } from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";

export function ExperienceTile() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !railRef.current || reduced) return;

    const ctx = gsap.context(() => {
      const panels = railRef.current!.querySelectorAll<HTMLElement>("[data-panel]");
      const totalTravel = (panels.length - 1) * window.innerWidth;

      gsap.to(railRef.current, {
        x: -totalTravel,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${panels.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel) => {
        const items = panel.querySelectorAll<HTMLElement>("[data-achievement]");
        items.forEach((item, idx) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.15 + idx * 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "left center",
                end: "right center",
                containerAnimation: ScrollTrigger.getAll().find((t) => t.pin === sectionRef.current)?.animation,
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen bg-dark text-light overflow-hidden"
    >
      <div className="absolute top-8 left-6 right-6 z-10 max-w-6xl mx-auto flex justify-between items-center">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-light/50">
          Experience · 2018 — Now
        </p>
        <p className="font-mono text-[10px] tracking-widest uppercase text-light/30 hidden md:block">
          scroll →
        </p>
      </div>
      <div
        ref={railRef}
        className="flex h-screen"
        style={{ width: `${experiences.length * 100}vw`, willChange: "transform" }}
      >
        {experiences.map((e) => (
          <article
            key={`${e.company}-${e.start}`}
            data-panel
            className="relative w-screen h-screen shrink-0 flex items-center"
            style={{ background: e.accent }}
          >
            <div className="max-w-6xl mx-auto px-8 w-full">
              <div
                data-achievement
                className="flex items-center gap-4 mb-6"
              >
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-light/10 backdrop-blur-sm border border-light/15 overflow-hidden shrink-0">
                  <img
                    src={e.logo.startsWith("/") ? `${import.meta.env.BASE_URL}${e.logo.slice(1)}` : e.logo}
                    alt={`${e.company} logo`}
                    loading="lazy"
                    className="w-10 h-10 object-contain"
                    onError={(ev) => ((ev.currentTarget.style.display = "none"))}
                  />
                </span>
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-light/60">
                  {e.start} → {e.end}
                </p>
              </div>
              <h3
                data-achievement
                className="display text-[clamp(2.5rem,8vw,7rem)] font-bold text-light"
              >
                {e.company}
              </h3>
              <p
                data-achievement
                className="mt-2 text-xl md:text-2xl text-light/80"
              >
                {e.role}
              </p>
              <ul className="mt-12 space-y-4 max-w-2xl">
                {e.achievements.map((a, i) => (
                  <li
                    key={i}
                    data-achievement
                    className="flex gap-4 text-base md:text-lg text-light/90"
                  >
                    <span className="font-mono text-[11px] text-light/50 pt-1.5 shrink-0">
                      →
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
