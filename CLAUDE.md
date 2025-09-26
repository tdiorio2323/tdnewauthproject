# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CABANA pre-launch platform - A React SPA with Supabase backend for creator link-in-bio pages with waitlist functionality.

## Development Commands

**Start development server:**
```bash
npm run dev
# Runs on http://localhost:8080
```

**Build and test:**
```bash
npm run build
npm run preview  # Test production build locally
npm run test     # Run Vitest tests
npm run test:watch
npm run coverage
```

**Code quality:**
```bash
npx eslint "src/**/*.{ts,tsx}" --fix
npx tsc --noEmit  # TypeScript check
npx @biomejs/biome check src --write  # Format with Biome
```

## Architecture

**Tech Stack:**
- React 19 + TypeScript + Vite
- Supabase (auth, database, storage)
- Tailwind CSS + shadcn/ui components
- React Router DOM v6

**Key Directories:**
- `src/components/` - Reusable UI components (shadcn/ui in `ui/`)
- `src/pages/` - Route-level components
- `src/lib/` - Utilities, types, Supabase client
- `src/services/` - Business logic and API calls
- `src/contexts/` - React context providers
- `src/hooks/` - Custom React hooks

**Main Routes:**
- `/` - Landing page with waitlist
- `/auth` - Supabase authentication
- `/work/link` - Protected link editor (main creator dashboard)
- `/creator-signup` - Creator onboarding
- `/:handle` - Public creator pages (dynamic routing)
- `/claim?t=token` - Claim verification

## Database Setup

**Environment:**
Copy `.env.local.sample` to `.env.local` and configure:
```
VITE_SUPABASE_URL=https://YOUR-REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR-ANON-KEY
```

**Schema:**
Run SQL blocks from `DATABASE_SCHEMA.md` in Supabase SQL editor:
1. Tables (waitlist, signup_requests, profiles, link_pages, links)
2. RLS policies
3. Database functions
4. Storage bucket setup

## Code Conventions

**TypeScript:**
- Relaxed `any` usage allowed in hot files (see eslint.config.js exemptions)
- Path alias: `@/*` maps to `src/*`

**Styling:**
- Tailwind CSS with CABANA brand colors
- Custom design system in `tailwind.config.ts`
- shadcn/ui components for consistent UI

**State Management:**
- React Context for global state (ThemeContext)
- Local state with useState/useEffect
- Supabase real-time subscriptions where needed

## Testing

**Framework:** Vitest + React Testing Library

**Run tests:**
```bash
npm run test        # Single run
npm run test:watch  # Watch mode
npm run coverage    # Coverage report
```

## Deployment

**Build:**
```bash
npm run build
# Output in dist/
```

**Supabase:**
- Configure RLS policies for data security
- Set up storage bucket "intake" for image uploads
- Deploy database functions from schema file

## Key Features

- Waitlist email collection
- Creator page editor with live preview
- Custom themes and styling options
- Public creator pages at `/:handle`
- Drag-and-drop link reordering
- Auto-save functionality
- Token-based claim system