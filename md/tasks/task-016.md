# Task 016: Implement IngredientInput Component

**Phase:** 4 - UI Components  
**Duration:** 90 minutes  
**Status:** Pending

---

## Title
Implement IngredientInput Form Component

---

## Description

Create the form component for adding and editing ingredients with validation and unit conversion.

**What will be done:**
1. Create `src/components/IngredientInput.tsx` component
2. Implement form fields: name, price, unit, amount per portion
3. Unit selector dropdowns (kg, gram, liter, ml, pcs, pack, etc.)
4. Form validation with error display
5. Add button triggers validation → context update
6. Clear form after successful add
7. Support edit mode (pre-fill existing ingredient)
8. Real-time calculation preview (cost per portion)
9. i18n labels and validation messages

**Why this matters:**
- Core user input component
- Foundation for recipe building
- Blocks: Task 022 (HomePage orchestrates this)
- Validation critical for accurate calculations

---

## Dependencies

- Task 001: Vite setup
- Task 002: TypeScript types (Ingredient interface)
- Task 003: i18n setup
- Task 004: Constants, validation utilities
- Task 006: Unit conversion (for preview calculation)
- Task 014: RecipeContext (for state updates)

---

## Acceptance Criteria

✓ **Form Renders:**
- [ ] All input fields visible: name, price, units, amount
- [ ] Clear labels (from i18n)
- [ ] Add button visible
- [ ] Form is accessible (labels associated with inputs)

✓ **Validation Works:**
- [ ] Required field validation
- [ ] Numeric validation (price, amount)
- [ ] Non-negative validation
- [ ] Max value validation (from VALIDATION constants)
- [ ] Error messages display inline
- [ ] Form cannot submit if invalid

✓ **Unit Conversion:**
- [ ] Both dropdowns populated with all units
- [ ] Can select any valid unit combination
- [ ] Preview shows cost per portion calculation
- [ ] Preview updates in real-time as values change

✓ **Add/Edit Functionality:**
- [ ] Add button creates new ingredient (with UUID)
- [ ] Updates context/recipe state
- [ ] Form clears after successful add
- [ ] Edit mode pre-fills existing ingredient
- [ ] Can edit and save changes

✓ **Error Handling:**
- [ ] All error messages user-friendly
- [ ] No console errors
- [ ] Invalid input doesn't crash

✓ **i18n:**
- [ ] All labels translated (Indonesian + English)
- [ ] Placeholder text translated
- [ ] Error messages translated
- [ ] Unit names translated (kg, gram, liter, etc.)

---

## Technical Notes

### Component Structure

```typescript
interface IngredientInputProps {
  onAdd?: (ingredient: Ingredient) => void;
  editingIngredient?: Ingredient;
  onEditComplete?: () => void;
}

export const IngredientInput = ({
  onAdd,
  editingIngredient,
  onEditComplete,
}: IngredientInputProps) => {
  const { t } = useTranslation();
  const { currentRecipe, updateRecipe } = useRecipe();

  const [form, setForm] = useState<IngredientFormData>({
    name: editingIngredient?.name || '',
    pricePerUnit: editingIngredient?.pricePerUnit || 0,
    unit: editingIngredient?.unit || 'kg',
    amountPerPortion: editingIngredient?.amountPerPortion || 0,
    amountUnit: editingIngredient?.amountUnit || 'gram',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<number>(0);

  // Validation
  const validateForm = (): boolean => { };

  // Calculate preview
  const updatePreview = (): void => { };

  // Handle submit
  const handleSubmit = (e: React.FormEvent): void => { };

  // Render form
  return <form>{/* form fields */}</form>;
};
```

### Form Fields

**Ingredient Name:**
- Text input
- Required, non-empty
- Max 100 characters
- Placeholder: "Flour", "Oil", "Eggs"

**Price Per Unit:**
- Number input
- Required
- >= 0
- <= 1,000,000 (Rp)
- Placeholder: "15000"

**Unit (Purchase):**
- Dropdown selector
- Options: gram, kg, ml, liter, pcs, pack, sachet, sendok, gelas
- Default: kg
- Used to interpret pricePerUnit

**Amount Per Portion:**
- Number input
- Required
- > 0
- Placeholder: "200"

**Amount Unit (Portion):**
- Dropdown selector
- Options: same as Unit
- Default: gram
- Used to measure portion size

**Preview (Read-only):**
- Calculated display: "Cost per portion: Rp 3,000"
- Formula: (pricePerUnit / conversion) × amountPerPortion
- Updates real-time

**Add/Update Button:**
- Text: "Add Ingredient" or "Update Ingredient" (depending on mode)
- Disabled if form invalid
- Creates Ingredient object and adds to context

---

## Testing Requirements

✓ **Component Tests:**
- [ ] Renders all form fields
- [ ] Labels accessible and associated
- [ ] Can input text and numbers
- [ ] Validation errors display
- [ ] Add button works
- [ ] Form clears after add
- [ ] Edit mode pre-fills
- [ ] Preview calculation correct

✓ **Test File:** `tests/components/IngredientInput.test.tsx`

✓ **Real Scenarios:**
- [ ] Add flour (kg → grams)
- [ ] Add oil (liter → ml)
- [ ] Add eggs (pack → pcs)
- [ ] Edit existing ingredient
- [ ] Try invalid inputs (negative, empty)
- [ ] Rapid input changes (preview updates)

---

## Deliverables

- [ ] `src/components/IngredientInput.tsx` component
- [ ] Comprehensive JSDoc comments
- [ ] All form validation implemented
- [ ] Real-time preview calculation
- [ ] `tests/components/IngredientInput.test.tsx`
- [ ] i18n keys complete (both languages)
- [ ] No TypeScript errors
- [ ] Accessible form fields

---

## Styling (Tailwind)

Use Tailwind classes:
- Form container: `flex flex-col gap-4`
- Label: `block text-sm font-medium text-gray-700`
- Input: `border rounded px-3 py-2 focus:ring focus:border-blue-500`
- Error: `text-red-600 text-sm mt-1`
- Button: `bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:gray-400`
- Preview: `bg-gray-50 p-3 rounded text-sm`

---

## Notes

- Keep component focused on form only (no list display)
- Component doesn't manage recipe context directly (props allow flexibility)
- Price input can be decimal (e.g., 15000.50)
- Amount per portion can be decimal (e.g., 0.5 gram)
- Unit conversion happens in separate utility (Task 006)
- Error messages should guide users to fix issues

---

## Next Tasks

**Unblocks:**
- Task 017: IngredientList (displays added ingredients)
- Task 022: HomePage (orchestrates ingredient input flow)

---

**End of Task 016**
