# Repository Guidelines

Use this guide to contribute quickly and consistently. It summarizes how the codebase is organized, how to build and test, and the conventions to follow.

## Project Structure & Module Organization
- `src/pages/`: Route-level views (React Router). Files in PascalCase.
- `src/components/`: App components; primitives in `src/components/ui/` (shadcn/ui).
- `src/integrations/supabase/`: Supabase client and generated types.
- `src/lib/`, `src/hooks/`: Utilities and custom hooks (hooks start with `use`).
- `public/`: Static assets served by Vite.
- `supabase/migrations/`: SQL schema migrations.
- Import via `@/*` alias, e.g. `import Button from '@/components/Button';`.

## Build, Test, and Development Commands
- `npm i` — Install dependencies (Node 18+ recommended).
- `npm run dev` — Start Vite dev server with HMR.
- `npm run build` — Create production build in `dist/`.
- `npm run preview` — Serve the production build locally.
- `npm run lint` — Lint TypeScript/TSX with ESLint.
- `npm run test` / `npm run test:watch` / `npm run coverage` — Run, watch, and report coverage with Vitest.

## Coding Style & Naming Conventions
- Language: TypeScript + React; 2‑space indent, semicolons, single quotes.
- Components and pages use PascalCase filenames (e.g., `DashboardLayout.tsx`).
- Hooks: camelCase starting with `use` (e.g., `useAuth.ts`).
- Styling: Tailwind CSS utilities; design tokens live in `tailwind.config.ts`.
- Keep modules small and single‑purpose; co‑locate related files.

## Testing Guidelines
- Stack: Vitest + React Testing Library (`vitest.config.ts`).
- Place tests beside sources as `*.test.ts(x)`; global setup in `tests/setup.ts`.
- Keep tests fast and isolated; mock network/Supabase. Aim for meaningful coverage on logic and critical UI paths.

## Commit & Pull Request Guidelines
- Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`.
- PRs must include: clear description, linked issues, and screenshots/GIFs for UI changes; call out any Supabase migrations.
- Ensure `npm run lint` passes and the app builds before requesting review.

## Security & Configuration Tips
- Supabase config: `src/integrations/supabase/client.ts`.
- Vite envs in `.env.local`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (never commit secrets; only anon key is publishable).
- Normalize inputs before writes (e.g., `email.trim().toLowerCase()`), and design queries to respect RLS.

