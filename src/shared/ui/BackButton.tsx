"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "./icons/ArrowLeft";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex w-fit cursor-pointer items-center gap-2 text-[30px] leading-[25px] font-bold text-[var(--text)] transition-colors hover:text-[var(--accent)]"
    >
      <ArrowLeft />
      Back
    </button>
  );
}
