import BlogPost from '../components/BlogPost';
import TagList from '../components/TagList';
import { getAllTags, getSortedBlogPosts } from 'app/db/blog';

export default function Blog() {
  const filteredBlogPosts = getSortedBlogPosts();
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto w-full py-8 sm:py-12">
      <h1 className="mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
        All Posts
      </h1>
      {tags.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-600 dark:text-gray-400">
            Browse by tag
          </h2>
          <TagList tags={tags.map((tag) => tag.tag)} />
        </div>
      )}
      {!filteredBlogPosts.length ? (
        <p className="text-gray-600 dark:text-gray-400">No posts found.</p>
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
