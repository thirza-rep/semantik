<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\Thesis;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'my_thesis' => Thesis::where('user_id', auth()->id())->count(),
            'recent_thesis' => Thesis::with('user')
                ->latest()
                ->take(5)
                ->get(),
        ];

        return Inertia::render('Dosen/Dashboard', [
            'stats' => $stats,
        ]);
    }
}
