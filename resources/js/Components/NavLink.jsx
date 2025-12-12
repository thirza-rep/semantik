import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-pink-500 text-pink-700 focus:border-pink-700'
                    : 'border-transparent text-gray-600 hover:border-pink-300 hover:text-pink-600 focus:border-pink-300 focus:text-pink-600') +
                className
            }
        >
            {children}
        </Link>
    );
}
