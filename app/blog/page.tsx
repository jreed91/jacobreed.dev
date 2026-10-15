import BlogPost from '../components/BlogPost';
import PageHeader from '../components/PageHeader';
import TagList from '../components/TagList';
import { getAllTags, getSortedBlogPosts } from 'app/db/blog';

export default function Blog() {
  const filteredBlogPosts = getSortedBlogPosts();
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto w-full py-8 sm:py-12">
      <PageHeader eyebrow="blog" title="Writing">
        Notes on cloud infrastructure, PostgreSQL, developer tools and working with AI.
      </PageHeader>
      {tags.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
            Browse by tag
          </h2>
          <TagList tags={tags.map((tag) => tag.tag)} />
        </div>
      )}
      {!filteredBlogPosts.length ? (
        <p className="text-muted">No posts found.</p>
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
