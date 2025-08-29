# Repository Guidelines

This guide explains how to contribute to this TypeScript + React (Vite) repository. Keep changes small, focused, and easy to review.

## Project Structure & Module Organization

- `src/pages/`: Route-level views (React Router). Files in PascalCase.
- `src/components/`: App components; use `src/components/ui/` for shadcn/ui primitives.
- `src/integrations/supabase/`: Supabase client and generated types.
- `src/lib/` and `src/hooks/`: Utilities and custom hooks (hooks start with `use`).
- `public/`: Static assets served by Vite.
- `supabase/migrations/`: SQL schema migrations.
- Imports use `@/*` alias (see `tsconfig.json`), e.g., `import Button from '@/components/Button'`.

## Build, Test, and Development Commands

- `npm i`: Install dependencies (Node 18+ recommended).
- `npm run dev`: Start Vite dev server with HMR.
- `npm run build`: Production build to `dist/`.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Lint TypeScript/TSX via ESLint.

## Coding Style & Naming Conventions

- Language: TypeScript + React; 2‑space indent, semicolons, single quotes.
- Components: PascalCase filenames (e.g., `DashboardLayout.tsx`).
- Hooks: camelCase starting with `use` (e.g., `useAuth.ts`).
- Styling: Tailwind CSS utilities; tokens in `tailwind.config.ts`.
- Keep modules small and single‑purpose; co‑locate related files.

## Testing Guidelines

- Runner not configured yet. Recommended: Vitest + React Testing Library.
- Place tests beside sources as `*.test.ts(x)`.
- Prioritize critical logic in `src/lib/` and components with behavior.
- Keep tests fast and isolated; avoid network calls.

## Commit & Pull Request Guidelines

- Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`.
- PRs include: clear description, linked issues, screenshots/GIFs for UI changes, and notes for Supabase migrations.
- Ensure `npm run lint` passes and the app builds before requesting review.

## Security & Configuration Tips

- Supabase config: `src/integrations/supabase/client.ts`.
- Use Vite envs in `.env.local`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- Never commit real service keys; only the anon key is publishable.
- Normalize inputs before writes (e.g., `email.trim().toLowerCase()`), and design queries to respect RLS.

