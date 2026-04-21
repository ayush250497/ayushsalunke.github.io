import { useEffect } from "react";
import { initCustomCursor } from "../../lib/cursor";
import { useReducedMotion } from "../../lib/useReducedMotion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  useEffect(() => initCustomCursor(reduced), [reduced]);
  return null;
}
