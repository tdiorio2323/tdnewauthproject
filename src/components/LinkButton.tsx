'use client';

import React from 'react';
import { frostedButtonStyle } from '@/lib/frosted';

export type LinkItem = {
  label: string;
  href: string;
  icon: 'instagram' | 'youtube' | 'tiktok' | 'x' | 'shop' | 'site';
};

export default function LinkButton({ item }: { item: LinkItem }) {
  return (
    <a
      href={item.href}
      className="group flex w-full items-center justify-between rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30"
      style={frostedButtonStyle()}
      aria-label={item.label}
    >
      <span className="flex items-center gap-2 text-sm">
        <Icon name={item.icon} className="h-4 w-4 opacity-80" />
        {item.label}
      </span>
      <svg className="h-4 w-4 translate-x-0 transition-transform group-hover:translate-x-0.5 opacity-70" viewBox="0 0 24 24" fill="none">
        <path d="M8 5l7 7-7 7" stroke="currentColor" strokeWidth="2" />
      </svg>
    </a>
  );
}

function Icon({
  name,
  className = 'h-4 w-4',
}: {
  name: LinkItem['icon'];
  className?: string;
}) {
  const common = { className, fill: 'none', stroke: 'currentColor', strokeWidth: 2 } as const;
  switch (name) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M22 12s0-4-1-5-5-1-9-1-8 0-9 1-1 5-1 5 0 4 1 5 5 1 9 1 8 0 9-1 1-5 1-5Z" />
          <path d="M10 9l5 3-5 3V9Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M9 7v8a3 3 0 1 0 3-3V4c1 2 3 4 6 4" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case 'shop':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M6 7h12l1 4H5l1-4Z" />
          <path d="M6 11v7h12v-7" />
        </svg>
      );
    case 'site':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      );
  }
}
