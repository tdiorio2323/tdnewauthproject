import GlassMasterCard from "@/components/GlassMasterCard";
import LogoCabana from "@/components/LogoCabana";
import LinkButton from "@/components/LinkButton";
import VipModule from "@/components/VipModule";

const LINKS = [
  { label: "Instagram", href: "https://instagram.com/joincabana", icon: "instagram" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "TikTok", href: "#", icon: "tiktok" },
  { label: "Shop", href: "#", icon: "shop" },
];

export default function Cabana() {
  return (
    <main className="min-h-dvh bg-[#0b0c0f] text-white antialiased">
      <section className="mx-auto flex max-w-xl items-center justify-center px-4 py-14">
        <GlassMasterCard>
          <div className="mb-5 flex items-center gap-2 text-xs text-white/70">
            <LogoCabana className="h-4 w-4 opacity-90" />
            <span className="tracking-wide">CABANA • @joincabana</span>
          </div>

          <div className="mb-4 space-y-3">
            {LINKS.map(l => <LinkButton key={l.label} item={l as any} />)}
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