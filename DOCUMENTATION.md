# 📚 Sistem Repository Skripsi - Dokumentasi Lengkap

## 📖 Daftar Isi

1. [Pengenalan](#pengenalan)
2. [Fitur Utama](#fitur-utama)
3. [Teknologi](#teknologi)
4. [Instalasi](#instalasi)
5. [Konfigurasi](#konfigurasi)
6. [Struktur Database](#struktur-database)
7. [Role & Permissions](#role--permissions)
8. [Panduan Penggunaan](#panduan-penggunaan)
9. [API Routes](#api-routes)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Pengenalan

Sistem Repository Skripsi adalah aplikasi web modern untuk mengelola, mencari, dan mengakses repository skripsi dengan teknologi semantic web. Sistem ini mengimplementasikan Role-Based Access Control (RBAC) dengan 3 role utama: **Admin**, **Dosen**, dan **Mahasiswa**.

### Tujuan Sistem
- Memudahkan dosen dalam mengelola dan mengupload skripsi
- Memudahkan mahasiswa dalam mencari dan mengakses skripsi
- Memberikan kontrol penuh kepada admin untuk mengelola users
- Menyediakan akses lifetime ke file PDF skripsi

---

## ✨ Fitur Utama

### 🔐 Authentication & Authorization
- Login dengan email & password
- Role-based access control (RBAC)
- Middleware protection untuk setiap route
- Session management

### 👨‍💼 Admin Features
- Dashboard dengan statistik sistem lengkap
- User management (Create, Read, Update, Delete)
- Filter users berdasarkan role
- Assign role (Dosen/Mahasiswa)
- View all thesis statistics

### 👨‍🏫 Dosen Features
- Dashboard dengan statistik personal
- Upload skripsi (PDF, max 10MB)
- Drag & drop file upload
- Edit metadata skripsi (title, author, year, category, keywords, description)
- Replace PDF file
- Delete skripsi
- Search own thesis
- View download statistics
- PDF preview inline

### 🎓 Mahasiswa Features
- Dashboard dengan recent & popular thesis
- Multi-criteria search (title, author, description, keywords)
- Filter by category
- Filter by year (single year or year range)
- Sort by latest, oldest, title A-Z/Z-A, most downloaded
- Real-time search dengan debounce (500ms)
- View thesis detail lengkap
- PDF preview dengan toggle show/hide
- Download PDF dengan tracking
- Related thesis suggestions
- Browse by categories

---

## 🛠️ Teknologi

### Backend
- **Framework**: Laravel 11
- **PHP**: 8.2+
- **Database**: MySQL 8.0+
- **Authentication**: Laravel Breeze
- **Storage**: Laravel Storage (Public Disk)

### Frontend
- **Framework**: React 18
- **Router**: Inertia.js
- **Styling**: Tailwind CSS + Custom CSS
- **Build Tool**: Vite
- **Icons**: SVG Icons

### Design System
- **Theme**: Pink Gradient
- **Effects**: Glassmorphism, Animations
- **Responsive**: Mobile-first approach

---

## 📦 Instalasi

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL >= 8.0
- Git

### Langkah Instalasi

1. **Clone Repository**
```bash
git clone <repository-url>
cd semantik
```

2. **Install Dependencies**
```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install
```

3. **Environment Setup**
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

4. **Database Configuration**

Edit file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=semantik
DB_USERNAME=root
DB_PASSWORD=
```

5. **Run Migrations & Seeders**
```bash
# Run migrations
php artisan migrate

# Run seeders (creates admin, sample users, and thesis)
php artisan db:seed --class=AdminSeeder
php artisan db:seed --class=ThesisSeeder
```

6. **Create Storage Link**
```bash
php artisan storage:link
```

7. **Build Assets**
```bash
# Development
npm run dev

# Production
npm run build
```

8. **Start Server**
```bash
# Laravel server
php artisan serve

# Vite dev server (in another terminal)
npm run dev
```

9. **Access Application**
```
http://localhost:8000
```

---

## ⚙️ Konfigurasi

### File Storage

File PDF disimpan di `storage/app/public/theses/` dan dapat diakses via:
```
http://localhost/storage/theses/filename.pdf
```

Konfigurasi di `config/filesystems.php`:
```php
'public' => [
    'driver' => 'local',
    'root' => storage_path('app/public'),
    'url' => env('APP_URL').'/storage',
    'visibility' => 'public',
],
```

### Upload Limits

Edit `php.ini` untuk mengubah limit upload:
```ini
upload_max_filesize = 10M
post_max_size = 10M
```

### Categories

Kategori skripsi didefinisikan di controller. Untuk menambah kategori, edit:
- `app/Http/Controllers/Dosen/ThesisController.php`
- `app/Http/Controllers/Mahasiswa/SearchController.php`

```php
$categories = [
    'Web Semantik',
    'Machine Learning',
    'Data Mining',
    'Sistem Informasi',
    'Keamanan Siber',
    // Tambahkan kategori baru di sini
];
```

---

## 🗄️ Struktur Database

### Table: users

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| name | varchar(255) | Nama lengkap |
| email | varchar(255) | Email (unique) |
| password | varchar(255) | Hashed password |
| role | enum | admin, dosen, mahasiswa |
| nim | varchar(50) | NIM (untuk mahasiswa) |
| nidn | varchar(50) | NIDN (untuk dosen) |
| phone | varchar(20) | Nomor telepon |
| created_at | timestamp | Tanggal registrasi |
| updated_at | timestamp | Tanggal update |

### Table: theses

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| user_id | bigint | Foreign key ke users |
| title | varchar(500) | Judul skripsi |
| year | integer | Tahun terbit |
| description | text | Deskripsi/abstrak |
| category | varchar(100) | Kategori |
| keywords | text | Kata kunci (comma separated) |
| author_name | varchar(255) | Nama penulis |
| file_path | varchar(500) | Path file PDF |
| file_size | bigint | Ukuran file (bytes) |
| download_count | integer | Jumlah download |
| created_at | timestamp | Tanggal upload |
| updated_at | timestamp | Tanggal update |

---

## 🔐 Role & Permissions

### Admin
**Routes**: `/admin/*`

**Permissions**:
- View all users
- Create new users (dosen/mahasiswa)
- Edit user information
- Delete users (except admin)
- View all thesis statistics
- Access admin dashboard

### Dosen
**Routes**: `/dosen/*`

**Permissions**:
- View personal dashboard
- **Browse all theses** (read-only)
- **Search and filter theses**
- **View thesis details**
- **Download PDF files**
- **Same as Mahasiswa** (no create/edit/delete access)

> **Note**: Dosen tidak dapat mengupload atau mengelola thesis. Hanya Admin yang memiliki akses CRUD.

### Mahasiswa
**Routes**: `/mahasiswa/*`

**Permissions**:
- View mahasiswa dashboard
- Search all thesis
- Filter and sort thesis
- View thesis details
- Download thesis files
- View related thesis

---

## 👥 User Accounts & Login

### Demo Accounts (17 Users Total)

Sistem sudah dilengkapi dengan 17 demo user untuk testing:

#### 👨‍💼 Admin (2 Users)
| Nama | Email | Password | Telepon |
|------|-------|----------|---------|
| Admin Utama | admin@semantik.com | admin123 | 081234567890 |
| Admin Backup | admin.backup@semantik.com | admin123 | 081234567891 |

#### 👨‍🏫 Dosen (5 Users)
| Nama | Email | Password | NIDN | Bidang |
|------|-------|----------|------|--------|
| Dr. Ahmad Fauzi, M.Kom | ahmad@semantik.com | dosen123 | 0123456789 | Informatika |
| Dr. Siti Nurhaliza, M.T | siti@semantik.com | dosen123 | 0123456790 | Sistem Informasi |
| Dr. Budi Santoso, M.Sc | budi.dosen@semantik.com | dosen123 | 0123456791 | Data Science |
| Dr. Dewi Lestari, M.Kom | dewi.dosen@semantik.com | dosen123 | 0123456792 | Web Development |
| Dr. Eko Prasetyo, M.T | eko@semantik.com | dosen123 | 0123456793 | Machine Learning |

#### 🎓 Mahasiswa (10 Users)
| Nama | Email | Password | NIM | Angkatan |
|------|-------|----------|-----|----------|
| Budi Setiawan | budi@semantik.com | mahasiswa123 | 2020001 | 2020 |
| Dewi Anggraini | dewi@semantik.com | mahasiswa123 | 2020002 | 2020 |
| Andi Wijaya | andi@semantik.com | mahasiswa123 | 2021001 | 2021 |
| Sari Wulandari | sari@semantik.com | mahasiswa123 | 2021002 | 2021 |
| Rudi Hermawan | rudi@semantik.com | mahasiswa123 | 2022001 | 2022 |
| Fitri Rahmawati | fitri@semantik.com | mahasiswa123 | 2022002 | 2022 |
| Agus Prasetyo | agus@semantik.com | mahasiswa123 | 2023001 | 2023 |
| Rina Susanti | rina@semantik.com | mahasiswa123 | 2023002 | 2023 |
| Doni Saputra | doni@semantik.com | mahasiswa123 | 2024001 | 2024 |
| Maya Sari | maya@semantik.com | mahasiswa123 | 2024002 | 2024 |

### Import Users ke Database

**Metode 1: Via SQL File**
```bash
mysql -u root -p semantik < database/sql/insert_users.sql
```

**Metode 2: Via Laravel Seeder**
```bash
php artisan db:seed --class=AdminSeeder
```

**Metode 3: Via phpMyAdmin**
1. Buka phpMyAdmin
2. Pilih database `semantik`
3. Klik tab "SQL"
4. Copy-paste isi file `database/sql/insert_users.sql`
5. Klik "Go"

### Password Information

**Default Passwords:**
- Admin: `admin123`
- Dosen: `dosen123`
- Mahasiswa: `mahasiswa123`

**Password Hash:**
```
$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
```

**Generate Password Baru:**
```bash
php artisan tinker
>>> Hash::make('password_baru')
```

### Dokumentasi Lengkap

Untuk informasi lebih detail tentang user accounts:
- **USERS.md** - Daftar lengkap semua user dengan detail
- **QUICK_REFERENCE.md** - Quick access credentials

### ⚠️ Catatan Keamanan

1. **Jangan gunakan di production** - Password terlalu simple
2. **Ubah password** setelah first login
3. **Hapus demo users** sebelum go-live
4. **Backup database** sebelum import
5. **Verifikasi email** sudah di-set untuk semua user

---

## 📘 Panduan Penggunaan

### Untuk Admin

#### 1. Login
```
URL: http://localhost:8000/login
Email: admin@semantik.com
Password: admin123
```

#### 2. Mengelola Users

**Melihat Daftar Users:**
1. Login sebagai admin
2. Klik menu "Users" di sidebar
3. Gunakan search box untuk mencari user
4. Filter by role menggunakan dropdown

**Menambah User Baru:**
1. Klik tombol "+ Tambah User"
2. Isi form:
   - Nama Lengkap
   - Email
   - Password (min 8 karakter)
   - Role (Dosen/Mahasiswa)
   - NIM (jika mahasiswa) atau NIDN (jika dosen)
   - Nomor Telepon (opsional)
3. Klik "Simpan User"

**Mengedit User:**
1. Klik icon ✏️ pada user yang ingin diedit
2. Update informasi yang diperlukan
3. Kosongkan password jika tidak ingin mengubah
4. Klik "Update User"

**Menghapus User:**
1. Klik icon 🗑️ pada user yang ingin dihapus
2. Konfirmasi penghapusan
3. User akan dihapus (kecuali admin)

---

### Untuk Dosen

#### 1. Login
```
Email: ahmad@semantik.com (atau dosen lain)
Password: dosen123
```

#### 2. Upload Skripsi

**Cara Upload:**
1. Login sebagai dosen
2. Klik "Upload Skripsi Baru" di dashboard atau menu
3. Isi form:
   - **Judul Skripsi** (required)
   - **Nama Penulis** (required)
   - **Tahun Terbit** (required)
   - **Kategori** (required)
   - **Kata Kunci** (opsional, pisahkan dengan koma)
   - **Deskripsi/Abstrak** (required)
   - **File PDF** (required, max 10MB)
4. Upload file dengan cara:
   - Drag & drop file ke area upload, atau
   - Klik area upload untuk memilih file
5. Klik "Upload Skripsi"

**Tips:**
- File harus format PDF
- Maksimal ukuran 10MB
- Pastikan metadata lengkap untuk memudahkan pencarian

#### 3. Mengelola Skripsi

**Melihat Daftar Skripsi:**
1. Klik menu "Kelola Skripsi"
2. Gunakan search box untuk mencari
3. Klik "Lihat" untuk detail atau "Edit" untuk mengubah

**Mengedit Skripsi:**
1. Klik tombol "Edit" pada skripsi
2. Update informasi yang diperlukan
3. Upload file baru jika ingin mengganti PDF
4. Klik "Update Skripsi"

**Menghapus Skripsi:**
1. Klik icon 🗑️ pada skripsi
2. Konfirmasi penghapusan
3. Skripsi dan file PDF akan dihapus

---

### Untuk Mahasiswa

#### 1. Login
```
Email: budi@semantik.com (atau mahasiswa lain)
Password: mahasiswa123
```

#### 2. Mencari Skripsi

**Pencarian Sederhana:**
1. Gunakan search bar di dashboard atau halaman search
2. Ketik kata kunci (judul, penulis, deskripsi)
3. Hasil akan muncul secara real-time

**Pencarian Advanced:**
1. Klik tombol "Filter" di search bar
2. Pilih filter:
   - **Kategori**: Pilih kategori tertentu
   - **Tahun**: Pilih tahun tertentu
   - **Dari Tahun - Sampai Tahun**: Rentang tahun
3. Pilih sorting:
   - Terbaru
   - Terlama
   - Judul A-Z
   - Judul Z-A
   - Paling Banyak Diunduh
4. Klik "Reset Semua" untuk menghapus filter

#### 3. Melihat & Download Skripsi

**Melihat Detail:**
1. Klik "Lihat Detail" pada skripsi
2. Lihat informasi lengkap:
   - Judul, penulis, tahun
   - Deskripsi/abstrak
   - Kata kunci
   - Informasi dosen pembimbing

**Preview PDF:**
1. Di halaman detail, klik "▼ Tampilkan" di bagian Preview PDF
2. PDF akan ditampilkan inline di browser
3. Klik "▲ Sembunyikan" untuk menutup preview

**Download PDF:**
1. Klik tombol "Download PDF"
2. File akan terdownload ke komputer
3. Download counter akan bertambah

---

## 🛣️ API Routes

### Public Routes
```
GET  /                    - Welcome page
GET  /login              - Login page
POST /login              - Login process
POST /logout             - Logout
GET  /register           - Register page
POST /register           - Register process
```

### Admin Routes
```
GET  /admin/dashboard              - Admin dashboard
GET  /admin/users                  - Users list
GET  /admin/users/create           - Create user form
POST /admin/users                  - Store new user
GET  /admin/users/{id}/edit        - Edit user form
PUT  /admin/users/{id}             - Update user
DELETE /admin/users/{id}           - Delete user

GET  /admin/thesis                 - All theses list
GET  /admin/thesis/create          - Create thesis form
POST /admin/thesis                 - Store new thesis
GET  /admin/thesis/{id}            - View thesis
GET  /admin/thesis/{id}/edit       - Edit thesis form
PUT  /admin/thesis/{id}            - Update thesis
DELETE /admin/thesis/{id}          - Delete thesis
```

### Dosen Routes
```
GET  /dosen/dashboard              - Dosen dashboard
GET  /dosen/thesis                 - Browse theses (read-only)
GET  /dosen/thesis/{id}            - View thesis detail (read-only)
```

### Mahasiswa Routes
```
GET  /mahasiswa/dashboard          - Mahasiswa dashboard
GET  /mahasiswa/search             - Search page
GET  /mahasiswa/thesis/{id}        - View thesis detail
GET  /mahasiswa/thesis/{id}/download - Download PDF
```

---

## 🔧 Troubleshooting

### Problem: Storage link tidak berfungsi

**Solution:**
```bash
# Hapus link lama (jika ada)
rm public/storage

# Buat link baru
php artisan storage:link
```

### Problem: File upload gagal (413 Request Entity Too Large)

**Solution:**
Edit `php.ini`:
```ini
upload_max_filesize = 10M
post_max_size = 10M
```

Restart web server setelah perubahan.

### Problem: PDF tidak tampil di preview

**Solution:**
1. Pastikan file PDF valid
2. Cek browser support untuk PDF embed
3. Gunakan download jika preview tidak berfungsi

### Problem: Tidak bisa login

**Solution:**
1. Pastikan database sudah di-seed:
   ```bash
   php artisan db:seed --class=AdminSeeder
   ```
2. Clear cache:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```

### Problem: Vite assets tidak load

**Solution:**
```bash
# Development
npm run dev

# Production
npm run build
```

### Problem: Permission denied saat upload

**Solution:**
```bash
# Linux/Mac
chmod -R 775 storage
chmod -R 775 bootstrap/cache

# Windows
# Pastikan folder storage dan bootstrap/cache writable
```

---

## 📞 Support

Untuk bantuan lebih lanjut, hubungi:
- Email: support@semantik.com
- GitHub Issues: [repository-url]/issues

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Credits

Developed by Web Semantik Team
© 2024 All Rights Reserved
