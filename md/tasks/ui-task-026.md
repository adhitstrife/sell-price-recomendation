# UI-026: Run Tests

**Phase:** U7 - Verification
**Duration:** 15 minutes
**Status:** Pending

---

## Description

Run the full test suite to ensure all existing functionality still works after the UI refresh. Update snapshot tests if needed.

**Command:**
```bash
npm test
```

**What to check:**
1. All calculator unit tests pass (100% coverage maintained)
2. All component tests pass
3. Any snapshot tests that need updating due to visual changes
4. No regressions in business logic

**If snapshot tests fail:**
- Review the changes to confirm they're intentional
- Update snapshots with `npm test -- --update`

**Why this matters:**
- UI changes should not break business logic
- Snapshot tests must reflect intentional changes
- Maintains test coverage standards

---

## Dependencies

- UI-001 through UI-023 (all implementation tasks)

## Acceptance Criteria

- [ ] `npm test` passes with all tests green
- [ ] Calculator unit tests maintain 100% coverage
- [ ] Snapshot tests updated for intentional visual changes
- [ ] No regressions
