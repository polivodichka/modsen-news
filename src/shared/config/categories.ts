export const CATEGORIES = [
  { id: "general", label: "General" },
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "health", label: "Health" },
  { id: "science", label: "Science" },
  { id: "sports", label: "Sports" },
  { id: "technology", label: "Technology" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];