import React from 'react';
import { ChevronRight, Instagram, Youtube, Music, ShoppingBag } from 'lucide-react';

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

  return (
    <a
      href={href}
      className="group flex items-center justify-between w-full rounded-full border border-white/15 bg-white/5 px-4 py-3 hover:bg-white/8 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
      aria-label={`Visit ${label}`}
    >
      <div className="flex items-center gap-3">
        <IconComponent className="w-5 h-5 text-white/70" />
        <span className="text-white font-medium">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white/70 transition-colors" />
    </a>
  );
};

export default LinkButton;