# 👥 Daftar User Login - Sistem Repository Skripsi

## 📋 Informasi Umum

**Default Password untuk semua user**: `password`

**Catatan**: 
- Semua user sudah di-hash dengan bcrypt
- Email verified untuk semua user
- User dapat mengubah password setelah login

---

## 👨‍💼 ADMIN (2 Users)

### 1. Admin Utama
- **Nama**: Admin Utama
- **Email**: `admin@semantik.com`
- **Password**: `admin123`
- **Role**: Admin
- **Telepon**: 081234567890
- **Akses**: Full access ke sistem

### 2. Admin Backup
- **Nama**: Admin Backup
- **Email**: `admin.backup@semantik.com`
- **Password**: `admin123`
- **Role**: Admin
- **Telepon**: 081234567891
- **Akses**: Full access ke sistem

---

## 👨‍🏫 DOSEN (5 Users)

> **📝 Important Note**: Dosen memiliki akses **READ-ONLY** yang sama dengan Mahasiswa.  
> Hanya dapat **browse dan search** skripsi. Tidak bisa upload, edit, atau delete.  
> Untuk mengelola skripsi, hubungi **Admin**.

### 1. Dr. Ahmad Fauzi, M.Kom
- **Nama**: Dr. Ahmad Fauzi, M.Kom
- **Email**: `ahmad@semantik.com`
- **Password**: `dosen123`
- **Role**: Dosen
- **NIDN**: 0123456789
- **Telepon**: 081234567801
- **Bidang**: Informatika

### 2. Dr. Siti Nurhaliza, M.T
- **Nama**: Dr. Siti Nurhaliza, M.T
- **Email**: `siti@semantik.com`
- **Password**: `dosen123`
- **Role**: Dosen
- **NIDN**: 0123456790
- **Telepon**: 081234567802
- **Bidang**: Sistem Informasi

### 3. Dr. Budi Santoso, M.Sc
- **Nama**: Dr. Budi Santoso, M.Sc
- **Email**: `budi.dosen@semantik.com`
- **Password**: `dosen123`
- **Role**: Dosen
- **NIDN**: 0123456791
- **Telepon**: 081234567803
- **Bidang**: Data Science

### 4. Dr. Dewi Lestari, M.Kom
- **Nama**: Dr. Dewi Lestari, M.Kom
- **Email**: `dewi.dosen@semantik.com`
- **Password**: `dosen123`
- **Role**: Dosen
- **NIDN**: 0123456792
- **Telepon**: 081234567804
- **Bidang**: Web Development

### 5. Dr. Eko Prasetyo, M.T
- **Nama**: Dr. Eko Prasetyo, M.T
- **Email**: `eko@semantik.com`
- **Password**: `dosen123`
- **Role**: Dosen
- **NIDN**: 0123456793
- **Telepon**: 081234567805
- **Bidang**: Machine Learning

---

## 🎓 MAHASISWA (10 Users)

### Angkatan 2020

#### 1. Budi Setiawan
- **Nama**: Budi Setiawan
- **Email**: `budi@semantik.com`
- **Password**: `mahasiswa123`
- **Role**: Mahasiswa
- **NIM**: 2020001
- **Telepon**: 081234567901
- **Angkatan**: 2020

#### 2. Dewi Anggraini
- **Nama**: Dewi Anggraini
- **Email**: `dewi@semantik.com`
- **Password**: `mahasiswa123`
- **Role**: Mahasiswa
- **NIM**: 2020002
- **Telepon**: 081234567902
- **Angkatan**: 2020

### Angkatan 2021

#### 3. Andi Wijaya
- **Nama**: Andi Wijaya
- **Email**: `andi@semantik.com`
- **Password**: `mahasiswa123`
- **Role**: Mahasiswa
- **NIM**: 2021001
- **Telepon**: 081234567903
- **Angkatan**: 2021

#### 4. Sari Wulandari
- **Nama**: Sari Wulandari
- **Email**: `sari@semantik.com`
- **Password**: `mahasiswa123`
- **Role**: Mahasiswa
- **NIM**: 2021002
- **Telepon**: 081234567904
- **Angkatan**: 2021

### Angkatan 2022

#### 5. Rudi Hermawan
- **Nama**: Rudi Hermawan
- **Email**: `rudi@semantik.com`
- **Password**: `mahasiswa123`
- **Role**: Mahasiswa
- **NIM**: 2022001
- **Telepon**: 081234567905
- **Angkatan**: 2022

