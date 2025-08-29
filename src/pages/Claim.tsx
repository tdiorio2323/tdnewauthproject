import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from "@/hooks/use-toast";

type Row = {
  email: string | null
  handle: string
  title: string | null
  links: string[] | null
  choices: unknown | null
  notes: string | null
  logo_path: string | null
}

export default function Claim() {
  const [params] = useSearchParams()
  const token = params.get('t') || ''
  const hash = params.get('h') || ''
  const [row, setRow] = useState<Row | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast();

  useEffect(() => {
    const isHex64 = /^[a-f0-9]{64}$/i.test(hash)
    if (!token && !isHex64) {
      setErr('Missing token or hash.')
      return
    }
    const run = async () => {
      if (token) {
        const { data, error } = await supabase.rpc('claim_lookup', { token })
        if (error) setErr(error.message)
        else setRow((data && (data as Row[])[0]) || null)
        return
      }
      if (isHex64) {
        const { data, error } = await supabase.rpc('claim_lookup_by_hash', { hash })
        if (error) setErr(error.message)
        else setRow((data && (data as Row[])[0]) || null)
      }
    }
    run()
  }, [token, hash])

  const logoUrl = useMemo(() => {
    if (!row?.logo_path) return null
    const p = row.logo_path
    // If the stored path already includes the bucket (e.g., "intake/...") use it as-is after /public/.
    // Otherwise, assume it is a key inside the 'intake' bucket.
    const key = p.startsWith('intake/') ? p : `intake/${p}`
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${key}`
  }, [row?.logo_path])

  if (err) {
    return (
      <main className="min-h-dvh grid place-items-center bg-[#0b0c0f] text-white p-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">Error: {err}</div>
      </main>
    )
  }
  if (!row) {
    return (
      <main className="min-h-dvh grid place-items-center bg-[#0b0c0f] text-white p-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">Checking…</div>
      </main>
    )
  }

  return (
    <main className="min-h-dvh grid place-items-center bg-[#0b0c0f] text-white p-6">
      <div className="w-[min(92vw,560px)] rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl">
        {logoUrl && <img src={logoUrl} alt="" className="mx-auto mb-3 h-16 w-16 object-contain" />}
        <h1 className="text-center text-lg font-semibold">Claim preview</h1>
        <p className="mt-1 text-center text-white/70">@{row.handle}</p>
        {row.title && <p className="mt-2 text-center text-sm">{row.title}</p>}

        <div className="mt-4 grid gap-2 text-sm text-white/80">
          <div>
            <span className="text-white/50">Email:</span>{' '}
            {(row.email || '').replace(/(.{2}).+(@.*)/, '$1•••$2')}
          </div>
          <div>
            <span className="text-white/50">Links:</span> {Array.isArray(row.links) ? row.links.length : 0}
          </div>
          <div>
            <span className="text-white/50">Notes:</span> {row.notes || '—'}
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={async () => {
              setBusy(true)
              try {
                if (token) {
                  await supabase.rpc('claim_use_by_token', { token })
                } else if (hash) {
                  await supabase.rpc('claim_use_by_hash', { hash })
                }
              } catch (error: Error) {
                toast({
                  title: "Error",
                  description: error.message,
                  variant: "destructive"
                });
              }
              navigate(`/${row.handle}`)
            }}
            disabled={busy}
            className="flex-1 rounded-full px-4 py-3 text-center text-sm font-medium text-black [background:linear-gradient(90deg,#87e6ff,#b48cff,#f5cf7a)]"
          >
            {busy ? 'Continuing…' : 'Continue'}
          </button>
          <Link to="/cabana" className="flex-1 rounded-full px-4 py-3 text-center text-sm focus:outline-none focus:ring-2 focus:ring-white/30" style={{
            background: 'radial-gradient(circle 60px at 80% -10%, rgba(255,255,255,0.15), rgba(24,27,27,0.40))',
            border: '1px solid rgba(255,255,255,0.20)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            borderRadius: '9999px'
          }}>
            Back
          </Link>
        </div>
      </div>
    </main>
  )
}
