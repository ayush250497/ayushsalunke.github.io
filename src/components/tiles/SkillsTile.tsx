import { useEffect, useRef } from "react";
import { skillCategories } from "../../data/resume";
import { gsap, ScrollTrigger } from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";

export function SkillsTile() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;

    const ctx = gsap.context(() => {
      const marquees = ref.current!.querySelectorAll<HTMLElement>("[data-marquee]");
      marquees.forEach((el, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        gsap.set(el, { xPercent: direction === -1 ? 0 : -50 });
        const tween = gsap.to(el, {
          xPercent: direction === -1 ? -50 : 0,
          ease: "none",
          duration: 40,
          repeat: -1,
        });

        ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity() / 2000), 4);
            tween.timeScale(1 + v);
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative bg-light text-ink py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-skills mb-4">
          Stack
        </p>
        <h2 className="display text-[clamp(2.5rem,7vw,5.5rem)] font-bold text-ink max-w-4xl">
          Tools I reach for without thinking.
        </h2>
      </div>
      <div className="space-y-8">
        {skillCategories.map((cat) => {
          const doubled = [...cat.items, ...cat.items];
          return (
            <div key={cat.name} className="relative">
              <div className="max-w-6xl mx-auto px-6 mb-3">
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mute">
                  {cat.name}
                </p>
              </div>
              <div className="overflow-hidden">
                <div
                  data-marquee
                  className="flex gap-4 whitespace-nowrap"
                  style={{ width: "max-content", willChange: "transform" }}
                >
                  {doubled.map((chip, i) => (
                    <span
                      key={`${chip.name}-${i}`}
                      className="group inline-flex items-center gap-3 px-6 py-3 border border-ink/10 rounded-full text-ink text-base md:text-xl font-medium bg-paper hover:bg-skills hover:text-light hover:border-skills transition-colors"
                      data-cursor="hover"
                    >
                      <img
                        src={chip.slug.startsWith("/") ? `${import.meta.env.BASE_URL}${chip.slug.slice(1)}` : `https://cdn.simpleicons.org/${chip.slug}`}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className="w-5 h-5 md:w-6 md:h-6 object-contain transition-[filter] group-hover:brightness-0 group-hover:invert"
                        onError={(ev) => ((ev.currentTarget.style.display = "none"))}
                      />
                      <span>{chip.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
