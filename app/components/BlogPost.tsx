import { Blog } from 'app/db/blog';
import Link from 'next/link';


export default function BlogPost ({ blog }: { blog: Blog}) {
  return (
    <Link href={`/blog/${blog.slug}`} className="w-full">
        <div className="w-full mb-8 transform hover:scale-[1.01] transition-all rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 p-4">
          <div className="flex items-center justify-between w-full">
            <h4 className="text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100">
              {blog.metadata.title}
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-5 w-5 ml-2 shrink-0"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
              />
            </svg>
          </div>
          <p className="mt-1 text-gray-600 dark:text-gray-400">{blog.metadata.summary}</p>
        </div>
    </Link>
  );
}
