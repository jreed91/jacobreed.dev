'use client';

import { useEffect, useState } from 'react';
import { Heading } from 'app/db/blog';

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
    <ul className="space-y-2 text-sm">
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
                block py-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400
                ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400'
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
      <div className="lg:hidden mb-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-expanded={isOpen}
        >
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Table of Contents
          </h3>
          <svg
            className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${
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
          <div className="px-4 py-3 bg-white dark:bg-gray-900">
            {tocList}
          </div>
        )}
      </div>

      {/* Desktop: Sticky sidebar */}
      <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Table of Contents
          </h3>
          {tocList}
        </div>
      </nav>
    </>
  );
}
