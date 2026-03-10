import { FIELDS, API_CONFIG } from "@/entities/article/config";
import { GuardianRequestParams } from "../model/types";

const { apiKey, baseUrl } = API_CONFIG;

type BuildUrlProps = {
  path: string;
  params?: Partial<Record<GuardianRequestParams, string | number>>;
};

export const buildUrl = ({ path, params }: BuildUrlProps): string => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  const url = new URL(normalizedPath, normalizedBase);

  if (params)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });

  url.searchParams.set(GuardianRequestParams.SHOW_FIELDS, FIELDS.join(","));
  url.searchParams.set(GuardianRequestParams.API_KEY, apiKey);

  return url.toString();
};
