# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**jacobreed.dev** is a personal portfolio and blog website built with Next.js. The site features:
- Blog posts written in MDX with syntax highlighting and reading time estimates
- Dynamic table of contents for blog posts
- Project showcase via API endpoint
- Dark mode support with next-themes
- Performance analytics with Vercel Analytics and Speed Insights
- SEO with dynamic sitemap, robots.txt, and structured data (JSON-LD)

## Tech Stack

### Core Framework
- **Next.js 16.3** - React framework with App Router architecture
- **React 19.2** - UI library
- **TypeScript 6.0** - Type safety (strict: false, strictNullChecks: true)
- **Node 22.x** - Runtime environment (v22.22.2 pinned via .nvmrc, `engines` requires >=22.12.0)

### Styling
- **Tailwind CSS 4.3** - Utility-first CSS framework (v4 with `@tailwindcss/postcss`)
- **@tailwindcss/typography** - Beautiful typographic defaults for MDX content
- **next-themes 0.4** - Dark mode implementation (system default, class attribute)
- **classnames** - Conditional CSS class utility

### Content & Data
- **next-mdx-remote 6.0** - MDX rendering for blog posts
- **Prisma 7.10** - ORM for MySQL database
- **sugar-high** - Syntax highlighting for code blocks
- **rehype-code-titles** - Code block title annotations
- **rehype-slug** - Anchor link generation for headings
- **reading-time** - Automatic reading time calculation

### Data Fetching
- **SWR 2.5** - React Hooks for data fetching and caching (used in projects page)

### Utilities
- **date-fns 4.4** - Date manipulation and formatting
- **sharp 0.35** - Image optimization

### Development Tools
- **Vitest 5.0** - Unit testing framework
- **ESLint 9** - Code linting (flat config via `eslint.config.mjs`)
- **Prettier 3.9** - Code formatting

## Project Structure

```
jacobreed.dev/
├── app/                    # Next.js App Router
│   ├── api/
│   │   └── projects/      # Projects API endpoint (GET, returns mock data)
│   │       └── route.ts
│   ├── blog/              # Blog pages
│   │   ├── [slug]/        # Dynamic blog post pages
│   │   │   └── page.tsx   # Per-post page with JSON-LD, OG metadata
│   │   └── page.tsx       # Blog listing page
│   ├── components/        # React components
│   │   ├── AnimatedBlob.tsx    # Animated gradient blobs (client)
│   │   ├── BlogLayout.tsx      # Blog post layout wrapper (server)
│   │   ├── BlogPost.tsx        # Blog post preview (server)
│   │   ├── BlogPostCard.tsx    # Blog card layout (server)
│   │   ├── Footer.tsx          # Site footer (server)
│   │   ├── Mdx.tsx             # MDX renderer with sugar-high (server)
│   │   ├── Navigation.tsx      # Main nav header (client)
│   │   ├── TableOfContents.tsx # Dynamic TOC with IntersectionObserver (client)
│   │   └── ThemeProvider.tsx   # next-themes wrapper (client)
│   ├── db/                # Data access utilities
│   │   ├── blog.ts        # File-based blog post loading
│   │   ├── blog.test.ts   # Vitest tests for blog data
│   │   └── prisma.ts      # Prisma client singleton
│   ├── projects/          # Projects page (uses SWR + /api/projects)
│   │   └── page.tsx
│   ├── apple-icon.tsx     # Dynamic Apple touch icon (180x180, Edge runtime)
│   ├── global.css         # Global styles + Tailwind imports
│   ├── icon.tsx           # Dynamic favicon (32x32, Edge runtime)
│   ├── layout.tsx         # Root layout (Analytics, SpeedInsights, ThemeProvider)
│   ├── page.tsx           # Home page with animated hero
│   ├── robots.ts          # robots.txt generator
│   └── sitemap.ts         # sitemap.xml generator
├── content/               # MDX blog posts (7 posts)
│   ├── CDK.mdx
│   ├── Explain.mdx
│   ├── ai-accelerator-not-solution.mdx
│   ├── copilot-jetbrains.mdx
│   ├── dad.mdx
│   ├── migrate-cloudformation.mdx
│   └── migrate-postgres-instances.mdx
├── prisma/                # Database schema (MySQL)
│   └── schema.prisma
├── public/                # Static assets
│   ├── favicon.ico
│   └── static/images/     # Blog and profile images
├── backups/               # Backup files
├── .github/               # GitHub workflows and templates
│   ├── workflows/
│   │   ├── auto-merge.yml       # Auto-merge minor Dependabot PRs
│   │   └── codeql-analysis.yml  # Weekly CodeQL security scan
│   ├── ISSUE_TEMPLATE/          # Bug/feature issue templates
│   ├── copilot-instructions.md
│   ├── dependabot.yml           # Daily npm + GitHub Actions updates
│   └── git-commit-instructions.md
├── CLAUDE.md              # This file
├── ROADMAP.md             # Development roadmap
├── eslint.config.mjs      # ESLint v9 flat config
├── next.config.js         # Next.js config (reactStrictMode: true)
├── postcss.config.js      # PostCSS with @tailwindcss/postcss
├── prisma.config.ts       # Prisma config (reads DATABASE_URL)
├── tailwind.config.ts     # Tailwind config with blob animation keyframes
└── tsconfig.json          # TypeScript config
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

Using **MySQL** with Prisma ORM. Requires `DATABASE_URL` environment variable.

### Current Models

- **projects** - Stores project information
  - `slug` (String, PK, VarChar 128) - Project identifier
  - `name` (String, Text) - Project name
  - `description` (String, Text) - Project description
  - `image` (String, Text) - Project image URL

> **Note:** The `/api/projects` route currently returns mock data. The Prisma client is set up but requires `DATABASE_URL` to be configured for live database queries.

### Environment Variables
- `DATABASE_URL` - MySQL connection string (required for Prisma, not needed for blog/static content)

## Key Data Types

Defined in `app/db/blog.ts`:

```typescript
type Metadata = {
  title: string;
  date: string;
  summary: string;
  image?: string;
  readingTime: string;  // e.g. "5 min read"
};

