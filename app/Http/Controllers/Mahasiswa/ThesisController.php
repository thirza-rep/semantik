<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Thesis;
use App\Http\Requests\ClearanceUploadRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ThesisController extends Controller
{
    /**
     * GET /mahasiswa/dashboard
     */
    public function dashboard()
    {
        $recent = Thesis::with('user')
            ->latest()
            ->take(6)
            ->get();

        $popular = Thesis::with('user')
            ->orderByDesc('download_count')
            ->take(6)
            ->get();

        $categories = Thesis::query()
            ->select('category')
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category')
            ->values();

        $totalThesis = Thesis::count();
        $categoriesCount = $categories->count();

        return Inertia::render('Mahasiswa/Dashboard', [
            'recent_thesis' => $recent,
            'popular_thesis' => $popular,
            'categories' => $categories,
            'stats' => [
                'total_thesis' => $totalThesis,
                'categories_count' => $categoriesCount,
            ],
        ]);
    }

    /**
     * GET /mahasiswa/search
     */
    public function search(Request $request)
    {
        $search = $request->input('search');
        $category = $request->input('category');
        $year = $request->input('year');
        $yearFrom = $request->input('year_from');
        $yearTo = $request->input('year_to');
        $sort = $request->input('sort', 'latest');

        $query = Thesis::with('user');

        if ($search) {
            $query->search($search);
        }

        if ($category) {
            $query->category($category);
        }

        if ($year) {
            $query->year($year);
        } else {
            $query->yearRange($yearFrom, $yearTo);
        }

        match ($sort) {
            'oldest' => $query->orderBy('created_at', 'asc'),
            'title_asc' => $query->orderBy('title', 'asc'),
            'title_desc' => $query->orderBy('title', 'desc'),
            'most_downloaded' => $query->orderByDesc('download_count'),
            default => $query->latest(),
        };

        $theses = $query->paginate(9)->withQueryString();

        $categories = Thesis::query()
            ->select('category')
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category')
            ->values();

        $years = Thesis::query()
            ->select('year')
            ->whereNotNull('year')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year')
            ->values();

        return Inertia::render('Mahasiswa/Search', [
            'theses' => $theses,
            'categories' => $categories,
            'years' => $years,
            'filters' => [
                'search' => $search,
                'category' => $category,
                'year' => $year,
                'year_from' => $yearFrom,
                'year_to' => $yearTo,
                'sort' => $sort,
            ],
        ]);
    }

    /**
     * GET /mahasiswa/thesis/create
     */
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

        return Inertia::render('Mahasiswa/Thesis/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * POST /mahasiswa/thesis
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 1),
            'description' => 'required|string',
            'category' => 'required|string|max:100',
            'keywords' => 'nullable|string',
            'author_name' => 'required|string|max:255',
            'nim' => 'required|string|max:20',
            'prodi' => 'required|string|max:100',
            'fakultas' => 'required|string|max:100',
            'file' => 'required|file|mimes:pdf|max:10240',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('theses', $filename, 'public');
            
            $validated['file_path'] = $path;
            $validated['file_size'] = $file->getSize();
        }

        $validated['user_id'] = auth()->id();
        $validated['download_count'] = 0;

        $thesis = Thesis::create($validated);

        return redirect()->route('mahasiswa.dashboard')
            ->with('success', 'Skripsi berhasil diupload dan menunggu verifikasi.');
    }

    /**
     * GET /mahasiswa/thesis/{id}
     */
    public function show($id)
    {
        $thesis = Thesis::with(['user', 'clearance'])->findOrFail($id);

        $related = Thesis::with('user')
            ->where('category', $thesis->category)
            ->where('id', '!=', $thesis->id)
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('Mahasiswa/Thesis/Show', [
            'thesis' => $thesis,
            'related' => $related,
        ]);
    }

    /**
     * GET /thesis/{id}/download
     */
    public function download($id)
    {
        $thesis = Thesis::with('clearance')->findOrFail($id);
        
        Gate::authorize('viewContent', $thesis);

        if (!$thesis->file_path) {
            return back()->with('error', 'File tidak ditemukan.');
        }

        $thesis->incrementDownloads();

        return Storage::disk('public')->download($thesis->file_path);
    }

    /**
     * GET /thesis/{id}/preview
     */
    public function preview($id)
    {
        $thesis = Thesis::with('clearance')->findOrFail($id);

        Gate::authorize('viewContent', $thesis);

        if (!$thesis->file_path) {
            abort(404, 'File tidak ditemukan.');
        }

        return Storage::disk('public')->response($thesis->file_path);
    }

    /**
     * POST /mahasiswa/thesis/{id}/clearance
     */
    public function storeClearance(ClearanceUploadRequest $request, $id)
    {
        $thesis = Thesis::findOrFail($id);
        
        Gate::authorize('uploadClearance', $thesis);

        if ($request->hasFile('file')) {
            // Delete old clearance file if exists
            if ($thesis->clearance && $thesis->clearance->file_path) {
                Storage::disk('public')->delete($thesis->clearance->file_path);
            }

            $file = $request->file('file');
            $path = $file->store('clearances', 'public');

            $thesis->clearance()->updateOrCreate(
                ['thesis_id' => $id],
                [
                    'file_path' => $path,
                    'status' => 'pending',
                    'notes' => null,
                    'approved_by' => null,
                    'approved_at' => null,
                ]
            );

            return back()->with('success', 'Surat bebas pustaka berhasil diupload dan menunggu persetujuan admin.');
        }

        return back()->with('error', 'Gagal mengupload file.');
    }

    /**
     * Download the official Library Clearance Letter (PDF)
     */
    public function downloadLetter($id)
    {
        $thesis = Thesis::findOrFail($id);

        // Access: Admin or Creator
        if (!auth()->user()->isAdmin() && auth()->id() !== $thesis->user_id) {
            abort(403, 'Anda tidak memiliki akses ke berkas ini.');
        }

        if (!$thesis->letter_file_path || !Storage::disk('public')->exists($thesis->letter_file_path)) {
            return back()->with('error', 'Surat belum diterbitkan atau file tidak ditemukan.');
        }

        return Storage::disk('public')->download($thesis->letter_file_path, 'Surat_Bebas_Pustaka_' . str_replace(' ', '_', $thesis->author_name) . '.pdf');
    }
}
