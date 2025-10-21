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
};

export type Blog = {
    content: string,
    metadata: Metadata
    slug: string
    headings: Heading[]
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
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

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

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