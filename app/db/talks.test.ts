import { describe, it, expect } from 'vitest';
import { getYouTubeEmbedUrl } from './talks';

describe('getYouTubeEmbedUrl', () => {
  it('converts a standard youtube.com watch URL', () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
  });

  it('converts a youtu.be short URL', () => {
    const url = 'https://youtu.be/dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
  });

  it('converts a youtube.com/embed URL', () => {
    const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
  });

  it('converts a youtube.com/v/ URL', () => {
    const url = 'https://www.youtube.com/v/dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
  });

  it('returns the original URL unchanged for non-YouTube URLs', () => {
    const url = 'https://vimeo.com/123456789';
    expect(getYouTubeEmbedUrl(url)).toBe(url);
  });

  it('returns about:blank for empty string', () => {
    expect(getYouTubeEmbedUrl('')).toBe('about:blank');
  });

  it('handles video IDs with hyphens and underscores', () => {
    const url = 'https://youtu.be/abc-def_123';
    expect(getYouTubeEmbedUrl(url)).toBe(
      'https://www.youtube.com/embed/abc-def_123'
    );
  });

  it('allows safe http/https fallback URLs', () => {
    expect(getYouTubeEmbedUrl('https://example.com/video.mp4')).toBe('https://example.com/video.mp4');
    expect(getYouTubeEmbedUrl('http://example.com/video.mp4')).toBe('http://example.com/video.mp4');
  });

  it('allows root-relative fallback URLs', () => {
    expect(getYouTubeEmbedUrl('/local-video.mp4')).toBe('/local-video.mp4');
  });

  it('rejects dangerous protocols (javascript:)', () => {
    expect(getYouTubeEmbedUrl('javascript:alert(1)')).toBe('about:blank');
    expect(getYouTubeEmbedUrl('  javascript:alert(1)')).toBe('about:blank');
  });

  it('rejects dangerous protocols (data:)', () => {
    expect(getYouTubeEmbedUrl('data:text/html,<script>alert(1)</script>')).toBe('about:blank');
  });
});
