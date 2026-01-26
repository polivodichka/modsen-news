import { Suspense } from "react";
import { getTopHeadlines } from "@/entities/article";
import { ArticleCard, ArticleCardSkeleton } from "@/widgets/article-card";
import { ArticlesGrid, AutoRefresh } from "@/shared/ui";
import { CategoryCardSkeleton, CategoryGrid } from "@/widgets/category-card";

async function ArticleList() {
  const articles = await getTopHeadlines();
  return (
    <ArticlesGrid>
      {articles.map((article) => (
        <ArticleCard key={article.webUrl} article={article} />
      ))}
    </ArticlesGrid>
  );
}

function ArticleListFallback() {
  return (
    <ArticlesGrid>
      {Array.from({ length: 8 }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </ArticlesGrid>
  );
}

function CategoryGridFallback() {
  return (
    <ArticlesGrid cols={3}>
      {Array.from({ length: 6 }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </ArticlesGrid>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <AutoRefresh />

      {/* Category cards */}
      <section className="flex flex-col gap-[36px]">
        <h2 className="text-4xl font-bold">News Categories</h2>
        <Suspense fallback={<CategoryGridFallback />}>
          <CategoryGrid />
        </Suspense>
      </section>

      {/* Latest articles */}
      <section className="flex flex-col gap-[20px]">
        <h2 className="text-4xl font-bold">Latest News</h2>
        <Suspense fallback={<ArticleListFallback />}>
          <ArticleList />
        </Suspense>
      </section>
    </div>
  );
}
