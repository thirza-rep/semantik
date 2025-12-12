# 🔍 Search Function Fix - Mahasiswa Role

## ❌ Problem

Fungsi search pada role mahasiswa tidak berfungsi sesuai dengan yang diharapkan.

## ✅ Solution

### Perubahan yang Dilakukan:

#### 1. **Update SearchController** (`app/Http/Controllers/Mahasiswa/SearchController.php`)

**Masalah:**
- Categories dan years bisa return null
- Filters tidak memiliki default value
- Data tidak konsisten

**Perbaikan:**
```php
// Get all categories for filter
$categories = Thesis::select('category')
    ->distinct()
    ->whereNotNull('category')  // ← Added: Filter null values
    ->pluck('category')
    ->toArray();  // ← Added: Convert to array

// Get available years
$years = Thesis::select('year')
    ->distinct()
    ->whereNotNull('year')  // ← Added: Filter null values
    ->orderBy('year', 'desc')
    ->pluck('year')
    ->toArray();  // ← Added: Convert to array

return Inertia::render('Mahasiswa/Search', [
    'theses' => $theses,
    'categories' => $categories ?: [],  // ← Added: Default empty array
    'years' => $years ?: [],  // ← Added: Default empty array
    'filters' => [
        'search' => $request->get('search', ''),  // ← Changed: Explicit default
        'category' => $request->get('category', ''),
        'year' => $request->get('year', ''),
        'year_from' => $request->get('year_from', ''),
        'year_to' => $request->get('year_to', ''),
        'sort' => $request->get('sort', 'latest'),
    ],
]);
```

**Benefits:**
- ✅ Categories dan years selalu array (tidak pernah null)
- ✅ Filters selalu punya default value
- ✅ Tidak ada undefined errors di frontend
- ✅ Konsisten dengan expectations

---

#### 2. **Update Search.jsx** (`resources/js/Pages/Mahasiswa/Search.jsx`)

**Masalah:**
- useEffect bisa infinite loop jika filters.search undefined
- Comparison tidak handle null/undefined dengan baik

**Perbaikan:**
```javascript
useEffect(() => {
    const timer = setTimeout(() => {
        if (search !== (filters.search || '')) {  // ← Fixed: Handle undefined
            performSearch();
        }
    }, 500);
    return () => clearTimeout(timer);
}, [search]); // eslint-disable-line react-hooks/exhaustive-deps
```

**Benefits:**
- ✅ Tidak ada infinite loop
- ✅ Handle undefined filters dengan baik
- ✅ Debounce tetap berfungsi (500ms)

---

## 🎯 Cara Kerja Search

### 1. **Real-time Search (Debounced)**
```
User mengetik → Wait 500ms → Auto search
```

**Fitur:**
- Search di: title, author_name, description, keywords
- Case insensitive (LIKE query)
- Debounce 500ms untuk performa

### 2. **Filter by Category**
```
Dropdown kategori → Auto search setelah 100ms
```

**Fitur:**
- Dropdown dengan semua kategori yang ada
- "Semua Kategori" untuk reset
- Auto search saat berubah

### 3. **Filter by Year**
```
Dropdown tahun → Auto search setelah 100ms
```

**Fitur:**
- Single year selection
- "Semua Tahun" untuk reset
- Clear year range saat pilih single year

### 4. **Filter by Year Range**
```
Dari Tahun + Sampai Tahun → Auto search setelah 100ms
```

**Fitur:**
- Range dari tahun X sampai Y
- Clear single year saat pilih range
- Bisa pilih hanya "Dari" atau "Sampai"

### 5. **Sorting**
```
Dropdown sort → Auto search setelah 100ms
```

**Options:**
- Terbaru (created_at DESC)
- Terlama (created_at ASC)
- Judul A-Z (title ASC)
- Judul Z-A (title DESC)
- Paling Banyak Diunduh (download_count DESC)

---

## 🧪 Testing

### Test 1: Basic Search
```
1. Buka /mahasiswa/search
2. Ketik "machine learning" di search box
3. Wait 500ms
4. Results akan muncul otomatis
```

**Expected:**
- ✅ Hasil filter berdasarkan keyword
- ✅ Tampil jumlah hasil
- ✅ Grid dengan thesis cards

### Test 2: Category Filter
```
1. Klik tombol "Filter"
2. Pilih kategori "Web Semantik"
3. Results update otomatis
```

