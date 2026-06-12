import { describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { type ReactNode } from "react";
import { SettingsProvider, useSettings } from "../../contexts/SettingsContext";

const wrapper = ({ children }: { children: ReactNode }) => (
  <SettingsProvider>{children}</SettingsProvider>
);

beforeEach(() => {
  localStorage.clear();
});

describe("SettingsProvider", () => {
  it("uses default language 'id' when no settings exist", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });
    expect(result.current.settings.language).toBe("id");
    expect(result.current.settings.lastRecipeId).toBeUndefined();
  });

  it("loads existing settings from storage", () => {
    localStorage.setItem("settings", JSON.stringify({ language: "en", lastRecipeId: "r1" }));
    const { result } = renderHook(() => useSettings(), { wrapper });
    expect(result.current.settings.language).toBe("en");
    expect(result.current.settings.lastRecipeId).toBe("r1");
  });
});

describe("useSettings", () => {
  it("throws when used outside SettingsProvider", () => {
    expect(() => renderHook(() => useSettings())).toThrow(
      "useSettings must be used within a SettingsProvider"
    );
  });
});

describe("setLanguage", () => {
  it("updates language and persists to storage", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });
    act(() => {
      result.current.setLanguage("en");
    });
    expect(result.current.settings.language).toBe("en");
    const stored = JSON.parse(localStorage.getItem("settings") || "{}");
    expect(stored.language).toBe("en");
  });
});

describe("setLastRecipeId", () => {
  it("updates lastRecipeId", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });
    act(() => {
      result.current.setLastRecipeId("recipe-1");
    });
    expect(result.current.settings.lastRecipeId).toBe("recipe-1");
  });

  it("clears lastRecipeId when undefined", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });
    act(() => {
      result.current.setLastRecipeId("r1");
    });
    act(() => {
      result.current.setLastRecipeId(undefined);
    });
    expect(result.current.settings.lastRecipeId).toBeUndefined();
  });
});

describe("updateSettings", () => {
  it("merges partial updates", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });
    act(() => {
      result.current.updateSettings({ language: "en" });
    });
    act(() => {
      result.current.updateSettings({ lastRecipeId: "r5" });
    });
    expect(result.current.settings.language).toBe("en");
    expect(result.current.settings.lastRecipeId).toBe("r5");
  });
});

describe("resetSettings", () => {
  it("resets to defaults", () => {
    localStorage.setItem("settings", JSON.stringify({ language: "en", lastRecipeId: "r1" }));
    const { result } = renderHook(() => useSettings(), { wrapper });
    act(() => {
      result.current.resetSettings();
    });
    expect(result.current.settings.language).toBe("id");
    expect(result.current.settings.lastRecipeId).toBeUndefined();
  });
});