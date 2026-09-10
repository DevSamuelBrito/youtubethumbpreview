import type { ReactNode } from "react";

interface SegmentedToggleOption<T extends string> {
  value: T;
  label: string;
  icon: ReactNode;
}

interface SegmentedToggleProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: readonly [SegmentedToggleOption<T>, SegmentedToggleOption<T>];
}

export function SegmentedToggle<T extends string>({
  value,
  onChange,
  options,
}: SegmentedToggleProps<T>) {
  const selectedIndex = options.findIndex((option) => option.value === value);

  return (
    <div className="relative inline-flex w-full rounded-full bg-neutral-200 p-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)]">
      <span
        aria-hidden
        className="absolute top-1 bottom-1 left-1 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.15)] transition-transform duration-200 ease-out"
        style={{
          width: "calc(50% - 4px)",
          transform:
            selectedIndex === 1 ? "translateX(100%)" : "translateX(0%)",
        }}
      />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-label={option.label}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`relative z-10 flex flex-1 items-center justify-center rounded-full py-1.5 transition-colors ${
            value === option.value ? "text-neutral-900" : "text-neutral-500"
          }`}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}
