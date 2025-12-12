import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function UsersIndex({ users, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    const handleSearch = (e) => {
        e.preventDefault();
        performSearch();
    };

    const performSearch = () => {
        router.get(route('admin.users.index'), {
            search,
            role,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (user) => {
        if (confirm(`Apakah Anda yakin ingin menghapus user "${user.name}"?`)) {
            router.delete(route('admin.users.destroy', user.id), {
                preserveScroll: true,
            });
        }
    };

    const getRoleBadgeColor = (userRole) => {
        switch (userRole) {
            case 'admin':
                return 'bg-purple-100 text-purple-700';
            case 'dosen':
                return 'bg-blue-100 text-blue-700';
            case 'mahasiswa':
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Kelola Users
                    </h2>
                    <Link
                        href={route('admin.users.create')}
                        className="btn-pink"
                    >
                        + Tambah User
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Users" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
                <div className="mx-auto max-w-7xl">
                    {/* Search & Filter */}
                    <div className="mb-8 glass-card rounded-xl p-6 animate-fade-in">
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari berdasarkan nama atau email..."
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
                            </div>
                            <div>
                                <select
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                        setTimeout(performSearch, 100);
                                    }}
                                    className="w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                >
                                    <option value="">Semua Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="dosen">Dosen</option>
                                    <option value="mahasiswa">Mahasiswa</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    {/* Users Table */}
                    {users.data.length > 0 ? (
                        <>
                            <div className="glass-card rounded-xl overflow-hidden mb-8">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-pink-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Nama
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Email
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Role
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    NIM/NIDN
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Telepon
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Terdaftar
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {users.data.map((user) => (
                                                <tr key={user.id} className="hover:bg-pink-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold">
                                                                    {user.name.charAt(0).toUpperCase()}
                                                                </div>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {user.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-600">{user.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {user.nim || user.nidn || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {user.phone || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {new Date(user.created_at).toLocaleDateString('id-ID')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                href={route('admin.users.show', user.id)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                                title="Lihat Detail"
                                                            >
                                                                👁️
                                                            </Link>
                                                            <Link
                                                                href={route('admin.users.edit', user.id)}
                                                                className="text-pink-600 hover:text-pink-900"
                                                                title="Edit User"
                                                            >
                                                                ✏️
                                                            </Link>
                                                            {user.role !== 'admin' && (
                                                                <button
                                                                    onClick={() => handleDelete(user)}
                                                                    className="text-red-600 hover:text-red-900"
                                                                    title="Hapus User"
                                                                >
                                                                    🗑️
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pagination */}
                            {users.links.length > 3 && (
                                <div className="flex justify-center gap-2">
                                    {users.links.map((link, index) => (
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
                                <span className="text-4xl">👥</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Tidak Ada User
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {search || role
                                    ? 'Tidak ditemukan user yang sesuai dengan filter'
                                    : 'Belum ada user yang terdaftar'}
                            </p>
                            {!search && !role && (
                                <Link
                                    href={route('admin.users.create')}
                                    className="btn-pink inline-block"
                                >
                                    Tambah User Pertama
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
