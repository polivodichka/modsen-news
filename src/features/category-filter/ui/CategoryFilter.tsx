"use client";

import { CATEGORIES, type CategoryId } from "@/shared/config";
import { cn } from "@/shared/lib";

interface CategoryFilterProps {
  selected: CategoryId | "all";
  onChange: (category: CategoryId | "all") => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const all = [{ id: "all" as const, label: "All" }, ...CATEGORIES];

  return (
    <div className="flex flex-wrap gap-2">
      {all.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
            selected === id
              ? "bg-[var(--accent)] border-[var(--accent)] text-white"
              : "bg-transparent border-[var(--muted)] text-gray-400 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}