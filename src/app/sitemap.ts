import { CATEGORIES } from "@/shared/config";

export default function sitemap() {
  const baseUrl = "https://modsen-news.vercel.app";

  const categoryUrls = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 1,
    },
    ...categoryUrls,
  ];
}
