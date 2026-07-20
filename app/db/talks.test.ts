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

  it('returns the original URL unchanged for empty string', () => {
    expect(getYouTubeEmbedUrl('')).toBe('');
  });

  it('handles video IDs with hyphens and underscores', () => {
    const url = 'https://youtu.be/abc-def_123';
    expect(getYouTubeEmbedUrl(url)).toBe(
      'https://www.youtube.com/embed/abc-def_123'
    );
  });

  it('returns about:blank for javascript: URIs', () => {
    expect(getYouTubeEmbedUrl('javascript:alert(1)')).toBe('about:blank');
  });

  it('returns about:blank for data: URIs', () => {
    expect(getYouTubeEmbedUrl('data:text/html,<script>alert(1)</script>')).toBe('about:blank');
  });

  it('allows relative path URLs (treated as http/https via base)', () => {
    expect(getYouTubeEmbedUrl('/videos/local.mp4')).toBe('/videos/local.mp4');
  });
});
