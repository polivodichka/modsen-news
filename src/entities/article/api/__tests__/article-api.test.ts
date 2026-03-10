import {
  getArticlesByCategory,
  getArticleById,
  getLatestArticles,
} from "../article-api";
import { fetchClient } from "@/shared/api";
import { Category } from "@/entities/article/model";
import { encodeArticleId } from "@/entities/article/model";
import { makeArticle } from "@/entities/article/model/fixtures/makeArticle";

jest.mock("@/shared/api", () => ({
  fetchClient: jest.fn(),
}));

jest.mock("@/entities/article/lib", () => ({
  buildUrl: jest.fn(
    ({ path }: { path: string }) => `https://mocked.api${path}`
  ),
}));

const mockFetchClient = fetchClient as jest.Mock;

beforeEach(() => {
  mockFetchClient.mockReset();
});

describe("getLatestArticles", () => {
  it("возвращает массив статей при успешном запросе", async () => {
    const articles = [
      makeArticle("news/2021/article-1", "news"),
      makeArticle("news/2021/article-2", "news"),
    ];
    mockFetchClient.mockResolvedValue({
      response: { status: "ok", total: 2, results: articles },
    });

    const result = await getLatestArticles();
    expect(result).toEqual(articles);
  });

  it("возвращает пустой массив при ошибке fetchClient", async () => {
    mockFetchClient.mockRejectedValue(new Error("Network error"));

    const result = await getLatestArticles();
    expect(result).toEqual([]);
  });

  it("вызывает fetchClient ровно один раз", async () => {
    mockFetchClient.mockResolvedValue({
      response: { status: "ok", total: 0, results: [] },
    });

    await getLatestArticles();
    expect(mockFetchClient).toHaveBeenCalledTimes(1);
  });

  it("возвращает пустой массив если results пустой", async () => {
    mockFetchClient.mockResolvedValue({
      response: { status: "ok", total: 0, results: [] },
    });

    const result = await getLatestArticles();
    expect(result).toEqual([]);
  });
});

describe("getArticlesByCategory", () => {
  it("возвращает массив статей по категории", async () => {
    const articles = [makeArticle("sport/2021/test", Category.SPORT)];
    mockFetchClient.mockResolvedValue({
      response: { status: "ok", total: 1, results: articles },
    });

    const result = await getArticlesByCategory(Category.SPORT);
    expect(result).toEqual(articles);
  });

  it("возвращает пустой массив при ошибке", async () => {
    mockFetchClient.mockRejectedValue(new Error("API down"));

    const result = await getArticlesByCategory(Category.HEALTH);
    expect(result).toEqual([]);
  });

  it("вызывает fetchClient с тегом, соответствующим категории", async () => {
    mockFetchClient.mockResolvedValue({
      response: { status: "ok", total: 0, results: [] },
    });

    await getArticlesByCategory(Category.TECHNOLOGY);

    expect(mockFetchClient).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        tags: [`category-${Category.TECHNOLOGY}`],
      })
    );
  });

  it("корректно обрабатывает все значения Category enum", async () => {
    mockFetchClient.mockResolvedValue({
      response: { status: "ok", total: 0, results: [] },
    });

    for (const category of Object.values(Category)) {
      const result = await getArticlesByCategory(category);
      expect(Array.isArray(result)).toBe(true);
    }
  });
});

describe("getArticleById", () => {
  it("возвращает статью по закодированному id", async () => {
    const article = makeArticle("sport/2021/article-1", Category.SPORT);
    mockFetchClient.mockResolvedValue({
      response: { status: "ok", content: article },
    });

    const encodedId = encodeArticleId("sport/2021/article-1");
    const result = await getArticleById(encodedId);
    expect(result).toEqual(article);
  });

  it("возвращает null при ошибке fetchClient", async () => {
    mockFetchClient.mockRejectedValue(new Error("Not found"));

    const encodedId = encodeArticleId("some/path");
    const result = await getArticleById(encodedId);
    expect(result).toBeNull();
  });

  it("возвращает null если content отсутствует в ответе", async () => {
    mockFetchClient.mockResolvedValue({
      response: { status: "ok", content: undefined },
    });

    const encodedId = encodeArticleId("some/path");
    const result = await getArticleById(encodedId);
    expect(result).toBeNull();
  });

  it("вызывает fetchClient с тегом article-{encodedId}", async () => {
    const article = makeArticle("sport/2021/article-1", Category.SPORT);
    mockFetchClient.mockResolvedValue({
      response: { status: "ok", content: article },
    });

    const encodedId = encodeArticleId("sport/2021/article-1");
    await getArticleById(encodedId);

    expect(mockFetchClient).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        tags: [`article-${encodedId}`],
      })
    );
  });
});
