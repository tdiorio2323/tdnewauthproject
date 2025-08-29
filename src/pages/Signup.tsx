import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { BUTTON_STYLES, CARD_STYLES, BACKGROUNDS, EFFECTS, PAYMENT_LINKS, CONTACT_BTNS, type IntakeLink, type Choice } from '@/lib/presets'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [handle, setHandle] = useState('')
  const [title, setTitle] = useState('')
  const [links, setLinks] = useState<IntakeLink[]>([{ label: '', href: '' }])
  const [notes, setNotes] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [choices, setChoices] = useState<Choice>({
    buttons: 'glass',
    cards: 'chrome',
    background: 'palms',
    effects: 'glow',
    payment: ['stripe'],
    contact: ['email'],
  })
  const [claimUrl, setClaimUrl] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const addLink = () => setLinks((a) => [...a, { label: '', href: '' }])

  async function sha256(s: string) {
    const buf = new TextEncoder().encode(s)
    const digest = await crypto.subtle.digest('SHA-256', buf)
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !handle) return
    setBusy(true)
    try {
      const token = crypto.randomUUID()
      const tokenHash = await sha256(token)

      let logo_path: string | null = null
      if (logoFile) {
        const key = `intake/${crypto.randomUUID()}-${logoFile.name.replace(/\s+/g, '_')}`
        const { error } = await supabase.storage
          .from('intake')
          .upload(key, logoFile, { upsert: false })
        if (error) throw error
        logo_path = key
      }

      const { error } = await supabase.from('signup_requests').insert([
        {
          email,
          handle,
          title,
          links,
          notes,
          choices,
          logo_path,
          claim_token_hash: tokenHash,
          status: 'pending',
        },
      ])
      if (error) throw error

      const url = `${location.origin}/claim?t=${encodeURIComponent(token)}`
      setClaimUrl(url)
    } catch (err) {
      console.error(err)
      alert('Could not save. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="min-h-dvh bg-[#0b0c0f] text-white grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-lg space-y-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-2xl">
        <h1 className="text-xl font-semibold">Claim your CABANA page</h1>
        <p className="text-sm text-white/70">Reserve a handle, upload a logo, drop links, and set preferences.</p>

        {/* Picture */}
        <label className="block text-sm">Logo / Picture
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full rounded-xl border border-white/12 bg-white/6 px-3 py-2"
          />
        </label>

        {/* URL + Title */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-sm">Email*
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/12 bg-white/6 px-3 py-2"
            />
          </label>
          <label className="block text-sm">Handle* (URL)
            <div className="mt-1 flex">
              <span className="inline-flex items-center rounded-l-xl border border-white/12 bg-white/6 px-3">/</span>
              <input
                required
                value={handle}
                onChange={(e) => setHandle(e.target.value.replace(/[^a-z0-9-_]/gi, ''))}
                className="w-full rounded-r-xl border border-l-0 border-white/12 bg-white/6 px-3 py-2"
              />
            </div>
          </label>
        </div>
        <label className="block text-sm">Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/12 bg-white/6 px-3 py-2"
          />
        </label>

        {/* Links repeater */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Links</div>
          {links.map((l, i) => (
            <div key={i} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <input
                placeholder="Label (Instagram, Shop…)"
                value={l.label}
                onChange={(e) => setLinks((arr) => arr.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                className="rounded-xl border border-white/12 bg-white/6 px-3 py-2"
              />
              <input
                placeholder="https://…"
                value={l.href}
                onChange={(e) => setLinks((arr) => arr.map((x, j) => (j === i ? { ...x, href: e.target.value } : x)))}
                className="rounded-xl border border-white/12 bg-white/6 px-3 py-2"
              />
            </div>
          ))}
          <button type="button" onClick={addLink} className="text-sm underline">
            + Add another link
          </button>
        </div>

        {/* Notes */}
        <label className="block text-sm">Notes / preferences
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/12 bg-white/6 px-3 py-2"
          />
        </label>

        {/* Preset choices */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select label="Buttons" list={BUTTON_STYLES} value={choices.buttons} onChange={(v) => setChoices((c) => ({ ...c, buttons: v as Choice['buttons'] }))} />
          <Select label="Cards" list={CARD_STYLES} value={choices.cards} onChange={(v) => setChoices((c) => ({ ...c, cards: v as Choice['cards'] }))} />
          <Select label="Background" list={BACKGROUNDS} value={choices.background} onChange={(v) => setChoices((c) => ({ ...c, background: v as Choice['background'] }))} />
          <Select label="Effects" list={EFFECTS} value={choices.effects} onChange={(v) => setChoices((c) => ({ ...c, effects: v as Choice['effects'] }))} />
        </div>

        <CheckboxGroup label="Payment links" options={PAYMENT_LINKS as unknown as string[]} value={choices.payment} onChange={(arr) => setChoices((c) => ({ ...c, payment: arr }))} />
        <CheckboxGroup label="Contact buttons" options={CONTACT_BTNS as unknown as string[]} value={choices.contact} onChange={(arr) => setChoices((c) => ({ ...c, contact: arr }))} />

        <button disabled={busy} className="w-full rounded-full px-4 py-3 font-medium text-black [background:linear-gradient(90deg,#87e6ff,#b48cff,#f5cf7a)]">
          {busy ? 'Saving…' : 'Reserve & Get Early Access'}
        </button>

        {claimUrl && (
          <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
            <div className="mb-1">Claim link (copy and save):</div>
            <div className="flex items-center gap-2">
              <div className="break-all flex-1">{claimUrl}</div>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(claimUrl!)
                    alert('Copied to clipboard')
                  } catch {
                    // Fallback: prompt copy
                    window.prompt('Copy claim link:', claimUrl!)
                  }
                }}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs hover:bg-white/8"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </form>
    </main>
  )
}

function Select({ label, list, value, onChange }: { label: string; list: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border border-white/12 bg-white/6 px-3 py-2">
        {list.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </label>
  )
}

function CheckboxGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <fieldset className="text-sm">
      <legend className="mb-1">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const checked = value.includes(opt)
          return (
            <label key={opt} className={`border-white/15 rounded-full border px-3 py-1 ${checked ? 'bg-white/20' : 'bg-white/5'}`}>
              <input
                type="checkbox"
                className="mr-2"
                checked={checked}
                onChange={(e) => onChange(e.target.checked ? [...value, opt] : value.filter((x) => x !== opt))}
              />
              {opt}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
