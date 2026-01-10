<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin;
use App\Http\Controllers\Mahasiswa;
use App\Http\Controllers\Dosen;

// Landing and Public Routes
Route::get('/', function () {
    return inertia('Welcome');
})->name('welcome');

// ✅ ini WAJIB biar route login/logout/register ada
require __DIR__.'/auth.php';
require __DIR__.'/profile.php';

// Shared/Public Thesis Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/thesis/{id}/download', [Mahasiswa\ThesisController::class, 'download'])->name('thesis.download');
    Route::get('/thesis/{id}/preview', [Mahasiswa\ThesisController::class, 'preview'])->name('thesis.preview');
    Route::get('/thesis/{id}/letter/download', [Mahasiswa\ThesisController::class, 'downloadLetter'])->name('thesis.letter.download');
});

// Mahasiswa Routes
Route::middleware(['auth', 'role:mahasiswa'])
    ->prefix('mahasiswa')
    ->name('mahasiswa.')
    ->group(function () {
        Route::get('/dashboard', [Mahasiswa\ThesisController::class, 'dashboard'])->name('dashboard');
        Route::get('/search', [Mahasiswa\ThesisController::class, 'search'])->name('search');
        Route::get('/thesis/create', [Mahasiswa\ThesisController::class, 'create'])->name('thesis.create');
        Route::post('/thesis', [Mahasiswa\ThesisController::class, 'store'])->name('thesis.store');
        Route::get('/thesis/{id}', [Mahasiswa\ThesisController::class, 'show'])->name('thesis.show');
        Route::post('/thesis/{id}/clearance', [Mahasiswa\ThesisController::class, 'storeClearance'])->name('thesis.clearance.store');
    });

// Admin Routes
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [Admin\DashboardController::class, 'index'])->name('dashboard');
        
        // Users Management
        Route::get('/users', [Admin\UserController::class, 'index'])->name('users.index');
        Route::get('/users/create', [Admin\UserController::class, 'create'])->name('users.create');
        Route::post('/users', [Admin\UserController::class, 'store'])->name('users.store');
        Route::get('/users/{user}', [Admin\UserController::class, 'show'])->name('users.show');
        Route::get('/users/{user}/edit', [Admin\UserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user}', [Admin\UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [Admin\UserController::class, 'destroy'])->name('users.destroy');

        // Thesis Management
        Route::get('/thesis', [Admin\ThesisController::class, 'index'])->name('thesis.index');
        Route::get('/thesis/create', [Admin\ThesisController::class, 'create'])->name('thesis.create');
        Route::post('/thesis', [Admin\ThesisController::class, 'store'])->name('thesis.store');
        Route::get('/thesis/{id}', [Admin\ThesisController::class, 'show'])->name('thesis.show');
        Route::get('/thesis/{id}/edit', [Admin\ThesisController::class, 'edit'])->name('thesis.edit');
        Route::put('/thesis/{id}', [Admin\ThesisController::class, 'update'])->name('thesis.update');
        Route::delete('/thesis/{id}', [Admin\ThesisController::class, 'destroy'])->name('thesis.destroy');
        Route::post('/thesis/{id}/clearance/approve', [Admin\ThesisController::class, 'approveClearance'])->name('thesis.clearance.approve');
        Route::post('/thesis/{id}/clearance/reject', [Admin\ThesisController::class, 'rejectClearance'])->name('thesis.clearance.reject');
        Route::post('/thesis/{id}/letter/generate', [Admin\ThesisController::class, 'generateLetter'])->name('thesis.letter.generate');
    });

// Dosen Routes
Route::middleware(['auth', 'role:dosen'])
    ->prefix('dosen')
    ->name('dosen.')
    ->group(function () {
        Route::get('/dashboard', [Dosen\DashboardController::class, 'index'])->name('dashboard');
        Route::get('/thesis', [Dosen\ThesisController::class, 'index'])->name('thesis.index');
        Route::get('/thesis/{id}', [Dosen\ThesisController::class, 'show'])->name('thesis.show');
        Route::get('/thesis/{thesis}/edit', [Dosen\ThesisController::class, 'edit'])->name('thesis.edit');
        Route::put('/thesis/{thesis}', [Dosen\ThesisController::class, 'update'])->name('thesis.update');
        Route::delete('/thesis/{thesis}', [Dosen\ThesisController::class, 'destroy'])->name('thesis.destroy');
    });