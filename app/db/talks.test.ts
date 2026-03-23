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

  it('neutralizes XSS payloads with javascript: URIs', () => {
    const url = 'javascript:alert(1)';
    expect(getYouTubeEmbedUrl(url)).toBe('about:blank');
  });

  it('neutralizes XSS payloads with data: URIs', () => {
    const url = 'data:text/html,<script>alert(1)</script>';
    expect(getYouTubeEmbedUrl(url)).toBe('about:blank');
  });

  it('allows http:// and https:// URLs that are not YouTube', () => {
    const urlHttp = 'http://example.com/video.mp4';
    const urlHttps = 'https://example.com/video.mp4';
    expect(getYouTubeEmbedUrl(urlHttp)).toBe(urlHttp);
    expect(getYouTubeEmbedUrl(urlHttps)).toBe(urlHttps);
  });

  it('allows root-relative paths', () => {
    const url = '/local-videos/my-talk.mp4';
    expect(getYouTubeEmbedUrl(url)).toBe(url);
  });
});
