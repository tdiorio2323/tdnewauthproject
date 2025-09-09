# Welcome to your Lovable project

![CI](https://img.shields.io/github/actions/workflow/status/tylerdiorio/tdnewauthproject/ci.yml?branch=main)
[![codecov](https://codecov.io/gh/tylerdiorio/tdnewauthproject/branch/main/graph/badge.svg)](https://codecov.io/gh/tylerdiorio/tdnewauthproject)

## Project info

**URL**: https://lovable.dev/projects/dbcb82db-3a5c-4d43-86a6-c004351ecb04

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/dbcb82db-3a5c-4d43-86a6-c004351ecb04) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/dbcb82db-3a5c-4d43-86a6-c004351ecb04) and click on Share -> Publish.

## Environment Variables

This app requires client-safe Supabase keys via Vite. Copy the example and fill in your Supabase values (build will fail fast if not set):

```
cp .env.example .env.local
# then edit .env.local
VITE_SUPABASE_URL=https://<your-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

## Link Work Area

- After signing in at `/auth`, users land on `/work/link`.
- Configure theme, font, color scheme, button style/layout, links, and add‑ons with a live preview.
- Autosave: Enabled by default (can be toggled). Manual “Save & View My Page” persists and opens `/:handle` in a new tab.
- First-time setup: If you have no handle, a small modal prompts you to set one and seeds your profile.

Supabase setup:
- Add envs in `.env.local` as shown above.
- Run `supabase/migrations/2025-09-09-link-page.sql` in the Supabase SQL Editor to create tables and RLS policies.
- Restart dev server: `npm run dev`.

## Link Work Area (Auth-Protected) — Supabase-Backed

### What it is
A creator “Link Work Area” at `/work/link` to configure a public link page rendered at `/:handle`. Preferences and links persist to Supabase for the signed‑in user.

### Quick start
1) Install deps
```
npm i
npm i @supabase/supabase-js
```
2) Env vars (`.env.local`)
```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```
3) Database
- Run `supabase/migrations/2025-09-09-link-page.sql` in the Supabase SQL Editor.
4) Dev
```
npm run dev
```
Sign in at `/auth` → auto‑redirects to `/work/link`. Click “Save & View My Page” to open `/:handle`.

### Routes
- `/auth` — Supabase email/password auth. Supports `?redirect=/work/link`.
- `/work/link` — Protected editor for handle, theme, font, color scheme, button style/layout, links (CRUD + reorder), and add‑ons.
- `/:handle` — Public page renderer using saved prefs and links.

### Code map
```
src/
  components/
    AuthPage.tsx                 // Auth UI + redirect
    editor/
      StylePanel.tsx             // Theme, font, colors, buttons, layout
      AddOnsEditor.tsx           // Booking email, image URL, shop URL, custom text
      LinkListEditor.tsx         // Links CRUD + drag reorder
    preview/
      LinkPagePreview.tsx        // Live preview bound to ThemeContext
  pages/
    Auth.tsx                     // Auth route shell
    WorkLink.tsx                 // Main Work Area page
    CreatorPage.tsx              // Public renderer for /:handle
  env.ts                         // SUPABASE_ENABLED via env presence
  lib/supabase.ts                // Supabase client (browser)
  integrations/supabase/client.ts// Supabase client (module alias import)
  services/supabase.ts           // ensureProfile, loadOrCreateLinkPage, saveLinkPage, fetchPublicByHandle
  types/index.ts                 // LinkPagePrefs, SectionToggles, LinkItem
vite.config.mts                  // alias "@": "/src"
```

### Data model (created by migration)
- `profiles` (id uuid pk refs auth.users on delete cascade, handle unique, display_name, bio, avatar_url)
- `link_pages` (id uuid pk default gen_random_uuid(), user_id uuid fk → profiles.id, theme, font, color_scheme, button_style, button_layout, sections jsonb, updated_at)
- `links` (id uuid pk default gen_random_uuid(), page_id uuid fk → link_pages.id on delete cascade, label text, url text, position int)
- RLS: owners can read/write their rows.

### Behavior
- First sign‑in: if no profile, user is prompted to set a handle, then `profiles` and `link_pages` are created.
- Save writes prefs, sections, and ordered links.
- Public `/:handle` reads and renders; “Send Request” becomes `mailto:` when `bookingEmail` is set.

### Tests
- LinkListEditor.test.tsx validates add/remove/reorder.
- WorkLink.test.tsx loads existing prefs, saves with Supabase mocked.
- CreatorPage.test.tsx renders links and sections by prefs with Supabase mocked.

### Troubleshooting
- Rollup failed to resolve "@supabase/supabase-js" → ensure `npm i @supabase/supabase-js` and restart dev.
- Alias "@/..." not resolving → confirm vite.config.mts has `resolve: { alias: { '@': '/src' } }`.
- SUPABASE_ENABLED false → set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then restart.
- 401 on `/work/link` → sign in at `/auth` or include `?redirect=/work/link`.

Commit message used: `feat(link-work): add auth-protected Link Work Area, Supabase persistence, and public page renderer`

Next options
- Simple analytics: page views per handle.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Roadmap

See the project plan and acceptance criteria in [docs/LIB_OCR_PLAN.md](./docs/LIB_OCR_PLAN.md).
