import fs from 'fs';
import path from 'path';
import readingTime from 'reading-time';

export type Heading = {
  id: string;
  text: string;
  level: number;
};

type Metadata = {
  title: string;
  date: string;
  summary: string;
  image?: string;
  readingTime: string;
  tags: string[];
};

export type Blog = {
    content: string,
    metadata: Metadata
    slug: string
    headings: Heading[]
}

export function parseTags(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .replace(/^\[(.*)\]$/, '$1') // Allow `tags: [a, b]` as well as `tags: a, b`
    .split(',')
    .map((tag) => tag.trim().replace(/^['"](.*)['"]$/, '$1').toLowerCase())
    .filter((tag) => tag.length > 0);
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let fields: Record<string, string> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    fields[key.trim()] = value;
  });

  const { tags, ...rest } = fields;
  const metadata = { ...rest, tags: parseTags(tags) } as Metadata;

  return { metadata, content };
}

function getMDXFiles(dir: fs.PathLike) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  let rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Generate ID from text (similar to how rehype-slug does it)
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Slugs come from filenames on disk, so strip anything that is not safe in a
 * URL path segment before the value reaches a link, the sitemap or the feed.
 */
export function sanitizeSlug(value: string): string {
  return value.replace(/[^A-Za-z0-9_-]/g, '');
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = sanitizeSlug(path.basename(file, path.extname(file)));

    // Calculate reading time
    const readingTimeResult = readingTime(content);

    // Extract headings for table of contents
    const headings = extractHeadings(content);

    return {
      metadata: {
        ...metadata,
        readingTime: readingTimeResult.text,
      },
      slug,
      content,
      headings,
    };
  });
}

export function getBlogPosts(): Blog[] {
  return getMDXData(path.join(process.cwd(), 'content'));
}

/** Posts newest first — the order every listing on the site uses. */
export function getSortedBlogPosts(): Blog[] {
  return getBlogPosts().sort(
    (a, b) => Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date))
  );
}

/** URL-safe form of a tag, used for /blog/tag/[tag]. */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Every tag in use, with how many posts carry it, most used first. */
export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();

  getBlogPosts().forEach((post) => {
    post.metadata.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: tagSlug(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Posts carrying the given tag (matched on its slug), newest first. */
export function getBlogPostsByTag(tag: string): Blog[] {
  const wanted = tagSlug(tag);

  return getSortedBlogPosts().filter((post) =>
    post.metadata.tags.some((postTag) => tagSlug(postTag) === wanted)
  );
}

/**
 * Posts related to `slug`, ranked by how many tags they share with it and
 * topped up with the most recent posts so every article gets suggestions.
 */
export function getRelatedPosts(slug: string, limit = 3): Blog[] {
  const posts = getSortedBlogPosts();
  const current = posts.find((post) => post.slug === slug);

  if (!current) {
    return [];
  }

  const currentTags = new Set(current.metadata.tags.map(tagSlug));
  const others = posts.filter((post) => post.slug !== slug);

  const scored = others
    .map((post) => ({
      post,
      shared: post.metadata.tags.filter((tag) => currentTags.has(tagSlug(tag))).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        Number(new Date(b.post.metadata.date)) - Number(new Date(a.post.metadata.date))
    )
    .map((entry) => entry.post);

  const filler = others.filter((post) => !scored.includes(post));

  return [...scored, ...filler].slice(0, limit);
}
