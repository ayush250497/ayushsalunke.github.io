import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ObjectId } from "./useInteraction";
import { experience, skills, projects, achievements, education, contact } from "../../data/resume";

interface Props {
  openPanel: ObjectId | null;
  onClose: () => void;
}

const TAG_STYLE = "px-2 py-0.5 rounded text-[10px] border border-orange-500/30 bg-orange-500/10 text-orange-400";
const BULLET_STYLE = "text-[11px] text-stone-400 leading-relaxed";

function ExperiencePanel({ onClose }: { onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const job = experience[idx];
  return (
    <PanelWrapper title="EXPERIENCE" accent="#ff8c00" onClose={onClose}
      nav={{ current: idx + 1, total: experience.length, onPrev: () => setIdx(i => Math.max(0, i - 1)), onNext: () => setIdx(i => Math.min(experience.length - 1, i + 1)) }}>
      <h2 className="text-[15px] font-semibold text-stone-100 mb-0.5">{job.company}</h2>
      <p className="text-[12px] text-orange-400 mb-4">{job.role} · {job.period}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.tags.map(t => <span key={t} className={TAG_STYLE}>{t}</span>)}
      </div>
      <ul className="list-disc pl-4 space-y-1.5">
        {job.bullets.map((b, i) => <li key={i} className={BULLET_STYLE}>{b}</li>)}
      </ul>
    </PanelWrapper>
  );
}

function SkillsPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelWrapper title="TECHNICAL SKILLS" accent="#ff8c00" onClose={onClose}>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(skills).map(([cat, items]) => (
          <div key={cat}>
            <p className="text-[10px] text-yellow-500 tracking-widest mb-2">{cat.toUpperCase()}</p>
            <div className="flex flex-wrap gap-1.5">
              {items.map(s => (
                <span key={s} className="px-2 py-0.5 rounded text-[10px] border border-yellow-600/20 bg-yellow-900/10 text-stone-200">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PanelWrapper>
  );
}

function ProjectsPanel({ onClose }: { onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const proj = projects[idx];
  return (
    <PanelWrapper title="PROJECTS" accent="#ff8c00" onClose={onClose}
      nav={{ current: idx + 1, total: projects.length, onPrev: () => setIdx(i => Math.max(0, i - 1)), onNext: () => setIdx(i => Math.min(projects.length - 1, i + 1)) }}>
      <h2 className="text-[15px] font-semibold text-stone-100 mb-3">{proj.name}</h2>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {proj.tech.map(t => <span key={t} className={TAG_STYLE}>{t}</span>)}
      </div>
      <p className={BULLET_STYLE}>{proj.desc}</p>
    </PanelWrapper>
  );
}

function AchievementsPanel({ onClose }: { onClose: () => void }) {
  return (
    <PanelWrapper title="ACHIEVEMENTS" accent="#ffd700" onClose={onClose}>
      <div className="space-y-3">
        {achievements.map((a, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-base flex-shrink-0">{a.icon}</span>
            <div>
              <span className="text-stone-100 text-[12px] font-semibold">{a.metric}</span>
              <span className="text-stone-400 text-[11px]"> {a.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </PanelWrapper>
  );
}

function DegreePanel({ id, onClose }: { id: "degree-scu" | "degree-vit"; onClose: () => void }) {
  const deg = id === "degree-scu" ? education[0] : education[1];
  return (
    <PanelWrapper title="EDUCATION" accent="#ff8c00" onClose={onClose}>
      <h2 className="text-[16px] font-semibold text-stone-100 mb-1">{deg.degree}</h2>
      <p className="text-[13px] text-orange-400 mb-1">{deg.field}</p>
      <p className="text-[11px] text-yellow-700 mb-4">{deg.school}</p>
      <span className="px-3 py-1 rounded text-[11px] border border-yellow-500/30 bg-yellow-900/10 text-yellow-400">
        GPA: {deg.gpa}
      </span>
    </PanelWrapper>
  );
}

function ContactPanel({ onClose }: { onClose: () => void }) {
  const items = [
    { label: "Email", value: contact.email, icon: "📧" },
    { label: "LinkedIn", value: contact.linkedin, icon: "💼" },
    { label: "GitHub", value: contact.github, icon: "💻" },
    { label: "Phone", value: contact.phone, icon: "📱" },
  ];
  return (
    <PanelWrapper title="CONTACT" accent="#ff8c00" onClose={onClose}>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.label} className="flex gap-3 items-center">
            <span className="text-base">{item.icon}</span>
            <div>
              <p className="text-[10px] text-stone-500 tracking-widest">{item.label}</p>
              <p className="text-[12px] text-stone-200">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </PanelWrapper>
  );
}

interface NavProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

function PanelWrapper({
  title,
  accent,
  onClose,
  nav,
  children,
}: {
  title: string;
  accent: string;
  onClose: () => void;
  nav?: NavProps;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative bg-stone-950/95 border border-yellow-900/40 rounded-xl p-5 shadow-2xl backdrop-blur-xl w-[340px] max-h-[80vh] overflow-y-auto"
      style={{ boxShadow: `0 0 40px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(139,105,20,0.2)` }}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-[11px] tracking-[0.25em] font-mono" style={{ color: accent }}>{title}</span>
        <div className="flex items-center gap-3">
          {nav && (
            <div className="flex items-center gap-1 text-stone-500 text-[11px]">
              <button onClick={nav.onPrev} className="hover:text-orange-400 transition-colors"><ChevronLeft size={14} /></button>
              <span>{nav.current} / {nav.total}</span>
              <button onClick={nav.onNext} className="hover:text-orange-400 transition-colors"><ChevronRight size={14} /></button>
            </div>
          )}
          <button onClick={onClose} className="text-stone-500 hover:text-stone-200 transition-colors"><X size={16} /></button>
        </div>
      </div>
      {children}
      <p className="mt-4 text-[10px] text-stone-600 font-mono">Press ESC to close</p>
    </div>
  );
}

export function ContentPanel({ openPanel, onClose }: Props) {
  return (
    <AnimatePresence>
      {openPanel && (
        <motion.div
          key={openPanel}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="pointer-events-auto">
            {openPanel === "monitor" && <ExperiencePanel onClose={onClose} />}
            {openPanel === "phone" && <ContactPanel onClose={onClose} />}
            {openPanel === "bookshelf" && <SkillsPanel onClose={onClose} />}
            {openPanel === "whiteboard" && <ProjectsPanel onClose={onClose} />}
            {openPanel === "trophy" && <AchievementsPanel onClose={onClose} />}
            {(openPanel === "degree-scu" || openPanel === "degree-vit") && (
              <DegreePanel id={openPanel} onClose={onClose} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
