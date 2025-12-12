"use client";

import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";

export default function GlobalNavigation() {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";

    if (pathname === "/") return null;

    return (
        <div className="fixed top-4 right-4 z-[100] flex items-center gap-3">
            <Link
                href="/"
                className="p-1.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 rounded-full hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm group overflow-hidden"
                title="Back to Home"
            >
                <Image src="/dak-guru-new-logo.png" alt="Logo" width={32} height={32} className="rounded-full w-8 h-8 object-cover group-hover:scale-110 transition-transform" />
            </Link>

            <div className="shadow-sm rounded-full">
                <ThemeToggle />
            </div>

            {!isLoginPage && (
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full shadow-sm">
                    <UserMenu />
                </div>
            )}
        </div>
    );
}
