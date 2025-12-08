"use client";

import Link from "next/link";
import { ArrowLeft, Target, Lightbulb, CheckCircle2, MessageCircle, Check, Star, Youtube, Mail, Award } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors">
            {/* Header / Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-900 to-blue-900 dark:from-black dark:to-zinc-900 py-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white mb-6 animate-fade-in-up">
                        About <span className="text-yellow-400">Vidyālaya Academy</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Dedicated learning platform for Limited Departmental Competitive Examinations (LDCE) of the Department of Posts.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 md:p-12 border border-zinc-100 dark:border-zinc-800">
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                        <span className="font-bold text-blue-600 dark:text-blue-400">Vidyālaya Academy</span> is a dedicated learning platform created to support aspirants preparing for Limited Departmental Competitive Examinations (LDCE) of the Department of Posts. With a clear focus on quality, clarity, and reliability, we bring together all essential study tools in one place—so that every aspirant can prepare confidently at their own pace.
                    </p>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Rooted in traditional learning values yet built with modern technology, Vidyālaya Academy aims to make exam preparation simple, structured, and effective. Whether you are preparing for Inspector Posts or any other departmental examination, our resources are designed to guide you step-by-step towards success.
                    </p>
                </div>
            </div>

            {/* What We Offer Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 text-zinc-800 dark:text-zinc-100">
                        What We <span className="text-purple-600">Offer</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "MCQs & Practice Questions", desc: "Topic-wise and exam-oriented questions to strengthen conceptual understanding.", icon: MessageCircle, color: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20" },
                            { title: "Web Guide", desc: "Comprehensive notes covering rules, acts, manuals, procedures, and departmental references.", icon: Star, color: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20" },
                            { title: "Flash Cards", desc: "Quick revision tools to help you recall important points instantly.", icon: Youtube, color: "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20" },
                            { title: "PDF Notes", desc: "Compact and printable study material for focused preparation.", icon: Mail, color: "from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20" },
                            { title: "Study Planner", desc: "A smart organizing tool to help you plan and track your daily targets.", icon: Check, color: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" },
                            { title: "Mock Tests", desc: "Evaluate your preparation with full-length and topic-wise tests.", icon: Award, color: "from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20" }
                        ].map((item, idx) => (
                            <div key={idx} className={`group p-8 rounded-2xl bg-gradient-to-br ${item.color} border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                                <div className="mb-6 p-4 bg-white/60 dark:bg-black/20 rounded-full w-fit group-hover:scale-110 transition-transform shadow-sm">
                                    <item.icon className="w-8 h-8 text-zinc-700 dark:text-zinc-200" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">{item.title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Vision */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                <Target className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">Our Vision</h2>
                        </div>
                        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                            To become the most trusted and accessible self-study platform for all departmental aspirants across India, helping them learn systematically and achieve their career goals with confidence.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                                <Lightbulb className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">Our Mission</h2>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "To simplify complex postal rules and procedures through structured resources.",
                                "To provide aspirants with up-to-date, accurate, and exam-focused study material.",
                                "To support continuous learning through modern tools that work on both web and mobile.",
                                "To ensure every aspirant—irrespective of location or experience—gets equal access to quality content."
                            ].map((mission, idx) => (
                                <li key={idx} className="flex items-start gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                                    <span className="text-zinc-600 dark:text-zinc-300">{mission}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 opacity-20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

                    <h2 className="text-3xl md:text-4xl font-extrabold mb-8 relative z-10">Why Vidyālaya Academy?</h2>

                    <div className="space-y-6 text-lg md:text-xl text-blue-50 leading-relaxed relative z-10">
                        <p>
                            We understand the challenges faced by departmental aspirants. Long working hours, shifting duties, and limited time make consistent preparation difficult. <span className="font-bold text-white">Vidyālaya Academy</span> is built to bridge that gap—offering self-paced, anytime-anywhere learning that fits perfectly into your daily routine.
                        </p>
                        <p>
                            With expert-designed content and smart revision tools, we aim to make your preparation smoother, sharper, and more efficient.
                        </p>
                    </div>

                    <div className="mt-12 flex justify-center gap-4 flex-wrap relative z-10">
                        <Link href="/" className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                            Start Learning Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
