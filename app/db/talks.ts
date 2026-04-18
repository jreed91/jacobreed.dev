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

export function getYouTubeEmbedUrl(videoUrl: string): string {
  if (!videoUrl) {
    return '';
  }

  const youtubeRegex =
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/;
  const match = youtubeRegex.exec(videoUrl);
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  try {
    const parsedUrl = new URL(videoUrl, 'http://localhost');
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return 'about:blank';
    }
  } catch (e) {
    return 'about:blank';
  }

  return videoUrl;
}
