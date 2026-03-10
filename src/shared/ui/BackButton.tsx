"use client";

import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/shared/lib";
import { ArrowLeft } from "./icons/ArrowLeft";

export const BackButton = () => {
  const router = useRouter();
  const [lastCategory] = useLocalStorage("last-category", "");

  const handleBack = () => {
    if (lastCategory) {
      router.push(`/category/${lastCategory}`);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex w-fit cursor-pointer items-center gap-2 text-[30px] leading-[25px] font-bold text-[var(--text)] transition-colors hover:text-[var(--accent)]"
    >
      <ArrowLeft />
      Back
    </button>
  );
};
