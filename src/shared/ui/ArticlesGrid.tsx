interface ArticlesGridProps {
  children: React.ReactNode;
  cols?: 3 | 4;
}

export function ArticlesGrid({ children, cols = 4 }: ArticlesGridProps) {
  return (
    <div
      className={
        cols === 3
          ? "grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-3"
          : "grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-4"
      }
    >
      {children}
    </div>
  );
}
