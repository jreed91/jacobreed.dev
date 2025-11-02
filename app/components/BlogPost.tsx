import { Blog } from 'app/db/blog';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';


export default function BlogPost ({ blog }: { blog: Blog}) {
  return (
    <Link href={`/blog/${blog.slug}`} className="w-full ">
        <div className="w-full mb-8 transform hover:scale-[1.01] transition-all">
          <div className="flex flex-col justify-between md:flex-row">
            <h4 className="w-full mb-2 text-lg font-medium text-deep-navy md:text-xl dark:text-soft-cream">
              {blog.metadata.title}
            </h4>
            <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 ml-1 text-sage-green"
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
          </div>
          <div className="flex items-center gap-2 mb-2 text-sm text-sage-green">
            <span>{format(parseISO(blog.metadata.date), 'MMMM dd, yyyy')}</span>
            <span>•</span>
            <span>{blog.metadata.readingTime}</span>
          </div>
          <p className="text-warm-charcoal dark:text-light-gray">{blog.metadata.summary}</p>
        </div>
    </Link>
  );
}
