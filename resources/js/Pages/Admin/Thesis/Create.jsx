import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateThesis({ categories }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        year: new Date().getFullYear(),
        description: '',
        category: '',
        keywords: '',
        author_name: '',
        file: null,
    });

    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'application/pdf') {
                setData('file', file);
                setFileName(file.name);
            } else {
                alert('Hanya file PDF yang diperbolehkan');
            }
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('file', file);
            setFileName(file.name);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.thesis.store'));
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Upload Skripsi Baru
                    </h2>
                    <Link
                        href={route('admin.thesis.index')}
                        className="text-pink-600 hover:text-pink-700 font-medium"
                    >
                        ← Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Upload Skripsi" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
                <div className="mx-auto max-w-4xl">
                    <div className="glass-card rounded-xl p-8 animate-fade-in">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Upload Skripsi Baru
                            </h1>
                            <p className="text-gray-600">
                                Lengkapi informasi skripsi dan upload file PDF
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <InputLabel htmlFor="title" value="Judul Skripsi *" className="text-gray-700" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            {/* Author Name */}
                            <div>
                                <InputLabel htmlFor="author_name" value="Nama Penulis *" className="text-gray-700" />
                                <TextInput
                                    id="author_name"
                                    type="text"
                                    value={data.author_name}
                                    className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                                    onChange={(e) => setData('author_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.author_name} className="mt-2" />
                            </div>

                            {/* Year and Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="year" value="Tahun Terbit *" className="text-gray-700" />
                                    <select
                                        id="year"
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                        required
                                    >
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.year} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="category" value="Kategori *" className="text-gray-700" />
                                    <select
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.category} className="mt-2" />
                                </div>
                            </div>

                            {/* Keywords */}
                            <div>
                                <InputLabel htmlFor="keywords" value="Kata Kunci" className="text-gray-700" />
                                <TextInput
                                    id="keywords"
                                    type="text"
                                    value={data.keywords}
                                    className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                                    onChange={(e) => setData('keywords', e.target.value)}
                                    placeholder="Pisahkan dengan koma, contoh: web semantik, ontologi, RDF"
                                />
                                <InputError message={errors.keywords} className="mt-2" />
                                <p className="mt-1 text-sm text-gray-500">
                                    Masukkan kata kunci yang relevan untuk memudahkan pencarian
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <InputLabel htmlFor="description" value="Deskripsi/Abstrak *" className="text-gray-700" />
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                                    rows="6"
                                    required
                                    placeholder="Tuliskan deskripsi atau abstrak skripsi..."
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* File Upload */}
                            <div>
                                <InputLabel htmlFor="file" value="File PDF Skripsi *" className="text-gray-700 mb-2" />

                                <div
                                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive
                                            ? 'border-pink-500 bg-pink-50'
                                            : 'border-pink-200 hover:border-pink-400 bg-white'
                                        }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        id="file"
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />

                                    <div className="pointer-events-none">
                                        <svg
                                            className="mx-auto h-12 w-12 text-pink-400 mb-4"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        {fileName ? (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-center text-pink-600">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="font-medium">{fileName}</span>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Klik atau drag & drop untuk mengganti file
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <p className="text-lg font-medium text-gray-700">
                                                    Drag & drop file PDF di sini
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    atau klik untuk memilih file
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Maksimal 10MB
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <InputError message={errors.file} className="mt-2" />
                            </div>

                            {/* Upload Progress */}
                            {progress && (
                                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-pink-700">
                                            Uploading...
                                        </span>
                                        <span className="text-sm font-medium text-pink-700">
                                            {progress.percentage}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-pink-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${progress.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end gap-4 pt-6 border-t border-pink-100">
                                <Link
                                    href={route('admin.thesis.index')}
                                    className="px-6 py-2 border-2 border-pink-500 text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-all duration-300"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton
                                    className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                                    disabled={processing}
                                >
                                    {processing ? 'Uploading...' : 'Upload Skripsi'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
