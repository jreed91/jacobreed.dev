import Link from 'next/link';
import cn from 'classnames';
import { parseISO, format } from 'date-fns';

export default function BlogPostCard({ title, slug, summary, date, readingTime }: {title: string, slug: string, summary: string, date: string, readingTime: string}) {

  return (
    <Link href={`/blog/${slug}`}  className={cn(
      'w-full md:w-1/3 card-candy'
    )}>
        <div className="flex flex-col justify-between h-full p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-lg font-medium w-full text-ink tracking-tight">
              {title}
            </h4>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <span className="text-sm text-ink-soft">{format(parseISO(date), 'MMMM dd, yyyy')}</span>
              <span className="hidden md:inline text-muted">•</span>
              <span className="text-sm text-muted">{readingTime}</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between mt-3">
              <p className="text-md text-ink-soft">{summary}</p>
            </div>
          </div>

    </Link>
  );
}