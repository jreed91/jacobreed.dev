import { allBlogs } from ".contentlayer/data";
import { Blog } from ".contentlayer/types";
import { pick } from "contentlayer/client";
import Container from "../components/Container";
import FeaturedBlogs from "../components/BlogPostCard";

export default function Home({ posts }: {posts: Blog[]}) {
  const filteredBlogPosts = posts
  .sort(
    (a, b) =>
      Number(new Date(b.date)) - Number(new Date(a.date))
  ).slice(0, 2);

  return (
    <Container>
      <div className="flex flex-col justify-center items-center max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col-reverse sm:flex-row items-center text-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
              Jacob Reed
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
              Software Engineer @{" "}
              <span className="font-semibold">Lean TECHniques</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Featured Posts
        </h3>
         {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No posts found.
          </p>
        )}
        <div className="flex gap-6 flex-col md:flex-row">
        {filteredBlogPosts.map((post) => (
         <FeaturedBlogs slug={post.slug} title={post.title} summary={post.summary}/>
        ))}
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = allBlogs.map((post) =>
    pick(post, ["slug", "title", "summary", "date"])
  );

  return { props: { posts } };
}
