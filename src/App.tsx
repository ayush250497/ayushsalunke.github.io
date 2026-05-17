import { useEffect } from "react";
import { initSmoothScroll, ScrollTrigger } from "./lib/motion";
import { useReducedMotion } from "./lib/useReducedMotion";
import { TopNav } from "./components/chrome/TopNav";
import { ChapterDots } from "./components/chrome/ChapterDots";
import { CustomCursor } from "./components/chrome/CustomCursor";
import { HeroTile } from "./components/tiles/HeroTile";
import { StatsTile } from "./components/tiles/StatsTile";
import { NowTile } from "./components/tiles/NowTile";
import { AgentTeamTile } from "./components/tiles/AgentTeamTile";
import { ExperienceTile } from "./components/tiles/ExperienceTile";
import { SkillsTile } from "./components/tiles/SkillsTile";
import { PotholeTile } from "./components/tiles/PotholeTile";
import { ProjectEduTile } from "./components/tiles/ProjectEduTile";
import { ContactTile } from "./components/tiles/ContactTile";

export default function App() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const dispose = initSmoothScroll(reduced);
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(refreshTimer);
      dispose();
    };
  }, [reduced]);

  return (
    <>
      <CustomCursor />
      <TopNav />
      <ChapterDots />
      <main>
        <HeroTile />
        <StatsTile />
        <NowTile />
        <AgentTeamTile />
        <ExperienceTile />
        <SkillsTile />
        <PotholeTile />
        <ProjectEduTile />
        <ContactTile />
      </main>
    </>
  );
}
