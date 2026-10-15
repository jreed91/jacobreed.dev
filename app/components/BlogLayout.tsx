import Image from "next/image";
import { parseISO, format } from "date-fns";

import { Blog, getRelatedPosts } from "app/db/blog";
import ArticleHeader from "./ArticleHeader";
import { CustomMDX } from "./Mdx";
import RelatedPosts from "./RelatedPosts";
import TableOfContents from "./TableOfContents";
import TagList from "./TagList";

const editUrl = (slug: string) =>
  `https://github.com/jreed91/jacobreed.dev/edit/master/content/${slug}.mdx`;
const discussUrl = (slug: string) =>
  `https://x.com/search?q=${encodeURIComponent(
    `https://jacobreed.dev/blog/${slug}`
  )}`;

export default function BlogLayout({ blog }: { blog: Blog }) {
  return (
    <div className="w-full max-w-4xl mx-auto pt-8 sm:pt-12 mb-16">
      <article className="flex flex-col items-start justify-center w-full">
      <ArticleHeader section="Blog" sectionHref="/blog" title={blog.metadata.title}>
        <div className="flex items-center gap-2">
          <Image
            alt="Jacob Reed"
            height={28}
            width={28}
            src="/static/images/avatar.jpeg"
            className="rounded-full"
          />
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink-soft">Jacob Reed</span>
            {" · "}
            {format(parseISO(blog.metadata.date), "MMMM d, yyyy")}
            {" · "}
            {blog.metadata.readingTime}
          </p>
        </div>
        {blog.metadata.tags.length > 0 && <TagList tags={blog.metadata.tags} />}
      </ArticleHeader>
      <div className="w-full">
        <TableOfContents headings={blog.headings} />
      </div>
      <div className="w-full mt-4 prose prose-brand max-w-none">
        <CustomMDX source={blog.content} />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-10 text-sm text-muted">
        <a
          href={discussUrl(blog.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          {"Discuss on X"}
        </a>
        <a
          href={editUrl(blog.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          {"Edit on GitHub"}
        </a>
      </div>
      <RelatedPosts posts={getRelatedPosts(blog.slug)} />
    </article>
    </div>
  );
}
