import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PreviewModal from './PreviewModal';

export default function VipModule({ onUnlock }: { onUnlock?: (vipCode?: string) => void } = {}) {
  const navigate = useNavigate();
  const [openPreview, setOpenPreview] = useState(false);
  const [vipCode, setVipCode] = useState('');

  async function handleUnlock() {
    if (onUnlock) return onUnlock(vipCode.trim() || undefined);
    navigate('/success'); // stubbed success
  }

  return (
    <div className="mt-4 rounded-2xl border border-white/12 bg-white/[.06] p-4 backdrop-blur-xl">
      <h3 className="text-base font-semibold tracking-wide">VIP Access</h3>
      <p className="mt-1 text-sm text-white/70">Exclusive drops, early access, private Q&amp;As.</p>

      {/* Divider below copy */}
      <div className="my-3 h-px w-full bg-white/10" />

      <label htmlFor="vipCode" className="mb-1 block text-xs font-medium tracking-wider text-white/60 uppercase">
        VIP
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          {/* key icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70" aria-hidden>
            <circle cx="7.5" cy="10.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M11 10.5h10M16 10.5v3M18.5 10.5v3" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
        <input
          id="vipCode"
          name="vipCode"
          value={vipCode}
          onChange={(e) => setVipCode(e.target.value)}
          placeholder="Early Access Portal"
          aria-label="VIP access code"
          className="w-full rounded-xl border border-white/12 bg-white/6 px-9 py-3 text-sm text-white placeholder-white/40 outline-none backdrop-blur-xl focus:border-transparent focus:ring-2 focus:ring-white/30"
        />
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={handleUnlock}
          className="flex-1 rounded-full px-4 py-3 text-sm font-medium text-black [background:linear-gradient(90deg,#87e6ff,#b48cff,#f5cf7a)] shadow-[0_0_0_1px_rgba(255,255,255,.08)_inset]"
        >
          Unlock VIP
        </button>
        <button
          onClick={() => setOpenPreview(true)}
          className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm backdrop-blur-xl hover:bg-white/8"
        >
          Preview
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/45">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        Secure • Encrypted
      </div>

      {openPreview && <PreviewModal onClose={() => setOpenPreview(false)} />}
    </div>
  );
}