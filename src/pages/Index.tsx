import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WaitlistForm from '../components/WaitlistForm';
import { frostedNavStyle, frostedCardStyle, holographicGradient } from '../lib/frosted';
import { PalmLeafCluster } from '../components/PalmLeaf';

export default function Index() {
  const [mode, setMode] = useState<'waitlist' | 'creator'>('waitlist');
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === 'waitlist' ? 'creator' : 'waitlist');
  };

  const handleCreatorSignup = () => {
    navigate('/creator-signup');
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      
      {/* Exact Holographic Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
        }}
      />
      
      {/* Optional subtle overlay to enhance contrast if needed */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Main Glass Card - Everything Inside */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          
          {/* Single Premium Glass Card - Enhanced with Deep Shadows */}
          <div className="relative bg-white/10 backdrop-blur-3xl border-2 border-white/20 rounded-[3rem] p-12 
                          shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] 
                          hover:shadow-[0_40px_70px_-15px_rgba(0,0,0,0.5)]
                          hover:border-white/30 transition-all duration-700
                          before:absolute before:inset-0 before:rounded-[3rem] before:bg-gradient-to-br 
                          before:from-white/5 before:to-transparent before:pointer-events-none">
            
            {/* Luxury material overlays */}
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-slate-700/15 via-transparent to-slate-900/15 pointer-events-none" />
            <div className="absolute inset-0 rounded-[3rem]" style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, transparent 30%, rgba(16, 185, 129, 0.06) 70%, transparent 100%)'
            }} />
            <div className="absolute inset-px rounded-[3rem] bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative space-y-12">
              
              {/* Brand Header */}
              <div className="text-center space-y-6">
                <h1 className="text-5xl font-light tracking-wide text-white">
                  CABANA
                </h1>
                <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-emerald-400 mx-auto" />
                <p className="text-sm text-zinc-400 tracking-widest uppercase font-medium">
                  Pre-Launch Access
                </p>
              </div>
              
              {/* Mode Toggle */}
              <div className="flex items-center justify-center">
                <div className="flex bg-white/15 backdrop-blur-xl border-2 border-white/25 rounded-2xl p-1.5 shadow-lg">
                  <button
                    onClick={() => setMode('waitlist')}
                    className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide font-sans transition-all duration-300 ${
                      mode === 'waitlist' 
                        ? 'bg-white/90 backdrop-blur-md text-gray-800 shadow-lg shadow-white/30 border-2 border-white/50' 
                        : 'text-white/70 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    Join Waitlist
                  </button>
                  <button
                    onClick={() => setMode('creator')}
                    className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide font-sans transition-all duration-300 ${
                      mode === 'creator' 
                        ? 'bg-white/90 backdrop-blur-md text-gray-800 shadow-lg shadow-white/30 border-2 border-white/50' 
                        : 'text-white/70 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    I'm a Creator
                  </button>
                </div>
              </div>

              {/* Content Area */}
              {mode === 'waitlist' ? (
                <div className="space-y-8">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-light text-white">Join the Waitlist</h2>
                    <p className="text-zinc-400 leading-relaxed">
                      Be among the first to experience holographic link-in-bio
                    </p>
                  </div>
                  
                  <WaitlistForm />
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-light text-white">Creator Access</h2>
                    <p className="text-zinc-400 leading-relaxed">
                      Build your premium holographic experience
                    </p>
                  </div>
                  
                  <div className="space-y-8 text-center">
                    
                    {/* Holographic icon */}
                    <div className="relative mx-auto w-20 h-20">
                      <div className="absolute inset-0 rounded-2xl"
                           style={{
                             background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(16, 185, 129, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)',
                             border: '1px solid rgba(251, 191, 36, 0.3)'
                           }}>
                      </div>
                      <div className="absolute inset-2 rounded-xl bg-slate-800/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-2xl">✨</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-medium text-white">Claim Your Page</h3>
                      <p className="text-zinc-400 leading-relaxed">
                        Reserve your custom handle and launch with premium features
                      </p>
                    </div>
                    
                    <button
                      onClick={handleCreatorSignup}
                      className="relative w-full py-4 px-6 rounded-2xl bg-white/90 backdrop-blur-md text-gray-800 font-bold tracking-wide font-sans
                                 hover:bg-white hover:shadow-xl hover:shadow-white/40 transition-all duration-300
                                 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/30
                                 border-2 border-white/50 hover:border-white/70"
                    >
                      <span className="relative">Get Started</span>
                    </button>
                    
                    <p className="text-xs text-zinc-500">
                      Free during pre-launch
                    </p>
                  </div>
                </div>
              )}
              
              {/* Footer inside card */}
              <div className="text-center pt-4 border-t border-slate-600/20">
                <p className="text-xs text-zinc-500">
                  Pre-Launch • CABANA 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}