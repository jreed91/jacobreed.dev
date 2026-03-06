import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';
import { getBlogPosts } from './db/blog';
import { getTalks } from './db/talks';

describe('sitemap', () => {
  it('returns an array of sitemap entries', async () => {
    const entries = await sitemap();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  it('every entry has a url and lastModified field', async () => {
    const entries = await sitemap();
    entries.forEach((entry) => {
      expect(typeof entry.url).toBe('string');
      expect(entry.url.startsWith('https://jacobreed.dev')).toBe(true);
      expect(entry.lastModified).toBeTruthy();
    });
  });

  it('includes the static routes', async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain('https://jacobreed.dev');
    expect(urls).toContain('https://jacobreed.dev/blog');
    expect(urls).toContain('https://jacobreed.dev/projects');
  });

  it('includes an entry for every blog post', async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    getBlogPosts().forEach((post) => {
      expect(urls).toContain(`https://jacobreed.dev/blog/${post.slug}`);
    });
  });

  it('blog post lastModified matches the post date', async () => {
    const entries = await sitemap();
    getBlogPosts().forEach((post) => {
      const entry = entries.find(
        (e) => e.url === `https://jacobreed.dev/blog/${post.slug}`
      );
      expect(entry).toBeDefined();
      expect(entry!.lastModified).toBe(post.metadata.date);
    });
  });

  it('includes an entry for every talk', async () => {
    const talks = getTalks();
    if (talks.length === 0) return; // skip if no talks exist yet
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    talks.forEach((talk) => {
      expect(urls).toContain(`https://jacobreed.dev/talks/${talk.slug}`);
    });
  });

  it('contains no duplicate URLs', async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
