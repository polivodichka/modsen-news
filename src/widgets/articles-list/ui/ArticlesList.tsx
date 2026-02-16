import { Article } from "@/entities/article/model";
import { Grid } from "@/shared/ui";
import { ArticleCard } from "@/widgets/article-card";

type ArticleListProps = {
  getArticles: () => Promise<Article[]>;
};

export const ArticlesList = async ({ getArticles }: ArticleListProps) => {
  const articles = await getArticles();
  return (
    <Grid>
      {articles.map((article) => (
        <ArticleCard key={article.webUrl} article={article} />
      ))}
    </Grid>
  );
};
