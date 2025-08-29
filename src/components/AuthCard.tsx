import React, { useState } from 'react'

const endpoint = import.meta.env.VITE_FORM_ENDPOINT || '' // e.g. https://formspree.io/f/XXXXX or your /api endpoint

export function AuthCard() {
  const [status, setStatus] = useState<'idle'|'ok'|'err'|'sending'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      })
      if (res.ok) setStatus('ok')
      else throw new Error(await res.text())
    } catch {
      setStatus('err')
    }
  }

  return (
    <div style={{
      minHeight:'100%',
      display:'grid',
      placeItems:'center',
      background:'radial-gradient(1200px 600px at 50% -20%, rgba(180,120,255,.25), transparent 60%), #0a0a0a'
    }}>
      <div style={{
        width:360,
        padding:24,
        borderRadius:20,
        background:'rgba(255,255,255,0.06)',
        border:'1px solid rgba(255,255,255,0.2)',
        boxShadow:'0 20px 80px rgba(140,120,255,0.2), inset 0 0 80px rgba(255,255,255,0.06)',
        backdropFilter:'blur(12px)'
      }}>
        <div style={{display:'grid', gap:12}}>
          <div style={{display:'grid', gap:6}}>
            <div style={{
              width:64,height:64,borderRadius:16,
              background:'linear-gradient(135deg, #b993ff, #79e7ff, #ffd36e)',
              filter:'saturate(1.2) brightness(1.05)'
            }}/>
            <h1 style={{margin:0,fontSize:24,fontWeight:700,letterSpacing:.5}}>Cabana Access</h1>
            <p style={{margin:0,opacity:.8}}>Get early access and your personal link page.</p>
          </div>

          {status==='ok' ? (
            <div style={{padding:12,border:'1px solid #2feaa8',borderRadius:10,background:'rgba(47,234,168,0.08)'}}>
              Request received. Check your email shortly.
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{display:'grid', gap:10}}>
              <input required name="email" type="email" placeholder="you@domain.com"
                style={{width:'100%',padding:'10px 12px',borderRadius:10,border:'1px solid rgba(255,255,255,0.2)',background:'rgba(0,0,0,0.45)',color:'#fff'}} />
              <input name="vip_code" placeholder="VIP Code (optional)"
                style={{width:'100%',padding:'10px 12px',borderRadius:10,border:'1px solid rgba(255,255,255,0.2)',background:'rgba(0,0,0,0.45)',color:'#fff'}} />
              <button disabled={!endpoint || status==='sending'}
                style={{
                  padding:'10px 12px',border:'none',borderRadius:10,
                  background:'linear-gradient(90deg,#9b5cff,#e756ff)',color:'#fff',fontWeight:700,opacity:endpoint?1:.6
                }}>
                {status==='sending' ? 'Sending…' : 'Request Access'}
              </button>
              {!endpoint && <small style={{opacity:.7}}>Set VITE_FORM_ENDPOINT to enable submissions.</small>}
              {status==='err' && <small style={{color:'#ff8c8c'}}>Error submitting. Try again.</small>}
              <input type="hidden" name="source" value="cabana/link-in-bio" />
            </form>
          )}
          <small style={{opacity:.6}}>By continuing you agree to the terms.</small>
        </div>
      </div>
    </div>
  )
}
