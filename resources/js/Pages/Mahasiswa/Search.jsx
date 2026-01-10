import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Search({ theses, categories, years, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [year, setYear] = useState(filters.year || '');
    const [yearFrom, setYearFrom] = useState(filters.year_from || '');
    const [yearTo, setYearTo] = useState(filters.year_to || '');
    const [sort, setSort] = useState(filters.sort || 'latest');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        performSearch();
    };

    const performSearch = () => {
        router.get(route('mahasiswa.search'), {
            search,
            category,
            year,
            year_from: yearFrom,
            year_to: yearTo,
            sort,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setSearch('');
        setCategory('');
        setYear('');
        setYearFrom('');
        setYearTo('');
        setSort('latest');
        router.get(route('mahasiswa.search'));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                performSearch();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

    const activeFiltersCount = [category, year, yearFrom, yearTo].filter(Boolean).length;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pencarian Skripsi
                </h2>
            }
        >
            <Head title="Pencarian Skripsi" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
                <div className="mx-auto max-w-7xl">
                    {/* Search Bar */}
                    <div className="mb-8 animate-fade-in">
                        <form onSubmit={handleSearch}>
                            <div className="relative max-w-3xl mx-auto">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berdasarkan judul, penulis, deskripsi, atau kata kunci..."
                                    className="search-bar pl-12 pr-32"
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
                                <button
                                    type="button"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-all duration-300 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filter
                                    {activeFiltersCount > 0 && (
                                        <span className="bg-white text-pink-600 rounded-full px-2 py-0.5 text-xs font-bold">
                                            {activeFiltersCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="mb-8 glass-card rounded-xl p-6 animate-slide-up">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Filter Pencarian
                                </h3>
                                <button
                                    onClick={resetFilters}
                                    className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                                >
                                    Reset Semua
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kategori
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                            setTimeout(performSearch, 100);
                                        }}
                                        className="w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                    >
                                        <option value="">Semua Kategori</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Year Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tahun
                                    </label>
                                    <select
                                        value={year}
                                        onChange={(e) => {
                                            setYear(e.target.value);
                                            setYearFrom('');
                                            setYearTo('');
                                            setTimeout(performSearch, 100);
                                        }}
                                        className="w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                    >
                                        <option value="">Semua Tahun</option>
                                        {years.map((yr) => (
                                            <option key={yr} value={yr}>
                                                {yr}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Year Range From */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Dari Tahun
                                    </label>
                                    <select
                                        value={yearFrom}
                                        onChange={(e) => {
                                            setYearFrom(e.target.value);
                                            setYear('');
                                            setTimeout(performSearch, 100);
                                        }}
                                        className="w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                    >
                                        <option value="">-</option>
                                        {years.map((yr) => (
                                            <option key={yr} value={yr}>
                                                {yr}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Year Range To */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sampai Tahun
                                    </label>
                                    <select
                                        value={yearTo}
                                        onChange={(e) => {
                                            setYearTo(e.target.value);
                                            setYear('');
                                            setTimeout(performSearch, 100);
                                        }}
                                        className="w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                    >
                                        <option value="">-</option>
                                        {years.map((yr) => (
                                            <option key={yr} value={yr}>
                                                {yr}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sort & Results Count */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-600">
                            Ditemukan <strong className="text-pink-600">{theses.total}</strong> skripsi
                        </p>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Urutkan:</label>
                            <select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    setTimeout(performSearch, 100);
                                }}
                                className="border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm text-sm"
                            >
                                <option value="latest">Terbaru</option>
                                <option value="oldest">Terlama</option>
                                <option value="title_asc">Judul A-Z</option>
                                <option value="title_desc">Judul Z-A</option>
                                <option value="most_downloaded">Paling Banyak Diunduh</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Grid */}
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
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Dosen: {thesis.user.name}
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                            {thesis.description}
                                        </p>

                                        <div className="flex gap-2 pt-4 border-t border-pink-100">
                                            <Link
                                                href={route('mahasiswa.thesis.show', thesis.id)}
                                                className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center text-sm"
                                            >
                                                Lihat Detail
                                            </Link>
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
                                <span className="text-4xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Tidak Ada Hasil
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Tidak ditemukan skripsi yang sesuai dengan pencarian Anda
                            </p>
                            <button
                                onClick={resetFilters}
                                className="btn-pink inline-block"
                            >
                                Reset Pencarian
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
