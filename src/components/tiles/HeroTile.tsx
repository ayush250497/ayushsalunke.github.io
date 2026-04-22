import { useEffect, useRef } from "react";
import { profile } from "../../data/resume";
import { gsap, ScrollTrigger } from "../../lib/motion";
import { useReducedMotion } from "../../lib/useReducedMotion";

export function HeroTile() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !nameRef.current) return;

    if (reduced) {
      gsap.set([nameRef.current.children, roleRef.current, taglineRef.current], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const letters = nameRef.current!.querySelectorAll("[data-letter]");
      gsap.set(letters, { y: 60, opacity: 0 });
      gsap.set([roleRef.current, taglineRef.current], { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });
      tl.to(letters, { y: 0, opacity: 1, stagger: 0.05, duration: 0.8 })
        .to(roleRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=50%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        animation: gsap.to([nameRef.current, roleRef.current, taglineRef.current], {
          y: -80,
          opacity: 0.2,
        }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const letters = profile.name.split("");

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-dark text-light flex items-center justify-center overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(10,132,255,0.35), transparent 50%), radial-gradient(circle at 70% 70%, rgba(94,92,230,0.25), transparent 55%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <img
          src={`${import.meta.env.BASE_URL}images/ayush.jpg`}
          alt={profile.name}
          loading="eager"
          className="mb-8 w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border border-light/15 shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
        />
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-hero mb-6">
          Senior Software Engineer · JPMorgan Chase
        </p>
        <h1
          ref={nameRef}
          className="display text-[clamp(2.5rem,10vw,8rem)] font-bold whitespace-nowrap"
          style={{ letterSpacing: "-0.04em" }}
          aria-label={profile.name}
        >
          {letters.map((c, i) => (
            <span
              key={i}
              data-letter
              aria-hidden
              className="inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </h1>
        <p
          ref={roleRef}
          className="mt-8 text-xl md:text-2xl text-light/80 max-w-2xl"
        >
          {profile.role} shipping infra that shaves hours off every release.
        </p>
        <p
          ref={taglineRef}
          className="mt-4 text-base md:text-lg text-mute max-w-xl font-mono"
        >
          {profile.tagline}
        </p>
      </div>
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.3em] uppercase text-light/40"
      >
        scroll
      </div>
    </section>
  );
}
