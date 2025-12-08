import { Newspaper, FileText, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function PostalUpdatesPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-blue-600 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Departmental Updates</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto mb-8">
                        Latest circulars, notifications, and orders relevant to the Department of Posts will be listed here.
                    </p>
                    <div className="animate-pulse flex flex-col gap-4 max-w-md mx-auto">
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6 mx-auto"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-4/6 mx-auto"></div>
                    </div>
                    <p className="text-sm text-zinc-400 mt-8">Coming Soon...</p>
                </div>
            </div>
        </div>
    );
}
