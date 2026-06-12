"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export type AlertType = "success" | "error" | "info";

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  dismissible: boolean;
}

interface AlertContextType {
  alerts: Alert[];
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  dismiss: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const AUTO_DISMISS_MS = 3000;

const generateId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `alert-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

interface AlertProviderProps {
  children: ReactNode;
}

const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string): void => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (type: AlertType, message: string, autoDismiss: boolean): void => {
      const id = generateId();
      const alert: Alert = { id, type, message, dismissible: true };
      setAlerts((prev) => [...prev, alert]);
      if (autoDismiss) {
        const timer = setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
        timers.current.set(id, timer);
      }
    },
    [dismiss]
  );

  const showSuccess = useCallback((message: string): void => push("success", message, true), [push]);
  const showError = useCallback((message: string): void => push("error", message, false), [push]);
  const showInfo = useCallback((message: string): void => push("info", message, false), [push]);

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);

  const value: AlertContextType = { alerts, showSuccess, showError, showInfo, dismiss };
  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};

const useAlert = (): AlertContextType => {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return ctx;
};

export { AlertContext, AlertProvider, useAlert };