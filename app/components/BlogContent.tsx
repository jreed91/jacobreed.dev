import Image from "next/image";
import { parseISO, format } from "date-fns";
import { type Blog } from "app/db/blog";
import { CustomMDX } from "./Mdx";
import TableOfContents from "./TableOfContents";

interface BlogContentProps {
  blog: Blog;
}

export default async function BlogContent({ blog }: BlogContentProps) {
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
        {blog.metadata.title}
      </h1>
      <div className="flex items-center mt-2">
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
          {" • "}
          {blog.metadata.readingTime}
        </p>
      </div>
      <div className="w-full mt-6">
        <TableOfContents headings={blog.headings} />
      </div>
      <div className="w-full mt-4 prose prose-gray dark:prose-invert max-w-none">
        <CustomMDX source={blog.content} />
      </div>
    </>
  );
}
