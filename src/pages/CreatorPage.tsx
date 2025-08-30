import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Creator = {
  id: string;
  handle: string;
  display_name: string | null;
  bio: string | null;
  email: string;
  created_at: string;
  style_preferences?: {
    theme: 'minimal' | 'gradient' | 'neon' | 'glass';
    font: 'inter' | 'playfair' | 'space-mono' | 'poppins';
    buttonStyle: 'rounded' | 'sharp' | 'pill' | 'glow';
    buttonLayout: 'stacked' | 'grid3x3';
    colorScheme: 'purple-teal' | 'blue-pink' | 'green-yellow' | 'mono-white';
    backgroundPattern: 'none' | 'dots' | 'grid' | 'waves';
    profileImage: string | null;
    socialHandle: string;
    sections: {
      imageBox: boolean;
      bookingForm: boolean;
      shop: boolean;
      customText: boolean;
    };
  };
}

const PROFILE_IMAGES = [
  { id: 'sparkle', emoji: '✨', name: 'Sparkle' },
  { id: 'star', emoji: '⭐', name: 'Star' },
  { id: 'diamond', emoji: '💎', name: 'Diamond' },
  { id: 'fire', emoji: '🔥', name: 'Fire' },
  { id: 'rocket', emoji: '🚀', name: 'Rocket' },
  { id: 'crown', emoji: '👑', name: 'Crown' },
  { id: 'lightning', emoji: '⚡', name: 'Lightning' },
  { id: 'magic', emoji: '🪄', name: 'Magic' },
  { id: 'rainbow', emoji: '🌈', name: 'Rainbow' }
] as const;

const FONTS = [
  { id: 'inter', name: 'Inter', class: 'font-sans' },
  { id: 'playfair', name: 'Playfair', class: 'font-serif' },
  { id: 'space-mono', name: 'Space Mono', class: 'font-mono' },
  { id: 'poppins', name: 'Poppins', class: 'font-sans' }
] as const;

const BUTTON_STYLES = [
  { id: 'rounded', class: 'rounded-xl' },
  { id: 'sharp', class: 'rounded-none' },
  { id: 'pill', class: 'rounded-full' },
  { id: 'glow', class: 'rounded-xl shadow-lg shadow-purple-500/25' }
] as const;

const COLOR_SCHEMES = [
  { id: 'purple-teal', colors: ['from-purple-500', 'to-teal-400'] },
  { id: 'blue-pink', colors: ['from-blue-500', 'to-pink-500'] },
  { id: 'green-yellow', colors: ['from-green-400', 'to-yellow-400'] },
  { id: 'mono-white', colors: ['from-white', 'to-gray-300'] }
] as const;

