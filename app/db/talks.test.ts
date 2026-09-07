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

  it('rejects javascript: URLs', () => {
    expect(getYouTubeEmbedUrl('javascript:alert(1)')).toBe('');
  });

  it('rejects data: URLs', () => {
    expect(
      getYouTubeEmbedUrl('data:text/html,<script>alert(1)</script>')
    ).toBe('');
  });

  it('rejects vbscript: URLs', () => {
    expect(getYouTubeEmbedUrl('vbscript:msgbox(1)')).toBe('');
  });

  it('rejects protocol-relative and relative URLs', () => {
    expect(getYouTubeEmbedUrl('//evil.example.com/embed')).toBe('');
    expect(getYouTubeEmbedUrl('/not-a-video')).toBe('');
  });

  it('ignores leading and trailing whitespace tricks', () => {
    expect(getYouTubeEmbedUrl('  javascript:alert(1)')).toBe('');
    expect(getYouTubeEmbedUrl('java\tscript:alert(1)')).toBe('');
  });

  it('still canonicalizes a YouTube ID embedded in an unsafe URL', () => {
    expect(
      getYouTubeEmbedUrl('javascript:alert(1)//youtu.be/dQw4w9WgXcQ')
    ).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
  });
});
