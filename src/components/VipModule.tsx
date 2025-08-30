import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PreviewModal from './PreviewModal';
import { supabase, SUPABASE_ENABLED } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";
import { frostedInputStyle, frostedButtonStyle, neonGlowStyle, holographicGradient } from '@/lib/frosted';

export default function VipModule() {
  const navigate = useNavigate();
  const [openPreview, setOpenPreview] = useState(false);
  const [email, setEmail] = useState('');
  const [vipCode, setVipCode] = useState('');
  const { toast } = useToast();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleRequestInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    try {
      const payload = {
        email: email.trim().toLowerCase(),
        vip_code: vipCode?.trim() || null, // Use vipCode from state
        source: "ui",
      };

      let data = null;
      let error = null;

      if (SUPABASE_ENABLED) {
        const result = await supabase
          .from("waitlist")
          .insert(payload)
          .select("id,email,created_at")
          .single();
        data = result.data;
        error = result.error;
      } else {
        // Fallback for front-end-only mode
        // Simulate success or a known error for testing
        console.log("Supabase disabled: Simulating waitlist submission.");
        data = { id: "mock-id", email: payload.email, created_at: new Date().toISOString() };
        error = null;
      }

      // Unique violation (already on the list) — treat as success
      const isDuplicate = (
        (error as any)?.code === "23505" ||
        (error as any)?.message?.toLowerCase?.().includes("duplicate key")
      );

      if (error && !isDuplicate) throw error;

      setDone(true);
      toast({
        title: isDuplicate ? "You're already on the list" : "Request received",
        description: "We’ll email you with next steps.",
      });
    } catch (e: any) {
      console.error("[VIP waitlist] insert error:", e);
      setErr(e?.message ?? "Submission failed");
      toast({
        title: "Could not submit",
        description: e?.message ?? "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-white">VIP Access</h3>
        <p className="text-sm text-zinc-400">Get early access and your own link page</p>
      </div>

      {!done ? (
        <form onSubmit={handleRequestInvite} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl bg-zinc-900/50 border border-zinc-700/50 text-white 
                       placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 
                       transition-all duration-300 hover:border-zinc-600/70"
          />
          
          <input
            type="text"
            placeholder="VIP Code (optional)"
            value={vipCode}
            onChange={(e) => setVipCode(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl bg-zinc-900/50 border border-zinc-700/50 text-white 
                       placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 
                       transition-all duration-300 hover:border-zinc-600/70"
          />
          
          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full py-4 px-6 rounded-2xl bg-white text-black font-medium 
                       hover:bg-zinc-100 transition-all duration-300
                       transform hover:scale-[1.02] active:scale-[0.98]
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Requesting...' : 'Request Access'}
          </button>
        </form>
      ) : (
        <div className="text-center p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
          <div className="text-emerald-400 font-medium text-lg">You're in!</div>
          <p className="text-sm text-emerald-300/70">Check your email for next steps</p>
        </div>
      )}

      {/* Clean footer */}
      <div className="text-center space-y-3 pt-2">
        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="11" width="16" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          Secure & Encrypted
        </div>
        
        <button
          onClick={() => navigate('/signup')}
          className="text-xs text-zinc-400 hover:text-white underline decoration-zinc-600 
                     underline-offset-2 hover:decoration-zinc-400 transition-colors"
        >
          Claim your custom page →
        </button>
      </div>

      {err && (
        <div className="text-center p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">{err}</p>
        </div>
      )}

      {openPreview && <PreviewModal onClose={() => setOpenPreview(false)} />}
    </div>
  );
}
