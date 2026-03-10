import { buildUrl } from "../build-url";
import { GuardianRequestParams } from "@/entities/article/model/types";

jest.mock("@/entities/article/config", () => ({
  API_CONFIG: {
    baseUrl: "https://content.guardianapis.com",
    apiKey: "test-api-key",
  },
  FIELDS: ["headline", "bodyText", "thumbnail", "byline", "trailText"],
}));

describe("buildUrl", () => {
  it("строит корректный URL с базовым путём", () => {
    const url = buildUrl({ path: "/search" });
    expect(url).toContain("https://content.guardianapis.com/search");
  });

  it("всегда добавляет api-key из конфига", () => {
    const url = buildUrl({ path: "/search" });
    expect(url).toContain("api-key=test-api-key");
  });

  it("всегда добавляет show-fields с полями из конфига", () => {
    const url = buildUrl({ path: "/search" });
    const parsed = new URL(url);
    const showFields = parsed.searchParams.get("show-fields");
    expect(showFields).toBe(
      ["headline", "bodyText", "thumbnail", "byline", "trailText"].join(",")
    );
  });

  it("добавляет переданные params в строку запроса", () => {
    const url = buildUrl({
      path: "/search",
      params: {
        [GuardianRequestParams.PAGE_SIZE]: 8,
        [GuardianRequestParams.SECTION]: "sport",
      },
    });
    const parsed = new URL(url);
    expect(parsed.searchParams.get("page-size")).toBe("8");
    expect(parsed.searchParams.get("section")).toBe("sport");
  });

  it("корректно работает без params", () => {
    const url = buildUrl({ path: "/search" });
    expect(() => new URL(url)).not.toThrow();
  });

  it("числовые значения params корректно преобразуются в строку", () => {
    const url = buildUrl({
      path: "/search",
      params: { [GuardianRequestParams.PAGE_SIZE]: 42 },
    });
    const parsed = new URL(url);
    expect(parsed.searchParams.get("page-size")).toBe("42");
  });

  it("возвращает строку", () => {
    expect(typeof buildUrl({ path: "/search" })).toBe("string");
  });

  it("путь корректно подставляется к baseUrl", () => {
    const url = buildUrl({ path: "/articles/my-section/my-article" });
    expect(url).toContain(
      "https://content.guardianapis.com/articles/my-section/my-article"
    );
  });
});
