"use client";

import {  useState, useEffect } from "react";
import type { Article } from "@/entities/article";
import type { CategoryId } from "@/shared/config";
import { useLocalStorage } from "@/shared/lib";
import { ArticleCard, ArticleCardSkeleton } from "@/widgets/article-card";
import { CategoryFilter } from "@/features/category-filter";

function ArticleListFallback() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useLocalStorage<
    CategoryId | "all"
  >("selected-category", "all");

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchArticles = async () => {
      try {
        const data =
          selectedCategory === "all"
            ? await fetch("/api/headlines").then((r) => r.json())
            : await fetch(`/api/category/${selectedCategory}`).then((r) =>
                r.json(),
              );
        setArticles(data);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory]);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold tracking-tight">
        Latest <span className="text-[var(--accent)]">News</span>
      </h1>

      <CategoryFilter
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      {loading ? (
        <ArticleListFallback />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
