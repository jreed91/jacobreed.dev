import Link from "next/link";
import BlogPost from "./components/BlogPost";
import HeroCanvas from "./components/HeroCanvas";
import TypewriterText from "./components/TypewriterText";
import { getBlogPosts } from "app/db/blog";

export default function Home() {
  const filteredBlogPosts = getBlogPosts().sort(
    (a, b) =>
      Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date))
  );

  return (
    <>
      <section className="relative py-14 sm:py-20 pb-20 sm:pb-28 min-h-[520px] flex items-center w-screen -ml-4 sm:-ml-6 lg:-ml-8 pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 mb-8 sm:mb-12 overflow-hidden">
        <HeroCanvas />

        {/* Subtle gradient wash behind text */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/40 via-transparent to-sky-50/30 dark:from-violet-950/20 dark:via-transparent dark:to-sky-950/20 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          {/* Code-aesthetic label */}
          <p className="font-mono text-xs sm:text-sm text-slate-400 dark:text-slate-500 mb-4 hero-item-1">
            <span className="text-violet-400 dark:text-violet-500">{"// "}</span>
            jacobreed.dev
          </p>

          <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-3 text-gray-900 dark:text-gray-100 hero-item-2">
            My name is Jacob.
          </h1>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-600 dark:text-slate-300 mb-3 hero-item-3 min-h-[1.5em]">
            <TypewriterText />
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-8 hero-item-4">
            at{" "}
            <a
              href="https://www.leantechniques.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors underline decoration-gray-300 dark:decoration-gray-600 hover:decoration-violet-400 underline-offset-2"
            >
              Lean TECHniques
            </a>
          </p>

          <div className="flex flex-wrap gap-3 hero-item-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-700 dark:hover:bg-white transition-colors"
            >
              Read the Blog
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto w-full">
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
    </>
  );
}
