import Link from 'next/link';
import cn from 'classnames';
import { parseISO, format } from 'date-fns';

/* Code & Craft Blog Post Card - No gradients, clean borders */
export default function BlogPostCard({ title, slug, summary, date, readingTime }: {title: string, slug: string, summary: string, date: string, readingTime: string}) {

  return (
    <Link href={`/blog/${slug}`} className="w-full md:w-1/3 block group">
      <article className={cn(
        'border border-cc-border dark:border-cc-slate',
        'bg-cc-white dark:bg-cc-deep-slate',
        'p-lg transition-colors',
        'hover:border-cc-sage-blue dark:hover:border-cc-sky-blue'
      )}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-h3 w-full text-cc-slate dark:text-cc-white group-hover:text-cc-sage-blue dark:group-hover:text-cc-sky-blue transition-colors">
              {title}
            </h4>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-sm">
            <span className="text-caption text-cc-warm-gray dark:text-cc-soft-gray">{format(parseISO(date), 'MMMM dd, yyyy')}</span>
            <span className="hidden md:inline text-cc-warm-gray dark:text-cc-soft-gray">•</span>
            <span className="text-caption text-cc-warm-gray dark:text-cc-soft-gray">{readingTime}</span>
          </div>
          <div className="mt-sm">
            <p className="text-body text-cc-warm-gray dark:text-cc-soft-gray">{summary}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}