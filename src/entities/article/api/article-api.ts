import { fetchClient } from "@/shared/api";
import { API_CONFIG } from "@/shared/config";
import type { NewsApiResponse, Article } from "../model";
import { encodeArticleId } from "../model";
import { ONE_HOUR } from "@/shared/config/time";

const { baseUrl, apiKey, defaultCountry, pageSize } = API_CONFIG;

export async function getTopHeadlines(): Promise<Article[]> {
  const url = `${baseUrl}/top-headlines?country=${defaultCountry}&pageSize=${pageSize}&apiKey=${apiKey}`;

  const data = await fetchClient<NewsApiResponse>(url, {
    revalidate: ONE_HOUR,
    tags: ["top-headlines"],
  });

  return data.articles;
}

export async function getArticlesByCategory(
  category: string
): Promise<Article[]> {
  const url = `${baseUrl}/top-headlines?country=${defaultCountry}&category=${category}&pageSize=20&apiKey=${apiKey}`;

  const data = await fetchClient<NewsApiResponse>(url, {
    revalidate: ONE_HOUR,
    tags: [`category-${category}`],
  });

  return data.articles;
}

export async function getArticleById(
  id: string
): Promise<Article | null> {
  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const results = await Promise.allSettled(
    categories.map((cat) => getArticlesByCategory(cat))
  );

  const allArticles = results
    .filter((r): r is PromiseFulfilledResult<Article[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);

  return (
    allArticles.find((article) => encodeArticleId(article.url) === id) ?? null
  );
}