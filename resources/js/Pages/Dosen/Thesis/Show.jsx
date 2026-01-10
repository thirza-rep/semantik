import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ShowThesis({ thesis }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail Skripsi
                    </h2>
                    <Link
                        href={route('dosen.thesis.index')}
                        className="text-pink-600 hover:text-pink-700 font-medium"
                    >
                        ← Kembali
                    </Link>
                </div>
            }
        >
            <Head title={thesis.title} />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">

                <div className="mx-auto max-w-4xl">
                    <div className="glass-card rounded-xl p-8 animate-fade-in">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-start justify-between mb-4">
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
                            </div>
                        </div>

                        {/* Abstract */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">
                                Abstrak
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

                        {/* PDF Preview & Approval Check */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">
                                {thesis.clearance?.status === 'approved' ? 'Preview PDF (Hanya Baca)' : 'Status Persetujuan Skripsi'}
                            </h2>

                            {thesis.clearance?.status !== 'approved' ? (
                                <div className="bg-yellow-50 border-2 border-dashed border-yellow-200 rounded-xl p-8 text-center">
                                    <div className="text-4xl mb-3">🛡️</div>
                                    <h3 className="text-lg font-bold text-yellow-800 mb-2">
                                        Persetujuan Diperlukan
                                    </h3>
                                    <p className="text-sm text-yellow-700 max-w-md mx-auto">
                                        Mahasiswa belum mengupload atau Admin belum menyetujui "Surat Bebas Pustaka" untuk skripsi ini.
                                        Pratinjau PDF dikunci untuk keamanan.
                                    </p>
                                    <div className="mt-4 flex justify-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${!thesis.clearance ? 'bg-gray-200 text-gray-600' :
                                            thesis.clearance.status === 'pending' ? 'bg-yellow-200 text-yellow-700' :
                                                'bg-red-200 text-red-700'
                                            }`}>
                                            Status: {!thesis.clearance ? 'Belum Upload' : thesis.clearance.status}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="bg-gray-100 rounded-lg p-4 relative"
                                    onContextMenu={(e) => e.preventDefault()}
                                >
                                    {thesis.id ? (
                                        <iframe
                                            src={route('thesis.preview', thesis.id) + '#toolbar=0&navpanes=0'}
                                            className="w-full h-[600px] rounded-lg border-2 border-pink-200"
                                            title="PDF Preview"
                                            style={{ pointerEvents: 'auto' }}
                                        />
                                    ) : (
                                        <div className="w-full h-[300px] flex items-center justify-center text-gray-500">
                                            Preview tidak tersedia
                                        </div>
                                    )}
                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                        Preview file PDF skripsi (Hanya Baca)
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* File Info - Removed Download Button for Dosen */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">
                                File PDF
                            </h2>
                            <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="icon-container mr-4">
                                        <span className="text-2xl">📄</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {thesis.file_path ? thesis.file_path.split('/').pop() : 'File tidak tersedia'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Ukuran: {thesis.file_size ? (thesis.file_size / 1024 / 1024).toFixed(2) : '0'} MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metadata */}
                        <div className="border-t border-pink-100 pt-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">
                                Informasi Tambahan
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Diupload oleh:</span>
                                    <p className="font-medium text-gray-800">{thesis.user ? thesis.user.name : 'Tidak Diketahui'}</p>
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
                                {thesis.updated_at !== thesis.created_at && (
                                    <div>
                                        <span className="text-gray-600">Terakhir Diupdate:</span>
                                        <p className="font-medium text-gray-800">
                                            {new Date(thesis.updated_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
