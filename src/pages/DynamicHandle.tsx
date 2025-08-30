import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Cabana from "./Cabana";
import { loadPageSettings, PageSettings, loadGoogleFont } from "@/lib/pageSettings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DynamicHandle() {
  const { handle = "" } = useParams();
  const [settings, setSettings] = useState<PageSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    loadPageSettings(handle)
      .then((s) => {
        if (mounted) setSettings(s);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [handle]);

  if (loading) return null;
  if (!settings) return <Cabana key={handle} />;

  return <RenderedPage settings={settings} />;
}

function RenderedPage({ settings }: { settings: PageSettings }) {
  const { theme, colors, buttonStyle, layout, icon, handle } = settings;
  // load font
  useEffect(() => {
    loadGoogleFont(settings.font);
  }, [settings.font]);

  const palette = useMemo(() => {
    const [h1, h2, h3, h4] = colors;
    return {
      primary: `hsl(${h1 * 2}, 90%, 60%)`,
      secondary: `hsl(${h2 * 2}, 90%, 66%)`,
      accent: `hsl(${h3 * 2}, 90%, 70%)`,
      muted: `hsl(${h4 * 2}, 30%, 92%)`,
    } as const;
  }, [colors]);

  const themeClass = useMemo(() => {
    switch (theme) {
      case "holographic":
        return "bg-gradient-to-b from-violet-100/60 to-cyan-100/40";
      case "cyberpunk":
        return "bg-[#0b0b12] text-white";
      case "glass":
        return "bg-slate-50/60 backdrop-blur-sm";
      default:
        return "bg-white";
    }
  }, [theme]);

  const buttonClass = useMemo(() => {
    const base = "w-full text-sm font-medium";
    const rounded = "rounded-md";
    switch (buttonStyle) {
      case "sharp":
        return cn(base, "rounded-none");
      case "pill":
        return cn(base, "rounded-full");
      case "glow":
        return cn(
          base,
          rounded,
          "shadow-[0_0_0] hover:shadow-[0_0_20px] transition-shadow"
        );
      default:
        return cn(base, rounded);
    }
  }, [buttonStyle]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mx-auto max-w-md">
          <div className={cn("rounded-2xl border p-6 text-center", themeClass)}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border bg-white text-xl">
              {icon}
            </div>
            <div className="text-sm text-slate-500">{handle}</div>
            <div className="mb-4 text-xs text-slate-400">@{handle}</div>
            {layout === "stacked" ? (
              <div className="space-y-2">
                {(settings.links?.length ? settings.links : [{ label: "Link", url: "#" }]).map((l, i) => (
                  <a key={`${l.label}-${i}`} href={l.url} target="_blank" rel="noreferrer">
                    <Button
                      className={cn(buttonClass)}
                      style={{ backgroundColor: palette.primary, color: "white" }}
                    >
                      {l.label}
                    </Button>
                  </a>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {(settings.links || []).slice(0, 9).map((l, i) => (
                  <a
                    key={`${l.label}-${i}`}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonClass,
                      "aspect-square rounded-lg bg-white text-xl flex items-center justify-center"
                    )}
                    style={{ borderColor: palette.primary }}
                  >
                    {l.icon || l.label[0]}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
