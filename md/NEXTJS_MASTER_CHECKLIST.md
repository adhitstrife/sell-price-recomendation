# Next.js Migration - Master Checklist

**Project:** Harga Jual Menu Calculator  
**Date:** 2026-06-10  
**Status:** Ready for Implementation

---

## 📋 Pre-Implementation Checklist

### Environment Setup
- [ ] Node.js 18+ installed
- [ ] npm or pnpm available
- [ ] Git installed and configured
- [ ] Code editor ready (VS Code recommended)
- [ ] Terminal/CLI accessible

### Documentation Review
- [ ] Read: `NEXTJS_UPDATES_COMPLETE.md` (5 min)
- [ ] Skim: `NEXTJS_FILE_STRUCTURE_GUIDE.md` (10 min)
- [ ] Understand: Vite → Next.js changes
- [ ] Know: Where files go in new structure
- [ ] Familiar: With 'use client' directive

### Preparation
- [ ] Backup current project (if exists)
- [ ] Clear workspace
- [ ] Open task files for reference
- [ ] Have internet connection (for npm install)
- [ ] Block 2-3 hours for Phase 1 setup

---

## ✅ Phase 1: Foundation (Tasks 001-005)

### Task 001: Initialize Next.js Project

**Pre-checks:**
- [ ] Node.js 18+ verified
- [ ] Task 001 file reviewed
- [ ] Next.js commands understood
- [ ] Project folder ready

**Implementation:**
- [ ] Run: `npx create-next-app@latest harga-jual-menu --typescript --tailwind --app --eslint --git`
- [ ] Verify: App Router selected (not Pages)
- [ ] Check: `npm run dev` starts at localhost:3000
- [ ] Test: Home page renders
- [ ] Build: `npm run build` succeeds
- [ ] Lint: `npm run lint` passes
- [ ] Git: Initial commit created

**Deliverables:**
- [ ] Next.js project created
- [ ] All dependencies installed
- [ ] Dev server runs
- [ ] Build succeeds
- [ ] Git initialized

**Status:** _______________

---

### Task 002: Define TypeScript Types

**Pre-checks:**
- [ ] Task 002 file reviewed
- [ ] Task 001 completed
- [ ] TypeScript strict mode enabled

**Implementation:**
- [ ] Create: `app/lib/types.ts`
- [ ] Define: Recipe, Ingredient, Overhead interfaces
- [ ] Define: PricingConfig, Unit, Result types
- [ ] Export: All types from lib
- [ ] Verify: No TypeScript errors

**Deliverables:**
- [ ] `app/lib/types.ts` with all interfaces
- [ ] Type exports organized
- [ ] No TypeScript errors

**Status:** _______________

---

### Task 003: Setup i18n (next-i18next)

**Pre-checks:**
- [ ] Task 003 file reviewed
- [ ] Task 001 completed
- [ ] next-i18next package installed

**Implementation:**
- [ ] Create: `next-i18next.config.js`
- [ ] Create: `app/i18n/` folder
- [ ] Create: `app/i18n/id.json` (Indonesian keys)
- [ ] Create: `app/i18n/en.json` (English keys)
- [ ] Setup: next-i18next provider in layout
- [ ] Test: Language toggle works

**Deliverables:**
- [ ] next-i18next.config.js configured
- [ ] Translation files (id.json, en.json)
- [ ] i18n initialized in app
- [ ] Language switching works

**Status:** _______________

---

### Task 004: Directory Structure & Utilities

**Pre-checks:**
- [ ] Task 004 file reviewed
- [ ] Tasks 001-003 completed
- [ ] File structure guide reviewed

**Implementation:**
- [ ] Create: `app/components/` folder
- [ ] Create: `app/lib/` folder structure
- [ ] Create: `app/i18n/` folder
- [ ] Create: `app/api/` folder
- [ ] Create: `public/` folder
- [ ] Create: `tests/` folder
- [ ] Move: Utility files to `app/lib/`
- [ ] Create: `app/lib/api-client.ts` (fetch wrapper)
- [ ] Create: `app/lib/validation.ts` (validators)
- [ ] Create: `app/lib/formatting.ts` (formatters)
- [ ] Create: `app/lib/constants.ts` (app constants)

