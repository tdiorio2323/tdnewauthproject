'use client';

import React from 'react';

export default function PreviewModal({ onClose }: { onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-[min(92vw,560px)] rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-semibold tracking-wide text-white/90">VIP Preview</h4>
          <button onClick={onClose} className="rounded-md border border-white/15 bg-white/5 px-3 py-1 text-xs hover:bg-white/10">
            Close
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[.06] blur-[1px]">
              <div className="h-full w-full bg-[radial-gradient(40%_40%_at_50%_50%,rgba(255,255,255,.25),transparent)]" />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-white/60">Subscribe to unlock full-quality posts.</p>
      </div>
    </div>
  );
}