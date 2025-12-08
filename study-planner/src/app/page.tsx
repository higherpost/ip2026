import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, GraduationCap, BrainCircuit, LibraryBig } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50 selection:bg-blue-100 dark:selection:bg-blue-900/30">

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <div className="absolute inset-0 bg-grid-zinc-100/50 dark:bg-grid-zinc-800/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,1),rgba(0,0,0,0.4))] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Image src="/logo.jpg" alt="Vidyālaya Academy Logo" width={20} height={20} className="rounded-full" />
            <span>LDCE 2026 Preparation Portal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Vidyālaya Academy
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Founder : <span className="text-blue-600 dark:text-blue-400">Vidyā A</span>
          </p>
          <p className="text-zinc-400 dark:text-zinc-500 mb-12 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            Your comprehensive suite for mastering the Postal Inspector Examination.
            Detailed study plans, interactive quizzes, and expert resources.
          </p>

          <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
            <Link href="/planner" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-200 dark:shadow-blue-900/20 flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Start Planning
            </Link>
            <Link href="/guide" className="px-8 py-4 bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-bold rounded-full transition-all hover:scale-105 shadow-sm flex items-center gap-2">
              <LibraryBig className="w-5 h-5" /> View Guide
            </Link>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-16 text-zinc-800 dark:text-zinc-100">Everything you need to succeed</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Planner Card */}
          <Link href="/planner" className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm hover:shadow-xl dark:shadow-zinc-900/50 transition-all duration-300 border border-zinc-100 dark:border-zinc-800 hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Calendar className="w-32 h-32 text-blue-600 dark:text-blue-500" />
            </div>
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Study Planner</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Interactive calendar and list views mapped to the 2026 syllabus. Track your daily progress and never miss a topic.
            </p>
          </Link>

          {/* Quiz Card */}
          <Link href="/quiz" className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm hover:shadow-xl dark:shadow-zinc-900/50 transition-all duration-300 border border-zinc-100 dark:border-zinc-800 hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <BrainCircuit className="w-32 h-32 text-purple-600 dark:text-purple-500" />
            </div>
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Quiz Zone</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Test your knowledge with topic-wise quizzes. Instant feedback and performance tracking for Paper I, II & III.
            </p>
          </Link>

          {/* Flashcards Card */}
          <Link href="/flashcards" className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm hover:shadow-xl dark:shadow-zinc-900/50 transition-all duration-300 border border-zinc-100 dark:border-zinc-800 hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <BookOpen className="w-32 h-32 text-orange-600 dark:text-orange-500" />
            </div>
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Flashcards</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Quick revision tool for Act sections, Rule numbers, and key definitions. Perfect for last-minute review.
            </p>
          </Link>

          {/* Syllabus Card */}
          <Link href="/planner" className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm hover:shadow-xl dark:shadow-zinc-900/50 transition-all duration-300 border border-zinc-100 dark:border-zinc-800 hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <GraduationCap className="w-32 h-32 text-emerald-600 dark:text-emerald-500" />
            </div>
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Syllabus Tracker</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Complete breakdown of the syllabus into manageable chunks. Visualize your mastery over the entire curriculum.
            </p>
          </Link>

          {/* Guide Card */}
          <Link href="/guide" className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm hover:shadow-xl dark:shadow-zinc-900/50 transition-all duration-300 border border-zinc-100 dark:border-zinc-800 hover:-translate-y-1 md:col-span-2 lg:col-span-2">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <LibraryBig className="w-32 h-32 text-pink-600 dark:text-pink-500" />
            </div>
            <div className="w-14 h-14 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-pink-600 dark:text-pink-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <LibraryBig className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Web Guide & Resources</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg">
              Curated study materials, previous year question papers, and official department manuals for download. Your library for success.
            </p>
          </Link>

        </div>
      </div>

      <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 py-12 text-center">
        <p className="text-zinc-400 dark:text-zinc-500 text-sm">© 2025 Vidyālaya Academy by Arun Selvaraj. All rights reserved.</p>
      </footer>
    </div>
  );
}
