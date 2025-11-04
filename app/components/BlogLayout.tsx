import Image from "next/image";
import { parseISO, format } from "date-fns";

import { type PropsWithChildren } from "react";
import { Blog } from "app/db/blog";
import { CustomMDX } from "./Mdx";
import TableOfContents from "./TableOfContents";

const editUrl = (slug: string) =>
  `https://github.com/jreed91/jacobreed.dev/edit/master/data/blog/${slug}.mdx`;
const discussUrl = (slug: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://jacobreed.dev/blog/${slug}`
  )}`;

/* Code & Craft Blog Layout - Clean typography, proper spacing */
export default function BlogLayout({
  children,
  blog,
}: PropsWithChildren<{ blog: Blog }>) {
  return (
    <div className="w-full max-w-[1200px] mx-auto mb-2xl px-10">
      <article className="flex flex-col items-start justify-center w-full">
        <h1 className="mb-md text-h1 text-cc-slate dark:text-cc-white">
          {blog.metadata.title}
        </h1>
        <div className="flex items-center mt-sm mb-lg border-b border-cc-border dark:border-cc-slate pb-md w-full">
          <Image
            alt="Jacob Reed"
            height={24}
            width={24}
            src="/static/images/avatar.jpeg"
            className="rounded-full"
          />
          <p className="ml-sm text-caption text-cc-warm-gray dark:text-cc-soft-gray">
            {"Jacob Reed / "}
            {format(parseISO(blog.metadata.date), "MMMM dd, yyyy")}
            {" • "}
            {blog.metadata.readingTime}
          </p>
        </div>
        <div className="w-full mt-lg">
          <TableOfContents headings={blog.headings} />
        </div>
        <div className="w-full mt-md prose prose-gray dark:prose-invert max-w-none">
          <CustomMDX source={blog.content} />
        </div>
        <div className="mt-lg pt-md border-t border-cc-border dark:border-cc-slate w-full text-caption text-cc-warm-gray dark:text-cc-soft-gray">
          <a
            href={discussUrl(blog.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cc-sage-blue dark:text-cc-sky-blue hover:text-cc-slate dark:hover:text-cc-white transition-colors"
          >
            {"Discuss on Twitter"}
          </a>
          {` • `}
          <a
            href={editUrl(blog.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cc-sage-blue dark:text-cc-sky-blue hover:text-cc-slate dark:hover:text-cc-white transition-colors"
          >
            {"Edit on GitHub"}
          </a>
        </div>
      </article>
    </div>
  );
}
