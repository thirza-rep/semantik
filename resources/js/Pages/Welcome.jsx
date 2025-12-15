import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const roles = [
        {
            name: 'Admin',
            role: 'admin',
            icon: '👨‍💼',
            description: 'Kelola users dan sistem',
            email: 'admin@semantik.com',
            password: 'admin123',
            color: 'from-pink-500 to-pink-600',
            features: ['Kelola Users', 'Kelola Thesis', 'Full CRUD Access']
        },
        {
            name: 'Dosen',
            role: 'dosen',
            icon: '👨‍🏫',
            description: 'Browse dan cari skripsi',
            email: 'ahmad@semantik.com',
            password: 'dosen123',
            color: 'from-pink-400 to-pink-500',
            features: ['Browse Skripsi', 'Search & Filter', 'Download PDF']
        },
        {
            name: 'Mahasiswa',
            role: 'mahasiswa',
            icon: '🎓',
            description: 'Cari dan download skripsi',
            email: 'budi@semantik.com',
            password: 'mahasiswa123',
            color: 'from-pink-600 to-pink-700',
            features: ['Cari Skripsi', 'Download PDF', 'Filter Kategori']
        }
    ];

    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-animated-gradient">
                {/* Header */}
                <header className="relative z-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-6">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="/BinaInsan.png"
                                        alt="Bina Insan"
                                        className="h-9 w-auto"

                                        style={{
                                            zoom: 2,
                                            border: '2px solid white',
                                            borderRadius: '10%',
                                        }}
                                    />
                                </div>

                                <div>
                                    <h1 className="text-xl font-bold text-white drop-shadow-lg">
                                        Web Semantik
                                    </h1>
                                    <p className="text-sm text-white/80">
                                        Repository Skripsi
                                    </p>
                                </div>
                            </div>

                            <nav className="flex gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-white/20 backdrop-blur-lg px-4 py-2 text-white font-medium hover:bg-white/30 transition-all duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg bg-white/20 backdrop-blur-lg px-4 py-2 text-white font-medium hover:bg-white/30 transition-all duration-300"
                                    >
                                        Login
                                    </Link>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center animate-fade-in">
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                                Repository Skripsi
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 mb-4 drop-shadow-lg">
                                Sistem Manajemen Skripsi Berbasis Web Semantik
                            </p>
                            <p className="text-lg text-white/80 max-w-2xl mx-auto drop-shadow">
                                Platform modern untuk mengelola, mencari, dan mengakses repository skripsi dengan teknologi semantic web
                            </p>
                        </div>

                        {/* Role Selection Cards */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
                            {roles.map((roleData) => (
                                <div
                                    key={roleData.role}
                                    className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300"
                                >
                                    <div className="text-center mb-6">
                                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${roleData.color} mb-4 shadow-lg`}>
                                            <span className="text-4xl">{roleData.icon}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                            {roleData.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            {roleData.description}
                                        </p>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        {roleData.features.map((feature, index) => (
                                            <div key={index} className="flex items-center text-sm text-gray-700">
                                                <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>



                                    {/* Dual Button System */}
                                    <div className="space-y-2">
                                        

                                        {/* Manual Login Button (Secondary) */}
                                        <Link
                                            href={route('login')}
                                            className="block w-full px-6 py-2 bg-white border-2 border-pink-200 text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-all duration-300 text-center text-sm"
                                        >
                                            📝 Login Manual
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Features Section */}
                        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="glass-card rounded-xl p-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/50 mb-4">
                                    <span className="text-3xl">🔍</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    Pencarian Cerdas
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Multi-criteria search dengan filter kategori, tahun, dan kata kunci
                                </p>
                            </div>

                            <div className="glass-card rounded-xl p-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/50 mb-4">
                                    <span className="text-3xl">📤</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    Upload Mudah
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Drag & drop file PDF dengan validasi otomatis dan progress tracking
                                </p>
                            </div>

                            <div className="glass-card rounded-xl p-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/50 mb-4">
                                    <span className="text-3xl">🔐</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    Role-Based Access
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Sistem keamanan dengan role admin, dosen, dan mahasiswa
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="relative z-10 py-8 border-t border-white/20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-white/70 text-sm">
                            © 2025 Bintang Maharani - Semantik. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
