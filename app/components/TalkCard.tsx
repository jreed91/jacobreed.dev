import { Talk } from 'app/db/talks';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';

export default function TalkCard({ talk }: { talk: Talk }) {
  return (
    <Link href={`/talks/${encodeURIComponent(talk.slug)}`} className="group block w-full">
      <div className="w-full mb-4 card-surface p-5 sm:p-6">
        <div className="flex flex-col justify-between md:flex-row">
          <h4 className="w-full mb-2 text-lg font-medium text-ink md:text-xl group-hover:text-accent transition-colors">
            {talk.metadata.title}
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
          <span>{format(parseISO(talk.metadata.date), 'MMMM dd, yyyy')}</span>
          {talk.metadata.event && (
            <>
              <span>•</span>
              <span>{talk.metadata.event}</span>
            </>
          )}
        </div>
        <p className="text-muted">{talk.metadata.summary}</p>
      </div>
    </Link>
  );
}
