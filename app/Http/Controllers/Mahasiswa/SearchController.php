<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Thesis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = Thesis::with('user');

        // Search by title, author, description, keywords
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->category($request->category);
        }

        // Filter by year
        if ($request->has('year') && $request->year) {
            $query->year($request->year);
        }

        // Filter by year range
        if ($request->has('year_from') || $request->has('year_to')) {
            $query->yearRange($request->year_from, $request->year_to);
        }

        // Sorting
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'title_asc':
                $query->orderBy('title', 'asc');
                break;
            case 'title_desc':
                $query->orderBy('title', 'desc');
                break;
            case 'most_downloaded':
                $query->orderBy('download_count', 'desc');
                break;
            default: // latest
                $query->orderBy('created_at', 'desc');
        }

        $theses = $query->paginate(12)->withQueryString();

        // Get all categories for filter
        $categories = Thesis::select('category')
            ->distinct()
            ->whereNotNull('category')
            ->pluck('category')
            ->toArray();

        // Get available years
        $years = Thesis::select('year')
            ->distinct()
            ->whereNotNull('year')
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->toArray();

        return Inertia::render('Mahasiswa/Search', [
            'theses' => $theses,
            'categories' => $categories ?: [],
            'years' => $years ?: [],
            'filters' => [
                'search' => $request->get('search', ''),
                'category' => $request->get('category', ''),
                'year' => $request->get('year', ''),
                'year_from' => $request->get('year_from', ''),
                'year_to' => $request->get('year_to', ''),
                'sort' => $request->get('sort', 'latest'),
            ],
        ]);
    }
}
