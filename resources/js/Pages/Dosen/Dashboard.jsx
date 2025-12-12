import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function DosenDashboard({ stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Dosen
                </h2>
            }
        >
            <Head title="Dosen Dashboard" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
                <div className="mx-auto max-w-7xl">
                    {/* Welcome Section */}
                    <div className="mb-8 animate-fade-in">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Dashboard Dosen
                        </h1>
                        <p className="text-gray-600">
                            Kelola skripsi yang Anda bimbing
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Skripsi Saya
                                    </p>
                                    <p className="text-3xl font-bold text-gradient-pink">
                                        {stats.my_thesis}
                                    </p>
                                </div>
                                <div className="icon-container bg-gradient-to-br from-pink-500 to-pink-600">
                                    <span className="text-2xl">📚</span>
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Total Download
                                    </p>
                                    <p className="text-3xl font-bold text-gradient-pink">
                                        {stats.total_downloads}
                                    </p>
                                </div>
                                <div className="icon-container bg-gradient-to-br from-pink-400 to-pink-500">
                                    <span className="text-2xl">📥</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <Link href={route('dosen.thesis.create')} className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-center">
                                <div className="icon-container mr-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">📤</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                                        Upload Skripsi Baru
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Tambahkan skripsi ke repository
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <Link href={route('dosen.thesis.index')} className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-center">
                                <div className="icon-container mr-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                                        Kelola Skripsi
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Lihat dan edit skripsi Anda
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Recent Thesis */}
                    {stats.recent_thesis && stats.recent_thesis.length > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Skripsi Terbaru
                                </h2>
                                <Link href={route('dosen.thesis.index')} className="text-pink-600 hover:text-pink-700 font-medium">
                                    Lihat Semua →
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {stats.recent_thesis.map((thesis) => (
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
                                            <Link href={route('dosen.thesis.edit', thesis.id)} className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center">
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
