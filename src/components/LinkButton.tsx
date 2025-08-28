import React from 'react';
import { ChevronRight, Instagram, Youtube, Music, ShoppingBag, ExternalLink } from 'lucide-react';

interface LinkButtonProps {
  label: string;
  href: string;
  icon: string;
}

const iconMap = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music,
  shop: ShoppingBag,
};

const LinkButton: React.FC<LinkButtonProps> = ({ label, href, icon }) => {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || ShoppingBag;
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex items-center justify-between w-full rounded-full border border-white/15 bg-white/5 px-4 py-3 hover:bg-white/8 hover:border-white/25 hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
      aria-label={`Visit ${label}${isExternal ? ' (opens in new tab)' : ''}`}
    >
      <div className="flex items-center gap-3">
        <IconComponent className="w-5 h-5 text-white/70 group-hover:text-white/90 transition-colors" />
        <span className="text-white font-medium group-hover:text-white/95 transition-colors">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        {isExternal && <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white/60 transition-colors" />}
        <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white/70 transition-colors" />
      </div>
    </a>
  );
};

export default LinkButton;