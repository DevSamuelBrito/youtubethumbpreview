import { useMemo } from "react";
import { shuffleArray } from "@/lib/utils";

/**
 * Shuffles only the first `poolSize` slots among themselves, leaving
 * everything from `poolSize` onward (the "mostrar mais" tail) in its
 * original order — so real thumbnails, always placed within the pool,
 * can never land hidden behind "Mostrar mais".
 */
export function useShuffledPositions(
  slotCount: number,
  poolSize: number,
  shuffleSeed: number,
): number[] {
  return useMemo(() => {
    const identity = Array.from({ length: slotCount }, (_, i) => i);
    if (shuffleSeed === 0) return identity;

    const pool = shuffleArray(identity.slice(0, poolSize));
    const rest = identity.slice(poolSize);
    return [...pool, ...rest];
  }, [slotCount, poolSize, shuffleSeed]);
}
