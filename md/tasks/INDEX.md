# Task Index & Summary

**Generated:** 2026-06-10  
**Project:** Harga Jual Menu Calculator  
**Total Tasks:** 33

---

## All Tasks Overview

### COMPLETED: Phase 1 - Foundation (Tasks 001-005)
- ✅ **Task 001** (45m): Initialize Vite Project with React + TypeScript + Tailwind CSS
- ✅ **Task 002** (30m): Define All TypeScript Types and Interfaces
- ✅ **Task 003** (45m): Configure i18n (react-i18next) with Base Translation Files
- ✅ **Task 004** (30m): Organize Project Directory Structure and Create Utility Functions
- ✅ **Task 005** (30m): Set Up Testing Framework (Vitest + React Testing Library)

**Phase 1 Total: 3-4 hours**

---

### COMPLETED: Phase 2 - Business Logic (Tasks 006-010)
- ✅ **Task 006** (60m): Implement Unit Conversion System and Helper Functions
- ✅ **Task 007** (45m): Implement Food Cost Percentage Pricing Method
- ✅ **Task 008** (30m): Implement Markup Multiplier Pricing Method
- ✅ **Task 009** (60m): Implement Market-Based Pricing Method (Competitor Analysis)
- ✅ **Task 010** (90m): Write Comprehensive Unit Tests for All Calculator Functions (100% Coverage)

**Phase 2 Total: 2-3 hours** | **Unblocks:** Phase 3, UI components (014-021)

---

## UPCOMING: Phase 3 - Storage Layer (Tasks 011-013)

**Task 011 (60m): Implement localStorage Helpers**
- Create `src/lib/storage.ts`
- Implement `saveRecipe()`, `loadRecipe()`, `deleteRecipe()`
- Handle localStorage quota exceeded errors
- Implement recipe indexing (recipes:list)
- Verify serialization/deserialization

**Task 012 (45m): Recipe List Management**
- Implement `getAllRecipes()` to fetch all recipes
- Implement `getRecipeById()` with error handling
- Implement `updateRecipe()` to overwrite existing
- Implement duplicate recipe functionality
- Add search/filtering stubs for future

**Task 013 (30m): Settings Storage**
- Implement `getSettings()` to load preferences
- Implement `saveSettings()` to persist language choice
- Persist to localStorage:settings
- Auto-restore on app load
- Handle legacy settings (no data case)

**Phase 3 Total: 1-2 hours** | **Can run parallel with Phase 2 end**

---

## UPCOMING: Phase 4 - UI Components (Tasks 014-021)

**Task 014 (60m): RecipeContext & useRecipe Hook**
- Create `src/contexts/RecipeContext.tsx`
- Implement global recipe state management
- Create `useRecipe()` hook
- Implement CRUD actions (create, read, update, delete)
- Test context provides data correctly

**Task 015 (45m): SettingsContext & useSettings Hook**
- Create `src/contexts/SettingsContext.tsx`
- Implement language state
- Create `useSettings()` hook
- Implement toggle language function
- Persist to localStorage

**Task 016 (90m): IngredientInput Component**
- Create `src/components/IngredientInput.tsx`
- Implement form for adding ingredients
- Validate input (name, price, units)
- Unit selector dropdown
- Add button triggers validation → context update

**Task 017 (60m): IngredientList Component**
- Create `src/components/IngredientList.tsx`
- Display table of added ingredients
- Edit button (populate form)
- Delete button with confirmation
- Show empty state

**Task 018 (75m): OverheadInput Component**
- Create `src/components/OverheadInput.tsx`
- Implement packaging cost input
- Implement overhead cost input
- Implement labor cost selection (Model A/B)
- Conditional fields based on labor model
- Update context on change

**Task 019 (90m): PricingMethodSelector Component**
- Create `src/components/PricingMethodSelector.tsx`
- 3 tabs/cards: Food Cost %, Markup, Market
- Input fields for each method
- Real-time calculation display
- Method selection button
- Responsive layout (stacked on mobile)

**Task 020 (60m): MarketPriceInput Component**
- Create `src/components/MarketPriceInput.tsx`
- Input form for competitor prices (array)
- Add/remove price buttons
- Validation (2-10 prices)
- Display market statistics inline
- Error messages

**Task 021 (90m): ResultDisplay Component**
- Create `src/components/ResultDisplay.tsx`
- Show cost breakdown (ingredients, packaging, overhead, labor)
- Display pricing results (all 3 methods)
- Show recommended price (highlighted)
- Calculate profit margin
- Format currency (Rp)

**Phase 4 Total: 4-5 hours** | **Depends on Phase 1, Task 006**

---

## UPCOMING: Phase 5 - Pages & Layout (Tasks 022-024)