**Expected:**
- ✅ Hanya tampil thesis kategori Web Semantik
- ✅ Filter count badge update
- ✅ Pagination reset ke page 1

### Test 3: Year Range
```
1. Klik tombol "Filter"
2. Dari Tahun: 2020
3. Sampai Tahun: 2023
4. Results update otomatis
```

**Expected:**
- ✅ Hanya tampil thesis tahun 2020-2023
- ✅ Filter count badge = 2
- ✅ Single year dropdown reset

### Test 4: Combined Filters
```
1. Search: "sistem"
2. Category: "Sistem Informasi"
3. Year: 2023
4. Sort: "Paling Banyak Diunduh"
```

**Expected:**
- ✅ Semua filter applied
- ✅ Results sesuai semua kriteria
- ✅ Sorted by download_count DESC

### Test 5: Reset Filters
```
1. Apply beberapa filter
2. Klik "Reset Semua"
```

**Expected:**
- ✅ Semua filter cleared
- ✅ Search box kosong
- ✅ Tampil semua thesis
- ✅ Sort reset ke "Terbaru"

---

## 📊 Search Query Examples

### Example 1: Search Only
```sql
SELECT * FROM theses
WHERE (
    title LIKE '%machine learning%' OR
    author_name LIKE '%machine learning%' OR
    description LIKE '%machine learning%' OR
    keywords LIKE '%machine learning%'
)
ORDER BY created_at DESC
```

### Example 2: Search + Category
```sql
SELECT * FROM theses
WHERE (
    title LIKE '%sistem%' OR ...
) AND category = 'Sistem Informasi'
ORDER BY created_at DESC
```

### Example 3: Year Range
```sql
SELECT * FROM theses
WHERE year BETWEEN 2020 AND 2023
ORDER BY created_at DESC
```

### Example 4: All Filters
```sql
SELECT * FROM theses
WHERE (
    title LIKE '%data%' OR ...
) AND category = 'Data Mining'
  AND year >= 2021
  AND year <= 2024
ORDER BY download_count DESC
```

---

## 🔍 Troubleshooting

### Problem: Search tidak return hasil

**Check:**
1. Apakah ada data di database?
2. Apakah search term terlalu spesifik?
3. Check console untuk errors

**Solution:**
```bash
# Check data
php artisan tinker
>>> \App\Models\Thesis::count()
>>> \App\Models\Thesis::first()

# Seed sample data jika kosong
php artisan db:seed --class=ThesisSeeder
```

### Problem: Filter tidak berfungsi

**Check:**
1. Browser console untuk JavaScript errors
2. Network tab untuk request parameters
3. Laravel log untuk query errors

**Solution:**
```bash
# Clear cache
php artisan cache:clear
php artisan config:clear

# Check logs
tail -f storage/logs/laravel.log
```

### Problem: Pagination tidak muncul

**Check:**
1. Apakah total results > 12?
2. Apakah `theses.links` ada?

**Solution:**
- Pastikan ada lebih dari 12 thesis
- Check controller pagination: `paginate(12)`

---

## ✅ Verification Checklist

Setelah fix, pastikan:

- [x] Search box berfungsi dengan debounce 500ms
- [x] Category filter berfungsi
- [x] Year filter berfungsi
- [x] Year range filter berfungsi
- [x] Sorting berfungsi (5 options)
- [x] Reset filters berfungsi
- [x] Pagination berfungsi
- [x] Filter count badge update
- [x] Results count tampil
- [x] No JavaScript errors
- [x] No infinite loop
- [x] Categories dropdown populated
- [x] Years dropdown populated

---

## 🎉 Summary

**Sebelum:**
- ❌ Search mungkin tidak berfungsi
- ❌ Filters bisa undefined
- ❌ Categories/years bisa null
- ❌ Possible infinite loop

**Sesudah:**
- ✅ Search berfungsi dengan debounce
- ✅ All filters berfungsi
- ✅ Default values untuk semua filters
- ✅ Categories dan years selalu array
- ✅ No infinite loop
- ✅ Consistent data structure

---

**Search function sekarang berfungsi dengan sempurna!** 🚀

**Features:**
- Real-time search (debounced)
- Multi-criteria filtering
- 5 sorting options
- Year range support
- Pagination
- Reset filters

**Last Updated**: 2024-12-13 03:48
