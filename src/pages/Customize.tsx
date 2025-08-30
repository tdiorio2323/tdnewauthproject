import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { savePageSettings } from "@/lib/pageSettings";
import { loadGoogleFont } from "@/lib/pageSettings";
import { ArrowLeft } from "lucide-react";

type Theme = "minimal" | "holographic" | "cyberpunk" | "glass";
type ButtonStyle = "rounded" | "sharp" | "pill" | "glow";
type ButtonLayout = "stacked" | "grid";

const fonts = ["Inter", "Playfair", "Space Mono", "Poppins"] as const;

export default function Customize() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>("minimal");
  const [font, setFont] = useState<(typeof fonts)[number]>("Inter");
  const [colors, setColors] = useState<number[]>([58, 46, 32, 10]);
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>("rounded");
  const [layout, setLayout] = useState<ButtonLayout>("stacked");
  const [icon, setIcon] = useState<string>("✨");
  const [links, setLinks] = useState<{ label: string; url: string; icon?: string }[]>([
    { label: "Instagram", url: "https://instagram.com/", icon: "📷" },
    { label: "Shop", url: "https://example.com/", icon: "🛍️" },
    { label: "Contact", url: "mailto:hello@example.com", icon: "✉️" },
  ]);
  const [handle, setHandle] = useState<string>("");

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
      default:
        return "bg-white";
    }
  }, [theme]);

  // Load selected font in preview
  useMemo(() => {
    loadGoogleFont(font);
    return null;
  }, [font]);

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

  async function saveAndView() {
    if (!handle.trim()) return;
    await savePageSettings({
      handle: handle.replace(/^@/, ""),
      theme,
      font,
      colors,
      buttonStyle,
      layout,
      icon,
      links,
    });
    navigate(`/${handle.replace(/^@/, "")}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-2">
          <Button variant="ghost" onClick={() => navigate("/")}
            className="-ml-2 text-slate-600 hover:text-slate-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <h1 className="text-center text-2xl tracking-[0.35em] text-slate-800">
          CUSTOMIZE
        </h1>
        <p className="mt-1 text-center text-xs text-slate-500">
          Design your experience • Live preview
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px]">
          {/* Left controls */}
          <div className="space-y-6">
            {/* Theme */}
            <Section title="Choose Your Theme">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {(
                  [
                    { id: "minimal", label: "Minimal", hint: "Clean & Simple" },
                    {
                      id: "holographic",
                      label: "Holographic",
                      hint: "Colorful Gradients",
                    },
                    { id: "cyberpunk", label: "Cyberpunk", hint: "Neon Glow" },
                    { id: "glass", label: "Glassmorphism", hint: "Frosted Glass" },
                  ] as { id: Theme; label: string; hint: string }[]
                ).map((t) => (
                  <Choice
                    key={t.id}
                    active={theme === t.id}
                    onClick={() => setTheme(t.id)}
                    label={t.label}
                    hint={t.hint}
                  />
                ))}
              </div>
            </Section>

            {/* Font */}
            <Section title="Select Your Font">
              <RadioGroup
                className="grid grid-cols-1 gap-2"
                value={font}
                onValueChange={(v) => setFont(v as any)}
              >
                {fonts.map((f) => (
                  <label
                    key={f}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-lg border bg-white px-3 py-3 text-sm",
                      font === f && "border-primary/60 ring-2 ring-primary/20"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={f} id={`font-${f}`} />
                      <span style={{ fontFamily: f }}>{f}</span>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </Section>

            {/* Color Scheme */}
            <Section title="Color Scheme">
              <div className="space-y-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Label className="text-xs font-medium text-slate-900">Tone {i + 1}</Label>
                    <Slider
                      value={[colors[i]]}
                      onValueChange={(v) =>
                        setColors((c) => {
                          const nc = [...c];
                          nc[i] = v[0] ?? 0;
                          return nc;
                        })
                      }
                      max={180}
                    />
                  </div>
                ))}
              </div>
            </Section>

            {/* Button style & layout */}
            <div className="grid gap-6 md:grid-cols-2">
              <Section title="Button Style">
                <div className="space-y-2">
                  {(
                    [
                      { id: "rounded", label: "Rounded" },
                      { id: "sharp", label: "Sharp" },
                      { id: "pill", label: "Pill" },
                      { id: "glow", label: "Glow" },
                    ] as { id: ButtonStyle; label: string }[]
                  ).map((opt) => (
                    <Choice
                      key={opt.id}
                      active={buttonStyle === opt.id}
                      onClick={() => setButtonStyle(opt.id)}
                      label={opt.label}
                      preview
                    />
                  ))}
                </div>
              </Section>

              <Section title="Button Layout">
                <div className="space-y-2">
                  {(
                    [
                      { id: "stacked", label: "Stacked Buttons" },
                      { id: "grid", label: "3x3 Icon Grid" },
                    ] as { id: ButtonLayout; label: string }[]
                  ).map((opt) => (
                    <Choice
                      key={opt.id}
                      active={layout === opt.id}
                      onClick={() => setLayout(opt.id)}
                      label={opt.label}
                    />
                  ))}
                </div>
              </Section>
            </div>

            {/* Profile picture */}
            <Section title="Choose Profile Picture">
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                {"✨⭐️💎⚡️🌿🔥🎯🚀🌈🍩🪩💜".split("").map((em, idx) => (
                  <button
                    key={`${em}-${idx}`}
                    onClick={() => setIcon(em)}
                    className={cn(
                      "aspect-square rounded-full border bg-white text-xl",
                      icon === em && "border-primary/60 ring-2 ring-primary/20"
                    )}
                  >
                    {em}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">
                Selected: <span className="font-medium">{icon}</span>
              </p>
            </Section>

            {/* Links */}
            <Section title="Links">
              <div className="space-y-3">
                {links.map((lnk, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <Input
                      className="col-span-4"
                      placeholder="Label"
                      value={lnk.label}
                      onChange={(e) =>
                        setLinks((arr) => arr.map((l, i) => (i === idx ? { ...l, label: e.target.value } : l)))
                      }
                    />
                    <Input
                      className="col-span-7"
                      placeholder="https://..."
                      value={lnk.url}
                      onChange={(e) =>
                        setLinks((arr) => arr.map((l, i) => (i === idx ? { ...l, url: e.target.value } : l)))
                      }
                    />
                    <Button
                      variant="ghost"
                      className="col-span-1"
                      onClick={() => setLinks((arr) => arr.filter((_, i) => i !== idx))}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setLinks((arr) => [...arr, { label: "New Link", url: "" }])}
                  >
                    + Add Link
                  </Button>
                </div>
              </div>
            </Section>

            {/* Social handle */}
            <Section title="Social Handle (Optional)">
              <div className="space-y-2">
                <Input
                  placeholder="@yourusername"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                />
                <p className="text-xs text-slate-500">
                  Your social media handle (Instagram, Twitter, etc.)
                </p>
              </div>
            </Section>
          </div>

          {/* Live preview */}
          <div className="sticky top-6 self-start">
            <Section title="Live Preview">
              <Card
                className={cn(
                  "mx-auto w-full max-w-xs rounded-2xl border p-6 text-center",
                  themeClass
                )}
                style={{
                  // Color accents used inside the preview card
                  // These styles are only for preview; not global theme
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  "--preview-primary": palette.primary,
                }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border bg-white text-xl">
                  {icon}
                </div>
                <div className="text-sm" style={{ fontFamily: font }}>{handle || "tyler-diorio"}</div>
                <div className="mb-4 text-xs text-slate-500">
                  @{(handle || "tyler-diorio").replace(/^@/, "")}
                </div>

                {layout === "stacked" ? (
                  <div className="space-y-2">
                    {(links.length ? links : [{ label: "Link", url: "#" }]).map((l) => (
                      <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                        <Button
                          className={cn(buttonClass, "w-full")}
                          style={{ backgroundColor: palette.primary, color: "white" }}
                        >
                          {l.label}
                        </Button>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {(links.length ? links : []).slice(0, 9).map((l, i) => (
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

                <Button
                  className="mt-6 w-full"
                  disabled={!handle.trim()}
                  onClick={saveAndView}
                >
                  Save & View My Page
                </Button>
                <p className="mt-2 text-[10px] text-slate-400">
                  Live preview • Updates as you customize
                </p>
              </Card>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white/95 p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">{title}</h2>
      {children}
    </div>
  );
}

function Choice({
  active,
  onClick,
  label,
  hint,
  preview,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint?: string;
  preview?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-lg border bg-white p-3 text-left text-sm transition-colors hover:bg-slate-50",
        active && "border-primary/60 ring-2 ring-primary/20"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-medium">{label}</div>
          {hint && <div className="text-xs text-slate-500">{hint}</div>}
        </div>
        {preview && (
          <div className="hidden h-7 w-24 items-center justify-center rounded-md bg-slate-900 text-[10px] text-white sm:flex">
            Preview
          </div>
        )}
      </div>
    </button>
  );
}
