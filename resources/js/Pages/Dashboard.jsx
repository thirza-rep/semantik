import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data for thesis repository
    const thesisData = [
        {
            id: 1,
            title: 'Implementasi Web Semantik untuk Sistem Rekomendasi',
            author: 'Ahmad Rizki',
            category: 'Web Semantik',
            year: '2024',
            date: '15 Nov 2024'
        },
        {
            id: 2,
            title: 'Ontologi dalam Pencarian Informasi Skripsi',
            author: 'Siti Nurhaliza',
            category: 'Information Retrieval',
            year: '2024',
            date: '10 Nov 2024'
        },
        {
            id: 3,
            title: 'Knowledge Graph untuk Repository Digital',
            author: 'Budi Santoso',
            category: 'Knowledge Management',
            year: '2024',
            date: '5 Nov 2024'
        },
        {
            id: 4,
            title: 'RDF dan SPARQL dalam Manajemen Data Akademik',
            author: 'Dewi Lestari',
            category: 'Semantic Web',
            year: '2024',
            date: '1 Nov 2024'
        },
        {
            id: 5,
            title: 'Linked Data untuk Integrasi Repository',
            author: 'Eko Prasetyo',
            category: 'Linked Data',
            year: '2023',
            date: '28 Okt 2024'
        },
        {
            id: 6,
            title: 'Machine Learning dalam Klasifikasi Skripsi',
            author: 'Fitri Handayani',
            category: 'Machine Learning',
            year: '2023',
            date: '20 Okt 2024'
        }
    ];

    const stats = [
        { label: 'Total Skripsi', value: '1,234', icon: '📚', color: 'from-pink-500 to-pink-600' },
        { label: 'Upload Baru', value: '45', icon: '📤', color: 'from-pink-400 to-pink-500' },
        { label: 'Kategori', value: '28', icon: '🏷️', color: 'from-pink-600 to-pink-700' },
        { label: 'Pengguna Aktif', value: '892', icon: '👥', color: 'from-pink-500 to-pink-700' }
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* Hero Section with Animated Gradient */}
            <div className="bg-animated-gradient py-16 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                            Selamat Datang di Web Semantik
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow">
                            Repository Skripsi & Sistem Pencarian Cerdas
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto animate-slide-up">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Cari skripsi berdasarkan judul, penulis, atau kategori..."
                                    className="search-bar pl-12 text-gray-700"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
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
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`stat-card animate-scale-in delay-${(index + 1) * 100}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">
                                            {stat.label}
                                        </p>
                                        <p className="text-3xl font-bold text-gradient-pink">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className={`icon-container bg-gradient-to-br ${stat.color}`}>
                                        <span className="text-2xl">{stat.icon}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Repository Section */}
                    <div className="mb-8 animate-fade-in">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Repository Skripsi Terbaru
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    Jelajahi koleksi skripsi terbaru dari berbagai kategori
                                </p>
                            </div>
                            <button className="btn-pink hidden md:block">
                                Lihat Semua
                            </button>
                        </div>

                        {/* Thesis Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {thesisData.map((thesis, index) => (
                                <div
                                    key={thesis.id}
                                    className={`thesis-card animate-slide-up delay-${(index % 3 + 1) * 100}`}
                                >
                                    <div className="mb-4">
                                        <span className="badge-pink">{thesis.category}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                                        {thesis.title}
                                    </h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg
                                                className="w-4 h-4 mr-2 text-pink-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                            {thesis.author}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg
                                                className="w-4 h-4 mr-2 text-pink-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            {thesis.date}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-4 border-t border-pink-100">
                                        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 hover:shadow-lg">
                                            Lihat Detail
                                        </button>
                                        <button className="px-4 py-2 border-2 border-pink-500 text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-all duration-300">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile View All Button */}
                        <div className="mt-6 md:hidden">
                            <button className="btn-pink w-full">
                                Lihat Semua Skripsi
                            </button>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in">
                        <div className="glass-card rounded-xl p-6 text-center">
                            <div className="icon-container mx-auto mb-4">
                                <span className="text-2xl">📤</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                Upload Skripsi
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Tambahkan skripsi baru ke repository
                            </p>
                            <button className="btn-pink w-full">
                                Upload
                            </button>
                        </div>

                        <div className="glass-card rounded-xl p-6 text-center">
                            <div className="icon-container mx-auto mb-4">
                                <span className="text-2xl">🔍</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                Pencarian Lanjutan
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Gunakan filter untuk pencarian spesifik
                            </p>
                            <button className="btn-pink w-full">
                                Cari
                            </button>
                        </div>

                        <div className="glass-card rounded-xl p-6 text-center">
                            <div className="icon-container mx-auto mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                Statistik
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Lihat analisis dan laporan lengkap
                            </p>
                            <button className="btn-pink w-full">
                                Lihat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

