import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import { Blog } from 'app/db/blog';

export default function RelatedPosts({ posts }: { posts: Blog[] }) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="w-full mt-12 pt-8 border-t border-line">
      <h2 className="mb-4 text-xl font-bold text-ink">
        Keep reading
      </h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="group block">
              <h3 className="text-lg font-medium text-ink group-hover:text-accent transition-colors">
                {post.metadata.title}
              </h3>
              <p className="text-sm text-muted">
                {format(parseISO(post.metadata.date), 'MMMM dd, yyyy')}
                {' • '}
                {post.metadata.readingTime}
              </p>
              <p className="text-ink-soft">
                {post.metadata.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
