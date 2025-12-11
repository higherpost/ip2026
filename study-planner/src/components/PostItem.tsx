"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { Users, MessageSquare, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const PostItem = ({ post }: { post: any }) => {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [showCommentsList, setShowCommentsList] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [commentText, setCommentText] = useState("");
    const router = useRouter();

    const checkAuthAndExecute = (action: () => void) => {
        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            action();
        } else {
            router.push('/login');
        }
    };

    const handleCommentClick = () => {
        checkAuthAndExecute(() => setShowCommentBox(!showCommentBox));
    };

    const handlePostComment = () => {
        checkAuthAndExecute(() => {
            // Logic to post comment would go here
            console.log("Posting comment:", commentText);
            setCommentText("");
            setShowCommentBox(false); // Close box after "posting" logic (simulated)
        });
    }

    const toggleCommentsList = () => {
        // Toggle mock comments list
        setShowCommentsList(!showCommentsList);
    };

    return (
        <div className="p-6 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 text-left">
            {/* Tags */}
            <div className="flex gap-2 mb-3">
                {post.tags.map((tag: string) => (
                    <span key={tag} className="text-xs font-semibold px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer transition-colors">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Question */}
            <Link href="#" className="block group">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                </h3>
            </Link>

            {/* Post Author Info */}
            <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{post.author}</span>
                <span className="text-zinc-400">•</span>
                <span className="text-zinc-500">{post.role}</span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {post.followers} Followers</span>
                <span>•</span>
                <span>{post.views} Views</span>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={handleCommentClick}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm shadow-blue-500/30"
                >
                    <MessageSquare className="w-4 h-4" /> Comment
                </button>
            </div>

            {/* Comment Box */}
            {showCommentBox && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-900"
                        />
                        <button
                            onClick={handlePostComment}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
                        >
                            Post
                        </button>
                    </div>
                </div>
            )}

            {/* Answer Section */}
            {post.answer && (
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-4 border border-zinc-100 dark:border-zinc-800 relative hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors">
                    {/* Triangle pointer */}
                    <div className="absolute -top-2 left-8 w-4 h-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-l border-zinc-100 dark:border-zinc-800 transform rotate-45"></div>

                    <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                            {post.answer.avatar}
                        </div>
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{post.answer.author}</span>
                                <span className="text-xs text-orange-500 font-medium">{post.answer.level}</span>
                            </div>
                        </div>
                    </div>

                    <div className={`text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line mb-3 transition-all ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {post.answer.content}
                    </div>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-600 text-xs font-bold hover:underline mb-2 block"
                    >
                        {isExpanded ? 'Show less' : '...more'}
                    </button>

                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700/50">
                        <button className="flex items-center gap-1 text-zinc-500 hover:text-blue-600 text-xs transition-colors">
                            <ThumbsUp className="w-4 h-4" /> {post.answer.upvotes}
                        </button>
                        <span className="text-zinc-300 text-xs">|</span>
                        <button
                            onClick={toggleCommentsList}
                            className="text-zinc-500 hover:text-blue-600 text-xs text-center transition-colors hover:underline"
                        >
                            {post.answer.comments} Comments
                        </button>
                    </div>

                    {/* Mock Comments List */}
                    {showCommentsList && (
                        <div className="mt-4 space-y-3 pl-4 border-l-2 border-zinc-200 dark:border-zinc-700 animate-in fade-in duration-300">
                            <div className="text-xs">
                                <span className="font-bold text-zinc-900 dark:text-zinc-100">Arun Kumar</span>
                                <span className="text-zinc-500 ml-2">Very helpful explanation, thank you sir!</span>
                            </div>
                            <div className="text-xs">
                                <span className="font-bold text-zinc-900 dark:text-zinc-100">Priya Singh</span>
                                <span className="text-zinc-500 ml-2">Can you elaborate on Article 15 mock questions?</span>
                            </div>
                            <div className="text-xs text-blue-600 cursor-pointer hover:underline">
                                View all {post.answer.comments} comments
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
