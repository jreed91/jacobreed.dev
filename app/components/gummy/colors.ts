// Candy colours for J-a-c-o-b: cherry, tangerine, lemon, lime, blueberry.
export const GUMMY_COLORS = ["#ff4d6d", "#ff8a3d", "#ffc93c", "#2fd38a", "#4d7cff"];

/** Mixes a #rrggbb colour towards white (amount > 0) or black (amount < 0). */
export function tint(hex: string, amount: number, alpha = 1): string {
  const n = parseInt(hex.slice(1), 16);
  const target = amount > 0 ? 255 : 0;
  const t = Math.abs(amount);
  const mix = (c: number) => Math.round(c + (target - c) * t);
  return `rgba(${mix(n >> 16)}, ${mix((n >> 8) & 255)}, ${mix(n & 255)}, ${alpha})`;
}
