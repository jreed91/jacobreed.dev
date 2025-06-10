import BlogPost from "./components/BlogPost";
import { getBlogPosts } from "app/db/blog";

export default function Home() {
  const filteredBlogPosts = getBlogPosts().sort(
    (a, b) =>
      Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date))
  );

  return (
    <>
      <div className="flex flex-col items-start justify-start max-w-4xl mx-auto w-full pb-16 px-8">
        <h1 className="font-bold text-6xl leading-tight dark:text-gray-200">My name is Jacob.</h1>
        <h2 className="text-gray-700 dark:text-gray-200 mb-4 text-2xl">
          I am an experienced Software Engineer @{" "}
          <a
            href="https://www.leantechniques.com"
            target="_blank "
            rel="noreferrer"
          >
            Lean TECHniques
          </a>
        </h2>
      </div>
      <div className="items-center justify-between w-full relative max-w-4xl mx-auto px-8">
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Writing
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
    </>
  );
}
