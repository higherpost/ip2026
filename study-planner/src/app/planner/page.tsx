'use client';

import { useState, useEffect } from 'react';
import { generateStudyPlan } from "@/lib/planner";
import { format } from 'date-fns';
import { ProgressData, ConfidenceLevel } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import SyllabusTracker from '@/components/SyllabusTracker';
import Calendar from '@/components/Calendar';
import DayDetails from '@/components/DayDetails';
import ListView from '@/components/ListView';
import TopicSchedule from '@/components/TopicSchedule';

export default function PlannerPage() {
    const plan = generateStudyPlan();

    // State
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 0, 1));
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 0, 1));
    const [progress, setProgress] = useState<ProgressData>({});
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<'calendar' | 'list' | 'tracker' | 'table'>('calendar');
    const [trackerFilter, setTrackerFilter] = useState<'all' | 'completed' | 'overdue' | 'pending'>('all');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('progressData');
        if (saved) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProgress(JSON.parse(saved));
        }
        setMounted(true);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('progressData', JSON.stringify(progress));
        }
    }, [progress, mounted]);

    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
    const selectedPlanItem = plan.find(p => p.date === selectedDateStr);
    const progressRecord = progress[selectedDateStr];
    const isSelectedCompleted = !!progressRecord?.completed;

    const handleComplete = (confidence: ConfidenceLevel, dateOverride?: string) => {
        const targetDate = dateOverride || selectedDateStr;
        setProgress(prev => ({
            ...prev,
            [targetDate]: {
                completed: true,
                confidence,
                completedAt: new Date().toISOString()
            }
        }));
    };

    const handleUncomplete = (dateOverride?: string) => {
        const targetDate = dateOverride || selectedDateStr;
        const newProgress = { ...progress };
        delete newProgress[targetDate];
        setProgress(newProgress);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setCurrentMonth(date);
        // Don't auto-switch tab from List to Calendar, but close menu and reset filter
        setTrackerFilter('all');
        setMobileMenuOpen(false);
    };

    return (
        <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block h-screen sticky top-0 overflow-y-auto w-80 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <Sidebar
                    plan={plan}
                    progress={progress}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onFilterSelect={setTrackerFilter}
                />
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    {/* Drawer */}
                    <div className="relative bg-white dark:bg-zinc-900 h-full w-80 shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-200">
                        <Sidebar
                            plan={plan}
                            progress={progress}
                            activeTab={activeTab}
                            onTabChange={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }}
                            onFilterSelect={(f) => { setTrackerFilter(f); setMobileMenuOpen(false); }}
                        />
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Navbar
                    onSearch={() => { }}
                    plan={plan}
                    onSelectDate={handleDateSelect}
                    onMenuClick={() => setMobileMenuOpen(true)}
                />

                <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6 h-auto lg:h-full">
                        {/* Center Panel: Calendar/Tracker */}
                        <div className="xl:col-span-2 h-auto xl:h-full overflow-hidden rounded-xl flex flex-col">
                            <div className="flex-1 overflow-y-auto h-full min-h-[350px] md:min-h-[500px]">
                                {activeTab === 'calendar' && (
                                    <Calendar
                                        plan={plan}
                                        selectedDate={selectedDate}
                                        onSelectDate={handleDateSelect}
                                        progress={progress}
                                        currentMonth={currentMonth}
                                        onMonthChange={setCurrentMonth}
                                    />
                                )}
                                {activeTab === 'list' && (
                                    <ListView
                                        plan={plan}
                                        progress={progress}
                                        selectedDate={selectedDate}
                                        onSelectDate={handleDateSelect}
                                    />
                                )}
                                {activeTab === 'table' && (
                                    <TopicSchedule
                                        plan={plan}
                                        progress={progress}
                                    />
                                )}
                                {activeTab === 'tracker' && (
                                    <SyllabusTracker
                                        plan={plan}
                                        progress={progress}
                                        onComplete={handleComplete}
                                        onUncomplete={handleUncomplete}
                                        filter={trackerFilter}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Right Panel: Day Details */}
                        {/* Visible on mobile (stacked), visible on desktop (side) */}
                        <div className="xl:block xl:h-full overflow-hidden">
                            <div className="h-full overflow-y-auto min-h-[400px]">
                                <DayDetails
                                    date={selectedDate}
                                    planItem={selectedPlanItem}
                                    isCompleted={isSelectedCompleted}
                                    onComplete={handleComplete}
                                    onUncomplete={handleUncomplete}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
