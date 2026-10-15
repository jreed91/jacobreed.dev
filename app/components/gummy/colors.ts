import { CANDY } from "app/utils/candy";

// One candy per letter of "Jacob": cherry, tangerine, lemon, lime, blueberry.
export const GUMMY_CANDY = CANDY.slice(0, 5);

// Fallbacks matching the --candy-* tokens in global.css.
const FALLBACK: Record<string, string> = {
  cherry: "#ff4d6d",
  tangerine: "#ff8a3d",
  lemon: "#ffc93c",
  lime: "#2fd38a",
  blueberry: "#4d7cff",
};

/** Reads the candy colours from the brand tokens, for canvas drawing. */
export function readGummyColors(el: Element): string[] {
  const style = getComputedStyle(el);
  return GUMMY_CANDY.map((name) => {
    const value = style.getPropertyValue(`--candy-${name}`).trim();
    return /^#[0-9a-f]{6}$/i.test(value) ? value : FALLBACK[name];
  });
}

/** Mixes a #rrggbb colour towards white (amount > 0) or black (amount < 0). */
export function tint(hex: string, amount: number, alpha = 1): string {
  const n = parseInt(hex.slice(1), 16);
  const target = amount > 0 ? 255 : 0;
  const t = Math.abs(amount);
  const mix = (c: number) => Math.round(c + (target - c) * t);
  return `rgba(${mix(n >> 16)}, ${mix((n >> 8) & 255)}, ${mix(n & 255)}, ${alpha})`;
}
