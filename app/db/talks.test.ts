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

  it('returns the original URL unchanged for non-YouTube URLs over HTTP/HTTPS', () => {
    const url = 'https://vimeo.com/123456789';
    expect(getYouTubeEmbedUrl(url)).toBe(url);
  });

  it('safely falls back to about:blank for empty string (since it resolves to http:) or retains it if allowed', () => {
    // Our implementation uses `new URL('', 'http://localhost')` which parses to `http:`.
    // It returns the original empty string which is safe.
    expect(getYouTubeEmbedUrl('')).toBe('');
  });

  it('handles video IDs with hyphens and underscores', () => {
    const url = 'https://youtu.be/abc-def_123';
    expect(getYouTubeEmbedUrl(url)).toBe(
      'https://www.youtube.com/embed/abc-def_123'
    );
  });

  it('returns about:blank for malicious protocols to prevent XSS', () => {
    expect(getYouTubeEmbedUrl('javascript:alert(1)')).toBe('about:blank');
    expect(getYouTubeEmbedUrl('data:text/html,<html>')).toBe('about:blank');
    expect(getYouTubeEmbedUrl('vbscript:msgbox("hello")')).toBe('about:blank');
  });

  it('allows relative paths (resolves to base URL protocol)', () => {
    expect(getYouTubeEmbedUrl('/videos/local.mp4')).toBe('/videos/local.mp4');
  });
});
