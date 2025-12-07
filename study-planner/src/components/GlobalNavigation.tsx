"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";

export default function GlobalNavigation() {
    const pathname = usePathname();

    if (pathname === "/login") return null;

    return (
        <div className="fixed top-4 right-4 z-[100] flex items-center gap-3">
            <Link
                href="/"
                className="p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-blue-600 hover:border-blue-200 dark:hover:text-blue-400 transition-all shadow-sm group"
                title="Go to Home"
            >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full shadow-sm">
                <ThemeToggle />
            </div>
        </div>
    );
}
