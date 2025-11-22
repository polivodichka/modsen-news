export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_NEWS_API_URL!,
  apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY!,
  defaultCountry: "us",
  pageSize: 8,
} as const;