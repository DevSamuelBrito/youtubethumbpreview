import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600 dark:text-slate-400">
      {label}
      <input
        id={id}
        className={`rounded-md bg-neutral-200 px-2.5 py-1.5 text-sm text-neutral-900 shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)] placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 dark:bg-slate-600 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-white/15 ${className}`}
        {...props}
      />
    </label>
  );
}
