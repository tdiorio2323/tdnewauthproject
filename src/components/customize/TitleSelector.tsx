import { Section } from "./Section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface TitleSelectorProps {
  title: string;
  setTitle: (title: string) => void;
  subtitle: string;
  setSubtitle: (subtitle: string) => void;
  showTitle: boolean;
  setShowTitle: (show: boolean) => void;
  showSubtitle: boolean;
  setShowSubtitle: (show: boolean) => void;
}

export function TitleSelector({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  showTitle,
  setShowTitle,
  showSubtitle,
  setShowSubtitle,
}: TitleSelectorProps) {
  return (
    <Section title="Title & Subtitle">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-white/80">Show Title</Label>
          <Switch 
            checked={showTitle} 
            onCheckedChange={setShowTitle}
            className="data-[state=checked]:bg-primary"
          />
        </div>
        
        {showTitle && (
          <div>
            <Label className="text-xs text-white/80 mb-2 block">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your Name or Brand"
              className="bg-white border-white/30 text-black placeholder:text-black/60"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label className="text-xs text-white/80">Show Subtitle</Label>
          <Switch 
            checked={showSubtitle} 
            onCheckedChange={setShowSubtitle}
            className="data-[state=checked]:bg-primary"
          />
        </div>
        
        {showSubtitle && (
          <div>
            <Label className="text-xs text-white/80 mb-2 block">Subtitle</Label>
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Your tagline or description"
              className="bg-white border-white/30 text-black placeholder:text-black/60"
            />
          </div>
        )}
      </div>
    </Section>
  );
}