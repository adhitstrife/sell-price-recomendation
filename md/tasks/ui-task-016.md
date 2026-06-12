# UI-016: Create CircularProgress Component

**Phase:** U4 - Circular Progress Components
**Duration:** 30 minutes
**Status:** Pending

---

## Description

Create a reusable SVG-based circular progress indicator for data visualization — used to show profit margin percentage in the ResultDisplay.

**What will be done:**
1. Create `components/CircularProgress.tsx`
2. Implement an SVG circle with a colored arc based on `value` prop
3. Props interface:
   - `value: number` — 0-100 percentage to display
   - `size?: number` (default: 80)
   - `strokeWidth?: number` (default: 6)
   - `color?: string` (default: Chef Green)
   - `bgColor?: string` (default: `#e2e8f0` for track)
   - `showLabel?: boolean` (default: true)
   - `label?: string` (default: `${value}%`)
4. Animated on mount — arc sweeps from 0 to `value`
5. Semi-circular or full circle depending on design needs
6. The component should dynamically determine color based on value:
   - ≥ 70% → Chef Green (`#2d6a4f`)
   - 50-69% → Earthy Slate (`#4a5568`)
   - < 50% → Terracotta (`#e67e22`)

**Design spec:**
```tsx
interface CircularProgressProps {
  value: number;        // 0-100
  size?: number;        // Diameter in px (default: 80)
  strokeWidth?: number; // Stroke width in px (default: 6)
  color?: string;       // Override arc color
  bgColor?: string;     // Track color (default: #e2e8f0)
  showLabel?: boolean;  // Show percentage text in center
  className?: string;
}
```

**Files to create:**
- `components/CircularProgress.tsx`

**Why this matters:**
- Visualizes profit margin at a glance
- Reusable for any progress/percentage display
- Color-coding (green/slate/terracotta) provides instant feedback

---

## Dependencies

- None (pure UI component)

## Acceptance Criteria

- [ ] Component renders SVG with colored arc matching `value`
- [ ] Animation sweeps from 0 to value on mount
- [ ] Color auto-selects based on value range
- [ ] `showLabel` shows/hides percentage text in center
- [ ] All props work correctly
- [ ] Accessible (`role="progressbar"`, `aria-valuenow`)
