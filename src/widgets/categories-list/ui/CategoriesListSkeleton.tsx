import { CategoryCardSkeleton } from "@/entities/article/ui";
import { Grid } from "@/shared/ui";

type CategoriesListSkeletonProps = {
  length?: number;
};
export const CategoriesListSkeleton = ({
  length = 6,
}: CategoriesListSkeletonProps) => {
  return (
    <Grid cols={3}>
      {Array.from({ length }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </Grid>
  );
};
