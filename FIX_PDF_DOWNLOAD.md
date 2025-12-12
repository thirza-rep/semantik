# 📄 PDF Download & Preview Fix

## ❌ Problem

User melaporkan masalah berikut:
1.  **Download:** File yang didownload tidak memiliki nama/ekstensi yang benar (UUID string) dan tidak bisa dibuka.
2.  **Preview:** Layar hitam (gagal memuat PDF).

**Root Cause:**
1.  **Missing Physical File:** Data dummy (dari seeder) merujuk ke file `dummy.pdf`, tetapi file fisik tersebut **tidak ada** di folder penyimpanan (`storage/app/public/theses/`). Ini menyebabkan error 404/Empty Response yang dianggap corrupt oleh PDF viewer.
2.  **Missing Filename Header:** Route download lama tidak menyertakan header `Content-Disposition` dengan nama file yang user-friendly, sehingga browser menggunakan hash/UUID sebagai nama file.

## ✅ Solution

### 1. Created Dummy PDF File

Saya telah membuat file PDF valid minimalis dan menempatkannya di:
`storage/app/public/theses/dummy.pdf`

Sekarang, semua data skripsi dummy akan menampilkan file ini saat di-preview atau di-download.

### 2. Updated Routes (`routes/web.php`)

Saya memperbarui route download dan preview untuk menangani headers dengan benar:

```php
// Download Route
return \Storage::disk('public')->download($thesis->file_path, $filename, [
    'Content-Type' => 'application/pdf',
]);

// Preview Route
return \Storage::disk('public')->response($thesis->file_path, null, [
    'Content-Type' => 'application/pdf',
    'Content-Disposition' => 'inline; filename="' . $filename . '"',
]);
```

### 3. Update Database Path

Masalah lain ditemukan dimana data dummy di database merujuk ke `dummy.pdf` sedangkan file berada di `theses/dummy.pdf`.

Saya telah menjalankan perintah berikut untuk memperbaiki path di database:

```bash
php artisan tinker --execute="App\Models\Thesis::where('file_path', 'dummy.pdf')->update(['file_path' => 'theses/dummy.pdf']);"
```

**Hasilnya:**
- **Preview:** PDF tampil dengan benar di browser.
- **Download:** File terdownload dengan nama `judul-skripsi-yang-benar.pdf` dan format yang valid.

---

## 🧪 Testing

1.  Buka detail skripsi (sebagai Dosen atau Mahasiswa).
2.  Preview PDF harus menampilkan teks "Contoh File Skripsi Semantik".
3.  Klik tombol "Download".
4.  File harus tersimpan dengan nama judul skripsi (contoh: `implementasi-web-semantik.pdf`).

**Catatan:** Untuk file skripsi baru yang di-upload melalui form upload Dosen, file akan bekerja normal karena file fisik akan tersimpan otomatis saat proses upload.
