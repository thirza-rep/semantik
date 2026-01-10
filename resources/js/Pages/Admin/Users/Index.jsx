import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ users = { data: [], links: [] }, filters = {} }) {
  const [search, setSearch] = useState(filters?.search || '');
  const [role, setRole] = useState(filters?.role || '');

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch();
  };

  const performSearch = () => {
    router.get(route('admin.users.index'), { search, role }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleDelete = (id, name) => {
    if (confirm(`Apakah Anda yakin ingin menghapus user ${name}?`)) {
      router.delete(route('admin.users.destroy', id), {
        preserveScroll: true,
        onSuccess: () => {
          // Success notification handling is usually implicit in Inertia
        }
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (filters?.search || '')) {
        performSearch();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Kelola Users
          </h2>
          <Link
            href={route('admin.users.create')}
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah User
          </Link>
        </div>
      }
    >
      <Head title="Kelola Users" />

      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Daftar Pengguna
            </h1>
            <p className="text-gray-600">
              Manajemen akun dosen dan mahasiswa dalam sistem
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mb-8 glass-card rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama atau email..."
                className="w-full pl-12 pr-4 py-3 bg-white/50 border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-xl transition-all duration-300"
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
            <div className="w-full md:w-64">
              <select
                value={role}
                onChange={(e) => {
                  const newRole = e.target.value;
                  setRole(newRole);
                  router.get(route('admin.users.index'), { search, role: newRole }, { preserveState: true });
                }}
                className="w-full py-3 bg-white/50 border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-xl transition-all duration-300"
              >
                <option value="">Semua Role</option>
                <option value="dosen">Dosen</option>
                <option value="mahasiswa">Mahasiswa</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Table View */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100 animate-slide-up">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-pink-100">
                <thead className="bg-pink-50/50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-pink-700 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-pink-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-pink-700 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-pink-700 uppercase tracking-wider">
                      ID (NIM/NIDN)
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-pink-700 uppercase tracking-wider w-40">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-pink-50">
                  {(users?.data || []).length > 0 ? (
                    (users?.data || []).map((u) => (
                      <tr key={u.id} className="hover:bg-pink-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                              {u.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-gray-900">{u.name}</div>
                              <div className="text-xs text-gray-500 capitalize">User ID: #{u.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{u.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-sm ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                            u.role === 'dosen' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-700">
                            {u.nim || u.nidn || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <Link
                              href={route('admin.users.show', u.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                              title="Detail"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </Link>
                            <Link
                              href={route('admin.users.edit', u.id)}
                              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                              title="Edit"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Link>
                            {u.role !== 'admin' && (
                              <button
                                onClick={() => handleDelete(u.id, u.name)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                                title="Hapus"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-4 text-3xl">
                            👥
                          </div>
                          <p className="text-lg font-medium text-gray-800">Tidak ada user ditemukan</p>
                          <p className="text-sm">Coba sesuaikan filter atau kata kunci pencarian Anda</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {(users?.links || []).length > 3 && (
            <div className="mt-8 flex justify-center gap-2">
              {(users?.links || []).map((link, index) => (
                <Link
                  key={index}
                  href={link.url || '#'}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${link.active
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                    : link.url
                      ? 'bg-white border text-pink-600 hover:bg-pink-50 border-pink-100'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  preserveScroll
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
