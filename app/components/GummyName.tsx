import { ADVANCE, ASCENT, DESCENT, GLYPHS, UNITS_PER_EM } from "./gummy/glyphs";
import { GUMMY_COLORS, tint } from "./gummy/colors";
import { WORD_HEIGHT_EM } from "./gummy/wordLayout";

// The gummy word is drawn a bit larger than the surrounding heading text.
const SCALE = 1.3;

/**
 * Static "Jacob" in gummy candy letters. Shown before the physics loads and
 * for visitors who prefer reduced motion; GummyCanvas takes over its spot.
 */
export default function GummyName() {
  return (
    <span className="select-none">
      <span className="sr-only">Jacob</span>
      <svg
        data-gummy-name
        aria-hidden="true"
        viewBox={`0 ${-ASCENT} ${ADVANCE} ${ASCENT - DESCENT}`}
        className="inline-block overflow-visible drop-shadow-[0_6px_10px_rgba(77,124,255,0.25)]"
        style={{
          height: `${WORD_HEIGHT_EM * SCALE}em`,
          width: `${(ADVANCE / UNITS_PER_EM) * SCALE}em`,
          verticalAlign: `${(DESCENT / UNITS_PER_EM) * SCALE}em`,
        }}
      >
        <defs>
          {GUMMY_COLORS.map((color, i) => (
            <linearGradient key={color} id={`gummy-${i}`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor={tint(color, 0.35)} />
              <stop offset="1" stopColor={color} />
            </linearGradient>
          ))}
        </defs>
        {GLYPHS.map((glyph, i) => (
          <path
            key={glyph.char}
            d={glyph.path}
            transform={`translate(${glyph.x} 0) scale(1 -1)`}
            fill={`url(#gummy-${i})`}
            fillOpacity={0.92}
          />
        ))}
      </svg>
    </span>
  );
}
