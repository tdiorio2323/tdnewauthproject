import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme, THEMES, FONTS, COLOR_SCHEMES, ThemeType, FontType, ButtonStyleType, ColorSchemeType, ButtonLayoutType } from '../contexts/ThemeContext';

const THEME_OPTIONS = [
  { id: 'minimal', name: 'Minimal', preview: 'Clean & Simple', emoji: '🤍' },
  { id: 'gradient', name: 'Holographic', preview: 'Colorful Gradients', emoji: '🌈' },
  { id: 'neon', name: 'Cyberpunk', preview: 'Neon Glow', emoji: '⚡' },
  { id: 'glass', name: 'Glassmorphism', preview: 'Frosted Glass', emoji: '💎' }
] as const;

const BUTTON_STYLES = [
  { id: 'rounded', name: 'Rounded', preview: 'rounded-xl', class: 'rounded-xl' },
  { id: 'sharp', name: 'Sharp', preview: 'rounded-none', class: 'rounded-none' },
  { id: 'pill', name: 'Pill', preview: 'rounded-full', class: 'rounded-full' },
  { id: 'glow', name: 'Glow', preview: 'rounded-xl + shadow', class: 'rounded-xl shadow-lg shadow-purple-500/25' }
] as const;

const BUTTON_LAYOUTS = [
  { id: 'stacked', name: 'Stacked Buttons', preview: 'Traditional vertical list', icon: '☰' },
  { id: 'grid3x3', name: '3x3 Icon Grid', preview: 'Tic-tac-toe style icons', icon: '⚏' }
] as const;

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

