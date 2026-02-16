import { BackButton } from "@/shared/ui";

type ErrorPageProps = {
  code: string;
  message: string;
};

export const ErrorPage = ({ code, message }: ErrorPageProps) => {
  return (
    <div className="grid grid-cols-[165px_1fr] items-start gap-[40px]">
      <BackButton />
      <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
        <h1 className="font-montserrat text-6xl font-bold text-[var(--accent)]">
          {code}
        </h1>
        <p className="text-xl text-[var(--text-info)]">{message}</p>
      </div>
    </div>
  );
};
