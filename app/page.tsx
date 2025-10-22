import BlogPost from "./components/BlogPost";
import { getBlogPosts } from "app/db/blog";

export default function Home() {
  const filteredBlogPosts = getBlogPosts().sort(
    (a, b) =>
      Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date))
  );

  return (
    <div className="max-w-4xl mx-auto w-full">
      <section className="py-12 sm:py-16">
        <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 dark:text-gray-200">
          My name is Jacob.
        </h1>
        <h2 className="text-gray-700 dark:text-gray-200 text-xl sm:text-2xl">
          I am an experienced Software Engineer @{" "}
          <a
            href="https://www.leantechniques.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors underline decoration-gray-400 hover:decoration-gray-900 dark:hover:decoration-white"
          >
            Lean TECHniques
          </a>
        </h2>
      </section>

      <section className="pb-12 sm:pb-16">
        <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-6 text-black dark:text-white">
          Writing
        </h3>
        {!filteredBlogPosts.length ? (
          <p className="text-gray-600 dark:text-gray-400">No posts found.</p>
        ) : (
          <div className="space-y-4">
            {filteredBlogPosts.map((post) => (
              <BlogPost key={post.metadata.title} blog={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
