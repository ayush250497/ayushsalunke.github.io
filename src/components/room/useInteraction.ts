import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type ObjectId = "monitor" | "phone" | "bookshelf" | "whiteboard" | "trophy" | "degree-scu" | "degree-vit";

interface InteractableObject {
  id: ObjectId;
  position: THREE.Vector3;
  radius: number;
}

const INTERACT_DISTANCE = 2.2;

export function useInteraction(
  characterRef: React.RefObject<THREE.Group | null>,
  objects: InteractableObject[]
) {
  const [nearObject, setNearObject] = useState<ObjectId | null>(null);
  const [openPanel, setOpenPanel] = useState<ObjectId | null>(null);
  const [panelLocked, setPanelLocked] = useState(false);

  useFrame(() => {
    if (!characterRef.current || panelLocked) return;
    const pos = characterRef.current.position;
    let closest: ObjectId | null = null;
    let closestDist = Infinity;
    for (const obj of objects) {
      const d = pos.distanceTo(obj.position);
      if (d < obj.radius && d < closestDist) {
        closest = obj.id;
        closestDist = d;
      }
    }
    setNearObject(closest);
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "e" && nearObject && !openPanel) {
        setOpenPanel(nearObject);
        setPanelLocked(true);
      }
      if (e.key === "Escape" && openPanel) {
        setOpenPanel(null);
        setPanelLocked(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [nearObject, openPanel]);

  const closePanel = () => {
    setOpenPanel(null);
    setPanelLocked(false);
  };

  return { nearObject, openPanel, closePanel, INTERACT_DISTANCE };
}
