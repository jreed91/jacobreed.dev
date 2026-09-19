import Link from 'next/link';
import { tagSlug } from 'app/db/blog';

export default function TagList({
  tags,
  activeTag,
}: {
  tags: string[];
  activeTag?: string;
}) {
  if (!tags.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => {
        const slug = tagSlug(tag);
        const isActive = activeTag !== undefined && tagSlug(activeTag) === slug;

        return (
          <li key={slug}>
            <Link
              href={`/blog/tag/${slug}`}
              aria-current={isActive ? 'page' : undefined}
              className={
                isActive
                  ? 'inline-flex rounded-full border border-violet-500 bg-violet-50 dark:bg-violet-950/40 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-300'
                  : 'inline-flex rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors'
              }
            >
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
