"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { Users, MessageSquare, ThumbsUp, Bookmark, Trash2, Pencil, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const PostItem = ({ post, onSave, isSaved, currentUser, onDelete, onRefresh }: { post: any, onSave?: (id: number) => void, isSaved?: boolean, currentUser?: any, onDelete?: (id: number) => void, onRefresh?: () => void }) => {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [showCommentsList, setShowCommentsList] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [commentText, setCommentText] = useState("");
    const router = useRouter();

    const displayComments = post.comments || [];

    // Comment Edit State
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState("");

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
        checkAuthAndExecute(async () => {
            if (!commentText.trim()) return;

            let authorName = "User";
            // Use current user from props or fallback to cookie (in case prop is stale/missing, though props update on refresh)
            if (currentUser) {
                authorName = currentUser.name;
            } else {
                const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
                if (match) {
                    try {
                        const decoded = decodeURIComponent(match[2]);
                        const user = JSON.parse(decoded);
                        authorName = user.name || "User";
                    } catch (e) {
                        console.error(e);
                    }
                }
            }

            const newComment = {
                id: Date.now(),
                author: authorName,
                text: commentText,
                timestamp: new Date().toLocaleDateString()
            };

            try {
                const res = await fetch('/api/community/comments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ postId: post.id, comment: newComment })
                });

                if (res.ok) {
                    setCommentText("");
                    if (onRefresh) onRefresh();
                }
            } catch (e) {
                console.error("Failed to post comment", e);
            }
        });
    }

    const handleDeleteComment = (commentId: number) => {
        checkAuthAndExecute(async () => {
            if (confirm("Delete this comment?")) {
                try {
                    const res = await fetch(`/api/community/comments?postId=${post.id}&commentId=${commentId}`, {
                        method: 'DELETE'
                    });
                    if (res.ok && onRefresh) onRefresh();
                } catch (e) { console.error(e); }
            }
        });
    };

    const startEditComment = (comment: any) => {
        setEditingCommentId(comment.id);
        setEditingText(comment.text);
    };

    const cancelEditComment = () => {
        setEditingCommentId(null);
        setEditingText("");
    };

    const saveEditComment = (commentId: number) => {
        checkAuthAndExecute(async () => {
            if (!editingText.trim()) return;

            try {
                const res = await fetch('/api/community/comments', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ postId: post.id, commentId, text: editingText })
                });
                if (res.ok) {
                    setEditingCommentId(null);
                    setEditingText("");
                    if (onRefresh) onRefresh();
                }
            } catch (e) { console.error(e); }
        });
    };

    const toggleCommentsList = () => {
        setShowCommentsList(!showCommentsList);
    };

    const [likesCount, setLikesCount] = useState(post.likes || 0);
    const [hasLiked, setHasLiked] = useState<boolean>(() => {
        if (!currentUser || !post.likedBy) return false;
        return post.likedBy.includes(currentUser.name);
    });

    const handleLike = () => {
        checkAuthAndExecute(async () => {
            // Optimistic update
            const newHasLiked = !hasLiked;
            setHasLiked(newHasLiked);
            setLikesCount(prev => newHasLiked ? prev + 1 : prev - 1);

            try {
                const res = await fetch(`/api/community/posts/${post.id}/like`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: currentUser?.name || "User" })
                });

                if (!res.ok) {
                    // Revert if failed
                    setHasLiked(!newHasLiked);
                    setLikesCount(prev => !newHasLiked ? prev + 1 : prev - 1);
                }
            } catch (e) {
                console.error("Failed to toggle like", e);
                setHasLiked(!newHasLiked);
                setLikesCount(prev => !newHasLiked ? prev + 1 : prev - 1);
            }
        });
    };

    // ... (rest of the file)

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
                {post.description && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 whitespace-pre-line">{post.description}</p>
                )}
            </Link>

            {/* Post Author Info */}
            <div className="flex items-center gap-2 mb-2 text-xs">
                {/* Avatar for Post Author */}
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-[10px] border border-blue-200 dark:border-blue-800">
                    {post.author ? post.author[0].toUpperCase() : 'U'}
                </div>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{post.author}</span>
                <span className="text-zinc-400">•</span>
                <span className="text-zinc-500">{post.role}</span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4 ml-8">
                {/* Removed Followers */}
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

                <button
                    onClick={handleLike}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium transition-colors shadow-sm ${hasLiked ? 'bg-pink-100 text-pink-600 border border-pink-200' : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
                >
                    <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-pink-600' : ''}`} /> {likesCount > 0 ? likesCount : 'Like'}
                </button>

                <button
                    onClick={() => onSave && onSave(post.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium transition-colors shadow-sm ${isSaved ? 'bg-orange-100 text-orange-600' : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
                >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-orange-600' : ''}`} /> {isSaved ? 'Saved' : 'Save'}
                </button>

                {(currentUser?.role === 'admin' || currentUser?.name === post.author) && (
                    <button
                        onClick={() => onDelete && onDelete(post.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded text-sm font-medium hover:bg-red-100 transition-colors shadow-sm ml-auto"
                        title="Delete Question"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Comment Box and Local Comments */}
            {showCommentBox && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex gap-2 items-start">
                        {/* Avatar for Current User in Input */}
                        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-xs shrink-0 mt-1">
                            {currentUser?.name ? currentUser.name[0].toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1 flex gap-2">
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

                    {/* Display Comments */}
                    {displayComments.length > 0 && (
                        <div className="mt-4 space-y-4 pl-2">
                            {displayComments.map((comment: any) => (
                                <div key={comment.id} className="flex gap-3 group/comment">
                                    {/* Avatar for Comment Author */}
                                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xs shrink-0 border border-purple-200 dark:border-purple-800">
                                        {comment.author ? comment.author[0].toUpperCase() : 'U'}
                                    </div>

                                    <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg rounded-tl-none">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{comment.author}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-zinc-400 text-[10px]">{comment.timestamp}</span>
                                                {(currentUser?.role === 'admin' || currentUser?.name === comment.author) && !editingCommentId && (
                                                    <div className="flex gap-1 opacity-0 group-hover/comment:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => startEditComment(comment)}
                                                            className="text-zinc-400 hover:text-blue-500 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteComment(comment.id)}
                                                            className="text-zinc-400 hover:text-red-500 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {editingCommentId === comment.id ? (
                                            <div className="flex gap-2 items-center mt-1">
                                                <input
                                                    type="text"
                                                    value={editingText}
                                                    onChange={(e) => setEditingText(e.target.value)}
                                                    className="flex-1 text-xs border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1 bg-white dark:bg-zinc-900"
                                                    autoFocus
                                                />
                                                <button onClick={() => saveEditComment(comment.id)} className="text-green-600 hover:text-green-700">
                                                    <Check className="w-3 h-3" />
                                                </button>
                                                <button onClick={cancelEditComment} className="text-red-600 hover:text-red-700">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{comment.text}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
