"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface WriteArticleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function WriteArticleModal({ isOpen, onClose, onSuccess }: WriteArticleModalProps) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Preparation Strategy");
    const [exam, setExam] = useState("Inspector Posts (IP)");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    if (!isOpen) return null;

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
            alert("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);

        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        let authorName = "Aspirant";
        let authorRole = "Aspirant";

        if (match) {
            try {
                const decoded = decodeURIComponent(match[2]);
                const user = JSON.parse(decoded);
                authorName = user.name || "Aspirant";
                authorRole = user.role || "Aspirant";
            } catch (e) {
                console.error(e);
            }
        }

        const newPost = {
            id: Date.now(),
            title: title,
            description: content,
            author: authorName,
            role: authorRole,
            followers: "0",
            views: "0",
            answer: null,
            tags: [category, exam, "Community"],
            comments: [],
            createdAt: new Date().toISOString()
        };

        try {
            const res = await fetch('/api/community/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost)
            });

            if (res.ok) {
                setTitle("");
                setContent("");
                if (onSuccess) onSuccess();
                onClose();
            } else {
                alert("Failed to publish article. Please try again.");
            }
        } catch (e) {
            console.error("Failed to publish", e);
            alert("An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Share Your Experience</h2>
                    <button onClick={onClose} className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., My Strategy to Crack Inspector Posts Exam"
                            className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-zinc-50 dark:bg-zinc-800"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-zinc-50 dark:bg-zinc-800"
                            >
                                <option>Preparation Strategy</option>
                                <option>Exam Review</option>
                                <option>Success Story</option>
                                <option>Tips & Tricks</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Exam</label>
                            <select
                                value={exam}
                                onChange={(e) => setExam(e.target.value)}
                                className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-zinc-50 dark:bg-zinc-800"
                            >
                                <option>Inspector Posts (IP)</option>
                                <option>Postal Assistant (LGO)</option>
                                <option>GDS to MTS/Postman</option>
                                <option>PS Group 'B'</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Your Story</label>
                        <textarea
                            rows={6}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your detailed experience here..."
                            className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-zinc-50 dark:bg-zinc-800 resize-none"
                        ></textarea>
                    </div>
                </div>

                <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-b-2xl">
                    <button onClick={onClose} className="px-5 py-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium transition-colors">Cancel</button>
                    <button
                        onClick={handlePublish}
                        disabled={isSubmitting}
                        className="px-5 py-2 bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 rounded-lg font-bold shadow-lg shadow-zinc-500/10 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Publishing...' : 'Publish Article'}
                    </button>
                </div>
            </div>
        </div>
    );
}
