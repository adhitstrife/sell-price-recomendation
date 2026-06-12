# UI-005: Add Landing Page i18n Labels

**Phase:** U1 - Landing Page
**Duration:** 20 minutes
**Status:** Pending

---

## Description

Add all translation keys for the Landing Page content in both Indonesian (`id.json`) and English (`en.json`).

**What will be done:**
1. Add landing page keys to `i18n/id.json`
2. Add corresponding English translations to `i18n/en.json`

**Key structure:**
```json
{
  "landing": {
    "heroTitle": "...",
    "heroSubtitle": "...",
    "cta": "...",
    "featureTitle": "...",
    "featureSubtitle": "...",
    "howItWorks": "...",
    "step1Title": "...",
    "step1Desc": "...",
    "step2Title": "...",
    "step2Desc": "...",
    "step3Title": "...",
    "step3Desc": "...",
    "step4Title": "...",
    "step4Desc": "...",
    "finalCta": "...",
    "footer": "..."
  }
}
```

**Indonesian labels:**
- `heroTitle`: "Kalkulator Harga Jual Optimal"
- `heroSubtitle`: "Hitung harga jual menu makanan Anda berdasarkan data biaya nyata — bahan baku, overhead, tenaga kerja, dan analisis pasar"
- `cta`: "Mulai Hitung"
- `featureTitle`: "Tiga Metode Pricing"
- `featureSubtitle`: "Pilih metode yang paling sesuai dengan kebutuhan bisnis Anda"
- `howItWorks`: "Cara Kerja"
- `step1Title`: "Input Bahan", etc.
- `finalCta`: "Siap Menentukan Harga Jual?"
- `footer`: "Kalkulator Harga Jual Optimal — © 2026"

**Files to edit:**
- `i18n/id.json`
- `i18n/en.json`

**Why this matters:**
- Maintains multi-language support (Indonesian default)
- No hardcoded text in the landing page component

---

## Dependencies

- UI-004 (landing page content defined)

## Acceptance Criteria

- [ ] All landing page text uses `t()` calls with i18n keys
- [ ] Both id.json and en.json have identical key structures
- [ ] Toggling language updates all landing page text
