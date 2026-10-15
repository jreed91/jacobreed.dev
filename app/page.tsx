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
        <div className="absolute inset-0 bg-gradient-to-br from-accent-soft via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          {/* Code-aesthetic label */}
          <p className="font-mono text-xs sm:text-sm text-muted mb-4 hero-item-1">
            <span className="text-accent">{"// "}</span>
            jacobreed.dev
          </p>

          <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-3 text-ink hero-item-2">
            My name is Jacob.
          </h1>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-ink-soft mb-3 hero-item-3 min-h-[1.5em]">
            <TypewriterText />
          </h2>

          <p className="text-muted text-base sm:text-lg mb-8 hero-item-4">
            at{" "}
            <a
              href="https://www.leantechniques.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft hover:text-accent transition-colors underline decoration-accent decoration-2 underline-offset-4"
            >
              Lean TECHniques
            </a>
          </p>

          <div className="flex flex-wrap gap-3 hero-item-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 btn-candy text-sm"
            >
              Read the Blog
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/talks"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-line text-ink-soft text-sm font-medium hover:border-line-strong hover:text-ink transition-colors"
            >
              View Talks
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto w-full">
        <section className="pb-12 sm:pb-16">
          <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-6 text-ink">
            Writing
          </h3>
          {!filteredBlogPosts.length ? (
            <p className="text-muted">No posts found.</p>
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
