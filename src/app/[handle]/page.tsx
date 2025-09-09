'use client';

import GlassMasterCard from '@/components/GlassMasterCard';

import LinkButton, { LinkItem } from '@/components/LinkButton';
import VipModule from '@/components/VipModule';

const LINKS: LinkItem[] = [
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
  { label: 'TikTok', href: '#', icon: 'tiktok' },
  { label: 'Shop', href: '#', icon: 'shop' },
];

export default function Page() {
  return (
    <main className="min-h-dvh bg-[#0b0c0f] text-white antialiased">
      {/* subtle luxe glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(180,140,255,0.12),transparent_60%),radial-gradient(60%_40%_at_80%_100%,rgba(245,207,122,0.12),transparent_60%)]" />
      <section className="mx-auto flex max-w-xl items-center justify-center px-4 py-14">
        <GlassMasterCard>
          {/* brand row only */}
          <div className="mb-5 flex items-center gap-2 text-xs text-white/70">
            <img src="/holographic-background.jpg" alt="Holographic Logo" className="h-4 w-4 opacity-90" />
            <span className="tracking-wide">CABANA • @joincabana</span>
          </div>

          {/* links */}
          <div className="mb-4 space-y-3">
            {LINKS.map((l) => (
              <LinkButton key={l.label} item={l} />
            ))}
          </div>

          {/* VIP below links */}
          <VipModule />

          {/* legal */}
          <div className="mt-5 flex items-center justify-center gap-5 text-[11px] text-white/45">
            <a href="/terms" className="hover:text-white/70">Terms</a>
            <a href="/privacy" className="hover:text-white/70">Privacy</a>
            <a href="/dmca" className="hover:text-white/70">DMCA</a>
          </div>
        </GlassMasterCard>
      </section>
    </main>
  );
}