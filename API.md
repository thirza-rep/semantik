# 🔌 API Documentation

## Overview

Dokumentasi API untuk Sistem Repository Skripsi. Semua endpoint menggunakan Inertia.js untuk rendering React components.

---

## Authentication

Semua route yang dilindungi memerlukan authentication melalui Laravel Sanctum session.

### Login
```http
POST /login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "redirect": "/dashboard"
}
```

### Logout
```http
POST /logout
```

---

## Admin Endpoints

Base URL: `/admin`

Middleware: `auth`, `role:admin`

### Dashboard

#### Get Admin Dashboard
```http
GET /admin/dashboard
```

**Response (Inertia):**
```javascript
{
  component: 'Admin/Dashboard',
  props: {
    stats: {
      total_users: 25,
      total_dosen: 10,
      total_mahasiswa: 14,
      total_thesis: 50
    },
    recent_users: [...],
    recent_thesis: [...]
  }
}
```

---

### User Management

#### List Users
```http
GET /admin/users?search={query}&role={role}&page={page}
```

**Query Parameters:**
- `search` (optional): Search by name or email
- `role` (optional): Filter by role (admin/dosen/mahasiswa)
- `page` (optional): Page number for pagination

**Response (Inertia):**
```javascript
{
  component: 'Admin/Users/Index',
  props: {
    users: {
      data: [...],
      links: [...],
      total: 25
    },
    filters: {
      search: "query",
      role: "dosen"
    }
  }
}
```

#### Create User Form
```http
GET /admin/users/create
```

**Response (Inertia):**
```javascript
{
  component: 'Admin/Users/Create'
}
```

#### Store User
```http
POST /admin/users
Content-Type: multipart/form-data

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "dosen",
  "nidn": "1234567890",
  "phone": "08123456789"
}
```

**Validation Rules:**
- `name`: required, string, max:255
- `email`: required, email, unique:users
- `password`: required, min:8
- `role`: required, in:dosen,mahasiswa
- `nim`: required_if:role,mahasiswa
- `nidn`: required_if:role,dosen
- `phone`: nullable, string, max:20

**Response:**
```json
{
  "redirect": "/admin/users",
  "flash": {
    "success": "User berhasil ditambahkan"
  }
}
```

#### Edit User Form
```http
GET /admin/users/{id}/edit
```

**Response (Inertia):**
```javascript
{
  component: 'Admin/Users/Edit',
  props: {
    user: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "dosen",
      nidn: "1234567890",
      phone: "08123456789"
    }
  }
}
```

#### Update User
```http
PUT /admin/users/{id}
Content-Type: multipart/form-data

{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "password": "",  // Optional
  "nidn": "1234567890",
  "phone": "08123456789"
}
```

**Response:**
```json
{
  "redirect": "/admin/users",
  "flash": {
    "success": "User berhasil diupdate"
  }
}
```

#### Delete User
```http
DELETE /admin/users/{id}
```

**Response:**
```json
{
  "redirect": "/admin/users",
  "flash": {
    "success": "User berhasil dihapus"
  }
}
```

---

## Dosen Endpoints

Base URL: `/dosen`

Middleware: `auth`, `role:dosen`

### Dashboard

#### Get Dosen Dashboard
```http
GET /dosen/dashboard
```

**Response (Inertia):**
```javascript
{
  component: 'Dosen/Dashboard',
  props: {
    stats: {
      my_thesis: 5,
      total_downloads: 120,
      recent_thesis: [...]
    }
  }
}
```

---

### Thesis Management

#### List Thesis
```http
GET /dosen/thesis?search={query}&page={page}
```

**Query Parameters:**
- `search` (optional): Search by title or author
- `page` (optional): Page number

**Response (Inertia):**
```javascript
{
  component: 'Dosen/Thesis/Index',
  props: {
    theses: {
      data: [...],
      links: [...],
      total: 10
    },
    filters: {
      search: "query"
    }
  }
}
```

#### Create Thesis Form
```http
GET /dosen/thesis/create
```

**Response (Inertia):**
```javascript
{
  component: 'Dosen/Thesis/Create',
  props: {
    categories: [
      "Web Semantik",
      "Machine Learning",
      "Data Mining",
      ...
    ]
  }
}
```

#### Store Thesis
```http
POST /dosen/thesis
Content-Type: multipart/form-data

{
  "title": "Judul Skripsi",
  "author_name": "Nama Penulis",
  "year": 2024,
  "category": "Web Semantik",
  "keywords": "semantic web, ontology, RDF",
  "description": "Deskripsi lengkap skripsi...",
  "file": <PDF File>
}
```

