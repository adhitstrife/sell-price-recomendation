# CLAUDE.md - Harga Jual Menu Calculator Project Guide

**Last Updated:** 2026-06-10  
**Project:** Website Kalkulator Harga Jual Optimal Menu Makanan  
**Repository Root:** `d:\my projects\sell-price-recomendation`

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Business Objectives](#business-objectives)
3. [User Roles](#user-roles)
4. [Core Features](#core-features)
5. [Technical Architecture](#technical-architecture)
6. [Database Design Assumptions](#database-design-assumptions)
7. [API Design Principles](#api-design-principles)
8. [Security Requirements](#security-requirements)
9. [Performance Requirements](#performance-requirements)
10. [Coding Standards](#coding-standards)
11. [File Organization Rules](#file-organization-rules)
12. [Naming Conventions](#naming-conventions)
13. [TypeScript Rules](#typescript-rules)
14. [Error Handling Guidelines](#error-handling-guidelines)
15. [Testing Requirements](#testing-requirements)
16. [Documentation Requirements](#documentation-requirements)
17. [AI Workflow Instructions](#ai-workflow-instructions)
18. [Role-Specific Sections](#role-specific-sections)
19. [Project Constraints](#project-constraints)
20. [Do Not Guidelines](#do-not-guidelines)

---

## Project Overview

### Purpose
Website Kalkulator Harga Jual Optimal Menu Makanan is a browser-based price calculator tool designed for Indonesian food business owners (UMKM), home cooks, and small-scale caterers to determine optimal selling prices for menu items.

### Problem Statement
Most small food businesses determine prices through intuition or arbitrary mark-ups, leading to either:
- **Overpricing:** Reduced sales volume
- **Underpricing:** Insufficient profit margins

### Solution
This application provides a data-driven approach to price calculation using:
- Actual ingredient costs
- Non-ingredient operating expenses (overhead, labor, packaging)
- Multiple pricing methodologies (user-selectable)
- Market-based competitor pricing comparison

### Target Users
- UMKM food business owners
- Home cooks planning to commercialize products
- Small-scale catering business operators
- Typical age 25-55, technical literacy: beginner to intermediate

### Geographic Focus
- Primary: Indonesia (Indonesian language default)
- Secondary: English-speaking markets

---

## Business Objectives

### Primary Goals
1. **Democratize Price Optimization:** Enable non-financial users to calculate scientifically-based pricing
2. **Increase Profit Margins:** Help businesses avoid underpricing through structured cost analysis
3. **Reduce Decision Friction:** Provide immediate, clear pricing recommendations
4. **Enable Rapid Prototyping:** Allow users to test multiple pricing scenarios in seconds

### Secondary Goals
1. Build user trust through transparent, breakable cost calculations
2. Create foundation for future revenue models (premium features, SaaS)
3. Establish market data collection capability (competitor prices)

### Success Metrics (Not Implemented in v1, but inform architecture)
- DAU (Daily Active Users)
- Avg time spent per recipe calculation
- Repeat save rate (% of recipes saved)
- Feature adoption (% using market-based method)

---

## User Roles

### Role 1: First-Time User (New Recipe Creator)
**Scenario:** A home cook wants to sell homemade roti pratta for the first time
- Creates a new recipe from scratch
- Inputs ingredient costs (flour, butter, salt, etc.)
- Estimates labor time manually
- Selects markup or food cost method
- Gets price recommendation
- Saves recipe for future reference

### Role 2: Recurring User (Recipe Optimizer)
**Scenario:** Small warung owner optimizing existing menu prices
- Loads previously saved recipe
- Adjusts ingredient costs (prices fluctuate seasonally)
- Modifies labor allocation
- Compares market-based pricing against competitors
- Updates saved recipe with new prices

### Role 3: Power User (Multi-Menu Business)
**Scenario:** Small catering business managing 5-10 menu items
- Maintains library of saved recipes
- Frequently edits multiple recipes
- Uses market-based method to track competitor pricing
- May batch calculate prices for catering proposal

**Note:** v1 does not have user accounts, so "saved recipes" are browser-specific. All roles manage only one browser instance.

---

## Core Features

### Feature 1: Ingredient Input & Management
**Purpose:** Capture ingredient costs with precise unit conversions

**Requirements:**
- Add multiple ingredients to single recipe
- Per-ingredient data:
  - Name (free text, searchable)
  - Purchase unit (kg, liter, pack, pcs, etc.)
  - Price per purchase unit
  - Amount used per portion
  - Amount unit (may differ from purchase unit)
- Edit/delete individual ingredients
- Clear visual feedback when ingredient list is empty
- Ingredient persistence within recipe

**Validation Rules:**
- Ingredient name: required, non-empty string
- Price per unit: required, numeric, ≥ 0, ≤ 1,000,000 (Rp)
- All unit fields: must be from predefined list
- Amount per portion: required, numeric, > 0, ≤ 100,000

### Feature 2: Unit Conversion System
**Purpose:** Accurately convert between purchase units and recipe units

**Supported Unit Pairs:**
- kg ↔ gram (1 kg = 1,000 gram)
- liter ↔ ml (1 liter = 1,000 ml)
- pack ↔ pcs (user must specify pcs count per pack, or default to 1)
- sendok (tablespoon) ↔ gram (approximate: 1 sendok ≈ 15 gram)
- gelas (cup) ↔ ml (approximate: 1 gelas ≈ 240 ml)

**Edge Cases:**
- Same unit (gram → gram): conversion factor = 1
- Unspecified pack contents: default to 1 pcs/pack (warn user)
- Non-standard units: require manual entry or pre-conversion

**Formula:**
```
cost_per_portion = (price_per_unit / conversion_factor) × amount_per_portion
```

### Feature 3: Non-Ingredient Costs (Overhead & Labor)
**Purpose:** Include all costs beyond raw ingredients

**Overhead Subcategories:**
1. **Packaging per Portion:** Direct cost (bags, boxes, labels)
2. **Operational Overhead per Portion:** Allocated proportion of:
   - Rent/space
   - Utilities (gas, electricity, water)
   - Equipment maintenance
3. **Labor per Portion:** Two calculation models available

**Labor Calculation Models:**

**Model A: Per-Batch Time-Based**
```
labor_per_portion = (batch_time_minutes / 60) × hourly_rate / portions_per_batch
```
User inputs:
- Time to prepare/cook one batch (minutes)
- Hourly labor rate (Rp/hour)
- Portions produced per batch

Use case: Artisanal items (fried goods, pastries, dishes with high time variance)

**Model B: Monthly Allocation**
```
labor_per_portion = total_monthly_salary / estimated_monthly_portions
```
User inputs:
- Total monthly labor cost (employee salary, owner time allocation)
- Estimated portions produced per month

Use case: Established businesses with steady production

**Default Behavior:** Labor cost not included (0 Rp) unless explicitly enabled

### Feature 4: Pricing Method Selector (3 Methods)
**Purpose:** Provide multiple valuation approaches, user selects methodology

#### Method 1: Food Cost Percentage (Target Food Cost %)
**Concept:** Set maximum ingredient cost as % of selling price

**Formula:**
```
selling_price = total_modal / (target_food_cost_percent / 100)
```

**Example:**
- Total ingredient cost: Rp 10,000 per portion
- Target food cost: 30%
- Result: Rp 10,000 / 0.30 = Rp 33,333 → Round to Rp 33,500 or Rp 35,000

**Input Range:** 10% – 60% (validation)  
**Use Case:** Industries with standard margins (restaurants, catering)  
**Pros:**
- Industry-standard approach
- Directly controls profit margin
- Easy to adjust strategy

**Cons:**
- Ignores non-ingredient costs (if any)
- Requires knowledge of realistic industry percentages

#### Method 2: Markup Multiplier (Cost Multiplier)
**Concept:** Multiply total modal by fixed factor

**Formula:**
```
selling_price = total_modal × markup_multiplier
```

**Example:**
- Total cost per portion: Rp 10,000
- Markup multiplier: 3x
- Result: Rp 30,000

**Input Range:** 1.5x – 10x (validation)  
**Use Case:** Simple mental math, small businesses  
**Pros:**
- Simplest to understand
- Easy mental math
- Directly controllable

**Cons:**
- Doesn't account for non-ingredient costs proportionally
- May not align with market conditions

#### Method 3: Market-Based (Competitor Analysis)
**Concept:** Reference competitor prices, position product strategically

**Calculation:**
```
min_market_price = minimum(competitor_prices)
max_market_price = maximum(competitor_prices)
median_market_price = median(competitor_prices)
avg_market_price = average(competitor_prices)
recommendation_range = [min_market_price, max_market_price]
position = compare(calculated_price, avg_market_price)
```

**Inputs:** Array of 2–10 competitor prices (user enters manually)  
**Outputs:**
- Market range (min–max)
- Average/median market price
- Position relative to competitors ("below average", "at average", "above average")
- Recommendation zone (typically 70-90% of max, or user-selected)

**Use Case:** Mature markets, direct competitors exist  
**Pros:**
- Reality-based (actual market conditions)
- Enables competitive positioning
- Identifies market gaps

**Cons:**
- Requires market research (time cost)
- May not reflect own cost structure
- Competitor data may be inaccurate/stale

**UI/UX Approach:** Display all 3 methods as tabs or cards on same screen. User can toggle between methods to compare, but selects ONE for final recommendation.

### Feature 5: Result Display & Breakdown
**Purpose:** Show clear pricing recommendation with transparent cost breakdown

**Displays:**
- **Cost Breakdown (per portion):**
  - Total ingredient cost
  - Packaging cost
  - Overhead allocation
  - Labor cost
  - **Total Modal (sum)**
  
- **Pricing Results (per portion):**
  - Recommended price (Method 1)
  - Recommended price (Method 2)
  - Market range (Method 3)
  - **Final Recommendation** (highlighted)

- **Business Metrics (total recipe):**
  - Total revenue if all portions sold
  - Total profit if all portions sold
  - Profit margin %

### Feature 6: Recipe Save & Load (localStorage)
**Purpose:** Persist user-entered recipes locally for reuse

**Data Stored:**
- Recipe ID (UUID)
- Recipe name
- Portion count
- Ingredient list (full)
- Overhead config (full)
- Pricing config (full)
- Created timestamp
- Last updated timestamp

**Storage Mechanism:** `window.localStorage`, keyed by recipe UUID  
**Storage Quota:** ~5-10 MB (browser dependent)  
**Max Recipes:** Practical limit ~100-200 recipes before slowdown

**User Actions:**
- **Save:** Click "Save Recipe" button, prompt for name, store
- **Load:** Open "Saved Recipes" page, click recipe to open in calculator
- **Edit:** Modify loaded recipe, click "Update Recipe" to overwrite
- **Delete:** Confirm dialog, remove from localStorage
- **Duplicate:** Clone recipe with new UUID, rename with "(Copy)" suffix

**Export/Import (v2 Future):** Not in v1, but structure allows JSON export

### Feature 7: Multi-Language Support (Indonesia & English)
**Purpose:** Serve Indonesian primary audience + English-speaking secondary

**Implementation:** `react-i18next`  
**Language Files:**
- `src/i18n/id.json` (Indonesian)
- `src/i18n/en.json` (English)

**Coverage:**
- All UI labels, buttons, placeholders
- Error messages
- Help text & tooltips
- Results display

**Persistence:** Language choice stored in localStorage, restored on reload  
**Default:** Indonesian (id)

**Key Translation Areas:**
- App title, subtitle, descriptions
- Form labels (ingredient, cost, labor)
- Pricing method names & explanations
- Result labels & currency formatting
- Button labels (Save, Delete, Reset, etc.)
- Error messages
- Market-based method labels

---

## Technical Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│         Browser (Client-Side Only)      │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────────────────────┐   │
│  │      React App (TypeScript)      │   │
│  │                                  │   │
│  │  ├─ Components (UI Layer)        │   │
│  │  ├─ Hooks (State Management)     │   │
│  │  ├─ Context (Global State)       │   │
│  │  └─ Pages (Routing, SPA)         │   │
│  └──────────────────────────────────┘   │
│                 ↓                       │
│  ┌──────────────────────────────────┐   │
│  │    Business Logic Layer          │   │
│  │  ├─ calculator.ts (math)         │   │
│  │  ├─ storage.ts (localStorage)    │   │
│  │  └─ types.ts (TypeScript types)  │   │
│  └──────────────────────────────────┘   │
│                 ↓                       │
│  ┌──────────────────────────────────┐   │
│  │  Browser Storage (localStorage)   │   │
│  │  - Recipes (JSON)                │   │
│  │  - User settings (language)      │   │
│  └──────────────────────────────────┘   │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │  Styling: Tailwind CSS           │   │
│  │  i18n: react-i18next             │   │
│  │  Build: Vite (dev/prod)          │   │
│  └──────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
          No Backend (Offline Capable)
```

### Technology Stack Rationale

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | React + TypeScript | Type safety, large ecosystem, fast rendering, easy debugging |
| **Build Tool** | Vite | Fast dev server, instant HMR, optimized production bundles |
| **Styling** | Tailwind CSS | Utility-first, responsive design, consistent spacing/colors |
| **State** | React Hooks + Context | Sufficient for simple app, no external dependency bloat |
| **Storage** | localStorage | No backend needed, free, instant persistence, offline-capable |
| **i18n** | react-i18next | Industry standard, robust pluralization, namespace support |
| **Testing** | Vitest + React Testing Library | Fast (Vite-native), familiar API, good for component testing |
| **Hosting** | Vercel/Netlify | Free tier, auto-deploy from GitHub, CDN included |

### No Backend Rationale
- v1 scope: Single-user, browser-based calculator
- No need for: user accounts, data sync, collaboration
- Advantages: Faster loading, offline-capable, zero server cost
- Future migration path: Add backend in v2 (cloud recipes, analytics)

### State Management Strategy

**React Context (Preferred for v1):**
- Global state: `RecipeContext` (current recipe data)
- Global state: `SettingsContext` (language, theme if added)
- Local state: Component-level using `useState` for UI ephemeral state

**Alternative (Zustand):** Consider if state becomes complex (>5 context providers)

**Structure:**
```
src/contexts/
├── RecipeContext.tsx (current recipe, CRUD actions)
└── SettingsContext.tsx (language, preferences)

src/hooks/
├── useRecipe.ts (access RecipeContext)
└── useSettings.ts (access SettingsContext)
```

---

## Database Design Assumptions

**Note:** This is a client-side app with localStorage only (v1). No backend database.

### localStorage Schema

**Key:** `recipes:${UUID}`  
**Value:** JSON serialized Recipe object

```typescript
interface StoredRecipe {
  id: string;                        // UUID
  name: string;                      // User-entered name
  portions: number;                  // Portions produced
  ingredients: Ingredient[];         // Full array
  overhead: Overhead;                // Full config
  pricing: PricingConfig;            // Full config
  createdAt: number;                 // Unix timestamp (ms)
  updatedAt: number;                 // Unix timestamp (ms)
}
```

**Index Key:** `recipes:list`  
**Value:** Array of recipe IDs for fast lookup
```json
["uuid-1", "uuid-2", "uuid-3"]
```

**Settings Key:** `settings`  
**Value:** User preferences
```typescript
interface AppSettings {
  language: 'id' | 'en';
  lastRecipeId?: string;            // Resume context
}
```

### Design Constraints

1. **Size Limit:** localStorage ≈ 5–10 MB; with ~100 recipes max
2. **No Sync:** Recipes isolated to single browser
3. **No Backup:** Users responsible for manual export (v2 feature)
4. **No Encryption:** Treat as untrusted client data

### Migration Path to Backend (v2)

If adding backend database (PostgreSQL + Prisma):
1. Same data model, extended with `userId` (foreign key)
2. Add authentication (OAuth, password-based)
3. Add cloud sync (conflict resolution strategy)
4. Add analytics (price trends, user segments)

---

## API Design Principles

**No Backend in v1:** This section describes internal function/method design patterns.

### Calculator Functions

**Principle 1: Pure Functions**
- All `calculator.ts` functions are pure (no side effects)
- Same input → always same output
- Enables unit testing and composability

**Principle 2: Explicit Parameter Passing**
- Functions receive all needed data via parameters
- No hidden global state
- Example: `calculateIngredientCost(ingredient, unitConversion)` not `calculateIngredientCost()` with implicit globals

**Principle 3: Transparent Calculation**
- Functions return not just final result, but calculation breakdown
- Enables users to understand & verify pricing logic
- Example: Return `{ cost, ingredients, overhead, total }` not just total

**Principle 4: Validation at Boundaries**
- Input validation occurs in React components (forms)
- Calculator functions assume valid input (fail fast if not)
- No defensive null-checking inside calculator

### Storage Functions

**Principle 1: Async-Safe**
- All storage functions return Promises (ready for IndexedDB migration)
- Use `await` in components

**Principle 2: Error Handling**
- Storage functions throw descriptive errors
- Components catch and display user-friendly messages

**Principle 3: Atomicity**
- Save operations either fully succeed or fully fail
- No partial saves

---

## Security Requirements

### Data Security (Low Risk for v1)

**Privacy:**
- All data stays in user's browser
- No data sent to server or 3rd parties
- No analytics/tracking (unless explicitly opted in v2)

**Data Validation:**
- Reject negative or excessively large numbers
- Sanitize user input strings (no XSS risk in localStorage, but good practice)
- Validate all form inputs before storage

### Content Security

**CSP Header (Netlify/Vercel):**
```
Content-Security-Policy: default-src 'self'; 
  script-src 'self' cdn.jsdelivr.net; 
  style-src 'self' 'unsafe-inline' cdn.tailwindcss.com;
  img-src 'self' data:;
```

### HTTPS Enforcement

- Hosting on Vercel/Netlify (automatic HTTPS)
- No mixed content allowed
- Subresources (CDN libs) must be HTTPS

### Third-Party Dependencies

**Audit:**
- Run `npm audit` regularly
- Update dependencies monthly
- Review changelogs before major version bumps

**Locked Versions:** Use `package-lock.json` (already in place)

### No Authentication (v1)

- v1: no user accounts
- Browser storage is user-isolated by default
- v2 (if implemented): add OAuth (Google, Microsoft, GitHub)

---

## Performance Requirements

### Load Time Targets

- **First Contentful Paint (FCP):** < 1 second
- **Largest Contentful Paint (LCP):** < 2 seconds
- **Time to Interactive (TTI):** < 2.5 seconds
- **Cumulative Layout Shift (CLS):** < 0.1

### Bundle Size Targets

- **JavaScript:** < 150 KB (minified + gzipped)
- **CSS:** < 30 KB (minified + gzipped)
- **Total initial load:** < 200 KB

### Runtime Performance

- **Calculator execution:** < 10ms (even for 20 ingredients)
- **localStorage read/write:** < 5ms per operation
- **Ingredient input:** Instant feedback (< 16ms per keystroke)
- **Recipe load:** < 100ms (even for large recipes)

### Optimization Strategies

1. **Code Splitting:**
   - Lazy load "Saved Recipes" page (only when needed)
   - Separate i18n files loaded on demand

2. **Asset Optimization:**
   - Minify CSS, JS (Vite handles automatically)
   - Tree-shake unused Tailwind classes
   - Inline critical CSS

3. **Caching:**
   - Browser cache headers: 1 year for static assets
   - Service Worker (v2 future): offline support

4. **Rendering:**
   - React.memo for pure components
   - useMemo for expensive calculations
   - Avoid unnecessary re-renders (proper dependency arrays)

### Measurement

- Use Vercel Analytics (free tier)
- Monitor Web Vitals in production
- Lighthouse CI for every deploy

---

## Coding Standards

### General Principles

1. **Clarity Over Cleverness**
   - Prefer readable code to "clever" one-liners
   - Use descriptive variable names
   - Add comments for non-obvious logic

2. **Single Responsibility**
   - Each function does one thing well
   - Each component has one primary purpose
   - If a function does too much, split it

3. **DRY (Don't Repeat Yourself)**
   - Extract repeated logic into utilities
   - Reuse components instead of copying
   - Use constants for magic numbers

4. **Testability**
   - Write code to be easily tested
   - Avoid hard-to-test side effects in business logic
   - Pure functions are preferred

### Code Style

```typescript
// Good: Clear variable names, readable logic
const calculateFoodCostPrice = (
  totalCost: number,
  targetFoodCostPercent: number
): number => {
  const costRatio = targetFoodCostPercent / 100;
  return Math.round(totalCost / costRatio);
};

// Avoid: Unclear abbreviations, magic numbers
const calcFCP = (tc: number, tf: number): number => {
  return Math.round(tc / (tf / 100));
};
```

### Formatting

- **Line length:** Max 100 characters (soft limit), 120 hard limit
- **Indentation:** 2 spaces (Vite default)
- **Semicolons:** Always use (Prettier default)
- **Quotes:** Double quotes for strings (Prettier default)

### Import Organization

```typescript
// 1. External libraries
import React from "react";
import { useContext } from "react";
import i18next from "i18next";

// 2. Relative imports (parent/sibling)
import { RecipeContext } from "../contexts/RecipeContext";
import { calculateTotal } from "../lib/calculator";

// 3. Type-only imports (TypeScript)
import type { Recipe, Ingredient } from "../lib/types";

// 4. Styles/assets (if not using CSS-in-JS)
import "./ComponentName.css";
```

---

## File Organization Rules

### Directory Structure (Canonical)

```
harga-jual-menu/
├── index.html                      # Entry point
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite config
├── tailwind.config.js              # Tailwind config
├── vitest.config.ts                # Test config
├── .eslintrc.json                  # ESLint (optional)
├── .prettierrc                     # Prettier config
│
├── public/
│   └── favicon.svg                 # App icon
│
├── src/
│   ├── main.tsx                    # React root
│   ├── App.tsx                     # Main app component
│   │
│   ├── components/
│   │   ├── IngredientInput.tsx
│   │   ├── IngredientList.tsx
│   │   ├── OverheadInput.tsx
│   │   ├── PricingMethodSelector.tsx
│   │   ├── MarketPriceInput.tsx
│   │   ├── ResultDisplay.tsx
│   │   ├── RecipeList.tsx
│   │   └── LanguageToggle.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── SavedRecipesPage.tsx
│   │
│   ├── contexts/
│   │   ├── RecipeContext.tsx       # Global recipe state
│   │   └── SettingsContext.tsx     # Global settings
│   │
│   ├── hooks/
│   │   ├── useRecipe.ts
│   │   └── useSettings.ts
│   │
│   ├── lib/
│   │   ├── calculator.ts           # Pricing logic
│   │   ├── storage.ts              # localStorage helpers
│   │   ├── types.ts                # TypeScript interfaces
│   │   └── constants.ts            # App constants
│   │
│   ├── i18n/
│   │   ├── id.json                 # Indonesian translations
│   │   └── en.json                 # English translations
│   │
│   ├── styles/
│   │   └── index.css               # Global styles
│   │
│   └── utils/
│       ├── validation.ts           # Form validation
│       └── formatting.ts           # Number/currency formatting
│
├── tests/
│   ├── lib/
│   │   ├── calculator.test.ts
│   │   └── storage.test.ts
│   └── components/
│       └── ResultDisplay.test.tsx
│
├── README.md                       # Project readme
├── CLAUDE.md                       # This file
└── .gitignore
```

### File Naming Rules

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase, .tsx | `IngredientInput.tsx` |
| Pages | PascalCase, .tsx | `HomePage.tsx` |
| Hooks | camelCase, useXyz pattern | `useRecipe.ts` |
| Utilities | camelCase, .ts | `calculator.ts` |
| Contexts | PascalCase, .tsx | `RecipeContext.tsx` |
| Tests | *.test.ts or *.spec.ts | `calculator.test.ts` |
| Styles | Tailwind (no .css files except global) | N/A |
| Constants | UPPER_SNAKE_CASE (in files) | `MAX_INGREDIENTS = 50` |

### Module Export Rules

**Prefer Named Exports:**
```typescript
// In calculator.ts
export const calculateFoodCostPrice = (...) => { ... };
export const calculateMarkupPrice = (...) => { ... };

// In component
import { calculateFoodCostPrice } from "../lib/calculator";
```

**Default Export Only For:**
- Page components
- React contexts

**Example:**
```typescript
// pages/HomePage.tsx
export default function HomePage() { ... }

// contexts/RecipeContext.tsx
export default function RecipeProvider({ children }) { ... }
export const RecipeContext = createContext<...>(...);
```

---

## Naming Conventions

### Variables

- **Constants:** `UPPER_SNAKE_CASE` (top-level only)
  ```typescript
  const MAX_INGREDIENTS = 50;
  const DEFAULT_LANGUAGE = "id";
  ```

- **Regular variables:** `camelCase`
  ```typescript
  const totalCost = 10000;
  const ingredientCount = ingredients.length;
  ```

- **Boolean variables:** Prefix with `is`, `has`, `can`, `should`
  ```typescript
  const isLoading = true;
  const hasError = false;
  const canSave = true;
  ```

### Functions

- **Regular functions:** `camelCase`, verb-based
  ```typescript
  const calculateTotal = (...) => { };
  const validateInput = (...) => { };
  const formatCurrency = (...) => { };
  ```

- **Component functions:** `PascalCase`
  ```typescript
  const IngredientInput = (props) => { };
  const ResultDisplay = (props) => { };
  ```

- **Hook functions:** `useXyz` pattern
  ```typescript
  const useRecipe = () => { };
  const useSettings = () => { };
  ```

### Types & Interfaces

- **Types:** `PascalCase`, descriptive, suffix with "Type" if needed
  ```typescript
  type PricingMethod = "foodCost" | "markup" | "market";
  type Unit = "gram" | "kg" | "ml" | "liter" | "pcs";
  ```

- **Interfaces:** `PascalCase`, no prefix
  ```typescript
  interface Recipe { ... }
  interface Ingredient { ... }
  interface Overhead { ... }
  ```

- **Enums (avoid, use union types instead):**
  ```typescript
  enum PricingMethod {
    FOOD_COST = "foodCost",
    MARKUP = "markup",
    MARKET = "market"
  }
  ```

### CSS Classes (Tailwind Only)

- Use Tailwind utility classes directly in JSX
- No custom CSS files except `src/styles/index.css` (global)
- Example:
  ```tsx
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Save
  </button>
  ```

### i18n Keys

- Hierarchical structure: `namespace.feature.item`
  ```json
  {
    "app": {
      "title": "Kalkulator Harga Jual",
      "subtitle": "..."
    },
    "form": {
      "ingredientName": "Nama Bahan",
      "pricePerUnit": "Harga per Unit"
    },
    "button": {
      "save": "Simpan",
      "delete": "Hapus"
    }
  }
  ```

---

## TypeScript Rules

### Strict Mode (Enabled)

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

### Type Annotations

**Required:**
- Function parameters
- Function return types
- Export constants

**Optional (but encouraged):**
- Local variables (if obvious from context)
- Loop variables (if type is clear)

```typescript
// Good: Explicit types
const calculatePrice = (cost: number, multiplier: number): number => {
  return cost * multiplier;
};

// Also good: Type inference (clear from context)
const users = [];  // Could be inferred as any[], but prefer explicit
const users: Ingredient[] = [];  // Better

// Avoid: No types for exported functions
export const getValue = (key) => { ... };  // Bad
export const getValue = (key: string): number => { ... };  // Good
```

### Nullable Types

```typescript
// Explicit nullable
interface Recipe {
  id: string;
  description: string | null;  // Can be null
  deletedAt?: number;           // Optional (undefined)
}

// Avoid optional when null is possible
interface Recipe {
  description?: string;  // Ambiguous: undefined vs empty string
}
```

### Generic Types

```typescript
// Good: Generic for reusable functions
const createRecord = <T extends Record>(data: T): T => {
  // ...
  return data;
};

// Bad: No generics, over-specific
const createRecipe = (recipe: Recipe): Recipe => { };
const createIngredient = (ingredient: Ingredient): Ingredient => { };
```

### Union Types Over Enums

```typescript
// Preferred: Union type
type PricingMethod = "foodCost" | "markup" | "market";

// Avoid: Enum (unless need reverse mapping)
enum PricingMethod { FOOD_COST = 0, MARKUP = 1, MARKET = 2 }
```

### Type vs Interface

- **Use `type`:** For unions, primitives, function signatures
  ```typescript
  type Unit = "gram" | "kg" | "ml";
  type Calculator = (cost: number) => number;
  ```

- **Use `interface`:** For object shapes, class contracts
  ```typescript
  interface Recipe { ... }
  interface Ingredient { ... }
  ```

### Avoid `any`

```typescript
// Bad
const getValue = (data: any): any => { };

// Good
const getValue = <T>(data: T): T => { };
const getValue = (data: unknown): string => {
  if (typeof data === "string") return data;
  throw new Error("Expected string");
};
```

---

## Error Handling Guidelines

### React Component Error Boundaries

**Location:** `src/components/ErrorBoundary.tsx`

```typescript
class ErrorBoundary extends React.Component<...> {
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error);
    this.setState({ hasError: true });
  }
  
  render() {
    if (this.state.hasError) {
      return <div className="p-4 bg-red-100">Error occurred</div>;
    }
    return this.props.children;
  }
}
```

Wrap main App:
```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Form Validation Errors

Display inline near form fields:
```typescript
const [errors, setErrors] = useState<Record<string, string>>({});

const handleSubmit = (e: React.FormEvent) => {
  const newErrors = validateRecipe(recipe);
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;  // Don't submit
  }
  // Proceed with save
};

// In JSX
{errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
```

### Calculator Function Errors

**Approach:** Throw descriptive errors, catch in components

```typescript
// calculator.ts
export const calculateFoodCostPrice = (
  totalCost: number,
  foodCostPercent: number
): number => {
  if (totalCost < 0) {
    throw new Error("Total cost cannot be negative");
  }
  if (foodCostPercent <= 0 || foodCostPercent >= 100) {
    throw new Error("Food cost % must be between 1-99%");
  }
  return Math.round(totalCost / (foodCostPercent / 100));
};

// Component
try {
  const price = calculateFoodCostPrice(total, foodCost);
  setResult(price);
} catch (error) {
  setError(error.message);
  // Display to user
}
```

### Storage Errors

Handle localStorage quota exceeded:
```typescript
export const saveRecipe = (recipe: Recipe): void => {
  try {
    const key = `recipes:${recipe.id}`;
    localStorage.setItem(key, JSON.stringify(recipe));
  } catch (error) {
    if (error instanceof QuotaExceededError) {
      throw new Error("Storage full. Please delete old recipes.");
    }
    throw error;
  }
};
```

### User-Facing Error Messages

- Clear, non-technical language
- Suggest corrective action
- Example:
  ```
  ❌ Bad: "NaN returned from calculation"
  ✅ Good: "Please enter valid numbers for all costs"
  ```

### Logging Strategy

**Development:**
```typescript
if (process.env.NODE_ENV === "development") {
  console.log("Calculation result:", result);
}
```

**Production:**
- Avoid console logs (noise)
- Use error tracking (Sentry, LogRocket) in v2

---

## Testing Requirements

### Testing Philosophy

1. **Unit Tests:** All calculator functions (100% coverage)
2. **Component Tests:** Main UI components (Snapshot + Interaction)
3. **Integration Tests:** Full recipe flow (optional for v1)
4. **E2E Tests:** Critical user paths (Playwright, optional for v1)

### Unit Tests (calculator.ts)

**Framework:** Vitest  
**Coverage Target:** 100%

```typescript
// tests/lib/calculator.test.ts
import { describe, it, expect } from "vitest";
import { calculateFoodCostPrice, calculateMarkupPrice } from "../../src/lib/calculator";

describe("calculator", () => {
  describe("calculateFoodCostPrice", () => {
    it("should calculate price correctly", () => {
      const price = calculateFoodCostPrice(10000, 30);
      expect(price).toBe(33333);  // 10000 / 0.30
    });

    it("should round result", () => {
      const price = calculateFoodCostPrice(10000, 33);
      expect(price).toBeCloseTo(30303, -1);  // Allow 1-digit rounding
    });

    it("should throw on negative cost", () => {
      expect(() => calculateFoodCostPrice(-1000, 30)).toThrow();
    });

    it("should throw on invalid food cost %", () => {
      expect(() => calculateFoodCostPrice(10000, 0)).toThrow();
      expect(() => calculateFoodCostPrice(10000, 101)).toThrow();
    });
  });
});
```

### Component Snapshot Tests

```typescript
// tests/components/ResultDisplay.test.tsx
import { render } from "@testing-library/react";
import { ResultDisplay } from "../../src/components/ResultDisplay";

describe("ResultDisplay", () => {
  it("should render result display correctly", () => {
    const mockResult = {
      costPerPortion: 10000,
      recommendedPrice: 33333,
      // ...
    };

    const { container } = render(<ResultDisplay result={mockResult} />);
    expect(container).toMatchSnapshot();
  });
});
```

### Component Interaction Tests

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { IngredientInput } from "../../src/components/IngredientInput";

describe("IngredientInput", () => {
  it("should add ingredient on button click", () => {
    const mockOnAdd = vi.fn();
    render(<IngredientInput onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("Ingredient name");
    fireEvent.change(input, { target: { value: "Tepung" } });

    const button = screen.getByRole("button", { name: /add/i });
    fireEvent.click(button);

    expect(mockOnAdd).toHaveBeenCalledWith(expect.objectContaining({
      name: "Tepung"
    }));
  });
});
```

### Test File Organization

```
tests/
├── lib/
│   ├── calculator.test.ts
│   ├── storage.test.ts
│   └── types.test.ts
└── components/
    ├── IngredientInput.test.tsx
    └── ResultDisplay.test.tsx
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage

# Single file
npm test -- calculator.test.ts
```

### Testing Best Practices

1. **Arrange-Act-Assert Pattern:**
   ```typescript
   // Arrange
   const recipe = createMockRecipe();
   
   // Act
   const result = calculateTotal(recipe);
   
   // Assert
   expect(result).toBe(expectedValue);
   ```

2. **Mock External Dependencies:**
   ```typescript
   vi.mock("../lib/storage");
   ```

3. **Use Descriptive Test Names:**
   ```typescript
   // Good
   it("should throw error when food cost percent is above 99%", () => {});
   
   // Bad
   it("should throw", () => {});
   ```

---

## Documentation Requirements

### Code Comments

**When to Comment:**
- Complex algorithm explanation
- Non-obvious business logic
- Workarounds or hacks (explain why)
- TODOs or FIXMEs with context

**When NOT to Comment:**
- Self-explanatory code
- Comments that repeat the code
- Outdated comments (keep updated or remove)

```typescript
// Good: Explains why, not what
// We round to nearest 500 because typical menu prices end in 00 or 50
const roundToNearest500 = (price: number): number => {
  return Math.round(price / 500) * 500;
};

// Bad: Just restates the code
// Round to nearest 500
const round500 = (price: number): number => {
  return Math.round(price / 500) * 500;
};
```

### JSDoc for Functions

```typescript
/**
 * Calculate selling price based on target food cost percentage
 * 
 * @param totalCost - Total ingredient cost per portion (Rp)
 * @param foodCostPercent - Target food cost as % of selling price (1-99)
 * @returns Recommended selling price (Rp)
 * @throws Error if inputs are invalid
 * 
 * @example
 * calculateFoodCostPrice(10000, 30) => 33333
 */
export const calculateFoodCostPrice = (
  totalCost: number,
  foodCostPercent: number
): number => {
  // ...
};
```

### README.md

Required sections:
1. Project name & description
2. Quick start (clone → npm install → npm run dev)
3. Tech stack
4. Project structure (brief)
5. Contributing guidelines
6. License

### CLAUDE.md (This File)

- Permanent instruction manual
- Updated before major version releases
- All architectural decisions documented

---

## AI Workflow Instructions

### How New Features Should Be Implemented

#### Step 1: Define Requirements
- What is the feature?
- What problem does it solve?
- What are acceptance criteria?
- Does it fit v1 scope?

#### Step 2: Impact Analysis
- What components need changes?
- What new types needed?
- Are any calculations affected?
- Storage impact?

#### Step 3: Implementation Order
1. **Create/Update Types** (`src/lib/types.ts`)
2. **Create/Update Logic** (`src/lib/calculator.ts` if applicable)
3. **Create/Update Components** (new or modify existing)
4. **Update Tests** (unit tests for logic, snapshot for components)
5. **Update i18n** (add labels in `id.json` and `en.json`)
6. **Update Documentation** (README, CLAUDE.md if needed)

#### Step 4: Testing
- Write tests BEFORE implementation (TDD preferred)
- Test edge cases
- Manual testing in browser
- Check Lighthouse performance

#### Step 5: Code Review (if multi-agent)
- Request review from appropriate agent (see Role-Specific Sections)
- Ensure CLAUDE.md compliance

#### Step 6: Deploy
- Merge to main
- Automatic deploy to Vercel
- Monitor production for errors

### How Schema Changes Should Be Handled

**Schema = TypeScript interfaces in `src/lib/types.ts`**

#### Type 1: Adding Optional Field
```typescript
// Before
interface Recipe {
  id: string;
  name: string;
}

// After (backward compatible)
interface Recipe {
  id: string;
  name: string;
  description?: string;  // Optional, defaults to undefined
}
```

**Migration:** None needed (old recipes won't have field)

#### Type 2: Adding Required Field
```typescript
// Before
interface Recipe {
  id: string;
  name: string;
}

// After (NOT backward compatible)
interface Recipe {
  id: string;
  name: string;
  version: number;  // Required
}
```

**Migration Needed:**
```typescript
// storage.ts
export const migrateRecipe = (oldRecipe: any): Recipe => {
  return {
    ...oldRecipe,
    version: 1  // Default for old recipes
  };
};

// Load recipes with migration
export const loadRecipe = (id: string): Recipe => {
  const raw = JSON.parse(localStorage.getItem(`recipes:${id}`) || "{}");
  return migrateRecipe(raw);
};
```

#### Type 3: Renaming Field
```typescript
// Before
interface Ingredient {
  pricePerUnit: number;
}

// After (breaking change)
interface Ingredient {
  costPerUnit: number;
}
```

**Migration:**
```typescript
export const migrateIngredient = (old: any): Ingredient => {
  return {
    ...old,
    costPerUnit: old.pricePerUnit,
    // Remove old field
  };
};
```

#### Type 4: Changing Field Type
**Risky.** Avoid if possible. Consider versioning instead.

```typescript
// Before
interface PricingConfig {
  foodCostPercent: number;  // Single number
}

// After (need migration)
interface PricingConfig {
  foodCostPercent: number | null;  // May not be set
}

// Migration
export const migratePricingConfig = (old: any): PricingConfig => {
  return {
    foodCostPercent: old.foodCostPercent ?? null
  };
};
```

#### General Rule
- **Prefer adding optional fields** (no migration)
- **Mark migrations with version number** (future-proof)
- **Test migrations with old data samples**
- **Keep old code path for 1 release cycle before removing**

### How Migrations Should Be Created

**Not database migrations (no backend), but data structure migrations.**

#### Migration File Location
```
src/lib/migrations/
├── v1_initial.ts
└── v2_addDescription.ts
```

#### Migration Structure
```typescript
// src/lib/migrations/v2_addDescription.ts
import type { Recipe } from "../types";

export const migrationVersion = 2;

export const migrate = (recipe: any): Recipe => {
  if (recipe.version && recipe.version >= 2) {
    return recipe;  // Already migrated
  }

  return {
    ...recipe,
    description: recipe.description || "",
    version: 2
  };
};
```

#### Apply Migration on Load
```typescript
// storage.ts
import { migrate as migrateV2 } from "./migrations/v2_addDescription";

export const loadRecipe = (id: string): Recipe => {
  const raw = JSON.parse(localStorage.getItem(`recipes:${id}`) || "{}");
  
  // Apply migrations in sequence
  let recipe = raw;
  recipe = migrateV2(recipe);
  // recipe = migrateV3(recipe);
  // etc.
  
  return recipe as Recipe;
};
```

### How Pull Requests Should Be Structured

**For multi-agent workflow:**

#### PR Title Format
```
[FEATURE|BUGFIX|CHORE] Brief description

Examples:
[FEATURE] Add market-based pricing method
[BUGFIX] Fix unit conversion for grams to kg
[CHORE] Update dependencies
```

#### PR Description Template
```markdown
## What
Brief description of changes

## Why
Business rationale or problem solved

## How
High-level approach (not code walkthrough)

## Testing
- [ ] Unit tests written
- [ ] Snapshot tests pass
- [ ] Manual testing completed
- [ ] Performance verified (Lighthouse > 90)

## Checklist
- [ ] CLAUDE.md updated (if architectural)
- [ ] i18n keys added (if UI)
- [ ] Types in types.ts (if data model changed)
- [ ] No console.log left
- [ ] No TypeScript errors
```

#### Commit Message Format
```
[FEATURE] Add ingredient input component

- Create IngredientInput.tsx with form validation
- Add ingredient types to types.ts
- Create unit tests (100% coverage)
- Add i18n labels for Indonesian & English

Closes: #123
```

#### Branch Naming
```
feature/add-market-pricing
bugfix/unit-conversion-error
chore/update-tailwind
```

### How Code Reviews Should Be Performed

#### Reviewer Checklist

1. **Correctness**
   - [ ] Logic produces correct results (math, algorithms)
   - [ ] Edge cases handled (0, negative, large numbers)
   - [ ] Types correct (no `any`, proper generics)
   - [ ] No console.log, debug code left

2. **Code Quality**
   - [ ] Follows CLAUDE.md naming conventions
   - [ ] Single responsibility principle (functions, components)
   - [ ] Readable (clear variable names, comments where needed)
   - [ ] DRY (no duplication)

3. **Testing**
   - [ ] Unit tests present for business logic
   - [ ] Tests have good coverage
   - [ ] Tests are readable and maintainable
   - [ ] Edge cases tested

4. **Documentation**
   - [ ] Comments explain "why", not "what"
   - [ ] JSDoc for exported functions
   - [ ] i18n keys complete (both languages)
   - [ ] CLAUDE.md updated (if needed)

5. **Performance**
   - [ ] No unnecessary re-renders (React)
   - [ ] No N+1 loops
   - [ ] Calculations optimized (not in component render)
   - [ ] Bundle size impact assessed

6. **Security**
   - [ ] No XSS vulnerabilities
   - [ ] Input validated
   - [ ] No sensitive data exposed
   - [ ] Dependencies safe (run `npm audit`)

#### Review Comment Examples

✅ **Good Review Comments:**
```
The calculation assumes positive numbers, but users might input 0.
Consider adding validation or handling in the formula.
```

```
This component re-renders on every parent update.
Consider using React.memo() to optimize.
```

❌ **Poor Review Comments:**
```
I don't like this variable name.
```

```
This is wrong.
```

#### Approval Criteria
- No unresolved comments
- All checkboxes passed
- At least 1 approval (Architect or Backend Agent)
- CI tests passing (Vitest)

---

## Role-Specific Sections

### Architect Agent

**Responsibilities:**
- Overall project structure and module organization
- Technology decisions and trade-offs
- API/interface design between modules
- Data model design
- Performance architecture
- Scaling considerations

**When to Invoke Architect:**
- Before implementing major features
- When considering architectural refactor
- Schema changes affecting multiple modules
- Integration with external services (if added)
- Performance optimization decisions

**Architect Checklists:**

**New Feature Design**
- [ ] Feature aligns with project scope
- [ ] Data model doesn't conflict with existing types
- [ ] Component hierarchy follows established patterns
- [ ] New dependencies justified and minimal
- [ ] Performance impact assessed

**Schema Review**
- [ ] Backward compatibility maintained
- [ ] Migration path clear (if breaking)
- [ ] Index design for localStorage (future DB transition)
- [ ] No redundant fields
- [ ] Extensible for future features

**Code Review Focus**
- [ ] File organization matches canonical structure
- [ ] Imports organized correctly
- [ ] No circular dependencies
- [ ] Separation of concerns maintained
- [ ] Types in types.ts (not scattered)

---

### Backend Agent

**Responsibilities (for v1):**
- Business logic implementation (calculator.ts)
- Data validation and normalization
- Storage layer (localStorage functions)
- Unit test implementation

**When to Invoke Backend:**
- Implementing calculator functions
- Adding validation logic
- Storage operation changes
- Data migration logic

**Backend Checklists:**

**Calculator Implementation**
- [ ] Formula correct and matches plan
- [ ] Edge cases handled (0, negatives, large numbers)
- [ ] Rounding behavior specified and tested
- [ ] Calculation breakdown returned (transparency)
- [ ] Unit tests 100% coverage
- [ ] No floating-point errors

**Storage Implementation**
- [ ] Read/write functions are atomic
- [ ] Error handling for quota exceeded
- [ ] Migration logic for schema changes
- [ ] localStorage key naming consistent
- [ ] No unencrypted sensitive data

**Validation Implementation**
- [ ] All user inputs validated at form boundary
- [ ] Clear error messages (user-friendly)
- [ ] Validation functions pure (testable)
- [ ] Type-safe with TypeScript

**Code Review Focus**
- [ ] Calculation correctness
- [ ] Test coverage (unit tests)
- [ ] Error handling completeness
- [ ] No side effects in pure functions
- [ ] Storage operations are reliable

---

### Frontend Agent

**Responsibilities:**
- UI component implementation
- User interaction logic
- Form handling and validation display
- Styling with Tailwind
- Responsive design
- i18n integration

**When to Invoke Frontend:**
- Implementing new UI components
- Form input features
- Responsive design issues
- UI/UX improvements

**Frontend Checklists:**

**Component Implementation**
- [ ] Component has single clear purpose
- [ ] Props are well-typed (TypeScript)
- [ ] No business logic in component (use hooks/utils)
- [ ] Accessible (labels, focus states, ARIA)
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Snapshot tests created

**Form Handling**
- [ ] All inputs have associated labels
- [ ] Validation errors shown inline
- [ ] Form submission prevented on error
- [ ] Success feedback provided
- [ ] Keyboard navigation works

**i18n Integration**
- [ ] All user-visible text uses i18n
- [ ] English and Indonesian keys present
- [ ] No hardcoded strings left
- [ ] Placeholders translated
- [ ] Error messages translated

**Styling**
- [ ] Only Tailwind classes (no .css except global)
- [ ] Consistent spacing (multiples of 4px via Tailwind)
- [ ] Color palette matches design
- [ ] Hover/focus states visible
- [ ] Dark mode friendly (if applicable)

**Code Review Focus**
- [ ] Components follow React best practices
- [ ] Props interface clean and documented
- [ ] No unnecessary re-renders
- [ ] Accessibility standards met (WCAG 2.0 AA)
- [ ] i18n complete
- [ ] Responsive design works

---

### QA Agent

**Responsibilities:**
- Test plan creation
- Test case documentation
- Manual testing procedures
- Test result reporting
- Regression detection
- Performance verification

**When to Invoke QA:**
- Before releases
- After major feature implementation
- Performance regression suspected
- User-facing changes

**QA Checklists:**

**Functional Testing**
- [ ] Feature requirements met
- [ ] All user flows work end-to-end
- [ ] Error cases handled gracefully
- [ ] Data persists correctly (localStorage)
- [ ] Multi-language works (switch and verify)

**Regression Testing**
- [ ] Existing features still work
- [ ] No new bugs introduced
- [ ] Performance not degraded

**Browser Compatibility**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Device Testing**
- [ ] Desktop (1920x1080)
- [ ] Tablet (iPad, 768x1024)
- [ ] Mobile (iPhone 12, 390x844)
- [ ] Responsive breakpoints working

**Performance Testing**
- [ ] Load time < 2 seconds (LCP)
- [ ] TTI < 2.5 seconds
- [ ] Lighthouse score > 90
- [ ] Calculator response < 10ms
- [ ] No jank (60fps scrolling)

**Accessibility Testing**
- [ ] Keyboard navigation works
- [ ] Screen reader compatible (NVDA, JAWS)
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible

**Test Report Format**
```
**Test Date:** 2026-06-10
**Feature:** Market-based pricing method
**Tester:** QA Agent

✅ PASS: User can input competitor prices
✅ PASS: Median calculation correct
❌ FAIL: Range label not translated to English
⚠️ WARN: Performance on 50 competitors slightly slow (~150ms)

**Summary:** 3/4 pass. Issue: i18n missing for range labels.
**Recommendation:** Fix i18n, retest before merge.
```

---

### DevOps Agent

**Responsibilities:**
- Deployment to Vercel/Netlify
- CI/CD pipeline management
- Environment configuration
- Monitoring and logging
- Dependency management

**When to Invoke DevOps:**
- Deployment issues
- Environment setup
- CI/CD configuration
- Performance monitoring

**DevOps Checklists:**

**Pre-Deployment**
- [ ] All tests passing (Vitest)
- [ ] No TypeScript errors
- [ ] ESLint passing (if configured)
- [ ] Bundle size within limits
- [ ] Lighthouse score > 90

**Deployment**
- [ ] Code merged to main
- [ ] Automatic deploy triggered
- [ ] Smoke test on staging
- [ ] Production deploy successful
- [ ] No 5xx errors in logs

**Post-Deployment**
- [ ] Verify app loads (< 2s)
- [ ] Test main user flows
- [ ] Monitor error rates
- [ ] Check bundle sizes

**Environment Variables** (if needed in v2)
- Staging: TEST credentials
- Production: LIVE credentials
- Never commit `.env.local`

---

## Project Constraints

### v1 Scope Constraints

1. **Single-Page Application**
   - No backend server
   - All computation in browser
   - No API endpoints

2. **Single User Per Browser**
   - No login/authentication
   - No multi-user collaboration
   - No cloud sync

3. **localStorage Only**
   - Max ~5-10 MB
   - No data redundancy
   - User's responsibility to backup

4. **Stateless Price Calculation**
   - No historical pricing tracking
   - No analytics/trends
   - Every calculation independent

5. **Limited Integration**
   - No payment processing
   - No POS system integration
   - No accounting software sync

### Architectural Constraints

1. **No External API Calls (v1)**
   - All functions must be pure or use localStorage only
   - Future migration to backend should be possible

2. **React-Only**
   - No Vue, Angular, or other frameworks
   - No jQuery or vanilla DOM manipulation

3. **Tailwind CSS Only**
   - No Bootstrap, Material-UI, or custom CSS libraries
   - All styling via Tailwind utilities

4. **TypeScript Strict Mode**
   - No `any` type
   - `noImplicitAny`, `strictNullChecks` enabled

5. **Vite Ecosystem Only**
   - No webpack, Parcel, or other build tools
   - React ecosystem tools (react-i18next, vitest)

### Performance Constraints

1. **Bundle Size**
   - JavaScript: < 150 KB (gzipped)
   - CSS: < 30 KB (gzipped)
   - Total initial: < 200 KB

2. **Runtime Performance**
   - Calculator functions: < 10ms execution
   - localStorage operations: < 5ms
   - Component render: < 16ms (60fps)

3. **Load Time**
   - First Contentful Paint: < 1s
   - Largest Contentful Paint: < 2s
   - Time to Interactive: < 2.5s

### Browser Constraints

**Minimum Support:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Features Used:**
- ES2020 (async/await, optional chaining)
- Web APIs: localStorage, localStorage Quota API
- CSS Grid & Flexbox (Tailwind)

**Not Supported:**
- IE 11
- Older mobile browsers
- Flash, Java applets

---

## Do Not Guidelines

### ❌ DO NOT DO THESE THINGS

#### Architecture Violations

1. **DO NOT add a backend server**
   - v1 is intentionally client-only
   - If v2 needs backend, create new plan
   - Do not use third-party APIs without explicit plan approval

2. **DO NOT introduce multi-user features**
   - No login, authentication, user accounts
   - No cloud sync, data sharing
   - No notification system
   - Wait for v2 if needed

3. **DO NOT use external state management libraries**
   - React Context is sufficient for v1
   - No Redux, Recoil, or others (unless architectural review approves)
   - Zustand only if Context becomes unmaintainable (document decision)

4. **DO NOT mix CSS approaches**
   - No CSS-in-JS libraries (styled-components, emotion)
   - No .css files except `src/styles/index.css` (global only)
   - No inline styles (except dynamic necessities)
   - Pure Tailwind only

5. **DO NOT create database structure**
   - localStorage is not a database
   - No IndexedDB, WebSQL, or other browser DB APIs
   - No schema versioning complexity beyond simple migrations
   - Keep it simple for browser-local storage

#### Code Quality Violations

6. **DO NOT use `any` type**
   - All functions must have explicit types
   - If unsure, use `unknown` + type guard
   - TypeScript strict mode is enforced

   ```typescript
   // Bad
   const process = (data: any) => { };

   // Good
   const process = <T>(data: T): T => { };
   
   // Also Good
   const process = (data: unknown): string => {
     if (typeof data === "string") return data;
     throw new Error("Invalid type");
   };
   ```

7. **DO NOT leave console.log, console.error in production code**
   - Use `process.env.NODE_ENV === "development"` for debug logs
   - Remove before committing to main branch

   ```typescript
   // Bad
   console.log("Result:", result);  // Left in production

   // Good
   if (process.env.NODE_ENV === "development") {
     console.log("Result:", result);
   }
   ```

8. **DO NOT hardcode magic numbers**
   - Define constants in `src/lib/constants.ts`
   - Use meaningful names

   ```typescript
   // Bad
   const price = total / (30 / 100);  // What is 30?

   // Good
   const DEFAULT_FOOD_COST_PERCENT = 30;
   const price = total / (DEFAULT_FOOD_COST_PERCENT / 100);
   ```

9. **DO NOT skip unit tests for calculator functions**
   - Business logic must have tests (target: 100% coverage)
   - Every pricing method must be tested
   - Edge cases required

10. **DO NOT add comments that repeat code**
    - Comments should explain "why", not "what"
    - Self-documenting code is better

    ```typescript
    // Bad
    // Calculate the price
    const price = total * multiplier;

    // Good
    // Round to nearest 500 because menu prices typically end in 00/50
    const price = Math.round((total * multiplier) / 500) * 500;
    ```

#### Feature Violations

11. **DO NOT add features not in plan**
    - Every feature must be in `plan-harga-jual-menu.md` scope
    - If new feature discovered, update plan first
    - Get approval before implementing

12. **DO NOT change pricing formulas without validation**
    - Every formula change must have math validation
    - Test with real-world numbers
    - Document the change in CLAUDE.md

13. **DO NOT modify localStorage data structure without migration**
    - Always provide backward compatibility
    - Write migration functions for breaking changes
    - Test old data still loads correctly

14. **DO NOT expose calculator internals to UI**
    - Business logic in `lib/calculator.ts`
    - UI components in `components/`
    - Never put math in React components

    ```typescript
    // Bad (logic in component)
    const ResultDisplay = ({ total, method }) => {
      const result = total / (method.percent / 100);  // ❌
      return <div>{result}</div>;
    };

    // Good (logic in lib, component just displays)
    const ResultDisplay = ({ total, method }) => {
      const result = calculateFoodCostPrice(total, method.percent);  // ✅
      return <div>{result}</div>;
    };
    ```

#### i18n Violations

15. **DO NOT hardcode text in components**
    - All user-visible strings must be in `i18n/` JSON files
    - Use `useTranslation()` hook to access strings

    ```typescript
    // Bad
    <button>Save Recipe</button>

    // Good
    const { t } = useTranslation();
    <button>{t("button.save")}</button>
    ```

16. **DO NOT translate only one language**
    - Always update both `id.json` and `en.json`
    - Test both languages before merge

#### Performance Violations

17. **DO NOT ignore bundle size**
    - Monitor `npm run build` output
    - If bundle exceeds 150 KB (gzipped), investigate
    - Remove unused dependencies

18. **DO NOT cause unnecessary re-renders**
    - Use `React.memo` for pure components
    - Use `useMemo` for expensive calculations
    - Proper dependency arrays in hooks

    ```typescript
    // Bad (recalculates on every render)
    const RecipeList = ({ recipes }) => {
      const sorted = recipes.sort((a, b) => a.name.localeCompare(b.name));
      return <div>{sorted.map(...)}</div>;
    };

    // Good (memoized)
    const RecipeList = ({ recipes }) => {
      const sorted = useMemo(
        () => recipes.sort((a, b) => a.name.localeCompare(b.name)),
        [recipes]
      );
      return <div>{sorted.map(...)}</div>;
    };
    ```

19. **DO NOT skip Lighthouse checks**
    - Before merge: run `npm run build` → Lighthouse
    - Target: score > 90 on all metrics
    - Report scores in PR

#### Security Violations

20. **DO NOT store sensitive data in localStorage**
    - localStorage is accessible to any script
    - No passwords, API keys, or PII
    - User's recipe prices are non-sensitive (OK)

21. **DO NOT execute user input as code**
    - Never use `eval()`, `Function()`, `innerHTML` with user data
    - Use `.textContent` or escaped templates

    ```typescript
    // Bad
    div.innerHTML = userInput;  // XSS risk

    // Good
    div.textContent = userInput;  // Safe
    ```

22. **DO NOT commit environment secrets**
    - No `.env.local` with real credentials
    - No API keys in source code
    - Use example `.env.example`

#### Testing Violations

23. **DO NOT skip tests for new code**
    - Calculator functions: 100% test coverage
    - Components: snapshot + interaction tests
    - No TDD? Add tests before merge

24. **DO NOT mock everything indiscriminately**
    - Only mock external dependencies
    - Test actual logic when possible
    - Over-mocking makes tests worthless

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-06-10 | Initial CLAUDE.md creation from plan |

---

## Questions & Support

**For clarification on project structure or coding standards:**
- Refer to applicable section in CLAUDE.md
- Check existing code in `src/` for patterns
- Create issue/discussion if ambiguity found

**Updating CLAUDE.md:**
- Submit PR with proposed changes
- Require Architect Agent approval
- Version bump and change log entry

---

**End of CLAUDE.md**
