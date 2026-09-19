import { describe, it, expect } from 'vitest';
import { GET } from './route';
import { getBlogPosts } from 'app/db/blog';

async function feed() {
  const response = await GET();
  return { response, body: await response.text() };
}

describe('GET /feed.xml', () => {
  it('serves RSS with the right content type', async () => {
    const { response, body } = await feed();
    expect(response.headers.get('Content-Type')).toBe(
      'application/rss+xml; charset=utf-8'
    );
    expect(body.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(body).toContain('<rss version="2.0"');
  });

  it('includes an item for every blog post', async () => {
    const { body } = await feed();
    const posts = getBlogPosts();

    expect(body.match(/<item>/g)).toHaveLength(posts.length);
    posts.forEach((post) => {
      expect(body).toContain(`https://jacobreed.dev/blog/${post.slug}`);
    });
  });

  it('lists posts newest first', async () => {
    const { body } = await feed();
    const titles = [...body.matchAll(/<item>\s*<title>(.*?)<\/title>/g)].map(
      (match) => match[1]
    );
    const expected = getBlogPosts()
      .sort((a, b) => Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date)))
      .map((post) => post.metadata.title.replace(/&/g, '&amp;'));

    expect(titles).toEqual(expected);
  });

  it('escapes XML-unsafe characters in titles and summaries', async () => {
    const { body } = await feed();
    const values = [
      ...body.matchAll(/<title>(.*?)<\/title>/g),
      ...body.matchAll(/<description>(.*?)<\/description>/g),
    ].map((match) => match[1]);

    expect(values.length).toBeGreaterThan(0);
    values.forEach((value) => {
      expect(value).not.toMatch(/[<>]/);
      expect(value).not.toMatch(/&(?!amp;|lt;|gt;|quot;|apos;)/);
    });
  });

  it('carries each post tag as a category', async () => {
    const { body } = await feed();
    getBlogPosts().forEach((post) => {
      post.metadata.tags.forEach((tag) => {
        expect(body).toContain(`<category>${tag}</category>`);
      });
    });
  });
});
