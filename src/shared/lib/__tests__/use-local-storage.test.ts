import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../use-local-storage";

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: mockGetItem,
      setItem: mockSetItem,
      removeItem: mockRemoveItem,
    },
    writable: true,
  });
});

describe("useLocalStorage", () => {
  it("возвращает начальное значение, если localStorage пуст", () => {
    mockGetItem.mockReturnValue(null);
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("читает существующее значение из localStorage при инициализации", () => {
    mockGetItem.mockReturnValue(JSON.stringify("saved"));
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("saved");
  });

  it("сохраняет новое значение в localStorage и обновляет стейт", () => {
    mockGetItem.mockReturnValue(null);
    const { result } = renderHook(() => useLocalStorage("key", ""));

    act(() => {
      result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(mockSetItem).toHaveBeenCalledWith("key", JSON.stringify("newValue"));
  });

  it("корректно работает с объектами", () => {
    const initial = { name: "test", count: 0 };
    mockGetItem.mockReturnValue(null);
    const { result } = renderHook(() => useLocalStorage("key", initial));

    act(() => {
      result.current[1]({ name: "updated", count: 5 });
    });

    expect(result.current[0]).toEqual({ name: "updated", count: 5 });
    expect(mockSetItem).toHaveBeenCalledWith(
      "key",
      JSON.stringify({ name: "updated", count: 5 })
    );
  });

  it("корректно работает с массивами", () => {
    mockGetItem.mockReturnValue(JSON.stringify([1, 2, 3]));
    const { result } = renderHook(() => useLocalStorage<number[]>("key", []));
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it("возвращает начальное значение при невалидном JSON в localStorage", () => {
    mockGetItem.mockReturnValue("not valid json{{{");
    const { result } = renderHook(() => useLocalStorage("key", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });

  it("не падает при ошибке записи в localStorage", () => {
    mockGetItem.mockReturnValue(null);
    mockSetItem.mockImplementation(() => {
      throw new Error("Storage is full");
    });

    const { result } = renderHook(() => useLocalStorage("key", "initial"));

    expect(() => {
      act(() => {
        result.current[1]("newValue");
      });
    }).not.toThrow();
  });

  it("возвращает начальное значение на сервере (window === undefined)", () => {
    const { window } = global;
    // @ts-expect-error — симуляция SSR окружения
    delete global.window;

    const { result } = renderHook(() => useLocalStorage("key", "ssr-default"));
    expect(result.current[0]).toBe("ssr-default");

    global.window = window;
  });

  it("корректно работает с булевыми значениями", () => {
    mockGetItem.mockReturnValue(JSON.stringify(false));
    const { result } = renderHook(() => useLocalStorage("key", true));
    expect(result.current[0]).toBe(false);
  });

  it("корректно работает с числами включая 0", () => {
    mockGetItem.mockReturnValue(JSON.stringify(0));
    const { result } = renderHook(() => useLocalStorage("key", 42));
    expect(result.current[0]).toBe(0);
  });
});
