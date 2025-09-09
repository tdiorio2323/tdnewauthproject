import { useTheme, THEMES, FONTS, COLOR_SCHEMES, ThemeType, FontType, ButtonStyleType, ButtonLayoutType, ColorSchemeType } from '@/contexts/ThemeContext';

export default function StylePanel() {
  const { preferences, updatePreferences } = useTheme();
  const colorScheme = COLOR_SCHEMES.find(c => c.id === preferences.colorScheme);

  return (
    <div className="space-y-6">
      <div className="border rounded-3xl p-6">
        <h3 className="text-lg font-light mb-4">Theme</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries({ minimal: 'Minimal', gradient: 'Holographic', neon: 'Neon', glass: 'Glass' }).map(([id, name]) => (
            <button
              key={id}
              onClick={() => updatePreferences({ theme: id as ThemeType })}
              className={`p-4 rounded-2xl border text-left ${preferences.theme === id ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 hover:border-white/30'}`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="border rounded-3xl p-6">
        <h3 className="text-lg font-light mb-4">Font</h3>
        <div className="space-y-2">
          {FONTS.map((f) => (
            <button
              key={f.id}
              onClick={() => updatePreferences({ font: f.id as FontType })}
              className={`w-full p-3 rounded-xl border text-left ${preferences.font === f.id ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 hover:border-white/30'} ${f.class}`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      <div className="border rounded-3xl p-6">
        <h3 className="text-lg font-light mb-4">Color Scheme</h3>
        <div className="space-y-2">
          {COLOR_SCHEMES.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => updatePreferences({ colorScheme: scheme.id as ColorSchemeType })}
              className={`w-full p-3 rounded-xl border text-left ${preferences.colorScheme === scheme.id ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 hover:border-white/30'}`}
            >
              <div className="flex items-center justify-between">
                <span>{scheme.id}</span>
                <span className={`w-16 h-4 rounded-full bg-gradient-to-r ${scheme.colors.join(' ')}`}></span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-3xl p-6">
          <h3 className="text-lg font-light mb-4">Button Style</h3>
          {['rounded','sharp','pill','glow'].map((id) => (
            <button key={id} onClick={() => updatePreferences({ buttonStyle: id as ButtonStyleType })}
              className={`w-full mb-2 p-3 rounded-xl border ${preferences.buttonStyle === id ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 hover:border-white/30'}`}
            >{id}</button>
          ))}
        </div>
        <div className="border rounded-3xl p-6">
          <h3 className="text-lg font-light mb-4">Layout</h3>
          {['stacked','grid3x3'].map((id) => (
            <button key={id} onClick={() => updatePreferences({ buttonLayout: id as ButtonLayoutType })}
              className={`w-full mb-2 p-3 rounded-xl border ${preferences.buttonLayout === id ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 hover:border-white/30'}`}
            >{id}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

