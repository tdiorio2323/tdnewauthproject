import { useTheme, FONTS, COLOR_SCHEMES } from '@/contexts/ThemeContext';
import type { LinkItem } from '@/types';

interface Props {
  handle: string;
  links: LinkItem[];
}

export default function LinkPagePreview({ handle, links }: Props) {
  const { preferences } = useTheme();
  const font = FONTS.find(f => f.id === preferences.font) || FONTS[0];
  const scheme = COLOR_SCHEMES.find(c => c.id === preferences.colorScheme) || COLOR_SCHEMES[0];

  return (
    <div className="border rounded-3xl p-6">
      <div className={`text-center ${font.class}`}>
        <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${scheme.colors.join(' ')} mb-3`} />
        <div className="text-xl font-medium mb-1">{handle || 'your-handle'}</div>
        {preferences.sections.customText && (
          <div className="text-xs text-muted-foreground mb-4">{preferences.sections.customTextContent || 'Your message here'}</div>
        )}
        <div className="space-y-3 max-w-xs mx-auto">
          {links.length ? links.map((l, i) => (
            <div key={i} className="py-3 px-4 rounded-xl border border-white/20 bg-white/10">{l.label || 'Link'}</div>
          )) : (
            ['Instagram','YouTube','Shop'].map((l) => (
              <div key={l} className="py-3 px-4 rounded-xl border border-white/20 bg-white/10">{l}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

