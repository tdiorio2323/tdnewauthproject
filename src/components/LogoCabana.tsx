import React from 'react';

export default function LogoCabana({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="cabana-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#87e6ff" />
          <stop offset="0.5" stopColor="#b48cff" />
          <stop offset="1" stopColor="#f5cf7a" />
        </linearGradient>
      </defs>
      <path
        d="M32 10c12.15 0 22 9.85 22 22S44.15 54 32 54c-8.3 0-15.5-4.7-19.2-11.6l6.9-3.9C22.1 43 26.7 46 32 46c7.73 0 14-6.27 14-14S39.73 18 32 18c-5.3 0-9.9 3-12.3 7.5l-6.9-3.9C16.5 14.7 23.7 10 32 10Z"
        fill="url(#cabana-gradient)"
      />
    </svg>
  );
}