'use client';

import React, { useState, useMemo } from 'react';
import {
    BookOpen,
    DollarSign,
    Briefcase,
    AlertTriangle,
    Clock,
    Globe,
    FileText,
    Search,
    Menu,
    X,
    ChevronRight,
    Info,
    CheckCircle,
    Home,
    ShieldAlert,
    Award
} from 'lucide-react';

// --- Data Content from PDF ---

const CONTENT_DATA: Record<string, any> = {
    "Chapter I: Extent of Application": {
        icon: <BookOpen className="w-5 h-5" />,
        color: "blue",
        rules: [
            { id: "FR-1", title: "Title & Commencement", content: "These rules may be called the Fundamental Rules. They came into force with effect from 1st January 1922." },
            { id: "FR-2", title: "Applicability", content: "Applies to all Government servants whose pay is debitable to civil estimates and others declared by the President." },
            { id: "FR-3", title: "Exceptions", content: "Rules do not apply to Government servants governed by Army or Marine Regulations." },
            { id: "FR-6", title: "Delegation of Powers", content: "Government may delegate powers to officers to make rules." },
            { id: "FR-7", title: "Consultation", content: "No powers may be exercised or delegated without consultation with the Ministry of Finance." },
            { id: "FR-8", title: "Interpretation", content: "Powers of interpreting these rules are reserved to the President." }
        ]
    },
    "Chapter II: Definitions": {
        icon: <Info className="w-5 h-5" />,
        color: "indigo",
        intro: "Key terms defined in FR-9 used throughout the service rules.",
        rules: [
            { id: "FR-9(1-A)", title: "Administrator", content: "Appointed by the President under Article 239 of the Constitution." },
            { id: "FR-9(1-B)", title: "Allotment", content: "Grant of a license to occupy a government-owned/leased house for residence." },
            { id: "FR-9(4)", title: "Cadre", content: "The strength of a service or a part of a service sanctioned as a separate unit." },
            { id: "FR-9(5)", title: "Compensatory Allowance", content: "Allowance to meet personal expenditure necessitated by special circumstances (includes TA, excludes sumptuary allowance)." },
            { id: "FR-9(6)", title: "Duty", content: "Includes service as Probationer/Apprentice (if followed by confirmation), Joining Time. Treated as duty: Training in India, University courses, Departmental Exams, Enforced Halt, Civil Guard Training, Sports participation, Waiting for posting orders." },
            { id: "FR-9(6-A)", title: "Fee", content: "Recurring/non-recurring payment from a source other than the Consolidated Fund of India/State (e.g., Royalties on books, patent income). Excludes unearned income like dividends." },
            { id: "FR-9(7)", title: "Foreign Service", content: "Service where pay is received with Govt sanction from a source other than the Consolidated Fund of India/State." },
            { id: "FR-9(9)", title: "Honorarium", content: "Payment from Consolidated Fund for special work of an occasional nature. Includes OTA/Extra Duty Allowance." },
            { id: "FR-9(13)", title: "Lien", content: "The title of a Govt servant to hold a regular post (including tenure post) on which he is not on probation." },
            { id: "FR-9(21)", title: "Pay", content: "Amount drawn monthly including Basic Pay, Overseas Pay, Special Pay, Personal Pay, and other emoluments classed as pay." },
            { id: "FR-9(22)", title: "Permanent Post", content: "A post carrying a definite rate of pay sanctioned without limit of time." },
            { id: "FR-9(24)", title: "Presumptive Pay", content: "Pay entitled if the post was held substantively. Important for calculating pay after exoneration from suspension." },
            { id: "FR-9(25)", title: "Special Pay", content: "Addition to pay for special nature of work or additional responsibilities." },
            { id: "FR-9(30)", title: "Temporary Post", content: "A post carrying a definite rate of pay sanctioned for a limited time." }
        ]
    },
    "Chapter III: General Conditions": {
        icon: <FileText className="w-5 h-5" />,
        color: "slate",
        rules: [
            { id: "FR-10", title: "Medical Certificate", content: "Mandatory for appointment in India. Exemptions allowed for up to 2 months by competent authority." },
            { id: "FR-13", title: "Lien Retention", content: "Lien is retained while on duty, foreign service, joining time, leave, or suspension. Can be transferred. Lien terminates on resignation or acquiring a lien on another permanent post." },
            { id: "FR-15(a)", title: "Transfer", content: "President may transfer a Govt servant from one post to another. Cannot be transferred to a post with less pay than their lien post unless for inefficiency, misbehavior, or written request." },
            { id: "FR-16", title: "Provident Fund", content: "Mandatory subscription to PF or Family Pension Fund as prescribed." },
            { id: "FR-17", title: "Drawal of Pay", content: "Pay starts from date of assuming duties and ceases when duties cease. Unauthorized absence results in no pay." },
            { id: "FR-17(A)", title: "Unauthorized Absence", content: "Includes illegal strikes or deserting post. Causes break in service unless regularized." },
            { id: "FR-18", title: "Max Leave Period", content: "Continuous leave cannot exceed 5 years unless determined by President for exceptional circumstances. Absence > 5 years implies loss of office." }
        ]
    },
    "Chapter IV: Pay & Increments": {
        icon: <DollarSign className="w-5 h-5" />,
        color: "emerald",
        rules: [
            { id: "FR-22(I)", title: "Initial Pay Fixation", content: "Fixation on appointment/promotion. Option must be exercised within 1 month (fixation from date of promotion or DNI). Rounded off to next ₹100." },
            { id: "Fixation Logic", title: "Promotion Fixation", content: "From Promotion Date: 1 increment + cell equal/next in new level. From DNI: 2 increments on old pay + cell equal/next in new level." },
            { id: "FR-24", title: "Increments", content: "Drawn as matter of course unless withheld. Withholding authority must state period and if it affects future increments." },
            { id: "FR-26", title: "Service Counting for Increment", content: "Counts: Duty, Foreign Service, All leave (except EXOL without MC unless for civil commotion/higher studies), Joining time." },
            { id: "FR-27", title: "Premature Increment", content: "Authority may grant premature increment. E.g., for Stenographers qualifying shorthand at higher speeds, or Sports excellence (National: 1 inc, International: 2 inc, Max 5 in career)." },
            { id: "FR-35", title: "Officiating Pay Limits", content: "Central Govt may fix pay for officiating servants at an amount less than admissible. Restriction: 12.5% of Basic Pay or Max ₹6700." },
            { id: "Bunching", title: "Bunching of Stages", content: "If pre-revised stages bunch into same new cell, 1 additional increment for every 2 stages bunched." },
            { id: "Stepping Up", title: "Stepping Up of Pay", content: "Junior drawing more pay than senior in same cadre/identical post due to fixation rules. Senior's pay stepped up to equal junior's from date of anomaly." }
        ]
    },
    "Chapter V: Additions to Pay": {
        icon: <Home className="w-5 h-5" />,
        color: "teal",
        hasTables: true,
        rules: [
            { id: "FR-44", title: "Compensatory Allowance", content: "Grant so that allowance is not a source of profit." },
            { id: "FR-45-A", title: "License Fee (General)", content: "For Govt accommodation. Capital cost includes sanitary/electric fittings. Rate: 6% of capital cost or as per fixed rates." },
            { id: "Retention", title: "Retention of Accommodation", content: "Resignation: 1 month. Retirement: 6 months. Death: 12+12 months. Transfer: 2 months normal + 6 months double fee." },
            { id: "FR-46", title: "Honorarium", content: "For occasional special work. Recurring honoraria includes OTA. Share of Fees: 1/3rd of fee > ₹5000 credited to Govt." }
        ]
    },
    "Chapter VI & VII: Combinations & Deputation": {
        icon: <Briefcase className="w-5 h-5" />,
        color: "violet",
        rules: [
            { id: "FR-49", title: "Combination of Appointments", content: "Holding charge of >1 independent post. Same office/cadre: No extra pay. Different office/cadre: Pay of higher post + 10% of presumptive pay of additional post (if >45 days, max 3 months without DoPT concurrence)." },
            { id: "FR-50", title: "Deputation Out of India", content: "Requires Central Govt sanction." },
            { id: "FR-51", title: "Pay on Deputation", content: "Draws same pay as if on duty in India." }
        ]
    },
    "Chapter VIII: Dismissal, Removal, Suspension": {
        icon: <ShieldAlert className="w-5 h-5" />,
        color: "rose",
        isVisual: true,
        rules: [
            { id: "FR-52", title: "Cessation of Pay", content: "Pay ceases from date of dismissal/removal." },
            { id: "FR-53", title: "Subsistence Allowance", content: "50% of Leave Salary + DA. Review after 3 months: Can increase by 50% (if delay not due to servant) or decrease by 50% (if delay due to servant)." },
            { id: "Recoveries", title: "Deductions during Suspension", content: "Compulsory: IT, House Rent, CGEGIS, Repayment of loans. Prohibited: GPF subscription, Court attachments." },
            { id: "FR-54", title: "Reinstatement", content: "Fully Exonerated: Full pay & allowances (treated as duty). Not Fully Exonerated: Pay determined by authority, period may/may not be duty." }
        ]
    },
    "Chapter IX: Retirement": {
        icon: <Clock className="w-5 h-5" />,
        color: "orange",
        rules: [
            { id: "FR-56(a)", title: "Superannuation", content: "Retirement on afternoon of last day of month attaining 60 years. If born on 1st, retire previous month end." },
            { id: "FR-56(bb)", title: "Specialists", content: "Medical specialists in Teaching/Public Health/Non-Teaching: 65 years." },
            { id: "FR-56(j)", title: "Premature Retirement (Govt)", content: "Absolute right to retire in public interest. Group A/B (entry <35y): Age 50. Others: Age 55. Notice: 3 months." },
            { id: "FR-56(k)", title: "Voluntary Retirement (Self)", content: "Employee can retire with 3 months notice after Age 50 (Gp A/B entry <35) or Age 55." },
            { id: "FR-56(m)", title: "Group C Service", content: "Retirement after 30 years service. Notice: 3 months." }
        ]
    },
    "Chapter XI: Joining Time": {
        icon: <Globe className="w-5 h-5" />,
        color: "cyan",
        hasTables: true,
        rules: [
            { id: "CCS Rules", title: "Joining Time Rules 1979", content: "Admissible on transfer in public interest. Not for temp transfer <180 days." },
            { id: "Calculation", title: "Calculation", content: "Starts from date of relinquishment. Same station: 1 day. Different station: Based on distance (see table)." },
            { id: "Unutilized", title: "Credit to EL", content: "Unutilized Joining Time credited to Earned Leave (max 300 days)." }
        ]
    },
    "Chapter XII: Foreign Service": {
        icon: <Award className="w-5 h-5" />,
        color: "amber",
        rules: [
            { id: "FR-110", title: "Consent", content: "No transfer to foreign service against will. Sanctioned by Central Govt." },
            { id: "Contributions", title: "Pension & Leave Salary", content: "NPS: 28% of Basic+DA. OPS: 18% of Basic+DA. Leave Salary: 11% of Basic+DA." },
            { id: "FR-114", title: "Pay Date", content: "Draws pay from foreign employer from date of relinquishing Govt charge." },
            { id: "Cooling Off", title: "Cooling Off Period", content: "JS & below: 3 years. Addl Sec: 1 year. Sec: Nil." }
        ]
    },
    "Supplementary Rules (SR)": {
        icon: <BookOpen className="w-5 h-5" />,
        color: "fuchsia",
        rules: [
            { id: "SR-4", title: "Medical Fitness", content: "Medical Board (Gazetted) or Civil Surgeon (Non-Gazetted). Exemptions for competitive exam recruits already examined." },
            { id: "SR-11/12", title: "Fees", content: "Requires sanction. 1/3rd of amount > ₹5000/year credited to Govt." },
            { id: "SR-198", title: "Service Book", content: "Maintained from first appointment. Duplicate copy to employee. Annual verification by Head of Office. Cost of replacement if lost: ₹500." }
        ]
    }
};

