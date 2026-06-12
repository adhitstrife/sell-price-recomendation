# Plan: Website Kalkulator Harga Jual Optimal Menu Makanan

## 1. Latar Belakang

UMKM makanan (warung, rumahan, catering kecil) sering kesulitan menentukan **harga jual yang pas** — kebanyakan pakai intuisi atau asal mark-up. Hasilnya: bisa kemahalan (ga laku) atau kemurahan (ga balik modal).

Website ini bantu user hitung harga jual optimal berdasarkan data real (modal bahan, biaya lain, opsional harga kompetitor) dan metode pricing yang user pilih sendiri.

**Target user**: pemilik usaha makanan kecil, home cook yang mau jualan, atau pebisnis catering rumahan.

---

## 2. Scope

### In Scope
- Input bahan + harga per satuan (kg, liter, pcs, pack, dll)
- Input biaya non-bahan: overhead bulanan, labor, packaging
- 3 metode kalkulasi (user pilih salah satu atau lebih):
  1. **Food Cost %** — harga jual = total modal / target food cost %
  2. **Markup Multiplier** — harga jual = total modal × multiplier
  3. **Market-Based (opsional)** — input harga kompetitor, sistem hitung range & posisi relatif
- Rekomendasi harga akhir + breakdown biaya
- Simpan/load resep (localStorage)
- Multi-bahasa: Indonesia & English

### Out of Scope (v1)
- Login / multi-user / cloud sync
- Reporting/analytics historis
- Integrasi payment atau POS
- Mobile app native
- Inventory management

---

## 3. Tech Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js 14+ (App Router) + TypeScript** | Full-stack, type-safe, built-in routing & API |
| Styling | **Tailwind CSS** | Cepat, konsisten, mudah responsive |
| State | **React Hooks + Context** | Cukup untuk skala ini |
| Storage | **localStorage** (client) + **API routes** (optional server) | Fleksibel: simpan di browser atau server |
| i18n | **next-i18next** | Optimized untuk Next.js, dukungan multi-bahasa bagus |
| Hosting | **Vercel** (native Next.js support) | Gratis, otomatis deployment dari GitHub |
| Testing | **Vitest + React Testing Library** | Standar untuk React stack |

**Full-stack app** dengan App Router. Frontend: React components, Backend: API routes. Data bisa di browser (localStorage) atau server (database).

---

## 4. Struktur File

```
harga-jual-menu/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page (/)
│   ├── saved-recipes/
│   │   └── page.tsx                  # Saved recipes page
│   ├── api/
│   │   ├── recipes/
│   │   │   ├── route.ts              # GET/POST /api/recipes
│   │   │   └── [id]/route.ts         # GET/PUT/DELETE /api/recipes/[id]
│   │   ├── settings/
│   │   │   └── route.ts              # GET/POST /api/settings
│   │   └── calculate/
│   │       └── route.ts              # POST /api/calculate (pricing methods)
│   └── globals.css                   # Tailwind imports
├── components/
│   ├── IngredientInput.tsx           # Form input bahan
│   ├── IngredientList.tsx            # Tabel bahan yang sudah diinput
│   ├── OverheadInput.tsx             # Biaya non-bahan
│   ├── PricingMethodSelector.tsx     # Pilih metode kalkulasi
│   ├── MarketPriceInput.tsx          # Input harga kompetitor
│   ├── ResultDisplay.tsx             # Hasil & breakdown
│   ├── RecipeList.tsx                # Daftar resep tersimpan
│   └── LanguageToggle.tsx
├── lib/
│   ├── calculator.ts                 # Logic kalkulasi (shared client/server)
│   ├── storage.ts                    # localStorage helpers (client-side)
│   ├── types.ts                      # TypeScript types
│   └── api-client.ts                 # Fetch wrapper for API calls
├── i18n/
│   ├── id.json                       # Indonesian translations
│   └── en.json                       # English translations
├── public/
│   └── favicon.svg
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── next-i18next.config.js            # i18n configuration
│   ├── pages/
│   │   ├── HomePage.tsx              # Halaman utama (kalkulator)
│   │   └── SavedRecipesPage.tsx      # Halaman resep tersimpan
│   └── styles/
│       └── index.css
└── README.md
```

---

## 5. Data Model

