# Task 003: Setup i18n Configuration

**Phase:** 1 - Foundation  
**Duration:** 45 minutes  
**Status:** Completed (2026-06-10)

---

## Title
Configure i18n (react-i18next) with Base Translation Files

---

## Description

Set up multi-language support infrastructure with Indonesian (default) and English translations.

**What will be done:**
1. Install react-i18next and i18next dependencies
2. Create i18n configuration file
3. Create Indonesian translation file (id.json)
4. Create English translation file (en.json)
5. Initialize i18n in main.tsx
6. Create base translation keys for entire app
7. Verify language toggle capability

**Why this matters:**
- Project requirement: Indonesian + English support
- Default language: Indonesian (id)
- Blocks: All UI components (Task 014-030) need translation keys
- All UI text must use i18n (CLAUDE.md requirement)

---

## Dependencies

- Task 001: Vite project setup
- Task 002: TypeScript types (for PricingMethod type)

---

## Acceptance Criteria

✓ **Installation:**
- [x] `react-i18next` and `i18next` installed
- [x] Dev dependencies: `i18next-browser-languagedetector` installed (optional, for auto-detection)

✓ **Configuration Files Created:**
- [x] `i18n/id.json` (Indonesian translations)
- [x] `i18n/en.json` (English translations)
- [x] `next-i18next.config.js` (i18next initialization)

✓ **Translation Keys Defined:**
- [x] `app.title`, `app.subtitle`
- [x] `form.*` (ingredient, cost, labor labels)
- [x] `button.*` (save, delete, reset, etc.)
- [x] `result.*` (cost labels, pricing labels)
- [x] `method.*` (Food Cost, Markup, Market)
- [x] `labor.*` (Model A, Model B, hour rate, etc.)
- [x] `error.*` (validation messages)
- [x] `placeholder.*` (form placeholders)

✓ **Integration:**
- [x] i18n initialized in `next-i18next.config.js`
- [x] Language defaults to 'id' (Indonesian)
- [x] Language preference can persist in localStorage
- [x] `useTranslation()` hook ready for components via next-i18next

✓ **Testing:**
- [x] No console errors on app load
- [x] Both languages have identical key structure
- [x] Language toggle works (simulate by changing localStorage language)

---

## Technical Notes

### Installation Commands

```bash
npm install i18next react-i18next
npm install -D i18next-browser-languagedetector
```

### File Structure

```
src/
├── i18n/
│   ├── config.ts          # Configuration
│   ├── id.json            # Indonesian translations
│   └── en.json            # English translations
└── main.tsx               # Initialize i18n before render
```

### Key Categories

**app:** Application branding
- `app.title` → "Kalkulator Harga Jual Optimal"
- `app.subtitle` → "Tentukan harga jual menu makanan dengan tepat"

**form:** Form labels and inputs
- `form.ingredientName`
- `form.pricePerUnit`
- `form.amountPerPortion`
- `form.packagingCost`
- `form.overheadCost`
- `form.laborCost`
- etc.

**button:** Button labels
- `button.save`
- `button.delete`
- `button.reset`
- `button.add`
- `button.edit`
- `button.cancel`

**result:** Result display labels
- `result.totalCost`
- `result.suggestedPrice`
- `result.marketRange`
- `result.profitMargin`
- etc.

**method:** Pricing method names
- `method.foodCost`
- `method.markup`
- `method.market`

**labor:** Labor calculation
- `labor.modelA`
- `labor.modelB`
- `labor.hourlyRate`
- `labor.timeInMinutes`
- etc.

**error:** Error messages
- `error.requiredField`
- `error.invalidNumber`
- `error.negativeCost`
- `error.storageQuotaExceeded`

### Configuration Example Structure

```typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import id from './id.json';
import en from './en.json';

i18n.use(initReactI18next).init({
  resources: { id: { translation: id }, en: { translation: en } },
  lng: localStorage.getItem('language') || 'id',
  fallbackLng: 'id',
  interpolation: { escapeValue: false },
});

export default i18n;
```

### Language Key Naming Convention

- Hierarchical: `namespace.category.item`
- Lowercase with dots
- Example: `form.ingredient.name`, `button.save`

---

## Testing Requirements

✓ **Manual Verification:**
1. App loads without console errors
2. Can access keys via `useTranslation()` hook: `const { t } = useTranslation()`
3. `t('app.title')` returns correct Indonesian text
4. Change localStorage language to 'en': `localStorage.setItem('language', 'en')`
5. Reload page → translations should change (if UI uses translations)

✓ **No Automated Tests** (configuration phase)

---

## Deliverables

- [x] `i18n/` directory with id.json, en.json
- [x] i18n initialized via next-i18next.config.js
- [x] 80+ translation keys defined in both languages across 10 categories
- [x] Language persistence ready for components to implement
- [x] No TypeScript errors in i18n config

---

## Translation Requirements

**Both id.json and en.json must have:**
- Identical key structures (no keys in one but not the other)
- Professional, clear language appropriate for business users
- Currency references use Rp for Indonesian context
- Labels concise but descriptive

**Indonesian Focus:**
- Primary language (default)
- Natural Indonesian terminology for food business
- Use common food industry terms

**English Focus:**
- Professional English
- Clear for non-native speakers
- Transliteration where cultural terms used

---

## Notes

- Do NOT hardcode any UI text in components (will be enforced in linting)
- Add translation keys progressively as components are built
- Keep this file as single source of truth for all user-visible text
- Language preference auto-load from localStorage
- No need for pluralization or advanced i18n features for v1

---

## Next Tasks

**Unblocks:**
- Task 014-021: All UI components (depend on i18n keys)
- Task 025: LanguageToggle component
- Task 027: Error messages

---

**End of Task 003**
