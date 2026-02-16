import { Suspense } from "react";
import { getTopArticles } from "@/entities/article/api";
import { AutoRefresh } from "@/shared/ui";
import { CategoriesList } from "@/widgets/category-card";
import { ArticlesList, ArticlesListSkeleton } from "@/widgets/articles-list";
import { CategoriesListSkeleton } from "@/widgets/categories-list";
import { TEN_MINS_MS } from "@/shared/config";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <AutoRefresh interval={TEN_MINS_MS} />

      <section className="flex flex-col gap-[36px]">
        <h2 className="text-4xl font-bold">News Categories</h2>
        <Suspense fallback={<CategoriesListSkeleton />}>
          <CategoriesList />
        </Suspense>
      </section>

      <section className="flex flex-col gap-[20px]">
        <h2 className="text-4xl font-bold">Latest News</h2>
        <Suspense fallback={<ArticlesListSkeleton />}>
          <ArticlesList getArticles={getTopArticles} />
        </Suspense>
      </section>
    </div>
  );
};

export default HomePage;
