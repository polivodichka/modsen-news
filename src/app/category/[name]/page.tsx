import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  getArticlesByCategory,
  CATEGORIES,
  Category,
} from "@/entities/article";

import { ArticlesList, ArticlesListSkeleton } from "@/widgets/articles-list";

type CategoryPageProps = {
  params: Promise<{ name: string }>;
};

export const generateStaticParams = () => {
  return CATEGORIES.map(({ id: name }) => ({ name }));
};

export const generateMetadata = async ({ params }: CategoryPageProps) => {
  const { name } = await params;
  const category = CATEGORIES.find(({ id }) => id === name);

  if (!category) return { title: "Not Found" };

  return {
    title: category.label,
  };
};

const CategoryArticlesList = async ({ category }: { category: Category }) => {
  const articles = await getArticlesByCategory(category);

  if (!articles.length) {
    return (
      <p className="py-20 text-center text-gray-400">
        No articles found for this category.
      </p>
    );
  }

  return <ArticlesList articles={articles} />;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { name } = await params;
  const category = CATEGORIES.find(({ id }) => id === name);

  if (!category) notFound();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold">Category - {category.label}</h1>
      <Suspense fallback={<ArticlesListSkeleton />}>
        <CategoryArticlesList category={category.id} />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
