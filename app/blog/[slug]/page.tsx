import { Suspense } from 'react';
import { getBlogPosts } from 'app/db/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getReactions } from 'app/actions/reactions';
import BlogContent from 'app/components/BlogContent';
import BlogReactions from 'app/components/BlogReactions';
import RelatedPosts from 'app/components/RelatedPosts';
import { BlogPostSkeleton, ReactionsSkeleton, RelatedPostsSkeleton } from 'app/components/LoadingSkeletons';

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

const editUrl = (slug: string) =>
  `https://github.com/jreed91/jacobreed.dev/edit/master/data/blog/${slug}.mdx`;
const discussUrl = (slug: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://jacobreed.dev/blog/${slug}`
  )}`;

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  // Fetch initial reactions data
  const initialReactions = await getReactions(slug);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-4xl mx-auto mb-16">
        <article className="flex flex-col items-start justify-center w-full">
          {/* Main content streams in first */}
          <Suspense fallback={<BlogPostSkeleton />}>
            <BlogContent blog={post} />
          </Suspense>

          {/* Reactions stream in separately */}
          <Suspense fallback={<ReactionsSkeleton />}>
            <BlogReactions slug={slug} initialReactions={initialReactions} />
          </Suspense>

          {/* Footer links */}
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <a
              href={discussUrl(slug)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {"Discuss on Twitter"}
            </a>
            {` • `}
            <a href={editUrl(slug)} target="_blank" rel="noopener noreferrer">
              {"Edit on GitHub"}
            </a>
          </div>

          {/* Related posts stream in last (with artificial delay) */}
          <Suspense fallback={<RelatedPostsSkeleton />}>
            <RelatedPosts currentSlug={slug} />
          </Suspense>
        </article>
      </div>
    </>
  );
}
