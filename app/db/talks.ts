import fs from 'fs';
import path from 'path';

type TalkMetadata = {
  title: string;
  date: string;
  summary: string;
  event?: string;
  videoUrl: string;
  image?: string;
};

export type Talk = {
  content: string;
  metadata: TalkMetadata;
  slug: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let metadata: Partial<TalkMetadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    metadata[key.trim() as keyof TalkMetadata] = value;
  });

  return { metadata: metadata as TalkMetadata, content };
}

function getMDXFiles(dir: fs.PathLike) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  let rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string): Talk[] {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getTalks(): Talk[] {
  return getMDXData(path.join(process.cwd(), 'content', 'talks'));
}

const SAFE_EMBED_PROTOCOLS = ['http:', 'https:'];

/**
 * Returns true only for absolute URLs served over http(s). Anything else --
 * `javascript:`, `data:`, `vbscript:`, or an unparseable string -- is unsafe
 * to interpolate into an iframe `src`.
 */
function isSafeEmbedUrl(videoUrl: string): boolean {
  try {
    return SAFE_EMBED_PROTOCOLS.includes(new URL(videoUrl).protocol);
  } catch {
    return false;
  }
}

export function getYouTubeEmbedUrl(videoUrl: string): string {
  const youtubeRegex =
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/;
  const match = youtubeRegex.exec(videoUrl);
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  // Non-YouTube URLs are passed through, so they must be protocol-checked
  // before they reach an iframe src.
  return isSafeEmbedUrl(videoUrl) ? videoUrl : '';
}
