import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PortfolioHero from "../components/ui/portfolio-hero";
import { RoomScene } from "./components/room/RoomScene";

export default function App() {
  const [inRoom, setInRoom] = useState(false);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Antic&display=swap"
      />
      <AnimatePresence mode="wait">
        {inRoom ? (
          <motion.div
            key="room"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <RoomScene onClose={() => setInRoom(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PortfolioHero onEnterRoom={() => setInRoom(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
