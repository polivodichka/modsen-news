export type ArticleFields = {
  headline: string;
  bodyText: string;
  thumbnail: string | null;
  byline: string | null;
  trailText: string | null;
};

export type Article = {
  id: string;
  webTitle: string;
  webPublicationDate: string;
  webUrl: string;
  sectionName: string;
  fields: ArticleFields;
};

export type GuardianResponse = {
  response: {
    status: string;
    total: number;
    results: Article[];
  };
};

export enum Category {
  GENERAL = "news",
  BUSINESS = "business",
  ENTERTAINMENT = "entertainment",
  HEALTH = "health",
  SCIENCE = "science",
  SPORT = "sport",
  TECHNOLOGY = "technology",
}

export enum GuardianRequestParams {
  SHOW_FIELDS = "show-fields",
  API_KEY = "api-key",
  PAGE_SIZE = "page-size",
  SECTION = "section",
}
