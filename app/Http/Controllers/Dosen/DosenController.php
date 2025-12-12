<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\Thesis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DosenController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();
        
        $stats = [
            'my_thesis' => $user->theses()->count(),
            'total_downloads' => $user->theses()->sum('download_count'),
            'recent_thesis' => $user->theses()->latest()->take(5)->get(),
        ];

        return Inertia::render('Dosen/Dashboard', [
            'stats' => $stats,
        ]);
    }
}
