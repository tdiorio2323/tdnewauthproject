# Repository Guidelines

This guide helps contributors navigate the project structure, workflows, and expectations for this React + TypeScript + Vite app.

## Project Structure & Module Organization
- `src/`: Application code
  - `components/`: UI and layouts (PascalCase, e.g., `DashboardLayout.tsx`)
  - `pages/`: Route screens (React Router)
  - `hooks/`, `lib/`: Reusable logic/utilities (camelCase, e.g., `useMobile.tsx`, `utils.ts`)
  - `integrations/supabase/`: Client and types (`client.ts`)
- `public/`: Static assets served by Vite
- `supabase/`: Local SQL migrations and `config.toml`
- Root config: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`, `tsconfig*.json`, `index.html`

## Build, Test, and Development Commands
- `npm i`: Install dependencies
- `npm run dev`: Start Vite dev server (localhost)
- `npm run build`: Production build to `dist/`
- `npm run build:dev`: Faster development-mode build
- `npm run preview`: Serve the built app locally
- `npm run lint`: Lint TypeScript/React files

## Coding Style & Naming Conventions
- Language: TypeScript + React + Tailwind; 2-space indentation
- Components: PascalCase in `src/components/*/*.tsx`
- Hooks/Utils: camelCase in `src/hooks` and `src/lib`
- Keep components small/pure; avoid unused vars (ESLint enforced)

## Testing Guidelines
- No runner configured yet. If adding tests: use Vitest + React Testing Library
- Place near code as `*.test.ts(x)`; add `npm test` script
- Prioritize routing, Supabase auth flows, and UI state

## Commit & Pull Request Guidelines
- Use Conventional Commits (`feat:`, `fix:`, `refactor:` ...)
- PRs: concise description, linked issues, verification steps, and screenshots/GIFs for UI changes
- Keep PRs small and focused; update docs and migrations when relevant

## Security & Configuration Tips
- Store secrets in `.env.local` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) and access via `import.meta.env`
- Never commit `.env*` files; review `supabase/migrations` for sensitive SQL

## Architecture Overview
- Client-side routing in `src/pages` using React Router
- Shared Supabase client in `src/integrations/supabase/client.ts`

