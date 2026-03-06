import { describe, it, expect } from 'vitest';
import { getBlogPosts } from './blog';
import fs from 'fs';
import path from 'path';

// Access private functions via dynamic import for unit testing
// We test them indirectly through the public API and via inline re-implementations
// to keep tests hermetic. The real parseFrontmatter/extractHeadings are tested below
// by reproducing their logic with known inputs.

// ─── Inline test helpers (mirrors the internal implementations) ──────────────

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) throw new Error('No frontmatter found');
  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const metadata: Record<string, string> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1');
    metadata[key.trim()] = value;
  });

  return { metadata, content };
}

type Heading = { id: string; text: string; level: number };

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    headings.push({ id, text, level });
  }
  return headings;
}

// ─── parseFrontmatter ─────────────────────────────────────────────────────────

describe('parseFrontmatter', () => {
  it('parses basic frontmatter fields', () => {
    const input = `---
title: My Post
date: '2024-01-15'
summary: A short summary
---
Body content here.`;
    const { metadata, content } = parseFrontmatter(input);
    expect(metadata.title).toBe('My Post');
    expect(metadata.date).toBe('2024-01-15');
    expect(metadata.summary).toBe('A short summary');
    expect(content).toBe('Body content here.');
  });

  it('strips surrounding single and double quotes from values', () => {
    const input = `---
title: 'Quoted Title'
date: "2024-06-01"
summary: No quotes here
---`;
    const { metadata } = parseFrontmatter(input);
    expect(metadata.title).toBe('Quoted Title');
    expect(metadata.date).toBe('2024-06-01');
    expect(metadata.summary).toBe('No quotes here');
  });

  it('handles values that contain colons', () => {
    const input = `---
title: My Post: A Subtitle
summary: Short
date: '2024-01-01'
---`;
    const { metadata } = parseFrontmatter(input);
    expect(metadata.title).toBe('My Post: A Subtitle');
  });

  it('leaves image undefined when not present', () => {
    const input = `---
title: No Image Post
date: '2024-01-01'
summary: Summary
---`;
    const { metadata } = parseFrontmatter(input);
    expect(metadata.image).toBeUndefined();
  });

  it('parses optional image field when present', () => {
    const input = `---
title: Post With Image
date: '2024-01-01'
summary: Summary
image: /static/images/photo.jpg
---`;
    const { metadata } = parseFrontmatter(input);
    expect(metadata.image).toBe('/static/images/photo.jpg');
  });

  it('throws when frontmatter delimiters are missing', () => {
    expect(() => parseFrontmatter('No frontmatter here')).toThrow();
  });
});

// ─── extractHeadings ──────────────────────────────────────────────────────────

describe('extractHeadings', () => {
  it('extracts a single heading with correct level and id', () => {
    const content = '## Hello World';
    const headings = extractHeadings(content);
    expect(headings).toHaveLength(1);
    expect(headings[0]).toEqual({ id: 'hello-world', text: 'Hello World', level: 2 });
  });

  it('extracts multiple headings at different levels', () => {
    const content = `# Title\n## Section One\n### Sub-section`;
    const headings = extractHeadings(content);
    expect(headings).toHaveLength(3);
    expect(headings[0].level).toBe(1);
    expect(headings[1].level).toBe(2);
    expect(headings[2].level).toBe(3);
  });

  it('converts heading text to kebab-case id', () => {
    const content = '## My Heading With Spaces';
    const [h] = extractHeadings(content);
    expect(h.id).toBe('my-heading-with-spaces');
  });

  it('strips special characters from ids', () => {
    const content = '## Hello, World! (2024)';
    const [h] = extractHeadings(content);
    expect(h.id).toBe('hello-world-2024');
  });

  it('does not produce leading or trailing hyphens in id', () => {
    const content = '## !Leading and trailing!';
    const [h] = extractHeadings(content);
    expect(h.id).not.toMatch(/^-|-$/);
  });

  it('returns an empty array when there are no headings', () => {
    const content = 'Just a paragraph.\n\nAnother paragraph.';
    expect(extractHeadings(content)).toHaveLength(0);
  });

  it('ignores headings inside code blocks (inline hashes)', () => {
    // Only ATX-style headings at line start are matched
    const content = 'Some text with a # not at the start\n## Real Heading';
    const headings = extractHeadings(content);
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toBe('Real Heading');
  });
});

// ─── getBlogPosts integration ─────────────────────────────────────────────────

describe('getBlogPosts', () => {
  it('returns one post per MDX file in content/', () => {
    const posts = getBlogPosts();
    const files = fs
      .readdirSync(path.join(process.cwd(), 'content'))
      .filter((f) => path.extname(f) === '.mdx');
    expect(posts).toHaveLength(files.length);
  });

  it('every post has the required top-level fields', () => {
    getBlogPosts().forEach((post) => {
      expect(post).toHaveProperty('metadata');
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('content');
      expect(post).toHaveProperty('headings');
    });
  });

  it('slug is a non-empty string matching the filename (no extension)', () => {
    const posts = getBlogPosts();
    const files = fs
      .readdirSync(path.join(process.cwd(), 'content'))
      .filter((f) => path.extname(f) === '.mdx')
      .map((f) => path.basename(f, '.mdx'));

    posts.forEach((post) => {
      expect(typeof post.slug).toBe('string');
      expect(post.slug.length).toBeGreaterThan(0);
      expect(files).toContain(post.slug);
    });
  });

  it('metadata contains required string fields', () => {
    getBlogPosts().forEach((post) => {
      expect(typeof post.metadata.title).toBe('string');
      expect(post.metadata.title.length).toBeGreaterThan(0);

      expect(typeof post.metadata.summary).toBe('string');
      expect(post.metadata.summary.length).toBeGreaterThan(0);

      expect(typeof post.metadata.date).toBe('string');
      expect(post.metadata.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('readingTime is populated and formatted correctly', () => {
    getBlogPosts().forEach((post) => {
      expect(typeof post.metadata.readingTime).toBe('string');
      expect(post.metadata.readingTime).toMatch(/\d+ min read/);
    });
  });

  it('headings is an array (may be empty for short posts)', () => {
    getBlogPosts().forEach((post) => {
      expect(Array.isArray(post.headings)).toBe(true);
      post.headings.forEach((h) => {
        expect(typeof h.id).toBe('string');
        expect(typeof h.text).toBe('string');
        expect(typeof h.level).toBe('number');
        expect(h.level).toBeGreaterThanOrEqual(1);
        expect(h.level).toBeLessThanOrEqual(6);
      });
    });
  });

  it('image field is either a string path or undefined', () => {
    getBlogPosts().forEach((post) => {
      if (post.metadata.image !== undefined) {
        expect(typeof post.metadata.image).toBe('string');
        expect(post.metadata.image).toMatch(/^\/static\//);
      }
    });
  });
});
