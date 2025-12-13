import { PlanItem, ProgressData } from "@/lib/types";
import { format, parseISO, isPast, isToday } from "date-fns";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import clsx from 'clsx';
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface TopicScheduleProps {
    plan: PlanItem[];
    progress: ProgressData;
}

export default function TopicSchedule({ plan, progress }: TopicScheduleProps) {
    // Filter out revision days for the table usually, or keep them? 
    // User asked for "list of topics". Revision days are technically topics but 'Revision Day' might be clutter.
    // Let's keep them but maybe style differently.
    const rows = plan;

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 p-6 h-full overflow-hidden flex flex-col transition-colors">
            <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-6 flex items-center gap-2">
                <span className="text-zinc-600 dark:text-zinc-400">Full Schedule & Dates</span>
            </h2>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-50 dark:bg-zinc-800 sticky top-0 z-10 transition-colors">
                        <tr>
                            <th className="py-3 px-4 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-700">Date</th>
                            <th className="py-3 px-4 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-700">Category</th>
                            <th className="py-3 px-4 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-700">Topic</th>
                            <th className="py-3 px-4 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-700 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {rows.map((item, idx) => {
                            const date = parseISO(item.date);
                            const isDone = progress[item.date]?.completed;
                            const isLate = !isDone && isPast(date) && !isToday(date);
                            const isCurrent = isToday(date);

                            return (
                                <tr key={idx} className={cn(
                                    "hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group",
                                    isCurrent && "bg-orange-50/30 dark:bg-orange-900/10"
                                )}>
                                    <td className="py-3 px-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className={cn("text-sm font-medium", isCurrent ? "text-orange-700 dark:text-orange-400" : "text-zinc-700 dark:text-zinc-300")}>
                                                {format(date, 'MMM d, yyyy')}
                                            </span>
                                            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{format(date, 'EEEE')}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 whitespace-nowrap">
                                        <span className={cn(
                                            "text-[10px] px-2 py-1 rounded-full font-medium border",
                                            item.category?.includes("Paper I") ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-900/30" :
                                                item.category?.includes("Paper II") ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-900/30" :
                                                    item.category?.includes("Paper III") ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900/30" :
                                                        "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                                        )}>
                                            {item.category || item.type}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={cn("text-sm transition-colors", isDone ? "text-zinc-400 dark:text-zinc-600 line-through" : "text-zinc-800 dark:text-zinc-200 font-medium")}>
                                            {item.title}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex items-center justify-center">
                                            {isDone ? (
                                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-xs font-bold">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Done
                                                </div>
                                            ) : isLate ? (
                                                <div className="flex items-center gap-1 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded text-xs font-bold">
                                                    <AlertCircle className="w-3.5 h-3.5" /> Late
                                                </div>
                                            ) : isCurrent ? (
                                                <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded text-xs font-bold">
                                                    <Clock className="w-3.5 h-3.5" /> Today
                                                </div>
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
