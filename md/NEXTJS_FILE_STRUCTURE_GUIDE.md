# Next.js File Structure & Configuration Guide

**Project:** Harga Jual Menu Calculator  
**Framework:** Next.js 14+ with App Router  
**Date:** 2026-06-10

---

## File Structure Comparison

### BEFORE: Vite + React

```
src/
├── main.tsx                    ← Entry point
├── App.tsx                     ← Root component
├── index.html                  ← HTML template
├── App.css
│
├── components/
│   ├── IngredientInput.tsx
│   ├── IngredientList.tsx
│   ├── OverheadInput.tsx
│   ├── PricingMethodSelector.tsx
│   ├── MarketPriceInput.tsx
│   ├── ResultDisplay.tsx
│   ├── RecipeList.tsx
│   └── LanguageToggle.tsx
│
├── pages/
│   ├── HomePage.tsx
│   └── SavedRecipesPage.tsx
│
├── contexts/
│   ├── RecipeContext.tsx
│   └── SettingsContext.tsx
│
├── hooks/
│   ├── useRecipe.ts
│   └── useSettings.ts
│
├── lib/
│   ├── calculator.ts
│   ├── storage.ts
│   ├── types.ts
│   └── constants.ts
│
├── i18n/
│   ├── id.json
│   └── en.json
│
├── styles/
│   └── index.css
│
└── utils/
    ├── validation.ts
    └── formatting.ts

public/
├── favicon.svg
└── (other assets)

tests/
├── lib/
│   ├── calculator.test.ts
│   └── storage.test.ts
└── components/
    └── ResultDisplay.test.tsx

vite.config.ts
tsconfig.json
tailwind.config.js
postcss.config.js
package.json
.eslintrc.json
.gitignore
```

### AFTER: Next.js App Router

```
app/                           ← Next.js App Router (replaces src/)
├── layout.tsx                 ← Root layout (replaces App.tsx)
├── page.tsx                   ← Home page (/ route)
├── globals.css                ← Global styles
│
├── saved-recipes/
│   └── page.tsx               ← /saved-recipes route
│
├── api/                       ← NEW: API Routes
│   ├── recipes/
│   │   ├── route.ts           ← GET /api/recipes, POST /api/recipes
│   │   └── [id]/
│   │       └── route.ts       ← GET/PUT/DELETE /api/recipes/[id]
│   ├── settings/
│   │   └── route.ts           ← GET /api/settings, POST /api/settings
│   └── calculate/
│       └── route.ts           ← POST /api/calculate
│
├── components/
│   ├── IngredientInput.tsx     ← Add: 'use client'
│   ├── IngredientList.tsx      ← Add: 'use client'
│   ├── OverheadInput.tsx       ← Add: 'use client'
│   ├── PricingMethodSelector.tsx ← Add: 'use client'
│   ├── MarketPriceInput.tsx    ← Add: 'use client'
│   ├── ResultDisplay.tsx       ← Add: 'use client'
│   ├── RecipeList.tsx          ← Add: 'use client'
│   ├── LanguageToggle.tsx      ← Add: 'use client'
│   └── Providers.tsx           ← NEW: Context provider wrapper
│
├── contexts/
│   ├── RecipeContext.tsx       ← Add: 'use client' at top
│   └── SettingsContext.tsx     ← Add: 'use client' at top
│
├── hooks/
│   ├── useRecipe.ts            ← Same as before
│   └── useSettings.ts          ← Same as before
│
├── lib/
│   ├── calculator.ts           ← UNCHANGED: reuse as-is
│   ├── storage.ts              ← UNCHANGED: reuse as-is
│   ├── types.ts                ← UNCHANGED: reuse as-is
│   ├── constants.ts            ← UNCHANGED: reuse as-is
│   ├── api-client.ts           ← NEW: Fetch wrapper for API calls
│   ├── validation.ts           ← UNCHANGED: reuse as-is
│   └── formatting.ts           ← UNCHANGED: reuse as-is
│
├── i18n/
│   ├── config.ts               ← next-i18next setup
│   ├── id.json                 ← UNCHANGED: same keys
│   └── en.json                 ← UNCHANGED: same keys
│
└── middleware.ts               ← NEW (optional): i18n routing

components/                    ← Client components (if shared)
lib/                          ← Shared utilities
i18n/                         ← Shared translations
public/                       ← Static assets
tests/                        ← Test files

next.config.js                ← NEW: Next.js config
next-i18next.config.js        ← NEW: i18n config
tsconfig.json                 ← UPDATED: Next.js specific
tailwind.config.ts            ← UPDATED: paths
vitest.config.ts              ← NEW: Test config
.eslintrc.json                ← UPDATED: Next.js eslint
.gitignore                    ← UPDATED: Add .next
package.json                  ← UPDATED: new dependencies
```

---

## Configuration Files

### next.config.js (NEW)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // i18n configuration (optional)
  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
  },
  
  // Image optimization
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
```

### tsconfig.json (UPDATED)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    // Strict mode
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    
    // Next.js specific
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    
    // Path aliases
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### tailwind.config.ts (UPDATED)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // App directory
    './components/**/*.{js,ts,jsx,tsx}', // Components
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: '#64748b',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
}

export default config
```

### next-i18next.config.js (NEW)

```javascript
const path = require('path')

module.exports = {
  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
  },
  ns: ['common'],
  defaultNS: 'common',
  localePath: path.resolve('./public/locales'),
}
```

### vitest.config.ts (UPDATED FOR NEXT.JS)

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

---

## Key Differences Summary

