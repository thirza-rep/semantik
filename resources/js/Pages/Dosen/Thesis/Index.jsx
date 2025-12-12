import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ThesisIndex({ theses, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('dosen.thesis.index'), { search }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (thesis) => {
        if (confirm(`Apakah Anda yakin ingin menghapus skripsi "${thesis.title}"?`)) {
            router.delete(route('dosen.thesis.destroy', thesis.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Kelola Skripsi
                    </h2>
                    <Link
                        href={route('dosen.thesis.create')}
                        className="btn-pink"
                    >
                        + Upload Skripsi
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Skripsi" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
                <div className="mx-auto max-w-7xl">
                    {/* Search Bar */}
                    <div className="mb-8 animate-fade-in">
                        <form onSubmit={handleSearch} className="max-w-2xl">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari skripsi berdasarkan judul atau penulis..."
                                    className="search-bar pl-12"
                                />
                                <svg
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </form>
                    </div>

                    {/* Thesis Grid */}
                    {theses.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {theses.data.map((thesis) => (
                                    <div key={thesis.id} className="thesis-card">
                                        <div className="mb-4">
                                            <span className="badge-pink">{thesis.category}</span>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                                            {thesis.title}
                                        </h3>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg className="w-4 h-4 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                {thesis.author_name}
                                            </div>

                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg className="w-4 h-4 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {thesis.year}
                                            </div>

                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg className="w-4 h-4 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                {thesis.download_count} downloads
                                            </div>
                                        </div>

                                        <div className="flex gap-2 pt-4 border-t border-pink-100">
                                            <Link
                                                href={route('dosen.thesis.show', thesis.id)}
                                                className="flex-1 px-3 py-2 bg-white border-2 border-pink-500 text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-all duration-300 text-center text-sm"
                                            >
                                                Lihat
                                            </Link>
                                            <Link
                                                href={route('dosen.thesis.edit', thesis.id)}
                                                className="flex-1 px-3 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center text-sm"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(thesis)}
                                                className="px-3 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-300 text-sm"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {theses.links.length > 3 && (
                                <div className="flex justify-center gap-2">
                                    {theses.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${link.active
                                                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                                                    : link.url
                                                        ? 'bg-white border-2 border-pink-200 text-pink-600 hover:border-pink-500'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            preserveScroll
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="glass-card rounded-xl p-12 text-center">
                            <div className="icon-container mx-auto mb-4 bg-gradient-to-br from-pink-100 to-pink-200">
                                <span className="text-4xl">📚</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Belum Ada Skripsi
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {search
                                    ? 'Tidak ada skripsi yang sesuai dengan pencarian Anda'
                                    : 'Mulai upload skripsi pertama Anda'}
                            </p>
                            {!search && (
                                <Link
                                    href={route('dosen.thesis.create')}
                                    className="btn-pink inline-block"
                                >
                                    Upload Skripsi Pertama
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
