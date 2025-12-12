# 🔧 Fix 403 Forbidden on Dosen Edit Thesis

## ❌ Problem

User mendapatkan error `403 Forbidden` saat mencoba mengakses halaman edit tesis (`/dosen/thesis/{id}/edit`).

**Error Log:**
```
GET http://127.0.0.1:8000/dosen/thesis/11/edit 403 (Forbidden)
```

## 🔍 Root Cause Analysis

1.  **Ownership Mismatch:** Tesis dengan ID tersebut (misal: 11) terdaftar atas nama user ID lain di database. Ini sering terjadi karena:
    - Data seeding yang tidak konsisten dengan user yang sedang login.
    - User dihapus dan dibuat ulang (ID berubah), tapi tesis masih refer ke ID lama.

2.  **Type Mismatch:** Database mengembalikan `user_id` sebagai integer, tapi `auth()->id()` mungkin string (atau sebaliknya), menyebabkan strict comparison (`!==`) gagal.

## ✅ Solution Applied

### 1. Update Check Logic (`app/Http/Controllers/Dosen/ThesisController.php`)

Mengubah strict comparison (`!==`) menjadi loose comparison (`!=`) untuk menangani potensi perbedaan tipe data.

```php
// Before
if ($thesis->user_id !== auth()->id()) { abort(403); }

// After
if ($thesis->user_id != auth()->id()) { abort(403); }
```

### 2. Recommendation: Reset Database

Jika masalah berlanjut, itu berarti data di database memang tidak konsisten (tesis milik user lain). Solusi terbaik adalah me-reset database agar semua ID sinkron.

**Cara Reset Database:**

Jalankan perintah berikut di terminal:

```bash
php artisan migrate:fresh --seed
```

**Perhatian:** Perintah ini akan menghapus semua data dan mengisinya kembali dengan data sample yang bersih dan konsisten.

## 🧪 Verification

1.  Login sebagai Dosen (email: `ahmad@semantik.com`, password: `password`).
2.  Buka menu "Kelola Skripsi".
3.  Klik tombol "Edit" pada salah satu skripsi.
4.  Halaman edit harus terbuka tanpa error 403.
