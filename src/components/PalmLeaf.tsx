import React from 'react';

interface PalmLeafProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  opacity?: number;
  animate?: boolean;
}

export default function PalmLeaf({ 
  className = '', 
  size = 'md', 
  opacity = 0.3,
  animate = false 
}: PalmLeafProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${animate ? 'animate-pulse' : ''} ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="palmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B68EE" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#4A9FBD" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C5E4B5" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Palm leaf shape */}
        <path
          d="M50 10 C20 20, 10 40, 15 60 C20 50, 30 35, 50 30 C70 35, 80 50, 85 60 C90 40, 80 20, 50 10 Z"
          fill="url(#palmGradient)"
          stroke="rgba(123, 104, 238, 0.3)"
          strokeWidth="0.5"
        />
        
        {/* Leaf segments */}
        <path
          d="M50 15 C35 25, 25 40, 30 55"
          stroke="rgba(123, 104, 238, 0.4)"
          strokeWidth="0.3"
          fill="none"
        />
        <path
          d="M50 15 C40 30, 35 45, 40 58"
          stroke="rgba(123, 104, 238, 0.4)"
          strokeWidth="0.3"
          fill="none"
        />
        <path
          d="M50 15 C45 32, 45 48, 50 62"
          stroke="rgba(123, 104, 238, 0.5)"
          strokeWidth="0.4"
          fill="none"
        />
        <path
          d="M50 15 C55 32, 55 48, 50 62"
          stroke="rgba(123, 104, 238, 0.5)"
          strokeWidth="0.4"
          fill="none"
        />
        <path
          d="M50 15 C60 30, 65 45, 60 58"
          stroke="rgba(123, 104, 238, 0.4)"
          strokeWidth="0.3"
          fill="none"
        />
        <path
          d="M50 15 C65 25, 75 40, 70 55"
          stroke="rgba(123, 104, 238, 0.4)"
          strokeWidth="0.3"
          fill="none"
        />
        
        {/* Stem */}
        <line
          x1="50"
          y1="62"
          x2="50"
          y2="85"
          stroke="rgba(123, 104, 238, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// Decorative palm leaf cluster component
export function PalmLeafCluster({ 
  className = '',
  position = 'top-left' 
}: { 
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  return (
    <div className={`absolute ${positionClasses[position]} ${className}`}>
      <div className="relative">
        <PalmLeaf size="lg" opacity={0.2} animate className="rotate-12" />
        <PalmLeaf size="md" opacity={0.3} animate className="absolute -top-2 -left-2 -rotate-12" />
        <PalmLeaf size="sm" opacity={0.4} className="absolute top-4 left-6 rotate-45" />
      </div>
    </div>
  );
}