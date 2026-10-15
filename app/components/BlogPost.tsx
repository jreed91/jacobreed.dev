import { Blog } from 'app/db/blog';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import { candyStyle } from 'app/utils/candy';


export default function BlogPost ({ blog }: { blog: Blog}) {
  return (
    <Link href={`/blog/${encodeURIComponent(blog.slug)}`} className="group block w-full">
        <div className="w-full mb-4 card-candy p-5 sm:p-6">
          <div className="flex flex-col justify-between md:flex-row">
            <h4 className="w-full mb-2 text-lg font-medium text-ink md:text-xl group-hover:text-accent transition-colors">
              {blog.metadata.title}
            </h4>
            <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="hidden md:block h-6 w-6 ml-1 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
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
          <div className="flex items-center gap-2 mb-2 text-sm text-muted">
            <span>{format(parseISO(blog.metadata.date), 'MMMM dd, yyyy')}</span>
            <span>•</span>
            <span>{blog.metadata.readingTime}</span>
          </div>
          <p className="text-muted">{blog.metadata.summary}</p>
          {blog.metadata.tags.length > 0 && (
            // Plain pills rather than links: this card is already one big anchor.
            <ul className="flex flex-wrap gap-2 mt-3" aria-label="Tags">
              {blog.metadata.tags.map((tag) => (
                <li key={tag} className="pill-candy" style={candyStyle(tag)}>
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
    </Link>
  );
}
