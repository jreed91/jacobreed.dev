# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**jacobreed.dev** is a personal portfolio and blog website built with Next.js. The site features:
- Blog posts written in MDX with syntax highlighting
- Project showcase with database-backed data
- View tracking for blog posts
- Dark mode support with next-themes
- Performance analytics with Vercel Analytics and Speed Insights

## Tech Stack

### Core Framework
- **Next.js 14.2** - React framework with App Router architecture
- **React 18.3** - UI library
- **TypeScript 5.8** - Type safety (strict: false, strictNullChecks: true)
- **Node 20.x** - Runtime environment

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **@tailwindcss/typography** - Beautiful typographic defaults for MDX content
- **next-themes** - Dark mode implementation
- **classnames** - Conditional CSS class utility

### Content & Data
- **next-mdx-remote 5.0** - MDX rendering for blog posts
- **Prisma 6.6** - ORM for MySQL database
- **sugar-high** - Syntax highlighting for code blocks
- **rehype plugins** - Code titles and slug generation for MDX

### Data Fetching
- **SWR 2.3** - React Hooks for data fetching and caching

### Utilities
- **date-fns 4.1** - Date manipulation and formatting
- **sharp 0.34** - Image optimization

### Development Tools
- **Vitest** - Unit testing framework
- **ESLint** - Code linting with Next.js config
- **Prettier 3.5** - Code formatting

## Project Structure

```
jacobreed.dev/
├── app/                    # Next.js App Router
│   ├── api/               # API Route Handlers
│   │   ├── projects/      # Projects API endpoint
│   │   └── views/         # View tracking API
│   ├── blog/              # Blog pages
│   │   ├── [slug]/        # Dynamic blog post pages
│   │   └── page.tsx       # Blog listing page
│   ├── components/        # React components
│   │   ├── BlogLayout.tsx
│   │   ├── BlogPost.tsx
│   │   ├── BlogPostCard.tsx
│   │   ├── Footer.tsx
│   │   ├── Mdx.tsx
│   │   ├── Navigation.tsx
│   │   └── ViewCounter.tsx
│   ├── db/                # Database utilities
│   │   ├── blog.ts        # Blog data fetching
│   │   ├── blog.test.ts   # Blog tests
│   │   └── prisma.ts      # Prisma client
│   ├── projects/          # Projects page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── global.css         # Global styles
├── content/               # MDX blog posts
│   ├── CDK.mdx
│   ├── Explain.mdx
│   └── ...
├── prisma/                # Database schema
│   └── schema.prisma
├── public/                # Static assets
├── backups/               # Database backups
├── .github/               # GitHub workflows
└── config files           # Various config files
```

## Commands

### Development
```bash
npm run dev              # Start dev server with Turbo (http://localhost:3000)
npm run lint             # Run ESLint
npm test                 # Run Vitest tests
```

### Build & Deploy
```bash
npm run build            # Build for production (Next.js build)
npm run start            # Start production server
```

### Database
```bash
npm run generate-prisma  # Generate Prisma Client from schema
```

## Database Schema

Using **MySQL** with Prisma ORM:

### Models
- **views** - Tracks blog post view counts
  - `slug` (String, PK) - Blog post identifier
  - `count` (BigInt) - Number of views

- **projects** - Stores project information
  - `slug` (String, PK) - Project identifier
  - `name` (String) - Project name
  - `description` (String) - Project description
  - `image` (String) - Project image URL

### Environment
- Requires `DATABASE_URL` environment variable for MySQL connection

## Code Style & Conventions

### TypeScript
- **Strict mode**: `false` with `strictNullChecks: true`
- Always define types for function parameters and return values
- Use interfaces for component props (defined inline)
- Leverage type inference where obvious

### File Naming
- **PascalCase**: Components and their files (`BlogPost.tsx`, `ViewCounter.tsx`)
- **camelCase**: Functions, variables, non-component files (`blog.ts`, `prisma.ts`)
- **kebab-case**: MDX content files (`copilot-jetbrains.mdx`)

### Component Guidelines
- **Default to React Server Components** - Only add `"use client"` when needed for:
  - Client-side interactivity (event handlers, state)
  - Browser APIs (localStorage, window)
  - React hooks (useState, useEffect, etc.)
  - Third-party libraries requiring client-side code
- Keep components focused and single-purpose
- Co-locate related components when appropriate

### Import Order
1. React and Next.js imports
2. Third-party library imports
3. Local component imports
4. Type imports (if separate)

Example:
```typescript
import { Suspense } from 'react';
import { Metadata } from 'next';
import classNames from 'classnames';
import { getBlogPosts } from '@/app/db/blog';
import BlogPostCard from '@/app/components/BlogPostCard';
```

### Styling with Tailwind
- Use Tailwind utility classes for styling
- Use `classnames` utility for conditional classes
- Follow mobile-first responsive design
- Leverage custom typography plugin for MDX content
- Support both light and dark mode color schemes

### API Routes
- Place Route Handlers in `/app/api` directory
- Use proper HTTP methods (GET, POST, etc.)
- Return proper status codes and error messages
- Validate inputs and handle errors gracefully

## Content Management (MDX)

### Blog Posts
- Store all blog posts as `.mdx` files in `/content` directory
- Use frontmatter for metadata (title, publishedAt, summary)
- Leverage MDX components for enhanced content
- Syntax highlighting via sugar-high
- Automatic slug generation from filename

### MDX Components
- Custom components available in `app/components/Mdx.tsx`
- Code blocks with titles via rehype-code-titles
- Anchor links via rehype-slug

## Testing

- **Framework**: Vitest
- **Location**: Tests co-located with source files (`*.test.ts`)
- Run tests with `npm test`

## Best Practices

### Performance
- Optimize images with Next.js Image component and sharp
- Use React Server Components for data fetching when possible
- Implement SWR for client-side data fetching and caching
- Lazy load components when appropriate

### Data Fetching
- Server Components: Fetch directly in components
- Client Components: Use SWR for caching and revalidation
- API Routes: Use for dynamic data and external integrations

### Error Handling
- Handle errors gracefully in API routes
- Provide user-friendly error messages
- Log errors for debugging

### Accessibility
- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation works
- Test with screen readers

### Git & Commits
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Use conventional commit format when possible

## Deployment

- **Platform**: Vercel (optimized for Next.js)
- **Analytics**: Vercel Analytics and Speed Insights enabled
- **Environment Variables**: Configure `DATABASE_URL` and other secrets
- **Node Version**: 20.x (specified in package.json engines)