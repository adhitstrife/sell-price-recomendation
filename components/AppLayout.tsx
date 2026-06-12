"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { useAlert } from "@/contexts/AlertContext";
import { useSettings } from "@/contexts/SettingsContext";

interface AppLayoutProps {
  children: ReactNode;
}

const navItems: Array<{ href: string; key: string }> = [
  { href: "/", key: "page.home" },
  { href: "/calculator", key: "page.calculator" },
  { href: "/saved-recipes", key: "page.savedRecipes" },
];

const AppLayout = ({ children }: AppLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { alerts, dismiss } = useAlert();
  const { settings, setLanguage } = useSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLanding = pathname === "/";

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href) ?? false;
  };

  const navigate = (href: string): void => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-surface text-onSurface">
      {!isLanding && (
        <header className="sticky top-0 z-30 border-b border-primary/20 bg-primary text-white shadow-chef-sm">
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-left font-heading text-base font-bold text-white transition hover:text-white/80 sm:text-lg"
            aria-label="Home"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-chef bg-white/15 text-base"
              aria-hidden="true"
            >
              🧑‍🍳
            </span>
            <span className="hidden xs:inline sm:inline">
              {t("app.title")}
            </span>
            <span className="inline xs:hidden sm:hidden">KHJ</span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => navigate(item.href)}
                className={`rounded-chef px-3 py-1.5 text-sm font-semibold transition ${
                  isActive(item.href)
                    ? "bg-white text-primary shadow-chef-sm"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t(item.key)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-full border border-white/20 bg-white/5 p-0.5 sm:flex">
              {(["id", "en"] as const).map((lng) => (
                <button
                  key={lng}
                  type="button"
                  onClick={() => setLanguage(lng)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase transition ${
                    settings.language === lng
                      ? "bg-white text-primary"
                      : "text-white/80 hover:text-white"
                  }`}
                  aria-pressed={settings.language === lng}
                >
                  {lng}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="grid h-9 w-9 place-items-center rounded-chef bg-white/10 text-white transition hover:bg-white/20 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Menu</span>
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-primary md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => navigate(item.href)}
                  className={`rounded-chef px-3 py-2.5 text-left text-sm font-semibold transition ${
                    isActive(item.href)
                      ? "bg-white text-primary"
                      : "text-white/85 hover:bg-white/10"
                  }`}
                >
                  {t(item.key)}
                </button>
              ))}
              <div className="mt-2 flex items-center gap-1 rounded-full border border-white/20 bg-white/5 p-0.5 self-start">
                {(["id", "en"] as const).map((lng) => (
                  <button
                    key={lng}
                    type="button"
                    onClick={() => setLanguage(lng)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase transition ${
                      settings.language === lng
                        ? "bg-white text-primary"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {t(`lang.${lng}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
      )}

      <main className={`w-full px-4 py-6 sm:px-6 sm:py-8 ${isLanding ? "" : "mx-auto max-w-6xl"}`}>
        {children}
      </main>

      {alerts.length > 0 && (
        <div
          className="fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2"
          role="region"
          aria-label="Alerts"
        >
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-2 rounded-chef border px-4 py-3 text-sm shadow-chef-lg backdrop-blur animate-fade-in ${
                alert.type === "success"
                  ? "border-primary/30 bg-primary text-white"
                  : alert.type === "error"
                    ? "border-tertiary/30 bg-tertiary text-white"
                    : "border-secondary/30 bg-secondary text-white"
              }`}
              role="alert"
            >
              <span className="flex-1 font-medium">{alert.message}</span>
              {alert.dismissible && (
                <button
                  type="button"
                  onClick={() => dismiss(alert.id)}
                  aria-label="Dismiss"
                  className="text-white/90 transition hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppLayout;
