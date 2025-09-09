# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Route-level views (React Router). Files in PascalCase.
- `src/components/`: App components; use `src/components/ui/` for shadcn/ui primitives.
- `src/integrations/supabase/`: Supabase client and generated types.
- `src/lib/` and `src/hooks/`: Utilities and custom hooks (hooks start with `use`).
- `public/`: Static assets served by Vite.
- `supabase/migrations/`: SQL schema migrations.
- Import via `@/*` alias (see `tsconfig.json`), e.g., `import Button from '@/components/Button'`.

## Build, Test, and Development Commands
- `npm i` — Install dependencies (Node 18+ recommended).
- `npm run dev` — Start Vite dev server with HMR.
- `npm run build` — Production build to `dist/`.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Lint TypeScript/TSX with ESLint.

## Coding Style & Naming Conventions
- Language: TypeScript + React; 2‑space indent, semicolons, single quotes.
- Components: PascalCase filenames (e.g., `DashboardLayout.tsx`).
- Hooks: camelCase starting with `use` (e.g., `useAuth.ts`).
- Styling: Tailwind CSS utilities; tokens in `tailwind.config.ts`.
- Keep modules small, single‑purpose; co‑locate related files.

## Testing Guidelines
- Vitest + React Testing Library configured (`vitest.config.ts`).
- Place tests beside sources as `*.test.ts(x)`.
- Global setup: `tests/setup.ts` (adds `@testing-library/jest-dom`).
- Run tests: `npm run test`, watch: `npm run test:watch`, coverage: `npm run coverage`.
- Keep tests fast and isolated; mock network/Supabase.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`.
- PRs must include: clear description, linked issues, and screenshots/GIFs for UI changes; call out any Supabase migrations.
- Ensure `npm run lint` passes and the app builds before requesting review.

## Security & Configuration Tips
- Supabase config: `src/integrations/supabase/client.ts`.
- Use Vite envs in `.env.local`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- Never commit real service keys; only the anon key is publishable.
- Normalize inputs before writes (e.g., `email.trim().toLowerCase()`), and design queries to respect RLS.
