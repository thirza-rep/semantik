import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // ✅ Route dashboard sesuai role (menghindari Ziggy error route 'dashboard' tidak ada)
    const dashboardRouteName =
        user.role === 'admin' ? 'admin.dashboard' :
        user.role === 'dosen' ? 'dosen.dashboard' :
        'mahasiswa.dashboard';

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
            <nav className="glass-card border-b border-pink-100 sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <img
                                        src="/BinaInsan.png"
                                        alt="Bina Insan"
                                        className="block h-9 w-auto transition-opacity hover:opacity-90"
                                        style={{
                                            zoom: 1.7,
                                            border: '1px solid white',
                                            borderRadius: '10%',
                                        }}
                                    />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {/* Dosen Navigation - Replaces Dashboard */}
                                {user.role === 'dosen' ? (
                                    <NavLink
                                        href={route('dosen.thesis.index')}
                                        active={route().current('dosen.thesis.*')}
                                    >
                                        Daftar Skripsi
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        href={route(dashboardRouteName)}
                                        active={route().current(dashboardRouteName)}
                                    >
                                        Dashboard
                                    </NavLink>
                                )}

                                {/* Admin Navigation */}
                                {user.role === 'admin' && (
                                    <>
                                        <NavLink
                                            href={route('admin.users.index')}
                                            active={route().current('admin.users.*')}
                                        >
                                            Users
                                        </NavLink>
                                        <NavLink
                                            href={route('admin.thesis.index')}
                                            active={route().current('admin.thesis.*')}
                                        >
                                            Thesis
                                        </NavLink>
                                    </>
                                )}

                                {/* Mahasiswa Navigation */}
                                {user.role === 'mahasiswa' && (
                                    <NavLink
                                        href={route('mahasiswa.search')}
                                        active={
                                            route().current('mahasiswa.search') ||
                                            route().current('mahasiswa.thesis.*')
                                        }
                                    >
                                        Search Thesis
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white/50 px-3 py-2 text-sm font-medium leading-4 text-pink-700 transition duration-150 ease-in-out hover:text-pink-900 hover:bg-white/80 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-pink-600 transition duration-150 ease-in-out hover:bg-pink-100 hover:text-pink-700 focus:bg-pink-100 focus:text-pink-700 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        {user.role === 'dosen' ? (
                            <ResponsiveNavLink
                                href={route('dosen.thesis.index')}
                                active={route().current('dosen.thesis.*')}
                            >
                                Daftar Skripsi
                            </ResponsiveNavLink>
                        ) : (
                            <ResponsiveNavLink
                                href={route(dashboardRouteName)}
                                active={route().current(dashboardRouteName)}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        )}

                        {/* Admin Mobile Navigation */}
                        {user.role === 'admin' && (
                            <>
                                <ResponsiveNavLink
                                    href={route('admin.users.index')}
                                    active={route().current('admin.users.*')}
                                >
                                    Users
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('admin.thesis.index')}
                                    active={route().current('admin.thesis.*')}
                                >
                                    Thesis
                                </ResponsiveNavLink>
                            </>
                        )}

                        {/* Mahasiswa Mobile Navigation */}
                        {user.role === 'mahasiswa' && (
                            <ResponsiveNavLink
                                href={route('mahasiswa.search')}
                                active={
                                    route().current('mahasiswa.search') ||
                                    route().current('mahasiswa.thesis.*')
                                }
                            >
                                Search Thesis
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-pink-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-pink-600">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="glass-card shadow-lg">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="min-h-[calc(100vh-12rem)]">{children}</main>

            <footer className="bg-white/50 backdrop-blur-sm border-t border-pink-100 py-6 mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Bintang Maharani - Semantik. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
