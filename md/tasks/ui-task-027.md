# UI-027: Production Build

**Phase:** U7 - Verification
**Duration:** 5 minutes
**Status:** Pending

---

## Description

Run a production build to ensure the application compiles and bundles correctly with all UI changes.

**Command:**
```bash
npm run build
```

**What to check:**
1. Build completes without errors
2. No module resolution issues
3. Font files are properly bundled (next/font)
4. Route structure is correct (landing at `/`, calculator at `/calculator`)
5. Bundle size is reasonable (monitor for large increases)

**Why this matters:**
- Ensures production readiness
- Catches build-time errors
- Verifies all imports and routes are valid

---

## Dependencies

- UI-001 through UI-026 (all previous tasks)

## Acceptance Criteria

- [ ] `npm run build` exits with code 0
- [ ] No build warnings (or only expected ones)
- [ ] All routes render correctly in production mode
- [ ] Fonts load correctly
