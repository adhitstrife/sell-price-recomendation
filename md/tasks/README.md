# Task Documentation Complete - Quick Start Guide

**Status:** ✅ READY FOR IMPLEMENTATION  
**Last Updated:** 2026-06-10  
**Project:** Harga Jual Menu Calculator  
**Total Tasks:** 33 | **Estimated Duration:** 15-20 hours

---

## 📋 Documentation Files Created

### 1. Master Roadmap
- **File:** `md/TASKS.md`
- **Content:** Overview of all 33 tasks organized by 8 phases
- **Use:** High-level project planning

### 2. Complete Project Instructions
- **File:** `md/CLAUDE.md` 
- **Content:** 1500+ line comprehensive instruction manual
- **Use:** Reference for coding standards, architecture, naming conventions

### 3. Task Index
- **File:** `md/tasks/INDEX.md`
- **Content:** Quick reference for all 33 tasks with summaries
- **Use:** Find tasks by phase, see dependencies, understand scope

### 4. Individual Task Specifications
Located in `md/tasks/` directory:

**Completed (Detailed Specs):**
- `task-001.md` - Initialize Vite Project
- `task-002.md` - Define TypeScript Types
- `task-003.md` - Setup i18n Configuration
- `task-004.md` - Directory Structure & Utilities
- `task-005.md` - Testing Infrastructure
- `task-006.md` - Unit Conversion System
- `task-007.md` - Food Cost % Calculator
- `task-008.md` - Markup Multiplier Calculator
- `task-009.md` - Market-Based Calculator
- `task-010.md` - Comprehensive Tests
- `task-011.md` - localStorage Helpers
- `task-014.md` - RecipeContext & Hook
- `task-016.md` - IngredientInput Component

**Summarized (In INDEX.md):**
- Tasks 012-013: Storage management
- Tasks 015, 017-021: UI components
- Tasks 022-024: Pages & layout
- Tasks 025-027: Additional features
- Tasks 028-030: Styling & accessibility
- Tasks 031-033: Integration & deployment

---

## 🎯 How to Use This Documentation

### For Project Managers
1. Read `TASKS.md` for overview and timeline
2. Check `md/tasks/INDEX.md` for detailed breakdown
3. Track progress using task status fields (Pending → In Progress → Complete)

### For Developers
1. Start with `md/CLAUDE.md` to understand architecture
2. Follow tasks sequentially (Phase 1 → Phase 2 → ...)
3. Each task file includes:
   - Clear description of what to build
   - Acceptance criteria (checklist)
   - Technical specifications and formulas
   - Testing requirements
   - Real-world examples
   - Next task pointers

### For QA/Testers
1. Review task acceptance criteria (checkboxes in each file)
2. Follow testing requirements section
3. Use real-world scenarios provided in each task
4. Verify code matches specifications

### For New Team Members
1. Read this README first
2. Skim `md/CLAUDE.md` architecture section
3. Review `md/tasks/INDEX.md` for big picture
4. Dive into specific task files as assigned

---

## 📊 Project Structure

```
md/
├── CLAUDE.md                    (1500+ lines - Complete project guide)
├── TASKS.md                     (Master roadmap - all 33 tasks)
├── plan-harga-jual-menu.md     (Original requirements document)
└── tasks/
    ├── INDEX.md                 (This + task summaries)
    ├── task-001.md              (Initialize Vite)
    ├── task-002.md              (TypeScript Types)
    ├── task-003.md              (i18n Setup)
    ├── task-004.md              (Directory Structure)
    ├── task-005.md              (Testing Infrastructure)
    ├── task-006.md              (Unit Conversion)
    ├── task-007.md              (Food Cost % Calculator)
    ├── task-008.md              (Markup Calculator)
    ├── task-009.md              (Market-Based Calculator)
    ├── task-010.md              (Comprehensive Tests)
    ├── task-011.md              (localStorage Helpers)
    ├── task-014.md              (RecipeContext)
    ├── task-016.md              (IngredientInput Component)
    └── [tasks 012, 013, 015, 017-033 - detailed in INDEX.md]
```

---

## 🚀 Getting Started

### Quick Start (First Developer)

1. **Read Foundation:**
   ```
   MD/CLAUDE.md (10 min) → MD/TASKS.md (5 min) → MD/tasks/INDEX.md (5 min)
   ```

2. **Start Phase 1:**
   ```
   Task 001 → Task 002 → Task 003 → Task 004 → Task 005
   ```
   **Duration:** 3-4 hours | **Outcome:** Project foundation ready

