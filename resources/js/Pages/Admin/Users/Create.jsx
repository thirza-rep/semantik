import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function CreateUser() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'mahasiswa',
        nim: '',
        nidn: '',
        phone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Tambah User Baru
                    </h2>
                    <Link
                        href={route('admin.users.index')}
                        className="text-pink-600 hover:text-pink-700 font-medium"
                    >
                        ← Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Tambah User" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
                <div className="mx-auto max-w-3xl">
                    <div className="glass-card rounded-xl p-8 animate-fade-in">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Tambah User Baru
                            </h1>
                            <p className="text-gray-600">
                                Buat akun untuk dosen atau mahasiswa
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Nama Lengkap *" className="text-gray-700" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Email */}
                            <div>
                                <InputLabel htmlFor="email" value="Email *" className="text-gray-700" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Password */}
                            <div>
                                <InputLabel htmlFor="password" value="Password *" className="text-gray-700" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                                <p className="mt-1 text-sm text-gray-500">
                                    Minimal 8 karakter
                                </p>
                            </div>

                            {/* Role */}
                            <div>
                                <InputLabel htmlFor="role" value="Role *" className="text-gray-700" />
                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                    required
                                >
                                    <option value="dosen">Dosen</option>
                                    <option value="mahasiswa">Mahasiswa</option>
                                </select>
                                <InputError message={errors.role} className="mt-2" />
                            </div>

                            {/* Conditional Fields based on Role */}
                            {data.role === 'mahasiswa' && (
                                <div>
                                    <InputLabel htmlFor="nim" value="NIM *" className="text-gray-700" />
                                    <TextInput
                                        id="nim"
                                        type="text"
                                        value={data.nim}
                                        className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                                        onChange={(e) => setData('nim', e.target.value)}
                                        required={data.role === 'mahasiswa'}
                                    />
                                    <InputError message={errors.nim} className="mt-2" />
                                </div>
                            )}

                            {data.role === 'dosen' && (
                                <div>
                                    <InputLabel htmlFor="nidn" value="NIDN *" className="text-gray-700" />
                                    <TextInput
                                        id="nidn"
                                        type="text"
                                        value={data.nidn}
                                        className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                                        onChange={(e) => setData('nidn', e.target.value)}
                                        required={data.role === 'dosen'}
                                    />
                                    <InputError message={errors.nidn} className="mt-2" />
                                </div>
                            )}

                            {/* Phone */}
                            <div>
                                <InputLabel htmlFor="phone" value="Nomor Telepon" className="text-gray-700" />
                                <TextInput
                                    id="phone"
                                    type="text"
                                    value={data.phone}
                                    className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="08xxxxxxxxxx"
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            {/* Info Box */}
                            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-pink-800">
                                            Informasi
                                        </h3>
                                        <div className="mt-2 text-sm text-pink-700">
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>User akan menerima email dengan kredensial login</li>
                                                <li>Password dapat diubah oleh user setelah login</li>
                                                <li>NIM wajib untuk mahasiswa, NIDN wajib untuk dosen</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end gap-4 pt-6 border-t border-pink-100">
                                <Link
                                    href={route('admin.users.index')}
                                    className="px-6 py-2 border-2 border-pink-500 text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-all duration-300"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton
                                    className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                                    disabled={processing}
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan User'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
