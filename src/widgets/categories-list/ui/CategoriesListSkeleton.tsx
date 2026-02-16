import { Grid } from "@/shared/ui";
import { CategoryCardSkeleton } from "@/widgets/category-card";

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
