import React from 'react';

interface GlassMasterCardProps {
  children: React.ReactNode;
}

const GlassMasterCard: React.FC<GlassMasterCardProps> = ({ children }) => {
  return (
    <div className="relative rounded-2xl border border-transparent bg-white/5 p-5 backdrop-blur-2xl shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)] [background:linear-gradient(#0e0f12,#0e0f12)_padding-box,linear-gradient(135deg,#87e6ff,#b48cff,#f5cf7a)_border-box]">
      {/* Top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      
      {/* Left hairline */}
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/80 via-transparent to-white/30" />
      
      {children}
    </div>
  );
};

export default GlassMasterCard;