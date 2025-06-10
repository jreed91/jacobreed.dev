import BlogPost from '../components/BlogPost';
import { getBlogPosts } from 'app/db/blog';


export default function Blog() {
  const filteredBlogPosts = getBlogPosts()
    .sort(
      (a, b) =>
        Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date))
    );

  return (
      <div className="items-center justify-between w-full relative max-w-4xl mx-auto px-8">
        <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          All Posts
        </h3>
        {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No posts found.
          </p>
        )}
        {filteredBlogPosts.map((post) => (
          <BlogPost key={post.metadata.title} blog={post} />
        ))}
      </div>
  );
}