import React from 'react';

export default function GlassMasterCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,.25)] [background:linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.02))_padding-box,linear-gradient(135deg,rgba(255,255,255,0.3),rgba(255,255,255,0.1),rgba(255,255,255,0.2))_border-box]">
      {/* top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
      {/* left hairline */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/50 via-transparent to-white/20" />
      {/* inner highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.1)' }}
      />
      {children}
    </div>
  );
}