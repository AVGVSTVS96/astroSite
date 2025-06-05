# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
bun dev         # Start development server at localhost:4321
bun start       # Alternative for dev server

# Building
bun build       # Build for production
bun preview     # Build and preview production build

# Code Quality
bun check       # Run Astro's TypeScript checks
bun lint        # Run Biome linter
bun lint:fix    # Auto-fix linting issues

# Release
bun release     # Semantic release (automated versioning)
```

## Architecture Overview

This is an Astro-based personal website with hybrid rendering (static + serverless) deployed to Vercel. Key architectural decisions:

1. **Hybrid Output Mode**: Most pages are static, but `/api/chat` and AI features require server-side rendering
2. **Component Strategy**: 
   - Astro components (`.astro`) for static content and layouts
   - React components (`.tsx`) for interactive features like ChatUI and command menu
   - shadcn/ui components in `src/components/ui/` following Radix UI patterns
3. **Content Management**: 
   - Blog posts in `src/content/posts/` as Markdown with frontmatter
   - Projects in `src/content/projects/` as YAML files
4. **Styling**: TailwindCSS v4 with new Vite plugin approach (no PostCSS config needed)
5. **AI Integration**: Vercel AI SDK with OpenAI models, chat endpoint at `/api/chat`

## Code Style

- **Linter**: Biome (replaces ESLint + Prettier)
- **Indentation**: 2 spaces
- **Quotes**: Single quotes in JS/TS, double quotes in JSX attributes
- **Trailing commas**: ES5 style
- Run `bun lint:fix` before committing

## TypeScript Configuration

- Strict mode with null checks enabled
- Path aliases configured:
  - `@/` → `src/`
  - `@components/` → `src/components/`
  - `@layouts/` → `src/layouts/`
  - `@pages/` → `src/pages/`
  - `@styles/` → `src/styles/`

## Key Dependencies

- **Astro 4.11.5**: Static site generator with hybrid rendering
- **React 18**: For interactive components
- **TailwindCSS 4.1.5**: Utility-first CSS framework
- **Vercel AI SDK**: For AI chat functionality
- **Radix UI + shadcn/ui**: Accessible component library
- **Expressive Code**: Syntax highlighting for code blocks

## Important Notes

1. **Branch Strategy**: Main branch is `master` (not `main`)
2. **Package Manager**: Use `bun` exclusively, not npm/yarn/pnpm
3. **Image Optimization**: Sharp is configured for image processing
4. **Prefetching**: Aggressive prefetching is enabled for better performance
5. **Markdown Processing**: Custom remark plugin adds section IDs for navigation