3. **Continue Phase 2:**
   ```
   Task 006 → Task 007 → Task 008 → Task 009 → Task 010
   ```
   **Duration:** 2-3 hours | **Outcome:** All calculators with 100% test coverage

4. **Proceed with Later Phases:**
   - Follow task dependencies
   - Use `md/tasks/INDEX.md` dependency graph
   - Reference `CLAUDE.md` for coding standards

### Parallel Development (Multiple Developers)

**Developer 1 (Foundation Lead):**
- Handles Phase 1 (Tasks 001-005)
- Provides TypeScript types to other developers

**Developer 2 (Business Logic Lead):**
- Handles Phase 2 (Tasks 006-010) in parallel
- Implements calculators and comprehensive tests

**Developer 3 (UI Lead):**
- Waits for Phases 1-3 to complete
- Handles Phase 4 components (Tasks 014-021)
- Works with multiple components simultaneously

**Shared (Final Phase):**
- Integration testing (Task 031)
- Performance optimization (Task 032)
- Deployment (Task 033)

---

## ✅ Task Completion Checklist

Use this to track overall progress:

- [ ] **Phase 1 (3-4 hours):** Foundation
  - [ ] Task 001 - Vite initialization
  - [ ] Task 002 - TypeScript types
  - [ ] Task 003 - i18n setup
  - [ ] Task 004 - Directory structure
  - [ ] Task 005 - Testing infrastructure

- [ ] **Phase 2 (2-3 hours):** Business Logic
  - [ ] Task 006 - Unit conversion
  - [ ] Task 007 - Food Cost % calculator
  - [ ] Task 008 - Markup calculator
  - [ ] Task 009 - Market-Based calculator
  - [ ] Task 010 - Comprehensive tests

- [ ] **Phase 3 (1-2 hours):** Storage
  - [ ] Task 011 - localStorage helpers
  - [ ] Task 012 - Recipe list management
  - [ ] Task 013 - Settings storage

- [ ] **Phase 4 (4-5 hours):** UI Components
  - [ ] Task 014 - RecipeContext
  - [ ] Task 015 - SettingsContext
  - [ ] Task 016 - IngredientInput
  - [ ] Task 017 - IngredientList
  - [ ] Task 018 - OverheadInput
  - [ ] Task 019 - PricingMethodSelector
  - [ ] Task 020 - MarketPriceInput
  - [ ] Task 021 - ResultDisplay

- [ ] **Phase 5 (1-2 hours):** Pages & Layout
  - [ ] Task 022 - HomePage
  - [ ] Task 023 - SavedRecipesPage
  - [ ] Task 024 - App layout & routing

- [ ] **Phase 6 (~1 hour):** Additional Features
  - [ ] Task 025 - LanguageToggle
  - [ ] Task 026 - RecipeList
  - [ ] Task 027 - Error Boundaries

- [ ] **Phase 7 (2-3 hours):** Styling & Polish
  - [ ] Task 028 - Tailwind styling
  - [ ] Task 029 - Global styles & theme
  - [ ] Task 030 - Accessibility (WCAG AA)

- [ ] **Phase 8 (1-2 hours):** Integration & Deployment
  - [ ] Task 031 - E2E integration testing
  - [ ] Task 032 - Performance optimization
  - [ ] Task 033 - Deployment setup

---

## 🔑 Key Principles from CLAUDE.md

### Architecture
- **State Management:** React Context API (no Redux for v1)
- **Storage:** Browser localStorage only (no backend)
- **Languages:** Indonesian (id) + English (en)
- **Framework:** Vite + React 18 + TypeScript (strict)
- **Styling:** Tailwind CSS (no custom CSS)

### Code Quality
- **TypeScript:** Strict mode enabled, no `any` types
- **Testing:** 100% coverage for `calculator.ts`
- **Components:** Functional components with hooks
- **Functions:** Pure functions in business logic

### Business Logic
- **Pricing Methods:** 3 options (Food Cost %, Markup, Market-Based)
- **Units:** 9 types (gram, kg, ml, liter, pcs, pack, sachet, sendok, gelas)
- **Currency:** Indonesian Rupiah (Rp)
- **Rounding:** Nearest 500 Rp

---

## 📱 Feature Overview

### Core Features (MVP)
1. **Recipe Calculator**
   - Add ingredients with prices and portions
   - Calculate total food cost
   - Apply 3 pricing methods
   - See recommended selling prices

