import { Search, Clock, CalendarDays, ArrowRight, Menu, Home } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { PlanItem } from "@/lib/types";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";

interface NavbarProps {
    onSearch: (query: string) => void;
    plan: PlanItem[];
    onSelectDate: (date: Date) => void;
    onMenuClick?: () => void;
}

export default function Navbar({ plan, onSelectDate, onMenuClick }: NavbarProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<PlanItem[]>([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);

        if (val.length > 2) {
            const lower = val.toLowerCase();
            // Find all matches
            const matches = plan.filter(p =>
                p.title.toLowerCase().includes(lower) && p.type !== 'revision'
            );
            setResults(matches);
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    };

    const handleResultClick = (item: PlanItem) => {
        onSelectDate(parseISO(item.date));
        setShowResults(false);
        setQuery(""); // Optional: clear or keep
    };

    return (
        <nav className="flex items-center justify-between px-4 md:px-6 py-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors shrink-0" ref={searchRef}>
            <div className="flex flex-1 items-center gap-4 max-w-3xl mr-auto md:mr-8 relative">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 lg:hidden"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Branding */}
                <Link href="/" className="flex items-center gap-2 shrink-0 mr-2 md:mr-4">
                    <div className="relative w-8 h-8 overflow-hidden rounded">
                        <Image src="/dak-guru-new-logo.png" alt="Dak Guru" fill className="object-cover" />
                    </div>
                    <span className="hidden md:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        Dak Guru
                    </span>
                </Link>

                <div className="relative z-20 flex-1 max-w-lg hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                    <input
                        type="text"
                        value={query}
                        placeholder="Search topic (e.g., PMLA, IT Act)..."
                        className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                        onChange={handleInput}
                    />
                </div>

                {/* Mobile Search Toggle */}
                <div className="md:hidden ml-auto mr-4 relative">
                    <button onClick={() => setShowResults(!showResults)} className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-lg">
                        <Search className="w-5 h-5" />
                    </button>
                    {showResults && (
                        <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-800 p-2 z-[100]">
                            <input
                                type="text"
                                autoFocus
                                value={query}
                                placeholder="Search..."
                                className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm mb-2"
                                onChange={handleInput}
                            />
                            {results.length > 0 && (
                                <div className="max-h-[300px] overflow-y-auto space-y-1">
                                    {results.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleResultClick(item)}
                                            className="w-full text-left p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-sm truncate"
                                        >
                                            {item.title}
                                            <span className="block text-[10px] text-zinc-400">{item.date}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Search Results Dropdown (Desktop) */}
                {/* Search Results Dropdown (Desktop) */}
                {showResults && results.length > 0 && query.length > 0 && (
                    <div className="hidden md:block absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-800 max-h-[400px] overflow-y-auto z-[100] p-2">
                        <div className="px-3 py-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider sticky top-0 bg-white dark:bg-zinc-900">
                            Found {results.length} Study Slots
                        </div>
                        <div className="space-y-1">
                            {results.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleResultClick(item)}
                                    className="w-full text-left p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg group transition-colors flex items-start justify-between gap-4"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 font-sans">{item.title}</p>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                                            <CalendarDays className="w-3 h-3" />
                                            <span>{format(parseISO(item.date), 'EEE, MMM d, yyyy')}</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 mt-1 opacity-0 group-hover:opacity-100 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <Link
                    href="/"
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:block"
                >
                    Home
                </Link>
                <UserMenu />
            </div>
        </nav >
    );
}
