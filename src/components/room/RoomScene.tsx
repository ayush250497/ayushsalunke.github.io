import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { Room } from "./Room";
import { Character } from "./Character";
import { RoomCamera } from "./RoomCamera";
import { ContentPanel } from "./ContentPanel";
import { HUD } from "./HUD";
import { useCharacter } from "./useCharacter";
import { ObjectId } from "./useInteraction";

const INTERACTABLES: { id: ObjectId; position: THREE.Vector3; radius: number }[] = [
  { id: "monitor", position: new THREE.Vector3(-5, 0, -4.5), radius: 2.5 },
  { id: "phone", position: new THREE.Vector3(-4.2, 0, -4.2), radius: 1.8 },
  { id: "bookshelf", position: new THREE.Vector3(6.2, 0, -5), radius: 2.5 },
  { id: "whiteboard", position: new THREE.Vector3(-6.8, 0, 0), radius: 2.5 },
  { id: "trophy", position: new THREE.Vector3(6.5, 0, 0), radius: 2.5 },
  { id: "degree-scu", position: new THREE.Vector3(2.5, 0, -7.5), radius: 2.5 },
  { id: "degree-vit", position: new THREE.Vector3(3.5, 0, -7.5), radius: 2.5 },
];

interface SceneProps {
  onNear: (id: ObjectId | null) => void;
  onInteract: (id: ObjectId) => void;
  panelOpen: boolean;
}

function Scene({ onNear, onInteract, panelOpen }: SceneProps) {
  const characterRef = useCharacter(panelOpen);
  const lastNear = useRef<ObjectId | null>(null);
  const [localNear, setLocalNear] = useState<ObjectId | null>(null);
  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      keys.current[k] = true;
      if (k === "e" && lastNear.current && !panelOpen) {
        onInteract(lastNear.current);
      }
    };
    const up = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [panelOpen, onInteract]);

  useFrame(() => {
    if (!characterRef.current || panelOpen) return;
    const pos = characterRef.current.position;
    let closest: ObjectId | null = null;
    let closestDist = Infinity;
    for (const obj of INTERACTABLES) {
      const d = pos.distanceTo(obj.position);
      if (d < obj.radius && d < closestDist) {
        closest = obj.id;
        closestDist = d;
      }
    }
    if (closest !== lastNear.current) {
      lastNear.current = closest;
      setLocalNear(closest);
      onNear(closest);
    }
  });

  return (
    <>
      <RoomCamera characterRef={characterRef} locked={panelOpen} />
      <ambientLight intensity={0.35} color="#ffe8a0" />
      <directionalLight position={[2, 8, 4]} intensity={0.9} castShadow color="#fff5e0"
        shadow-mapSize={[1024, 1024]} shadow-camera-near={0.5} shadow-camera-far={30}
        shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottom={-10}
      />
      <Room nearObject={localNear} onObjectClick={() => {}} />
      <Character groupRef={characterRef} isMoving={!panelOpen} />
    </>
  );
}

export function RoomScene({ onClose }: { onClose?: () => void }) {
  const [nearObject, setNearObject] = useState<ObjectId | null>(null);
  const [openPanel, setOpenPanel] = useState<ObjectId | null>(null);

  const handleInteract = useCallback((id: ObjectId) => {
    setOpenPanel(id);
  }, []);

  const handleClose = useCallback(() => {
    setOpenPanel(null);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  return (
    <div style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", background: "#1c1917", zIndex: 30 }}>
      <Canvas
        shadows
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 4.5, 10], fov: 55 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      >
        <Scene
          onNear={setNearObject}
          onInteract={handleInteract}
          panelOpen={!!openPanel}
        />
      </Canvas>

      <ContentPanel openPanel={openPanel} onClose={handleClose} />
      <HUD nearObject={nearObject} panelOpen={!!openPanel} />

      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-4 left-4 z-50 text-stone-500 hover:text-stone-200 text-[11px] font-mono tracking-widest border border-stone-700 px-3 py-1.5 rounded hover:border-stone-500 transition-colors bg-stone-950/80 backdrop-blur"
        >
          ← BACK
        </button>
      )}
    </div>
  );
}
