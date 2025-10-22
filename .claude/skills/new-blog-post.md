# New Blog Post

Create a new MDX blog post for jacobreed.dev following the project conventions.

## Instructions

When the user requests a new blog post:

1. **Determine the filename**: Use kebab-case format (e.g., `my-awesome-post.mdx`)

2. **Create the MDX file** in `/content/` directory with proper frontmatter:
   ```mdx
   ---
   title: 'Post Title'
   publishedAt: 'YYYY-MM-DD'
   summary: 'A brief summary of the post (1-2 sentences)'
   ---

   Your content here...
   ```

3. **Frontmatter requirements**:
   - `title`: Clear, descriptive title
   - `publishedAt`: Use today's date in YYYY-MM-DD format
   - `summary`: Brief description for post listings (1-2 sentences)

4. **Content guidelines**:
   - Write in MDX format (Markdown with JSX)
   - Use proper headings (start with ##, not #)
   - Add code blocks with language identifiers for syntax highlighting
   - Keep content well-structured and scannable
   - Support both light and dark mode readers

5. **Available MDX features**:
   - Standard Markdown syntax
   - Syntax-highlighted code blocks (via sugar-high)
   - Code block titles (via rehype-code-titles)
   - Automatic heading anchors (via rehype-slug)
   - Custom MDX components from `app/components/Mdx.tsx`

6. **After creation**:
   - Inform the user of the filename and location
   - Remind them that the post will be automatically picked up by the blog listing
   - Note that views will be tracked automatically when published

## Example

```mdx
---
title: 'Getting Started with Next.js 14'
publishedAt: '2025-10-22'
summary: 'Learn the fundamentals of Next.js 14 and the App Router architecture.'
---

## Introduction

Next.js 14 brings powerful new features...

## Key Features

### Server Components

React Server Components are now the default...

```javascript title="app/page.tsx"
export default function Page() {
  return <h1>Hello World</h1>
}
```

## Conclusion

Next.js 14 makes building modern web applications easier than ever.
```

## Notes

- The slug is automatically derived from the filename
- Posts are sorted by `publishedAt` date in descending order
- View counter will automatically initialize when first visited
- All posts support dark mode automatically via next-themes
