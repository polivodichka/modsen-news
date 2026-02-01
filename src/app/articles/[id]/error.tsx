"use client";

import { BackButton } from "@/shared/ui";

export default function ArticleError() {
  return (
    <div className="grid grid-cols-[165px_1fr] items-start gap-[40px]">
      <BackButton />
      <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
        <h1 className="font-montserrat text-6xl font-bold text-[var(--accent)]">
          Oops
        </h1>
        <p className="text-xl text-[var(--text-info)]">Something went wrong</p>
      </div>
    </div>
  );
}
