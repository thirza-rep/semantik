import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ShowThesis({ thesis, related }) {
    const [showPdf, setShowPdf] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        file: null,
    });

    const handleDownload = () => {
        window.location.href = route('thesis.download', thesis.id);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail Skripsi
                    </h2>
                    <Link
                        href={route('mahasiswa.dashboard')}
                        className="text-pink-600 hover:text-pink-700 font-medium"
                    >
                        ← Kembali
                    </Link>
                </div>
            }
        >
            <Head title={thesis.title} />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="glass-card rounded-xl p-8 animate-fade-in mb-8">
                                {/* Header */}
                                <div className="mb-8">
                                    <div className="mb-4">
                                        <span className="badge-pink">{thesis.category}</span>
                                    </div>

                                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                        {thesis.title}
                                    </h1>

                                    <div className="flex flex-wrap gap-4 text-gray-600">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="font-medium">{thesis.author_name}</span>
                                        </div>

                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{thesis.year}</span>
                                        </div>


                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>Dosen: {thesis.user.name}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                                        Deskripsi
                                    </h2>
                                    <div className="bg-pink-50 rounded-lg p-6">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {thesis.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Keywords */}
                                {thesis.keywords && (
                                    <div className="mb-8">
                                        <h2 className="text-xl font-bold text-gray-800 mb-3">
                                            Kata Kunci
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {thesis.keywords.split(',').map((keyword, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                                                >
                                                    {keyword.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Clearance System & PDF Viewer */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-gray-800">
                                            {thesis.clearance?.status === 'approved' ? 'Preview PDF (Hanya Baca)' : 'Status Persetujuan Perpustakaan'}
                                        </h2>
                                        {thesis.clearance?.status === 'approved' && (
                                            <button
                                                onClick={() => setShowPdf(!showPdf)}
                                                className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                                            >
                                                {showPdf ? '▲ Sembunyikan' : '▼ Tampilkan'}
                                            </button>
                                        )}
                                    </div>

                                    {/* Clearance Upload / Status Section */}
                                    {thesis.clearance?.status !== 'approved' ? (
                                        <div className="bg-pink-50 rounded-xl p-6 border-2 border-dashed border-pink-200">
                                            <div className="flex items-center mb-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl ${!thesis.clearance ? 'bg-gray-100 text-gray-500' :
                                                    thesis.clearance.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                                        'bg-red-100 text-red-600'
                                                    }`}>
                                                    {!thesis.clearance ? '📄' : thesis.clearance.status === 'pending' ? '⏳' : '❌'}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800">
                                                        {!thesis.clearance ? 'Belum Upload Surat Bebas Pustaka' :
                                                            thesis.clearance.status === 'pending' ? 'Menunggu Persetujuan Admin' :
                                                                'Upload Ditolak'}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Dosen/Mahasiswa hanya dapat melihat PDF jika Surat Bebas Pustaka (PDF) telah disetujui Admin.
                                                    </p>
                                                </div>
                                            </div>

                                            {thesis.clearance?.notes && (
                                                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded text-sm text-red-700 animate-pulse">
                                                    <strong>Alasan Penolakan:</strong> {thesis.clearance.notes}
                                                </div>
                                            )}

                                            {thesis.clearance?.file_path && (
                                                <div className="mb-4 p-3 bg-pink-100/50 rounded flex items-center justify-between">
                                                    <span className="text-xs text-pink-700 font-medium">
                                                        📄 File Terakhir: {thesis.clearance.file_path.split('/').pop()}
                                                    </span>
                                                    <span className="text-[10px] text-pink-500 italic">
                                                        Diupload: {new Date(thesis.clearance.updated_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            )}

                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    post(route('mahasiswa.thesis.clearance.store', thesis.id), {
                                                        forceFormData: true,
                                                        onSuccess: () => {
                                                            alert('Persetujuan berhasil diupload!');
                                                            setData('file', null);
                                                        }
                                                    });
                                                }}
                                                className="mt-6"
                                            >
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Upload / Ganti Surat Bebas Pustaka (PDF, Maks 2MB)
                                                </label>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="file"
                                                            onChange={(e) => setData('file', e.target.files[0])}
                                                            accept="application/pdf"
                                                            required
                                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
                                                        />
                                                        <button
                                                            type="submit"
                                                            disabled={processing}
                                                            className={`btn-pink whitespace-nowrap ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        >
                                                            {processing ? 'Uploading...' : 'Upload Berkas'}
                                                        </button>
                                                    </div>
                                                    {errors.file && (
                                                        <p className="text-red-500 text-xs mt-1">{errors.file}</p>
                                                    )}
                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        /* Approved - Show PDF Preview + Success Badge */
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200 animate-fade-in">
                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-lg">
                                                    ✅
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-green-800 text-sm">Surat Bebas Pustaka Disetujui</h3>
                                                    <p className="text-xs text-green-600">
                                                        Disetujui pada {new Date(thesis.clearance.approved_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {showPdf && (
                                                <div
                                                    className="bg-gray-100 rounded-lg p-4 animate-fade-in relative"
                                                    onContextMenu={(e) => e.preventDefault()}
                                                >
                                                    <iframe
                                                        src={route('thesis.preview', thesis.id) + '#toolbar=0&navpanes=0'}
                                                        className="w-full h-[800px] rounded-lg border-2 border-pink-200"
                                                        title="PDF Preview"
                                                    />

                                                </div>
                                            )}

                                            {/* Download Letter Section */}
                                            {thesis.letter_number && (
                                                <div className="flex justify-center pt-4">
                                                    <a
                                                        href={route('thesis.letter.download', thesis.id)}
                                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-1"
                                                    >
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        Download Surat Bebas Pustaka Resmi
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Info Card */}
                            <div className="glass-card rounded-xl p-6 mb-6 sticky top-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">
                                    Informasi
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <span className="text-gray-600">Diupload oleh:</span>
                                        <p className="font-medium text-gray-800">{thesis.user.name}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Tanggal Upload:</span>
                                        <p className="font-medium text-gray-800">
                                            {new Date(thesis.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Kategori:</span>
                                        <p className="font-medium text-gray-800">{thesis.category}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Tahun:</span>
                                        <p className="font-medium text-gray-800">{thesis.year}</p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-pink-100">
                                    <Link
                                        href={route('mahasiswa.search', { category: thesis.category })}
                                        className="text-pink-600 hover:text-pink-700 font-medium text-sm flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Cari skripsi serupa
                                    </Link>
                                </div>
                            </div>

                            {/* Related Thesis */}
                            {related && related.length > 0 && (
                                <div className="glass-card rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                                        Skripsi Terkait
                                    </h3>
                                    <div className="space-y-4">
                                        {related.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={route('mahasiswa.thesis.show', item.id)}
                                                className="block p-4 bg-white rounded-lg hover:shadow-md transition-all duration-300"
                                            >
                                                <h4 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm">
                                                    {item.title}
                                                </h4>
                                                <div className="flex items-center text-xs text-gray-600">
                                                    <span>{item.author_name}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{item.year}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
