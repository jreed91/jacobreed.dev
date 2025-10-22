# New React Component

Create a new React component for jacobreed.dev following the project conventions.

## Instructions

When the user requests a new component:

1. **Determine component location**:
   - Shared components: `/app/components/`
   - Page-specific components: Co-locate with the page
   - Use PascalCase for filename (e.g., `BlogPostCard.tsx`)

2. **Default to Server Components**:
   - Start with React Server Components (no `"use client"` directive)
   - Only add `"use client"` when the component needs:
     - Client-side interactivity (onClick, onChange, etc.)
     - React hooks (useState, useEffect, etc.)
     - Browser APIs (window, localStorage, etc.)
     - Third-party libraries requiring client-side code

3. **Component structure**:
   ```typescript
   import { ComponentProps } from 'react';
   // Other imports...

   interface ComponentNameProps {
     // Define props here
   }

   export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
     return (
       <div>
         {/* Component content */}
       </div>
     );
   }
   ```

4. **Import order**:
   - React and Next.js imports first
   - Third-party library imports
   - Local component imports
   - Type imports (if separate)

5. **Styling with Tailwind**:
   - Use Tailwind utility classes
   - Use `classnames` for conditional classes
   - Follow mobile-first responsive design
   - Support both light and dark mode
   - Example dark mode: `bg-white dark:bg-gray-900`

6. **TypeScript conventions**:
   - Define inline interfaces for props
   - Type all parameters and return values
   - Use type inference where obvious
   - Enable strictNullChecks compliance

7. **Accessibility**:
   - Use semantic HTML elements
   - Add proper ARIA labels when needed
   - Ensure keyboard navigation works
   - Provide alt text for images

## Server Component Example

```typescript
import { formatDate } from 'date-fns';
import Link from 'next/link';

interface BlogPostCardProps {
  title: string;
  summary: string;
  publishedAt: string;
  slug: string;
}

export default function BlogPostCard({
  title,
  summary,
  publishedAt,
  slug
}: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block p-6 bg-white dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow"
    >
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        {title}
      </h2>
      <time className="text-sm text-gray-600 dark:text-gray-400">
        {formatDate(new Date(publishedAt), 'MMMM dd, yyyy')}
      </time>
      <p className="mt-3 text-gray-700 dark:text-gray-300">
        {summary}
      </p>
    </Link>
  );
}
```

## Client Component Example

```typescript
'use client';

import { useState } from 'react';
import classNames from 'classnames';

interface ToggleButtonProps {
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
  label: string;
}

export default function ToggleButton({
  initialState = false,
  onToggle,
  label
}: ToggleButtonProps) {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle?.(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={classNames(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        {
          'bg-blue-600 text-white': isOn,
          'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white': !isOn,
        }
      )}
      aria-pressed={isOn}
    >
      {label}
    </button>
  );
}
```

## Notes

- Server Components can fetch data directly (no need for useEffect)
- Client Components should use SWR for data fetching when needed
- Keep components focused and single-purpose
- Test components in both light and dark mode
- Ensure responsive design works on mobile, tablet, and desktop
