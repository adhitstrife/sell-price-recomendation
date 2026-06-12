# Task 024: App Layout & Routing

**Phase:** 5 - Pages & Layout
**Duration:** 60 minutes
**Status:** Pending

---

## Title
Implement Root App Layout with Providers, Navigation, and Toast Notifications

---

## Description

Create the root layout component that wraps all pages with context providers, navigation header, and a global toast/alert notification system.

**What will be done:**
1. Update `app/layout.tsx` with all providers
2. Create a Layout wrapper component with header/navigation
3. Implement global AlertProvider for success/error toasts
4. Add navigation header (app title + links)
5. Wire RecipeProvider, SettingsProvider, I18nextProvider
6. Ensure all contexts are properly nested
7. Add "Back to Home" navigation on SavedRecipesPage
8. Handle html lang attribute synced with settings

**Why this matters:**
- Required for all pages to access contexts (Recipe, Settings, i18n)
- Navigation enables page switching
- Alert system provides user feedback (save success, delete confirm, errors)
- Blocks: Phase 6 features (LanguageToggle, ErrorBoundary), Phase 7 (full styling)

---

## Dependencies

- Task 014: RecipeProvider
- Task 015: SettingsProvider
- Task 003: I18nProvider (i18n/config.ts)
- Task 022: HomePage (page to serve)
- Task 023: SavedRecipesPage (page to route to)
- Task 001: Next.js App Router structure

---

## Acceptance Criteria

✓ **Provider Setup:**
- [ ] I18nProvider wraps everything (outermost)
- [ ] SettingsProvider inside I18nProvider
- [ ] RecipeProvider inside SettingsProvider
- [ ] All pages render with context access
- [ ] No provider nesting errors

✓ **Navigation:**
- [ ] Header visible on all pages
- [ ] App title in header (clickable → HomePage)
- [ ] "Saved Recipes" link in header
- [ ] Current page visually indicated (if applicable)
- [ ] Smooth navigation between HomePage and SavedRecipesPage

✓ **Alert/Toast System:**
- [ ] Global AlertContext created in contexts/AlertContext.tsx
- [ ] AlertProvider in layout
- [ ] UseAlert hook available
- [ ] Success toasts (green, auto-dismiss after 3s)
- [ ] Error alerts (red, dismissable)
- [ ] Info messages (blue, dismissable)
- [ ] Multiple alerts properly stacked

✓ **Layout Structure:**
- [ ] Header/navbar at top
- [ ] Main content area (full height)
- [ ] Optional footer (basic, ~20px)
- [ ] Alert container fixed at top-right or top-center

✓ **HTML Attributes:**
- [ ] html lang attribute synced with SettingsContext language
- [ ] document.documentElement.lang updated on language change

✓ **Error Handling:**
- [ ] Error boundary wraps main content (catches component errors)
- [ ] Graceful fallback UI on error

---

## Technical Notes

### Provider Nesting Order

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { SettingsProvider } from "@/contexts/SettingsContext";
import I18nProvider from "@/lib/I18nProvider";
import { RecipeProvider } from "@/contexts/RecipeContext";
import { AlertProvider } from "@/contexts/AlertContext";
import AppLayout from "@/components/AppLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalkulator Harga Jual",
  description: "Hitung harga jual optimal untuk menu makanan Anda",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <I18nProvider>
          <SettingsProvider>
            <RecipeProvider>
              <AlertProvider>
                <AppLayout>{children}</AppLayout>
              </AlertProvider>
            </RecipeProvider>
          </SettingsProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
```

### AlertContext

```tsx
// contexts/AlertContext.tsx
"use client";

