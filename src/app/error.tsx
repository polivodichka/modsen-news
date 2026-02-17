// src/app/error.tsx
"use client";
import { ErrorPage } from "@/widgets/error-page";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ reset }: ErrorProps) => {
  return (
    <ErrorPage code="Oops" message="Something went wrong :(" onReset={reset} />
  );
};

export default Error;
