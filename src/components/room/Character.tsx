import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  groupRef: React.RefObject<THREE.Group | null>;
  isMoving: boolean;
}

export function Character({ groupRef, isMoving }: Props) {
  const legL = useRef<THREE.Mesh>(null);
  const legR = useRef<THREE.Mesh>(null);
  const armL = useRef<THREE.Mesh>(null);
  const armR = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    if (!isMoving) return;
    t.current += delta * 8;
    const swing = Math.sin(t.current) * 0.4;
    if (legL.current) legL.current.rotation.x = swing;
    if (legR.current) legR.current.rotation.x = -swing;
    if (armL.current) armL.current.rotation.x = -swing * 0.6;
    if (armR.current) armR.current.rotation.x = swing * 0.6;
  });

  return (
    <group ref={groupRef} position={[0, 0, 3]}>
      {/* Body */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.35, 0.5, 0.2]} />
        <meshStandardMaterial color="#C3E41D" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#f5c5a3" />
      </mesh>
      {/* Left leg */}
      <mesh ref={legL} position={[-0.1, 0.35, 0]}>
        <boxGeometry args={[0.12, 0.35, 0.12]} />
        <meshStandardMaterial color="#3a3a5c" />
      </mesh>
      {/* Right leg */}
      <mesh ref={legR} position={[0.1, 0.35, 0]}>
        <boxGeometry args={[0.12, 0.35, 0.12]} />
        <meshStandardMaterial color="#3a3a5c" />
      </mesh>
      {/* Left arm */}
      <mesh ref={armL} position={[-0.24, 0.78, 0]}>
        <boxGeometry args={[0.1, 0.32, 0.1]} />
        <meshStandardMaterial color="#C3E41D" />
      </mesh>
      {/* Right arm */}
      <mesh ref={armR} position={[0.24, 0.78, 0]}>
        <boxGeometry args={[0.1, 0.32, 0.1]} />
        <meshStandardMaterial color="#C3E41D" />
      </mesh>
    </group>
  );
}
