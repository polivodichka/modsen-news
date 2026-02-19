"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/entities/article/config/constants";
import { cn, useLocalStorage } from "@/shared/lib";

export const NavLink = ({
  href = "/",
  children,
  isActive = false,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
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

export const Header = () => {
  const pathname = usePathname();
  const [, setLastCategory] = useLocalStorage("last-category", "");

  return (
    <header className="font-montserrat sticky top-0 z-10 w-full bg-[#000D1F]">
      <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-8">
        <Link
          href="/"
          className="block border-l-[1px] border-[var(--accent)] text-3xl font-thin text-white transition-colors hover:text-[var(--accent)]"
        >
          M News
        </Link>

        <nav className="scrollbar-none flex items-center gap-1 overflow-x-auto pb-2">
          <NavLink
            href="/"
            isActive={pathname === "/"}
            onClick={() => setLastCategory("")}
          >
            News
          </NavLink>

          {CATEGORIES.map(({ id, label }) => (
            <NavLink
              key={id}
              href={`/category/${id}`}
              isActive={pathname === `/category/${id}`}
              onClick={() => setLastCategory(id)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
