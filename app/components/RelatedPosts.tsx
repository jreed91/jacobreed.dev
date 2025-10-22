import { getBlogPosts, type Blog } from 'app/db/blog';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

interface RelatedPostsProps {
  currentSlug: string;
}

async function getRelatedPosts(currentSlug: string): Promise<Blog[]> {
  const allPosts = getBlogPosts();

  // Get 3 random posts that aren't the current post
  // In production, you might query related posts by tags, category, or similar content
  return allPosts
    .filter((post) => post.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}

export default async function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const relatedPosts = await getRelatedPosts(currentSlug);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 border-t border-neutral-200 dark:border-neutral-800 pt-8">
      <h2 className="text-2xl font-bold mb-6">More Articles</h2>

      <div className="grid gap-4">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          >
            <h3 className="font-semibold text-lg mb-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
              {post.metadata.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              {post.metadata.summary}
            </p>
            <div className="text-xs text-neutral-500 dark:text-neutral-500">
              {format(parseISO(post.metadata.date), 'MMMM dd, yyyy')} • {post.metadata.readingTime}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
