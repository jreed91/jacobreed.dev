import { parseISO, format } from 'date-fns';
import { getBlogPosts } from 'app/db/blog';
import {
  ogImageContentType,
  ogImageSize,
  renderOgCard,
} from 'app/utils/ogCard';

export const alt = 'Blog post on jacobreed.dev';

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return renderOgCard({ eyebrow: 'Blog', title: 'Jacob Reed' });
  }

  return renderOgCard({
    eyebrow: 'Blog',
    title: post.metadata.title,
    meta: `${format(parseISO(post.metadata.date), 'MMMM d, yyyy')} • ${post.metadata.readingTime}`,
  });
}
