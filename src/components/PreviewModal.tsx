import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose }) => {
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg p-2"
          aria-label="Close preview"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Preview content */}
        <div className="relative rounded-2xl border border-transparent bg-white/5 p-6 backdrop-blur-2xl shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)] [background:linear-gradient(#0e0f12,#0e0f12)_padding-box,linear-gradient(135deg,#87e6ff,#b48cff,#f5cf7a)_border-box] animate-scale-in">
          {/* Top hairline */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          
          {/* Left hairline */}
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/80 via-transparent to-white/30" />
          
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">VIP Content Preview</h3>
            <p className="text-white/60">Exclusive content available to VIP members</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70">Behind the Scenes</div>
              <div className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70">Early Access</div>
              <div className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70">Exclusive Drops</div>
            </div>
          </div>

          {/* 3x2 Blurred grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center"
              >
                <div className="w-8 h-8 rounded bg-white/20 backdrop-blur-sm animate-pulse" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/40 text-sm mb-4">
              Get instant access to exclusive content, behind-the-scenes footage, and VIP perks
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-4 text-xs text-white/50">
                <span>✨ Monthly exclusive drops</span>
                <span>🎬 Behind-the-scenes content</span>
                <span>💬 Direct access chat</span>
              </div>
              <button
                onClick={onClose}
                className="[background:linear-gradient(90deg,#87e6ff,#b48cff,#f5cf7a)] text-black font-medium rounded-full px-6 py-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Join VIP Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;