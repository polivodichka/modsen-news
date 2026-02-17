import { BackButton } from "@/shared/ui";

type ErrorPageProps = {
  code: string;
  message: string;
  onReset?: () => void;
};

export const ErrorPage = ({ code, message, onReset }: ErrorPageProps) => {
  return (
    <div className="grid grid-cols-[165px_1fr] items-start gap-[40px]">
      <BackButton />
      <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
        <h1 className="font-montserrat text-6xl font-bold text-[var(--accent)]">
          {code}
        </h1>
        <p className="text-xl text-[var(--text-info)]">{message}</p>
        {onReset && (
          <button
            onClick={onReset}
            className="mt-4 cursor-pointer rounded-full bg-[var(--accent)] px-6 py-2 text-white transition hover:opacity-80"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};
