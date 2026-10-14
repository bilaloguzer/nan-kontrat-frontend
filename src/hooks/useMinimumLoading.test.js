import { renderHook, act } from "@testing-library/react";
import { useMinimumLoading } from "./useMinimumLoading";

describe("useMinimumLoading", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("stays true while data is loading", () => {
    const { result } = renderHook(() => useMinimumLoading(true, 400));
    act(() => jest.advanceTimersByTime(1000));
    expect(result.current).toBe(true);
  });

  it("stays true until the minimum time has passed, even if data is ready", () => {
    const { result, rerender } = renderHook(
      ({ loading }) => useMinimumLoading(loading, 400),
      { initialProps: { loading: true } }
    );
    rerender({ loading: false });
    expect(result.current).toBe(true);
    act(() => jest.advanceTimersByTime(399));
    expect(result.current).toBe(true);
    act(() => jest.advanceTimersByTime(1));
    expect(result.current).toBe(false);
  });

  it("turns false right away when data is ready after the minimum time", () => {
    const { result, rerender } = renderHook(
      ({ loading }) => useMinimumLoading(loading, 400),
      { initialProps: { loading: true } }
    );
    act(() => jest.advanceTimersByTime(1000));
    rerender({ loading: false });
    expect(result.current).toBe(false);
  });
});
