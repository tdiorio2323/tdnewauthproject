import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, SUPABASE_ENABLED } from "@/lib/supabase";
import GlassMasterCard from "@/components/GlassMasterCard";
import LinkButton, { LinkItem } from "@/components/LinkButton";
import VipModule from "@/components/VipModule";

interface CreatorPage {
  id: string;
  handle: string;
  title: string;
  email: string;
  links: LinkItem[];
  choices: any;
  logo_path?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function DynamicHandle() {
  const { handle } = useParams();
  const [creator, setCreator] = useState<CreatorPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!handle) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    loadCreatorPage();
  }, [handle]);

  const loadCreatorPage = async () => {
    if (!SUPABASE_ENABLED) {
      // Fallback for development - show demo page
      setCreator({
        id: 'demo',
        handle: handle!,
        title: `@${handle}`,
        email: 'demo@example.com',
        links: [
          { label: "Instagram", href: `https://instagram.com/${handle}`, icon: "instagram" },
          { label: "YouTube", href: "#", icon: "youtube" },
          { label: "Shop", href: "#", icon: "shop" },
        ],
        choices: { background: 'palms', buttons: 'glass' },
        status: 'approved'
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('signup_requests')
        .select('*')
        .eq('handle', handle)
        .eq('status', 'approved')
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setCreator(data);
      }
    } catch (err) {
      console.error('Error loading creator page:', err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  if (notFound || !creator) {
    return <Navigate to="/404" replace />;
  }

  // Get logo URL if available
  const logoUrl = creator.logo_path 
    ? supabase.storage.from('intake').getPublicUrl(creator.logo_path).data.publicUrl
    : null;

  return (
    <main
      className="relative min-h-screen min-h-dvh text-white antialiased bg-[#0b0c0f]"
      style={{
        backgroundImage: "url(/uploads/cabana%20background.jpeg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-black/40" aria-hidden />
      <section className="relative mx-auto flex max-w-md sm:max-w-lg md:max-w-xl items-center justify-center px-4 py-12 sm:py-16 md:py-20">
        <GlassMasterCard>
          {/* Logo/Avatar */}
          <div className="mb-4 flex justify-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${creator.handle} logo`}
                className="object-cover rounded-full border-2 border-white/20"
                style={{ width: 'clamp(72px, 18vw, 192px)', height: 'clamp(72px, 18vw, 192px)' }}
              />
            ) : (
              <div 
                className="rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-2xl font-bold"
                style={{ width: 'clamp(72px, 18vw, 192px)', height: 'clamp(72px, 18vw, 192px)' }}
              >
                {creator.handle[0]?.toUpperCase() || '?'}
              </div>
            )}
          </div>
          
          {/* Title/Handle */}
          <div className="mb-5 flex justify-center">
            <span className="text-sm md:text-base lg:text-lg font-bold tracking-wide">
              {creator.title || `@${creator.handle.toUpperCase()}`}
            </span>
          </div>
          
          {/* Links */}
          <div className="mb-4 space-y-3">
            {creator.links.filter(l => l.label && l.href).map((link, idx) => (
              <LinkButton key={idx} item={link} />
            ))}
          </div>
          
          {/* VIP Module for visitors to join waitlist */}
          <VipModule />
          
          {/* Footer */}
          <div className="mt-5 flex items-center justify-center gap-5 text-[11px] text-white/45">
            <span>Powered by CABANA</span>
          </div>
        </GlassMasterCard>
      </section>
    </main>
  );
}