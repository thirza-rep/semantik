<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Thesis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    public function dashboard()
    {
        $recent_thesis = Thesis::with('user')
            ->latest()
            ->take(6)
            ->get();

        $popular_thesis = Thesis::with('user')
            ->orderBy('download_count', 'desc')
            ->take(6)
            ->get();

        $categories = Thesis::select('category')
            ->distinct()
            ->pluck('category');

        $stats = [
            'total_thesis' => Thesis::count(),
            'categories_count' => $categories->count(),
        ];

        return Inertia::render('Mahasiswa/Dashboard', [
            'recent_thesis' => $recent_thesis,
            'popular_thesis' => $popular_thesis,
            'categories' => $categories,
            'stats' => $stats,
        ]);
    }

    public function show(Thesis $thesis)
    {
        $thesis->load('user');

        // Get related thesis (same category)
        $related = Thesis::where('category', $thesis->category)
            ->where('id', '!=', $thesis->id)
            ->take(3)
            ->get();

        return Inertia::render('Mahasiswa/Thesis/Show', [
            'thesis' => $thesis,
            'related' => $related,
        ]);
    }

    public function download(Thesis $thesis)
    {
        if (!$thesis->file_path || !\Storage::disk('public')->exists($thesis->file_path)) {
            abort(404, 'File tidak ditemukan');
        }

        // Increment download count
        $thesis->incrementDownloads();

        return \Storage::disk('public')->download($thesis->file_path);
    }
}