2. **Pricing Methods**
   - Food Cost %: Target profit via food cost percentage
   - Markup Multiplier: Simple multiply factor
   - Market-Based: Analyze competitor prices

3. **Recipe Management**
   - Save recipes with localStorage
   - Load and edit saved recipes
   - Delete unwanted recipes
   - List all recipes

4. **Internationalization**
   - Indonesian (default)
   - English
   - Toggle language anytime

5. **Responsive Design**
   - Desktop
   - Tablet
   - Mobile

---

## 🧪 Testing Strategy

### Test Coverage Targets
- **calculator.ts:** 100% (critical business logic)
- **storage.ts:** 90%+ (important for persistence)
- **Components:** 85%+ (snapshot + interaction tests)
- **Overall:** 85%+

### Test Approach
- Unit tests for pure functions (Vitest)
- Component tests for UI (React Testing Library)
- Integration tests for workflows (manual)
- Real-world scenarios (Indonesian food industry)

---

## 🎓 Tips for Developers

### When Starting a Task
1. Read the task file completely
2. Review dependencies (make sure they're done)
3. Check CLAUDE.md for relevant standards
4. Look at "Technical Notes" section for examples
5. Start with skeleton/structure before implementation

### When Testing
1. Use real-world examples provided in task
2. Test edge cases (0, negative, very large numbers)
3. Verify error handling (read CLAUDE.md error section)
4. Don't skip tests (100% coverage required)

### When Stuck
1. Check CLAUDE.md for similar patterns
2. Review completed task files for examples
3. Look at "Technical Notes" for formulas
4. Check if dependency task is truly complete

---

## 📞 Support Reference

### For Implementation Questions
- Check `CLAUDE.md` → "Coding Standards" section
- Check `CLAUDE.md` → "File Organization" section
- Check completed task files for code patterns

### For Business Logic Questions
- Check task technical notes (formulas provided)
- Check `CLAUDE.md` → "Business Objectives" section
- Check real-world examples in task files

### For Testing Questions
- Check task "Testing Requirements" section
- Check `CLAUDE.md` → "Testing Standards" section
- Check completed test references in tasks

### For i18n Questions
- Check Task 003 (i18n setup)
- Check `CLAUDE.md` → "Internationalization" section
- Review translation key structure

---

## 📈 Success Metrics

### Phase 1 Success
- [ ] Project runs locally with `npm run dev`
- [ ] Dev server at localhost:5173
- [ ] No TypeScript errors
- [ ] Tests run with `npm test`

### Phase 2 Success
- [ ] All 3 calculators working
- [ ] 100% test coverage
- [ ] Real-world examples verified
- [ ] Formulas match plan.md exactly

### Phase 3 Success
- [ ] Save/load recipes working
- [ ] localStorage persists data
- [ ] Settings persist language choice

### Final Success
- [ ] Full end-to-end workflow: Add recipe → Calculate → Save
- [ ] Mobile responsive
- [ ] Lighthouse > 90 score
- [ ] No console errors
- [ ] Deployed and live

---

## 🎉 Next Steps

1. **Assign Phase 1 to first developer**
   - Estimated: 3-4 hours
   - Tasks 001-005

2. **Assign Phase 2 to second developer** (can start after Task 002)
   - Estimated: 2-3 hours
   - Tasks 006-010

3. **Assign Phase 3** (after Phases 1-2 stabilize)
   - Estimated: 1-2 hours
   - Tasks 011-013

4. **Coordinate Phase 4+** (full team)
   - Can parallelize components
   - Estimated: 6-8 hours total

---

## 📖 Document Reading Time

| Document | Reading Time | Purpose |
|----------|--------------|---------|
| This README | 10 min | Get oriented |
| CLAUDE.md (quick skim) | 15 min | Architecture overview |
| CLAUDE.md (full read) | 60 min | Complete understanding |
| TASKS.md | 10 min | Project timeline |
| INDEX.md | 15 min | Task summaries |
| Individual task (quick) | 5 min | Understand task scope |
| Individual task (thorough) | 15 min | Ready to implement |

**Total for full preparation: ~2 hours** → Then start implementation

---

## ⚡ Quick Reference

**Project Ready For:** Development  
**Developer Count:** 1-3 recommended  
**Estimated Timeline:** 15-20 hours  
**Minimum Preparation:** 30 minutes  
**Full Preparation:** 2 hours  

---

**Status:** ✅ ALL DOCUMENTATION COMPLETE AND READY  
**Next Action:** Assign Phase 1 tasks to first developer

---

**End of README**
