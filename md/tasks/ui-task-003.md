# UI-003: Update Global CSS with ChefCost Base Styles

**Phase:** U0 - Foundation & Design Tokens
**Duration:** 20 minutes
**Status:** Pending

---

## Description

Update `app/globals.css` to apply ChefCost typography at the base level, add custom utility classes for ChefCost card elevation, and import Tailwind directives.

**What will be done:**
1. Set body font-family to Public Sans using the CSS variable from next/font
2. Add heading utility classes using Plus Jakarta Sans
3. Add custom `@layer utilities` for ChefCost card styles:
   - `.card-chef` — Level 1 card: white bg, soft green-tinted shadow, 8px radius, 16px padding
   - `.card-chef-lg` — Level 1 card with 16px radius
4. Add `.text-data-mono` utility using Public Sans with tabular-nums for financial figures
5. Add smooth scroll and basic body resets (existing)
6. Keep existing `html { scroll-behavior: smooth }` and body color

**Current globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html { scroll-behavior: smooth; }
body { font-family: system-ui, -apple-system, sans-serif; color: #1f2937; }
```

**Target globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html { scroll-behavior: smooth; }

@layer base {
  body {
    font-family: var(--font-body), system-ui, sans-serif;
    color: #191c1e;
    background-color: #f7f9fb;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading), system-ui, sans-serif;
  }
}

@layer components {
  .card-chef {
    @apply bg-white rounded-lg shadow-[0_4px_12px_rgba(45,106,79,0.05)] border border-[#e2e8f0] p-4;
  }
  .card-chef-lg {
    @apply bg-white rounded-[16px] shadow-[0_4px_12px_rgba(45,106,79,0.05)] border border-[#e2e8f0] p-4;
  }
}

@layer utilities {
  .text-data-mono {
    font-family: var(--font-body), monospace;
    font-variant-numeric: tabular-nums;
  }
}
```

**Files to edit:**
- `app/globals.css`

**Why this matters:**
- Establishes base typography and reusable card patterns
- `.card-chef` utility simplifies all component restyling tasks
- Data-mono style ensures financial numbers align properly in tables

---

## Dependencies

- UI-001 (font CSS variables)
- UI-002 (Tailwind theme extended)

## Acceptance Criteria

- [ ] Body uses Public Sans font
- [ ] Headings automatically use Plus Jakarta Sans
- [ ] `.card-chef` class renders a styled card with correct shadow, radius, padding
- [ ] `.card-chef-lg` class renders a card with 16px radius
- [ ] `.text-data-mono` uses tabular-nums for aligned digits
