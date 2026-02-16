"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ONE_HOUR_MS } from "@/shared/config";

export const AutoRefresh = ({
  interval = ONE_HOUR_MS,
}: {
  interval?: number;
}) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      router.refresh();
    }, interval);

    return () => clearInterval(timer);
  }, [router, interval]);

  return null;
};
