import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PreviewModal from './PreviewModal';
import { supabase, SUPABASE_ENABLED } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";
import { frostedInputStyle, frostedButtonStyle } from '@/lib/frosted';

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
    <div className="mt-4 rounded-2xl border border-white/12 bg-white/[.06] px-5 py-6 backdrop-blur-xl">
      <h3 className="text-base md:text-lg font-semibold tracking-wide">VIP Access</h3>
      <p className="mt-1 text-sm md:text-base text-white/70">Get early access and your own link page.</p>

      <div className="my-3 h-px w-full bg-white/10" />

      {/* Logo moved to top of card (see Cabana.tsx) */}

      <div>Form Placeholder</div>

      {/* trust + CTA to claim page */}
      <div className="mt-3 flex flex-col items-center gap-2 text-xs text-white/45">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="4" y="11" width="16" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          Secure • Encrypted
        </div>
        <button
          onClick={() => navigate('/signup')}
          className="underline decoration-white/30 underline-offset-2 hover:text-white/70"
        >
          Claim your custom page →
        </button>
      </div>

      {done && <p className="mt-2 text-green-400">Thanks for your submission!</p>}
      {err && <p className="mt-2 text-red-400">{err}</p>}

      {openPreview && <PreviewModal onClose={() => setOpenPreview(false)} />}
    </div>
  );
}
