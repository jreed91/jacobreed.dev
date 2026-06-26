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

  it('returns about:blank for javascript: URIs to prevent XSS', () => {
    expect(getYouTubeEmbedUrl('javascript:alert(1)')).toBe('about:blank');
    expect(getYouTubeEmbedUrl('  javascript:alert(1)')).toBe('about:blank');
  });

  it('returns about:blank for data: URIs to prevent XSS', () => {
    expect(getYouTubeEmbedUrl('data:text/html,<html>')).toBe('about:blank');
  });

  it('allows http: and https: protocols', () => {
    expect(getYouTubeEmbedUrl('http://example.com/video')).toBe('http://example.com/video');
    expect(getYouTubeEmbedUrl('https://example.com/video')).toBe('https://example.com/video');
  });

  it('returns original url for valid root-relative paths', () => {
    // using new URL(url, base) where url='' resolves to the base URL and inherits its protocol 'http:'
    // and '/local-video.mp4' will resolve to 'http://localhost/local-video.mp4'
    expect(getYouTubeEmbedUrl('/local-video.mp4')).toBe('/local-video.mp4');
  });
});
