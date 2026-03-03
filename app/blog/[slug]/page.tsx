import { getBlogPosts } from 'app/db/blog';
import BlogLayout from '../../components/BlogLayout';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { safeJsonStringify } from '../../utils/sanitize';

const baseUrl = 'https://jacobreed.dev';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return {};
  }

  const {
    title,
    date: publishedTime,
    summary: description,
    image,
  } = post.metadata;

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
      url: `${baseUrl}/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
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

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  // JSON-LD Schema markup for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    datePublished: post.metadata.date,
    dateModified: post.metadata.date,
    description: post.metadata.summary,
    image: post.metadata.image
      ? `${baseUrl}${post.metadata.image}`
      : `${baseUrl}/static/images/avatar.jpeg`,
    url: `${baseUrl}/blog/${slug}`,
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
      <BlogLayout blog={post}>
      </BlogLayout>
    </>
  );
}
