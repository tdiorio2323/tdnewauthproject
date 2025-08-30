import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type StylePreferences = {
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
}

const THEMES = [
  { id: 'minimal', name: 'Minimal', preview: 'Clean & Simple' },
  { id: 'gradient', name: 'Holographic', preview: 'Colorful Gradients' },
  { id: 'neon', name: 'Cyberpunk', preview: 'Neon Glow' },
  { id: 'glass', name: 'Glassmorphism', preview: 'Frosted Glass' }
] as const;

const FONTS = [
  { id: 'inter', name: 'Inter', preview: 'Modern & Clean', class: 'font-sans' },
  { id: 'playfair', name: 'Playfair', preview: 'Elegant Serif', class: 'font-serif' },
  { id: 'space-mono', name: 'Space Mono', preview: 'Techy Monospace', class: 'font-mono' },
  { id: 'poppins', name: 'Poppins', preview: 'Friendly Rounded', class: 'font-sans' }
] as const;

const BUTTON_STYLES = [
  { id: 'rounded', name: 'Rounded', preview: 'rounded-xl', class: 'rounded-xl' },
  { id: 'sharp', name: 'Sharp', preview: 'rounded-none', class: 'rounded-none' },
  { id: 'pill', name: 'Pill', preview: 'rounded-full', class: 'rounded-full' },
  { id: 'glow', name: 'Glow', preview: 'rounded-xl + shadow', class: 'rounded-xl shadow-lg shadow-purple-500/25' }
] as const;

