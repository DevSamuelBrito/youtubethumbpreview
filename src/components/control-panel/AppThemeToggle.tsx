import type { ThemeMode } from "@/types/ui";

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

interface AppThemeToggleProps {
  appTheme: ThemeMode;
  onChange: (theme: ThemeMode) => void;
}

export function AppThemeToggle({ appTheme, onChange }: AppThemeToggleProps) {
  const isDark = appTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Ativar tema claro do app" : "Ativar tema escuro do app"}
      onClick={() => onChange(isDark ? "light" : "dark")}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-100"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
