import Image from "next/image";
import { parseISO, format } from "date-fns";

import { Suspense, type PropsWithChildren } from "react";
import ViewCounter from "./ViewCounter";
import { Blog } from "app/db/blog";
import { CustomMDX } from "./Mdx";

const editUrl = (slug: string) =>
  `https://github.com/jreed91/jacobreed.dev/edit/master/data/blog/${slug}.mdx`;
const discussUrl = (slug: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://jacobreed.dev/blog/${slug}`
  )}`;

export default function BlogLayout({
  children,
  blog,
}: PropsWithChildren<{ blog: Blog }>) {
  return (
    <article className="flex flex-col items-start justify-center w-full max-w-4xl mx-auto mb-16">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
        {blog.metadata.title}
      </h1>
      <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <Image
            alt="Jacob Reed"
            height={24}
            width={24}
            src="/static/images/avatar.jpeg"
            className="rounded-full"
          />
          <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {"Jacob Reed / "}
            {format(parseISO(blog.metadata.date), "MMMM dd, yyyy")}
          </p>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
          <Suspense fallback={<p className="h-5" />}>
            <ViewCounter slug={blog.slug} />
          </Suspense>
        </p>
      </div>
      <div className="w-full mt-4 prose prose-gray dark:prose-invert max-w-none">
        <CustomMDX source={blog.content} />
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">
        <a
          href={discussUrl(blog.slug)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {"Discuss on Twitter"}
        </a>
        {` • `}
        <a href={editUrl(blog.slug)} target="_blank" rel="noopener noreferrer">
          {"Edit on GitHub"}
        </a>
      </div>
    </article>
  );
}
