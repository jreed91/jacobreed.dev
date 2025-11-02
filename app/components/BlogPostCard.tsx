import Link from 'next/link';
import cn from 'classnames';
import { parseISO, format } from 'date-fns';

export default function BlogPostCard({ title, slug, summary, date, readingTime }: {title: string, slug: string, summary: string, date: string, readingTime: string}) {

  return (
    <Link href={`/blog/${slug}`}  className={cn(
      'transform hover:scale-[1.01] transition-all',
      'rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1',
      'bg-light-gray dark:bg-warm-charcoal'
    )}>
        <div className="flex flex-col justify-between h-full bg-white dark:bg-deep-navy rounded-lg p-6 border-l-4 border-sage-green">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-lg font-medium w-full text-deep-navy dark:text-soft-cream tracking-tight">
              {title}
            </h4>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <span className="text-sm text-sage-green">{format(parseISO(date), 'MMMM dd, yyyy')}</span>
              <span className="hidden md:inline text-sage-green">•</span>
              <span className="text-sm text-sage-green">{readingTime}</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between mt-3">
              <p className="text-md text-warm-charcoal dark:text-light-gray">{summary}</p>
            </div>
          </div>

    </Link>
  );
}