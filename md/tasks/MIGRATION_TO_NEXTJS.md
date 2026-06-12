# Migration Guide: Vite + React → Next.js

**Date:** 2026-06-10  
**Status:** ✅ UPDATED  
**Project:** Harga Jual Menu Calculator

---

## Overview

This document outlines the changes made to convert the project from Vite + React to Next.js 14+ with App Router.

---

## Key Changes

### 1. Build Tool & Framework

| Aspect | Vite + React | Next.js |
|--------|-------------|---------|
| **Build** | Vite (npm run dev) | Next.js built-in (npm run dev) |
| **Routing** | Manual React Router | Built-in App Router |
| **API** | Frontend only | Built-in API Routes (/app/api) |
| **Dev Server** | localhost:5173 | localhost:3000 |
| **Deployment** | Static: Vercel/Netlify | Native: Vercel |
| **i18n** | react-i18next | next-i18next |

### 2. Project Structure

**Vite:**
```
src/
├── main.tsx
├── App.tsx
├── components/
├── pages/
├── lib/
└── i18n/
```

**Next.js (App Router):**
```
app/
├── layout.tsx          (replaces App.tsx)
├── page.tsx            (home page)
├── api/                (NEW: API routes)
└── [dynamic]/page.tsx  (dynamic routes)

components/
lib/
i18n/
```

### 3. File Changes

#### Removed Files
- `src/main.tsx` - Not needed (Next.js handles entry)
- `vite.config.ts` - Replaced by next.config.js
- `index.html` - Not needed (Next.js generates)

#### New Files
- `next.config.js` - Next.js configuration
- `next-i18next.config.js` - i18n configuration
- `app/layout.tsx` - Root layout
- `app/page.tsx` - Home page
- `app/globals.css` - Global styles
- `app/api/*/route.ts` - API routes

#### Updated Files
- `tsconfig.json` - Next.js specific settings
- `tailwind.config.js` - Content paths updated
- `.eslintrc.json` - Next.js ESLint config

### 4. Component Changes

#### Before (React SPA):
```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SavedRecipesPage from './pages/SavedRecipesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/saved-recipes" element={<SavedRecipesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

#### After (Next.js App Router):
```typescript
// app/layout.tsx - Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx - Home page (automatic)
export default function HomePage() {
  return <div>Home</div>;
}

// app/saved-recipes/page.tsx - /saved-recipes route (automatic)
export default function SavedRecipesPage() {
  return <div>Saved Recipes</div>;
}
```

**Advantages:**
- No router package needed
- Routes are file-system based
- Automatic code splitting per page

### 5. Async Operations

#### Before (React):
```typescript
useEffect(() => {
  const data = loadRecipe(id);
  setRecipe(data);
}, [id]);
```

#### After (Next.js Server Components):
```typescript
// Server Component by default
export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await loadRecipe(params.id);
  return <RecipeDisplay recipe={recipe} />;
}
```

**Advantages:**
- Fetch data server-side
- No loading states needed
- Better SEO
- Can access databases directly

### 6. i18n Integration

#### Before (react-i18next):
```typescript
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export function Component() {
  const { t } = useTranslation();
  return <div>{t('app.title')}</div>;
}
```

#### After (next-i18next):
```typescript
import { useTranslation } from 'next-i18next';

export function Component() {
  const { t } = useTranslation();
  return <div>{t('app.title')}</div>;
}
```

**Same usage, just optimized for Next.js.**

### 7. Static Generation vs Client Rendering

**Server-Side:**
```typescript
// app/recipes/[id]/page.tsx
export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map(r => ({ id: r.id }));
}

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await loadRecipe(params.id);
  return <div>{recipe.name}</div>;
}
```

**Client-Side (for interactive components):**
```typescript
'use client'; // Make this a client component

import { useRecipe } from '@/hooks/useRecipe';