const TABLES = {
    licenseFee: [
        { level: "1", type: "I", area: "Up to 30", rate: "210" },
        { level: "2 to 5", type: "II", area: "26.05 to 50", rate: "440" },
        { level: "6 to 8", type: "III", area: "44 to 65", rate: "660" },
        { level: "9 to 11", type: "IV", area: "59 to 91.5", rate: "880" },
    ],
    honorarium: [
        { duration: "Up to 1 week", rate: "₹5000" },
        { duration: "Up to 2 weeks", rate: "₹7500" },
        { duration: "Up to 3 weeks", rate: "₹10000" },
        { duration: "Up to 4 weeks", rate: "₹12500" },
    ],
    joiningTime: [
        { distance: "1000 km or less", time: "10 days", road: "12 days (>200km)" },
        { distance: "1001 to 2000 km", time: "12 days", road: "15 days (>200km)" },
        { distance: "More than 2000 km", time: "15 days (Air: 12)", road: "15 days" },
    ]
};

// --- Components ---

interface SidebarProps {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory, isOpen, toggleSidebar }) => (
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 shadow-2xl`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">FRSR Guide</span>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
            </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-80px)] scrollbar-thin scrollbar-thumb-slate-700">
            <button
                onClick={() => setActiveCategory("Home")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeCategory === "Home" ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-300 hover:bg-slate-800'}`}
            >
                <Home className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
            </button>

            <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Chapters</div>

            {Object.entries(CONTENT_DATA).map(([key, data]) => (
                <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${activeCategory === key ? `bg-slate-800 text-white border-l-4 border-${data.color}-500` : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                    <span className={`transition-colors duration-200 ${activeCategory === key ? `text-${data.color}-400` : 'text-slate-500 group-hover:text-slate-300'}`}>
                        {data.icon}
                    </span>
                    <span className="font-medium text-sm text-left truncate">{key.split(':')[0]}</span>
                </button>
            ))}
        </nav>
    </aside>
);

