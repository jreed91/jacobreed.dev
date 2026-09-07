import { getProjects, techTags } from 'app/db/projects';
import ProjectLayout from '../../components/ProjectLayout';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { safeJsonStringify } from '../../utils/sanitize';

const baseUrl = 'https://jacobreed.dev';

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);

  if (!project) {
    return {};
  }

  const { title, summary: description, image } = project.metadata;

  const ogImage = image
    ? `${baseUrl}${image}`
    : `${baseUrl}/static/images/avatar.jpeg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/projects/${slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@jacobreed91',
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.metadata.title,
    description: project.metadata.summary,
    url: `${baseUrl}/projects/${slug}`,
    applicationCategory: 'MobileApplication',
    ...(project.metadata.platform && {
      operatingSystem: project.metadata.platform,
    }),
    ...(techTags(project).length > 0 && {
      keywords: techTags(project).join(', '),
    }),
    author: {
      '@type': 'Person',
      name: 'Jacob Reed',
      url: baseUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonStringify(jsonLd) }}
      />
      <ProjectLayout project={project} />
    </>
  );
}
