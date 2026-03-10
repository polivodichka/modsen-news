export const normalizeImageUrl = (url: string): string =>
  url.startsWith("//") ? `https:${url}` : url;
