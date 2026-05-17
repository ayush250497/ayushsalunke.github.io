import { motion } from "framer-motion";
import { agentTeam } from "../../data/resume";
import { useReducedMotion } from "../../lib/useReducedMotion";

export function AgentTeamTile() {
  const reduced = useReducedMotion();
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const dur = reduced ? 0.15 : 0.7;

  return (
    <section
      id="agents"
      className="relative min-h-screen overflow-hidden flex items-center py-32"
      style={{
        background:
          "linear-gradient(160deg, #0a0a0a 0%, #1a0b2e 65%, #2d1b4e 115%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 15% 25%, rgba(191,90,242,0.35), transparent 55%), radial-gradient(circle at 85% 75%, rgba(10,132,255,0.22), transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: dur, ease }}
          className="font-mono text-[11px] tracking-[0.25em] uppercase text-agents mb-4"
        >
          {agentTeam.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: dur, delay: 0.05, ease }}
          className="display text-[clamp(2.25rem,6vw,4.75rem)] font-bold text-light max-w-4xl"
        >
          {agentTeam.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: dur, delay: 0.1, ease }}
          className="mt-7 text-lg md:text-xl text-light/80 leading-relaxed max-w-3xl"
        >
          {agentTeam.blurb}
        </motion.p>

        <div className="mt-14 grid lg:grid-cols-2 gap-10">
          <ul className="space-y-5">
            {agentTeam.agents.map((a, i) => (
              <motion.li
                key={a.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: dur,
                  delay: reduced ? 0 : 0.08 * i,
                  ease,
                }}
                className="flex gap-4"
              >
                <span
                  aria-hidden
                  className="font-mono text-agents text-xs pt-1.5 shrink-0"
                >
                  0{i + 1}
                </span>
                <div>
                  <p className="font-mono text-sm text-light">{a.name}</p>
                  <p className="mt-1 text-light/65 leading-relaxed">
                    {a.role}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: dur, delay: 0.15, ease }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-2xl border border-agents/25 bg-black/40 backdrop-blur-sm p-6">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-light/45 mb-4">
                Use
              </p>
              <div className="space-y-5">
                {agentTeam.usage.map((u) => (
                  <div key={u.cmd}>
                    <code className="block font-mono text-[13px] text-agents/90 break-words">
                      <span className="text-light/35 select-none">$ </span>
                      {u.cmd}
                    </code>
                    <p className="mt-1.5 font-mono text-[11px] text-light/45">
                      → {u.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-light/45 mb-3">
                Skilled across
              </p>
              <ul className="flex flex-wrap gap-2">
                {agentTeam.integrations.map((s) => (
                  <li
                    key={s}
                    className="font-mono text-[11px] uppercase tracking-widest border border-light/20 text-light/70 rounded-full px-3 py-1"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
