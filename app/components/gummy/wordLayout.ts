import { ASCENT, DESCENT, GLYPHS, UNITS_PER_EM } from "./glyphs";
import type { LayoutGlyph } from "./sim";

/** Height of the word box in em, matching the static SVG's viewBox. */
export const WORD_HEIGHT_EM = (ASCENT - DESCENT) / UNITS_PER_EM;

/**
 * Places the glyph outlines in canvas pixels for a word box whose top-left is
 * (left, top) and whose height is `height` pixels.
 */
export function layoutWord(left: number, top: number, height: number): LayoutGlyph[] {
  const scale = height / (ASCENT - DESCENT);
  const baseline = top + ASCENT * scale;
  return GLYPHS.map((glyph) => ({
    contours: glyph.contours.map((contour) =>
      contour.map(([x, y]) => [left + (glyph.x + x) * scale, baseline - y * scale] as [number, number])
    ),
  }));
}
