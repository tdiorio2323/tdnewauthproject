import { supabase, SUPABASE_ENABLED } from "@/integrations/supabase/client";

export type Theme = "minimal" | "holographic" | "cyberpunk" | "glass";
export type ButtonStyle = "rounded" | "sharp" | "pill" | "glow";
export type ButtonLayout = "stacked" | "grid";

export interface PageSettings {
  handle: string; // without leading @
  theme: Theme;
  font: string;
  colors: number[]; // [h1,h2,h3,h4]
  buttonStyle: ButtonStyle;
  layout: ButtonLayout;
  icon: string;
}

function normalizeHandle(h: string) {
  return h.replace(/^@/, "").trim().toLowerCase();
}

export async function savePageSettings(settings: PageSettings): Promise<{ ok: boolean; error?: string }> {
  const handle = normalizeHandle(settings.handle);
  const payload = { ...settings, handle };

  try {
    if (SUPABASE_ENABLED) {
      // Table "pages" with columns: handle (text PK/unique), settings (jsonb), updated_at (timestamptz)
      const { error } = await (supabase as any)
        .from("pages")
        .upsert({ handle, settings: payload, updated_at: new Date().toISOString() }, { onConflict: "handle" });
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

