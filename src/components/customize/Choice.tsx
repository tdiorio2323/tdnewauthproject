import { cn } from "@/lib/utils";

interface ChoiceProps {
  active: boolean;
  onClick: () => void;
  label: string;
  hint?: string;
  preview?: boolean;
  className?: string;
}

export function Choice({
  active,
  onClick,
  label,
  hint,
  preview,
  className,
}: ChoiceProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-lg backdrop-blur-sm bg-white/20 border border-white/30 p-3 text-left text-sm transition-all duration-200",
        "hover:bg-white/30 hover:border-white/40 hover:shadow-md",
        "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/10 before:via-white/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-200",
        "hover:before:opacity-100 relative overflow-hidden",
        active && "border-primary/60 ring-2 ring-primary/40 bg-white/30",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 relative z-10">
        <div>
          <div className="font-medium text-white">{label}</div>
          {hint && <div className="text-xs text-white/70">{hint}</div>}
        </div>
        {preview && (
          <div className="hidden h-7 w-24 items-center justify-center rounded-md bg-black/30 text-[10px] text-white sm:flex backdrop-blur-sm">
            Preview
          </div>
        )}
      </div>
    </button>
  );
}