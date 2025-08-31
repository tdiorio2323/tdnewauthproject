import GlassMasterCard from "@/components/GlassMasterCard";
import LogoCabana from "@/components/LogoCabana";
import LinkButton, { LinkItem } from "@/components/LinkButton";
import VipModule from "@/components/VipModule";
import cabanaLogo from "@/assets/cabana-logo-new.png";
import luxuryBg from "@/assets/luxury-background.png";

const LINKS: LinkItem[] = [
  { label: "Instagram", href: "https://instagram.com/joincabana", icon: "instagram" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "TikTok", href: "#", icon: "tiktok" },
  { label: "Shop", href: "#", icon: "shop" },
];

export default function Cabana() {
  return (
    <main className="min-h-dvh text-white antialiased relative overflow-hidden">
      {/* Luxury background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${luxuryBg})` }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Luxe holographic overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(180,140,255,0.15),transparent_60%),radial-gradient(60%_40%_at_80%_100%,rgba(245,207,122,0.15),transparent_60%),radial-gradient(40%_30%_at_20%_80%,rgba(135,230,255,0.12),transparent_50%)]" />
      
      <section className="relative z-10 mx-auto flex max-w-xl items-center justify-center px-4 py-14">
        <GlassMasterCard>
          {/* Background pattern inside card */}
          <div className="absolute inset-0 rounded-2xl opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-400/10" />
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-radial from-white/5 to-transparent rounded-full blur-xl" />
            <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-gradient-radial from-purple-400/8 to-transparent rounded-full blur-lg" />
          </div>
          
          <div className="relative z-10">
            <div className="mb-5 flex items-center gap-2 text-xs text-white/70">
              <LogoCabana className="h-4 w-4 opacity-90" />
              <span className="tracking-wide">CABANA • @joincabana</span>
            </div>
            
            {/* Hero Logo */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <img 
                  src={cabanaLogo} 
                  alt="CABANA" 
                  className="w-32 h-32 object-contain drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-cyan-300/20 to-yellow-300/20 rounded-full blur-xl -z-10" />
              </div>
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
          </div>
        </GlassMasterCard>
      </section>
    </main>
  );
}