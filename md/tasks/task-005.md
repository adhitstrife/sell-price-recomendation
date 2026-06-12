# Task 005: Testing Infrastructure

**Phase:** 1 - Foundation  
**Duration:** 30 minutes  
**Status:** Pending

---

## Title
Set Up Testing Framework (Vitest + React Testing Library)

---

## Description

Configure testing infrastructure for unit tests, component tests, and integration tests.

**What will be done:**
1. Install Vitest testing framework
2. Install React Testing Library and dependencies
3. Create Vitest configuration
4. Create test setup file with common utilities
5. Add test scripts to package.json
6. Create example test files
7. Verify tests run successfully

**Why this matters:**
- CLAUDE.md requirement: 100% test coverage for calculator.ts
- All new code should be tested before merge
- Blocks: Task 010 (calculator tests), Task 027 (component tests)
- Fast feedback during development

---

## Dependencies

- Task 001: Vite project setup
- Task 002: TypeScript types
- Task 004: Directory structure

---

## Acceptance Criteria

✓ **Installation:**
- [ ] `vitest` installed
- [ ] `@testing-library/react` installed
- [ ] `@testing-library/jest-dom` installed
- [ ] `@vitest/ui` installed (optional, for test UI)
- [ ] `jsdom` installed (for DOM testing)

✓ **Configuration Files:**
- [ ] `vitest.config.ts` created with proper Vite config
- [ ] `src/test/setup.ts` created with global test utilities
- [ ] `tsconfig.spec.json` or updated main `tsconfig.json` for tests

✓ **NPM Scripts:**
- [ ] `npm test` runs all tests
- [ ] `npm test -- --watch` runs in watch mode
- [ ] `npm test -- --coverage` generates coverage report
- [ ] `npm test -- task-name` runs single test file

✓ **Testing Works:**
- [ ] Can run a simple arithmetic test
- [ ] Can run a simple component render test
- [ ] Coverage reports generate without errors
- [ ] Watch mode detects file changes and reruns tests

---

## Technical Notes

### Installation Commands

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @vitest/ui jsdom
```

### Configuration File (vitest.config.ts)

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.ts',
      ],
    },
  },
});
```

### Test Setup File (src/test/setup.ts)

```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui"
  }
}
```

### TypeScript Config for Tests

Update `tsconfig.json` or create `tsconfig.spec.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src/**/*.test.ts", "src/**/*.test.tsx", "src/test/**/*"]
}
```

### Example Test File Structure

Create placeholder test files:
- `tests/lib/calculator.test.ts`
- `tests/lib/storage.test.ts`
- `tests/components/ResultDisplay.test.tsx`

Each should have basic structure:
```typescript
import { describe, it, expect } from 'vitest';

describe('Example Suite', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });
});
```

---

## Testing Requirements

✓ **Manual Verification:**
1. Run `npm test` → Tests should run (even if just placeholder tests)
2. Create simple test file → Should pass
3. Run `npm test -- --coverage` → Should generate coverage report
4. Run `npm test -- --watch` → Should watch for changes

✓ **No Unit Tests** (testing infrastructure setup phase)

---

## Deliverables

- [ ] Vitest and dependencies installed
- [ ] `vitest.config.ts` configured
- [ ] `src/test/setup.ts` with global test setup
- [ ] Test scripts in package.json
- [ ] Placeholder test files in `tests/` directory
- [ ] Tests run successfully without errors

---

## Coverage Targets (CLAUDE.md Requirements)

- **Business Logic (calculator.ts):** 100% coverage
- **Storage (storage.ts):** 90%+ coverage
- **Components:** Snapshot tests + interaction tests
- **Utilities:** 80%+ coverage
- **Overall Target:** 85%+ coverage

---

## Notes

- Do NOT require 100% coverage yet; infrastructure just enables it
- Keep test setup minimal; expand as needed
- Vitest integrates seamlessly with Vite
- Watch mode is essential for TDD workflow
- Coverage reports ignored in git (add to .gitignore)

---

## Next Tasks

**Unblocks:**
- Task 010: Calculator unit tests (100% coverage)
- Task 027: Component snapshot tests
- Task 031: E2E testing

---

**End of Task 005**
