import { Category } from "@/entities/article/model";

export const CATEGORIES: { id: Category; label: string; image: string }[] = [
  {
    id: Category.BUSINESS,
    label: "Business",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
  },
  {
    id: Category.ENTERTAINMENT,
    label: "Entertainment",
    image: "https://images.unsplash.com/photo-1603739903239-8b6e64c3b185?w=800",
  },
  {
    id: Category.HEALTH,
    label: "Health",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
  },
  {
    id: Category.SCIENCE,
    label: "Science",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800",
  },
  {
    id: Category.SPORT,
    label: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
  },
  {
    id: Category.TECHNOLOGY,
    label: "Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
  },
] as const;

export const CATEGORY_TO_GUARDIAN_SECTION: Record<Category, string> = {
  [Category.GENERAL]: "news",
  [Category.BUSINESS]: "business",
  [Category.ENTERTAINMENT]: "culture",
  [Category.HEALTH]: "lifeandstyle",
  [Category.SCIENCE]: "science",
  [Category.SPORT]: "sport",
  [Category.TECHNOLOGY]: "technology",
} as const;
