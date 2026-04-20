import { motion, AnimatePresence } from "framer-motion";
import { ObjectId } from "./useInteraction";

const LABELS: Record<ObjectId, string> = {
  monitor: "Work Experience",
  phone: "Contact",
  bookshelf: "Skills",
  whiteboard: "Projects",
  trophy: "Achievements",
  "degree-scu": "SCU Degree",
  "degree-vit": "VIT Degree",
};

interface Props {
  nearObject: ObjectId | null;
  panelOpen: boolean;
}

export function HUD({ nearObject, panelOpen }: Props) {
  return (
    <>
      {/* WASD hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none select-none z-40">
        {[["W"], ["A", "S", "D"]].map((row, i) => (
          <div key={i} className="flex gap-1">
            {row.map(k => (
              <kbd key={k} className="w-8 h-8 flex items-center justify-center rounded border border-stone-600 bg-stone-900/80 text-stone-400 text-[11px] font-mono backdrop-blur">
                {k}
              </kbd>
            ))}
          </div>
        ))}
      </div>

      {/* Press E prompt */}
      <AnimatePresence>
        {nearObject && !panelOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 translate-y-16 z-40 pointer-events-none select-none"
          >
            <div className="flex items-center gap-2 bg-stone-950/90 border border-orange-500/40 rounded-lg px-4 py-2.5 backdrop-blur shadow-xl">
              <kbd className="w-7 h-7 flex items-center justify-center rounded border border-orange-500/60 bg-orange-500/10 text-orange-400 text-[11px] font-mono font-bold">E</kbd>
              <span className="text-stone-300 text-[12px] font-mono">{LABELS[nearObject]}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
