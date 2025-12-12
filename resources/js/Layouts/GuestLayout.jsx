import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 pt-6 sm:pt-0">
            <div className="mb-6 animate-fade-in">
                <Link href="/" className="flex flex-col items-center">
                    <ApplicationLogo className="h-24 w-24 fill-current text-pink-600 drop-shadow-md" />
                    <span className="mt-4 text-2xl font-bold text-gray-800 tracking-wide">
                        Repository <span className="text-pink-600">Skripsi</span>
                    </span>
                </Link>
            </div>

            <div className="w-full overflow-hidden bg-white/80 backdrop-blur-md px-8 py-8 shadow-xl sm:max-w-md sm:rounded-2xl border border-white/50 animate-slide-up">
                {children}
            </div>

            <div className="mt-8 text-center text-sm text-gray-500 animate-fade-in delay-100">
                &copy; {new Date().getFullYear()} Bintang Maharani - Semantik. All rights reserved.
            </div>
        </div>
    );
}
