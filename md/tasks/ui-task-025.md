# UI-025: ESLint Lint

**Phase:** U7 - Verification
**Duration:** 10 minutes
**Status:** Pending

---

## Description

Run ESLint to check for code quality issues across the codebase.

**Command:**
```bash
npm run lint
```

**What to check:**
1. No lint errors
2. No unused imports
3. No unused variables
4. Proper React hooks usage (dependencies, rules of hooks)
5. No console.log left in production code

**Fix any issues found.**

**Why this matters:**
- Maintains code quality standards
- Catches common mistakes
- Ensures consistent code style

---

## Dependencies

- UI-001 through UI-023 (all implementation tasks)

## Acceptance Criteria

- [ ] `npm run lint` exits with code 0
- [ ] No warnings (ideally)
- [ ] No console.log left in production code