const RuleCard = ({ id, title, content, color }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className={`h-1.5 w-full bg-gradient-to-r from-${color}-400 to-${color}-600`} />
        <div className="p-5">
            <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider text-${color}-700 bg-${color}-50 rounded`}>
                    {id}
                </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{content}</p>
        </div>
    </div>
);

const SectionHeader = ({ title, icon, color }: any) => (
    <div className="flex items-center space-x-4 mb-8">
        <div className={`p-3 bg-${color}-100 rounded-xl text-${color}-600`}>
            {React.cloneElement(icon, { className: "w-8 h-8" })}
        </div>
        <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{title.split(':')[0]}</h2>
            <p className="text-slate-500 font-medium">{title.split(':')[1] || "Detailed Rules & Regulations"}</p>
        </div>
    </div>
);

// --- Visual Components ---

const SuspensionFlow = () => (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 my-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-rose-500" />
            Suspension & Subsistence Allowance Flow
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 relative">
            {/* Step 1 */}
            <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow border-l-4 border-rose-500 z-10">
                <div className="font-bold text-rose-700">Start</div>
                <div className="text-sm text-slate-600">Suspension Ordered / Deemed Suspension (48hrs detention)</div>
            </div>

            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-300 -z-0"></div>

            {/* Step 2 */}
            <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow border-l-4 border-orange-500 z-10">
                <div className="font-bold text-orange-700">First 3 Months</div>
                <div className="text-sm text-slate-600">Subsistence Allowance: 50% of Leave Salary + DA</div>
            </div>

            {/* Step 3 */}
            <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow border-l-4 border-blue-500 z-10">
                <div className="font-bold text-blue-700">Review</div>
                <div className="text-sm text-slate-600">Competent Authority reviews reasons for prolongation.</div>
            </div>

            {/* Step 4 */}
            <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow border-l-4 border-emerald-500 z-10">
                <div className="font-bold text-emerald-700">Outcome</div>
                <div className="text-xs text-slate-600 space-y-1">
                    <p><span className="text-green-600 font-bold">↑ 50%</span> if delay not attributable to servant.</p>
                    <p><span className="text-red-600 font-bold">↓ 50%</span> if delay attributable to servant.</p>
                </div>
            </div>
        </div>
    </div>
);

const JoiningTimeTable = () => (
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-6">
        <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold">
                <tr>
                    <th className="px-6 py-4">Distance Between Stations</th>
                    <th className="px-6 py-4">Normal Joining Time</th>
                    <th className="px-6 py-4">If Road Journey &gt; 200km</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
                {TABLES.joiningTime.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-800">{row.distance}</td>
                        <td className="px-6 py-4 text-slate-600">{row.time}</td>
                        <td className="px-6 py-4 text-slate-600">{row.road}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="bg-cyan-50 px-6 py-3 text-xs text-cyan-800 border-t border-cyan-100">
            * Additional 2 days for North-East, Sikkim, Andaman & Nicobar, Lakshadweep, Ladakh.
        </div>
    </div>
);

const TablesSection = () => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 my-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-teal-600 px-6 py-4 border-b border-teal-700">
                <h3 className="font-bold text-white flex items-center">
                    <Home className="w-5 h-5 mr-2" /> License Fees (Revised 2023)
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-teal-50 text-teal-800">
                        <tr>
                            <th className="px-4 py-3 text-left">Pay Level</th>
                            <th className="px-4 py-3 text-left">Type</th>
                            <th className="px-4 py-3 text-left">Area (sq m)</th>
                            <th className="px-4 py-3 text-right">Fee (₹)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {TABLES.licenseFee.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium">{r.level}</td>
                                <td className="px-4 py-3">{r.type}</td>
                                <td className="px-4 py-3">{r.area}</td>
                                <td className="px-4 py-3 text-right font-bold text-slate-700">{r.rate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-violet-600 px-6 py-4 border-b border-violet-700">
                <h3 className="font-bold text-white flex items-center">
                    <Award className="w-5 h-5 mr-2" /> Honorarium for Training (Master Trainer)
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-violet-50 text-violet-800">
                        <tr>
                            <th className="px-6 py-3 text-left">Course Duration</th>
                            <th className="px-6 py-3 text-right">Payment</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {TABLES.honorarium.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                                <td className="px-6 py-3 font-medium text-slate-700">{r.duration}</td>
                                <td className="px-6 py-3 text-right font-bold text-violet-700">{r.rate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const SearchBar = ({ onSearch }: { onSearch: (val: string) => void }) => (
    <div className="relative max-w-xl w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-all"
            placeholder="Search for rules, keywords (e.g., 'MACP', 'Suspension', 'Lien')..."
            onChange={(e) => onSearch(e.target.value)}
        />
    </div>
);

const HomeDashboard = ({ setCategory }: { setCategory: (val: string) => void }) => (
    <div className="space-y-8 animate-fade-in">
        <div className="relative bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Master the <br />Fundamental Rules</h1>
                <p className="text-blue-100 text-lg mb-8">
                    The comprehensive digital guide to FRSR Part-I. Simplified definitions, visualize complex rules, and access critical data instantly.
                </p>
                <button
                    onClick={() => setCategory("Chapter II: Definitions")}
                    className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold shadow-lg transition-transform transform hover:-translate-y-1"
                >
                    Start with Definitions
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div onClick={() => setCategory("Chapter IV: Pay & Increments")} className="group cursor-pointer bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Pay & Fixation</h3>
                <p className="text-sm text-slate-500">Rules regarding initial pay, increments, bunching, and stepping up.</p>
            </div>

            <div onClick={() => setCategory("Chapter XI: Joining Time")} className="group cursor-pointer bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Joining Time</h3>
                <p className="text-sm text-slate-500">Calculation of transit time, unutilized credit, and transfer rules.</p>
            </div>

            <div onClick={() => setCategory("Chapter VIII: Dismissal, Removal, Suspension")} className="group cursor-pointer bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <AlertTriangle className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Suspension</h3>
                <p className="text-sm text-slate-500">Subsistence allowance rates, review mechanisms, and reinstatement.</p>
            </div>
        </div>
    </div>
);

// --- Main App Component ---

export default function FRSRApp() {
    const [activeCategory, setActiveCategory] = useState("Home");
    const [searchTerm, setSearchTerm] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const filteredContent = useMemo(() => {
        if (!searchTerm) return null;
        const results: any[] = [];
        Object.entries(CONTENT_DATA).forEach(([catKey, catData]) => {
            const matchedRules = catData.rules.filter((r: any) =>
                r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (matchedRules.length > 0) {
                results.push({ ...catData, title: catKey, rules: matchedRules });
            }
        });
        return results;
    }, [searchTerm]);

    const currentCategoryData = CONTENT_DATA[activeCategory];

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
            <Sidebar
                activeCategory={activeCategory}
                setActiveCategory={(cat) => { setActiveCategory(cat); setSidebarOpen(false); setSearchTerm(""); }}
                isOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex items-center justify-between z-40">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 text-slate-500 hover:text-slate-800">
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold text-slate-800 hidden md:block">
                            {activeCategory === "Home" ? "Dashboard" : activeCategory.split(":")[0]}
                        </h1>
                    </div>
                    <SearchBar onSearch={setSearchTerm} />
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto">

                        {/* Search Results */}
                        {searchTerm && (
                            <div className="space-y-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4">Search Results for "{searchTerm}"</h2>
                                {filteredContent && filteredContent.length > 0 ? (
                                    filteredContent.map((cat, idx) => (
                                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                            <div className="flex items-center space-x-2 mb-4 text-slate-500 border-b border-slate-100 pb-2">
                                                {cat.icon}
                                                <span className="font-bold text-sm uppercase">{cat.title}</span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {cat.rules.map((rule: any) => (
                                                    <RuleCard key={rule.id} {...rule} color={cat.color} />
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                                        <div className="text-slate-400 mb-2">No results found</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Default View */}
                        {!searchTerm && (
                            <>
                                {activeCategory === "Home" ? (
                                    <HomeDashboard setCategory={setActiveCategory} />
                                ) : (
                                    <div className="animate-fade-in-up">
                                        <SectionHeader title={activeCategory} icon={currentCategoryData.icon} color={currentCategoryData.color} />

                                        {currentCategoryData.intro && (
                                            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-8 border border-blue-100 flex items-start">
                                                <Info className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                                                <p>{currentCategoryData.intro}</p>
                                            </div>
                                        )}

                                        {/* Special Visuals for specific Chapters */}
                                        {activeCategory.includes("Suspension") && <SuspensionFlow />}
                                        {activeCategory.includes("Joining Time") && <JoiningTimeTable />}
                                        {currentCategoryData.hasTables && activeCategory.includes("Additions") && <TablesSection />}

                                        {/* Rules Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                            {currentCategoryData.rules.map((rule: any) => (
                                                <RuleCard key={rule.id} {...rule} color={currentCategoryData.color} />
                                            ))}
                                        </div>

                                        {/* Bottom Info Note */}
                                        <div className="mt-12 flex items-center justify-center text-slate-400 text-sm">
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            <span>Based on FRSR Part-I General Rules (Updated)</span>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
