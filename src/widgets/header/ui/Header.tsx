"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/shared/config";
import { cn } from "@/shared/lib";

export const NavLink = ({
  href = "/",
  children,
  isActive = false,
}: {
  href?: string;
  children: React.ReactNode;
  isActive?: boolean;
}) => (
  <Link
    href={href}
    className={cn(
      "block rounded-full px-3 py-1 text-sm font-light whitespace-nowrap transition-all duration-200",
      isActive
        ? "text-[var(--accent)]"
        : "text-white hover:text-[var(--accent)]"
    )}
  >
    {children}
  </Link>
);

export function Header() {
  const pathname = usePathname();

  return (
    <header className="font-montserrat sticky top-0 z-10 w-full border-[var(--muted)] bg-[#000D1F]">
      <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-8">
        <Link
          href="/"
          className="block border-l-[1px] border-[var(--accent)] text-3xl font-thin text-white transition-colors hover:text-[var(--accent)]"
        >
          M News
        </Link>

        <nav className="scrollbar-none flex items-center gap-1 overflow-x-auto pb-2">
          <NavLink href="/" isActive={pathname === "/"}>
            News
          </NavLink>

          {CATEGORIES.map((cat) => (
            <NavLink
              key={cat.id}
              href={`/category/${cat.id}`}
              isActive={pathname === `/category/${cat.id}`}
            >
              {cat.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
