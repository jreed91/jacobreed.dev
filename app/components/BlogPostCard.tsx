import Link from 'next/link';
import cn from 'classnames';
import { parseISO, format } from 'date-fns';

export default function BlogPostCard({ title, slug, summary, date, readingTime }: {title: string, slug: string, summary: string, date: string, readingTime: string}) {

  return (
    <Link href={`/blog/${slug}`}  className={cn(
      'transform hover:scale-[1.01] transition-all',
      'rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1',
      'bg-gray-200'
    )}>
        <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-lg font-medium w-full text-gray-900 dark:text-gray-100 tracking-tight">
              {title}
            </h4>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">{format(parseISO(date), 'MMMM dd, yyyy')}</span>
              <span className="hidden md:inline text-gray-500 dark:text-gray-400">•</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{readingTime}</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between mt-3">
              <p className="text-md text-gray-700 dark:text-gray-300">{summary}</p>
            </div>
          </div>

    </Link>
  );
}