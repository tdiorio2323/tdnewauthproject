import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [vipCode, setVipCode] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // For now, use demo mode until database is set up
      console.log('Demo mode - Waitlist submission:', { email, vipCode });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail(''); // Clear form
      setVipCode(''); // Clear VIP code
      
      // Show success message
      setTimeout(() => {
        alert('Successfully joined the waitlist! (Demo mode - database setup needed for production)');
      }, 100);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input
          type="email"
          name="email"
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
          name="vipCode"
          placeholder="VIP Code (optional)"
          value={vipCode}
          onChange={(e) => setVipCode(e.target.value)}
          className="w-full px-4 py-4 rounded-2xl bg-zinc-900/50 border border-zinc-700/50 text-white 
                     placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 
                     transition-all duration-300 hover:border-zinc-600/70"
        />
        
        <button
          type="submit"
          className="relative w-full py-4 px-6 rounded-2xl bg-white/90 backdrop-blur-md text-gray-800 font-bold tracking-wide font-sans
                     hover:bg-white hover:shadow-xl hover:shadow-white/40 transition-all duration-300
                     transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/30
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                     border-2 border-white/50 hover:border-white/70"
          disabled={status === 'submitting'}
        >
          <span className="relative">
            {status === 'submitting' ? 'Joining...' : 'Join Waitlist'}
          </span>
        </button>
      </div>
      
      {status === 'success' && (
        <div className="text-center p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-emerald-400 text-sm">Successfully joined the waitlist!</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-center p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">Error joining the waitlist. Please try again.</p>
        </div>
      )}
    </form>
  );
}
