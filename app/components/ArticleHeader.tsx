import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * Shared header for detail pages (posts, talks, projects): a back link to the
 * section, the title, then whatever meta the page has (byline, tags, links).
 */
export default function ArticleHeader({
  section,
  sectionHref,
  title,
  children,
}: {
  section: string;
  sectionHref: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="w-full mb-8 pb-8 border-b border-line">
      <Link
        href={sectionHref}
        className="inline-flex items-center gap-1 mb-4 font-mono text-xs sm:text-sm text-muted hover:text-accent transition-colors"
      >
        <span aria-hidden="true">←</span>
        {section}
      </Link>
      <h1 className="mb-4 text-3xl md:text-5xl font-bold text-ink">{title}</h1>
      {children && <div className="flex flex-col items-start gap-4">{children}</div>}
    </header>
  );
}
