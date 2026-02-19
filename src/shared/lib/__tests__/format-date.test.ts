import { formatDate } from "../format-date";

describe("formatDate", () => {
  it("форматирует дату в формат ДД.ММ.ГГГГ", () => {
    expect(formatDate("2025-11-20T00:00:00Z")).toContain("20.11.2025");
  });

  it("корректно форматирует дату с однозначным днём и месяцем", () => {
    expect(formatDate("2021-03-05T00:00:00Z")).toContain("05.03.2021");
  });

  it("корректно форматирует первый день года", () => {
    expect(formatDate("2023-01-01T00:00:00Z")).toContain("01.01.2023");
  });

  it("корректно форматирует последний день года", () => {
    expect(formatDate("2023-12-31T00:00:00Z")).toContain("31.12.2023");
  });

  it("возвращает строку", () => {
    expect(typeof formatDate("2025-06-15T12:00:00Z")).toBe("string");
  });
});
