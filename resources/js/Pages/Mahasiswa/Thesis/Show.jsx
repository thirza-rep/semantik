import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ShowThesis({ thesis, related }) {
    const [showPdf, setShowPdf] = useState(false);

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
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            <span>{thesis.download_count} downloads</span>
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

                                {/* PDF Viewer */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-gray-800">
                                            Preview PDF
                                        </h2>
                                        <button
                                            onClick={() => setShowPdf(!showPdf)}
                                            className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                                        >
                                            {showPdf ? '▲ Sembunyikan' : '▼ Tampilkan'}
                                        </button>
                                    </div>

                                    {showPdf && (
                                        <div className="bg-gray-100 rounded-lg p-4 animate-fade-in">
                                            <iframe
                                                src={thesis.file_url}
                                                className="w-full h-[800px] rounded-lg border-2 border-pink-200"
                                                title="PDF Preview"
                                            />
                                            <p className="text-xs text-gray-500 mt-2 text-center">
                                                Jika PDF tidak tampil, silakan download file
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Download Button */}
                                <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-6 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="icon-container mr-4">
                                            <span className="text-2xl">📄</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {thesis.file_path.split('/').pop()}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Ukuran: {thesis.formatted_file_size}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleDownload}
                                        className="btn-pink flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download PDF
                                    </button>
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
