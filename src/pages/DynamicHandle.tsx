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
  const { theme, colors, buttonStyle, buttonLayout, icon, handle } = settings;
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

  const getButtonClass = useMemo(() => {
    const base = "w-full text-sm font-medium transition-all duration-200";
    
    // Shape classes
    const shapeClass = () => {
      switch (buttonLayout) {
        case "square": return "rounded-none";
        case "circle": return "rounded-full";
        case "rounded-square": return "rounded-lg";
        default: return "rounded-md";
      }
    };

    // Style classes
    const styleClass = () => {
      switch (buttonStyle) {
        case "glass":
          return "backdrop-blur-sm bg-white/20 border border-white/30 hover:bg-white/30 hover:shadow-lg";
        case "chrome":
          return "bg-gradient-to-b from-gray-300 to-gray-500 text-gray-900 shadow-lg hover:from-gray-200 hover:to-gray-400";
        case "neon":
          return "bg-black/80 border-2 border-primary text-primary shadow-[0_0_10px] shadow-primary/50 hover:shadow-[0_0_20px] hover:shadow-primary/80";
        case "minimal":
          return "bg-transparent border-b-2 border-current rounded-none hover:bg-white/10";
        case "vintage":
          return "bg-amber-100 border-2 border-amber-800 text-amber-900 shadow-inner hover:bg-amber-200";
        case "cyberpunk":
          return "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg hover:from-purple-400 hover:to-cyan-400";
        case "nature":
          return "bg-gradient-to-b from-green-400 to-green-600 text-white shadow-md hover:from-green-300 hover:to-green-500";
        case "kawaii":
          return "bg-gradient-to-b from-pink-300 to-purple-400 text-white shadow-md hover:from-pink-200 hover:to-purple-300";
        case "grunge":
          return "bg-gray-800 border-2 border-gray-600 text-gray-100 shadow-lg hover:bg-gray-700";
        case "luxury":
          return "bg-gradient-to-b from-yellow-400 to-yellow-600 text-yellow-900 shadow-lg hover:from-yellow-300 hover:to-yellow-500";
        default:
          return "bg-primary text-primary-foreground hover:bg-primary/90";
      }
    };

    return cn(base, shapeClass(), styleClass());
  }, [buttonStyle, buttonLayout]);

  const accent = settings.palette?.accent || `hsl(${colors[0] * 2}, 90%, 60%)`;
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
            <div className="space-y-2">
              {(settings.links?.length ? settings.links : [{ label: "Sample Link", url: "#" }]).map((l, i) => (
                <a key={`${l.label}-${i}`} href={l.url} target="_blank" rel="noreferrer">
                  <div className={getButtonClass}>
                    {l.icon && <span className="mr-2">{l.icon}</span>}
                    {l.label}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
