import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className }: SectionProps) {
  return (
    <div className={cn(
      "rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 p-5 shadow-lg",
      "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/20 before:via-white/10 before:to-transparent before:opacity-50 before:pointer-events-none",
      "relative overflow-hidden",
      className
    )}>
      <h2 className="mb-3 text-sm font-semibold text-white/90 relative z-10">{title}</h2>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}