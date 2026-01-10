<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Thesis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Inertia\Inertia;

class ThesisController extends Controller
{
    public function index(Request $request)
    {
        $query = Thesis::with(['user', 'clearance']);

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
            'nim' => 'required|string|max:20',
            'prodi' => 'required|string|max:100',
            'fakultas' => 'required|string|max:100',
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
            'nim' => 'required|string|max:20',
            'prodi' => 'required|string|max:100',
            'fakultas' => 'required|string|max:100',
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

    /**
     * POST /admin/thesis/{id}/clearance/approve
     */
    public function approveClearance(Request $request, $id)
    {
        $thesis = Thesis::findOrFail($id);
        
        Gate::authorize('manageClearance', $thesis);
        
        if (!$thesis->clearance) {
            return back()->with('error', 'Mahasiswa belum mengupload surat bebas pustaka.');
        }

        $thesis->clearance()->update([
            'status' => 'approved',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
            'notes' => $request->input('notes'),
        ]);

        return back()->with('success', 'Surat bebas pustaka telah disetujui.');
    }

    /**
     * POST /admin/thesis/{id}/clearance/reject
     */
    public function rejectClearance(Request $request, $id)
    {
        $thesis = Thesis::findOrFail($id);

        Gate::authorize('manageClearance', $thesis);

        if (!$thesis->clearance) {
            return back()->with('error', 'Mahasiswa belum mengupload surat bebas pustaka.');
        }

        $thesis->clearance()->update([
            'status' => 'rejected',
            'approved_by' => auth()->id(),
            'approved_at' => now(),
            'notes' => $request->notes,
        ]);

        return back()->with('success', 'Surat bebas pustaka berhasil ditolak.');
    }

    /**
     * Generate official Library Clearance Letter (Surat Bebas Pustaka)
     */
    public function generateLetter($id)
    {
        $thesis = Thesis::with(['user', 'clearance'])->findOrFail($id);

        Gate::authorize('manageClearance', $thesis);

        // Check if already approved
        if (!$thesis->is_approved) {
            return back()->with('error', 'Skripsi harus disetujui terlebih dahulu.');
        }

        // Check if letter already exists (optional: allow regeneration)
        // if ($thesis->letter_file_path) {
        //     return back()->with('error', 'Surat sudah diterbitkan.');
        // }

        try {
            // Generate unique letter number: SBP/YEAR/MONTH/ID
            $year = now()->year;
            $month = now()->format('m');
            $letterNumber = "SBP/{$year}/{$month}/" . str_pad($thesis->id, 4, '0', STR_PAD_LEFT);

            // Path to store
            $fileName = 'surat_bebas_pustaka_' . $thesis->id . '_' . time() . '.pdf';
            $storagePath = 'letters/' . $fileName;

            // Update model first so template can use the number
            $thesis->update([
                'letter_number' => $letterNumber,
                'letter_issued_at' => now(),
                'letter_issued_by' => auth()->id(),
            ]);

            // Generate PDF
            $pdf = Pdf::loadView('pdf.clearance_letter', compact('thesis'));
            
            // Save to disk
            Storage::disk('public')->put($storagePath, $pdf->output());

            // Update file path
            $thesis->update(['letter_file_path' => $storagePath]);

            return back()->with('success', 'Surat Bebas Pustaka berhasil diterbitkan.');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menerbitkan surat: ' . $e->getMessage());
        }
    }
}
