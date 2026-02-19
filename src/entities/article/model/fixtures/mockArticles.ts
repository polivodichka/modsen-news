import { Category, makeArticle } from "@/entities/article/model";

export const MOCK_ARTICLES = [
  makeArticle("sport/article", Category.SPORT),
  makeArticle("technology/article", Category.TECHNOLOGY),
  makeArticle("business/article", Category.BUSINESS),
  makeArticle("science/article", Category.SCIENCE),
  makeArticle("culture/article", Category.ENTERTAINMENT, {
    fields: {
      headline: "No headline",
      bodyText: "Body text",
      byline: null,
      trailText: null,
      thumbnail: null,
    },
  }),
];
