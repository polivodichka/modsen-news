type GridProps = {
  children: React.ReactNode;
  cols?: 3 | 4;
};

export const Grid = ({ children, cols = 4 }: GridProps) => {
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
};
