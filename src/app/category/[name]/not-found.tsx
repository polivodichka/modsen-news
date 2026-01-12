import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
      <h1 className="text-6xl font-bold text-[var(--accent)]">404</h1>
      <p className="text-xl text-gray-400">Category not found</p>
      <Link
        href="/"
        className="rounded-full border border-[var(--accent)] px-6 py-2 text-[var(--accent)] transition-all duration-200 hover:bg-[var(--accent)] hover:text-white"
      >
        Back to Home
      </Link>
    </div>
  );
}
