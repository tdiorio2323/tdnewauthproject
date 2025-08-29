import type { CSSProperties } from 'react'

// Reusable frosted glass styles used across cards, buttons, and inputs.
// Keep visual consistency by importing and spreading these into style props.

export const frostedOuterStyle = (): CSSProperties => ({
  background:
    'radial-gradient(circle 80px at 80% -10%, rgba(255,255,255,0.10), rgba(24,27,27,0.30))',
})

export const frostedInnerStyle = (): CSSProperties => ({
  border: '1px solid rgba(255,255,255,0.10)',
  background:
    'radial-gradient(circle 80px at 80% -50%, rgba(119,119,119,0.15), rgba(15,17,17,0.25))',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
})

export const frostedButtonStyle = (): CSSProperties => ({
  background:
    'radial-gradient(circle 60px at 80% -10%, rgba(255,255,255,0.15), rgba(24,27,27,0.40))',
  border: '1px solid rgba(255,255,255,0.20)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
})

export const frostedInputStyle = (): CSSProperties => ({
  background:
    'radial-gradient(circle 40px at 50% 0%, rgba(255,255,255,0.10), rgba(255,255,255,0.05))',
  border: '1px solid rgba(255,255,255,0.20)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
})

