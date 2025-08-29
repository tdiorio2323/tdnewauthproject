import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const { error } = await supabase.from("signup_requests").insert({ email });

    if (error) {
      console.error('Supabase insert error:', { code: error.code, message: error.message, details: error.details });
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:opacity-90"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Joining...' : 'Join'}
      </button>
      {status === 'success' && <p className="text-green-500">Successfully joined the waitlist!</p>}
      {status === 'error' && <p className="text-red-500">Error joining the waitlist. Please try again.</p>}
    </form>
  );
}