**Validation Rules:**
- `title`: required, string, max:500
- `author_name`: required, string, max:255
- `year`: required, integer, min:1900, max:current_year
- `category`: required, string, max:100
- `keywords`: nullable, string
- `description`: required, string
- `file`: required, file, mimes:pdf, max:10240 (10MB)

**Response:**
```json
{
  "redirect": "/dosen/thesis",
  "flash": {
    "success": "Skripsi berhasil diupload"
  }
}
```

#### View Thesis
```http
GET /dosen/thesis/{id}
```

**Response (Inertia):**
```javascript
{
  component: 'Dosen/Thesis/Show',
  props: {
    thesis: {
      id: 1,
      title: "Judul Skripsi",
      author_name: "Nama Penulis",
      year: 2024,
      category: "Web Semantik",
      keywords: "semantic web, ontology",
      description: "Deskripsi...",
      file_path: "theses/filename.pdf",
      file_url: "http://localhost/storage/theses/filename.pdf",
      file_size: 1024000,
      formatted_file_size: "1.00 MB",
      download_count: 10,
      user: {
        name: "Dosen Name"
      },
      created_at: "2024-01-01T00:00:00.000000Z"
    }
  }
}
```

#### Edit Thesis Form
```http
GET /dosen/thesis/{id}/edit
```

**Response (Inertia):**
```javascript
{
  component: 'Dosen/Thesis/Edit',
  props: {
    thesis: {...},
    categories: [...]
  }
}
```

#### Update Thesis
```http
PUT /dosen/thesis/{id}
Content-Type: multipart/form-data

{
  "title": "Updated Title",
  "author_name": "Updated Author",
  "year": 2024,
  "category": "Web Semantik",
  "keywords": "updated keywords",
  "description": "Updated description",
  "file": <PDF File>  // Optional
}
```

**Response:**
```json
{
  "redirect": "/dosen/thesis/{id}",
  "flash": {
    "success": "Skripsi berhasil diupdate"
  }
}
```

#### Delete Thesis
```http
DELETE /dosen/thesis/{id}
```

**Response:**
```json
{
  "redirect": "/dosen/thesis",
  "flash": {
    "success": "Skripsi berhasil dihapus"
  }
}
```

#### Download Thesis
```http
GET /dosen/thesis/{id}/download
```

**Response:**
Binary PDF file with headers:
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="filename.pdf"
```

---

## Mahasiswa Endpoints

Base URL: `/mahasiswa`

Middleware: `auth`, `role:mahasiswa`

### Dashboard

#### Get Mahasiswa Dashboard
```http
GET /mahasiswa/dashboard
```

**Response (Inertia):**
```javascript
{
  component: 'Mahasiswa/Dashboard',
  props: {
    recent_thesis: [...],
    popular_thesis: [...],
    categories: [...],
    stats: {
      total_thesis: 50,
      categories_count: 5
    }
  }
}
```

---

### Search

#### Search Thesis
```http
GET /mahasiswa/search?search={query}&category={cat}&year={year}&year_from={from}&year_to={to}&sort={sort}&page={page}
```

**Query Parameters:**
- `search` (optional): Search by title, author, description, keywords
- `category` (optional): Filter by category
- `year` (optional): Filter by specific year
- `year_from` (optional): Filter from year
- `year_to` (optional): Filter to year
- `sort` (optional): Sort order
  - `latest` (default)
  - `oldest`
  - `title_asc`
  - `title_desc`
  - `most_downloaded`
- `page` (optional): Page number

**Response (Inertia):**
```javascript
{
  component: 'Mahasiswa/Search',
  props: {
    theses: {
      data: [...],
      links: [...],
      total: 25
    },
    categories: [...],
    years: [2024, 2023, 2022, ...],
    filters: {
      search: "query",
      category: "Web Semantik",
      year: null,
      year_from: 2020,
      year_to: 2024,
      sort: "latest"
    }
  }
}
```

#### View Thesis Detail
```http
GET /mahasiswa/thesis/{id}
```

**Response (Inertia):**
```javascript
{
  component: 'Mahasiswa/Thesis/Show',
  props: {
    thesis: {...},
    related: [
      // 3 related thesis from same category
    ]
  }
}
```

#### Download Thesis
```http
GET /mahasiswa/thesis/{id}/download
```

**Response:**
Binary PDF file with download count incremented.

---

## Models

### User Model

**Attributes:**
```php
protected $fillable = [
    'name',
    'email',
    'password',
    'role',
    'nim',
    'nidn',
    'phone',
];