**Task 022 (90m): HomePage Implementation**
- Create `src/pages/HomePage.tsx`
- Orchestrate all form components (016-021)
- Step-by-step workflow display
- Recipe name input field
- Portions input field
- Handle save/reset buttons
- Responsive layout

**Task 023 (75m): SavedRecipesPage**
- Create `src/pages/SavedRecipesPage.tsx`
- List all saved recipes (from context)
- Load button → opens in HomePage
- Edit button → load and highlight
- Delete button with confirmation
- Search/filter recipes by name
- Empty state when no recipes

**Task 024 (60m): App Layout & Routing**
- Create `src/App.tsx` main layout
- Implement simple router (2 pages: home, saved)
- Header with logo, language toggle, nav links
- Route between HomePage and SavedRecipesPage
- Wrap with RecipeContext and SettingsContext providers
- Error Boundary wrapper

**Phase 5 Total: 1-2 hours** | **Depends on Phase 4**

---

## UPCOMING: Phase 6 - Additional Features (Tasks 025-027)

**Task 025 (30m): LanguageToggle Component**
- Create `src/components/LanguageToggle.tsx`
- Header component with ID/EN toggle
- Call `useSettings().setLanguage()`
- i18n hook updates UI
- Persist selection

**Task 026 (45m): RecipeList Component**
- Create `src/components/RecipeList.tsx`
- Standalone list component
- Display as cards with actions
- Reusable in both pages
- Props for actions (onLoad, onDelete, etc.)

**Task 027 (30m): Error Boundaries**
- Create `src/components/ErrorBoundary.tsx`
- Catch React errors
- Display user-friendly error message
- Log to console (dev only)
- Wrap root in App.tsx

**Phase 6 Total: ~1 hour** | **Can start after Phase 4**

---

## UPCOMING: Phase 7 - Styling & Polish (Tasks 028-030)

**Task 028 (120m): Tailwind Styling & Responsive Design**
- Apply Tailwind classes to all components
- Responsive breakpoints (mobile, tablet, desktop)
- Color scheme (primary, secondary, danger)
- Button styles (primary, secondary, danger)
- Form input styling and focus states
- Table styling for ingredient list
- Cards/panels for sections
- Spacing consistency (multiples of 4px)

**Task 029 (45m): Global Styles & Theme Setup**
- `src/styles/index.css` with Tailwind imports
- Define custom colors (extends Tailwind theme)
- Font setup (responsive sizes)
- Dark mode setup (optional for v1)
- Typography hierarchy
- Reusable utility classes

**Task 030 (60m): Accessibility Features (WCAG 2.0 AA)**
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators visible on all interactive elements
- Color contrast verified (≥ 4.5:1 for text)
- ARIA labels on form inputs
- Screen reader testing (VoiceOver/NVDA)
- Focus trap in modals (confirmation dialogs)
- Semantic HTML (button, input, label)

**Phase 7 Total: 2-3 hours** | **Depends on Phase 5**

---

## UPCOMING: Phase 8 - Integration & Deployment (Tasks 031-033)

**Task 031 (90m): End-to-End Integration Testing**
- Full user workflow testing (manual)
- Create recipe → calculate price → save
- Load saved recipe → modify → update
- Language switching with persistent state
- localStorage functionality (clear, restore)
- Error scenarios (quota exceeded, invalid data)
- Cross-browser testing (Chrome, Firefox, Safari)
- Device testing (desktop, tablet, mobile)

**Task 032 (60m): Performance Optimization & Bundle Analysis**
- Run `npm run build`
- Check bundle size (< 150KB gzipped)
- Run Lighthouse (target > 90 score)
- Code splitting if needed
- Tree-shake unused code
- Minification verification
- Cache headers configuration (for Vercel/Netlify)

**Task 033 (45m): Deployment Setup**
- Configure Vercel or Netlify
- Set up GitHub integration
- Environment variables configuration
- Build command: `npm run build`
- Output directory: `dist/`
- Deploy production
- Verify app is live and accessible
- DNS/domain setup if needed

**Phase 8 Total: 1-2 hours** | **Final phase**

---

## Task Statistics

| Metric | Value |
|--------|-------|
| Total Tasks | 33 |
| Total Estimated Hours | 17.5h |
| Realistic Range | 15-20h |
| Shortest Task | 30 minutes (002, 005, 013, 025, 027) |
| Longest Task | 120 minutes (028) |
| Average Task | ~32 minutes |

---

## Dependency Graph Summary

```
Phase 1 (001-005)
    ↓
Phase 2 (006-010)         Phase 3 (011-013) [parallel after 002]
    ↓                           ↓
Phase 4 (014-021) ←───────────┘
    ↓
Phase 5 (022-024)
    ↓
Phase 6 (025-027) [can start after 014-021]
    ↓
Phase 7 (028-030)
    ↓
Phase 8 (031-033)
```

