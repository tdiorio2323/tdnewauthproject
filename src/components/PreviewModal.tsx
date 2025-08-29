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
        {/* Single hero preview tile */}
        <div className="overflow-hidden rounded-xl border border-white/10">
          <div className="aspect-[16/9] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/[.06]" />
            <div className="absolute inset-0 bg-[radial-gradient(40%_60%_at_50%_0%,rgba(255,255,255,.18),transparent)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs backdrop-blur-md">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="4" y="11" width="16" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
                VIP Content Preview
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-white/70">Subscribe to unlock full-quality posts.</p>
      </div>
    </div>
  );
}
