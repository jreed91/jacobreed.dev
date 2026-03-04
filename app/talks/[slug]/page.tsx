import { getTalks } from 'app/db/talks';
import TalkLayout from '../../components/TalkLayout';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { safeJsonStringify } from '../../utils/sanitize';

const baseUrl = 'https://jacobreed.dev';

export async function generateStaticParams() {
  const talks = getTalks();
  return talks.map((talk) => ({
    slug: talk.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const talk = getTalks().find((t) => t.slug === slug);

  if (!talk) {
    return {};
  }

  const { title, date: publishedTime, summary: description, image } = talk.metadata;

  const ogImage = image
    ? `${baseUrl}${image}`
    : `${baseUrl}/static/images/avatar.jpeg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/talks/${slug}`,
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

export default async function TalkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const talk = getTalks().find((t) => t.slug === slug);

  if (!talk) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: talk.metadata.title,
    description: talk.metadata.summary,
    uploadDate: talk.metadata.date,
    url: talk.metadata.videoUrl,
    embedUrl: talk.metadata.videoUrl,
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
      <TalkLayout talk={talk} />
    </>
  );
}
