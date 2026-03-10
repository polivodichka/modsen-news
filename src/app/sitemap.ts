import { CATEGORIES } from "@/entities/article";

const sitemap = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const categoryUrls = CATEGORIES.map((category) => ({
    url: `${baseUrl}/category/${category.id}`,
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
};

export default sitemap;
