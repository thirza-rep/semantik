import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Lupa Password?
                </h1>
                <div className="text-sm text-gray-600 mt-2">
                    Jangan khawatir. Masukkan email Anda dan kami akan mengirimkan link untuk mereset password Anda.
                </div>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500 rounded-lg shadow-sm"
                    isFocused={true}
                    placeholder="Masukkan email anda"
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2 text-pink-600" />

                <div className="mt-6">
                    <PrimaryButton className="w-full justify-center bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-md transform hover:-translate-y-0.5 transition-all duration-200" disabled={processing}>
                        Kirim Link Reset Password
                    </PrimaryButton>

                    <div className="mt-4 text-center">
                        <Link href={route('login')} className="text-sm text-gray-500 hover:text-pink-600 hover:underline">
                            Kembali ke Login
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
