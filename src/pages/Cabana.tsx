import GlassMasterCard from "@/components/GlassMasterCard";
import LinkButton, { LinkItem } from "@/components/LinkButton";
import VipModule from "@/components/VipModule";
import { PalmLeafCluster } from "@/components/PalmLeaf";
import { holographicGradient } from "@/lib/frosted";

const LINKS: LinkItem[] = [
  { label: "Instagram", href: "https://instagram.com/joincabana", icon: "instagram" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "TikTok", href: "#", icon: "tiktok" },
  { label: "Shop", href: "#", icon: "shop" },
];

export default function Cabana() {
  return (
    <main
      className="relative min-h-screen min-h-dvh text-white antialiased bg-gradient-to-br from-brand-dark-navy via-black to-brand-navy"
      style={{
        backgroundImage: "url(/uploads/cabana%20background.jpeg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black/40" aria-hidden />
      
      {/* Palm Leaf Decorations */}
      <PalmLeafCluster position="top-left" />
      <PalmLeafCluster position="bottom-right" />
      
      {/* Holographic accent effects */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-brand-purple/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-brand-teal/20 rounded-full blur-2xl animate-pulse delay-1000" />
      
      <section className="relative mx-auto flex max-w-md sm:max-w-lg md:max-w-xl items-center justify-center px-4 py-12 sm:py-16 md:py-20">
        <GlassMasterCard>
          {/* Top-centered large logo */}
          <div className="mb-4 flex justify-center">
            <img
              src="/uploads/cabana%20holo%20logo%20.png"
              alt="CABANA logo"
              className="object-contain"
              style={{ width: 'clamp(72px, 18vw, 192px)', height: 'clamp(72px, 18vw, 192px)' }}
            />
          </div>
          <div className="mb-5 flex justify-center">
            <span className="text-sm md:text-base lg:text-lg font-bold tracking-wide bg-clip-text text-transparent bg-gradient-holographic">
              @JOINCABANA
            </span>
          </div>
          <div className="mb-4 space-y-3">
            {LINKS.map((l) => <LinkButton key={l.label} item={l} />)}
          </div>
          <VipModule />
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
