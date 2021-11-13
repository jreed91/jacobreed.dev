import { allBlogs } from ".contentlayer/data";
import { Blog } from ".contentlayer/types";
import { pick } from "contentlayer/client";
import Container from "../components/Container";
import BlogPost from "../components/BlogPost";
import Subscribe from "../components/Subscribe";

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
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Jacob Reed
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
              Software Engineer @{" "}
              <span className="font-semibold">Lean TECHniques</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="items-center justify-between w-full relative max-w-2xl mx-auto">
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Writing
        </h3>
         {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No posts found.
          </p>
        )}
        {filteredBlogPosts.map((post) => (
          <BlogPost key={post.title} {...post} />
        ))}
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
