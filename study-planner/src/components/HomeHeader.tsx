"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, MessageCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { useEffect, useState } from "react";

export default function HomeHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={`sticky top-0 z-50 bg-white dark:bg-zinc-950 transition-all border-b border-zinc-200 dark:border-zinc-800 ${scrolled ? 'shadow-md py-2' : 'py-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4 md:gap-8">

                        {/* 1. Left: Logo & Nav */}
                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex items-center gap-2 shrink-0">
                                <div className="relative w-8 h-8 overflow-hidden rounded">
                                    <Image src="/logo.jpg" alt="StudyPlanner" fill className="object-cover" />
                                </div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 hidden sm:block">
                                    Vidyālaya Academy
                                </span>
                            </Link>

                            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Current Affairs</Link>
                                <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Postal Updates</Link>
                                <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Syllabus</Link>

                                {/* Pass Dropdown */}
                                <div className="relative group">
                                    <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 py-4">
                                        Pass <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                                    </button>
                                    <div className="absolute top-full left-0 w-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-1">
                                            <Link href="/pricing" className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300">
                                                Pass
                                            </Link>
                                            <Link href="/pricing" className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300">
                                                Pass Pro
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About Us</Link>
                            </nav>
                        </div>

                        {/* 2. Middle: Search Bar (Hidden on mobile) */}
                        <div className="hidden md:flex flex-1 max-w-md relative group">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Search className="w-4 h-4 text-zinc-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search exams, mock tests..."
                                className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-blue-500/50 transition-all dark:text-zinc-200"
                            />
                        </div>

                        {/* 3. Right: Actions */}
                        <div className="flex items-center gap-3 sm:gap-4 shrink-0">

                            {/* Theme Toggle Button */}
                            <div className="hidden sm:block">
                                <ThemeToggle />
                            </div>

                            {isLoggedIn ? (
                                <UserMenu />
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="hidden sm:inline-flex items-center justify-center font-semibold text-sm text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/login?mode=signup"
                                        className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* WhatsApp Float Button */}
            <a
                href="https://wa.me/918000661414"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-90 group"
                title="Chat with us"
            >
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
                {/* Whatsapp Icon SVG */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M16.53 14.84C16.48 14.71 16.12 14.53 15.76 14.35C15.4 14.17 14.88 13.79 14.65 13.64C14.42 13.49 14.22 13.39 14.12 13.54C14.02 13.69 13.72 14.05 13.62 14.17C13.52 14.29 13.42 14.31 13.06 14.13C12.7 13.95 11.53 13.57 10.15 12.33C9.07 11.37 8.35 10.18 8.13 9.81C7.91 9.44 8.11 9.24 8.29 9.06C8.45 8.9 8.65 8.64 8.83 8.44C9 8.24 9.06 8.09 9.18 7.85C9.3 7.61 9.24 7.41 9.14 7.21C9.04 7.01 8.27 5.11 7.95 4.34C7.63 3.59 7.31 3.69 7.07 3.69C6.85 3.69 6.6 3.69 6.35 3.69C6.1 3.69 5.7 3.78 5.36 4.15C5.02 4.52 4.06 5.42 4.06 7.26C4.06 9.1 5.4 10.88 5.6 11.14C5.79 11.4 8.24 15.18 12 16.81C15 18.1 15.65 17.9 16.25 17.8C17.06 17.65 17.95 16.92 18.25 16.08C18.55 15.24 18.55 14.53 18.46 14.38C18.37 14.23 18.15 14.13 17.89 14.01" />
                </svg>
            </a>
        </>
    );
}
