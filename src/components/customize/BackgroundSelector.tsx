import { Section } from "./Section";
import { Choice } from "./Choice";

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

interface BackgroundSelectorProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const themes = [
  { id: "minimal", label: "Minimal", hint: "Clean & Simple" },
  { id: "holographic", label: "Holographic", hint: "Colorful Gradients" },
  { id: "cyberpunk", label: "Cyberpunk", hint: "Neon Glow" },
  { id: "glass", label: "Glassmorphism", hint: "Frosted Glass" },
  { id: "dark", label: "Dark Mode" },
  { id: "pastel", label: "Pastel Dreams" },
  { id: "vintage", label: "Vintage Retro" },
  { id: "sci_fi", label: "Futuristic Sci‑Fi" },
  { id: "nature", label: "Nature Inspired" },
  { id: "luxury_gold", label: "Luxury Gold" },
  { id: "grunge", label: "Grunge Punk" },
  { id: "kawaii", label: "Kawaii Cute" },
  { id: "mystic", label: "Mystic Fantasy" },
  { id: "noir", label: "Seductive Noir" },
] as { id: Theme; label: string; hint?: string }[];

export function BackgroundSelector({ theme, setTheme }: BackgroundSelectorProps) {
  return (
    <Section title="Choose Your Background">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {themes.map((t) => (
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
  );
}