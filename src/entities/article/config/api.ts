export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_GUARDIAN_API_URL,
  apiKey: process.env.GUARDIAN_API_KEY,
} as const;

export const TOP_ARTICLES_LENGTH = 8;

export const FIELDS = [
  "headline", // Заголовок статьи
  "bodyText", // Полный текст статьи
  "thumbnail", // url картинки-превью
  "byline", // Автор
  "trailText", // Краткий текст статьи
];
