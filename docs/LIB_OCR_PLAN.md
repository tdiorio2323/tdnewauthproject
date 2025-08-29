# Link-in-Bio + OCR Intake Project

## Core Idea
- [ ] Public link-in-bio page (like Linktree)
- [ ] Premium main page (like OnlyFans) with subscriptions/paywall
- [ ] Back-end OCR intake system (screenshot/URL → extract profile links → auto-create pages)
- [ ] Creator dashboard to manage links, posts, and inbox

---

## Stack
- [ ] Next.js 14 frontend
- [ ] Fastify API + BullMQ jobs
- [ ] Supabase (Auth, Postgres, Storage, RLS)
- [ ] Stripe (subscriptions)
- [ ] Postmark/Twilio (email/SMS integration)
- [ ] Python/Node OCR (Tesseract/Playwright)

---

## Database
- [ ] profiles → creator handle, bio, avatar
- [ ] links → buttons on link page
- [ ] posts → public/subscriber content
- [ ] subscriptions → Stripe integration
- [ ] contacts/threads/messages → inbox system
- [ ] ocr_jobs → track screenshot → parsed links

---

## APIs
- [ ] /p/:handle → free link page
- [ ] /p/:handle/home → premium page (subscriber feed)
- [ ] /subscribe/:profileId → Stripe checkout
- [ ] /ingest/ocr → enqueue OCR job

---

## Frontend Pages
- [ ] /p/[handle] → link-in-bio
- [ ] /p/[handle]/home → main feed (subscriber unlock)
- [ ] /dash/links → CRUD links
- [ ] /dash/posts → manage posts
- [ ] /dash/inbox → read/respond to messages

---

## OCR Workflow
- [ ] Save screenshot/URL to Supabase storage
- [ ] Run OCR → extract text/links
- [ ] Parse → {name, links[], tags[]}
- [ ] Upsert into profiles + links
- [ ] Update job status

---

## MVP Acceptance Criteria
- [ ] Profile with links shows on /p/[handle]
- [ ] Subscriber-only posts gated by Stripe
- [ ] OCR job creates profile + links automatically
- [ ] Inbound email appears in dashboard inbox
- [ ] RLS prevents cross-org data leaks

---

## Immediate Next Steps
- [ ] Create Supabase tables + RLS
- [ ] Build /p/[handle] + /p/[handle]/home UI
- [ ] Implement /ingest/ocr + worker to parse links