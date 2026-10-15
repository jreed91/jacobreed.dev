import Link from 'next/link';
import { tagSlug } from 'app/db/blog';
import { candyStyle } from 'app/utils/candy';

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
              className={isActive ? 'tag-pill tag-pill-active' : 'tag-pill'}
              style={candyStyle(tag)}
            >
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
