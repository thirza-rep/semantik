<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Thesis;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_dosen' => User::where('role', 'dosen')->count(),
            'total_mahasiswa' => User::where('role', 'mahasiswa')->count(),
            'total_thesis' => Thesis::count(),
        ];

        $recent_users = User::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'role', 'created_at']);

        $recent_thesis = Thesis::latest()
            ->take(5)
            ->get(['id', 'title', 'author_name', 'year', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_users' => $recent_users,
            'recent_thesis' => $recent_thesis,
        ]);
    }
}