#### 6. Fitri Rahmawati
- **Nama**: Fitri Rahmawati
- **Email**: `fitri@semantik.com`
- **Password**: `mahasiswa123`
- **Role**: Mahasiswa
- **NIM**: 2022002
- **Telepon**: 081234567906
- **Angkatan**: 2022

### Angkatan 2023

#### 7. Agus Prasetyo
- **Nama**: Agus Prasetyo
- **Email**: `agus@semantik.com`
- **Password**: `mahasiswa123`
- **Role**: Mahasiswa
- **NIM**: 2023001
- **Telepon**: 081234567907
- **Angkatan**: 2023

#### 8. Rina Susanti
- **Nama**: Rina Susanti
- **Email**: `rina@semantik.com`
- **Password**: `mahasiswa123`
- **Role**: Mahasiswa
- **NIM**: 2023002
- **Telepon**: 081234567908
- **Angkatan**: 2023

### Angkatan 2024

#### 9. Doni Saputra
- **Nama**: Doni Saputra
- **Email**: `doni@semantik.com`
- **Password**: `mahasiswa123`
- **Role**: Mahasiswa
- **NIM**: 2024001
- **Telepon**: 081234567909
- **Angkatan**: 2024

#### 10. Maya Sari
- **Nama**: Maya Sari
- **Email**: `maya@semantik.com`
- **Password**: `mahasiswa123`
- **Role**: Mahasiswa
- **NIM**: 2024002
- **Telepon**: 081234567910
- **Angkatan**: 2024

---

## 📊 Ringkasan

| Role | Jumlah | Password Default |
|------|--------|------------------|
| Admin | 2 | admin123 |
| Dosen | 5 | dosen123 |
| Mahasiswa | 10 | mahasiswa123 |
| **Total** | **17** | - |

---

## 🔧 Cara Import User ke Database

### Metode 1: Via SQL File
```bash
# Masuk ke MySQL
mysql -u root -p

# Gunakan database
USE semantik;

# Import file SQL
source database/sql/insert_users.sql;
```

### Metode 2: Via Laravel Seeder
```bash
# Run seeder yang sudah ada
php artisan db:seed --class=AdminSeeder
```

### Metode 3: Via phpMyAdmin
1. Buka phpMyAdmin
2. Pilih database `semantik`
3. Klik tab "SQL"
4. Copy-paste isi file `insert_users.sql`
5. Klik "Go"

---

## 🔐 Keamanan

### Password Hash
Semua password di-hash menggunakan bcrypt dengan cost factor 12:
```
Hash: $2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
```

### Generate Password Baru
Untuk generate password hash baru:
```bash
php artisan tinker
>>> Hash::make('password_baru')
```

### Ubah Password User
```bash
php artisan tinker
>>> $user = User::find(1);
>>> $user->password = Hash::make('password_baru');
>>> $user->save();
```

---

## 📝 Testing Accounts

### Quick Test - Semua Role

**Admin:**
```
Email: admin@semantik.com
Password: admin123
```

**Dosen:**
```
Email: ahmad@semantik.com
Password: dosen123
```

**Mahasiswa:**
```
Email: budi@semantik.com
Password: mahasiswa123
```

---

## 🎯 Use Cases

### Untuk Development
- Gunakan semua 17 user untuk testing
- Test role-based access control
- Test multi-user scenarios

### Untuk Demo
- Admin: `admin@semantik.com`
- Dosen: `ahmad@semantik.com`
- Mahasiswa: `budi@semantik.com`

### Untuk Production
- Hapus semua demo users
- Buat user real via admin panel
- Gunakan password yang kuat

---

## ⚠️ Catatan Penting

1. **Jangan gunakan di production** - Password terlalu simple
2. **Ubah password** setelah first login
3. **Hapus demo users** sebelum go-live
4. **Backup database** sebelum import
5. **Verifikasi email** sudah di-set untuk semua user

---

## 🔄 Reset Database

Jika ingin reset dan import ulang:
```bash
# Drop semua table
php artisan migrate:fresh

# Import users baru
mysql -u root -p semantik < database/sql/insert_users.sql

# Atau via seeder
php artisan db:seed
```

---

## 📞 Support

Jika ada masalah dengan user login:
1. Check database connection
2. Verify password hash
3. Clear cache: `php artisan cache:clear`
4. Check `.env` configuration

---

**Last Updated**: 2024-12-13
