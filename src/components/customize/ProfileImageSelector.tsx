import { Section } from "./Section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

type ProfileShape = "circle" | "rounded" | "diamond";

interface ProfileImageSelectorProps {
  icon: string;
  setIcon: (icon: string) => void;
  profileShape: ProfileShape;
  setProfileShape: (shape: ProfileShape) => void;
}

const shapes = [
  { id: "circle", label: "Circle" },
  { id: "rounded", label: "Rounded Square" },
  { id: "diamond", label: "Diamond" },
] as { id: ProfileShape; label: string }[];

export function ProfileImageSelector({ 
  icon, 
  setIcon, 
  profileShape, 
  setProfileShape 
}: ProfileImageSelectorProps) {
  const getShapeClass = (shape: ProfileShape) => {
    switch (shape) {
      case "circle":
        return "rounded-full";
      case "rounded":
        return "rounded-lg";
      case "diamond":
        return "rotate-45 rounded-lg";
      default:
        return "rounded-full";
    }
  };

  return (
    <Section title="Profile Picture & Shape">
      <div className="space-y-4">
        {/* Shape selector */}
        <div>
          <Label className="text-xs text-white/80 mb-2 block">Picture Shape</Label>
          <div className="grid grid-cols-3 gap-2">
            {shapes.map((shape) => (
              <button
                key={shape.id}
                onClick={() => setProfileShape(shape.id)}
                className={cn(
                  "p-2 rounded-lg backdrop-blur-sm bg-white/20 border border-white/30 text-xs text-white transition-all",
                  profileShape === shape.id && "border-primary/60 ring-2 ring-primary/40 bg-white/30"
                )}
              >
                {shape.label}
              </button>
            ))}
          </div>
        </div>

        {/* Icon selector */}
        <div>
          <Label className="text-xs text-white/80 mb-2 block">Choose Icon</Label>
          <div className="grid grid-cols-6 gap-3">
            {"✨⭐️💎⚡️🌿🔥🎯🚀🌈🍩🪩💜".split("").map((em, idx) => (
              <button
                key={`${em}-${idx}`}
                onClick={() => setIcon(em)}
                className={cn(
                  "aspect-square border backdrop-blur-sm bg-white/20 border-white/30 text-xl transition-all",
                  getShapeClass(profileShape),
                  icon === em && "border-primary/60 ring-2 ring-primary/40 bg-white/30"
                )}
              >
                <span className={profileShape === "diamond" ? "-rotate-45" : ""}>{em}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Upload option */}
        <div>
          <Label className="text-xs text-white/80 mb-2 block">Or Upload Custom Image</Label>
          <Button 
            variant="outline" 
            className="w-full backdrop-blur-sm bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
        </div>

        <p className="text-center text-xs text-white/60">
          Selected: <span className="font-medium">{icon}</span> • Shape: <span className="font-medium">{profileShape}</span>
        </p>
      </div>
    </Section>
  );
}