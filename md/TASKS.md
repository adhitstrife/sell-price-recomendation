# TASKS.md - Complete Implementation Roadmap

**Project:** Website Kalkulator Harga Jual Optimal Menu Makanan  
**Version:** 1.0  
**Created:** 2026-06-10  
**Estimated Total Duration:** 15-20 hours

---

## Overview

This roadmap breaks the project into 33 implementation tasks, organized in 8 sequential phases. Each task is independently implementable within a single development session (< 2 hours).

### Task Organization by Phase

| Phase | Tasks | Duration | Focus |
|-------|-------|----------|-------|
| 1. Foundation | 001-005 | 3-4h | Project setup, types, i18n, testing |
| 2. Business Logic | 006-010 | 2-3h | Calculators, unit conversion, tests |
| 3. Storage | 011-013 | 1-2h | localStorage implementation |
| 4. UI Components | 014-021 | 4-5h | React components, contexts, hooks |
| 5. Pages & Layout | 022-024 | 1-2h | Full-page layouts, routing |
| 6. Features | 025-027 | 1h | Language, error handling |
| 7. Styling & A11y | 028-030 | 2-3h | Tailwind, responsive, accessibility |
| 8. Integration & Deploy | 031-033 | 1-2h | Testing, optimization, deployment |

---

## Phase 1: Project Foundation (Tasks 001-005)

### Critical Path
All Phase 1 tasks must complete before proceeding. These establish the foundation for all development.

- **001** → Initialize Next.js project with App Router
- **002** → Define types (blocks: 003, 004, 006, 014, 015)
- **003** → i18n setup with next-i18next (blocks: 014-027)
- **004** → Directory structure & utilities (App Router structure)
- **005** → Testing infrastructure (Vitest for Next.js)

---

## Phase 2: Business Logic (Tasks 006-010)

### Critical Path
Complete in order: 006 → 007 → 008 → 009 → 010

- **006** Unit conversion system (no dependencies)
- **007** Food Cost % calculator (depends: 006)
- **008** Markup Multiplier calculator (depends: 006)
- **009** Market-Based calculator (depends: 006)
- **010** Comprehensive tests (depends: 006-009, 005)

---

## Phase 3: Storage Layer (Tasks 011-013)

### Critical Path
Can run in parallel after Phase 1:
- **011** localStorage helpers (depends: 002)
- **012** Recipe list management (depends: 011)
- **013** Settings storage (depends: 002, 011)

---

## Phase 4: UI Components (Tasks 014-021)

### Critical Path
Sequence matters for dependency:
- **014** RecipeContext (depends: 002, 003)
- **015** SettingsContext (depends: 002, 003)
- **016** IngredientInput (depends: 014, 015, 003, 006)
- **017** IngredientList (depends: 014, 016)
- **018** OverheadInput (depends: 014, 015, 003)
- **019** PricingMethodSelector (depends: 014, 015, 003, 007-009)
- **020** MarketPriceInput (depends: 015, 003, 009)
- **021** ResultDisplay (depends: 014, 015, 003, 006-009)

---

## Phase 5: Pages & Layout (Tasks 022-024)

### Critical Path
- **022** HomePage (depends: 016-021, 014-015)
- **023** SavedRecipesPage (depends: 014, 012)
- **024** App layout & routing (depends: 022-023)

---

## Phase 6: Additional Features (Tasks 025-027)

### Can run in parallel:
- **025** LanguageToggle (depends: 015, 003)
- **026** RecipeList (depends: 012, 023)
- **027** Error boundaries (depends: 005)

---

## Phase 7: Styling & Polish (Tasks 028-030)

### Sequential:
- **028** Tailwind styling & responsive (depends: 022-024)
- **029** Global styles & theme (depends: 028)
- **030** Accessibility features (depends: 028-029)

---

## Phase 8: Integration & Deployment (Tasks 031-033)

### Sequential:
- **031** E2E testing & integration (depends: all previous)
- **032** Performance optimization (depends: 031)
- **033** Deployment setup (depends: 032)

---

## Task Summary Table

