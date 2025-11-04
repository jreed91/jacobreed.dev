'use client';

import { useEffect, useState } from 'react';
import { Heading } from 'app/db/blog';

/* Code & Craft Table of Contents - Clean borders, consistent colors */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Intersection Observer to track which heading is currently visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    );

    // Observe all headings in the document
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Close mobile menu after clicking
      setIsOpen(false);
    }
  };

  // Only show TOC if there are at least 3 headings
  if (headings.length < 3) {
    return null;
  }

  const tocList = (
    <ul className="space-y-2 text-caption">
      {headings.map(({ id, text, level }) => {
        const isActive = activeId === id;
        return (
          <li
            key={id}
            style={{ paddingLeft: `${(level - 1) * 0.75}rem` }}
          >
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`
                block py-1 transition-colors
                ${
                  isActive
                    ? 'text-cc-sage-blue dark:text-cc-sky-blue font-semibold'
                    : 'text-cc-warm-gray dark:text-cc-soft-gray hover:text-cc-slate dark:hover:text-cc-white'
                }
              `}
            >
              {text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile/Tablet: Collapsible section */}
      <div className="lg:hidden mb-lg border border-cc-border dark:border-cc-slate overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-md py-sm flex items-center justify-between bg-cc-light-blue dark:bg-cc-slate hover:bg-cc-border dark:hover:bg-cc-deep-slate transition-colors"
          aria-expanded={isOpen}
        >
          <h3 className="text-caption font-semibold text-cc-slate dark:text-cc-white">
            Table of Contents
          </h3>
          <svg
            className={`w-5 h-5 text-cc-warm-gray dark:text-cc-soft-gray transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="px-md py-sm bg-cc-white dark:bg-cc-deep-slate border-t border-cc-border dark:border-cc-slate">
            {tocList}
          </div>
        )}
      </div>

      {/* Desktop: Sticky sidebar */}
      <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <div className="mb-md">
          <h3 className="text-caption font-semibold text-cc-slate dark:text-cc-white mb-sm">
            Table of Contents
          </h3>
          {tocList}
        </div>
      </nav>
    </>
  );
}
