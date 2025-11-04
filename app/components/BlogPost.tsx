import { Blog } from 'app/db/blog';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';

/* Code & Craft Blog Post Card - Clean hover states, minimal transitions */
export default function BlogPost ({ blog }: { blog: Blog}) {
  return (
    <Link href={`/blog/${blog.slug}`} className="w-full block group">
        <article className="w-full border-b border-cc-border dark:border-cc-slate pb-md transition-colors hover:border-cc-sage-blue dark:hover:border-cc-sky-blue">
          <div className="flex flex-col justify-between md:flex-row md:items-start">
            <h4 className="w-full mb-sm text-h3 text-cc-slate dark:text-cc-white group-hover:text-cc-sage-blue dark:group-hover:text-cc-sky-blue transition-colors">
              {blog.metadata.title}
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 ml-2 flex-shrink-0 text-cc-warm-gray dark:text-cc-soft-gray group-hover:text-cc-sage-blue dark:group-hover:text-cc-sky-blue transition-colors"
              aria-hidden="true"
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
          <div className="flex items-center gap-2 mb-sm text-caption text-cc-warm-gray dark:text-cc-soft-gray">
            <span>{format(parseISO(blog.metadata.date), 'MMMM dd, yyyy')}</span>
            <span>•</span>
            <span>{blog.metadata.readingTime}</span>
          </div>
          <p className="text-body text-cc-warm-gray dark:text-cc-soft-gray">{blog.metadata.summary}</p>
        </article>
    </Link>
  );
}
