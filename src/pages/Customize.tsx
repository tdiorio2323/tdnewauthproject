import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { savePageSettings } from "@/lib/pageSettings";
import { ArrowLeft } from "lucide-react";
import luxuryBg from "@/assets/luxury-background.png";

// Import new components
import { BackgroundSelector } from "@/components/customize/BackgroundSelector";
import { ProfileImageSelector } from "@/components/customize/ProfileImageSelector";
import { TitleSelector } from "@/components/customize/TitleSelector";
import { FontSelector } from "@/components/customize/FontSelector";
import { ButtonCustomizer } from "@/components/customize/ButtonCustomizer";
import { LinksEditor } from "@/components/customize/LinksEditor";
import { FeaturesSelector } from "@/components/customize/FeaturesSelector";
import { Section } from "@/components/customize/Section";

type Theme =
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
type ButtonStyle =
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

type ButtonLayout = "rounded" | "square" | "circle" | "rounded-square";
type ProfileShape = "circle" | "rounded" | "diamond";

interface FeaturesConfig {
  tipJar: boolean;
  tipAmount: string;
  monthlySubscription: boolean;
  subscriptionPrice: string;
  subscriptionTitle: string;
}

const fonts = [
  "Inter",
  "Playfair Display",
  "Space Mono",
  "Poppins", 
  "Montserrat",
  "Roboto",
  "Lato",
  "Oswald",
  "Raleway",
  "Dancing Script",
  "Permanent Marker",
  "Comic Neue",
] as const;

