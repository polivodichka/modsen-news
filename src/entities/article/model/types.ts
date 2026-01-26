export interface ArticleFields {
  headline: string;
  bodyText: string;
  thumbnail: string | null;
  byline: string | null;
  shortUrl: string;
  trailText: string | null;
}

export interface Article {
  id: string;
  webTitle: string;
  webPublicationDate: string;
  webUrl: string;
  sectionName: string;
  fields: ArticleFields;
}

export interface GuardianResponse {
  response: {
    status: string;
    total: number;
    results: Article[];
  };
}

export type ArticleId = string;
