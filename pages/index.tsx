import { allBlogs } from ".contentlayer/data";
import { Blog } from ".contentlayer/types";
import { pick } from "contentlayer/client";
import Container from "../components/Container";
import BlogPost from "../components/BlogPost";

export default function Home({ posts }: {posts: Blog[]}) {
  const filteredBlogPosts = posts
  .sort(
    (a, b) =>
      Number(new Date(b.date)) - Number(new Date(a.date))
  ).slice(0, 2);

  return (
    <Container>
      <div className="flex flex-col items-start justify-start max-w-4xl mx-auto w-full pb-16">
            <h1 className="font-bold text-6xl">
              My name is Jacob.
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4 text-2xl">
              I'm an experienced Software Engineer @ <a href="https://www.leantechniques.com" target="_blank">Lean TECHniques</a>
            </h2>
      </div>
      <div className="items-center justify-between w-full relative max-w-4xl mx-auto">
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
