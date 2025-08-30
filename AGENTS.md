# Repository Guidelines

## Project Structure & Module Organization
- `src/`: TypeScript + React app code (Tailwind).
  - `components/`: UI and layouts (PascalCase, e.g., `DashboardLayout.tsx`).
  - `pages/`: Route screens (React Router).
  - `hooks/`, `lib/`: Reusable logic (camelCase, e.g., `useMobile.ts`, `utils.ts`).
  - `integrations/supabase/`: Client and types (e.g., `client.ts`).
- `public/`: Static assets served by Vite.
- `supabase/`: Local SQL migrations and `config.toml`.
- Root configs: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`, `tsconfig*.json`, `index.html`.
- Tests (when added): colocated as `*.test.ts(x)` near source.

## Build, Test, and Development Commands
- `npm i`: Install dependencies.
- `npm run dev`: Start Vite dev server (localhost).
- `npm run build`: Production build to `dist/`.
- `npm run build:dev`: Faster development-mode build.
- `npm run preview`: Serve the built app locally.
- `npm run lint`: Lint TypeScript/React files.
- `npm test`: Run Vitest + React Testing Library (when added).

## Coding Style & Naming Conventions
- Language: TypeScript + React; indentation: 2 spaces.
- Components: PascalCase in `src/components/*/*.tsx`.
- Hooks/Utils: camelCase in `src/hooks` and `src/lib`.
- Keep components small and pure; avoid unused vars (ESLint enforced).
- Styling: Prefer Tailwind utility classes; co-locate minimal CSS only when necessary.

## Testing Guidelines
- Frameworks: Vitest + React Testing Library (planned).
- Location: Near source as `*.test.ts` or `*.test.tsx`.
- Scope: Prioritize routing, Supabase auth flows, and UI state.
- Run: `npm test` locally; ensure tests pass before opening a PR.

## Commit & Pull Request Guidelines
- Commits: Use Conventional Commits (e.g., `feat:`, `fix:`, `refactor:`). Group related changes.
- PRs: Provide a clear description, link issues, and list verification steps. Include screenshots/GIFs for UI changes.
- Scope: Keep PRs small and focused; update docs and migrations when relevant.

## Security & Configuration Tips
- Secrets: Store in `.env.local` (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). Access via `import.meta.env`.
- Never commit `.env*` files. Review `supabase/migrations` for sensitive SQL.

## Architecture Overview
- Routing: Client-side via React Router in `src/pages`.
- Supabase: Shared client in `src/integrations/supabase/client.ts`.
