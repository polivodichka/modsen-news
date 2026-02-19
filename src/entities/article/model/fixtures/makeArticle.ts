import { Article, Category } from "@/entities/article/model";

/**
 * Создаёт объект Article с заданными полями.
 * @param {string} id - идентификатор статьи.
 * @param {Category} section - категория статьи.
 * @param {Partial<Article>} overrides - объект с полями, которые необходимо заменить в создаваемом объекте.
 * @returns {Partial<Article>} - созданный объект Article.
 */
export const makeArticle = (
  id: string,
  section: Category | "news",
  overrides: Partial<Article> = {}
): Partial<Article> => ({
  id,
  webTitle: `Test Article — ${section}`,
  webPublicationDate: "2021-08-08T10:00:00Z",
  webUrl: `https://theguardian.com/${id}`,
  sectionName: section,
  fields: {
    headline: `Headline for ${section} article`,
    bodyText: `Body text for ${section} article`,
    byline: "Journalist",
    trailText: `Short text for ${section} article`,
    thumbnail: null,
  },
  ...overrides,
});
