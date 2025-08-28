import React from 'react';
import GlassMasterCard from '@/components/GlassMasterCard';
import LogoCabana from '@/components/LogoCabana';
import LinkButton from '@/components/LinkButton';
import VipModule from '@/components/VipModule';

const links = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "TikTok", href: "#", icon: "tiktok" },
  { label: "Shop", href: "#", icon: "shop" },
];

const Cabana = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <GlassMasterCard>
          <div className="space-y-6">
            {/* Brand Header */}
            <div className="flex items-center justify-center gap-3 pb-2">
              <LogoCabana />
              <h1 className="text-white font-semibold tracking-wide">
                CABANA • @joincabana
              </h1>
            </div>

            {/* Links Stack */}
            <div className="space-y-3">
              {links.map((link, index) => (
                <LinkButton
                  key={index}
                  label={link.label}
                  href={link.href}
                  icon={link.icon}
                />
              ))}
            </div>

            {/* VIP Module */}
            <div className="pt-4 border-t border-white/10">
              <VipModule />
            </div>

            {/* Legal micro-links */}
            <div className="flex items-center justify-center gap-4 pt-4 text-xs text-white/40">
              <a 
                href="#" 
                className="hover:text-white/60 transition-colors focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-1"
              >
                Privacy
              </a>
              <span>•</span>
              <a 
                href="#" 
                className="hover:text-white/60 transition-colors focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-1"
              >
                Terms
              </a>
              <span>•</span>
              <a 
                href="#" 
                className="hover:text-white/60 transition-colors focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-1"
              >
                Support
              </a>
            </div>
          </div>
        </GlassMasterCard>
      </div>
    </div>
  );
};

export default Cabana;