export default function CustomizePage() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { preferences, updatePreferences, currentTheme } = useTheme();

  useEffect(() => {
    if (!handle) {
      navigate('/');
      return;
    }
  }, [handle, navigate]);

  const handleSave = async () => {
    // Simulate saving with a brief delay
    await new Promise(resolve => setTimeout(resolve, 500));
    navigate(`/${handle}`);
  };

  // Get current theme config for dynamic styling
  const themeConfig = THEMES[preferences.theme];
  const fontClass = FONTS.find(f => f.id === preferences.font)?.class || 'font-sans';
  const colorScheme = COLOR_SCHEMES.find(c => c.id === preferences.colorScheme);
  
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

  // Dynamic text colors based on theme
  const getTextColor = () => {
    return preferences.theme === 'minimal' ? 'text-gray-900' : 'text-white';
  };

  const getSecondaryTextColor = () => {
    return preferences.theme === 'minimal' ? 'text-gray-600' : 'text-gray-300';
  };

  // Card background based on theme
  const getCardBackground = () => {
    switch(preferences.theme) {
      case 'minimal':
        return 'bg-white/80 border-gray-200';
      case 'gradient':
        return 'bg-white/5 backdrop-blur-xl border-white/10';
      case 'neon':
        return 'bg-green-500/5 backdrop-blur-xl border-green-500/20';
      case 'glass':
        return 'bg-white/10 backdrop-blur-xl border-white/20';
      default:
        return 'bg-white/5 backdrop-blur-xl border-white/10';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ease-in-out ${getThemeBackground()} ${getTextColor()} relative overflow-hidden`}>
      {/* Dynamic background effects based on theme */}
      <div className="absolute inset-0">
        {preferences.theme === 'gradient' && (
          <>
            <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-purple-500/15 to-indigo-600/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-teal-400/15 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </>
        )}
        {preferences.theme === 'neon' && (
          <>
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" />
          </>
        )}
        {preferences.theme === 'glass' && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-full blur-3xl" />
          </>
        )}
        {preferences.theme === 'minimal' && (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-teal-100/20 to-green-100/20 rounded-full blur-3xl" />
          </>
        )}
      </div>
      
      {/* Header */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center space-y-8 mb-16 transition-all duration-500 ${fontClass}`}>
            <div className="space-y-4">
              <h1 className={`text-5xl font-light tracking-wide transition-all duration-500 ${getTextColor()}`}>
                CUSTOMIZE
              </h1>
              <div className={`w-16 h-px mx-auto transition-all duration-500 bg-gradient-to-r ${colorScheme?.colors.join(' ') || 'from-purple-500 to-teal-400'}`} />
              <p className={`text-sm tracking-widest uppercase font-medium transition-all duration-500 ${getSecondaryTextColor()}`}>
                Design Your Experience • Live Preview
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Improved 2-column layout with better balance */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Left Column - Customization Options */}
            <div className="space-y-6 lg:space-y-8">
              
              {/* Theme Selection */}
              <div className={`${getCardBackground()} border rounded-3xl p-6 lg:p-8 transition-all duration-500`}>
                <h2 className={`text-xl lg:text-2xl font-light mb-6 ${fontClass}`}>Choose Your Theme</h2>
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  {THEME_OPTIONS.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => updatePreferences({ theme: theme.id as ThemeType })}
                      className={`p-4 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden ${
                        preferences.theme === theme.id
                          ? colorScheme ? `border-${colorScheme.accent} bg-${colorScheme.accent}/10` : 'border-purple-500 bg-purple-500/10'
                          : preferences.theme === 'minimal' ? 'border-gray-300 hover:border-gray-400' : 'border-white/20 hover:border-white/30'
                      }`}
                    >
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 font-medium mb-1">
                          <span>{theme.emoji}</span>
                          {theme.name}
                        </div>
                        <div className={`text-sm mt-1 ${getSecondaryTextColor()}`}>{theme.preview}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Selection */}
              <div className={`${getCardBackground()} border rounded-3xl p-6 lg:p-8 transition-all duration-500`}>
                <h2 className={`text-xl lg:text-2xl font-light mb-6 ${fontClass}`}>Select Your Font</h2>
                <div className="grid grid-cols-1 gap-3">
                  {FONTS.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => updatePreferences({ font: font.id as FontType })}
                      className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left ${
                        preferences.font === font.id
                          ? colorScheme ? `border-${colorScheme.accent} bg-${colorScheme.accent}/10` : 'border-purple-500 bg-purple-500/10'
                          : preferences.theme === 'minimal' ? 'border-gray-300 hover:border-gray-400' : 'border-white/20 hover:border-white/30'
                      } ${font.class}`}
                    >
                      <div className="font-medium">{font.name}</div>
                      <div className={`text-sm mt-1 ${getSecondaryTextColor()}`}>
                        {font.id === 'inter' && 'Modern & Clean'}
                        {font.id === 'playfair' && 'Elegant Serif'}
                        {font.id === 'space-mono' && 'Techy Monospace'}
                        {font.id === 'poppins' && 'Friendly Rounded'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Scheme */}
              <div className={`${getCardBackground()} border rounded-3xl p-6 lg:p-8 transition-all duration-500`}>
                <h2 className={`text-xl lg:text-2xl font-light mb-6 ${fontClass}`}>Color Scheme</h2>
                <div className="space-y-3">
                  {COLOR_SCHEMES.map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() => updatePreferences({ colorScheme: scheme.id as ColorSchemeType })}
                      className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left ${
                        preferences.colorScheme === scheme.id
                          ? `border-${scheme.accent} bg-${scheme.accent}/10`
                          : preferences.theme === 'minimal' ? 'border-gray-300 hover:border-gray-400' : 'border-white/20 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{scheme.name}</div>
                        <div className={`w-16 h-4 rounded-full bg-gradient-to-r ${scheme.colors.join(' ')}`}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Button Style and Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Button Style */}
                <div className={`${getCardBackground()} border rounded-3xl p-6 transition-all duration-500`}>
                  <h2 className={`text-lg font-light mb-4 ${fontClass}`}>Button Style</h2>
                  <div className="space-y-3">
                    {BUTTON_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => updatePreferences({ buttonStyle: style.id as ButtonStyleType })}
                        className={`w-full p-3 rounded-xl border transition-all duration-300 ${
                          preferences.buttonStyle === style.id
                            ? colorScheme ? `border-${colorScheme.accent} bg-${colorScheme.accent}/10` : 'border-purple-500 bg-purple-500/10'
                            : preferences.theme === 'minimal' ? 'border-gray-300 hover:border-gray-400' : 'border-white/20 hover:border-white/30'
                        }`}
                      >
                        <div className={`${preferences.theme === 'minimal' ? 'bg-gray-900 text-white' : 'bg-white text-black'} px-3 py-1 text-sm font-medium mb-2 ${style.class}`}>
                          Preview
                        </div>
                        <div className="text-sm font-medium text-left">{style.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Button Layout */}
                <div className={`${getCardBackground()} border rounded-3xl p-6 transition-all duration-500`}>
                  <h2 className={`text-lg font-light mb-4 ${fontClass}`}>Button Layout</h2>
                  <div className="space-y-3">
                    {BUTTON_LAYOUTS.map((layout) => (
                      <button
                        key={layout.id}
                        onClick={() => updatePreferences({ buttonLayout: layout.id as ButtonLayoutType })}
                        className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                          preferences.buttonLayout === layout.id
                            ? colorScheme ? `border-${colorScheme.accent} bg-${colorScheme.accent}/10` : 'border-purple-500 bg-purple-500/10'
                            : preferences.theme === 'minimal' ? 'border-gray-300 hover:border-gray-400' : 'border-white/20 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{layout.icon}</span>
                          <div>
                            <div className="font-medium">{layout.name}</div>
                            <div className={`text-xs ${getSecondaryTextColor()}`}>{layout.preview}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile Picture */}
              <div className={`${getCardBackground()} border rounded-3xl p-6 lg:p-8 transition-all duration-500`}>
                <h2 className={`text-xl lg:text-2xl font-light mb-6 ${fontClass}`}>Choose Profile Picture</h2>
                <div className="grid grid-cols-3 gap-4">
                  {PROFILE_IMAGES.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => updatePreferences({ profileImage: img.id })}
                      className={`aspect-square rounded-full border transition-all duration-300 flex items-center justify-center text-2xl ${
                        preferences.profileImage === img.id
                          ? colorScheme ? `border-${colorScheme.accent} bg-${colorScheme.accent}/10 scale-110` : 'border-purple-500 bg-purple-500/10 scale-110'
                          : preferences.theme === 'minimal' ? 'border-gray-300 hover:border-gray-400 hover:scale-105' : 'border-white/20 hover:border-white/30 hover:scale-105'
                      }`}
                    >
                      {img.emoji}
                    </button>
                  ))}
                </div>
                <p className={`text-sm mt-4 text-center ${getSecondaryTextColor()}`}>
                  Selected: {PROFILE_IMAGES.find(img => img.id === preferences.profileImage)?.name}
                </p>
              </div>

              {/* Social Handle */}
              <div className={`${getCardBackground()} border rounded-3xl p-6 lg:p-8 transition-all duration-500`}>
                <h2 className={`text-xl lg:text-2xl font-light mb-6 ${fontClass}`}>Social Handle (Optional)</h2>
                <div className="flex">
                  <span className={`inline-flex items-center px-4 py-3 rounded-l-2xl border border-r-0 ${
                    preferences.theme === 'minimal' 
                      ? 'bg-gray-100 border-gray-300 text-gray-600' 
                      : 'bg-white/10 border-white/20 text-gray-300'
                  } text-sm transition-all duration-500`}>
                    @
                  </span>
                  <input
                    type="text"
                    value={preferences.socialHandle}
                    onChange={(e) => updatePreferences({ socialHandle: e.target.value })}
                    placeholder="yourusername"
                    className={`flex-1 px-4 py-3 rounded-r-2xl border transition-all duration-500 focus:outline-none ${
                      preferences.theme === 'minimal'
                        ? 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-gray-500'
                        : 'bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-white/30'
                    } ${fontClass}`}
                  />
                </div>
                <p className={`text-xs mt-2 ${getSecondaryTextColor()}`}>Your social media handle (Instagram, Twitter, etc.)</p>
              </div>
            </div>

            {/* Right Column - Live Preview */}
            <div className="sticky top-8">
              <div className={`${getCardBackground()} border rounded-3xl p-6 lg:p-8 transition-all duration-500`}>
                <h2 className={`text-xl lg:text-2xl font-light mb-6 ${fontClass}`}>Live Preview</h2>
                
                {/* Preview Container with theme-based styling */}
                <div className={`rounded-2xl p-8 border transition-all duration-500 ${
                  preferences.theme === 'minimal'
                    ? 'bg-white border-gray-200'
                    : 'bg-black/20 border-white/10'
                }`}>
                  <div className="text-center space-y-6">
                    
                    {/* Profile Preview */}
                    <div className="space-y-4">
                      {/* Profile Picture Circle with theme-based colors */}
                      <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        preferences.theme === 'minimal'
                          ? 'bg-gray-50 border-gray-300'
                          : `bg-gradient-to-br ${colorScheme?.colors.join(' ') || 'from-purple-500/20 to-teal-400/20'} border-white/30`
                      }`}>
                        <span className="text-3xl">
                          {PROFILE_IMAGES.find(img => img.id === preferences.profileImage)?.emoji || '✨'}
                        </span>
                      </div>
                      
                      <div className={`space-y-2 transition-all duration-500 ${fontClass}`}>
                        <h3 className={`text-xl font-light ${preferences.theme === 'minimal' ? 'text-gray-900' : 'text-white'}`}>
                          {handle || 'Demo Creator'}
                        </h3>
                        <div className={`w-12 h-px mx-auto bg-gradient-to-r transition-all duration-500 ${colorScheme?.colors.join(' ') || 'from-purple-500 to-teal-400'}`}></div>
                        {preferences.socialHandle && (
                          <p className={`text-sm transition-all duration-500 ${
                            preferences.theme === 'minimal' ? 'text-blue-600' : colorScheme?.accent ? `text-${colorScheme.accent}` : 'text-purple-400'
                          }`}>
                            @{preferences.socialHandle}
                          </p>
                        )}
                        <p className={`text-xs ${preferences.theme === 'minimal' ? 'text-gray-500' : 'text-gray-500'}`}>@{handle}</p>
                      </div>
                    </div>
                    
                    {/* Button Preview with live updates */}
                    {preferences.buttonLayout === 'stacked' ? (
                      <div className="space-y-3 w-full max-w-xs mx-auto">
                        {['Instagram', 'Shop', 'Contact'].map((label, index) => (
                          <div key={label} className={`w-full py-3 px-4 border text-sm font-medium transition-all duration-500 ${
                            preferences.theme === 'minimal'
                              ? 'bg-gray-900 border-gray-700 text-white hover:bg-gray-800'
                              : 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'
                          } ${BUTTON_STYLES.find(b => b.id === preferences.buttonStyle)?.class || 'rounded-xl'}`}>
                            {label}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                        {['🔗', '📧', '🛍️', '📱', '🎵', '💼'].map((emoji, index) => (
                          <div key={index} className={`aspect-square flex items-center justify-center text-xl transition-all duration-500 ${
                            preferences.theme === 'minimal'
                              ? 'bg-gray-900 text-white'
                              : 'bg-white text-black'
                          } ${BUTTON_STYLES.find(b => b.id === preferences.buttonStyle)?.class || 'rounded-xl'}`}>
                            {emoji}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className={`text-xs mt-6 transition-all duration-500 ${
                      preferences.theme === 'minimal' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      Live preview • Updates as you customize
                    </p>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className={`w-full mt-6 py-4 px-6 rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                    preferences.theme === 'minimal'
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-white text-black hover:bg-gray-100'
                  } ${fontClass}`}
                >
                  Save & View My Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}