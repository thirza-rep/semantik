# 🔧 PDF Access Fix - Documentation

## ❌ Problem

File PDF mengembalikan error **403 Unauthorized** ketika diakses.

## ✅ Solution

### Perubahan yang Dilakukan:

#### 1. **Update Routes** (`routes/web.php`)

**Sebelum:**
- Route download hanya bisa diakses oleh role tertentu (mahasiswa/dosen)
- File URL menggunakan direct storage link

**Sesudah:**
- Membuat route global `/thesis/{id}/download` dan `/thesis/{id}/preview`
- Route bisa diakses oleh semua authenticated users
- Menggunakan middleware `auth` saja (tidak role-specific)

```php
// Public PDF Routes (accessible by all authenticated users)
Route::middleware(['auth'])->group(function () {
    // Download dengan tracking
    Route::get('/thesis/{thesis}/download', function ($id) {
        $thesis = \App\Models\Thesis::findOrFail($id);
        
        if (!$thesis->file_path || !\Storage::disk('public')->exists($thesis->file_path)) {
            abort(404, 'File tidak ditemukan');
        }
        
        // Increment download count
        $thesis->incrementDownloads();
        
        return \Storage::disk('public')->download($thesis->file_path);
    })->name('thesis.download');
    
    // Preview untuk iframe
    Route::get('/thesis/{thesis}/preview', function ($id) {
        $thesis = \App\Models\Thesis::findOrFail($id);
        
        if (!$thesis->file_path || !\Storage::disk('public')->exists($thesis->file_path)) {
            abort(404, 'File tidak ditemukan');
        }
        
        return \Storage::disk('public')->response($thesis->file_path);
    })->name('thesis.preview');
});
```

#### 2. **Update Thesis Model** (`app/Models/Thesis.php`)

**Sebelum:**
```php
public function getFileUrlAttribute()
{
    if ($this->file_path) {
        return asset('storage/' . $this->file_path);
    }
    return null;
}
```

**Sesudah:**
```php
public function getFileUrlAttribute()
{
    if ($this->file_path) {
        // Use route for preview with authentication
        return route('thesis.preview', $this->id);
    }
    return null;
}
```

---

## 🎯 Cara Kerja Baru

### 1. **Preview PDF (di iframe)**
```
URL: /thesis/{id}/preview
Method: GET
Auth: Required (any authenticated user)
Response: PDF file dengan header inline
```

**Contoh:**
```
http://localhost:8000/thesis/1/preview
```

### 2. **Download PDF**
```
URL: /thesis/{id}/download
Method: GET
Auth: Required (any authenticated user)
Response: PDF file dengan header attachment
Action: Increment download_count
```

**Contoh:**
```
http://localhost:8000/thesis/1/download
```

---

## 🔐 Access Control

### Sebelum:
- ❌ Mahasiswa: Bisa akses via `/mahasiswa/thesis/{id}/download`
- ❌ Dosen: Bisa akses via `/dosen/thesis/{id}/download`
- ❌ Admin: Tidak bisa akses PDF

### Sesudah:
- ✅ **Semua authenticated users** bisa akses PDF
- ✅ Admin bisa preview & download
- ✅ Dosen bisa preview & download
- ✅ Mahasiswa bisa preview & download
- ✅ Route konsisten untuk semua role

---

## 📊 Benefits

1. **Unified Access**
   - Satu route untuk semua role
   - Tidak perlu duplicate code

2. **Better Security**
   - Tetap memerlukan authentication
   - File tidak bisa diakses tanpa login
   - Tracking download tetap berfungsi

3. **Easier Maintenance**
   - Route terpusat
   - Mudah di-update

4. **Flexible**
   - Preview untuk iframe
   - Download untuk save file
   - Support semua authenticated users

---

## 🧪 Testing

### Test Preview
```bash
# Login sebagai user (admin/dosen/mahasiswa)
# Buka browser dan akses:
http://localhost:8000/thesis/1/preview
```

**Expected Result:**
- PDF tampil di browser
- Header: `Content-Type: application/pdf`
- Header: `Content-Disposition: inline`

### Test Download
```bash
# Login sebagai user
# Buka browser dan akses:
http://localhost:8000/thesis/1/download
```

**Expected Result:**
- File PDF terdownload
- Download counter bertambah
- Header: `Content-Disposition: attachment`

### Test di Frontend

**Mahasiswa - Thesis Show:**
```jsx
<iframe
    src={thesis.file_url}  // Akan menggunakan /thesis/{id}/preview
    className="w-full h-[800px]"
/>
```

**Dosen - Thesis Show:**
```jsx
<iframe
    src={thesis.file_url}  // Akan menggunakan /thesis/{id}/preview
    className="w-full h-[600px]"
/>
```

---

## 🔍 Troubleshooting

### Problem: Masih 403 Unauthorized

**Check:**
1. Pastikan sudah login
2. Clear browser cache
3. Check session

**Solution:**
```bash
php artisan cache:clear
php artisan config:clear
```

### Problem: 404 File Not Found

**Check:**
1. Pastikan file ada di `storage/app/public/theses/`
2. Pastikan storage link sudah dibuat

**Solution:**
```bash
# Create directory
mkdir storage/app/public/theses

# Recreate storage link
rm public/storage
php artisan storage:link
```

### Problem: PDF tidak tampil di iframe

**Check:**
1. Browser support untuk PDF embed
2. PDF file valid
3. Network tab di browser DevTools

**Alternative:**
- Gunakan download button
- Buka PDF di tab baru

---

## 📝 Migration Notes

### Untuk Existing Code:

**Frontend tidak perlu diubah:**
- `thesis.file_url` otomatis menggunakan route baru
- Preview dan download tetap berfungsi

**Backend:**
- Route download di `MahasiswaController` sudah tidak digunakan
- Route download di `DosenController` sudah tidak digunakan
- Semua menggunakan route global

---

## ✅ Checklist

- [x] Update routes untuk preview & download
- [x] Update Thesis model file_url accessor
- [x] Remove duplicate routes dari dosen/mahasiswa
- [x] Create theses directory
- [x] Test preview route
- [x] Test download route
- [x] Update documentation

---

## 🎉 Result

✅ **PDF sekarang bisa diakses oleh semua authenticated users!**

- Preview: `/thesis/{id}/preview`
- Download: `/thesis/{id}/download`
- Access: All authenticated users
- Tracking: Download count tetap berfungsi

---

**Last Updated**: 2024-12-13 03:02
