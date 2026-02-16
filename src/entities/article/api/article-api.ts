import { fetchClient } from "@/shared/api";

import { ONE_HOUR_SEC } from "@/shared/config";
import {
  Article,
  GuardianResponse,
  Category,
  decodeArticleId,
  GuardianRequestParams,
} from "@/entities/article/model";
import {
  CATEGORY_TO_GUARDIAN_SECTION,
  TOP_ARTICLES_LENGTH,
} from "@/entities/article/config";
import { buildUrl } from "@/entities/article/lib";

const SEARCH_PATH = "/search";

export const getTopArticles = async (): Promise<Article[]> => {
  try {
    const url = buildUrl({
      path: SEARCH_PATH,
      params: {
        [GuardianRequestParams.PAGE_SIZE]: TOP_ARTICLES_LENGTH,
      },
    });

    const data = await fetchClient<GuardianResponse>(url, {
      revalidate: ONE_HOUR_SEC,
      tags: ["top-headlines"],
    });

    return data.response.results;
  } catch {
    return [];
  }
};

export const getArticlesByCategory = async (
  category: Category
): Promise<Article[]> => {
  try {
    const section = CATEGORY_TO_GUARDIAN_SECTION[category];
    const url = buildUrl({
      path: SEARCH_PATH,
      params: {
        [GuardianRequestParams.SECTION]: section,
      },
    });

    const data = await fetchClient<GuardianResponse>(url, {
      revalidate: ONE_HOUR_SEC,
      tags: [`category-${category}`],
    });

    return data.response.results;
  } catch {
    return [];
  }
};

export const getArticleById = async (
  encodedId: string
): Promise<Article | null> => {
  const path = decodeArticleId(encodedId);
  const url = buildUrl({ path });

  try {
    const data = await fetchClient<{
      response: { status: string; content: Article };
    }>(url, {
      revalidate: ONE_HOUR_SEC,
      tags: [`article-${encodedId}`],
    });

    return data.response.content ?? null;
  } catch {
    return null;
  }
};
