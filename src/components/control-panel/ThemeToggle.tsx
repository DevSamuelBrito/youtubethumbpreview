import { Button } from "@/components/ui/Button";
import type { ThemeMode } from "@/types/ui";

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-neutral-600">Tema</span>
      <Button
        variant="ghost"
        className="border border-neutral-300"
        onClick={onToggle}
      >
        {theme === "light" ? "Claro" : "Escuro"}
      </Button>
    </div>
  );
}
