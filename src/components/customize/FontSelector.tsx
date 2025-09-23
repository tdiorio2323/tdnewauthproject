import { Section } from "./Section";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { loadGoogleFont } from "@/lib/pageSettings";
import { useMemo } from "react";

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

interface FontSelectorProps {
  font: (typeof fonts)[number];
  setFont: (font: (typeof fonts)[number]) => void;
  fontWeight: number;
  setFontWeight: (weight: number) => void;
}

export function FontSelector({ font, setFont, fontWeight, setFontWeight }: FontSelectorProps) {
  // Load selected font
  useMemo(() => {
    loadGoogleFont(font);
    return null;
  }, [font]);

  return (
    <Section title="Select Your Font">
      <div className="space-y-4">
        <RadioGroup
          className="grid grid-cols-1 gap-2"
          value={font}
          onValueChange={(v: string) => setFont(v as (typeof fonts)[number])}
        >
          {fonts.map((f) => (
            <label
              key={f}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-lg backdrop-blur-sm bg-white border border-white/30 px-3 py-3 text-sm transition-all",
                "hover:bg-white/90 hover:border-white/40",
                font === f && "border-primary/60 ring-2 ring-primary/40 bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value={f} id={`font-${f}`} className="border-black/30" />
                <span 
                  style={{ fontFamily: f, fontWeight }}
                  className="text-black"
                >
                  {f} - The quick brown fox
                </span>
              </div>
            </label>
          ))}
        </RadioGroup>
        
        <div>
          <Label className="text-xs text-white/80 mb-2 block">Font Weight: {fontWeight}</Label>
          <Slider 
            value={[fontWeight]} 
            min={300} 
            max={800} 
            step={100} 
            onValueChange={(v) => setFontWeight(v[0] || 500)}
            className="w-full"
          />
        </div>
      </div>
    </Section>
  );
}