```typescript
// src/lib/types.ts
type Unit = 'gram' | 'kg' | 'ml' | 'liter' | 'pcs' | 'pack' | 'sachet' | 'sendok' | 'gelas';

interface Ingredient {
  id: string;              // uuid
  name: string;
  pricePerUnit: number;    // Harga per unit besar (misal: 1 kg = 15000)
  unit: Unit;              // Satuan pembelian (kg, liter, pack)
  amountPerPortion: number; // Takaran per porsi (misal: 200 gram)
  amountUnit: Unit;        // Satuan takaran (gram, ml, pcs)
}

interface Overhead {
  // Biaya non-bahan, semua opsional, default 0
  packagingPerPortion: number;      // Kemasan per porsi
  overheadPerPortion: number;        // Overhead (gas, listrik, sewa) → dialokasikan per porsi
  laborPerPortion: number;           // Tenaga kerja per porsi (lihat section 6.3)
}

type PricingMethod = 'foodCost' | 'markup' | 'market';

interface PricingConfig {
  method: PricingMethod;
  // Food cost method
  targetFoodCostPercent?: number;    // Misal 30 (artinya 30%)
  // Markup method
  markupMultiplier?: number;         // Misal 3 (artinya 3x modal)
  // Market method
  competitorPrices?: number[];       // Array harga kompetitor
}

interface Recipe {
  id: string;
  name: string;
  portions: number;                  // Jumlah porsi yang dihasilkan
  ingredients: Ingredient[];
  overhead: Overhead;
  pricing: PricingConfig;
  createdAt: number;
  updatedAt: number;
}
```

---

## 6. Logic Kalkulasi

### 6.1 Total Biaya Bahan per Porsi

Untuk tiap bahan:
```
cost_per_portion = (pricePerUnit / unit_conversion) × amountPerPortion
```

Dimana `unit_conversion` adalah konversi satuan pembelian → satuan takaran:
- Pembelian `kg`, takaran `gram` → 1000
- Pembelian `liter`, takaran `ml` → 1000
- Pembelian `pack`, takaran `pcs` → jumlah pcs dalam pack (perlu input tambahan) atau asumsi 1
- dst.

**Edge case**: satuan sama → konversi = 1.

### 6.2 Total Modal per Porsi

```
total_modal = sum(cost_per_portion_bahan) + overhead.packagingPerPortion
            + overhead.overheadPerPortion + overhead.laborPerPortion
```

### 6.3 Cara Hitung Labor Cost (2 Model)

User bingung gimana hitung labor cost per menu. Gue propose 2 model, **user pilih salah satu** saat input:

**Model A: Per-Batch (lebih akurat per menu)**
```
labor_per_portion = (waktu_masak_per_batch_menit / 60) × tarif_per_jam / jumlah_porsi_per_batch
```
Input: waktu masak (menit), tarif per jam, porsi per batch.
Cocok untuk: menu yang proses masaknya manual (gorengan, kue, dll).

**Model B: Alokasi Bulanan (lebih simpel)**
```
labor_per_portion = total_gaji_karyawan_per_bulan / estimasi_total_porsi_per_bulan
```
Input: total gaji bulanan, estimasi jumlah porsi sebulan.
Cocok untuk: usaha yang udah jalan, karyawan tetap.

**Default**: kosongin = 0 (labor tidak dihitung). User bisa pilih mau hitung atau tidak.

### 6.4 Pricing Methods

**Method 1: Food Cost %**
```
harga_jual = total_modal / (target_food_cost_percent / 100)
```
Contoh: modal 10rb, target 30% → harga jual = 33.333 → dibulatkan jadi 33.500 atau 35.000.

**Method 2: Markup Multiplier**
```
harga_jual = total_modal × markup_multiplier
```
Contoh: modal 10rb, multiplier 3 → harga jual = 30.000.

**Method 3: Market-Based (opsional)**
```
median_kompetitor = median(competitor_prices)
range_rekomendasi = [min_kompetitor, max_kompetitor]
posisi_user_vs_market = "di bawah rata-rata" | "sejajar" | "di atas rata-rata"
```
Output: range harga berdasarkan pasar. Tidak hitung dari modal (hanya pembanding).

**Saran UX**: tampilkan ketiga metode sebagai **tab/card** (Food Cost | Markup | Market). User bisa pilih salah satu atau lihat ketiganya sebagai perbandingan.

---

## 7. UI/UX Flow

### Halaman Utama (Single Page)

