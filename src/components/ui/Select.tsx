import type { SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

export function Select({
  label,
  id,
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">
      {label}
      <select
        id={id}
        className={`rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-sm text-neutral-900 focus:border-neutral-500 focus:outline-none ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