export default function CreatorPage() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!handle) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchCreator = async () => {
      try {
        // Demo mode - simulate creator data
        const demoCreator = {
          id: '1',
          handle: handle?.toLowerCase() || 'demo',
          display_name: 'Demo Creator',
          bio: 'Welcome to my holographic link-in-bio experience!',
          email: 'demo@example.com',
          created_at: new Date().toISOString(),
          style_preferences: {
            theme: 'minimal',
            font: 'inter',
            buttonStyle: 'rounded',
            buttonLayout: 'stacked',
            colorScheme: 'purple-teal',
            backgroundPattern: 'none',
            profileImage: 'sparkle',
            socialHandle: 'democreator',
            sections: {
              imageBox: false,
              bookingForm: false,
              shop: false,
              customText: false
            }
          }
        };

        setCreator(demoCreator);
        console.log('Demo mode - Using demo creator data:', demoCreator);
      } catch (err) {
        console.error('Error in demo mode:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-400">Loading creator page...</p>
        </div>
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
            <div className="text-4xl">❌</div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-light">Page Not Found</h1>
            <p className="text-zinc-400">
              The creator page "@{handle}" doesn't exist or hasn't been set up yet.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-2xl bg-white text-black font-medium 
                       hover:bg-zinc-100 transition-all duration-300
                       transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white relative overflow-hidden">
      {/* Rich background elements */}
      <div className="absolute inset-0">
        {/* Large gradient orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-purple-500/15 to-indigo-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-teal-400/15 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-pink-500/8 to-rose-400/5 rounded-full blur-2xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Floating elements */}
        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-purple-400/30 rounded-full animate-ping" />
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-teal-400/40 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-indigo-400/25 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-950/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-teal-950/5 to-transparent" />
      </div>
      
      {/* Header */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-md mx-auto text-center">
          <button 
            onClick={() => navigate('/')} 
            className="text-zinc-400 hover:text-white transition-colors text-sm tracking-widest uppercase font-medium mb-8"
          >
            ← Back to CABANA
          </button>
        </div>
      </div>

      {/* Creator Profile */}
      <div className="relative z-10 px-6 pb-12">
        <div className="max-w-md mx-auto">
          
          {/* Get style preferences with defaults */}
          {(() => {
            const prefs = creator.style_preferences || {};
            const profileImage = PROFILE_IMAGES.find(img => img.id === prefs.profileImage) || PROFILE_IMAGES[0];
            const font = FONTS.find(f => f.id === prefs.font) || FONTS[0];
            const buttonStyle = BUTTON_STYLES.find(b => b.id === prefs.buttonStyle) || BUTTON_STYLES[0];
            const colorScheme = COLOR_SCHEMES.find(c => c.id === prefs.colorScheme) || COLOR_SCHEMES[0];
            
            return (
              <div className="text-center space-y-16">
                
                {/* Profile Header */}
                <div className="space-y-8">
                  
                  {/* Profile Picture Circle */}
                  <div className="relative mx-auto w-32 h-32">
                    <div className="absolute inset-0 rounded-full"
                         style={{
                           background: 'linear-gradient(135deg, rgba(123,104,238,0.1) 0%, rgba(74,159,189,0.1) 50%, rgba(245,185,66,0.1) 100%)',
                           border: '1px solid rgba(123,104,238,0.2)'
                         }}>
                    </div>
                    <div className="absolute inset-2 rounded-full bg-zinc-900/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-4xl">{profileImage.emoji}</div>
                    </div>
                  </div>
                  
                  {/* Name and Handles */}
                  <div className={`space-y-4 ${font.class}`}>
                    <h1 className="text-5xl font-light tracking-wide text-white">
                      {creator.display_name || creator.handle}
                    </h1>
                    <div className="w-16 h-px bg-gradient-to-r from-purple-500 to-teal-400 mx-auto" />
                    {prefs.socialHandle && (
                      <p className="text-zinc-400 text-sm tracking-widest uppercase font-medium">
                        @{prefs.socialHandle}
                      </p>
                    )}
                    <p className="text-zinc-500 text-xs tracking-wider">@{creator.handle}</p>
                  </div>
                  
                  {/* Bio */}
                  {creator.bio && (
                    <div className="max-w-md mx-auto">
                      <p className={`text-zinc-400 leading-relaxed ${font.class}`}>
                        {creator.bio}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Button Layout */}
                <div className="space-y-8">
                  {prefs.buttonLayout === 'grid3x3' ? (
                    <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                      <button className={`aspect-square bg-white text-black flex items-center justify-center text-2xl hover:scale-105 transition-transform ${buttonStyle.class}`}>
                        🔗
                      </button>
                      <button className={`aspect-square bg-white text-black flex items-center justify-center text-2xl hover:scale-105 transition-transform ${buttonStyle.class}`}>
                        📧
                      </button>
                      <button className={`aspect-square bg-white text-black flex items-center justify-center text-2xl hover:scale-105 transition-transform ${buttonStyle.class}`}>
                        🛍️
                      </button>
                      <button className={`aspect-square bg-white text-black flex items-center justify-center text-2xl hover:scale-105 transition-transform ${buttonStyle.class}`}>
                        📱
                      </button>
                      <button className={`aspect-square bg-white text-black flex items-center justify-center text-2xl hover:scale-105 transition-transform ${buttonStyle.class}`}>
                        🎵
                      </button>
                      <button className={`aspect-square bg-white text-black flex items-center justify-center text-2xl hover:scale-105 transition-transform ${buttonStyle.class}`}>
                        💼
                      </button>
                      <button className={`aspect-square bg-white text-black flex items-center justify-center text-2xl hover:scale-105 transition-transform ${buttonStyle.class}`}>
                        🎥
                      </button>
                      <button className={`aspect-square bg-white text-black flex items-center justify-center text-2xl hover:scale-105 transition-transform ${buttonStyle.class}`}>
                        📚
                      </button>
                      <button className={`aspect-square bg-white text-black flex items-center justify-center text-2xl hover:scale-105 transition-transform ${buttonStyle.class}`}>
                        ✨
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6 max-w-md mx-auto">
                      <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-8 
                                      hover:border-zinc-700/70 transition-all duration-500 hover:bg-zinc-900/50
                                      shadow-2xl shadow-purple-500/5">
                        {/* Inner glow effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-teal-400/5 pointer-events-none" />
                        
                        <div className="relative space-y-6">
                          <button className="w-full py-4 px-4 rounded-2xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-700/60 text-white 
                                             hover:border-zinc-600 hover:bg-zinc-800/70 transition-all duration-300 hover:scale-[1.02]
                                             shadow-lg shadow-black/20">
                            <span className="flex items-center justify-center gap-3">
                              <span className="w-2 h-2 bg-purple-400/60 rounded-full"></span>
                              Instagram
                            </span>
                          </button>
                          
                          <button className="w-full py-4 px-4 rounded-2xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-700/60 text-white 
                                             hover:border-zinc-600 hover:bg-zinc-800/70 transition-all duration-300 hover:scale-[1.02]
                                             shadow-lg shadow-black/20">
                            <span className="flex items-center justify-center gap-3">
                              <span className="w-2 h-2 bg-teal-400/60 rounded-full"></span>
                              YouTube
                            </span>
                          </button>
                          
                          <button className="w-full py-4 px-4 rounded-2xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-700/60 text-white 
                                             hover:border-zinc-600 hover:bg-zinc-800/70 transition-all duration-300 hover:scale-[1.02]
                                             shadow-lg shadow-black/20">
                            <span className="flex items-center justify-center gap-3">
                              <span className="w-2 h-2 bg-pink-400/60 rounded-full"></span>
                              TikTok
                            </span>
                          </button>
                          
                          <button className="w-full py-4 px-4 rounded-2xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-700/60 text-white 
                                             hover:border-zinc-600 hover:bg-zinc-800/70 transition-all duration-300 hover:scale-[1.02]
                                             shadow-lg shadow-black/20">
                            <span className="flex items-center justify-center gap-3">
                              <span className="w-2 h-2 bg-amber-400/60 rounded-full"></span>
                              Shop
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="text-center">
                  <p className="text-xs text-zinc-600">
                    Pre-Launch • CABANA 2025
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}