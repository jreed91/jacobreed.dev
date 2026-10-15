import { ReactNode } from 'react';

/**
 * Shared header for index pages (Blog, Projects, Talks, tag pages): a small
 * mono eyebrow, the page title and an optional intro line.
 */
export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10">
      <p className="mb-3 font-mono text-xs sm:text-sm text-muted">
        <span className="text-accent">{'// '}</span>
        {eyebrow}
      </p>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
        {title}
      </h1>
      {children && (
        <div className="mt-4 max-w-2xl text-base sm:text-lg text-muted">
          {children}
        </div>
      )}
    </header>
  );
}
