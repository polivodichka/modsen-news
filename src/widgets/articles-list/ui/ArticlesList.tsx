import { Article } from "@/entities/article/model";
import { ArticleCard } from "@/entities/article/ui";
import { Grid } from "@/shared/ui";

type ArticleListProps = {
  articles: Article[];
};

export const ArticlesList = ({ articles }: ArticleListProps) => {
  return (
    <Grid>
      {articles.map((article) => (
        <ArticleCard key={article.webUrl} article={article} />
      ))}
    </Grid>
  );
};
