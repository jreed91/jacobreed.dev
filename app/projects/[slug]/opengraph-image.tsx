import { getProjects } from 'app/db/projects';
import {
  ogImageContentType,
  ogImageSize,
  renderOgCard,
} from 'app/utils/ogCard';

export const alt = 'Project by Jacob Reed';

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjects().find((project) => project.slug === slug);

  if (!project) {
    return renderOgCard({ eyebrow: 'Project', title: 'Jacob Reed' });
  }

  const meta = [project.metadata.platform, project.metadata.role]
    .filter(Boolean)
    .join(' • ');

  return renderOgCard({
    eyebrow: 'Project',
    title: project.metadata.title,
    meta,
  });
}