**Deliverables:**
- [ ] Canonical folder structure created
- [ ] Utility functions in place
- [ ] Constants defined
- [ ] API client initialized

**Status:** _______________

---

### Task 005: Testing Infrastructure

**Pre-checks:**
- [ ] Task 005 file reviewed
- [ ] Tasks 001-004 completed
- [ ] Vitest packages installed

**Implementation:**
- [ ] Create: `vitest.config.ts`
- [ ] Configure: jsdom environment
- [ ] Setup: Path aliases for tests
- [ ] Create: `tests/setup.ts`
- [ ] Create: Sample test file
- [ ] Verify: `npm test` runs
- [ ] Check: `npm test -- --coverage` works

**Deliverables:**
- [ ] `vitest.config.ts` configured
- [ ] Tests run with `npm test`
- [ ] Coverage reporting works
- [ ] Sample test passes

**Status:** _______________

---

## ✅ Phase 2: Business Logic (Tasks 006-010)

### Task 006-010: Calculators & Tests

**Status:**
- [ ] Task 006: Unit conversion - REUSE
- [ ] Task 007: Food Cost % calculator - REUSE
- [ ] Task 008: Markup calculator - REUSE
- [ ] Task 009: Market-based calculator - REUSE
- [ ] Task 010: Comprehensive tests - REUSE

**Notes:**
- These tasks have NO changes from Vite version
- Business logic is 100% reusable
- Just copy/paste into `app/lib/`
- Existing tests work as-is

**Status:** _______________

---

## ✅ Phase 3: Storage (Tasks 011-013)

### Task 011-013: Storage Layer

**Status:**
- [ ] Task 011: localStorage helpers - REUSE
- [ ] Task 012: Recipe list management - REUSE
- [ ] Task 013: Settings storage - REUSE

**Notes:**
- Storage logic unchanged
- localStorage works same in Next.js
- Copy implementation from Vite version
- Tests work without modification

**Status:** _______________

---

## ✅ Phase 4: UI Components (Tasks 014-021)

### Task 014: RecipeContext & Hook

**Updates needed:**
- [ ] Add `'use client';` at top of file
- [ ] Import from `@/lib/types`
- [ ] Adjust storage import paths
- [ ] Rest of logic unchanged

**Status:** _______________

---

### Task 015: SettingsContext & Hook

**Updates needed:**
- [ ] Add `'use client';` at top
- [ ] Storage import paths updated
- [ ] Rest of logic unchanged

**Status:** _______________

---

### Tasks 016-021: UI Components

**For each component:**
- [ ] Create: `app/components/[ComponentName].tsx`
- [ ] Add: `'use client';` at top (if using hooks/state)
- [ ] Import: From `@/lib/types`
- [ ] Import: From `@/hooks/useRecipe`
- [ ] Test: Component renders

**Components:**
- [ ] Task 016: IngredientInput
- [ ] Task 017: IngredientList
- [ ] Task 018: OverheadInput
- [ ] Task 019: PricingMethodSelector
- [ ] Task 020: MarketPriceInput
- [ ] Task 021: ResultDisplay

**Status:** _______________

---

## ✅ Phase 5: Pages & Layout (Tasks 022-024)

### Task 022: HomePage

**Create:**
- [ ] `app/page.tsx` (home page)
- [ ] Add: `'use client';` directive
- [ ] Import: All components
- [ ] Wire up: Component interactions
- [ ] Test: Page renders

**Status:** _______________

---

### Task 023: SavedRecipesPage

**Create:**
- [ ] `app/saved-recipes/page.tsx`
- [ ] Add: `'use client';` directive
- [ ] Import: RecipeList component
- [ ] Wire up: Load/delete functionality
- [ ] Test: Page works

