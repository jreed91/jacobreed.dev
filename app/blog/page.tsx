import BlogPost from '../components/BlogPost';
import { getBlogPosts } from 'app/db/blog';

export default function Blog() {
  const filteredBlogPosts = getBlogPosts()
    .sort(
      (a, b) =>
        Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date))
    );

  return (
    <div className="max-w-4xl mx-auto w-full py-8 sm:py-12">
      <h1 className="mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-deep-navy dark:text-soft-cream">
        All Posts
      </h1>
      {!filteredBlogPosts.length ? (
        <p className="text-warm-charcoal dark:text-light-gray">No posts found.</p>
      ) : (
        <div className="space-y-4">
          {filteredBlogPosts.map((post) => (
            <BlogPost key={post.metadata.title} blog={post} />
          ))}
        </div>
      )}
    </div>
  );
}