| ID | Title | Duration | Dependencies | Status |
|----|-------|----------|--------------|--------|
| 001 | Initialize Vite Project | 45m | None | Pending |
| 002 | Define TypeScript Types | 30m | 001 | Pending |
| 003 | Setup i18n Configuration | 45m | 001, 002 | Pending |
| 004 | Directory Structure & Utils | 30m | 001 | Pending |
| 005 | Testing Infrastructure | 30m | 001, 004 | Pending |
| 006 | Implement Unit Conversion | 60m | 002, 005 | Pending |
| 007 | Food Cost % Calculator | 45m | 006, 002 | Pending |
| 008 | Markup Multiplier Calculator | 30m | 006, 002 | Pending |
| 009 | Market-Based Calculator | 60m | 006, 002 | Pending |
| 010 | Calculator Unit Tests | 90m | 006-009, 005 | Pending |
| 011 | localStorage Helpers | 60m | 002, 005 | Pending |
| 012 | Recipe List Management | 45m | 011, 002 | Pending |
| 013 | Settings Storage | 30m | 011, 002 | Pending |
| 014 | RecipeContext & Hook | 60m | 002, 003 | Pending |
| 015 | SettingsContext & Hook | 45m | 002, 003 | Pending |
| 016 | IngredientInput Component | 90m | 014, 015, 003, 006 | Pending |
| 017 | IngredientList Component | 60m | 014, 016 | Pending |
| 018 | OverheadInput Component | 75m | 014, 015, 003 | Pending |
| 019 | PricingMethodSelector | 90m | 014, 015, 003, 007-009 | Pending |
| 020 | MarketPriceInput Component | 60m | 015, 003, 009 | Pending |
| 021 | ResultDisplay Component | 90m | 014, 015, 003, 006-009 | Pending |
| 022 | HomePage Implementation | 90m | 016-021, 014-015, 011 | Pending |
| 023 | SavedRecipesPage | 75m | 014, 012, 022 | Pending |
| 024 | App Layout & Routing | 60m | 022-023 | Pending |
| 025 | LanguageToggle Component | 30m | 015, 003 | Pending |
| 026 | RecipeList Component | 45m | 012, 023 | Pending |
| 027 | Error Boundaries | 30m | 005 | Pending |
| 028 | Tailwind Styling | 120m | 022-024, 025-027 | Pending |
| 029 | Global Styles & Theme | 45m | 028 | Pending |
| 030 | Accessibility Features | 60m | 028-029 | Pending |
| 031 | E2E Integration Testing | 90m | All previous | Pending |
| 032 | Performance Optimization | 60m | 031 | Pending |
| 033 | Deployment Setup | 45m | 032 | Pending |

**Total Estimated Hours:** 17.5 hours (realistic: 15-20 hours with iterations)

---

## Success Criteria by Phase

### Phase 1 Complete ✓
- [ ] Project runs locally without errors
- [ ] TypeScript strict mode enabled
- [ ] All types defined (Recipe, Ingredient, Overhead, etc.)
- [ ] i18n working (ID/EN toggle in code)
- [ ] Test framework running
- [ ] Directory structure matches CLAUDE.md

### Phase 2 Complete ✓
- [ ] Unit conversion accurate for all supported pairs
- [ ] All 3 pricing calculators produce correct results
- [ ] 100% test coverage for calculator.ts
- [ ] Edge cases handled (0, negative, large numbers)
- [ ] No floating-point errors

### Phase 3 Complete ✓
- [ ] Recipes save/load from localStorage without loss
- [ ] Recipe list retrieval works
- [ ] Settings persist across page reloads
- [ ] Storage quota errors handled gracefully

### Phase 4 Complete ✓
- [ ] All components render without errors
- [ ] Contexts provide data to components
- [ ] Form inputs accept and validate user data
- [ ] Component snapshot tests pass

### Phase 5 Complete ✓
- [ ] HomePage displays full calculator workflow
- [ ] SavedRecipesPage displays saved recipes
- [ ] Routing between pages works
- [ ] App layout responsive on desktop

### Phase 6 Complete ✓
- [ ] Language toggle works (ID ↔ EN)
- [ ] Error messages display properly
- [ ] No console errors

### Phase 7 Complete ✓
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] All colors from design system applied
- [ ] Accessible keyboard navigation
- [ ] Screen reader compatible (tested)

### Phase 8 Complete ✓
- [ ] All critical user paths work end-to-end
- [ ] Lighthouse score > 90
- [ ] Bundle size < 150KB (gzipped)
- [ ] Deployed and accessible

---

## Parallel Work Opportunities

These groups of tasks can be worked on in parallel after dependencies:

**Parallel Set 1** (after 005):
- 006-009 (calculators can be coded simultaneously)
- 011-013 (storage layer)

**Parallel Set 2** (after 014-015):
- 016-020 (form components)
- 025 (language toggle)

**Parallel Set 3** (after 022-024):
- 028-030 (styling/accessibility)
- 031 (testing)

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Unit conversion bugs | HIGH | MEDIUM | Extensive test cases with real-world data |
| Floating-point precision | MEDIUM | HIGH | Use rounding function, test extensively |
| localStorage quota exceeded | LOW | MEDIUM | Check quota, show user-friendly error |
| i18n keys missing | MEDIUM | LOW | Automated check: keys in both languages |
| Responsive design breaks | MEDIUM | MEDIUM | Test on 3+ screen sizes |
| Performance > 2s LCP | LOW | HIGH | Lazy code split, bundle analysis |

---

## Next Steps

1. **Start with Task 001:** Initialize Vite project
2. **Complete Phase 1 sequentially:** 001→002→003→004→005
3. **Parallel Phase 2 & 3:** Run calculator development + storage setup together
4. **Batch Phase 4:** Build all form components (016-021)
5. **Complete pages:** 022→023→024
6. **Polish:** 028→030
7. **Final validation:** 031→032→033

---

## Time Tracking

Track actual vs. estimated time for each task. Update status column with:
- `Pending` → `In Progress` → `Complete` → `Complete (Tested)`

Use this roadmap as a checklist. Each task has a dedicated file: `tasks/task-NNN.md`

---

**End of TASKS.md**
