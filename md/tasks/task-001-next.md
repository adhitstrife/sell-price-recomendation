# Task 001: Initialize Next.js Project (UPDATED FOR NEXT.JS)

**Phase:** 1 - Foundation  
**Duration:** 60 minutes  
**Status:** Pending

---

## Title
Initialize Next.js 14+ Project with App Router, TypeScript, and Tailwind CSS

---

## Description

Set up a new Next.js project with App Router, strict TypeScript, and Tailwind CSS for styling.

**What will be done:**
1. Create Next.js 14+ project with App Router (`create-next-app`)
2. Enable TypeScript strict mode
3. Configure Tailwind CSS
4. Install required dependencies (next-i18next, Vitest, etc.)
5. Setup project structure per CLAUDE.md specs
6. Configure next.config.js and tsconfig.json
7. Verify dev server runs correctly
8. Setup Git repository
9. Create initial folder structure

**Why this matters:**
- Foundation for entire application
- All other tasks depend on this
- TypeScript strict mode enforces type safety
- Next.js provides built-in routing and API routes
- App Router is modern, React 18+ optimized

---

## Dependencies

- Node.js 18+ with npm or pnpm
- Git installed
- Code editor (VS Code recommended)

---

## Acceptance Criteria

✓ **Project Created:**
- [ ] Next.js 14+ initialized with `create-next-app`
- [ ] App Router selected (not Pages Router)
- [ ] TypeScript enabled with strict mode
- [ ] Tailwind CSS configured and working
- [ ] Git initialized with initial commit

✓ **Development:**
- [ ] `npm run dev` starts dev server at localhost:3000
- [ ] Hot Module Replacement (HMR) works smoothly
- [ ] TypeScript strict mode active (no errors on startup)
- [ ] `npm run build` completes successfully
- [ ] Production build can be started with `npm run start`

✓ **Configuration Files:**
- [ ] `next.config.js` present and configured
- [ ] `tsconfig.json` with strict: true and baseUrl
- [ ] `tailwind.config.ts` configured
- [ ] `.eslintrc.json` configured
- [ ] `next-i18next.config.js` stub created
- [ ] `.gitignore` includes: node_modules/, .next/, .env.local

✓ **Dependencies Installed:**
- [ ] `react` and `react-dom` (18+)
- [ ] `next` (14+)
- [ ] `typescript`
- [ ] `tailwindcss`, `postcss`, `autoprefixer`
- [ ] `next-i18next`, `i18next`
- [ ] `vitest`, `@testing-library/react`, `jsdom` (dev dependencies)
- [ ] ESLint, Prettier (optional but recommended)

✓ **Initial Structure:**
- [ ] `app/layout.tsx` created (root layout with Providers)
- [ ] `app/page.tsx` created (home page)
- [ ] `app/globals.css` with Tailwind imports
- [ ] `app/api/` folder created with skeleton routes
- [ ] Required folder structure:
  - [ ] `components/`
  - [ ] `lib/`
  - [ ] `i18n/`
  - [ ] `public/`
  - [ ] `tests/`

---

## Technical Notes

### Create Next.js Project

```bash
npx create-next-app@latest harga-jual-menu \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --git

cd harga-jual-menu
```

**Installer Choices:**
- Use TypeScript? **Yes**
- Use ESLint? **Yes**
- Use Tailwind CSS? **Yes**
- Use `src/` directory? **No** (use root app/)
- Use App Router? **Yes**
- Use Turbopack? **Yes** (optional, faster)

### Install Additional Dependencies

```bash
npm install next-i18next i18next
npm install -D vitest @testing-library/react jsdom
```

### Key Configuration Files

**next.config.js** (with i18n stub):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
  },
};

module.exports = nextConfig;
```

**tsconfig.json** (strict mode):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
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
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**tailwind.config.ts**:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0284c7',
        secondary: '#64748b',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
}

export default config
```

**app/globals.css** (Tailwind + globals):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  color: #1f2937;
}
```

**app/layout.tsx** (root layout):
```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalkulator Harga Jual",
  description: "Hitung harga jual optimal untuk menu makanan Anda",
};

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
```

### Initial Directory Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx            # Home page (/)
├── globals.css         # Tailwind imports & global styles
└── api/                # API routes folder (skeleton)
    ├── recipes/
    │   └── route.ts    # Stub
    ├── settings/
    │   └── route.ts    # Stub
    └── calculate/
        └── route.ts    # Stub

components/             # React components (empty)

lib/                    # Utilities & business logic
├── types.ts            # TypeScript interfaces (empty)
└── constants.ts        # App constants (empty)

i18n/                   # Internationalization
├── id.json             # Indonesian strings (empty)
├── en.json             # English strings (empty)
└── config.ts           # next-i18next config (stub)

public/                 # Static assets
└── favicon.ico         # Favicon

tests/                  # Test files (empty folder)

package.json            # Dependencies
next.config.js          # Next.js configuration
tsconfig.json           # TypeScript configuration
tailwind.config.ts      # Tailwind configuration
next-i18next.config.js  # i18n configuration (stub)
.eslintrc.json          # ESLint configuration
.gitignore              # Git ignore rules
```

---

## Testing Requirements

✓ **Verification Steps:**
- [ ] Project structure matches canonical layout
- [ ] All dependencies installed without warnings
- [ ] `npm run dev` starts dev server at localhost:3000
- [ ] Home page renders (default Next.js page)
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` runs (no critical errors)
- [ ] No TypeScript errors in IDE
- [ ] Tailwind CSS loads (inspect page, check <style> tags)
- [ ] Hot reload works (edit app/page.tsx, see changes instantly)
- [ ] Git history shows initial commit

---

## Deliverables

- [ ] Next.js 14+ project initialized
- [ ] App Router configured (NOT Pages Router)
- [ ] TypeScript strict mode enabled
- [ ] Tailwind CSS fully configured
- [ ] All required dependencies installed
- [ ] Configuration files setup correctly
- [ ] Initial folder structure matches canonical layout
- [ ] Dev server runs at localhost:3000
- [ ] Production build succeeds
- [ ] Git repository initialized with initial commit

---

## Code Quality Checklist

- [ ] TypeScript strict mode enabled: `"strict": true`
- [ ] No `any` types in initial setup
- [ ] ESLint configured and passing
- [ ] .gitignore comprehensive (no .env files committed)
- [ ] Path aliases configured: `@/*`
- [ ] No console errors on startup
- [ ] Build artifacts in .gitignore

---

## Notes

- **create-next-app** handles all configuration automatically
- **App Router** is the recommended Next.js routing model
- Dev server hot-reloads on file changes (better than manual refresh)
- Build output optimized by Next.js automatically
- API routes can be added later without project restructuring
- Environment variables can be added to `.env.local`

---

## Next Tasks

**Unblocks:**
- Task 002: Define TypeScript types
- Task 003: Setup i18n with next-i18next
- Task 004: Directory structure & utilities
- Task 005: Testing infrastructure (Vitest for Next.js)

---

**End of Task 001 (Next.js Version)**
