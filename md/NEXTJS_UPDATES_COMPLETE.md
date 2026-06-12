# Next.js Migration - What's Been Updated

**Date:** 2026-06-10  
**Status:** Phase 1 Complete, Phase 2-3 In Progress

---

## Files Updated ✅

### Core Documentation
- ✅ **`md/plan.md`** - Tech stack: Vite → Next.js 14+
  - Updated Framework section
  - Updated project structure
  
- ✅ **`md/TASKS.md`** - Phase 1 descriptions updated
  - Task 001: Changed from Vite init to Next.js init
  - Duration updated: 45 min → 60 min (slightly more complex)
  
- ✅ **`md/tasks/task-001.md`** - **RECREATED for Next.js**
  - Setup: `create-next-app` with App Router
  - Structure: `app/` instead of `src/`
  - Config: next.config.js, tsconfig.json, tailwind.config.ts

### New Files Created
- ✅ **`md/tasks/MIGRATION_TO_NEXTJS.md`** (30+ KB)
  - Complete migration guide
  - Before/after comparisons
  - Common gotchas
  - Testing strategy
  
- ✅ **`md/tasks/NEXTJS_UPDATE_SUMMARY.md`** (15+ KB)
  - Executive summary
  - Architectural changes diagram
  - Performance benefits table
  - FAQ section

- ✅ **`md/tasks/task-001-next.md`** (Backup copy of updated Task 001)

---

## Files NOT Yet Updated (Next Steps)

### High Priority 🔴
These sections in `md/CLAUDE.md` need Next.js updates:

1. **Architecture Section** (Line ~360)
   - Architecture diagram needs update (add serverless functions)
   - Technology Stack Rationale table (update Vite → Next.js)
   
2. **File Organization Rules** (Line ~600)
   - Update directory structure to show `app/` instead of `src/`
   - Add API routes section (`app/api/*`)
   - Show new next-i18next.config.js

3. **Do Not Guidelines** (Line ~1000+)
   - Remove Vite-specific rules
   - Add Next.js-specific rules (use 'use client', Server Components)

### Medium Priority 🟡
These task files need Next.js-specific updates:

1. **Task 003** - i18n setup
   - Change from react-i18next to next-i18next
   - Update config file path to next-i18next.config.js
   
2. **Task 004** - Directory structure
   - Show App Router structure (`app/` instead of `src/`)
   - Add API routes folder structure
   
3. **Task 005** - Testing infrastructure
   - Vitest config for Next.js paths (@/ aliases)
   - jsdom environment

4. **Task 014** - RecipeContext
   - Add `'use client'` directive
   - Note about client-side state

5. **Task 015** - SettingsContext
   - Add `'use client'` directive

### Lower Priority 🟢
These tasks have minimal changes:

- Task 016-021: UI components (add `'use client'` at top)
- Task 022-024: Pages (change from Pages/ to App Router structure)
- Task 028-030: Styling (Tailwind same, no changes)

---

## What's Ready to Use

✅ **Ready for Implementation:**
- [x] Updated `plan.md` (tech stack confirmed)
- [x] Updated `TASKS.md` (phase 1 clear)
- [x] New Task 001 for Next.js
- [x] Migration guide for reference
- [x] Business logic tasks (006-010) - NO CHANGES NEEDED
- [x] Storage layer tasks (011-013) - NO CHANGES NEEDED

⏳ **Needs Minor Updates:**
- [ ] CLAUDE.md (architecture sections)
- [ ] Tasks 003-005 (setup tasks)
- [ ] Tasks 014-015 (context providers)
- [ ] Tasks 022-024 (pages)

---

## Quick Reference: What Changed

### For Developers

```javascript
// ✅ UNCHANGED - Use as-is
calculator.ts          // Pure functions
unitConversion.ts      // Pure functions
storage.ts             // localStorage helpers
types.ts               // TypeScript interfaces
constants.ts           // App constants
tests/                 // All tests work same

// ⚠️ ADD 'use client' DIRECTIVE
components/IngredientInput.tsx     // Add 'use client' at top
contexts/RecipeContext.tsx         // Add 'use client' at top
hooks/useRecipe.ts                 // Add 'use client' at top

// 🔄 STRUCTURE CHANGE
src/App.tsx            → app/layout.tsx
src/pages/HomePage.tsx → app/page.tsx
src/pages/SavedRecipesPage.tsx → app/saved-recipes/page.tsx

// 🆕 NEW
app/api/recipes/route.ts      // New API routes
app/api/calculate/route.ts    // New backend
next.config.js                // Next.js config
next-i18next.config.js        // i18n config
```

