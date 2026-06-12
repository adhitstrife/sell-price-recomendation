"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { AppSettings } from "@/lib/types";
import { loadSettings, saveSettings } from "@/lib/storage";
import { changeLanguage } from "@/i18n/config";

interface SettingsContextType {
  settings: AppSettings;
  setLanguage: (lang: "id" | "en") => void;
  setLastRecipeId: (id: string | undefined) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: AppSettings = { language: "id" };

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const loaded = loadSettings();
    return loaded ?? DEFAULT_SETTINGS;
  });

  const persist = useCallback((next: AppSettings): void => {
    setSettings(next);
    try {
      saveSettings(next);
    } catch {
    }
  }, []);

  const setLanguage = useCallback(
    (lang: "id" | "en"): void => {
      persist({ ...settings, language: lang });
      changeLanguage(lang);
    },
    [settings, persist]
  );

  const setLastRecipeId = useCallback(
    (id: string | undefined): void => {
      persist({ ...settings, lastRecipeId: id });
    },
    [settings, persist]
  );

  const updateSettings = useCallback(
    (updates: Partial<AppSettings>): void => {
      persist({ ...settings, ...updates });
    },
    [settings, persist]
  );

  const resetSettings = useCallback((): void => {
    persist(DEFAULT_SETTINGS);
  }, [persist]);

  const value: SettingsContextType = {
    settings,
    setLanguage,
    setLastRecipeId,
    updateSettings,
    resetSettings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

const useSettings = (): SettingsContextType => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
};

export { SettingsContext, SettingsProvider, useSettings };