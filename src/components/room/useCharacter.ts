import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SPEED = 4;
const ROOM_BOUNDS = { x: 7, z: 7 };

export function useCharacter(locked = false) {
  const ref = useRef<THREE.Group>(null);
  const keys = useRef<Record<string, boolean>>({});
  const velocity = useRef(new THREE.Vector3());

  useEffect(() => {
    const down = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true; };
    const up = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current || locked) return;
    const k = keys.current;
    const dir = new THREE.Vector3();
    if (k["w"] || k["arrowup"]) dir.z -= 1;
    if (k["s"] || k["arrowdown"]) dir.z += 1;
    if (k["a"] || k["arrowleft"]) dir.x -= 1;
    if (k["d"] || k["arrowright"]) dir.x += 1;
    if (dir.length() > 0) {
      dir.normalize();
      ref.current.rotation.y = Math.atan2(dir.x, dir.z);
    }
    velocity.current.lerp(dir.multiplyScalar(SPEED), 0.15);
    ref.current.position.x = THREE.MathUtils.clamp(
      ref.current.position.x + velocity.current.x * delta,
      -ROOM_BOUNDS.x, ROOM_BOUNDS.x
    );
    ref.current.position.z = THREE.MathUtils.clamp(
      ref.current.position.z + velocity.current.z * delta,
      -ROOM_BOUNDS.z, ROOM_BOUNDS.z
    );
  });

  return ref;
}
