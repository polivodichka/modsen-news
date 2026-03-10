import { fetchClient } from "../fetch-client";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("fetchClient", () => {
  it("возвращает распарсенный JSON при успешном ответе", async () => {
    const mockData = { response: { status: "ok", results: [] } };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchClient<typeof mockData>(
      "https://api.example.com/search"
    );

    expect(result).toEqual(mockData);
  });

  it("выбрасывает ошибку при res.ok === false", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(
      fetchClient("https://api.example.com/missing")
    ).rejects.toThrow("Fetch error: 404 Not Found");
  });

  it("сообщение об ошибке содержит URL", async () => {
    const url = "https://api.example.com/broken";
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(fetchClient(url)).rejects.toThrow(url);
  });

  it("передаёт revalidate через next в параметрах fetch", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await fetchClient("https://api.example.com/search", { revalidate: 3600 });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/search",
      expect.objectContaining({
        next: expect.objectContaining({ revalidate: 3600 }),
      })
    );
  });

  it("передаёт tags через next в параметрах fetch", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await fetchClient("https://api.example.com/search", {
      tags: ["top-headlines"],
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/search",
      expect.objectContaining({
        next: expect.objectContaining({ tags: ["top-headlines"] }),
      })
    );
  });

  it("не включает revalidate в next, если он не передан", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await fetchClient("https://api.example.com/search", {
      tags: ["some-tag"],
    });

    const callArgs = mockFetch.mock.calls[0][1];
    expect(callArgs.next).not.toHaveProperty("revalidate");
  });

  it("не включает tags в next, если они не переданы", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await fetchClient("https://api.example.com/search", { revalidate: 60 });

    const callArgs = mockFetch.mock.calls[0][1];
    expect(callArgs.next).not.toHaveProperty("tags");
  });

  it("работает без опций (пустой объект по умолчанию)", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    });

    const result = await fetchClient<{ ok: boolean }>(
      "https://api.example.com"
    );
    expect(result).toEqual({ ok: true });
  });

  it("пробрасывает ошибку сети (fetch rejected)", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    await expect(fetchClient("https://api.example.com")).rejects.toThrow(
      "Network error"
    );
  });
});
