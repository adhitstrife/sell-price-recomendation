# UI-015: Create CircularSpinner Component

**Phase:** U4 - Circular Progress Components
**Duration:** 30 minutes
**Status:** Pending

---

## Description

Create a reusable SVG-based circular spinner component for loading states throughout the application.

**What will be done:**
1. Create `components/CircularSpinner.tsx`
2. Implement an SVG circle with animated rotation using CSS `@keyframes`
3. Props interface:
   - `size?: number` (default: 32, in pixels)
   - `color?: string` (default: Chef Green `#2d6a4f`)
   - `strokeWidth?: number` (default: 3)
   - `className?: string` (for additional styling)
4. Add CSS animation for smooth infinite rotation
5. Ensure proper accessibility (`role="status"`, `aria-label`)

**Design spec:**
```tsx
interface CircularSpinnerProps {
  size?: number;      // Diameter in px (default: 32)
  color?: string;     // Stroke color (default: #2d6a4f)
  strokeWidth?: number; // Stroke width in px (default: 3)
  className?: string;
}
```

**Example usage:**
```tsx
<CircularSpinner size={48} color="#e67e22" />
```

**Usage locations:**
- `app/saved-recipes/page.tsx` (replace "Loading..." text)
- Any future loading states in contexts/pages

**Files to create:**
- `components/CircularSpinner.tsx`

**Why this matters:**
- Professional loading indicators improve UX
- Reusable component avoids code duplication
- SVG-based — no external dependencies, scales cleanly at any size

---

## Dependencies

- None (pure UI component, no design tokens needed)

## Acceptance Criteria

- [ ] Component renders an SVG circle with rotation animation
- [ ] `size`, `color`, `strokeWidth` props work correctly
- [ ] Animation is smooth (60fps)
- [ ] Proper aria attributes for screen readers
- [ ] Works in both light and dark backgrounds
