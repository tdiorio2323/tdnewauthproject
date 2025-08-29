import { useMemo, useState } from 'react'
import GlassMasterCard from '@/components/GlassMasterCard'
import { frostedButtonStyle, frostedInputStyle } from '@/lib/frosted'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from "@/hooks/use-toast";

type LinkRow = { label: string; url: string }

export default function WaitlistStyled() {
  const [email, setEmail] = useState('')
  const [handle, setHandle] = useState('')
  const [title, setTitle] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [links, setLinks] = useState<LinkRow[]>([{ label: '', url: '' }])
  const [notes, setNotes] = useState('')
  const [prefs, setPrefs] = useState({ stripe: true, emailBtn: true })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [claimUrl, setClaimUrl] = useState<string | null>(null)
  const { toast } = useToast();

  const emailValid = useMemo(() => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email), [email])
  const handleClean = (v: string) => v.replace(/[^a-z0-9._-]/gi, '').toLowerCase()

  function addLink() {
    setLinks((a) => [...a, { label: '', url: '' }])
  }

  async function sha256(s: string) {
    const buf = new TextEncoder().encode(s)
    const digest = await crypto.subtle.digest('SHA-256', buf)
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('')
  }

  async function submit() {
    setLoading(true)
    setErr(null)
    try {
      const token = crypto.randomUUID()
      const tokenHash = await sha256(token)

      let logo_path: string | null = null
      if (logo) {
        const key = `intake/${crypto.randomUUID()}-${logo.name.replace(/\s+/g, '_')}`
        const { error: upErr } = await supabase.storage.from('intake').upload(key, logo, { upsert: false })
        if (upErr) throw upErr
        logo_path = key
      }

      const payload = {
        email,
        handle: handleClean(handle),
        title,
        links,
        notes,
        choices: { stripe: prefs.stripe, emailBtn: prefs.emailBtn },
        logo_path,
        claim_token_hash: tokenHash,
        status: 'pending' as const,
      }

      const { error } = await supabase.from('signup_requests').insert([payload])
      if (error) throw error

      const url = `${location.origin}/claim?t=${encodeURIComponent(token)}`
      setClaimUrl(url)
      setDone(true)
    } catch (e: Error) {
      setErr(e?.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen min-h-dvh text-white antialiased">
      <div className="pointer-events-none absolute inset-0 bg-black/35" aria-hidden />
      <section className="relative mx-auto flex max-w-md sm:max-w-lg md:max-w-xl items-center justify-center px-4 py-12 sm:py-16 md:py-20">
        <GlassMasterCard>
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="h-24 w-24 overflow-hidden rounded-full border border-white/20 bg-white/10">
              {logo ? (
                <img src={URL.createObjectURL(logo)} alt="Logo preview" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="mt-4 flex h-16 flex-col justify-center">
              {title && <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>}
              {handle && <p className="text-xs md:text-sm text-white/60">@{handleClean(handle)}</p>}
            </div>
          </div>

          <div className="space-y-5">
            {/* Logo */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/70">Logo / Picture</label>
              <label className="inline-flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm text-white/80 transition-colors hover:text-white" style={frostedButtonStyle()}>
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) setLogo(f)
                  }}
                />
              </label>
              {logo && <span className="ml-3 align-middle text-xs text-white/50">{logo.name}</span>}
            </div>

            {/* Email + Handle */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/70">Email*</label>
                <input
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30"
                  style={frostedInputStyle()}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/70">Handle*</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50">@</span>
                  <input
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full rounded-xl px-7 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30"
                    style={frostedInputStyle()}
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/70">Title</label>
              <input
                placeholder="Your display name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30"
                style={frostedInputStyle()}
              />
            </div>

            {/* Links repeater */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/70">Links</label>
              <div className="space-y-2">
                {links.map((link, i) => (
                  <div key={i} className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <input
                      placeholder="Label (Instagram, Shop…)"
                      value={link.label}
                      onChange={(e) => setLinks((arr) => arr.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30"
                      style={frostedInputStyle()}
                    />
                    <input
                      placeholder="https://…"
                      value={link.url}
                      onChange={(e) => setLinks((arr) => arr.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30"
                      style={frostedInputStyle()}
                    />
                  </div>
                ))}
              </div>
              <button type="button" onClick={addLink} className="mt-3 text-sm text-white/70 underline-offset-2 hover:text-white hover:underline">
                + Add another link
              </button>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/70">Notes / preferences</label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full resize-none rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30"
                style={frostedInputStyle()}
              />
            </div>

            {/* Prefs */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="inline-flex items-center gap-2 text-sm text-white/80">
                <input type="checkbox" checked={prefs.stripe} onChange={(e) => setPrefs({ ...prefs, stripe: e.target.checked })} />
                Enable Stripe payments
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-white/80">
                <input type="checkbox" checked={prefs.emailBtn} onChange={(e) => setPrefs({ ...prefs, emailBtn: e.target.checked })} />
                Show email button
              </label>
            </div>
          </div>

          {err && <p className="mt-4 text-center text-sm text-red-400">{err}</p>}

          <div className="mt-6">
            <button
              disabled={loading || !emailValid || handle.length < 2}
              onClick={submit}
              className="h-12 w-full rounded-full text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
              style={frostedButtonStyle()}
            >
              {loading ? 'Reserving…' : 'Reserve & Get Early Access'}
            </button>
          </div>

          {done && (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              <div className="mb-1">Claim link (copy and save):</div>
              <div className="flex items-center gap-2">
                <div className="break-all flex-1">{claimUrl}</div>
                <button
                  type="button"
                  onClick={async () => {
                    if (!claimUrl) return
                    try { await navigator.clipboard.writeText(claimUrl) } catch (error: Error) {
                      toast({
                        title: "Error",
                        description: error.message,
                        variant: "destructive"
                      });
                    }
                  }}
                  className="rounded-full px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-white/30"
                  style={frostedButtonStyle()}
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </GlassMasterCard>
      </section>
    </main>
  )
}
