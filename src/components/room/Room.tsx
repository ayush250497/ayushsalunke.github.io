import { useRef } from "react";
import * as THREE from "three";
import { ObjectId } from "./useInteraction";

const WALL = "#2a1f14";
const FLOOR = "#3d2b1a";
const TRIM = "#8b6914";
const GLOW = "#ff8c00";

interface Props {
  nearObject: ObjectId | null;
  onObjectClick: (id: ObjectId) => void;
}

function InteractGlow({ active }: { active: boolean }) {
  return (
    <pointLight
      intensity={active ? 1.5 : 0}
      distance={1.5}
      color="#ff8c00"
    />
  );
}

function Desk({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <group position={[-5, 0, -5]}>
      <InteractGlow active={active} />
      {/* Desk surface */}
      <mesh position={[0, 0.7, 0]} onClick={onClick} castShadow>
        <boxGeometry args={[2.2, 0.08, 1]} />
        <meshStandardMaterial color="#5c3d1e" roughness={0.4} />
      </mesh>
      {/* Legs */}
      {[[-0.95, -0.5], [0.95, -0.5], [-0.95, 0.45], [0.95, 0.45]].map(([x, z], i) => (
        <mesh key={i} position={[x as number, 0.35, z as number]}>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#3d2510" />
        </mesh>
      ))}
      {/* Monitor */}
      <mesh position={[0, 1.3, -0.3]} onClick={onClick}>
        <boxGeometry args={[0.9, 0.55, 0.04]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.3, -0.28]}>
        <boxGeometry args={[0.84, 0.49, 0.01]} />
        <meshStandardMaterial color="#0a1628" emissive="#1a3a6a" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.95, -0.28]}>
        <boxGeometry args={[0.06, 0.28, 0.04]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Keyboard */}
      <mesh position={[0, 0.75, 0.1]}>
        <boxGeometry args={[0.6, 0.02, 0.22]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      {/* Phone */}
      <mesh position={[0.7, 0.76, 0.2]} onClick={onClick}>
        <boxGeometry args={[0.1, 0.18, 0.01]} />
        <meshStandardMaterial color="#111" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0.7, 0.76, 0.195]}>
        <boxGeometry args={[0.085, 0.155, 0.005]} />
        <meshStandardMaterial color="#0a2040" emissive="#0a2040" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function Bookshelf({ active, onClick }: { active: boolean; onClick: () => void }) {
  const colors = ["#8b2500", "#1a4a8b", "#1a6b2f", "#5c3d1e", "#6b1a4a"];
  return (
    <group position={[6.2, 0, -5]} onClick={onClick}>
      <InteractGlow active={active} />
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.7, 3, 0.4]} />
        <meshStandardMaterial color="#3d2510" roughness={0.8} />
      </mesh>
      {[0.3, 0.9, 1.5, 2.1, 2.7].map((y, shelf) => (
        <group key={shelf}>
          <mesh position={[0, y, 0.02]}>
            <boxGeometry args={[0.65, 0.03, 0.35]} />
            <meshStandardMaterial color="#5c3d1e" />
          </mesh>
          {Array.from({ length: 4 }).map((_, b) => (
            <mesh key={b} position={[-0.22 + b * 0.14, y + 0.12, 0.03]}>
              <boxGeometry args={[0.1, 0.22 + Math.random() * 0.06, 0.28]} />
              <meshStandardMaterial color={colors[(shelf * 4 + b) % colors.length]} roughness={0.9} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Whiteboard({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <group position={[-6.8, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} onClick={onClick}>
      <InteractGlow active={active} />
      <mesh castShadow>
        <boxGeometry args={[2.2, 1.3, 0.05]} />
        <meshStandardMaterial color="#fffff0" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[2.0, 1.1, 0.01]} />
        <meshStandardMaterial color="#f8f8f0" roughness={1} />
      </mesh>
      {/* Frame */}
      {[
        [0, 0.67, 0, 2.2, 0.06, 0.06],
        [0, -0.67, 0, 2.2, 0.06, 0.06],
        [1.1, 0, 0, 0.06, 1.3, 0.06],
        [-1.1, 0, 0, 0.06, 1.3, 0.06],
      ].map(([x, y, z, w, h, d], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]}>
          <boxGeometry args={[w as number, h as number, d as number]} />
          <meshStandardMaterial color={TRIM} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function TrophyCabinet({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <group position={[6.5, 0, 0]} onClick={onClick}>
      <InteractGlow active={active} />
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[0.8, 2, 0.5]} />
        <meshStandardMaterial color="#3d2510" roughness={0.7} />
      </mesh>
      {/* Glass door */}
      <mesh position={[0, 1, 0.26]}>
        <boxGeometry args={[0.72, 1.9, 0.02]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.2} roughness={0} metalness={0.1} />
      </mesh>
      {/* Trophy */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.35, 8]} />
        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.72, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Medals */}
      {[-0.2, 0, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 0.7, 0.15]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 8]} />
          <meshStandardMaterial color={["#ffd700", "#c0c0c0", "#cd7f32"][i]} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function DegreeFrame({
  position,
  label,
  active,
  onClick,
}: {
  position: [number, number, number];
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <group position={position} onClick={onClick}>
      <InteractGlow active={active} />
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[0.55, 0.72, 0.04]} />
        <meshStandardMaterial color="#5c3d1e" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Mat */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.47, 0.64, 0.01]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.9} />
      </mesh>
      {/* Inner content area */}
      <mesh position={[0, 0, 0.025]}>
        <boxGeometry args={[0.38, 0.52, 0.005]} />
        <meshStandardMaterial color="#fffdf5" roughness={1} />
      </mesh>
      {/* Nail */}
      <mesh position={[0, 0.38, 0.03]}>
        <cylinderGeometry args={[0.01, 0.008, 0.04, 6]} />
        <meshStandardMaterial color={TRIM} metalness={0.9} />
      </mesh>
    </group>
  );
}

function Carpet() {
  return (
    <group>
      <mesh position={[0, 0.005, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.02, 2.5]} />
        <meshStandardMaterial color="#8b2200" roughness={1} />
      </mesh>
      {/* Border */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[3.2, 0.015, 2.2]} />
        <meshStandardMaterial color="#6b1800" roughness={1} />
      </mesh>
      {/* Inner pattern */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[2.6, 0.01, 1.6]} />
        <meshStandardMaterial color="#7a1e00" roughness={1} />
      </mesh>
    </group>
  );
}

export function Room({ nearObject, onObjectClick }: Props) {
  const wallMat = { color: WALL, roughness: 0.9 };
  const floorMat = { color: FLOOR, roughness: 0.8 };

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial {...floorMat} />
      </mesh>

      {/* Floor planks lines */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-7.5 + i, 0.001, 0]}>
          <planeGeometry args={[0.02, 16]} />
          <meshStandardMaterial color="#2a1a0a" />
        </mesh>
      ))}

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#1a130a" roughness={1} />
      </mesh>

      {/* North wall */}
      <mesh position={[0, 2.5, -8]}>
        <boxGeometry args={[16, 5, 0.2]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      {/* South wall */}
      <mesh position={[0, 2.5, 8]}>
        <boxGeometry args={[16, 5, 0.2]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      {/* West wall */}
      <mesh position={[-8, 2.5, 0]}>
        <boxGeometry args={[0.2, 5, 16]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      {/* East wall */}
      <mesh position={[8, 2.5, 0]}>
        <boxGeometry args={[0.2, 5, 16]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      {/* Baseboard trim */}
      {[
        [0, 0.1, -7.9, 16, 0.2, 0.1, 0],
        [0, 0.1, 7.9, 16, 0.2, 0.1, 0],
        [-7.9, 0.1, 0, 0.1, 0.2, 16, 0],
        [7.9, 0.1, 0, 0.1, 0.2, 16, 0],
      ].map(([x, y, z, w, h, d], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]}>
          <boxGeometry args={[w as number, h as number, d as number]} />
          <meshStandardMaterial color={TRIM} roughness={0.4} metalness={0.3} />
        </mesh>
      ))}

      {/* Window — north wall */}
      <mesh position={[-1.5, 2.8, -7.85]}>
        <boxGeometry args={[1.4, 1.8, 0.12]} />
        <meshStandardMaterial color="#5c3d1e" roughness={0.6} />
      </mesh>
      <mesh position={[-1.5, 2.8, -7.84]}>
        <boxGeometry args={[1.15, 1.55, 0.05]} />
        <meshStandardMaterial color="#88ddff" transparent opacity={0.3} roughness={0} />
      </mesh>
      {/* Window light */}
      <pointLight position={[-1.5, 2.8, -7]} intensity={2} distance={6} color="#ffe8a0" />

      {/* Lamp */}
      <group position={[2, 0, -5.5]}>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
          <meshStandardMaterial color="#5c3d1e" />
        </mesh>
        <mesh position={[0, 1.3, 0]}>
          <coneGeometry args={[0.18, 0.28, 8, 1, true]} />
          <meshStandardMaterial color="#d4a853" side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0, 1.2, 0]} intensity={2} distance={5} color="#ffcc66" castShadow />
      </group>

      <Carpet />

      <Desk active={nearObject === "monitor" || nearObject === "phone"} onClick={() => onObjectClick("monitor")} />
      <Bookshelf active={nearObject === "bookshelf"} onClick={() => onObjectClick("bookshelf")} />
      <Whiteboard active={nearObject === "whiteboard"} onClick={() => onObjectClick("whiteboard")} />
      <TrophyCabinet active={nearObject === "trophy"} onClick={() => onObjectClick("trophy")} />

      {/* Degree frames on north wall */}
      <DegreeFrame
        position={[2.5, 2.5, -7.75]}
        label="SCU"
        active={nearObject === "degree-scu"}
        onClick={() => onObjectClick("degree-scu")}
      />
      <DegreeFrame
        position={[3.5, 2.5, -7.75]}
        label="VIT"
        active={nearObject === "degree-vit"}
        onClick={() => onObjectClick("degree-vit")}
      />
    </group>
  );
}
