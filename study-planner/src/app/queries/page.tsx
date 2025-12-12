'use client';

import React, { useState, useEffect } from 'react';
import {
    Search,
    User,
    PenSquare,
    Star,
    BookOpen,
    Layout,
    FileText,
    MessageCircle
} from 'lucide-react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { WriteArticleModal } from '@/components/WriteArticleModal';
import { DMModal } from '@/components/DMModal';
import { PostItem } from '@/components/PostItem';

// Mock Data for Success Stories
const SUCCESS_STORIES_DATA = [
    {
        id: 101,
        title: "How I cleared Inspector Posts Exam 2023 in my first attempt - My Strategy",
        author: "Vikram Singh",
        role: "Inspector Posts",
        followers: "450",
        views: "5.2k",
        answer: {
            author: "Vikram Singh",
            role: "Inspector Posts",
            level: "Contributor-Level 10",
            avatar: "VS",
            content: "I started my preparation 6 months before the exam. My main focus was on P.O Guide Part I and Volume V as they form the base. \n\nFor Paper 2, I relied heavily on previous year question papers. \n\nTime management is key. I used to study 2 hours before office and 3 hours after office consistently.",
            upvotes: 210,
            comments: 45
        },
        tags: ["Success Story", "Preparation", "Motivation"]
    },
    {
        id: 102,
        title: "From GDS to PA: A journey of hard work and dedication",
        author: "Meera Patel",
        role: "Postal Assistant",
        followers: "320",
        views: "3.8k",
        answer: {
            author: "Meera Patel",
            role: "Postal Assistant",
            level: "Contributor-Level 7",
            avatar: "MP",
            content: "Being a GDS, it was tough to find time. But I utilized my lunch breaks for studying short topics. \n\nI made short notes for all the rules in Volume VI and VII. This helped me revise quickly during the last days.",
            upvotes: 156,
            comments: 28
        },
        tags: ["GDS to PA", "Success Story", "Inspiration"]
    }
];

// Mock Data for Feed
const FEED_DATA = [
    {
        id: 1,
        title: "Postal Manual Volume VII: What is the best strategy to memorize foreign post rules?",
        author: "Rakesh Sharma",
        role: "Aspirant",
        followers: "125",
        views: "1.2k",
        answer: {
            author: "Suresh Kumar",
            role: "Inspector Posts (2019 Batch)",
            level: "Contributor-Level 9",
            avatar: "SK",
            content: "The Foreign Post rules can be tricky. My suggestion is to first understand the definitions in Part I thoroughly. Focus on the distinction between 'Letter Post' and 'Parcel Post'. \n\nFor memorization: \n1. Create flowcharts for the routing process. \n2. Use flashcards for specific Article numbers. \n3. Don't try to memorize verbatim; understand the procedure. \n\nMost questions in Paper II come from the practical application of these rules rather than direct theory.",
            upvotes: 45,
            comments: 12
        },
        tags: ["Paper II", "Foreign Post", "Preparation Strategy"]
    },
    {
        id: 2,
        title: "Is there any change in the syllabus for LDCE 2026 regarding the new IT Modernization Project 2.0?",
        author: "Anjali Gupta",
        role: "GDS to PA Aspirant",
        followers: "89",
        views: "850",
        answer: {
            author: "Dak Guru Team",
            role: "Official Mentor",
            level: "Admin",
            avatar: "DG",
            content: "Yes, IT Modernization 2.0 is a crucial topic for the upcoming exams. While the core syllabus remains similar, expect more questions on: \n- DARPAN 2.0 implementation \n- McCamish System updates \n- Network connectivity standards \n\nWe have updated our 'Current Affairs' section with a dedicated PDF on IT 2.0. Please refer to that for detailed notes.",
            upvotes: 128,
            comments: 34
        },
        tags: ["Syllabus", "IT Modernization", "Exams"]
    },
    {
        id: 3,
        title: "How to balance office duty and study time for the IP Exam?",
        author: "Amit Verma",
        role: "Postal Assistant",
        followers: "302",
        views: "2.5k",
        answer: null, // Unanswered for demo
        tags: ["Time Management", "Advice"]
    }
];