protected $casts = [
    'role' => 'string',
];
```

**Methods:**
```php
// Check if user is admin
public function isAdmin(): bool

// Check if user is dosen
public function isDosen(): bool

// Check if user is mahasiswa
public function isMahasiswa(): bool

// Get user's theses
public function theses(): HasMany
```

---

### Thesis Model

**Attributes:**
```php
protected $fillable = [
    'user_id',
    'title',
    'year',
    'description',
    'category',
    'keywords',
    'author_name',
    'file_path',
    'file_size',
    'download_count',
];

protected $appends = [
    'file_url',
    'formatted_file_size'
];
```

**Accessors:**
```php
// Get public URL for PDF file
public function getFileUrlAttribute(): string

// Get formatted file size
public function getFormattedFileSizeAttribute(): string
```

**Scopes:**
```php
// Search by title, author, description, keywords
public function scopeSearch($query, $search)

// Filter by category
public function scopeCategory($query, $category)

// Filter by year
public function scopeYear($query, $year)

// Filter by year range
public function scopeYearRange($query, $from, $to)
```

**Methods:**
```php
// Get thesis owner
public function user(): BelongsTo

// Increment download count
public function incrementDownloads(): void
```

---

## Middleware

### CheckRole

Middleware untuk memvalidasi role user.

**Usage:**
```php
Route::middleware(['auth', 'role:admin'])->group(function () {
    // Admin routes
});

Route::middleware(['auth', 'role:dosen'])->group(function () {
    // Dosen routes
});

Route::middleware(['auth', 'role:mahasiswa'])->group(function () {
    // Mahasiswa routes
});
```

**Logic:**
```php
public function handle($request, Closure $next, ...$roles)
{
    if (!in_array($request->user()->role, $roles)) {
        // Redirect to appropriate dashboard
        return redirect()->route($request->user()->role . '.dashboard');
    }
    
    return $next($request);
}
```

---

## Error Responses

### Validation Error
```json
{
  "errors": {
    "field_name": [
      "Error message"
    ]
  }
}
```

### Unauthorized (401)
```json
{
  "message": "Unauthenticated."
}
```

### Forbidden (403)
```json
{
  "message": "This action is unauthorized."
}
```

### Not Found (404)
```json
{
  "message": "Resource not found."
}
```

---

## File Upload

### Endpoint
```http
POST /dosen/thesis
Content-Type: multipart/form-data
```

### Configuration
- **Max Size**: 10MB (10240 KB)
- **Allowed Types**: PDF only
- **Storage**: `storage/app/public/theses/`
- **Public URL**: `/storage/theses/{filename}`

### Validation
```php
'file' => 'required|file|mimes:pdf|max:10240'
```

### Storage Logic
```php
$path = $request->file('file')->store('theses', 'public');
$size = $request->file('file')->getSize();
```

---

## Pagination

All list endpoints use Laravel pagination with Inertia.js.

**Response Format:**
```javascript
{
  data: [...],
  links: [
    { url: null, label: "&laquo; Previous", active: false },
    { url: "?page=1", label: "1", active: true },
    { url: "?page=2", label: "2", active: false },
    { url: "?page=2", label: "Next &raquo;", active: false }
  ],
  total: 50,
  per_page: 15,
  current_page: 1,
  last_page: 4
}
```

---

## Rate Limiting

Default Laravel rate limiting applies:
- **Web Routes**: 60 requests per minute
- **API Routes**: Not implemented (using web routes with Inertia)

---

## CORS

Not applicable - using Inertia.js (same-origin requests).

---

## Testing

### Example Test
```php
public function test_admin_can_create_user()
{
    $admin = User::factory()->create(['role' => 'admin']);
    
    $response = $this->actingAs($admin)->post('/admin/users', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        'role' => 'dosen',
        'nidn' => '1234567890',
    ]);
    
    $response->assertRedirect('/admin/users');
    $this->assertDatabaseHas('users', [
        'email' => 'test@example.com',
        'role' => 'dosen',
    ]);
}
```

---

## Changelog

### Version 1.0.0 (2024-12-13)
- Initial release
- Complete RBAC implementation
- Admin, Dosen, Mahasiswa roles
- Thesis upload & management
- Advanced search & filter
- PDF preview & download
- User management

---

**Last Updated**: 2024-12-13
