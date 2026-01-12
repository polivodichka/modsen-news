import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticlesByCategory } from "@/entities/article";
import { ArticleCard, ArticleCardSkeleton } from "@/widgets/article-card";
import { CATEGORIES, type CategoryId } from "@/shared/config";

interface PageProps {
  params: Promise<{ name: string }>;
}

// SSG — предварительно генерируем все категории
export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ name: cat.id }));
}

// Динамические метаданные
export async function generateMetadata({ params }: PageProps) {
  const { name } = await params;
  const category = CATEGORIES.find((c) => c.id === name);

  if (!category) return { title: "Not Found" };

  return {
    title: `${category.label} — Modsen News`,
  };
}

async function CategoryArticleList({ category }: { category: CategoryId }) {
  const articles = await getArticlesByCategory(category);

  if (!articles.length) {
    return (
      <p className="py-20 text-center text-gray-400">
        No articles found for this category.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-[36px] sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.url} article={article} />
      ))}
    </div>
  );
}

function CategoryArticleListFallback() {
  return (
    <div className="grid grid-cols-1 gap-[36px] sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function CategoryPage({ params }: PageProps) {
  const { name } = await params;
  const category = CATEGORIES.find((c) => c.id === name);

  if (!category) notFound();

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <h1 className="text-4xl font-bold">Category - {category.label}</h1>

      {/* Articles */}
      <Suspense fallback={<CategoryArticleListFallback />}>
        <CategoryArticleList category={category.id} />
      </Suspense>
    </div>
  );
}