```
┌──────────────────────────────────────────────────────┐
│  [Header: Logo] [Language: ID/EN]  [Saved Recipes]   │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Step 1: Nama Menu & Jumlah Porsi                    │
│  ┌────────────────┐  ┌──────────────┐                │
│  │ Nama Menu      │  │ Jumlah Porsi │                │
│  └────────────────┘  └──────────────┘                │
│                                                      │
│  Step 2: Bahan-Bahan                                 │
│  ┌──────────────────────────────────────┐            │
│  │ Nama │ Harga/Unit │ Unit │ Takaran   │ [+Tambah]  │
│  │ Tepung│ 15000/kg  │ kg   │ 200g      │            │
│  │ ...  │ ...        │ ...  │ ...       │            │
│  └──────────────────────────────────────┘            │
│                                                      │
│  Step 3: Biaya Non-Bahan (Opsional, Collapsible)     │
│  - Packaging per porsi: [Rp]                         │
│  - Overhead per porsi: [Rp]                          │
│  - Labor: [Model A ▼] [waktu] [tarif/jam]            │
│                                                      │
│  Step 4: Pilih Metode Harga                          │
│  ┌──────────┬──────────┬──────────┐                  │
│  │ Food Cost│ Markup   │ Market   │                  │
│  │ [30%]    │ [3x]     │ [+input] │                  │
│  └──────────┴──────────┴──────────┘                  │
│                                                      │
│  ────── HASIL ──────                                  │
│  ┌──────────────────────────────────────┐            │
│  │ Modal per porsi:    Rp 10.500        │            │
│  │ Harga (Food Cost 30%): Rp 35.000     │            │
│  │ Harga (Markup 3x):   Rp 31.500       │            │
│  │ Range pasar:        Rp 25.000–40.000 │            │
│  │ → Rekomendasi: Rp 33.000–35.000      │            │
│  └──────────────────────────────────────┘            │
│                                                      │
│  [Simpan Resep]  [Reset]                             │
└──────────────────────────────────────────────────────┘
```

### Halaman Saved Recipes
- List resep tersimpan dari localStorage
- Aksi: Lihat | Edit | Hapus | Duplikat
- Search/filter

---

## 8. Multi-Bahasa

`src/i18n/id.json` dan `en.json` dengan keys:
- `app.title`, `app.subtitle`
- `form.ingredientName`, `form.pricePerUnit`, `form.amountPerPortion`
- `result.totalCost`, `result.suggestedPrice`, `result.marketRange`
- `method.foodCost`, `method.markup`, `method.market`
- `labor.modelA`, `labor.modelB`
- `btn.save`, `btn.reset`, `btn.delete`

Default bahasa: **Indonesia**. Toggle di header, persist di localStorage.

---

## 9. Verification & Acceptance Criteria

### Functional
- [ ] User bisa tambah/hapus/edit bahan
- [ ] Konversi satuan (kg↔gram, liter↔ml) benar
- [ ] Kalkulasi food cost % akurat (test dengan angka riil)
- [ ] Kalkulasi markup akurat
- [ ] Market-based hitung median/min/max dengan benar
- [ ] Labor model A & B berfungsi
- [ ] Simpan/load resep dari localStorage bekerja
- [ ] Toggle bahasa ID/EN mengganti semua label

### Non-Functional
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Page load < 2 detik
- [ ] A11y dasar (label form, button focusable)
- [ ] Validasi input (negative number, kosong, dll) — tampilkan error ramah

### Tests
- Unit test untuk `calculator.ts` (semua metode kalkulasi + edge case)
- Snapshot test untuk komponen utama
- Manual: test di Chrome + Firefox + Safari

---

## 10. Estimasi & Timeline

| Phase | Task | Estimasi |
|---|---|---|
| 1 | Setup project (Vite + TS + Tailwind + i18n) | 1–2 jam |
| 2 | Data model + types | 30 menit |
| 3 | Form input (bahan, overhead, labor) | 3–4 jam |
| 4 | Logic kalkulasi + unit test | 2–3 jam |
| 5 | Pricing method UI + result display | 2–3 jam |
| 6 | localStorage save/load | 1–2 jam |
| 7 | Multi-bahasa | 1–2 jam |
| 8 | Styling + responsive | 2–3 jam |
| 9 | Deploy ke Vercel/Netlify | 30 menit |

**Total**: ~15–20 jam kerja.

---

## 11. Next Step

1. Confirm plan ini (ada yang mau di-tambah/di-kurang?)
2. Setup repo + Vite project
3. Mulai dari phase 1 (setup) → phase 2 (types) → seterusnya incremental

Mau lanjut eksekusi dari plan ini, atau ada yang perlu di-adjust dulu?
