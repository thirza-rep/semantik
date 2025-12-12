<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Thesis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'total_dosen' => User::where('role', 'dosen')->count(),
            'total_mahasiswa' => User::where('role', 'mahasiswa')->count(),
            'total_thesis' => Thesis::count(),
        ];

        $recent_users = User::latest()->take(5)->get();
        $recent_thesis = Thesis::with('user')->latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_users' => $recent_users,
            'recent_thesis' => $recent_thesis,
        ]);
    }
}
