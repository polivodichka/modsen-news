import { cn } from "../cn";

describe("cn", () => {
  it("возвращает пустую строку без аргументов", () => {
    expect(cn()).toBe("");
  });

  it("возвращает один класс", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("объединяет несколько классов", () => {
    expect(cn("foo", "bar", "baz")).toBe("foo bar baz");
  });

  it("игнорирует falsy значения", () => {
    expect(cn("foo", null, undefined, false, "bar")).toBe("foo bar");
  });

  it("применяет условные классы через объект", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });

  it("применяет условные классы через массив", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });

  it("разрешает конфликты tailwind в пользу последнего класса", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("разрешает конфликты цветов tailwind", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("разрешает конфликты при условных классах", () => {
    expect(cn("p-4", { "p-8": true })).toBe("p-8");
  });

  it("не удаляет неконфликтующие tailwind классы", () => {
    expect(cn("p-4", "m-4")).toBe("p-4 m-4");
  });

  it("корректно обрабатывает смешанные входные данные", () => {
    expect(cn("foo", { bar: true, baz: false }, ["qux", null])).toBe(
      "foo bar qux"
    );
  });
});
