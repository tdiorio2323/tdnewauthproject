import React from 'react';

export default function GlassMasterCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full rounded-2xl border border-transparent bg-white/5 p-5 backdrop-blur-2xl shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)] [background:linear-gradient(#0e0f12,#0e0f12)_padding-box,linear-gradient(135deg,#87e6ff,#b48cff,#f5cf7a)_border-box]">
      {/* top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-90" />
      {/* left hairline */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/80 via-transparent to-white/30" />
      {/* inner highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18)' }}
      />
      {children}
    </div>
  );
}