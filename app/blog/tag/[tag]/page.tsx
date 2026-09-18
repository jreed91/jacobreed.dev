import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPost from 'app/components/BlogPost';
import TagList from 'app/components/TagList';
import { getAllTags, getBlogPostsByTag } from 'app/db/blog';

const baseUrl = 'https://jacobreed.dev';

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const match = getAllTags().find((entry) => entry.slug === tag);

  if (!match) {
    return {};
  }

  const title = `Posts tagged "${match.tag}"`;
  const description = `Every post on jacobreed.dev tagged ${match.tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/blog/tag/${match.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@jacobreed91',
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const match = getAllTags().find((entry) => entry.slug === tag);

  if (!match) {
    notFound();
  }

  const posts = getBlogPostsByTag(match.tag);
  const allTags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto w-full py-8 sm:py-12">
      <h1 className="mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
        {match.tag}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {posts.length} {posts.length === 1 ? 'post' : 'posts'}
      </p>
      <div className="mb-8">
        <TagList tags={allTags.map((entry) => entry.tag)} activeTag={match.tag} />
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <BlogPost key={post.slug} blog={post} />
        ))}
      </div>
    </div>
  );
}
