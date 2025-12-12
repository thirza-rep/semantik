import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AdminDashboard({ stats, recent_users, recent_thesis }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
                <div className="mx-auto max-w-7xl">
                    {/* Welcome Section */}
                    <div className="mb-8 animate-fade-in">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Selamat Datang, Administrator
                        </h1>
                        <p className="text-gray-600">
                            Kelola sistem Web Semantik repository skripsi
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Total Users
                                    </p>
                                    <p className="text-3xl font-bold text-gradient-pink">
                                        {stats.total_users}
                                    </p>
                                </div>
                                <div className="icon-container bg-gradient-to-br from-pink-500 to-pink-600">
                                    <span className="text-2xl">👥</span>
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Dosen
                                    </p>
                                    <p className="text-3xl font-bold text-gradient-pink">
                                        {stats.total_dosen}
                                    </p>
                                </div>
                                <div className="icon-container bg-gradient-to-br from-pink-400 to-pink-500">
                                    <span className="text-2xl">👨‍🏫</span>
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Mahasiswa
                                    </p>
                                    <p className="text-3xl font-bold text-gradient-pink">
                                        {stats.total_mahasiswa}
                                    </p>
                                </div>
                                <div className="icon-container bg-gradient-to-br from-pink-600 to-pink-700">
                                    <span className="text-2xl">🎓</span>
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        Total Skripsi
                                    </p>
                                    <p className="text-3xl font-bold text-gradient-pink">
                                        {stats.total_thesis}
                                    </p>
                                </div>
                                <div className="icon-container bg-gradient-to-br from-pink-500 to-pink-700">
                                    <span className="text-2xl">📚</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <Link href={route('admin.users.create')} className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-center">
                                <div className="icon-container mr-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">➕</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                                        Tambah User Baru
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Buat akun dosen atau mahasiswa
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <Link href={route('admin.users.index')} className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-center">
                                <div className="icon-container mr-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                                        Kelola Users
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Lihat dan edit semua users
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Recent Users */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                User Terbaru
                            </h2>
                            <Link href={route('admin.users.index')} className="text-pink-600 hover:text-pink-700 font-medium">
                                Lihat Semua →
                            </Link>
                        </div>

                        <div className="glass-card rounded-xl overflow-hidden">
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
                                            Tanggal Dibuat
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recent_users.map((user) => (
                                        <tr key={user.id} className="hover:bg-pink-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="badge-pink">{user.role}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {new Date(user.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