---

## Execution Strategy

### Critical Path (Minimum Time)
Follow phases sequentially: 1 → 2 → 3 (in parallel after 002) → 4 → 5 → 6 (parallel) → 7 → 8

### Optimal Path (Parallel Work)
- **Developer 1:** Phase 1 tasks
- **Developer 2:** Phase 3 tasks (after 002 complete)
- **Both:** Phases 4-5 (combine efforts)
- **Optimization:** 1-2 developers handle Phases 6-8 simultaneously

### Solo Development (Single Person)
- Complete Phases 1-2 completely (5-7 hours)
- Complete Phase 3 (1-2 hours)
- Complete Phase 4 components one at a time (4-5 hours)
- Complete Phases 5-8 (4-7 hours)
- Total: ~15-20 hours spread over 2-3 days

---

## Success Checkpoints

### After Phase 1
- [ ] Project runs locally
- [ ] TypeScript strict mode enabled
- [ ] i18n configured
- [ ] Testing infrastructure ready

### After Phase 2
- [ ] All 3 pricing calculators implemented
- [ ] Unit conversion working
- [ ] 100% test coverage for calculators
- [ ] All tests passing

### After Phase 3
- [ ] localStorage save/load working
- [ ] Can retrieve saved recipes
- [ ] Settings persist across sessions

### After Phase 4
- [ ] All UI components render
- [ ] Context data flows to components
- [ ] Form inputs work
- [ ] Component snapshot tests pass

### After Phase 5
- [ ] Full page layouts complete
- [ ] Navigation between pages works
- [ ] End-to-end user workflow testable manually

### After Phase 6
- [ ] Language toggle working
- [ ] Error messages display
- [ ] No console errors

### After Phase 7
- [ ] Mobile responsive
- [ ] Accessible keyboard navigation
- [ ] Professional styling

### After Phase 8
- [ ] Lighthouse > 90
- [ ] Bundle < 150KB gzipped
- [ ] App deployed and live
- [ ] All acceptance criteria met

---

## Next Steps

1. Start with Task 001: Initialize Vite Project
2. Follow phases sequentially
3. Update TASKS.md status as you progress
4. Commit to git after each phase completion
5. Run tests frequently (especially Phase 2 & 10)
6. Keep CLAUDE.md guidelines in mind throughout

---

## UI Refresh Phase: ChefCost Design System (UI-001 — UI-027)

**Source:** Stitch Project "Optimal Menu Price Calculator"
**Total Tasks:** 27
**Estimated Total:** ~14 hours
**Status:** Pending

### Phase U0: Foundation & Design Tokens

- **UI-001** (20m): Add Google Fonts via next/font
- **UI-002** (30m): Update Tailwind config with ChefCost tokens
- **UI-003** (20m): Update global CSS with ChefCost base styles

### Phase U1: Landing Page

- **UI-004** (90m): Create Landing Page at `/`
- **UI-005** (20m): Add Landing Page i18n labels

### Phase U2: Routing Restructure

- **UI-006** (30m): Move calculator to `/calculator`, update nav

### Phase U3: Component Restyling

- **UI-007** (60m): Restyle AppLayout (Header, Nav, Mobile Menu, Alerts)
- **UI-008** (45m): Restyle Calculator page layout
- **UI-009** (45m): Restyle IngredientInput
- **UI-010** (45m): Restyle IngredientList (mobile card layout)
- **UI-011** (30m): Restyle OverheadInput
- **UI-012** (30m): Restyle PricingMethodSelector
- **UI-013** (20m): Restyle MarketPriceInput
- **UI-014** (60m): Restyle ResultDisplay + circular progress

### Phase U4: Circular Progress Components

- **UI-015** (30m): Create CircularSpinner component
- **UI-016** (30m): Create CircularProgress component
- **UI-017** (15m): Replace loading states with CircularSpinner
- **UI-018** (15m): Add CircularProgress margin visualization to ResultDisplay

### Phase U5: Mobile Responsiveness

- **UI-019** (30m): Calculator page mobile layout
- **UI-020** (60m): All components mobile audit
- **UI-021** (15m): Saved Recipes page mobile
- **UI-022** (15m): Landing page mobile

### Phase U6: Saved Recipes

- **UI-023** (45m): Restyle Saved Recipes page with ChefCost

### Phase U7: Verification

- **UI-024** (10m): TypeScript typecheck
- **UI-025** (10m): ESLint lint
- **UI-026** (15m): Run tests
- **UI-027** (5m): Production build

See `UI-INDEX.md` for full dependency graph and execution strategy.

---

**End of Task Index**
