import React, { useState } from 'react';
import { Eye, Lock, Shield, Star, Users } from 'lucide-react';
import PreviewModal from './PreviewModal';

const VipModule = () => {
  const [vipCode, setVipCode] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleUnlock = async () => {
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vipCode: vipCode || undefined }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          window.open(data.url, '_blank');
        }
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-white/70" />
            <h2 className="text-xl font-bold text-white">VIP Access</h2>
          </div>
          <p className="text-white/60 text-sm">
            Unlock exclusive content and behind-the-scenes access
          </p>
        </div>

        {/* Input */}
        <div className="space-y-3">
          <input
            type="text"
            value={vipCode}
            onChange={(e) => setVipCode(e.target.value)}
            placeholder="Early Access Portal"
            className="w-full rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-xl focus:border-transparent focus:ring-2 focus:ring-white/30 focus:outline-none transition-all"
            aria-label="Enter VIP access code"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleUnlock}
            className="flex-1 [background:linear-gradient(90deg,#87e6ff,#b48cff,#f5cf7a)] text-black font-medium rounded-full px-4 py-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Unlock VIP access"
          >
            Unlock
          </button>
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="px-4 py-3 rounded-full border border-white/20 bg-white/5 text-white/90 hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/30 flex items-center gap-2"
            aria-label="Preview VIP content"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <Star className="w-3.5 h-3.5" />
            <span>Premium</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <Users className="w-3.5 h-3.5" />
            <span>Exclusive</span>
          </div>
        </div>
      </div>

      <PreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </>
  );
};

export default VipModule;