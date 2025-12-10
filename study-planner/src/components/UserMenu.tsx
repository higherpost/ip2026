"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Laptop,
    Moon,
    Sun,
    LayoutDashboard,
    User,
    PlusCircle,
    Keyboard,
    Home as HomeIcon,
    LogOut,
    Shield,
    BarChart3,
    Bookmark
} from "lucide-react";

interface UserSession {
    name: string;
    email?: string;
    role?: 'user' | 'admin';
    membershipLevel?: 'free' | 'silver' | 'gold';
}

export function UserMenu() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const [session, setSession] = useState<UserSession | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        // Parse cookie for basic session info
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const decoded = decodeURIComponent(match[2]);
                setSession(JSON.parse(decoded));
            } catch (e) {
                console.error("Failed to parse session", e);
            }
        }
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    if (!mounted) return null;

    if (!session) {
        return (
            <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
            >
                Log In
            </button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-full ring-offset-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all hover:opacity-80">
                    <Avatar className="h-9 w-9 border border-zinc-200 dark:border-zinc-700">
                        <AvatarImage src="/user-avatar.png" className="object-cover" />
                        <AvatarFallback>{session?.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
                {/* User Stats/Info Header */}
                <div className="flex flex-col space-y-1 p-2">
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-sm leading-none">{session?.name || 'Guest User'}</p>
                        {session?.membershipLevel && session.membershipLevel !== 'free' && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${session.membershipLevel === 'gold'
                                ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800'
                                : 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800/50 dark:text-slate-200 dark:border-slate-700'
                                }`}>
                                {session.membershipLevel}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-none">
                        {session?.email || 'user@example.com'}
                    </p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push('/planner')}>
                        <LayoutDashboard className="mr-2 h-4 w-4 text-zinc-500" />
                        <span>Dashboard</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => router.push('/quiz/results')}>
                        <BarChart3 className="mr-2 h-4 w-4 text-zinc-500" />
                        <span>My Progress</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => router.push('/bookmarks')}>
                        <Bookmark className="mr-2 h-4 w-4 text-zinc-500" />
                        <span>Bookmarks</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => router.push('/settings')}>
                        <User className="mr-2 h-4 w-4 text-zinc-500" />
                        <span>Account Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {/* Custom Theme Switcher Row */}
                    <div className="flex items-center justify-between px-2 py-2 text-sm">
                        <span className="flex items-center text-zinc-700 dark:text-zinc-300">
                            <span className="inline-block mr-2"><Moon className="h-4 w-4 text-zinc-500" /></span>
                            Themes
                        </span>
                        <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700">
                            <button
                                onClick={() => setTheme("system")}
                                className={`p-1 rounded-full transition-all ${theme === 'system' ? 'bg-white dark:bg-zinc-600 shadow-sm text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
                                title="System"
                            >
                                <Laptop className="h-3.5 w-3.5" />
                            </button>
                            <button
                                onClick={() => setTheme("light")}
                                className={`p-1 rounded-full transition-all ${theme === 'light' ? 'bg-white dark:bg-zinc-600 shadow-sm text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
                                title="Light"
                            >
                                <Sun className="h-3.5 w-3.5" />
                            </button>
                            <button
                                onClick={() => setTheme("dark")}
                                className={`p-1 rounded-full transition-all ${theme === 'dark' ? 'bg-white dark:bg-zinc-600 shadow-sm text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
                                title="Dark"
                            >
                                <Moon className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => router.push('/')}>
                    <HomeIcon className="mr-2 h-4 w-4 text-zinc-500" />
                    <span>Home Page</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout} className="text-red-500 dark:text-red-400 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-900/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <div className="p-2 space-y-2">
                    {session?.role === 'admin' && (
                        <button
                            onClick={() => router.push('/admin')}
                            className="w-full flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-semibold py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                        >
                            <Shield className="w-4 h-4" />
                            <span>Admin Panel</span>
                        </button>
                    )}

                    {(!session?.membershipLevel || session.membershipLevel === 'free') && (
                        <button
                            onClick={() => router.push('/pricing')}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 text-white dark:text-zinc-900 text-sm font-semibold py-2 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            <span>Upgrade to Pro</span>
                        </button>
                    )}
                </div>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}
