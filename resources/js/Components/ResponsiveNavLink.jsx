import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active
                    ? 'border-pink-500 bg-pink-50 text-pink-700 focus:border-pink-700 focus:bg-pink-100 focus:text-pink-800'
                    : 'border-transparent text-gray-600 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-700 focus:border-pink-300 focus:bg-pink-50 focus:text-pink-700'
                } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
