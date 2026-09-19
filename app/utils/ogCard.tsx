import { ImageResponse } from 'next/og';

export const ogImageSize = {
  width: 1200,
  height: 630,
};

export const ogImageContentType = 'image/png';

function titleSize(title: string): number {
  if (title.length > 80) return 52;
  if (title.length > 55) return 62;
  return 76;
}

/**
 * Renders the shared social card used for blog posts, talks and projects.
 * Keeps every page with a branded 1200x630 image even when its frontmatter
 * has no `image` of its own.
 */
export function renderOgCard({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #0c4a6e 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            JR
          </div>
          <div style={{ display: 'flex', color: '#a5b4fc', fontSize: 28 }}>{eyebrow}</div>
        </div>

        <div
          style={{
            display: 'flex',
            color: 'white',
            fontSize: titleSize(title),
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#94a3b8',
            fontSize: 26,
          }}
        >
          <div style={{ display: 'flex' }}>jacobreed.dev</div>
          {meta ? <div style={{ display: 'flex' }}>{meta}</div> : null}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
    }
  );
}
