import fs from 'fs';
import path from 'path';

type ProjectMetadata = {
  title: string;
  date: string;
  summary: string;
  platform?: string;
  role?: string;
  tech?: string;
  repo?: string;
  image?: string;
};

export type Project = {
  content: string;
  metadata: ProjectMetadata;
  slug: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let metadata: Partial<ProjectMetadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    metadata[key.trim() as keyof ProjectMetadata] = value;
  });

  return { metadata: metadata as ProjectMetadata, content };
}

function getMDXFiles(dir: fs.PathLike) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  let rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string): Project[] {
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

export function getProjects(): Project[] {
  return getMDXData(path.join(process.cwd(), 'content', 'projects')).sort(
    (a, b) => Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date))
  );
}

/** Comma-separated `tech` frontmatter, split into the tags the UI renders. */
export function techTags(project: Project): string[] {
  return (project.metadata.tech ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}
