# 📚 Sistem Repository Skripsi

> Sistem manajemen repository skripsi berbasis web semantik dengan Role-Based Access Control (RBAC)

![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=flat&logo=laravel)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat&logo=tailwind-css)
![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=flat&logo=php)

## ✨ Features

- 🔐 **Role-Based Access Control** - Admin, Dosen, Mahasiswa
- 📤 **Upload Skripsi** - Drag & drop PDF upload (max 10MB)
- 🔍 **Advanced Search** - Multi-criteria search dengan filter & sorting
- 📄 **PDF Preview** - Inline PDF viewer di browser
- 📊 **Statistics Dashboard** - Real-time statistics untuk setiap role
- 👥 **User Management** - CRUD operations untuk admin
- 🎨 **Modern UI** - Pink gradient theme dengan glassmorphism
- 📱 **Responsive Design** - Mobile-first approach

## 🚀 Quick Start

### Prerequisites

- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL >= 8.0

### Installation

```bash
# Clone repository
git clone <repository-url>
cd semantik

# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Configure database in .env
DB_DATABASE=semantik
DB_USERNAME=root
DB_PASSWORD=

# Run migrations & seeders
php artisan migrate
php artisan db:seed --class=AdminSeeder
php artisan db:seed --class=ThesisSeeder

# Create storage link
php artisan storage:link

# Start servers
php artisan serve
npm run dev
```

Visit `http://localhost:8000`

## 👤 Demo Accounts

### Quick Test (3 Main Accounts)

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@semantik.com | pw: password |
| **Dosen** | dosen@semantik.com | pw: password |
| **Mahasiswa** | mahasiswa@semantik.com | pw: password |

### All Available Accounts (17 Users Total)

**📖 Full Details**: See [USERS.md](USERS.md) for complete list with NIM/NIDN
**⚡ Quick Reference**: See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for quick access

### Import Users to Database

```bash
# Method 1: Via SQL file
mysql -u root -p semantik < database/sql/insert_users.sql

# Method 2: Via Laravel Seeder
php artisan db:seed --class=AdminSeeder
```

## 📖 Documentation

**Main Documentation:**
- [README.md](README.md) - This file (Quick start)
- [DOCUMENTATION.md](DOCUMENTATION.md) - Complete user manual
- [API.md](API.md) - API documentation for developers
- [USERS.md](USERS.md) - All user accounts & credentials
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick access credentials
- [CHANGELOG.md](CHANGELOG.md) - Version history

## 🎯 User Roles

### 👨‍💼 Admin
- Kelola users (CRUD)
- View statistik sistem
- Assign roles

### 👨‍🏫 Dosen
- Upload & kelola skripsi
- Edit metadata
- View download statistics
- PDF preview

### 🎓 Mahasiswa
- Search skripsi (multi-criteria)
- Filter by category & year
- Preview & download PDF
- View related thesis

## 🛠️ Tech Stack

- **Backend**: Laravel 11
- **Frontend**: React 18 + Inertia.js
- **Styling**: Tailwind CSS + Custom CSS
- **Database**: MySQL
- **Build**: Vite

## 📁 Project Structure

```
semantik/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   ├── Dosen/
│   │   │   └── Mahasiswa/
│   │   └── Middleware/
│   └── Models/
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── css/
│   └── js/
│       ├── Components/
│       ├── Layouts/
│       └── Pages/
│           ├── Admin/
│           ├── Dosen/
│           └── Mahasiswa/
└── routes/
    └── web.php
```

## 🎨 Screenshots

### Welcome Page
Landing page dengan pilihan role untuk login

### Admin Dashboard
Statistik sistem dan user management

### Dosen - Upload Skripsi
Drag & drop file upload dengan form lengkap

### Mahasiswa - Search
Advanced search dengan multi-criteria filter

### PDF Preview
Inline PDF viewer dengan download option

## 🔧 Development

```bash
# Run development servers
php artisan serve
npm run dev

# Build for production
npm run build

# Run tests
php artisan test

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

## 📝 Environment Variables

```env
APP_NAME="Sistem Repository Skripsi"
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=semantik
DB_USERNAME=root
DB_PASSWORD=

FILESYSTEM_DISK=public
```

## 🐛 Troubleshooting

### Storage link tidak berfungsi
```bash
php artisan storage:link
```

### File upload gagal
Edit `php.ini`:
```ini
upload_max_filesize = 10M
post_max_size = 10M
```

### Assets tidak load
```bash
npm run dev
# atau
npm run build
```

## 📊 Database Schema

### Users
- id, name, email, password
- role (admin/dosen/mahasiswa)
- nim, nidn, phone
- timestamps

### Theses
- id, user_id, title, year
- description, category, keywords
- author_name, file_path, file_size
- download_count, timestamps

## 🚀 Deployment

### Production Build
```bash
# Build assets
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
chmod -R 775 storage bootstrap/cache
```

### Server Requirements
- PHP 8.2+
- MySQL 8.0+
- Nginx/Apache
- Composer
- Node.js (untuk build)

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributors

- Web Semantik Team

## 🙏 Acknowledgments

- Laravel Framework
- React & Inertia.js
- Tailwind CSS
- All open source contributors

---

**Made with ❤️ by Web Semantik Team**

© 2024 All Rights Reserved