interface Alert {
  id: string;
  type: "success" | "error" | "info";
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

// Success: auto-dismiss after 3 seconds
// Error: dismissible by user (X button)
// Info: dismissible by user (X button)
// IDs generated via Date.now() + Math.random()
```

### AppLayout Component

```tsx
// components/AppLayout.tsx
"use client";

import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";
import { useAlert } from "@/contexts/AlertContext";
import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { alerts, dismiss } = useAlert();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <nav className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="text-lg font-bold text-primary hover:underline"
          >
            {t("app.title")}
          </button>
          <div className="flex items-center gap-4">
            {pathname !== "/saved-recipes" && (
              <button
                onClick={() => router.push("/saved-recipes")}
                className="text-sm text-secondary hover:text-primary"
              >
                {t("btn.saved_recipes", "Resep Tersimpan")}
              </button>
            )}
            {pathname !== "/" && (
              <button
                onClick={() => router.push("/")}
                className="text-sm text-secondary hover:text-primary"
              >
                {t("btn.back", "Kembali")}
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-6 w-full">
        {children}
      </main>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="fixed top-4 right-4 space-y-2 z-50">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`px-4 py-3 rounded-lg shadow-lg text-white ${
                alert.type === "success" ? "bg-green-600" :
                alert.type === "error" ? "bg-red-600" : "bg-blue-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{alert.message}</span>
                {alert.dismissible && (
                  <button onClick={() => dismiss(alert.id)}>✕</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Routing Structure

| Path | Component | Provider Access |
|------|-----------|----------------|
| `/` | HomePage (Calculator) | Recipe, Settings, i18n |
| `/saved-recipes` | SavedRecipesPage | Recipe, Settings, i18n |

---

## Testing Requirements

✓ **Layout Tests:**
- [ ] Header renders app title
- [ ] Navigation link to /saved-recipes exists on home page
- [ ] Navigation link to / exists on saved-recipes page
- [ ] Click app title navigates to /

✓ **Alert Tests:**
- [ ] showSuccess displays green alert
- [ ] Success alert auto-dismisses after 3 seconds
- [ ] showError displays red alert
- [ ] Error alert is dismissible
- [ ] Multiple alerts stack correctly

✓ **Provider Tests:**
- [ ] useRecipe works inside layout (not just test wrapper)
- [ ] useSettings works inside layout
- [ ] useTranslation works inside layout

✓ **Test Files:**
- [ ] `tests/contexts/AlertContext.test.tsx`
- [ ] `tests/components/AppLayout.test.tsx`

---

## Deliverables

- [ ] `contexts/AlertContext.tsx` with AlertProvider and useAlert hook
- [ ] `components/AppLayout.tsx` with header, content area, alerts
- [ ] `app/layout.tsx` updated with all providers
- [ ] `tests/contexts/AlertContext.test.tsx` with alert tests
- [ ] `tests/components/AppLayout.test.tsx` with layout/navigation tests
- [ ] No TypeScript errors
- [ ] All pages render correctly with layout

---

## Code Quality Checklist

- [ ] "use client" on all client components
- [ ] Providers nested in correct order
- [ ] alert.id uses unique pattern (crypto.randomUUID or timestamp+random)
- [ ] setTimeout for auto-dismiss cleanup (clearTimeout on unmount/dismiss)
- [ ] No hardcoded strings (all via useTranslation)
- [ ] Accessible: focus management on modals/alerts
- [ ] AppLayout follows Next.js App Router conventions
- [ ] max-w-4xl centered content (consistent width across pages)

---

## Notes

- Do NOT add LanguageToggle to header yet (Task 025)
- Do NOT implement full styling/theme (Task 028-030)
- Auto-dismiss timer must be cleaned up on unmount
- Alert stacking: newest at top of right-side column
- Keep Alerts simple — no complex animation/transitions needed
- I18nProvider must be outermost to be available everywhere

---

## Next Tasks

**Unblocks:**
- Task 025: LanguageToggle component
- Task 026: RecipeList component extraction
- Task 027: Error boundaries
- Task 028: Tailwind styling & responsive
- Task 029: Global styles & theme

---

**End of Task 024**