**Status:** _______________

---

### Task 024: App Layout & Routing

**Update:**
- [ ] `app/layout.tsx` (root layout)
- [ ] Add: Providers wrapper
- [ ] Add: Navigation component
- [ ] Wire up: i18n provider
- [ ] Test: Routing works

**Status:** _______________

---

## ✅ Phase 6: Additional Features (Tasks 025-027)

### Tasks 025-027: Optional Features

**Status:**
- [ ] Task 025: LanguageToggle - minor updates
- [ ] Task 026: RecipeList component - minor updates
- [ ] Task 027: Error Boundaries - minor updates

**Updates:**
- Add `'use client';` to client components
- Update imports to use `@/`

**Status:** _______________

---

## ✅ Phase 7: Styling & Polish (Tasks 028-030)

### Tasks 028-030: Styling & Accessibility

**Status:**
- [ ] Task 028: Tailwind styling - NO CHANGES
- [ ] Task 029: Global styles - NO CHANGES
- [ ] Task 030: Accessibility - NO CHANGES

**Notes:**
- Tailwind configuration already done in Task 001
- Tailwind utilities work same in Next.js
- No code changes needed

**Status:** _______________

---

## ✅ Phase 8: Integration & Deploy (Tasks 031-033)

### Task 031: E2E Integration Testing

**Status:**
- [ ] Manual user workflow testing
- [ ] All 3 pricing methods work
- [ ] Recipe save/load works
- [ ] Language toggle persists

**Status:** _______________

---

### Task 032: Performance Optimization

**Checklist:**
- [ ] Run: `npm run build`
- [ ] Check: Bundle size < 150KB gzipped
- [ ] Run: Lighthouse audit
- [ ] Target: Lighthouse > 90
- [ ] Optimize: If needed

**Status:** _______________

---

### Task 033: Deployment Setup

**Vercel Deploy:**
- [ ] Create: Vercel account
- [ ] Connect: GitHub repo
- [ ] Set: Environment variables
- [ ] Deploy: Production
- [ ] Verify: App is live

**Status:** _______________

---

## 🎯 Summary by Phase

| Phase | Tasks | Status | ⏱️ |
|-------|-------|--------|-----|
| 1 | 001-005 | _____ | 3-5h |
| 2 | 006-010 | _____ | 2-3h |
| 3 | 011-013 | _____ | 1-2h |
| 4 | 014-021 | _____ | 4-5h |
| 5 | 022-024 | _____ | 1-2h |
| 6 | 025-027 | _____ | 1h |
| 7 | 028-030 | _____ | 2-3h |
| 8 | 031-033 | _____ | 1-2h |
| **TOTAL** | **ALL** | | **15-23h** |

---

## 🔄 Code Reusability Matrix

| Code | Reusable | Action |
|------|----------|--------|
| **calculator.ts** | ✅ 100% | Copy as-is |
| **unitConversion.ts** | ✅ 100% | Copy as-is |
| **storage.ts** | ✅ 100% | Copy as-is |
| **types.ts** | ✅ 100% | Recreate (simpler) |
| **constants.ts** | ✅ 100% | Copy as-is |
| **UI Components** | ⚠️ 90% | Add 'use client' |
| **Contexts** | ⚠️ 90% | Add 'use client' |
| **Hooks** | ⚠️ 80% | Update imports |
| **Tests** | ✅ 100% | Update config only |

---

## 📝 Daily Standup Template

```
Date: _______________
Developer: _______________

✅ Completed Today:
- [ ] Task ___: [Description]
- [ ] Test ___: [Description]

⏳ In Progress:
- [ ] Task ___: [Description]

🚧 Blocked By:
- None / [Description]

📅 Plan for Tomorrow:
- [ ] Task ___: [Description]

⏱️ Time Spent: _____ hours
```

---

## 🛠️ Troubleshooting Quick Reference

