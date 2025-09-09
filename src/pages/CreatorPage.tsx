import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme, FONTS, THEMES } from '../contexts/ThemeContext';

type Creator = {
  id: string;
  handle: string;
  display_name: string | null;
  bio: string | null;
  email: string;
  created_at: string;
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

const BUTTON_STYLES = [
  { id: 'rounded', class: 'rounded-xl' },
  { id: 'sharp', class: 'rounded-none' },
  { id: 'pill', class: 'rounded-full' },
  { id: 'glow', class: 'rounded-xl shadow-lg shadow-purple-500/25' }
] as const;

const COLOR_SCHEMES = [
  { id: 'purple-teal', colors: ['from-purple-500', 'to-teal-400'], accent: 'purple-500' },
  { id: 'blue-pink', colors: ['from-blue-500', 'to-pink-500'], accent: 'blue-500' },
  { id: 'green-yellow', colors: ['from-green-400', 'to-yellow-400'], accent: 'green-400' },
  { id: 'mono-white', colors: ['from-white', 'to-gray-300'], accent: 'gray-600' }
] as const;

export default function CreatorPage() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { preferences } = useTheme();
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
          bio: 'Welcome to my personalized link-in-bio experience! ✨',
          email: 'demo@example.com',
          created_at: new Date().toISOString()
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
          <p className="text-purple-200">Loading creator page...</p>
        </div>
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 text-white flex items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
            <div className="text-4xl">❌</div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-light">Page Not Found</h1>
            <p className="text-purple-200">
              The creator page "@{handle}" doesn't exist or hasn't been set up yet.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-2xl bg-white text-black font-medium 
                       hover:bg-gray-100 transition-all duration-300
                       transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Get theme-based styling
  const profileImage = PROFILE_IMAGES.find(img => img.id === preferences.profileImage) || PROFILE_IMAGES[0];
  const font = FONTS.find(f => f.id === preferences.font) || FONTS[0];
  const buttonStyle = BUTTON_STYLES.find(b => b.id === preferences.buttonStyle) || BUTTON_STYLES[0];
  const colorScheme = COLOR_SCHEMES.find(c => c.id === preferences.colorScheme) || COLOR_SCHEMES[0];

  // Dynamic background based on current theme
  const getThemeBackground = () => {
    switch(preferences.theme) {
      case 'minimal':
        return 'bg-gradient-to-br from-gray-50 to-white';
      case 'gradient':
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900';
      case 'neon':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      case 'glass':
        return 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900';
      default:
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900';
    }
  };

  const getTextColor = () => {
    return preferences.theme === 'minimal' ? 'text-gray-900' : 'text-white';
  };

  const getSecondaryTextColor = () => {
    return preferences.theme === 'minimal' ? 'text-gray-600' : 'text-gray-300';
  };

  return (
    <div className={`min-h-screen ${getThemeBackground()} ${getTextColor()} relative overflow-hidden transition-all duration-700`}>
      {/* Dynamic background effects based on theme */}
      <div className="absolute inset-0">
        {preferences.theme === 'gradient' && (
          <>
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
          </>
        )}
        {preferences.theme === 'neon' && (
          <>
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" />
            {/* Matrix-like lines */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(34, 197, 94, 0.1) 25%, rgba(34, 197, 94, 0.1) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, 0.1) 75%, rgba(34, 197, 94, 0.1) 76%, transparent 77%, transparent)',
              backgroundSize: '20px 20px'
            }} />
          </>
        )}
        {preferences.theme === 'glass' && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-full blur-3xl" />
            {/* Glass texture */}
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} />
          </>
        )}
        {preferences.theme === 'minimal' && (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-teal-100/20 to-green-100/20 rounded-full blur-3xl" />
            {/* Subtle paper texture */}
            <div className="absolute inset-0 opacity-[0.01]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperFilter)'/%3E%3C/svg%3E")`
            }} />
          </>
        )}
      </div>
      
      {/* Header */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-md mx-auto text-center">
          <button 
            onClick={() => navigate('/')} 
            className={`${getSecondaryTextColor()} hover:${getTextColor()} transition-colors text-sm tracking-widest uppercase font-medium mb-8`}
          >
            ← Back to CABANA
          </button>
        </div>
      </div>

      {/* Creator Profile */}
      <div className="relative z-10 px-6 pb-12">
        <div className="max-w-md mx-auto">
          <div className={`text-center space-y-16 transition-all duration-500 ${font.class}`}>
            
            {/* Profile Header */}
            <div className="space-y-8">
              
              {/* Profile Picture Circle */}
              <div className="relative mx-auto w-32 h-32">
                <div className={`absolute inset-0 rounded-full border transition-all duration-500 ${
                  preferences.theme === 'minimal'
                    ? 'bg-white border-gray-300 shadow-lg'
                    : `bg-gradient-to-br ${colorScheme.colors.join(' ')}/10 border-${colorScheme.accent}/20 backdrop-blur-sm`
                }`}>
                </div>
                <div className={`absolute inset-2 rounded-full flex items-center justify-center transition-all duration-500 ${
                  preferences.theme === 'minimal' ? 'bg-gray-50' : 'bg-black/20 backdrop-blur-sm'
                }`}>
                  <div className="text-4xl">{profileImage.emoji}</div>
                </div>
              </div>
              
              {/* Name and Handles */}
              <div className="space-y-4">
                <h1 className={`text-5xl font-light tracking-wide transition-all duration-500 ${getTextColor()}`}>
                  {creator.display_name || creator.handle}
                </h1>
                <div className={`w-16 h-px mx-auto bg-gradient-to-r transition-all duration-500 ${colorScheme.colors.join(' ')}`} />
                {preferences.socialHandle && (
                  <p className={`transition-all duration-500 text-sm tracking-widest uppercase font-medium ${
                    preferences.theme === 'minimal' ? `text-${colorScheme.accent}` : getSecondaryTextColor()
                  }`}>
                    @{preferences.socialHandle}
                  </p>
                )}
                <p className={`text-xs tracking-wider transition-all duration-500 ${
                  preferences.theme === 'minimal' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  @{creator.handle}
                </p>
              </div>
              
              {/* Bio */}
              {creator.bio && (
                <div className="max-w-md mx-auto">
                  <p className={`leading-relaxed transition-all duration-500 ${getSecondaryTextColor()}`}>
                    {creator.bio}
                  </p>
                </div>
              )}
            </div>
            
            {/* Button Layout - Dynamic based on preferences */}
            <div className="space-y-8">
              {preferences.buttonLayout === 'grid3x3' ? (
                <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                  {['🔗', '📧', '🛍️', '📱', '🎵', '💼', '🎥', '📚', '✨'].map((emoji, index) => (
                    <button 
                      key={index} 
                      className={`aspect-square flex items-center justify-center text-2xl hover:scale-105 transition-all duration-300 ${
                        preferences.theme === 'minimal'
                          ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
                          : 'bg-white text-black hover:bg-gray-100'
                      } ${buttonStyle.class}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-6 max-w-md mx-auto">
                  <div className={`relative backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] shadow-2xl ${
                    preferences.theme === 'minimal'
                      ? 'bg-white/90 border-gray-200 hover:bg-white shadow-gray-200/30'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 shadow-black/20'
                  }`}>
                    {/* Inner glow effect for non-minimal themes */}
                    {preferences.theme !== 'minimal' && (
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${colorScheme.colors.join(' ')}/5 pointer-events-none transition-all duration-500`} />
                    )}
                    
                    <div className="relative space-y-6">
                      {[
                        { label: 'Instagram', color: 'purple-400', emoji: '📸' },
                        { label: 'YouTube', color: 'red-400', emoji: '🎥' },
                        { label: 'TikTok', color: 'pink-400', emoji: '🎵' },
                        { label: 'Shop', color: 'amber-400', emoji: '🛍️' },
                        { label: 'Contact', color: 'teal-400', emoji: '📧' }
                      ].map((item, index) => (
                        <button 
                          key={item.label}
                          className={`w-full py-4 px-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                            preferences.theme === 'minimal'
                              ? 'bg-gray-50 border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-100'
                              : 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:border-white/30 hover:bg-white/20'
                          } ${buttonStyle.class}`}
                        >
                          <span className="flex items-center justify-center gap-3">
                            <span className="text-lg">{item.emoji}</span>
                            <span className="font-medium">{item.label}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className={`text-xs transition-all duration-500 ${
                preferences.theme === 'minimal' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Powered by CABANA • 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}