import { supabase, SUPABASE_ENABLED } from "@/integrations/supabase/client";

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
  | "rounded"
  | "sharp"
  | "pill"
  | "glow"
  | "outline"
  | "gradient"
  | "hover_animated"
  | "shadowed"
  | "minimal"
  | "icon";
export type ButtonLayout = "stacked" | "grid" | "row" | "carousel";

export interface PageSettings {
  handle: string; // without leading @
  theme: Theme;
  font: string;
  fontWeight?: number; // variable font axis (wght)
  colors: number[]; // [h1,h2,h3,h4]
  buttonStyle: ButtonStyle;
  layout: ButtonLayout;
  icon: string;
  links?: { label: string; url: string; icon?: string }[];
  palette?: { preset?: string; accent?: string; autoAdjust?: boolean };
}

function normalizeHandle(h: string) {
  return h.replace(/^@/, "").trim().toLowerCase();
}

export async function savePageSettings(settings: PageSettings): Promise<{ ok: boolean; error?: string }> {
  const handle = normalizeHandle(settings.handle);
  const payload = { ...settings, handle };

  try {
    if (SUPABASE_ENABLED) {
      const auth = await (supabase as any).auth.getUser();
      const userId = auth?.data?.user?.id ?? null;
      // Table "pages": handle (text PK/unique), user_id (uuid), settings (jsonb)
      const { error } = await (supabase as any)
        .from("pages")
        .upsert(
          { handle, user_id: userId, settings: payload, updated_at: new Date().toISOString() },
          { onConflict: "handle" }
        );
      if (error) throw error;
    } else {
      localStorage.setItem(`page:${handle}`, JSON.stringify(payload));
    }
    return { ok: true };
  } catch (e: any) {
    console.error("Failed to save page settings", e);
    return { ok: false, error: String(e?.message || e) };
  }
}

export async function loadPageSettings(handleRaw: string): Promise<PageSettings | null> {
  const handle = normalizeHandle(handleRaw);
  try {
    if (SUPABASE_ENABLED) {
      const { data, error } = await (supabase as any)
        .from("pages")
        .select("settings")
        .eq("handle", handle)
        .maybeSingle();
      if (error) throw error;
      return (data?.settings as PageSettings) || null;
    } else {
      const raw = localStorage.getItem(`page:${handle}`);
      return raw ? (JSON.parse(raw) as PageSettings) : null;
    }
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
  "Comic Sans Alternative": "Comic+Neue:wght@300;400;700",
  Gothic: "UnifrakturCook:wght@700",
  "Brush Script": "Dancing+Script:wght@400;600;700",
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