| Error | Solution | Reference |
|-------|----------|-----------|
| "Cannot find @/" | Check path aliases in tsconfig.json | GUIDE |
| "'use client' needed" | Add directive at top of file | MIGRATION |
| "Module not found" | Check import paths (use @/) | GUIDE |
| "localStorage undefined" | Wrap in useEffect, use 'use client' | MIGRATION |
| "Build fails" | Run `npm run lint`, fix TypeScript errors | Task 001 |

---

## 📚 Documentation Quick Links

| Document | Best For | Read Time |
|----------|----------|-----------|
| `NEXTJS_DOCUMENTATION_INDEX.md` | Overview | 10 min |
| `NEXTJS_UPDATES_COMPLETE.md` | What changed | 5 min |
| `MIGRATION_TO_NEXTJS.md` | Details | 20 min |
| `NEXTJS_FILE_STRUCTURE_GUIDE.md` | Structure | 15 min |
| `task-001-next.md` | Setup | 15 min |
| `CLAUDE.md` | Standards | Ongoing |

---

## ✨ Success Indicators

**Phase 1 Complete:**
- [ ] App runs at localhost:3000
- [ ] No TypeScript errors
- [ ] All configs in place
- [ ] Tests run

**Phase 2 Complete:**
- [ ] All calculators working
- [ ] All tests passing
- [ ] 100% coverage for calculator.ts

**Phase 4 Complete:**
- [ ] All UI renders
- [ ] Context works
- [ ] Components interactive

**Phase 5 Complete:**
- [ ] Pages route correctly
- [ ] Navigation works
- [ ] Full workflow testable

**All Phases Complete:**
- [ ] Build succeeds
- [ ] Lighthouse > 90
- [ ] Deployed to Vercel
- [ ] App is live

---

## 🎓 Notes & Learning Log

**Lessons Learned:**
```
1. _________________________________
2. _________________________________
3. _________________________________
4. _________________________________
5. _________________________________
```

**Questions Answered:**
```
Q: _________________________________
A: _________________________________

Q: _________________________________
A: _________________________________
```

**Issues Encountered:**
```
Issue 1: _______________________________
Solution: _____________________________

Issue 2: _______________________________
Solution: _____________________________
```

---

## 📞 Support Resources

**When Stuck:**
1. Check: Relevant section in MIGRATION_TO_NEXTJS.md
2. Review: NEXTJS_FILE_STRUCTURE_GUIDE.md examples
3. Search: Task file for similar situation
4. Reference: CLAUDE.md standards
5. Consult: Next.js docs (https://nextjs.org/docs)

**Quick Help:**
- Component patterns: NEXTJS_FILE_STRUCTURE_GUIDE.md
- File structure: Same document
- Config issues: Check setup in Task 001
- Testing: Vitest config section

---

## 🏁 Final Checklist

Before considering project complete:

- [ ] All 33 tasks completed
- [ ] No TypeScript errors
- [ ] Tests passing (100% calculator coverage)
- [ ] Build succeeds (`npm run build`)
- [ ] Lighthouse > 90
- [ ] App responsive (mobile/tablet/desktop)
- [ ] i18n working (ID & EN)
- [ ] localStorage working
- [ ] All 3 pricing methods working
- [ ] Save/load recipes working
- [ ] Deployed to Vercel
- [ ] App accessible at live URL
- [ ] No console errors in production

---

## 🎉 Celebration Checklist

When complete, celebrate:
- [ ] Take a screenshot of live app
- [ ] Share with team
- [ ] Document lessons learned
- [ ] Plan Phase 2 features
- [ ] Gather user feedback
- [ ] Schedule retrospective

---

**Status: Ready to Start Implementation**

**First Task:** Task 001 - Initialize Next.js Project  
**Estimated Completion:** 15-23 hours  
**Next Review:** After Phase 1 complete (3-5 hours)

---

**Good luck! You've got this! 🚀**

Generated: 2026-06-10  
Framework: Next.js 14+ with App Router  
Status: Ready for Implementation

**End of Master Checklist**
