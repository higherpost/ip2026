"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setStatus("idle");

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            mobile: formData.get("mobile"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to send");

            setStatus("success");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
                <input
                    name="firstName"
                    required
                    type="text"
                    placeholder="Enter your first name."
                    className="w-full p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <input
                    name="lastName"
                    required
                    type="text"
                    placeholder="Enter your last name."
                    className="w-full p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <input
                    name="email"
                    required
                    type="email"
                    placeholder="Enter your email ID."
                    className="w-full p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <div className="flex">
                    <select className="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-l-lg border-r-0 outline-none">
                        <option>🇮🇳 +91</option>
                    </select>
                    <input
                        name="mobile"
                        required
                        type="tel"
                        placeholder="Mobile Number"
                        className="flex-1 p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-r-lg outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
                <textarea
                    name="message"
                    required
                    placeholder="Write your Message here."
                    rows={4}
                    className="w-full p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 Resize-none"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70"
            >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {isLoading ? "Sending..." : "Submit"}
            </button>

            {status === "success" && (
                <p className="text-green-600 font-medium text-center">Message sent successfully!</p>
            )}
            {status === "error" && (
                <p className="text-red-500 font-medium text-center">Something went wrong. Please try again.</p>
            )}
        </form>
    );
}
