import BlogPost from "./components/BlogPost";
import AnimatedBlob from "./components/AnimatedBlob";
import { getBlogPosts } from "app/db/blog";

export default function Home() {
  const filteredBlogPosts = getBlogPosts().sort(
    (a, b) =>
      Number(new Date(b.metadata.date)) - Number(new Date(a.metadata.date))
  );

  return (
    <>
      <section className="relative py-12 sm:py-16 pb-16 sm:pb-20 min-h-[450px] flex items-center w-screen -ml-4 sm:-ml-6 lg:-ml-8 pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 mb-8 sm:mb-12">
        <AnimatedBlob />
        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 text-deep-navy dark:text-soft-cream">
            My name is Jacob.
          </h1>
          <h2 className="text-warm-charcoal dark:text-light-gray text-xl sm:text-2xl">
            I am an experienced Software Engineer @{" "}
            <a
              href="https://www.leantechniques.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sage-green dark:hover:text-muted-gold transition-colors underline decoration-sage-green hover:decoration-muted-gold"
            >
              Lean TECHniques
            </a>
          </h2>
        </div>
      </section>

      <div className="max-w-4xl mx-auto w-full">
        <section className="pb-12 sm:pb-16">
          <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-6 text-deep-navy dark:text-soft-cream">
            Writing
          </h3>
          {!filteredBlogPosts.length ? (
            <p className="text-warm-charcoal dark:text-light-gray">No posts found.</p>
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
