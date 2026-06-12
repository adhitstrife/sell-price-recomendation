import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { type ReactNode } from "react";
import { AlertProvider, useAlert } from "../../contexts/AlertContext";

const wrapper = ({ children }: { children: ReactNode }) => (
  <AlertProvider>{children}</AlertProvider>
);

beforeEach(() => {
  vi.useFakeTimers();
});

describe("AlertProvider", () => {
  it("starts with empty alerts", () => {
    const { result } = renderHook(() => useAlert(), { wrapper });
    expect(result.current.alerts).toEqual([]);
  });
});

describe("useAlert", () => {
  it("throws when used outside provider", () => {
    expect(() => renderHook(() => useAlert())).toThrow("useAlert must be used within an AlertProvider");
  });
});

describe("showSuccess", () => {
  it("adds success alert", () => {
    const { result } = renderHook(() => useAlert(), { wrapper });
    act(() => {
      result.current.showSuccess("Saved!");
    });
    expect(result.current.alerts).toHaveLength(1);
    expect(result.current.alerts[0].type).toBe("success");
    expect(result.current.alerts[0].message).toBe("Saved!");
  });

  it("auto-dismisses after 3 seconds", () => {
    const { result } = renderHook(() => useAlert(), { wrapper });
    act(() => {
      result.current.showSuccess("Auto dismiss");
    });
    expect(result.current.alerts).toHaveLength(1);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.alerts).toHaveLength(0);
  });
});

describe("showError", () => {
  it("adds error alert", () => {
    const { result } = renderHook(() => useAlert(), { wrapper });
    act(() => {
      result.current.showError("Failed!");
    });
    expect(result.current.alerts).toHaveLength(1);
    expect(result.current.alerts[0].type).toBe("error");
  });

  it("does not auto-dismiss", () => {
    const { result } = renderHook(() => useAlert(), { wrapper });
    act(() => {
      result.current.showError("Stays");
    });
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.alerts).toHaveLength(1);
  });
});

describe("showInfo", () => {
  it("adds info alert", () => {
    const { result } = renderHook(() => useAlert(), { wrapper });
    act(() => {
      result.current.showInfo("Info message");
    });
    expect(result.current.alerts).toHaveLength(1);
    expect(result.current.alerts[0].type).toBe("info");
  });
});

describe("dismiss", () => {
  it("removes alert by id", () => {
    const { result } = renderHook(() => useAlert(), { wrapper });
    let id: string = "";
    act(() => {
      result.current.showError("To dismiss");
    });
    id = result.current.alerts[0].id;
    act(() => {
      result.current.dismiss(id);
    });
    expect(result.current.alerts).toHaveLength(0);
  });
});