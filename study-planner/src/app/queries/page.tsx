import { MessageCircleQuestion, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QueriesPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-6">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-teal-600 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 text-center">
                    <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageCircleQuestion className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Queries and Answers</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto mb-8">
                        A dedicated space to ask questions, discuss topics, and find answers from experts and peers.
                    </p>
                    <div className="animate-pulse flex flex-col gap-4 max-w-md mx-auto">
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6 mx-auto"></div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-4/6 mx-auto"></div>
                    </div>
                    <p className="text-sm text-zinc-400 mt-8">Discussion Forum Coming Soon...</p>
                </div>
            </div>
        </div>
    );
}
