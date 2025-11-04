import BlogPost from '../components/BlogPost';
import { getBlogPosts } from 'app/db/blog';

/* Code & Craft Blog Page - Clean, professional layout */
export default function Blog() {
  const filteredBlogPosts = getBlogPosts()
    .sort(
      (a, b) =>
        Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date))
    );

  return (
    <div className="max-w-[1200px] mx-auto w-full py-xl sm:py-2xl px-10">
      <h1 className="mb-lg text-h2 text-cc-slate dark:text-cc-white">
        All Posts
      </h1>
      {!filteredBlogPosts.length ? (
        <p className="text-body text-cc-warm-gray dark:text-cc-soft-gray">No posts found.</p>
      ) : (
        <div className="space-y-md">
          {filteredBlogPosts.map((post) => (
            <BlogPost key={post.metadata.title} blog={post} />
          ))}
        </div>
      )}
    </div>
  );
}