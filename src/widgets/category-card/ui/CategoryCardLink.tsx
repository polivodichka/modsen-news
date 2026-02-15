"use client";

import { cn, useLocalStorage } from "@/shared/lib";
import type { CategoryId } from "@/shared/config";
import Link from "next/link";

interface CategoryCardLinkProps {
  id: CategoryId;
  children: React.ReactNode;
}

export function CategoryCardLink({ id, children }: CategoryCardLinkProps) {
  const [, setLastCategory] = useLocalStorage("last-category", "");

  return (
    <Link
      href={`/category/${id}`}
      className={cn(
        "group relative block aspect-[3/4] overflow-hidden rounded-[20px]",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_10px_10px_rgba(0,0,0,0.25)]"
      )}
      onClick={() => setLastCategory(id)}
    >
      {children}
    </Link>
  );
}
