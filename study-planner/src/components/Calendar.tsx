'use client';
import { PlanItem, ProgressData } from '@/lib/types';
import {
    format, startOfMonth, endOfMonth, eachDayOfInterval,
    startOfWeek, endOfWeek, isSameMonth, addMonths, subMonths, isSameDay
} from 'date-fns';
import { ChevronLeft, ChevronRight, Check, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface CalendarProps {
    plan: PlanItem[];
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    progress: ProgressData;
    currentMonth: Date;
    onMonthChange: (date: Date) => void;
}

export default function Calendar({
    plan,
    selectedDate,
    onSelectDate,
    progress,
    currentMonth,
    onMonthChange
}: CalendarProps) {

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    const getDayPlan = (date: Date) => {
        return plan.find(p => p.date === format(date, 'yyyy-MM-dd'));
    };

    const nextMonth = () => onMonthChange(addMonths(currentMonth, 1));
    const prevMonth = () => onMonthChange(subMonths(currentMonth, 1));

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 p-6 h-full flex flex-col transition-colors">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                    {format(currentMonth, 'MMMM yyyy')}
                </h2>
                <div className="flex gap-1">
                    <button
                        onClick={prevMonth}
                        className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 mb-2">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="text-center text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 auto-rows-fr flex-1">
                {calendarDays.map(day => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const item = getDayPlan(day);
                    const isMonth = isSameMonth(day, monthStart);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);

                    const record = progress[dateStr];
                    const isCompleted = !!record?.completed;
                    const confidence = record?.confidence;

                    return (
                        <div
                            key={day.toISOString()}
                            onClick={() => onSelectDate(day)}
                            className={cn(
                                "min-h-[60px] md:min-h-[100px] border-t border-r border-zinc-100 dark:border-zinc-800 p-1 md:p-2 relative cursor-pointer transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50 group",
                                "border-[0.5px] border-zinc-100 dark:border-zinc-800",
                                isSelected && "ring-2 ring-blue-500 dark:ring-blue-400 z-10 bg-blue-50/10 dark:bg-blue-900/10",
                                !isMonth && "bg-zinc-50/30 dark:bg-zinc-800/20 text-zinc-300 dark:text-zinc-700"
                            )}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={cn(
                                    "text-[10px] md:text-xs font-medium block",
                                    isSelected ? "text-blue-600 dark:text-blue-400" : "text-zinc-500 dark:text-zinc-400"
                                )}>
                                    {format(day, 'd')}
                                </span>
                                {isCompleted && (
                                    <div className={cn(
                                        "rounded-full p-0.5",
                                        confidence === 'low' ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                    )}>
                                        {confidence === 'low' ? <AlertCircle className="w-2 h-2 md:w-3 md:h-3" /> : <Check className="w-2 h-2 md:w-3 md:h-3" />}
                                    </div>
                                )}
                            </div>

                            {item && (
                                <div className={cn(
                                    "px-1 py-0.5 md:px-1.5 md:py-1 rounded-sm text-[8px] md:text-[9px] font-medium leading-tight line-clamp-2 md:line-clamp-3 transition-opacity border-l-[1.5px] md:border-l-2",
                                    isCompleted && "opacity-60 grayscale-[0.5]",

                                    item.type === 'revision' ? "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-400 dark:border-orange-700" :
                                        item.type === 'mock' ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-400 dark:border-purple-700" :
                                            item.type === 'practice' ? "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-400 dark:border-teal-700" :
                                                item.type === 'heavy' ? "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 border-blue-600 dark:border-blue-500" :
                                                    "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-400 dark:border-blue-600",


                                    // Override if low confidence done
                                    isCompleted && confidence === 'low' && "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-500 dark:border-red-600",
                                    isCompleted && confidence === 'high' && "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border-emerald-500 dark:border-emerald-600"

                                )}>
                                    <span className="hidden md:inline">{item.title}</span>
                                    <span className="md:hidden">{item.title.substring(0, 15)}{item.title.length > 15 ? '...' : ''}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div >
    );
}
