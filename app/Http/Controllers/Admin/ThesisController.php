<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Thesis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ThesisController extends Controller
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

        return Inertia::render('Admin/Thesis/Index', [
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

    public function create()
    {
        $categories = [
            'Web Semantik',
            'Information Retrieval',
            'Knowledge Management',
            'Semantic Web',
            'Linked Data',
            'Machine Learning',
            'Deep Learning',
            'Natural Language Processing',
            'E-Learning',
            'Blockchain',
        ];

        return Inertia::render('Admin/Thesis/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 1),
            'description' => 'required|string',
            'category' => 'required|string|max:100',
            'keywords' => 'nullable|string',
            'author_name' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf|max:10240', // 10MB max
        ]);

        // Handle file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('theses', $filename);
            
            $validated['file_path'] = $path;
            $validated['file_size'] = $file->getSize();
        }

        $validated['user_id'] = auth()->id();

        Thesis::create($validated);

        return redirect()->route('admin.thesis.index')
            ->with('success', 'Skripsi berhasil ditambahkan');
    }

    public function show($id)
    {
        $thesis = Thesis::findOrFail($id);
        return Inertia::render('Admin/Thesis/Show', [
            'thesis' => $thesis->load('user'),
        ]);
    }

    public function edit($id)
    {
        $thesis = Thesis::findOrFail($id);
        $categories = [
            'Web Semantik',
            'Information Retrieval',
            'Knowledge Management',
            'Semantic Web',
            'Linked Data',
            'Machine Learning',
            'Deep Learning',
            'Natural Language Processing',
            'E-Learning',
            'Blockchain',
        ];

        return Inertia::render('Admin/Thesis/Edit', [
            'thesis' => $thesis,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, $id)
    {
        $thesis = Thesis::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 1),
            'description' => 'required|string',
            'category' => 'required|string|max:100',
            'keywords' => 'nullable|string',
            'author_name' => 'required|string|max:255',
            'file' => 'nullable|file|mimes:pdf|max:10240',
        ]);

        // Handle file upload if new file provided
        if ($request->hasFile('file')) {
            // Delete old file
            if ($thesis->file_path) {
                Storage::delete($thesis->file_path);
            }

            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('theses', $filename);
            
            $validated['file_path'] = $path;
            $validated['file_size'] = $file->getSize();
        }

        $thesis->update($validated);

        return redirect()->route('admin.thesis.index')
            ->with('success', 'Skripsi berhasil diupdate');
    }

    public function destroy($id)
    {
        $thesis = Thesis::findOrFail($id);
        // Delete file
        if ($thesis->file_path) {
            Storage::delete($thesis->file_path);
        }

        $thesis->delete();

        return redirect()->route('admin.thesis.index')
            ->with('success', 'Skripsi berhasil dihapus');
    }
}
