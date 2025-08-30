import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function CreatorSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    handle: '',
    title: '',
    bio: '',
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // For now, use demo mode until database is set up
      console.log('Demo mode - Creator signup:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      
      // After success, redirect to customization page
      setTimeout(() => {
        navigate(`/customize/${formData.handle}`);
      }, 2000);
      
    } catch (error) {
      console.error('Creator signup error:', error);
      setStatus('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center px-6">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
            <div className="text-4xl">✨</div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-light">Success!</h1>
            <p className="text-zinc-400 max-w-md mx-auto">
              Your creator page request has been submitted. We'll email you with next steps.
            </p>
          </div>
          <p className="text-sm text-zinc-500">Redirecting you back...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white px-6 py-12">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <button 
            onClick={() => navigate('/')} 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-light">Claim Your Page</h1>
            <div className="w-16 h-px bg-gradient-to-r from-brand-purple to-brand-teal mx-auto" />
            <p className="text-zinc-400">Reserve your custom CABANA handle</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 rounded-2xl bg-zinc-900/50 border border-zinc-700/50 text-white 
                             placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 
                             transition-all duration-300"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Handle *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 py-4 rounded-l-2xl bg-zinc-800/50 border border-r-0 border-zinc-700/50 text-zinc-400 text-sm">
                    cabana.com/
                  </span>
                  <input
                    type="text"
                    name="handle"
                    required
                    value={formData.handle}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-4 rounded-r-2xl bg-zinc-900/50 border border-zinc-700/50 text-white 
                               placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 
                               transition-all duration-300"
                    placeholder="yourname"
                    pattern="[a-zA-Z0-9_-]+"
                    title="Only letters, numbers, underscores, and hyphens allowed"
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-2">Letters, numbers, and hyphens only</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 rounded-2xl bg-zinc-900/50 border border-zinc-700/50 text-white 
                             placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 
                             transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 rounded-2xl bg-zinc-900/50 border border-zinc-700/50 text-white 
                             placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 
                             transition-all duration-300 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting' || !formData.email || !formData.handle}
              className="w-full py-4 px-6 rounded-2xl bg-white text-black font-medium 
                         hover:bg-zinc-100 transition-all duration-300
                         transform hover:scale-[1.02] active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {status === 'submitting' ? 'Creating...' : 'Create My Page'}
            </button>

            {status === 'error' && (
              <div className="text-center p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
              </div>
            )}
          </form>

          <div className="text-center pt-4 border-t border-zinc-800/50">
            <p className="text-xs text-zinc-500">
              Free during pre-launch • Premium features included
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}