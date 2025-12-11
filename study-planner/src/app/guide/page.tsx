import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8 transition-colors">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <div className="max-w-4xl mx-auto text-center py-20">
                <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">Web Guide</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    <Link href="/guide/frsr" className="group block bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-blue-600 transition-colors">FR SR Guide</h2>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Master Fundamental Rules & Supplementary Rules with our interactive digital dashboard. Visual flows, search, and organized chapters.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
