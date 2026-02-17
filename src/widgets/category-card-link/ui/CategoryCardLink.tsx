"use client";

import { useLocalStorage } from "@/shared/lib";
import Link from "next/link";

type CategoryCardLinkProps = {
  id: string;
  children: React.ReactNode;
};

export const CategoryCardLink = ({ id, children }: CategoryCardLinkProps) => {
  const [, setLastCategory] = useLocalStorage("last-category", "");

  return (
    <Link href={`/category/${id}`} onClick={() => setLastCategory(id)}>
      {children}
    </Link>
  );
};
