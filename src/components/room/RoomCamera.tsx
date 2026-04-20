import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  characterRef: React.RefObject<THREE.Group | null>;
  locked: boolean;
}

const OFFSET = new THREE.Vector3(0, 4.5, 7);
const LERP_SPEED = 5;

export function RoomCamera({ characterRef, locked }: Props) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    if (!characterRef.current || locked) return;
    const target = characterRef.current.position.clone().add(OFFSET);
    camera.position.lerp(target, LERP_SPEED * delta);
    const lookAt = characterRef.current.position.clone().add(new THREE.Vector3(0, 0.8, 0));
    camera.lookAt(lookAt);
  });

  return null;
}
