# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Development: `npm run dev` (with Turbo enabled)
- Build: `npm run build` (includes generating Prisma client)
- Generate Prisma: `npm run generate-prisma`
- Start production: `npm run start`
- Linting: `npm run lint`

## Code Style
- TypeScript with `strict: false` but `strictNullChecks: true`
- Next.js 15 App Router architecture
- React Server Components by default (no "use client" directive unless needed)
- MDX for content with next-mdx-remote for rendering
- Tailwind CSS for styling with classnames utility

## Conventions
- PascalCase for components and their files
- camelCase for functions, variables, and non-component files
- Component props defined inline with TypeScript interfaces
- Import order: React/Next.js, third-party libraries, then local components
- Components in /app/components, API routes in /app/api
- MDX content files in /content directory
- Prisma ORM for database operations