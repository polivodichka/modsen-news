import { normalizeImageUrl } from "../normalize-image-url";

describe("normalizeImageUrl", () => {
  it("добавляет https: к protocol-relative URL", () => {
    expect(normalizeImageUrl("//example.com/image.jpg")).toBe(
      "https://example.com/image.jpg"
    );
  });

  it("не меняет абсолютный https URL", () => {
    expect(normalizeImageUrl("https://example.com/image.jpg")).toBe(
      "https://example.com/image.jpg"
    );
  });

  it("не меняет http URL", () => {
    expect(normalizeImageUrl("http://example.com/image.jpg")).toBe(
      "http://example.com/image.jpg"
    );
  });
});
