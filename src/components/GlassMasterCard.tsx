import React from 'react';
import { frostedOuterStyle, frostedInnerStyle } from '@/lib/frosted';

export default function GlassMasterCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full rounded-2xl p-[3px] md:p-[4px] shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)] overflow-hidden"
      style={frostedOuterStyle()}
    >
      {/* top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-90" />
      {/* left hairline removed to avoid visible box edge */}
      {/* inner highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18)' }}
      />

      {/* Inner frosted surface */}
      <div
        className="relative rounded-[14px] border p-5 text-white"
        style={{ ...frostedInnerStyle(), border: '1.5px solid rgba(255,255,255,0.12)' }}
      >
        {children}
      </div>
    </div>
  );
}
