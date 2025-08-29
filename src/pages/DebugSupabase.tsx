import { useEffect, useState } from 'react'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/env'

type Check = {
  name: string
  status: 'ok' | 'fail'
  detail?: string
}

export default function DebugSupabase() {
  const [checks, setChecks] = useState<Check[]>([])

  useEffect(() => {
    let cancelled = false

    async function run() {
      const results: Check[] = []

      // 1) Env present
      if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        results.push({ name: 'Env vars', status: 'ok' })
      } else {
        results.push({ name: 'Env vars', status: 'fail', detail: 'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY' })
      }

      // 2) Auth health endpoint (some projects require apikey header)
      try {
        const res = await fetch(`${SUPABASE_URL}/auth/v1/health`, {
          method: 'GET',
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        })
        results.push({ name: 'Auth health', status: res.ok ? 'ok' : 'fail', detail: `HTTP ${res.status}` })
      } catch (e: Error) {
        results.push({ name: 'Auth health', status: 'fail', detail: e?.message || 'network error' })
      }

      // 3) REST reachability (expect 404 OK with CORS, but not 401/0)
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
          method: 'GET',
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        })
        // 200-404 indicate the gateway is reachable; 401/403 indicate key/permissions issue
        const okish = res.status >= 200 && res.status <= 404
        results.push({ name: 'REST gateway', status: okish ? 'ok' : 'fail', detail: `HTTP ${res.status}` })
      } catch (e: Error) {
        results.push({ name: 'REST gateway', status: 'fail', detail: e?.message || 'network error' })
      }

      if (!cancelled) setChecks(results)
    }

    run()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-xl font-semibold">Supabase Connectivity Check</h1>
      <p className="mb-6 text-sm text-white/70">Dev-only page. Ensures env vars are present and endpoints reachable.</p>
      <div className="space-y-2">
        {checks.map((c) => (
          <div key={c.name} className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 p-3">
            <div>
              <div className="text-sm font-medium">{c.name}</div>
              {c.detail && <div className="text-xs opacity-70">{c.detail}</div>}
            </div>
            <span className={c.status === 'ok' ? 'text-green-400' : 'text-red-400'}>
              {c.status === 'ok' ? 'OK' : 'FAIL'}
            </span>
          </div>
        ))}
        {checks.length === 0 && (
          <div className="text-sm opacity-70">Running checks…</div>
        )}
      </div>
      <div className="mt-6 text-xs opacity-60">
        Tip: Update values in <code>.env.local</code>. Route only available in development.
      </div>
    </div>
  )
}