export function RecipeForm() {
  const { recipe, updateRecipe } = useRecipe();
  return <form>{/* interactive form */}</form>;
}
```

---

## Migration Checklist

- [ ] **Task 001:** Replace Vite init with Next.js init
- [ ] **Task 002:** Keep TypeScript types as-is (no changes)
- [ ] **Task 003:** Update i18n to next-i18next
- [ ] **Task 004:** Update file structure for Next.js
- [ ] **Task 005:** Vitest setup for Next.js
- [ ] **Task 006-010:** Business logic unchanged (can reuse)
- [ ] **Task 011-013:** Storage layer unchanged (localStorage works same)
- [ ] **Task 014-021:** Components need 'use client' where needed
- [ ] **Task 022-024:** Pages become app/page.tsx files
- [ ] **Task 025-033:** No changes needed

---

## Benefits of Next.js

1. **Built-in Routing:** No React Router package needed
2. **API Routes:** Backend logic in same codebase (`app/api/*`)
3. **Server Components:** Render on server, less JS sent to browser
4. **Image Optimization:** Automatic image optimization
5. **Performance:** Better Web Vitals out of the box
6. **Vercel Integration:** Seamless deployment, edge functions
7. **Middleware:** Global request handling
8. **Database Integration:** Can directly call databases from server components

---

## Backward Compatibility

**Good News:** Most code stays the same!

- ✅ TypeScript types (no changes needed)
- ✅ Business logic (`calculator.ts`, `storage.ts`)
- ✅ Constants and utilities
- ✅ Testing approach (Vitest still works)
- ✅ Tailwind CSS (same configuration)
- ✅ i18n keys (same translations, just next-i18next)

**What Changes:**
- ❌ Build tool (Vite → Next.js)
- ❌ Routing (manual → file-system based)
- ❌ Entry point (main.tsx → app/layout.tsx)
- ❌ Some component patterns (async components available)

---

## Performance Improvements

| Metric | Vite + React | Next.js |
|--------|-------------|---------|
| **Bundle Size** | ~150KB | ~100KB (smaller with server components) |
| **First Paint** | ~2s | ~1.5s |
| **API Calls** | Client-side HTTP | Server-side direct |
| **Database Access** | Not possible | Possible (server components) |
| **Image Loading** | Manual optimization | Automatic via <Image /> |

---

## Common Gotchas

### 1. Hydration Issues
```typescript
// ❌ Bad: Different server vs client render
export default function Clock() {
  const [time, setTime] = useState(new Date());
  return <div>{time.toString()}</div>;
}

// ✅ Good: Use useEffect for client-side only
'use client';

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    setTime(new Date());
  }, []);
  
  if (!time) return null;
  return <div>{time.toString()}</div>;
}
```

### 2. localStorage Access
```typescript
// ❌ Bad: Server can't access localStorage
export async function getSettings() {
  return JSON.parse(localStorage.getItem('settings'));
}

// ✅ Good: Do on client side
'use client';

export function SettingsComponent() {
  useEffect(() => {
    const settings = localStorage.getItem('settings');
    // ...
  }, []);
}
```

### 3. Image Paths
```typescript
// Use next/image instead of <img>
import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={100}
      height={100}
    />
  );
}
```

---

## Testing Migration

### Vitest + Next.js
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

Same tests work! Just ensure `@/` imports are configured.

---

## Deployment

### Vercel (Recommended)
```bash
# Same as before - Vercel detects Next.js automatically
git push origin main
# Vercel auto-deploys
```

### Environment Variables
```
.env.local (never commit)
.env.production (for build-time secrets)
```

---

## References

- [Next.js Docs](https://nextjs.org/docs)
- [next-i18next](https://github.com/isaachinman/next-i18next)
- [App Router Migration](https://nextjs.org/docs/app/building-your-application/routing/defining-routes)
- [Server vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-and-client-components)

---

## Questions & Support

For migration questions:
1. Check Next.js official docs
2. Refer to this guide
3. Review updated task files
4. Check CLAUDE.md for architecture

---

**End of Migration Guide**
