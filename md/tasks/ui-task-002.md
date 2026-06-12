# UI-002: Update Tailwind Config with ChefCost Tokens

**Phase:** U0 - Foundation & Design Tokens
**Duration:** 30 minutes
**Status:** Pending

---

## Description

Replace the current generic Tailwind theme colors with ChefCost design system tokens, add custom font families, and configure border-radius tokens.

**What will be done:**
1. Replace `primary` color: `#0284c7` → `#2d6a4f` (Chef Green)
2. Replace `secondary` color: `#64748b` → `#4a5568` (Earthy Slate)
3. Rename `danger` → `destructive`: `#ef4444` (keep red for delete actions)
4. Add `tertiary` color: `#e67e22` (Terracotta — warnings, highlights)
5. Add surface colors: `#f7f9fb`, `#eceef0`, etc.
6. Add font families: `heading` → Plus Jakarta Sans, `body` → Public Sans
7. Add custom borderRadius `chef: 8px` if needed
8. Add boxShadow tokens for ChefCost card elevation

**Current tailwind.config.ts colors:**
```js
colors: {
  primary: "#0284c7",
  secondary: "#64748b",
  danger: "#ef4444",
}
```

**Target tailwind.config.ts:**
```js
colors: {
  primary: "#2d6a4f",
  secondary: "#4a5568",
  tertiary: "#e67e22",
  destructive: "#ef4444",
  surface: {
    DEFAULT: "#f7f9fb",
    container: "#eceef0",
    dim: "#d8dadc",
    bright: "#f7f9fb",
  },
  // ... additional surface variants
}
```

**Files to edit:**
- `tailwind.config.ts`

**Why this matters:**
- All components inherit ChefCost colors automatically
- Enables consistent use of Tailwind utility classes like `bg-primary`, `text-secondary`
- Every subsequent restyling task depends on these tokens

---

## Dependencies

- UI-001 (font CSS variables must be available)

## Acceptance Criteria

- [ ] `bg-primary` renders Chef Green (`#2d6a4f`)
- [ ] `text-secondary` renders Earthy Slate (`#4a5568`)
- [ ] `text-tertiary` renders Terracotta (`#e67e22`)
- [ ] `bg-destructive` renders red (`#ef4444`)
- [ ] `font-heading` uses Plus Jakarta Sans
- [ ] `font-body` uses Public Sans
- [ ] All existing components still render (no breaking changes)
