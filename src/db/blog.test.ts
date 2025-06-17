import { describe, it, expect } from 'vitest';
import { getBlogPosts } from './blog';
import fs from 'fs';
import path from 'path';

describe('getBlogPosts', () => {
  it('reads MDX files from the content directory and returns posts', () => {
    const posts = getBlogPosts();
    const files = fs
      .readdirSync(path.join(process.cwd(), 'content'))
      .filter((f) => path.extname(f) === '.mdx');

    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBe(files.length);

    posts.forEach((post) => {
      expect(post).toHaveProperty('metadata');
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('content');

      expect(typeof post.slug).toBe('string');
      expect(typeof post.content).toBe('string');
      expect(typeof post.metadata).toBe('object');
    });
  });
});
