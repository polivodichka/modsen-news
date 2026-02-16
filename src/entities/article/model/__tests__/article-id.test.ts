import { encodeArticleId, decodeArticleId } from "../article-id";

describe("encodeArticleId", () => {
  it("кодирует строковый id в base64 url-safe формат", () => {
    const id = "article-123";

    const encoded = encodeArticleId(id);

    expect(encoded).not.toBe(id);
    expect(encoded).not.toContain("+");
    expect(encoded).not.toContain("/");
    expect(encoded).not.toContain("=");
  });

  it("возвращает одинаковый результат для одинакового id", () => {
    const id = "test-id";

    const encoded1 = encodeArticleId(id);
    const encoded2 = encodeArticleId(id);

    expect(encoded1).toBe(encoded2);
  });
});

describe("decodeArticleId", () => {
  it("декодирует ранее закодированный id", () => {
    const id = "article-123";

    const encoded = encodeArticleId(id);
    const decoded = decodeArticleId(encoded);

    expect(decoded).toBe(id);
  });

  it('корректно работает со строками с символами "-", "_"', () => {
    const id = "article_test-id";

    const encoded = encodeArticleId(id);
    const decoded = decodeArticleId(encoded);

    expect(decoded).toBe(id);
  });
});
