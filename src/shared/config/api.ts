export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_GUARDIAN_API_URL!,
  apiKey: process.env.NEXT_PUBLIC_GUARDIAN_API_KEY!,
  pageSize: 8,
} as const;
