import { ArticleCardSkeleton } from "@/entities/article";
import { Grid } from "@/shared/ui";

type ArticlesListSkeletonProps = {
  length?: number;
};
export const ArticlesListSkeleton = ({
  length = 8,
}: ArticlesListSkeletonProps) => {
  return (
    <Grid>
      {Array.from({ length }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </Grid>
  );
};
