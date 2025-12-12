-- =====================================================
-- SQL Script: Setup Users untuk Semua Role
-- Database: semantik
-- Created: 2024-12-13
-- =====================================================

-- Gunakan database semantik
USE semantik;

-- =====================================================
-- ADMIN USERS
-- =====================================================

-- Admin Utama
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Admin Utama', 'admin@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', NULL, NULL, '081234567890', NOW(), NOW());
-- Password: admin123

-- Admin Backup
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Admin Backup', 'admin.backup@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', NULL, NULL, '081234567891', NOW(), NOW());
-- Password: admin123

-- =====================================================
-- DOSEN USERS
-- =====================================================

-- Dosen 1 - Informatika
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Dr. Ahmad Fauzi, M.Kom', 'ahmad@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'dosen', NULL, '0123456789', '081234567801', NOW(), NOW());
-- Password: dosen123

-- Dosen 2 - Sistem Informasi
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Dr. Siti Nurhaliza, M.T', 'siti@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'dosen', NULL, '0123456790', '081234567802', NOW(), NOW());
-- Password: dosen123

-- Dosen 3 - Data Science
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Dr. Budi Santoso, M.Sc', 'budi.dosen@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'dosen', NULL, '0123456791', '081234567803', NOW(), NOW());
-- Password: dosen123

-- Dosen 4 - Web Development
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Dr. Dewi Lestari, M.Kom', 'dewi.dosen@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'dosen', NULL, '0123456792', '081234567804', NOW(), NOW());
-- Password: dosen123

-- Dosen 5 - Machine Learning
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Dr. Eko Prasetyo, M.T', 'eko@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'dosen', NULL, '0123456793', '081234567805', NOW(), NOW());
-- Password: dosen123

-- =====================================================
-- MAHASISWA USERS
-- =====================================================

-- Mahasiswa 1 - Angkatan 2020
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Budi Setiawan', 'budi@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'mahasiswa', '2020001', NULL, '081234567901', NOW(), NOW());
-- Password: mahasiswa123

-- Mahasiswa 2 - Angkatan 2020
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Dewi Anggraini', 'dewi@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'mahasiswa', '2020002', NULL, '081234567902', NOW(), NOW());
-- Password: mahasiswa123

-- Mahasiswa 3 - Angkatan 2021
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Andi Wijaya', 'andi@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'mahasiswa', '2021001', NULL, '081234567903', NOW(), NOW());
-- Password: mahasiswa123

-- Mahasiswa 4 - Angkatan 2021
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Sari Wulandari', 'sari@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'mahasiswa', '2021002', NULL, '081234567904', NOW(), NOW());
-- Password: mahasiswa123

-- Mahasiswa 5 - Angkatan 2022
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Rudi Hermawan', 'rudi@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'mahasiswa', '2022001', NULL, '081234567905', NOW(), NOW());
-- Password: mahasiswa123

-- Mahasiswa 6 - Angkatan 2022
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Fitri Rahmawati', 'fitri@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'mahasiswa', '2022002', NULL, '081234567906', NOW(), NOW());
-- Password: mahasiswa123

-- Mahasiswa 7 - Angkatan 2023
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Agus Prasetyo', 'agus@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'mahasiswa', '2023001', NULL, '081234567907', NOW(), NOW());
-- Password: mahasiswa123

-- Mahasiswa 8 - Angkatan 2023
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Rina Susanti', 'rina@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'mahasiswa', '2023002', NULL, '081234567908', NOW(), NOW());
-- Password: mahasiswa123

-- Mahasiswa 9 - Angkatan 2024
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Doni Saputra', 'doni@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'mahasiswa', '2024001', NULL, '081234567909', NOW(), NOW());
-- Password: mahasiswa123

-- Mahasiswa 10 - Angkatan 2024
INSERT INTO users (name, email, email_verified_at, password, role, nim, nidn, phone, created_at, updated_at) VALUES
('Maya Sari', 'maya@semantik.com', NOW(), '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'mahasiswa', '2024002', NULL, '081234567910', NOW(), NOW());
-- Password: mahasiswa123

-- =====================================================
-- SUMMARY
-- =====================================================
-- Total Users: 17
-- - Admin: 2 users
-- - Dosen: 5 users
-- - Mahasiswa: 10 users
--
-- Default Password untuk semua user: password
-- Hash: $2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
--
-- Untuk generate password hash baru, gunakan:
-- php artisan tinker
-- >>> Hash::make('password_baru')
-- =====================================================

-- Verify data
SELECT 
    role,
    COUNT(*) as total
FROM users
GROUP BY role
ORDER BY role;

-- Show all users
SELECT 
    id,
    name,
    email,
    role,
    COALESCE(nim, nidn, '-') as nim_nidn,
    phone
FROM users
ORDER BY role, id;
