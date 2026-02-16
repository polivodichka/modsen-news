export const encodeArticleId = (id: string): string => {
  return btoa(id).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const decodeArticleId = (id: string): string => {
  const base64 = id.replace(/-/g, "+").replace(/_/g, "/");
  return atob(base64);
};