---

## Implementation Plan

### Option 1: Complete Documentation First (Recommended)
1. Update CLAUDE.md architecture sections
2. Update Tasks 003-005
3. Update Tasks 014-024
4. Review all docs
5. **Then** start implementation

**Estimated time:** 2-3 hours  
**Benefit:** Complete clarity before coding

### Option 2: Start Implementation Now
1. Use current documentation
2. Follow Task 001 (Next.js version)
3. Update docs as you go
4. Refer to migration guide for issues

**Estimated time:** 20+ hours  
**Benefit:** Start building sooner, self-discover

---

## Key Points for Developers

### When Reading Updated CLAUDE.md
- Look for "App Router" references
- Check next.config.js examples
- Review Server Components info
- Note 'use client' directive requirements

### When Implementing Tasks
- Follow the migration guide for any unclear parts
- Use `@/` path aliases (already configured)
- Add `'use client'` to interactive components
- Test API routes separately from UI

### When Running Tests
- Vitest config must include path aliases
- Environment: jsdom (for React component tests)
- API route tests: use fetch or route handlers

---

## Recommended Reading Order

1. **This file** ← Start here (2 min)
2. **`md/tasks/NEXTJS_UPDATE_SUMMARY.md`** (5 min) - Executive overview
3. **`md/tasks/MIGRATION_TO_NEXTJS.md`** (15 min) - Detailed guide
4. **`md/tasks/task-001-next.md`** (10 min) - Specific setup steps
5. **`md/CLAUDE.md`** (30 min) - Once updated

**Total reading time: ~60 minutes** before implementation

---

## Questions This Addresses

**Q: Is all code reusable?**  
A: ~80-90%. Business logic 100% reusable, UI components need `'use client'` directive.

**Q: Do I need to learn a lot?**  
A: No. If you know React, Next.js is a small step. Main difference is routing and layout.

**Q: When can I start?**  
A: Now! Use Task 001 (Next.js version) and follow the migration guide.

**Q: What if I get stuck?**  
A: Check MIGRATION_TO_NEXTJS.md first, then CLAUDE.md (once updated).

---

## Validation Checklist

Before starting implementation, verify:

- [ ] You've read this summary
- [ ] You understand Vite → Next.js differences
- [ ] You know where `app/` folder goes
- [ ] You understand 'use client' directive
- [ ] You can access migration guide
- [ ] You have Node 18+ installed
- [ ] You understand localStorage still works

---

## What's Next

### Immediate (Next 1 hour)
- [ ] Read this file fully
- [ ] Skim NEXTJS_UPDATE_SUMMARY.md
- [ ] Review task-001-next.md

### Short-term (Next 2-3 hours)
- [ ] (Optional) Update CLAUDE.md if needed
- [ ] (Optional) Update remaining task files
- [ ] Set up development environment

### Implementation (Next 15-20 hours)
- [ ] Task 001: Initialize Next.js
- [ ] Tasks 002-005: Setup
- [ ] Tasks 006-010: Business logic
- [ ] Tasks 011-013: Storage
- [ ] Tasks 014-024: UI & Pages
- [ ] Tasks 025-033: Features & Deploy

---

## Support Resources

**During Implementation:**
1. Check task file you're on
2. Review relevant CLAUDE.md section
3. Consult MIGRATION_TO_NEXTJS.md
4. Check Next.js docs: https://nextjs.org/docs

**If Stuck:**
1. Check "Common Gotchas" section in migration guide
2. Verify all dependencies installed
3. Review build output for errors
4. Check if `'use client'` directive needed

---

## Summary

✅ **You're ready to proceed!**

- Documentation framework is solid
- Migration path is clear
- Business logic is preserved
- New architectural benefits are documented

**Next action:** Start with Task 001 (Next.js version) or complete CLAUDE.md updates first.

---

**Questions? Check the migration guide first!**

Generated: 2026-06-10  
Framework: Next.js 14+ with App Router  
Status: Ready for Implementation

---

**End of Update Summary**
