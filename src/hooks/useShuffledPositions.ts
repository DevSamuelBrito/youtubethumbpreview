import { useMemo } from "react";
import { shuffleArray } from "@/lib/utils";

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
