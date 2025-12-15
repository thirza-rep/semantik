# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-12-15

### 🔴 BREAKING CHANGES
- **Dosen Role**: Changed from full CRUD to **READ-ONLY** access
- Dosen now has same permissions as Mahasiswa (browse & search only)
- Only Admin can manage (create/edit/delete) thesis

### ✨ Added
- **Quick Login** on Welcome page (one-click demo login)
- **Always-Visible Credentials** on role cards
- **Dual Button System**: Quick Login + Manual Login
- **Role-Based Navigation Menu** in AuthenticatedLayout
- **Admin Thesis Management**: Full CRUD for all theses

### 🔄 Changed
- **Dosen\\ThesisController**: Converted to read-only (2 methods: index, show)
- **Routes**: Dosen routes limited to index/show only
- **UI**: Removed Create/Edit/Delete buttons from Dosen pages

### 🗑️ Removed
- Dosen upload/edit/delete thesis capability
- Routes: `/dosen/thesis/create`, `/dosen/thesis/store`, etc.

### 📝 Updated
- Documentation to reflect new Dosen permissions
- Welcome page with improved UX
- Navigation menu based on roles

---

## [1.0.0] - 2024-12-13

### 🎉 Initial Release

Complete implementation of Role-Based Access Control (RBAC) system for thesis repository.

### ✨ Added

#### Backend
- **Authentication System**
  - Laravel Breeze integration
  - Session-based authentication
  - Password hashing with bcrypt
  
- **Database Schema**
  - Users table with role field (admin/dosen/mahasiswa)
  - Theses table with complete metadata
  - Foreign key relationships
  - Migrations for role fields
  
- **Models**
  - User model with role helper methods (isAdmin, isDosen, isMahasiswa)
  - Thesis model with search scopes and accessors
  - File URL accessor for public PDF access
  - Formatted file size accessor
  
- **Controllers**
  - AdminController - Dashboard with statistics
  - UserController - Complete user CRUD
  - DosenController - Dosen dashboard
  - ThesisController (Dosen) - Thesis management with file upload
  - MahasiswaController - Mahasiswa dashboard
  - SearchController - Advanced search with filters
  
- **Middleware**
  - CheckRole middleware for role-based access control
  - Registered as 'role' alias
  
- **Seeders**
  - AdminSeeder - Creates admin and sample users
  - ThesisSeeder - Creates 10 sample thesis records
  
- **File Storage**
  - Public disk configuration
  - Storage link for public access
  - PDF file upload with validation (max 10MB)
  - Lifetime public URL access
  
- **Routes**
  - Role-based route groups (admin, dosen, mahasiswa)
  - Dashboard redirect based on user role
  - Protected routes with auth middleware

#### Frontend
- **Design System**
  - Pink gradient theme
  - Custom CSS with glassmorphism effects
  - Smooth animations (fade-in, slide-up)
  - Responsive design (mobile-first)
  
- **Welcome Page**
  - Landing page with role selection
  - Demo account information
  - Features showcase
  
- **Admin Pages**
  - Dashboard with system statistics
  - Users Index - Table view with search & filter
  - Users Create - Form with role-based fields
  - Users Edit - Update user information
  
- **Dosen Pages**
  - Dashboard with personal statistics
  - Thesis Index - Grid view with search
  - Thesis Create - Upload form with drag & drop
  - Thesis Edit - Update form with optional file replacement
  - Thesis Show - Detail view with PDF preview
  
- **Mahasiswa Pages**
  - Dashboard with recent & popular thesis
  - Search - Advanced search with multi-criteria filters
  - Thesis Show - Detail view with PDF preview & download
  
- **Components**
  - AuthenticatedLayout with pink theme
  - NavLink & ResponsiveNavLink with pink colors
  - Custom styled inputs and buttons
  
- **Features**
  - Real-time search with debounce (500ms)
  - Multi-criteria filtering (category, year, year range)
  - Multiple sort options (latest, title, downloads)
  - Pagination with Inertia.js
  - PDF preview using iframe
  - Download tracking
  - Related thesis suggestions
  - Empty states
  - Loading states
  - Error handling

### 🎨 Design
- Pink gradient color scheme (#ec4899 to #db2777)
- Glassmorphism cards with backdrop blur
- Hover effects and transitions
- Icon containers with gradients
- Badge components for roles and categories
- Responsive grid layouts
- Custom search bar styling
- Animated gradient backgrounds

### 🔒 Security
- CSRF protection (Laravel default)
- Password hashing with bcrypt
- Role-based authorization
- Middleware protection on all routes
- File upload validation (PDF only, max 10MB)
- SQL injection protection (Eloquent ORM)
- XSS protection (React escaping)

### 📊 Statistics & Analytics
- Admin dashboard: Total users, dosen, mahasiswa, thesis
- Dosen dashboard: Personal thesis count, total downloads
- Mahasiswa dashboard: Total thesis, categories count
- Download counter for each thesis
- Recent users and thesis lists

### 📝 Documentation
- README.md - Quick start guide
- DOCUMENTATION.md - Complete user manual
- API.md - API documentation for developers
- CHANGELOG.md - Version history
- Inline code comments
- PHPDoc blocks for methods

### 🧪 Testing
- Demo accounts seeded
- Sample thesis data (10 records)
- All roles tested
- File upload tested
- Search & filter tested
- CRUD operations tested

### 🚀 Performance
- Eager loading for relationships
- Database indexing on foreign keys
- Optimized queries with scopes
- Debounced search to reduce requests
- Pagination for large datasets
- Vite for fast asset compilation

### 📦 Dependencies
- Laravel 11
- React 18
- Inertia.js
- Tailwind CSS 3
- Vite
- Laravel Breeze

---

## [Unreleased]

### Planned Features
- Email notifications for new thesis uploads
- Advanced analytics dashboard
- Export thesis list to Excel/CSV
- Bulk upload thesis
- Thesis approval workflow
- Comments/reviews system
- Bookmark/favorite thesis
- Advanced semantic search with RDF/SPARQL
- User profile pages
- Thesis categories management
- File versioning
- Activity logs
- API for mobile app

### Potential Improvements
- Add unit tests
- Add feature tests
- Implement caching for statistics
- Add full-text search
- Implement Elasticsearch
- Add PDF text extraction
- Implement recommendation system
- Add thesis citation export
- Multi-language support
- Dark mode toggle
- Advanced filtering UI
- Thesis comparison feature

---

## Version History

### [1.0.0] - 2024-12-13
- Initial release with complete RBAC system
- All core features implemented
- Full documentation provided
- Ready for production deployment

---

## Migration Guide

### From 0.x to 1.0.0

This is the initial release, no migration needed.

---

## Breaking Changes

None - Initial release.

---

## Security Fixes

None - Initial release.

---

## Deprecations

None - Initial release.

---

## Contributors

- Web Semantik Team

---

## Support

For issues and feature requests, please use the GitHub issue tracker.

---

**Legend:**
- ✨ Added - New features
- 🔧 Changed - Changes in existing functionality
- 🐛 Fixed - Bug fixes
- 🗑️ Deprecated - Soon-to-be removed features
- 🚫 Removed - Removed features
- 🔒 Security - Security fixes
- 📝 Documentation - Documentation changes
- 🎨 Design - UI/UX improvements
- 🚀 Performance - Performance improvements
