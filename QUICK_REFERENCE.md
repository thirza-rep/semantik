# 🚀 Quick Reference - Login Credentials

## 📌 Demo Accounts (Quick Access)

### 👨‍💼 Admin
```
Email    : admin@semantik.com
Password : admin123
```

### 👨‍🏫 Dosen
```
Email    : ahmad@semantik.com
Password : dosen123
```

### 🎓 Mahasiswa
```
Email    : budi@semantik.com
Password : mahasiswa123
```

---

## 📋 All Users Summary

| # | Role | Email | Password | NIM/NIDN |
|---|------|-------|----------|----------|
| 1 | Admin | admin@semantik.com | admin123 | - |
| 2 | Admin | admin.backup@semantik.com | admin123 | - |
| 3 | Dosen | ahmad@semantik.com | dosen123 | 0123456789 |
| 4 | Dosen | siti@semantik.com | dosen123 | 0123456790 |
| 5 | Dosen | budi.dosen@semantik.com | dosen123 | 0123456791 |
| 6 | Dosen | dewi.dosen@semantik.com | dosen123 | 0123456792 |
| 7 | Dosen | eko@semantik.com | dosen123 | 0123456793 |
| 8 | Mahasiswa | budi@semantik.com | mahasiswa123 | 2020001 |
| 9 | Mahasiswa | dewi@semantik.com | mahasiswa123 | 2020002 |
| 10 | Mahasiswa | andi@semantik.com | mahasiswa123 | 2021001 |
| 11 | Mahasiswa | sari@semantik.com | mahasiswa123 | 2021002 |
| 12 | Mahasiswa | rudi@semantik.com | mahasiswa123 | 2022001 |
| 13 | Mahasiswa | fitri@semantik.com | mahasiswa123 | 2022002 |
| 14 | Mahasiswa | agus@semantik.com | mahasiswa123 | 2023001 |
| 15 | Mahasiswa | rina@semantik.com | mahasiswa123 | 2023002 |
| 16 | Mahasiswa | doni@semantik.com | mahasiswa123 | 2024001 |
| 17 | Mahasiswa | maya@semantik.com | mahasiswa123 | 2024002 |

---

## 🔧 Quick Commands

### Import Users
```bash
mysql -u root -p semantik < database/sql/insert_users.sql
```

### Run Seeder
```bash
php artisan db:seed --class=AdminSeeder
```

### Reset Database
```bash
php artisan migrate:fresh --seed
```

---

## 📊 Statistics

- **Total Users**: 17
- **Admin**: 2
- **Dosen**: 5
- **Mahasiswa**: 10

---

**URL**: http://localhost:8000/login