const COLOR_SCHEMES = [
  { id: 'purple-teal', name: 'CABANA', colors: ['from-purple-500', 'to-teal-400'] },
  { id: 'blue-pink', name: 'Synthwave', colors: ['from-blue-500', 'to-pink-500'] },
  { id: 'green-yellow', name: 'Matrix', colors: ['from-green-400', 'to-yellow-400'] },
  { id: 'mono-white', name: 'Monochrome', colors: ['from-white', 'to-gray-300'] }
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [creator, setCreator] = useState<any>(null);
  
  const [preferences, setPreferences] = useState<StylePreferences>({
    theme: 'minimal',
    font: 'inter',
    buttonStyle: 'rounded',
    buttonLayout: 'stacked',
    colorScheme: 'purple-teal',
    backgroundPattern: 'none',
    profileImage: 'sparkle',
    socialHandle: '',
    sections: {
      imageBox: false,
      bookingForm: false,
      shop: false,
      customText: false
    }
  });

  useEffect(() => {
    if (!handle) {
      navigate('/');
      return;
    }

    const fetchCreator = async () => {
      try {
        // Demo mode - simulate creator data
        const demoCreator = {
          id: '1',
          handle: handle?.toLowerCase() || 'demo',
          display_name: 'Demo Creator',
          bio: 'This is a demo creator profile for testing the customization system.',
          email: 'demo@example.com',
          created_at: new Date().toISOString(),
          style_preferences: null
        };

        setCreator(demoCreator);
        console.log('Demo mode - Using demo creator data:', demoCreator);
      } catch (err) {
        console.error('Error in demo mode:', err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [handle]);

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // Demo mode - simulate saving
      console.log('Demo mode - Saving preferences:', preferences);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to their creator page
      navigate(`/${handle}`);
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving your customization. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-400">Loading customization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white relative overflow-hidden">
      {/* Rich background elements */}
      <div className="absolute inset-0">
        {/* Large gradient orbs */}
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/12 to-indigo-600/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-teal-400/12 to-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 right-1/2 w-80 h-80 bg-gradient-to-br from-pink-500/6 to-rose-400/4 rounded-full blur-2xl" />
        <div className="absolute bottom-1/2 left-10 w-72 h-72 bg-gradient-to-br from-amber-500/6 to-orange-400/4 rounded-full blur-2xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Floating particles */}
        <div className="absolute top-1/5 right-1/4 w-2 h-2 bg-purple-400/25 rounded-full animate-ping" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-teal-400/35 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-indigo-400/20 rounded-full animate-ping" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-pink-400/30 rounded-full animate-ping" style={{ animationDelay: '1.2s' }} />
        
        {/* Multi-layer gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-950/4 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-teal-950/4 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-950/3 to-transparent" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
      </div>
      
      {/* Header */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <div className="space-y-4">
              <h1 className="text-5xl font-light tracking-wide text-white">
                CUSTOMIZE
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-purple-500 to-teal-400 mx-auto" />
              <p className="text-sm text-zinc-400 tracking-widest uppercase font-medium">
                Design Your Experience
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Customization Options */}
            <div className="space-y-8">
              
              {/* Theme Selection */}
              <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8">
                <h2 className="text-2xl font-light mb-6">Choose Your Theme</h2>
                <div className="grid grid-cols-2 gap-4">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setPreferences(prev => ({ ...prev, theme: theme.id }))}
                      className={`p-4 rounded-2xl border transition-all duration-300 text-left ${
                        preferences.theme === theme.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <div className="font-medium">{theme.name}</div>
                      <div className="text-sm text-zinc-400 mt-1">{theme.preview}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Selection */}
              <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8">
                <h2 className="text-2xl font-light mb-6">Select Your Font</h2>
                <div className="space-y-3">
                  {FONTS.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setPreferences(prev => ({ ...prev, font: font.id }))}
                      className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left ${
                        preferences.font === font.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      } ${font.class}`}
                    >
                      <div className="font-medium">{font.name}</div>
                      <div className="text-sm text-zinc-400 mt-1">{font.preview}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Button Style */}
              <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8">
                <h2 className="text-2xl font-light mb-6">Button Style</h2>
                <div className="grid grid-cols-2 gap-4">
                  {BUTTON_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setPreferences(prev => ({ ...prev, buttonStyle: style.id }))}
                      className={`p-4 rounded-2xl border transition-all duration-300 ${
                        preferences.buttonStyle === style.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <div className={`bg-white text-black px-4 py-2 text-sm font-medium ${style.class} mb-2`}>
                        Preview
                      </div>
                      <div className="text-sm font-medium">{style.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Scheme */}
              <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8">
                <h2 className="text-2xl font-light mb-6">Color Scheme</h2>
                <div className="space-y-3">
                  {COLOR_SCHEMES.map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() => setPreferences(prev => ({ ...prev, colorScheme: scheme.id }))}
                      className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left ${
                        preferences.colorScheme === scheme.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{scheme.name}</div>
                        </div>
                        <div className={`w-16 h-4 rounded-full bg-gradient-to-r ${scheme.colors.join(' ')}`}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Profile Picture */}
              <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8">
                <h2 className="text-2xl font-light mb-6">Choose Profile Picture</h2>
                <div className="grid grid-cols-3 gap-4">
                  {PROFILE_IMAGES.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => setPreferences(prev => ({ ...prev, profileImage: img.id }))}
                      className={`aspect-square rounded-full border transition-all duration-300 flex items-center justify-center text-2xl ${
                        preferences.profileImage === img.id
                          ? 'border-purple-500 bg-purple-500/10 scale-110'
                          : 'border-zinc-700 hover:border-zinc-600 hover:scale-105'
                      }`}
                    >
                      {img.emoji}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-zinc-400 mt-4 text-center">
                  Selected: {PROFILE_IMAGES.find(img => img.id === preferences.profileImage)?.name}
                </p>
              </div>

              {/* Social Handle */}
              <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8">
                <h2 className="text-2xl font-light mb-6">Social Handle (Optional)</h2>
                <div className="flex">
                  <span className="inline-flex items-center px-4 py-3 rounded-l-2xl bg-zinc-800/50 border border-r-0 border-zinc-700/50 text-zinc-400 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    value={preferences.socialHandle}
                    onChange={(e) => setPreferences(prev => ({ ...prev, socialHandle: e.target.value }))}
                    placeholder="yourusername"
                    className="flex-1 px-4 py-3 rounded-r-2xl bg-zinc-900/50 border border-zinc-700/50 text-white 
                               placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 
                               transition-all duration-300"
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-2">Your social media handle (Instagram, Twitter, etc.)</p>
              </div>

              {/* Button Layout */}
              <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8">
                <h2 className="text-2xl font-light mb-6">Button Layout</h2>
                <div className="space-y-4">
                  {BUTTON_LAYOUTS.map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => setPreferences(prev => ({ ...prev, buttonLayout: layout.id }))}
                      className={`w-full p-6 rounded-2xl border transition-all duration-300 text-left ${
                        preferences.buttonLayout === layout.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium flex items-center gap-3">
                            <span className="text-2xl">{layout.icon}</span>
                            {layout.name}
                          </div>
                          <div className="text-sm text-zinc-400 mt-1">{layout.preview}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Sections */}
              <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8">
                <h2 className="text-2xl font-light mb-6">Additional Sections</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="font-medium">Image Gallery</div>
                      <div className="text-sm text-zinc-400">Showcase your photos</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.sections.imageBox}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        sections: { ...prev.sections, imageBox: e.target.checked }
                      }))}
                      className="w-5 h-5 text-purple-500 bg-zinc-800 border-zinc-600 rounded focus:ring-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="font-medium">Booking Form</div>
                      <div className="text-sm text-zinc-400">Let people book appointments</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.sections.bookingForm}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        sections: { ...prev.sections, bookingForm: e.target.checked }
                      }))}
                      className="w-5 h-5 text-purple-500 bg-zinc-800 border-zinc-600 rounded focus:ring-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="font-medium">Shop Section</div>
                      <div className="text-sm text-zinc-400">Sell products or services</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.sections.shop}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        sections: { ...prev.sections, shop: e.target.checked }
                      }))}
                      className="w-5 h-5 text-purple-500 bg-zinc-800 border-zinc-600 rounded focus:ring-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="font-medium">Custom Text Block</div>
                      <div className="text-sm text-zinc-400">Add custom content area</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.sections.customText}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        sections: { ...prev.sections, customText: e.target.checked }
                      }))}
                      className="w-5 h-5 text-purple-500 bg-zinc-800 border-zinc-600 rounded focus:ring-purple-500"
                    />
                  </label>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-4 px-6 rounded-2xl bg-white text-black font-medium 
                           hover:bg-zinc-100 transition-all duration-300
                           transform hover:scale-[1.02] active:scale-[0.98]
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {saving ? 'Saving Your Style...' : 'Save & View My Page'}
              </button>
            </div>

            {/* Live Preview */}
            <div className="space-y-6">
              <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8">
                <h2 className="text-2xl font-light mb-6">Live Preview</h2>
                
                {/* Preview Container */}
                <div className="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
                  <div className="text-center space-y-6">
                    
                    {/* Profile Preview */}
                    <div className="space-y-4">
                      {/* Profile Picture Circle */}
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-teal-400/20 flex items-center justify-center border-2 border-purple-500/30">
                        <span className="text-3xl">
                          {PROFILE_IMAGES.find(img => img.id === preferences.profileImage)?.emoji || '✨'}
                        </span>
                      </div>
                      
                      <div className={FONTS.find(f => f.id === preferences.font)?.class || ''}>
                        <h3 className="text-xl font-light">{creator?.display_name || creator?.handle}</h3>
                        {preferences.socialHandle && (
                          <p className="text-purple-400 text-sm">@{preferences.socialHandle}</p>
                        )}
                        <p className="text-zinc-500 text-xs mt-1">@{creator?.handle}</p>
                      </div>
                      
                      <div className={`w-12 h-px mx-auto bg-gradient-to-r ${
                        COLOR_SCHEMES.find(c => c.id === preferences.colorScheme)?.colors.join(' ') || 'from-purple-500 to-teal-400'
                      }`}></div>
                      
                      {creator?.bio && (
                        <p className={`text-zinc-300 text-sm max-w-xs mx-auto ${FONTS.find(f => f.id === preferences.font)?.class || ''}`}>
                          {creator.bio}
                        </p>
                      )}
                    </div>
                    
                    {/* Button Preview */}
                    {preferences.buttonLayout === 'stacked' ? (
                      <div className="space-y-2 w-full max-w-xs mx-auto">
                        <div className={`w-full py-3 px-4 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 text-white text-sm font-medium flex items-center justify-between ${
                          BUTTON_STYLES.find(b => b.id === preferences.buttonStyle)?.class || 'rounded-xl'
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">📸</span>
                            <span>Instagram</span>
                          </div>
                          <span className="text-zinc-400 text-xs">→</span>
                        </div>
                        
                        <div className={`w-full py-3 px-4 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 text-white text-sm font-medium flex items-center justify-between ${
                          BUTTON_STYLES.find(b => b.id === preferences.buttonStyle)?.class || 'rounded-xl'
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">🛍️</span>
                            <span>Shop</span>
                          </div>
                          <span className="text-zinc-400 text-xs">→</span>
                        </div>
                        
                        <div className={`w-full py-3 px-4 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 text-white text-sm font-medium flex items-center justify-between ${
                          BUTTON_STYLES.find(b => b.id === preferences.buttonStyle)?.class || 'rounded-xl'
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">📧</span>
                            <span>Contact</span>
                          </div>
                          <span className="text-zinc-400 text-xs">→</span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                        <div className={`aspect-square bg-white text-black flex items-center justify-center text-xl ${
                          BUTTON_STYLES.find(b => b.id === preferences.buttonStyle)?.class || 'rounded-xl'
                        }`}>
                          🔗
                        </div>
                        <div className={`aspect-square bg-white text-black flex items-center justify-center text-xl ${
                          BUTTON_STYLES.find(b => b.id === preferences.buttonStyle)?.class || 'rounded-xl'
                        }`}>
                          📧
                        </div>
                        <div className={`aspect-square bg-white text-black flex items-center justify-center text-xl ${
                          BUTTON_STYLES.find(b => b.id === preferences.buttonStyle)?.class || 'rounded-xl'
                        }`}>
                          🛍️
                        </div>
                        <div className={`aspect-square bg-white text-black flex items-center justify-center text-xl ${
                          BUTTON_STYLES.find(b => b.id === preferences.buttonStyle)?.class || 'rounded-xl'
                        }`}>
                          📱
                        </div>
                        <div className={`aspect-square bg-white text-black flex items-center justify-center text-xl ${
                          BUTTON_STYLES.find(b => b.id === preferences.buttonStyle)?.class || 'rounded-xl'
                        }`}>
                          🎵
                        </div>
                        <div className={`aspect-square bg-white text-black flex items-center justify-center text-xl ${
                          BUTTON_STYLES.find(b => b.id === preferences.buttonStyle)?.class || 'rounded-xl'
                        }`}>
                          💼
                        </div>
                      </div>
                    )}
                    
                    {/* Additional Sections Preview */}
                    {(preferences.sections.imageBox || preferences.sections.bookingForm || preferences.sections.shop || preferences.sections.customText) && (
                      <div className="space-y-3 pt-4 border-t border-zinc-800">
                        {preferences.sections.imageBox && (
                          <div className="bg-zinc-800/50 rounded-xl p-4">
                            <p className="text-xs text-zinc-400">📸 Image Gallery</p>
                          </div>
                        )}
                        {preferences.sections.bookingForm && (
                          <div className="bg-zinc-800/50 rounded-xl p-4">
                            <p className="text-xs text-zinc-400">📅 Booking Form</p>
                          </div>
                        )}
                        {preferences.sections.shop && (
                          <div className="bg-zinc-800/50 rounded-xl p-4">
                            <p className="text-xs text-zinc-400">🛒 Shop Section</p>
                          </div>
                        )}
                        {preferences.sections.customText && (
                          <div className="bg-zinc-800/50 rounded-xl p-4">
                            <p className="text-xs text-zinc-400">📝 Custom Text</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <p className="text-xs text-zinc-500 mt-6">Live preview of your page</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}