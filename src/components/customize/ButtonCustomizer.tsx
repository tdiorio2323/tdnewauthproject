import { Section } from "./Section";
import { Choice } from "./Choice";
import { cn } from "@/lib/utils";

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

interface ButtonCustomizerProps {
  buttonStyle: ButtonStyle;
  setButtonStyle: (style: ButtonStyle) => void;
  buttonLayout: ButtonLayout;
  setButtonLayout: (layout: ButtonLayout) => void;
}

const buttonStyles = [
  { id: "glass", label: "Glassy", hint: "Frosted glass effect" },
  { id: "chrome", label: "Chrome", hint: "Shiny metallic" },
  { id: "neon", label: "Neon Glow", hint: "Bright neon effects" },
  { id: "minimal", label: "Minimal", hint: "Clean and simple" },
  { id: "vintage", label: "Vintage", hint: "Retro styling" },
  { id: "cyberpunk", label: "Cyberpunk", hint: "Futuristic neon" },
  { id: "nature", label: "Nature", hint: "Organic textures" },
  { id: "kawaii", label: "Kawaii", hint: "Cute and playful" },
  { id: "grunge", label: "Grunge", hint: "Rough and edgy" },
  { id: "luxury", label: "Luxury", hint: "Premium gold" },
] as { id: ButtonStyle; label: string; hint: string }[];

const buttonLayouts = [
  { id: "rounded", label: "Rounded Corners" },
  { id: "square", label: "Sharp Squares" },
  { id: "circle", label: "Circular Pills" },
  { id: "rounded-square", label: "Soft Squares" },
] as { id: ButtonLayout; label: string }[];

export function ButtonCustomizer({ 
  buttonStyle, 
  setButtonStyle, 
  buttonLayout, 
  setButtonLayout 
}: ButtonCustomizerProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Section title="Button Style">
        <div className="space-y-2">
          {buttonStyles.map((style) => (
            <Choice
              key={style.id}
              active={buttonStyle === style.id}
              onClick={() => setButtonStyle(style.id)}
              label={style.label}
              hint={style.hint}
              preview
            />
          ))}
        </div>
      </Section>

      <Section title="Button Shape">
        <div className="space-y-2">
          {buttonLayouts.map((layout) => (
            <Choice
              key={layout.id}
              active={buttonLayout === layout.id}
              onClick={() => setButtonLayout(layout.id)}
              label={layout.label}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}