| Aspect | Vite + React | Next.js |
|--------|------------|---------|
| **Entry** | `src/main.tsx` | `app/layout.tsx` |
| **Home Page** | `src/pages/HomePage.tsx` | `app/page.tsx` |
| **Routes** | Manual routing | File-system routing |
| **Build Tool** | Vite | Next.js built-in |
| **Config** | vite.config.ts | next.config.js |
| **API** | External backend | `/app/api/*` routes |
| **Dev Port** | 5173 | 3000 |
| **i18n** | react-i18next | next-i18next |
| **Static Gen** | N/A | ISR, SSG |

---

## Migration Checklist: File by File

### Core Files to Update

```
❌ DELETE:
  - src/main.tsx
  - src/App.tsx (→ replaced by app/layout.tsx)
  - src/App.css
  - index.html (Next.js handles)
  - vite.config.ts

✏️ MOVE & UPDATE:
  src/components/* → app/components/* (add 'use client')
  src/lib/* → app/lib/* (reuse as-is)
  src/i18n/* → app/i18n/* (update config)
  src/contexts/* → app/contexts/* (add 'use client')
  src/hooks/* → app/hooks/* (no change)
  src/pages/* → app/*/page.tsx (restructure for App Router)

✨ CREATE NEW:
  app/layout.tsx (from App.tsx)
  app/page.tsx (from HomePage)
  app/saved-recipes/page.tsx (from SavedRecipesPage)
  app/api/* (new API routes)
  next.config.js (new)
  next-i18next.config.js (new)
  app/components/Providers.tsx (new context wrapper)

↔️ KEEP UNCHANGED:
  lib/calculator.ts
  lib/storage.ts
  lib/types.ts
  lib/constants.ts
  i18n translation keys (same)
  tests/* (update config only)
```

---

## Component Pattern Changes

### Before: React Page Component

```typescript
// src/pages/HomePage.tsx
import { RecipeContext } from '../contexts/RecipeContext';
import { useContext } from 'react';

export default function HomePage() {
  const { recipe } = useContext(RecipeContext);
  
  return (
    <div>
      <h1>Home</h1>
      {/* ... */}
    </div>
  );
}
```

### After: Next.js App Router Page

```typescript
// app/page.tsx
'use client'; // Add this to use context

import { useRecipe } from '@/hooks/useRecipe';

export default function HomePage() {
  const { recipe } = useRecipe();
  
  return (
    <div>
      <h1>Home</h1>
      {/* ... */}
    </div>
  );
}
```

### API Route Example (NEW)

```typescript
// app/api/recipes/route.ts (NEW)
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Get all recipes
  return NextResponse.json({ recipes: [] });
}

export async function POST(request: NextRequest) {
  const recipe = await request.json();
  // Save recipe
  return NextResponse.json({ id: recipe.id });
}
```

---

## Dependency Changes

### Remove:
```bash
npm uninstall vite @vitejs/plugin-react react-router-dom
```

### Add:
```bash
npm install next next-i18next
npm install -D @types/next
```

### Keep:
```
react react-dom (same version)
tailwindcss (same, works in Next.js)
typescript (same)
vitest @testing-library/react (same)
```

---

## Environment Setup

### .env.local (NEW)

```env
# API endpoint (if using backend)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Feature flags
NEXT_PUBLIC_ENABLE_MARKET_BASED=true

# i18n
NEXT_PUBLIC_DEFAULT_LANGUAGE=id
```

### .gitignore (UPDATED)

```
# Next.js
.next/
out/
build/

# Dependencies
node_modules/
.pnp
.pnp.js

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.vitest/

# Misc
.turbo
*.log
```

---

## Running Commands

### Development

```bash
# Start dev server (localhost:3000)
npm run dev

# Or with Turbopack (faster)
npm run dev -- --turbopack
```

### Building

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix issues
npm run lint -- --fix
```

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or push to GitHub and auto-deploy
git push origin main
```

### Environment Variables on Vercel

Set in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-production-url/api
```

---

## Migration Order for Files

**Priority 1 (Do First):**
1. app/layout.tsx (root layout)
2. next.config.js
3. tsconfig.json
4. next-i18next.config.js

**Priority 2 (Setup):**
5. app/page.tsx (home)
6. app/api/*/route.ts (API routes)
7. app/components/Providers.tsx

**Priority 3 (Move):**
8. Move lib/* as-is
9. Move i18n/* with new config
10. Move components/* with 'use client'

**Priority 4 (Update):**
11. Update contexts (add 'use client')
12. Update hooks (reference to 'use client' components)
13. Update tests (path aliases)

---

## Testing the Migration

### Verification Checklist

After migration, verify:

- [ ] `npm run dev` starts at localhost:3000
- [ ] Home page loads without errors
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] TypeScript strict mode: no errors
- [ ] Tailwind CSS loads (inspect <style> tags)
- [ ] All components render
- [ ] Context providers work
- [ ] localStorage still works
- [ ] Tests run with `npm test`

---

## Common Errors & Solutions

### Error: "Module not found '@/lib/calculator'"

**Solution:** Check path alias in tsconfig.json
```json
"paths": {
  "@/*": ["./*"]  // Should be at root, not src/
}
```

### Error: "Cannot find module 'react'"

**Solution:** Run `npm install`

### Error: "use client" needed but not declared

**Solution:** Add `'use client';` to top of component using useState/useContext

### Error: localStorage is not defined

**Solution:** Wrap in `useEffect` on client component with `'use client'` directive

---

## Next Steps

1. **Review** this file
2. **Compare** old vs new structure
3. **Understand** configuration changes
4. **Start** with Task 001 (Next.js version)
5. **Reference** migration guide when stuck

---

**Ready to migrate? Start with Task 001 (Next.js version)!**

---

**End of File Structure & Configuration Guide**
