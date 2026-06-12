# Fix-001: Remove Stale i18n Config & Fix Language Switch

## Issue
- `http://localhost:3001/en` returns 404
- Language toggle doesn't change translations until page reload

## Root Causes

### Cause 1: Dead Pages Router i18n config in `next.config.js`
The `i18n` config block (`locales: ["id", "en"], defaultLocale: "id"`) is a **Pages Router** feature. Next.js App Router ignores it entirely. No middleware or `[locale]` route group exists to handle `/en`, so the route 404s.

### Cause 2: `SettingsContext.setLanguage` doesn't trigger i18next
The `setLanguage` function in `contexts/SettingsContext.tsx` persists the language to localStorage and updates `<html lang>`, but **never calls `i18n.changeLanguage()`**. This means `react-i18next` doesn't know the language changed, so `useTranslation()` hooks don't re-render with new translations until page reload.

Meanwhile `i18n/config.ts` exports a `changeLanguage` function that does everything correctly (calls `i18n.changeLanguage()`, updates localStorage, updates `<html lang>`) — it just isn't wired into `SettingsContext`.

## Changes

### 1. `next.config.js` — Remove i18n block
Delete lines 3-6 (`i18n: { locales: [...], defaultLocale: "id" }`). This config does nothing in App Router and misleads developers.

### 2. `next-i18next.config.js` — Delete file
This file only re-exports the i18n block from `next.config.js` (via `require`). No code imports it. Keeping it would crash once the i18n config is removed from `next.config.js`.

### 3. `contexts/SettingsContext.tsx` — Wire in changeLanguage
- Import `changeLanguage` from `@/i18n/config`
- Call it inside `setLanguage` after updating state
- This fixes the language-switch-not-working-until-reload bug

## Files Changed
| File | Action |
|------|--------|
| `next.config.js` | Edit (remove 3 lines) |
| `next-i18next.config.js` | Delete |
| `contexts/SettingsContext.tsx` | Edit (add import + call) |

## Verification
1. `npm run typecheck` — 0 errors
2. `npm run lint` — 0 errors
3. `npm test` — all existing tests pass (SettingsContext tests only check state/localStorage, unaffected)
4. `npm run build` — production build succeeds
5. Manual: language toggle immediately changes UI text without page reload
