import BlogPost from "./components/BlogPost";
import AnimatedBlob from "./components/AnimatedBlob";
import { getBlogPosts } from "app/db/blog";

/* Code & Craft Homepage - Professional, clean, restrained */
export default function Home() {
  const filteredBlogPosts = getBlogPosts().sort(
    (a, b) =>
      Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date))
  );

  return (
    <>
      {/* Hero section with animated blob background */}
      <section className="relative py-xl sm:py-2xl pb-xl sm:pb-2xl min-h-[450px] flex items-center w-screen -ml-4 sm:-ml-6 lg:-ml-8 pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 mb-lg sm:mb-xl bg-cc-white dark:bg-cc-deep-slate">
        <AnimatedBlob />
        <div className="relative z-10 max-w-[1200px] mx-auto w-full">
          <h1 className="text-h1 mb-md text-cc-slate dark:text-cc-white">
            My name is Jacob.
          </h1>
          <h2 className="text-h2 text-cc-warm-gray dark:text-cc-soft-gray">
            I am an experienced Software Engineer @{" "}
            <a
              href="https://www.leantechniques.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cc-sage-blue dark:text-cc-sky-blue hover:text-cc-slate dark:hover:text-cc-white transition-colors border-b border-current"
            >
              Lean TECHniques
            </a>
          </h2>
        </div>
      </section>

      {/* Writing section */}
      <div className="max-w-[1200px] mx-auto w-full px-10">
        <section className="pb-xl sm:pb-2xl">
          <h3 className="text-h2 mb-lg text-cc-slate dark:text-cc-white">
            Writing
          </h3>
          {!filteredBlogPosts.length ? (
            <p className="text-body text-cc-warm-gray dark:text-cc-soft-gray">No posts found.</p>
          ) : (
            <div className="space-y-md">
              {filteredBlogPosts.map((post) => (
                <BlogPost key={post.metadata.title} blog={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