export default function Customize() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>("glass");
  const [font, setFont] = useState<(typeof fonts)[number]>("Inter");
  const [fontWeight, setFontWeight] = useState<number>(500);
  const [colors, setColors] = useState<number[]>([58, 46, 32, 10]);
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>("glass");
  const [buttonLayout, setButtonLayout] = useState<ButtonLayout>("rounded");
  const [profileShape, setProfileShape] = useState<ProfileShape>("circle");
  const [icon, setIcon] = useState<string>("✨");
  const [palettePreset, setPalettePreset] = useState<string>("tropical");
  const [accent, setAccent] = useState<string>("#7c3aed");
  const [autoAdjust, setAutoAdjust] = useState<boolean>(true);
  const [links, setLinks] = useState<{ label: string; url: string; icon?: string }[]>([
    { label: "Instagram", url: "https://instagram.com/", icon: "📷" },
    { label: "Shop", url: "https://example.com/", icon: "🛍️" },
    { label: "Contact", url: "mailto:hello@example.com", icon: "✉️" },
  ]);
  const [handle, setHandle] = useState<string>("");
  
  // New states for title/subtitle
  const [title, setTitle] = useState<string>("Your Name");
  const [subtitle, setSubtitle] = useState<string>("Your tagline");
  const [showTitle, setShowTitle] = useState<boolean>(true);
  const [showSubtitle, setShowSubtitle] = useState<boolean>(true);
  
  // Features state
  const [features, setFeatures] = useState<FeaturesConfig>({
    tipJar: false,
    tipAmount: "$5",
    monthlySubscription: false,
    subscriptionPrice: "$9.99",
    subscriptionTitle: "VIP Access",
  });

  const palette = useMemo(() => {
    // Interpret slider values as hues and derive a Tailwind-safe style object
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
      case "dark":
        return "bg-slate-900 text-white";
      case "pastel":
        return "bg-gradient-to-b from-pink-50 to-blue-50";
      case "vintage":
        return "bg-[#f8f1e7]";
      case "sci_fi":
        return "bg-gradient-to-b from-slate-900 to-indigo-900 text-white";
      case "nature":
        return "bg-gradient-to-b from-emerald-50 to-teal-50";
      case "luxury_gold":
        return "bg-gradient-to-b from-amber-50 to-yellow-50";
      case "grunge":
        return "bg-neutral-900 text-neutral-100";
      case "kawaii":
        return "bg-gradient-to-b from-pink-50 to-purple-50";
      case "mystic":
        return "bg-gradient-to-b from-indigo-50 to-purple-50";
      case "noir":
        return "bg-black text-white";
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

  async function saveAndView() {
    if (!handle.trim()) return;
    await savePageSettings({
      handle: handle.replace(/^@/, ""),
      theme,
      font,
      fontWeight,
      colors,
      buttonStyle,
      buttonLayout,
      profileShape,
      icon,
      links,
      title,
      subtitle,
      showTitle,
      showSubtitle,
      features,
      palette: { preset: palettePreset, accent, autoAdjust },
    });
    navigate(`/${handle.replace(/^@/, "")}`);
  }

  return (
    <main 
      className="min-h-dvh text-white antialiased relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${luxuryBg})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Luxe holographic overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(180,140,255,0.15),transparent_60%),radial-gradient(60%_40%_at_80%_100%,rgba(245,207,122,0.15),transparent_60%),radial-gradient(40%_30%_at_20%_80%,rgba(135,230,255,0.12),transparent_50%)]" />
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10">
        <div className="mb-2">
          <Button variant="ghost" onClick={() => navigate("/")}
            className="-ml-2 text-white/70 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <h1 className="text-center text-2xl tracking-[0.35em] text-white">
          CUSTOMIZE
        </h1>
        <p className="mt-1 text-center text-xs text-white/70">
          Design your experience • Live preview
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[1fr_380px]">
          {/* Left controls - organized in order */}
          <div className="space-y-6">
            {/* 1. Background */}
            <BackgroundSelector theme={theme} setTheme={setTheme} />

            {/* 2. Profile Image */}
            <ProfileImageSelector 
              icon={icon} 
              setIcon={setIcon}
              profileShape={profileShape}
              setProfileShape={setProfileShape}
            />

            {/* 3. Title & Subtitle */}
            <TitleSelector
              title={title}
              setTitle={setTitle}
              subtitle={subtitle}
              setSubtitle={setSubtitle}
              showTitle={showTitle}
              setShowTitle={setShowTitle}
              showSubtitle={showSubtitle}
              setShowSubtitle={setShowSubtitle}
            />

            {/* 4. Font */}
            <FontSelector
              font={font}
              setFont={setFont}
              fontWeight={fontWeight}
              setFontWeight={setFontWeight}
            />

            {/* 5. Buttons */}
            <ButtonCustomizer
              buttonStyle={buttonStyle}
              setButtonStyle={setButtonStyle}
              buttonLayout={buttonLayout}
              setButtonLayout={setButtonLayout}
            />

            {/* 6. Colors */}
            <Section title="Color Scheme">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "mono", label: "Monochrome", accent: "#111827" },
                    { id: "tropical", label: "Vibrant Tropical", accent: "#10b981" },
                    { id: "sunset", label: "Sunset", accent: "#f97316" },
                    { id: "violet", label: "Violet", accent: "#7c3aed" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      className={cn(
                        "rounded-full backdrop-blur-sm bg-white/20 border border-white/30 px-3 py-1 text-xs text-white transition-all",
                        "hover:bg-white/30",
                        palettePreset === p.id && "border-primary/60 ring-2 ring-primary/40 bg-white/30"
                      )}
                      onClick={() => {
                        setPalettePreset(p.id);
                        setAccent(p.accent);
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-xs text-white/80 mb-2 block">Accent Color</label>
                  <input 
                    type="color" 
                    value={accent} 
                    onChange={(e) => setAccent(e.target.value)} 
                    className="h-10 w-full rounded border border-white/30" 
                  />
                </div>
              </div>
            </Section>

            {/* 7. Links */}
            <LinksEditor links={links} setLinks={setLinks} />

            {/* 8. Features */}
            <FeaturesSelector features={features} setFeatures={setFeatures} />

            {/* 9. Handle */}
            <Section title="Your Handle">
              <div className="space-y-2">
                <Input
                  placeholder="@yourusername"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="bg-white border-white/30 text-black placeholder:text-black/60"
                />
                <p className="text-xs text-white/60">
                  Your unique link will be: lovable.app/{handle.replace(/^@/, "")}
                </p>
              </div>
            </Section>
          </div>

          {/* Live preview */}
          <div className="sticky top-6 self-start">
            <Section title="Live Preview">
              <Card
                className={cn(
                  "mx-auto w-full max-w-xs rounded-2xl border backdrop-blur-sm bg-white/10 border-white/20 p-6 text-center",
                  themeClass
                )}
              >
                {/* Profile picture with shape */}
                <div className={cn(
                  "mx-auto mb-4 flex h-14 w-14 items-center justify-center border bg-white text-xl",
                  profileShape === "circle" && "rounded-full",
                  profileShape === "rounded" && "rounded-lg", 
                  profileShape === "diamond" && "rotate-45 rounded-lg"
                )}>
                  <span className={profileShape === "diamond" ? "-rotate-45" : ""}>
                    {icon}
                  </span>
                </div>

                {/* Title and subtitle */}
                {showTitle && (
                  <div 
                    className="text-sm font-medium text-white" 
                    style={{ fontFamily: font, fontWeight }}
                  >
                    {title || handle || "Your Name"}
                  </div>
                )}
                
                {showSubtitle && (
                  <div className="mb-4 text-xs text-white/70">
                    {subtitle}
                  </div>
                )}

                {/* Links */}
                <div className="space-y-2 mb-4">
                  {(links.length ? links : [{ label: "Sample Link", url: "#", icon: "🔗" }]).map((l, idx) => (
                    <div key={idx} className={getButtonClass}>
                      {l.icon && <span className="mr-2">{l.icon}</span>}
                      {l.label}
                    </div>
                  ))}
                </div>

                {/* Features preview */}
                {features.tipJar && (
                  <div className={cn(getButtonClass, "mb-2")}>
                    💰 Tip {features.tipAmount}
                  </div>
                )}
                
                {features.monthlySubscription && (
                  <div className={cn(getButtonClass, "mb-4")}>
                    ⭐ {features.subscriptionTitle} - {features.subscriptionPrice}/mo
                  </div>
                )}

                <Button
                  className="mt-6 w-full backdrop-blur-sm bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!handle.trim()}
                  onClick={saveAndView}
                >
                  Save & View My Page
                </Button>
                <p className="mt-2 text-[10px] text-white/60">
                  Live preview • Updates as you customize
                </p>
              </Card>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}