type Heading = {
  id: string;   // Kebab-case anchor id
  text: string; // Display text
  level: number; // 1-6
};

type Blog = {
  content: string;
  metadata: Metadata;
  slug: string;
  headings: Heading[];
};
```

## Blog System

### How Posts Are Loaded
`getBlogPosts()` in `app/db/blog.ts`:
1. Reads all `.mdx` files from the `content/` directory
2. Parses YAML frontmatter (regex-based, no external library)
3. Extracts headings from markdown for the table of contents
4. Calculates reading time with the `reading-time` library
5. Returns an array of `Blog` objects

### Frontmatter Format
```yaml
---
title: My Post Title
date: '2024-01-15'
summary: A short description of the post
image: /static/images/my-image.jpg  # optional
---
```

> **Note:** The frontmatter key is `date` (not `publishedAt`). Use this key when creating new posts.

### Adding a New Blog Post
1. Create a `.mdx` file in `/content/` using kebab-case filename (e.g., `my-new-post.mdx`)
2. Add frontmatter with `title`, `date`, `summary`, and optionally `image`
3. Write content in MDX — the slug is automatically derived from the filename

### MDX Components
Custom components in `app/components/Mdx.tsx`:
- Code blocks with titles via `rehype-code-titles`
- Anchor links on headings via `rehype-slug`
- Syntax highlighting via `sugar-high`

## Code Style & Conventions

### TypeScript
- **Strict mode**: `false` with `strictNullChecks: true`
- Always define types for function parameters and return values
- Use interfaces for component props (defined inline)
- Leverage type inference where obvious

### File Naming
- **PascalCase**: Components and their files (`BlogPost.tsx`, `Navigation.tsx`)
- **camelCase**: Functions, variables, non-component files (`blog.ts`, `prisma.ts`)
- **kebab-case**: MDX content files (`copilot-jetbrains.mdx`)

### Component Guidelines
- **Default to React Server Components** - Only add `"use client"` when needed for:
  - Client-side interactivity (event handlers, state)
  - Browser APIs (localStorage, window, IntersectionObserver)
  - React hooks (useState, useEffect, etc.)
  - Third-party libraries requiring client-side code (next-themes)
- Keep components focused and single-purpose
- Co-locate related components when appropriate

**Client components in this project:**
- `Navigation.tsx` - active link state
- `ThemeProvider.tsx` - next-themes requires client
- `AnimatedBlob.tsx` - interactive animations
- `TableOfContents.tsx` - IntersectionObserver for active heading tracking

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
- **Tailwind v4** — configured via `@tailwindcss/postcss` in `postcss.config.js`
- Use Tailwind utility classes for styling
- Use `classnames` utility for conditional classes
- Follow mobile-first responsive design
- Leverage custom typography plugin for MDX content
- Support both light and dark mode color schemes
- Custom animation: `animate-blob` with `.animation-delay-2000` and `.animation-delay-4000` helper classes defined in `global.css`

### API Routes
- Place Route Handlers in `/app/api` directory
- Use proper HTTP methods (GET, POST, etc.)
- Return `new Response(JSON.stringify(data))` for JSON responses
- Validate inputs and handle errors gracefully

## SEO & Metadata

- **Root metadata**: defined in `app/layout.tsx`
- **Per-post metadata**: `generateMetadata()` in `app/blog/[slug]/page.tsx`
- **JSON-LD**: BlogPosting schema injected in blog post pages
- **Sitemap**: auto-generated from blog posts via `app/sitemap.ts`
- **Robots**: generated via `app/robots.ts`
- **Icons**: dynamic favicon (`app/icon.tsx`) and Apple touch icon (`app/apple-icon.tsx`) using Edge runtime

## Testing

- **Framework**: Vitest
- **Location**: Tests co-located with source files (`*.test.ts`)
- **Current test**: `app/db/blog.test.ts` — validates `getBlogPosts()` returns correct count and shape
- Run tests with `npm test`

## GitHub Workflows

- **auto-merge.yml** — Automatically merges minor version Dependabot PRs (requires `MY_TOKEN` secret)
- **codeql-analysis.yml** — CodeQL security analysis on push/PR to master and weekly schedule
- **dependabot.yml** — Daily dependency updates for npm packages and GitHub Actions

## Best Practices

### Performance
- Optimize images with Next.js Image component and sharp
- Use React Server Components for data fetching when possible
- Use SWR for client-side data fetching and caching
- Static generation for all blog post pages via `generateStaticParams()`

### Data Fetching
- Server Components: Fetch directly in components (blog posts use file-based loading)
- Client Components: Use SWR for caching and revalidation (projects page)
- API Routes: Use for dynamic data and external integrations

### Error Handling
- Handle errors gracefully in API routes
- Provide user-friendly error messages
- Log errors for debugging

### Accessibility
- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation works
- TableOfContents collapses on mobile/tablet, shows as sticky sidebar on desktop (lg breakpoint)

### Git & Commits
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Use conventional commit format when possible
- See `.github/git-commit-instructions.md` for project-specific guidelines

## Deployment

- **Platform**: Vercel (optimized for Next.js)
- **Analytics**: Vercel Analytics and Speed Insights enabled in root layout
- **Environment Variables**: Configure `DATABASE_URL` for Prisma (optional for blog-only functionality)
- **Node Version**: 20.x (specified in `package.json` engines and `.nvmrc`)
