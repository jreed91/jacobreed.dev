import type { CSSProperties } from 'react';

/**
 * The brand's candy set, one color per letter of "Jacob" plus grape. Kept in
 * sync with the --candy-* tokens in global.css.
 */
export const CANDY = ['cherry', 'tangerine', 'lemon', 'lime', 'blueberry', 'grape'] as const;

export type Candy = (typeof CANDY)[number];

/** Picks a stable candy color for a label, so a tag is the same color everywhere. */
export function candyFor(label: string): Candy {
  let hash = 0;
  for (const char of label.toLowerCase()) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return CANDY[hash % CANDY.length];
}

/** Inline style that feeds a `.tag-pill` its color. */
export function candyStyle(label: string): CSSProperties {
  return { '--c': `var(--candy-${candyFor(label)})` } as CSSProperties;
}
