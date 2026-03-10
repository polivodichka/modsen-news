import { Article, ArticleCard } from "@/entities/article";
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
