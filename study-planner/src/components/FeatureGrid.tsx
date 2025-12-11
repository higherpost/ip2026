"use client";

import Link from "next/link";
import { CheckCircle2, Layout, BookOpen, Zap, FileText, Newspaper, Mail, Lock, Unlock, FileQuestion, MessageCircleQuestion } from "lucide-react";
import { useRouter } from "next/navigation";

interface FeatureGridProps {
    membershipLevel: string;
}

export default function FeatureGrid({ membershipLevel }: FeatureGridProps) {
    const router = useRouter();

    // Helper to check access
    const hasAccess = (requiredBadge: string) => {
        if (requiredBadge === "Free") return true;
        if (requiredBadge === "Silver" && (membershipLevel === "silver" || membershipLevel === "gold")) return true;
        if (requiredBadge === "Gold" && membershipLevel === "gold") return true;
        return false;
    };

    const features = [
        { title: "MCQs", desc: "Practice Questions", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "group-hover:border-emerald-500", shadow: "group-hover:shadow-emerald-500/20", icon: CheckCircle2, link: "/quiz", badge: "Silver" },
        { title: "Study Planner", desc: "Organize Learning", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20", border: "group-hover:border-violet-500", shadow: "group-hover:shadow-violet-500/20", icon: Layout, link: "/planner", badge: "Free" },
        { title: "Web Guide", desc: "Comprehensive Resources", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", border: "group-hover:border-blue-500", shadow: "group-hover:shadow-blue-500/20", icon: BookOpen, link: "/guide", badge: "Free" },
        { title: "Flash Cards", desc: "Quick Revision", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", border: "group-hover:border-amber-500", shadow: "group-hover:shadow-amber-500/20", icon: Zap, link: "/flashcards", badge: "Silver" },
        { title: "PDF Notes", desc: "Downloadable Content", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20", border: "group-hover:border-rose-500", shadow: "group-hover:shadow-rose-500/20", icon: FileText, link: "/notes", badge: "Gold" },
        { title: "Current Affairs", desc: "Daily News & Updates", color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20", border: "group-hover:border-indigo-500", shadow: "group-hover:shadow-indigo-500/20", icon: Newspaper, link: "/current-affairs", badge: "Free" },
        { title: "Postal Updates", desc: "Circulars & Orders", color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-900/20", border: "group-hover:border-pink-500", shadow: "group-hover:shadow-pink-500/20", icon: Mail, link: "/postal-updates", badge: "Free" },
        { title: "PYQ Papers", desc: "Previous Years", color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-900/20", border: "group-hover:border-cyan-500", shadow: "group-hover:shadow-cyan-500/20", icon: FileQuestion, link: "/pyq", badge: "Silver" },
        { title: "Dak Gyan Community", desc: "Ask & Discuss", color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-900/20", border: "group-hover:border-teal-500", shadow: "group-hover:shadow-teal-500/20", icon: MessageCircleQuestion, link: "/queries", badge: "Free", className: "col-span-2 lg:col-start-2 aspect-[2.5/1]" }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {features.map((item, idx) => {
                const isUnlocked = hasAccess(item.badge);
                // @ts-ignore
                const customClass = item.className || 'aspect-[4/3] sm:aspect-square';

                return (
                    <Link
                        key={idx}
                        href={isUnlocked ? item.link : "/pricing"}
                        className={`group relative block w-full ${customClass} ${!isUnlocked ? 'cursor-not-allowed' : ''}`}
                        onClick={(e) => {
                            if (!isUnlocked) {
                                e.preventDefault();
                                // You can trigger a modal here instead if you want
                                // For now, let it fall through to the href='/pricing' or just block
                                router.push("/pricing");
                            }
                        }}
                    >
                        <div className={`relative h-full w-full rounded-2xl md:rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 border-b-4 ${item.border} transition-all duration-300 ease-out shadow-sm ${isUnlocked ? `hover:shadow-xl ${item.shadow} hover:-translate-y-1` : 'opacity-80 grayscale-[0.5]'} overflow-hidden group-hover:border-b-4`}>

                            {/* Badge & Lock Icon */}
                            <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                                {/* Lock Status */}
                                <div className={`p-1.5 rounded-full shadow-sm backdrop-blur-sm ${isUnlocked ? 'bg-green-100/80 text-green-700' : 'bg-zinc-100/80 text-zinc-500'}`}>
                                    {isUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                </div>

                                {item.badge && (
                                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm ${item.badge === 'Free' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' :
                                        item.badge === 'Silver' ? 'bg-gradient-to-r from-slate-200 to-zinc-300 text-slate-800 border border-slate-300' :
                                            'bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 dark:from-amber-700 dark:to-yellow-600 dark:text-amber-100 border border-amber-300'
                                        }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            {/* Background decoration */}
                            <div className={`absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 ${item.bg} rounded-bl-[60px] md:rounded-bl-[100px] opacity-60 transition-transform duration-500 group-hover:scale-150`}></div>

                            {/* Content Overlay when Locked */}
                            {/* Content Overlay when Locked */}
                            {!isUnlocked && (
                                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/95 dark:bg-zinc-950/90 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 p-4">
                                    <div className={`
                                        w-full py-2.5 rounded-full font-bold text-xs md:text-sm shadow-xl transform hover:scale-105 transition-transform flex items-center justify-center gap-2 animate-pulse
                                        ${item.badge === 'Gold'
                                            ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-amber-900 border border-amber-200'
                                            : 'bg-gradient-to-r from-slate-200 via-zinc-300 to-slate-400 text-slate-900 border border-slate-300'}
                                    `}>
                                        <Lock className="w-4 h-4" />
                                        <span>Upgrade to {item.badge}</span>
                                    </div>
                                    <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-2 text-center leading-tight">
                                        Click to unlock this feature
                                    </p>
                                </div>
                            )}

                            <div className="relative h-full flex flex-col items-center justify-center p-3 md:p-6 text-center z-10 transition-transform duration-300">
                                <div className={`mb-2 md:mb-4 p-3 md:p-4 rounded-xl md:rounded-2xl ${item.bg} ${item.color} shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    <item.icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
                                </div>

                                <h3 className="text-sm md:text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-1 leading-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors hidden sm:block">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
