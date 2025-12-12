import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ user }) {
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
                        Detail User
                    </h2>
                    <Link
                        href={route('admin.users.index')}
                        className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                        &larr; Kembali
                    </Link>
                </div>
            }
        >
            <Head title={`User: ${user.name}`} />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
                <div className="mx-auto max-w-3xl">
                    <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
                        {/* Header Profile */}
                        <div className="bg-pink-50 px-8 py-8 items-center flex flex-col sm:flex-row gap-6">
                            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {user.name}
                                </h3>
                                <div className="flex gap-2 justify-center sm:justify-start">
                                    <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                                        {user.role.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="p-8">
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                                    <dd className="mt-1 text-lg font-medium text-gray-900">{user.email}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Nomor Telepon</dt>
                                    <dd className="mt-1 text-lg font-medium text-gray-900">{user.phone || '-'}</dd>
                                </div>

                                {user.role === 'mahasiswa' && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">NIM</dt>
                                        <dd className="mt-1 text-lg font-medium text-gray-900">{user.nim || '-'}</dd>
                                    </div>
                                )}

                                {user.role === 'dosen' && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">NIDN</dt>
                                        <dd className="mt-1 text-lg font-medium text-gray-900">{user.nidn || '-'}</dd>
                                    </div>
                                )}

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Tanggal Terdaftar</dt>
                                    <dd className="mt-1 text-lg font-medium text-gray-900">
                                        {new Date(user.created_at).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* Actions */}
                        <div className="bg-gray-50 px-8 py-4 flex justify-end gap-3">
                            <Link
                                href={route('admin.users.edit', user.id)}
                                className="btn-pink"
                            >
                                Edit User
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
