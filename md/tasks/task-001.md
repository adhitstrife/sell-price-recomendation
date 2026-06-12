# Task 001: Initialize Vite Project

**Phase:** 1 - Foundation  
**Duration:** 45 minutes  
**Status:** Pending

---

## Title
Initialize Vite Project with React + TypeScript + Tailwind CSS

---

## Description

Set up a new Vite project from scratch with all necessary development tooling. This creates the foundation for all subsequent development.

**What will be done:**
1. Create Vite project with React template
2. Install TypeScript (strict mode)
3. Install Tailwind CSS and configure
4. Install necessary build and dev tools
5. Create basic project structure
6. Verify dev server runs without errors
7. Create `.gitignore` and basic README

**Why this matters:**
- Establishes fast development environment (Vite HMR)
- TypeScript ensures code quality throughout project
- Tailwind provides consistent styling system
- All developers work with identical toolchain

---

## Dependencies

- Node.js 16+
- npm or pnpm
- Git (for version control)

---

## Acceptance Criteria

✓ **Setup Complete:**
- [ ] Vite project created in `harga-jual-menu/` directory
- [ ] React 18+ installed
- [ ] TypeScript configured with strict mode enabled
- [ ] Tailwind CSS v3+ installed and configured
- [ ] `npm run dev` starts dev server on http://localhost:5173
- [ ] `npm run build` creates production bundle
- [ ] `npm run preview` serves production bundle locally

✓ **Configuration Files:**
- [ ] `vite.config.ts` exists with React plugin
- [ ] `tsconfig.json` has `strict: true`
- [ ] `tailwind.config.js` exists with basic config
- [ ] `postcss.config.js` exists (for Tailwind)
- [ ] `.gitignore` includes `node_modules/`, `dist/`, `.env.local`

✓ **Verification:**
- [ ] No build errors when running `npm run build`
- [ ] No TypeScript errors when running `tsc --noEmit`
- [ ] Dev server hot-reloads on file changes
- [ ] Tailwind classes work in basic test file

---

## Technical Notes

### Commands to Execute

```bash
# Create Vite project
npm create vite@latest harga-jual-menu -- --template react-ts

# Enter project
cd harga-jual-menu

# Install dependencies
npm install

# Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional dev tools (for later phases)
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Verify setup
npm run dev
```

### Key Configuration Changes

**tailwind.config.js:**
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**tsconfig.json (strict mode):**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Initial File Structure

After setup, verify this structure exists:
```
harga-jual-menu/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── assets/
│       └── react.svg
├── public/
└── node_modules/
```

---

## Testing Requirements

✓ **Manual Verification:**
1. Run `npm run dev` → Browser opens to localhost:5173
2. See default Vite + React welcome page
3. Edit `src/App.tsx` → Hot reload works
4. Run `npm run build` → No errors, `dist/` folder created
5. Run `npm run preview` → Production bundle serves correctly

✓ **No Automated Tests** (project setup phase)

---

## Deliverables

- [ ] Project directory with all Vite scaffolding
- [ ] `package.json` with all dependencies
- [ ] Configuration files (vite, TypeScript, Tailwind, PostCSS)
- [ ] Gitignore file
- [ ] Basic README.md
- [ ] Running dev environment

---

## Notes

- Do NOT delete default files yet (App.tsx, main.tsx, etc.). Task 004 will reorganize.
- Keep `src/index.css` for Tailwind imports
- Verify no TypeScript errors: `npx tsc --noEmit`
- Commit this state to git: `git init && git add . && git commit -m "chore: initial vite setup"`

---

## Next Task

→ **Task 002:** Define TypeScript Types (blocking for many others)

---

**End of Task 001**
