import { formatDate } from "../format-date";

describe("formatDate", () => {
  it("возвращает строку содержащую год", () => {
    expect(formatDate("2025-11-20T00:00:00Z")).toContain("20.11.2025");
  });
});
