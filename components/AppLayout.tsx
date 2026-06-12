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
        <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant bg-surface/80 backdrop-blur-md">
          <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="font-heading text-title-md font-bold text-primary"
              aria-label="ChefCost logo"
            >
              ChefCost
            </button>
            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => navigate(item.href)}
                  className={`rounded-chef px-3 py-1.5 font-heading text-label-md transition ${
                    isActive(item.href)
                      ? "bg-primary text-white shadow-chef-sm"
                      : "text-onSurface-variant hover:bg-surface-container-low hover:text-primary"
                  }`}
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-full border border-outline-variant bg-surface-container-lowest p-0.5 sm:flex">
              {(["id", "en"] as const).map((lng) => (
                <button
                  key={lng}
                  type="button"
                  onClick={() => setLanguage(lng)}
                  className={`rounded-full px-3 py-1 font-heading text-label-md font-medium transition ${
                    settings.language === lng
                      ? "bg-primary text-white"
                      : "text-onSurface-variant hover:text-primary"
                  }`}
                  aria-pressed={settings.language === lng}
                >
                  {t(`lang.${lng}`)}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigate("/saved-recipes")}
              className="hidden font-heading text-label-md font-medium text-onSurface-variant transition-colors hover:bg-surface-container-lowest hover:text-primary sm:block sm:px-2 sm:py-1.5"
            >
              {t("landing.navLogin", "Login")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/calculator")}
              className="hidden rounded-chef-lg bg-primary px-4 py-2 font-heading text-label-md font-bold text-white shadow-chef-sm transition hover:bg-[#26604a] sm:block"
            >
              {t("landing.navGetStarted", "Get Started")}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="grid h-9 w-9 place-items-center rounded-chef text-onSurface-variant transition hover:bg-surface-container-low sm:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-outline-variant bg-surface sm:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => navigate(item.href)}
                  className={`rounded-chef px-3 py-2.5 text-left font-heading text-base font-medium transition ${
                    isActive(item.href)
                      ? "bg-primary text-white"
                      : "text-onSurface-variant hover:bg-surface-container-lowest hover:text-primary"
                  }`}
                >
                  {t(item.key)}
                </button>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-outline-variant pt-3">
                <div className="flex items-center gap-1 self-start rounded-full border border-outline-variant bg-surface-container-lowest p-0.5">
                  {(["id", "en"] as const).map((lng) => (
                    <button
                      key={lng}
                      type="button"
                      onClick={() => setLanguage(lng)}
                      className={`rounded-full px-3 py-1 font-heading text-label-md font-medium transition ${
                        settings.language === lng
                          ? "bg-primary text-white"
                          : "text-onSurface-variant hover:text-primary"
                      }`}
                      aria-pressed={settings.language === lng}
                    >
                      {t(`lang.${lng}`)}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/saved-recipes")}
                  className="w-full rounded-chef-lg border border-outline px-4 py-2.5 text-left font-heading text-label-md font-medium text-onSurface-variant transition hover:bg-surface-container-lowest"
                >
                  {t("landing.navLogin", "Login")}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/calculator")}
                  className="w-full rounded-chef-lg bg-primary px-4 py-2.5 font-heading text-label-md font-bold text-white shadow-chef-sm transition hover:bg-[#26604a]"
                >
                  {t("landing.navGetStarted", "Get Started")}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      )}

      <main className={`w-full pb-6 sm:pb-8 ${isLanding ? "" : "px-4 pt-20 sm:px-6 sm:pt-24"}`}>
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
