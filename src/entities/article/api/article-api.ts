import { fetchClient } from "@/shared/api";
import { API_CONFIG } from "@/shared/config";
import type { GuardianResponse, Article } from "../model";
import { decodeArticleId } from "../model";

const { baseUrl, apiKey, pageSize } = API_CONFIG;

const FIELDS = "headline,bodyText,thumbnail,byline,shortUrl,trailText";

// Маппинг наших категорий на секции Guardian
const CATEGORY_MAP: Record<string, string> = {
  general: "news",
  business: "business",
  entertainment: "culture",
  health: "lifeandstyle",
  science: "science",
  sports: "sport",
  technology: "technology",
};

export async function getTopHeadlines(): Promise<Article[]> {
  const url = `${baseUrl}/search?order-by=newest&page-size=${pageSize}&show-fields=${FIELDS}&api-key=${apiKey}`;

  const data = await fetchClient<GuardianResponse>(url, {
    revalidate: 600,
    tags: ["top-headlines"],
  });

  return data.response.results;
}

export async function getArticlesByCategory(
  category: string
): Promise<Article[]> {
  const section = CATEGORY_MAP[category] ?? category;
  const url = `${baseUrl}/search?section=${section}&order-by=newest&page-size=20&show-fields=${FIELDS}&api-key=${apiKey}`;

  const data = await fetchClient<GuardianResponse>(url, {
    revalidate: 3600,
    tags: [`category-${category}`],
  });

  return data.response.results;
}

export async function getArticleById(
  encodedId: string
): Promise<Article | null> {
  const id = decodeArticleId(encodedId);
  const url = `${baseUrl}/${id}?show-fields=${FIELDS}&api-key=${apiKey}`;

  try {
    const data = await fetchClient<{
      response: { status: string; content: Article };
    }>(url, {
      revalidate: 3600,
      tags: [`article-${encodedId}`],
    });

    return data.response.content ?? null;
  } catch {
    return null;
  }
}
