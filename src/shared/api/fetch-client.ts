interface FetchOptions extends RequestInit {
  revalidate?: number;
  tags?: string[];
}

export async function fetchClient<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate, tags, ...init } = options;

  const res = await fetch(url, {
    ...init,
    next: {
      ...(revalidate !== undefined && { revalidate }),
      ...(tags && { tags }),
    },
  });

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status} ${res.statusText} — ${url}`);
  }

  return res.json() as Promise<T>;
}
