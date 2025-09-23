import { Section } from "./Section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Link {
  label: string;
  url: string;
  icon?: string;
}

interface LinksEditorProps {
  links: Link[];
  setLinks: (links: Link[]) => void;
}

const defaultIcons = ["📷", "🛍️", "✉️", "🌐", "📱", "💼", "🎵", "🎮", "📺", "🎨"];

export function LinksEditor({ links, setLinks }: LinksEditorProps) {
  const addLink = () => {
    setLinks([...links, { label: "", url: "", icon: "🔗" }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: keyof Link, value: string) => {
    setLinks(links.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    ));
  };

  return (
    <Section title="Links & Social Media">
      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={index} className="space-y-3 p-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20">
            {/* Icon selector */}
            <div>
              <Label className="text-xs text-white/80 mb-2 block">Icon</Label>
              <div className="flex gap-2 flex-wrap">
                {defaultIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => updateLink(index, "icon", icon)}
                    className={`w-8 h-8 rounded border text-sm transition-all ${
                      link.icon === icon 
                        ? "border-primary/60 ring-2 ring-primary/40 bg-white/30" 
                        : "border-white/30 bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Label and URL */}
            <div className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-4">
                <Label className="text-xs text-white/80 mb-1 block">Label</Label>
                <Input
                  placeholder="Instagram"
                  value={link.label}
                  onChange={(e) => updateLink(index, "label", e.target.value)}
                  className="bg-white border-white/30 text-black placeholder:text-black/60"
                />
              </div>
              <div className="col-span-7">
                <Label className="text-xs text-white/80 mb-1 block">URL</Label>
                <Input
                  placeholder="https://instagram.com/username"
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                  className="bg-white border-white/30 text-black placeholder:text-black/60"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="col-span-1 backdrop-blur-sm bg-white/20 border-white/30 text-white hover:bg-white/30"
                onClick={() => removeLink(index)}
              >
                ✕
              </Button>
            </div>
          </div>
        ))}
        
        <Button
          variant="outline"
          onClick={addLink}
          className="w-full backdrop-blur-sm bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          + Add Link
        </Button>
      </div>
    </Section>
  );
}