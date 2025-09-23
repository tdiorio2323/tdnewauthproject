import { supabase } from "@/integrations/supabase";
import type { Json } from "@/integrations/supabase/types";

export type Theme =
  | "minimal"
  | "holographic"
  | "cyberpunk"
  | "glass"
  | "dark"
  | "pastel"
  | "vintage"
  | "sci_fi"
  | "nature"
  | "luxury_gold"
  | "grunge"
  | "kawaii"
  | "mystic"
  | "noir";
export type ButtonStyle =
  | "glass"
  | "chrome" 
  | "neon"
  | "minimal"
  | "vintage"
  | "cyberpunk"
  | "nature"
  | "kawaii"
  | "grunge"
  | "luxury";

export type ButtonLayout = "rounded" | "square" | "circle" | "rounded-square";
export type ProfileShape = "circle" | "rounded" | "diamond";

export interface PageSettings {
  handle: string; // without leading @
  theme: Theme;
  font: string;
  fontWeight?: number; // variable font axis (wght)
  colors: number[]; // [h1,h2,h3,h4]
  buttonStyle: ButtonStyle;
  buttonLayout: ButtonLayout;
  profileShape?: ProfileShape;
  icon: string;
  links?: { label: string; url: string; icon?: string }[];
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  showSubtitle?: boolean;
  features?: {
    tipJar: boolean;
    tipAmount: string;
    monthlySubscription: boolean;
    subscriptionPrice: string;
    subscriptionTitle: string;
  };
  palette?: { preset?: string; accent?: string; autoAdjust?: boolean };
}

function normalizeHandle(h: string) {
  return h.replace(/^@/, "").trim().toLowerCase();
}

export async function savePageSettings(settings: PageSettings): Promise<{ ok: boolean; error?: string }> {
  const handle = normalizeHandle(settings.handle);
  const payload = { ...settings, handle };

  try {
    const auth = await supabase.auth.getUser();
    const userId = auth?.data?.user?.id;
    
    if (!userId) {
      // Fallback to localStorage if not authenticated
      localStorage.setItem(`page:${handle}`, JSON.stringify(payload));
      return { ok: true };
    }

    // Update the pages table with new structure
    const { error } = await supabase
      .from('pages')
      .upsert(
        { 
          handle, 
          user_id: userId, 
          title: payload.title,
          bio: payload.subtitle,
          theme: { preset: 'minimal', accent: '#8B5CF6' },
          blocks: payload.links?.map((link, index) => ({
            id: `link_${index}`,
            type: 'url',
            label: link.label,
            href: link.url,
            icon: link.icon,
            enabled: true
          })) || []
        },
        { onConflict: 'handle' }
      );
    
    if (error) throw error;
    return { ok: true };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("Failed to save page settings", e);
    return { ok: false, error: message };
  }
}

export async function loadPageSettings(handleRaw: string): Promise<PageSettings | null> {
  const handle = normalizeHandle(handleRaw);
  try {
    // Use the safe public view to avoid exposing password hashes
    const { data, error } = await supabase
      .from('pages_public')
      .select('title, bio, theme, blocks')
      .eq('handle', handle)
      .maybeSingle();
    
    if (error) throw error;
    
    if (!data) {
      // Fallback to localStorage
      const raw = localStorage.getItem(`page:${handle}`);
      return raw ? (JSON.parse(raw) as PageSettings) : null;
    }

    // Convert new structure back to old PageSettings format for compatibility
    const blocks = data.blocks as any[] || [];
    return {
      handle,
      theme: 'minimal',
      font: 'Inter',
      colors: [210, 280, 150, 80],
      buttonStyle: 'glass',
      buttonLayout: 'rounded',
      icon: '/lovable-uploads/d5a7b980-44ec-49f6-bee8-c6858ca93ae5.png',
      title: data.title || '',
      subtitle: data.bio || '',
      showTitle: true,
      showSubtitle: true,
      links: blocks.filter((block: any) => block.type === 'url').map((block: any) => ({
        label: block.label,
        url: block.href,
        icon: block.icon
      })) || []
    };
  } catch (e) {
    console.error("Failed to load page settings", e);
    return null;
  }
}

// Lightweight font loader for Google Fonts
const googleFontMap: Record<string, string> = {
  Inter: "Inter:wght@400;500;600;700",
  Poppins: "Poppins:wght@400;500;600;700",
  "Space Mono": "Space+Mono",
  Playfair: "Playfair+Display:wght@400;600;700",
  "Playfair Display": "Playfair+Display:wght@400;600;700",
  Montserrat: "Montserrat:wght@300;400;500;600;700",
  Roboto: "Roboto:wght@300;400;500;700",
  Lato: "Lato:wght@300;400;700",
  Oswald: "Oswald:wght@300;400;500;600;700",
  Raleway: "Raleway:wght@300;400;500;700",
  "Dancing Script": "Dancing+Script:wght@400;600;700",
  "Permanent Marker": "Permanent+Marker",
  "Comic Neue": "Comic+Neue:wght@300;400;700",
};

export function loadGoogleFont(fontName: string) {
  const family = googleFontMap[fontName] || googleFontMap["Inter"];
  const href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
  const id = `gf-${family.toLowerCase()}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}