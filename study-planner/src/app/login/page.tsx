"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import { Lock, User, ArrowRight, Loader2, Mail, UserPlus, Phone } from "lucide-react";

const DESIGNATIONS = [
    "GDS", "MTS", "Postman", "PA", "IP", "ASP", "PS Gr 'B'", "Group A Officer"
];

function AuthForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        designation: "",
        pincode: "",
        officeName: "",
        division: "",
        circle: ""
    });

    // Pincode/Office Fetch State
    const [officeList, setOfficeList] = useState<any[]>([]);
    const [isFetchingOffices, setIsFetchingOffices] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (searchParams.get("mode") === "signup") {
            setIsLogin(false);
        }
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");

        // Fetch offices when pincode reaches 6 digits
        if (name === "pincode") {
            if (value.length === 6) {
                fetchOffices(value);
            } else {
                setOfficeList([]);
                setFormData(prev => ({ ...prev, officeName: "", division: "", circle: "" }));
            }
        }
    };

    const fetchOffices = async (pincode: string) => {
        setIsFetchingOffices(true);
        try {
            const res = await fetch(`/api/pincode?pincode=${pincode}`);
            const data = await res.json();
            if (data.found && data.offices.length > 0) {
                setOfficeList(data.offices);
                // Auto-fill Division/Circle from the first result (usually same for a pincode)
                const first = data.offices[0];
                setFormData(prev => ({
                    ...prev,
                    division: first.division,
                    circle: first.circle
                }));
            } else {
                setOfficeList([]);
                setError("No offices found for this pincode.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetchingOffices(false);
        }
    };

    const handleOfficeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const officeName = e.target.value;
        const selectedOffice = officeList.find(o => o.name === officeName);
        if (selectedOffice) {
            setFormData(prev => ({
                ...prev,
                officeName: officeName,
                division: selectedOffice.division,
                circle: selectedOffice.circle
            }));
        } else {
            setFormData(prev => ({ ...prev, officeName: officeName }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Basic Signup Validation
        if (!isLogin) {
            if (!formData.designation) {
                setError("Please select a designation.");
                setIsLoading(false);
                return;
            }
        }

        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            if (isLogin) {
                router.push("/");
                router.refresh();
            } else {
                // Switch to login mode after successful signup
                setIsLogin(true);
                setError("");
                setFormData(prev => ({ ...prev, password: "", otp: "" }));
                alert("Account created! Please sign in.");
            }
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((err as any).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className={`w-full ${isLogin ? 'max-w-md' : 'max-w-2xl'} relative z-10 animate-in fade-in zoom-in-95 duration-500`}>
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-800 shadow-2xl rounded-3xl p-8 md:p-10">

                    <div className="text-center mb-10">
                        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-blue-600/20 mb-6 border-2 border-white dark:border-zinc-700 overflow-hidden transform hover:scale-105 transition-transform bg-white">
                            <Image src="/dakgyan-logo.png" alt="Logo" width={80} height={80} className="object-cover" />
                        </div>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                            {isLogin ? "Welcome to Dak Gyan" : "Create Account"}
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            {isLogin
                                ? "Enter your credentials"
                                : "Join to start tracking your study progress"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {!isLogin && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2 col-span-1 md:col-span-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                        Full Name of the Aspirant
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-3.5 text-zinc-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-zinc-400"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Mobile No */}
                                <div className="space-y-2 col-span-1 md:col-span-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                        Mobile No.
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-3.5 text-zinc-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <input
                                            name="mobile"
                                            type="tel"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-zinc-400"
                                            placeholder="9876543210"
                                            required
                                            minLength={10}
                                            maxLength={10}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                        Email ID
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-zinc-400"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                        Designation
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleInputChange}
                                            className="w-full appearance-none bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all cursor-pointer"
                                            required
                                        >
                                            <option value="">Select Designation</option>
                                            {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">▼</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                        Pincode (6 digits)
                                    </label>
                                    <input
                                        name="pincode"
                                        type="text"
                                        maxLength={6}
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-zinc-400"
                                        placeholder="110001"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                        Office of working
                                    </label>
                                    {isFetchingOffices ? (
                                        <div className="w-full py-3.5 px-4 bg-zinc-50 rounded-2xl text-zinc-400 text-sm">Loading offices...</div>
                                    ) : (
                                        <select
                                            name="officeName"
                                            value={formData.officeName}
                                            onChange={handleOfficeSelect}
                                            className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all"
                                            required
                                            disabled={officeList.length === 0}
                                        >
                                            <option value="">{officeList.length > 0 ? "Select Office" : "Enter Pincode first"}</option>
                                            {officeList.map((o, idx) => (
                                                <option key={idx} value={o.name}>{o.name}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                        Division
                                    </label>
                                    <input
                                        name="division"
                                        type="text"
                                        value={formData.division}
                                        readOnly
                                        className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-4 text-zinc-500 cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                        Circle
                                    </label>
                                    <input
                                        name="circle"
                                        type="text"
                                        value={formData.circle}
                                        readOnly
                                        className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 px-4 text-zinc-500 cursor-not-allowed"
                                    />
                                </div>

                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                {isLogin ? "Email" : "Password"}
                            </label>

                            {isLogin ? (
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 text-zinc-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-zinc-400"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            ) : (
                                <>
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1 mt-2 block">
                                        Create Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-3.5 text-zinc-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-zinc-400"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {isLogin && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => router.push('/forgot-password')}
                                        className="text-xs font-semibold text-blue-600 hover:text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-4 top-3.5 text-zinc-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-3.5 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 dark:focus:border-blue-400 transition-all placeholder:text-zinc-400"
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-lg animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/25 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? "Sign In" : "Create Account"}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError("");
                                    setFormData({ name: "", email: "", password: "", mobile: "", designation: "", pincode: "", officeName: "", division: "", circle: "" });
                                }}
                                className="text-blue-600 hover:text-blue-500 font-semibold hover:underline bg-transparent border-none cursor-pointer ml-1"
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </button>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center text-zinc-400 text-sm flex items-center justify-center gap-2">
                    <div className="px-2 py-1 bg-green-500/10 text-green-600 rounded text-xs font-medium border border-green-500/20">
                        v1.0.0
                    </div>
                    <span>Advanced Preparation Master</span>
                </div>
            </div>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
            <AuthForm />
        </Suspense>
    );
}