const SidebarCard = ({ title, children, color = "orange" }: { title: string, children: React.ReactNode, color?: string }) => (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden mb-6">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className={`font-bold text-sm uppercase text-${color}-600 tracking-wide`}>{title}</h3>
        </div>
        <div className="p-4">
            {children}
        </div>
    </div>
);

export default function QueriesPage() {
    const [activeTab, setActiveTab] = useState("Home");
    const [questionInput, setQuestionInput] = useState("");
    const [detailsInput, setDetailsInput] = useState("");
    const [showDetailsInput, setShowDetailsInput] = useState(false);

    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [isDMModalOpen, setIsDMModalOpen] = useState(false);
    const [user, setUser] = useState<{ name: string; role?: string; email?: string } | null>(null);

    // Data State
    // Data State
    const [feedData, setFeedData] = useState<any[]>([]);
    const [savedPostIds, setSavedPostIds] = useState<number[]>([]);
    const [myQuestionIds, setMyQuestionIds] = useState<number[]>([]);

    const router = useRouter();

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/community/posts');
            if (res.ok) {
                const data = await res.json();
                setFeedData(data);
            }
        } catch (e) {
            console.error("Failed to fetch posts", e);
        }
    };

    useEffect(() => {
        fetchPosts();

        const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
        if (match) {
            try {
                const decoded = decodeURIComponent(match[2]);
                const userData = JSON.parse(decoded);
                setUser(userData);

                // Identify my questions based on user name (simple check for now)
                // In a real app, this would be based on user ID from the backend response
            } catch (e) {
                console.error("Failed to parse session", e);
            }
        }
    }, []);

    // Effect to filtering for "My Questions" - dependent on feedData and user
    useEffect(() => {
        if (user && feedData.length > 0) {
            const myIds = feedData.filter(p => p.author === user.name).map(p => p.id);
            setMyQuestionIds(myIds);
        }
    }, [user, feedData]);


    const checkAuthAndExecute = (action: () => void) => {
        if (user) {
            action();
        } else {
            const match = document.cookie.match(new RegExp('(^| )user_session=([^;]+)'));
            if (match) {
                action();
            } else {
                router.push('/login');
            }
        }
    };

    const handleAskQuestion = () => {
        checkAuthAndExecute(async () => {
            if (!questionInput.trim()) return;

            const newPost = {
                id: Date.now(),
                title: questionInput,
                author: user?.name || "Aspirant",
                role: user?.role || "Aspirant",
                followers: "0",
                views: "0",
                answer: null, // No answer yet
                description: detailsInput,
                tags: ["New", "Community"],
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
                    await fetchPosts();
                    setQuestionInput("");
                    setDetailsInput("");
                    setShowDetailsInput(false);
                    setActiveTab("Q&A Home");
                }
            } catch (e) {
                console.error("Failed to post question", e);
            }
        });
    };

    const handleSavePost = (id: number) => {
        checkAuthAndExecute(() => {
            setSavedPostIds(prev =>
                prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
            );
        });
    };

    const handleDeletePost = (id: number) => {
        if (confirm("Are you sure you want to delete this question?")) {
            fetch(`/api/community/posts/${id}`, { method: 'DELETE' })
                .then(res => {
                    if (res.ok) fetchPosts();
                })
                .catch(e => console.error("Failed to delete", e));
        }
    };

    const handleWriteReview = () => {
        checkAuthAndExecute(() => {
            setIsWriteModalOpen(true);
        });
    };

    const getFeedData = () => {
        if (activeTab === "Success Stories") {
            return SUCCESS_STORIES_DATA;
        }
        if (activeTab === "Unanswered Questions") {
            return feedData.filter(post => !post.answer);
        }
        if (activeTab === "My Questions") {
            return feedData.filter(post => myQuestionIds.includes(post.id));
        }
        if (activeTab === "Saved Answers") {
            return feedData.filter(post => savedPostIds.includes(post.id));
        }
        // "Q&A Home"
        return feedData;
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200">
            {/* Top Navigation Bar mimicking the style */}
            <div className="bg-white dark:bg-zinc-900 shadow-sm border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold text-lg tracking-tight border border-white/10 shadow-lg shadow-blue-500/20 group-hover:scale-105 group-hover:shadow-blue-500/30 transition-all duration-300">
                            DG
                        </div>
                        <span className="hidden md:block font-bold text-xl text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Dak Guru Community
                        </span>
                    </Link>

                    <div className="flex-1 max-w-2xl relative">
                        <input
                            type="text"
                            placeholder="Search Exams, Questions, Rules..."
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all hover:bg-white dark:hover:bg-zinc-900"
                        />
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                    </div>

                    <div className="flex items-center gap-4 text-sm font-medium">
                        {user ? (
                            <div className="hidden md:flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold">
                                    {user.name[0]}
                                </div>
                                <span className="font-semibold">{user.name}</span>
                            </div>
                        ) : (
                            <Link href="/login" className="hidden md:flex items-center gap-1 text-zinc-600 hover:text-blue-600 dark:text-zinc-400 transition-colors">
                                <User className="w-4 h-4" /> Login
                            </Link>
                        )}
                        <button
                            onClick={() => setIsDMModalOpen(true)}
                            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 transform flex items-center gap-2"
                        >
                            <MessageCircle className="w-4 h-4" /> DM to Admin
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Ask Question Box */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 transition-all hover:shadow-md">
                        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">Need guidance on Departmental Exams or Topics? <span className="text-zinc-500 font-normal text-base">Ask our experts</span></h2>

                        <div className="relative mt-4">
                            <textarea
                                value={questionInput}
                                onChange={(e) => setQuestionInput(e.target.value)}
                                className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-y bg-zinc-50 dark:bg-zinc-950 text-sm transition-all"
                                placeholder="Type Your Question here..."
                            />
                            <span className="absolute bottom-3 right-3 text-xs text-zinc-400">{questionInput.length}/140</span>
                        </div>

                        {showDetailsInput && (
                            <div className="relative mt-4 animate-in fade-in slide-in-from-top-2">
                                <textarea
                                    value={detailsInput}
                                    onChange={(e) => setDetailsInput(e.target.value)}
                                    className="w-full border border-zinc-300 dark:border-zinc-700 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-y bg-zinc-50 dark:bg-zinc-950 text-sm transition-all"
                                    placeholder="Add more details, context, or specific rules you are referring to..."
                                />
                            </div>
                        )}

                        <div className="mt-2 flex items-center justify-between">
                            <button
                                onClick={() => setShowDetailsInput(!showDetailsInput)}
                                className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1 hover:text-blue-700 transition-colors"
                            >
                                <PenSquare className="w-4 h-4" /> {showDetailsInput ? "Hide details" : "Add more details"}
                            </button>
                            <button
                                onClick={handleAskQuestion}
                                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 active:bg-orange-700 transition-colors shadow-sm"
                            >
                                Next
                            </button>
                        </div>
                        <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
                            <Star className="w-3 h-3" /> Keep it short & simple. Avoid abusive language.
                        </p>
                    </div>

                    {/* Feed Tabs */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="flex border-b border-zinc-200 dark:border-zinc-800">
                            {["Q&A Home", "Success Stories", "Unanswered Questions"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all ${activeTab === tab ? 'border-orange-500 text-orange-600 bg-orange-50 dark:bg-orange-900/10' : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {/* Simulated Feed Content */}
                            {getFeedData().length > 0 ? (
                                getFeedData().map((post) => (
                                    <PostItem
                                        key={post.id}
                                        post={post}
                                        onSave={handleSavePost}
                                        isSaved={savedPostIds.includes(post.id)}
                                        currentUser={user}
                                        onDelete={handleDeletePost}
                                        onRefresh={fetchPosts}
                                    />
                                ))
                            ) : (
                                <div className="p-12 text-center text-zinc-500">
                                    <p>No posts found in this section.</p>
                                    {activeTab === "My Questions" && <p className="text-sm mt-2">Ask a question to see it here!</p>}
                                    {activeTab === "Saved Answers" && <p className="text-sm mt-2">Save posts to access them quickly here.</p>}
                                </div>
                            )}

                            <div className="p-4 text-center">
                                <button className="text-blue-600 font-bold text-sm hover:underline hover:text-blue-700 transition-colors">View All Questions</button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Login/Welcome Widget */}
                    {user ? (
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-center text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 mx-auto bg-white text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-3 shadow-md">
                                    {user.name[0]}
                                </div>
                                <h3 className="font-bold text-lg mb-1">Welcome back, {user.name}!</h3>
                                <p className="text-blue-100 text-sm mb-4">Ready to help the community today?</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setActiveTab("My Questions")}
                                        className={`p-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "My Questions" ? "bg-white text-blue-600 font-bold" : "bg-white/20 hover:bg-white/30"}`}
                                    >
                                        My Questions
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("Saved Answers")}
                                        className={`p-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "Saved Answers" ? "bg-white text-blue-600 font-bold" : "bg-white/20 hover:bg-white/30"}`}
                                    >
                                        Saved Answers
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center border border-blue-100 dark:border-blue-800/30 transition-shadow hover:shadow-sm">
                            <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-2">Join the Dak Guru Community</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Register to get relevant Questions & Discussions on your feed regarding IP Exam 2026.</p>
                            <div className="flex gap-2 justify-center">
                                <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/30 hover:-translate-y-0.5">
                                    Login
                                </Link>
                                <Link href="/signup" className="bg-white hover:bg-zinc-50 text-blue-600 border border-blue-200 px-6 py-2 rounded-lg font-bold text-sm transition-all hover:shadow-sm hover:-translate-y-0.5">
                                    Register
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Web Resources Widget (Replaced Expert Panel) */}
                    <SidebarCard title="Dak Guru Resources" color="teal">
                        <div className="space-y-3">
                            <Link href="/planner" className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 group transition-colors cursor-pointer border border-transparent hover:border-teal-100">
                                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                                    <Layout className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-teal-700 transition-colors">Study Planner</p>
                                    <p className="text-xs text-zinc-500">Track your syllabus progress</p>
                                </div>
                            </Link>

                            <Link href="/guide" className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 group transition-colors cursor-pointer border border-transparent hover:border-teal-100">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <BookOpen className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-blue-700 transition-colors">Web Guide</p>
                                    <p className="text-xs text-zinc-500">Comprehensive reading material</p>
                                </div>
                            </Link>

                            <Link href="/notes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 group transition-colors cursor-pointer border border-transparent hover:border-teal-100">
                                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-red-700 transition-colors">PDF Notes</p>
                                    <p className="text-xs text-zinc-500">Downloadable study notes</p>
                                </div>
                            </Link>

                            <div className="mt-2 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-center">
                                <p className="text-xs text-zinc-400">More resources coming soon covering P.O Guide Part I, Volume V, and MNOP.</p>
                            </div>
                        </div>
                    </SidebarCard>

                    {/* Share Experience */}
                    <SidebarCard title="Share Your Experience" color="zinc">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                            Recently cleared a Departmental Exam? Share your preparation strategy and tips with fellow aspirants.
                        </p>
                        <button
                            onClick={handleWriteReview}
                            className="w-full bg-zinc-800 hover:bg-zinc-900 active:bg-black text-white py-3 rounded-lg font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Write a Review / Article
                        </button>
                    </SidebarCard>

                    {/* Trending Tags */}
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-shadow hover:shadow-sm">
                        <h3 className="font-bold text-sm text-zinc-400 uppercase tracking-wider mb-4">Trending Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {["#POGuidePart1", "#Volume5", "#MNOP", "#SBOrders", "#GDS_to_MTS", "#LeaveRules", "#LTC"].map(tag => (
                                <span key={tag} className="text-xs font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer transition-colors active:scale-95">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <WriteArticleModal isOpen={isWriteModalOpen} onClose={() => setIsWriteModalOpen(false)} />
            <DMModal isOpen={isDMModalOpen} onClose={() => setIsDMModalOpen(false)} user={user} />
        </div>
    );
}
