import React, { useState, useEffect } from 'react';
import { Eye, Lock, Shield, Star, Users, Loader2, CheckCircle, XCircle } from 'lucide-react';
import PreviewModal from './PreviewModal';
import { toast } from '@/hooks/use-toast';

// Demo VIP codes for testing
const DEMO_CODES = {
  'CABANA2024': 'premium',
  'EARLYVIP': 'early-access',
  'BACKSTAGE': 'behind-scenes'
};

const VipModule = () => {
  const [vipCode, setVipCode] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeStatus, setCodeStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  // Validate VIP code in real-time
  useEffect(() => {
    if (!vipCode) {
      setCodeStatus('idle');
      return;
    }

    const timer = setTimeout(() => {
      if (DEMO_CODES[vipCode.toUpperCase()]) {
        setCodeStatus('valid');
      } else if (vipCode.length >= 3) {
        setCodeStatus('invalid');
      } else {
        setCodeStatus('idle');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [vipCode]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length <= 12) {
      setVipCode(value);
    }
  };

  const handleUnlock = async () => {
    if (!vipCode) {
      toast({
        title: "Enter a VIP code",
        description: "Please enter your VIP access code to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Demo mode - check for valid codes
    if (DEMO_CODES[vipCode]) {
      setTimeout(() => {
        setIsLoading(false);
        const codeType = DEMO_CODES[vipCode as keyof typeof DEMO_CODES];
        toast({
          title: "VIP Access Granted! 🎉",
          description: `Welcome to ${codeType} tier. Opening your exclusive portal...`,
        });
        // Simulate opening checkout in demo mode
        setTimeout(() => {
          window.open('https://cabana.example.com/vip-checkout', '_blank');
        }, 2000);
      }, 2000);
      return;
    }

    // Simulate API call for invalid codes
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
          toast({
            title: "Redirecting to checkout",
            description: "Opening your VIP access portal...",
          });
        }
      } else {
        throw new Error('Invalid code');
      }
    } catch (error) {
      toast({
        title: "Invalid VIP Code",
        description: "This code isn't valid. Try CABANA2024, EARLYVIP, or BACKSTAGE for demo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
          <div className="relative">
            <input
              type="text"
              value={vipCode}
              onChange={handleCodeChange}
              placeholder="Early Access Portal"
              className={`w-full rounded-xl border bg-white/6 px-4 py-3 pr-10 text-sm text-white placeholder-white/40 backdrop-blur-xl focus:border-transparent focus:ring-2 focus:ring-white/30 focus:outline-none transition-all ${
                codeStatus === 'valid' ? 'border-green-400/50' : 
                codeStatus === 'invalid' ? 'border-red-400/50' : 'border-white/12'
              }`}
              aria-label="Enter VIP access code"
              maxLength={12}
            />
            {codeStatus !== 'idle' && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {codeStatus === 'valid' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
              </div>
            )}
          </div>
          {codeStatus === 'invalid' && (
            <p className="text-xs text-red-400/80 px-1">
              Invalid code. Try: CABANA2024, EARLYVIP, or BACKSTAGE
            </p>
          )}
          {codeStatus === 'valid' && (
            <p className="text-xs text-green-400/80 px-1">
              Valid VIP code! Ready to unlock access.
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleUnlock}
            disabled={isLoading}
            className="flex-1 [background:linear-gradient(90deg,#87e6ff,#b48cff,#f5cf7a)] text-black font-medium rounded-full px-4 py-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            aria-label="Unlock VIP access"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Unlock'
            )}
          </button>
          <button
            onClick={() => setIsPreviewOpen(true)}
            disabled={isLoading}
            className="px-4 py-3 rounded-full border border-white/20 bg-white/5 text-white/90 hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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