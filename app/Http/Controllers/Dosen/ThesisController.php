<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\Thesis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ThesisController extends Controller
{
    public function index(Request $request)
    {
        $query = auth()->user()->theses();

        // Search
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        $theses = $query->orderBy('created_at', 'desc')->paginate(12);

        return Inertia::render('Dosen/Thesis/Index', [
            'theses' => $theses,
            'filters' => $request->only(['search']),
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

        return Inertia::render('Dosen/Thesis/Create', [
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
            $path = $file->storeAs('theses', $filename, 'public');
            
            $validated['file_path'] = $path;
            $validated['file_size'] = $file->getSize();
        }

        $validated['user_id'] = auth()->id();

        Thesis::create($validated);

        return redirect()->route('dosen.thesis.index')
            ->with('success', 'Skripsi berhasil diupload');
    }

    public function show(Thesis $thesis)
    {
        // Check if user owns this thesis
        if ($thesis->user_id != auth()->id()) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('Dosen/Thesis/Show', [
            'thesis' => $thesis->load('user'),
        ]);
    }

    public function edit(Thesis $thesis)
    {
        // Check if user owns this thesis
        if ($thesis->user_id != auth()->id()) {
            abort(403, 'Unauthorized');
        }

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

        return Inertia::render('Dosen/Thesis/Edit', [
            'thesis' => $thesis,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Thesis $thesis)
    {
        // Check if user owns this thesis
        if ($thesis->user_id != auth()->id()) {
            abort(403, 'Unauthorized');
        }

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
                Storage::disk('public')->delete($thesis->file_path);
            }

            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('theses', $filename, 'public');
            
            $validated['file_path'] = $path;
            $validated['file_size'] = $file->getSize();
        }

        $thesis->update($validated);

        return redirect()->route('dosen.thesis.index')
            ->with('success', 'Skripsi berhasil diupdate');
    }

    public function destroy(Thesis $thesis)
    {
        // Check if user owns this thesis
        if ($thesis->user_id != auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // Delete file
        if ($thesis->file_path) {
            Storage::disk('public')->delete($thesis->file_path);
        }

        $thesis->delete();

        return redirect()->route('dosen.thesis.index')
            ->with('success', 'Skripsi berhasil dihapus');
    }

    public function download(Thesis $thesis)
    {
        if (!$thesis->file_path || !Storage::disk('public')->exists($thesis->file_path)) {
            abort(404, 'File tidak ditemukan');
        }

        // Increment download count
        $thesis->incrementDownloads();

        return Storage::disk('public')->download($thesis->file_path);
    }
}
