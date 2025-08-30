import type { CSSProperties } from 'react'

// CABANA Premium Glassmorphism Styles - Based on holographic brand identity
// Keep visual consistency by importing and spreading these into style props.

export const frostedOuterStyle = (): CSSProperties => ({
  background: 'radial-gradient(circle 120px at 80% -10%, rgba(123, 104, 238, 0.12), rgba(27, 41, 81, 0.35))',
})

export const frostedInnerStyle = (): CSSProperties => ({
  border: '1px solid rgba(123, 104, 238, 0.15)',
  background: 'radial-gradient(circle 100px at 80% -50%, rgba(123, 104, 238, 0.08), rgba(27, 41, 81, 0.25))',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  boxShadow: '0 8px 32px rgba(123, 104, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
})

export const frostedButtonStyle = (): CSSProperties => ({
  background: 'linear-gradient(135deg, #7B68EE 0%, #4A9FBD 50%, #F5B942 100%)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  boxShadow: '0 8px 32px rgba(123, 104, 238, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
})

export const frostedInputStyle = (): CSSProperties => ({
  background: 'rgba(123, 104, 238, 0.06)',
  border: '1px solid rgba(123, 104, 238, 0.2)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  boxShadow: '0 4px 20px rgba(123, 104, 238, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
})

// New premium styles for CABANA branding
export const frostedCardStyle = (): CSSProperties => ({
  background: 'rgba(123, 104, 238, 0.06)',
  border: '1px solid rgba(123, 104, 238, 0.15)',
  backdropFilter: 'blur(25px)',
  WebkitBackdropFilter: 'blur(25px)',
  borderRadius: '24px',
  boxShadow: '0 12px 40px rgba(123, 104, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
})

export const frostedNavStyle = (): CSSProperties => ({
  background: 'rgba(123, 104, 238, 0.05)',
  border: '1px solid rgba(123, 104, 238, 0.12)',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  borderRadius: '50px',
  boxShadow: '0 8px 32px rgba(123, 104, 238, 0.15)',
})

export const neonGlowStyle = (): CSSProperties => ({
  boxShadow: '0 0 20px rgba(123, 104, 238, 0.5), 0 0 40px rgba(123, 104, 238, 0.3), 0 0 60px rgba(123, 104, 238, 0.2)',
  filter: 'drop-shadow(0 0 8px rgba(123, 104, 238, 0.4))',
})

export const holographicGradient = (): CSSProperties => ({
  background: 'linear-gradient(135deg, #7B68EE 0%, #4A9FBD 25%, #F5B942 50%, #C5E4B5 75%, #B19CD9 100%)',
})

