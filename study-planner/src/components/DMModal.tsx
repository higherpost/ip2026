import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface DMModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: { name: string; email?: string } | null;
}

export const DMModal = ({ isOpen, onClose, user }: DMModalProps) => {
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const wordCount = message.trim().split(/\s+/).length;
        if (wordCount > 500) {
            setError(`Message is too long (${wordCount}/500 words).`);
            return;
        }

        setSending(true);

        try {
            const res = await fetch('/api/dm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    userName: user?.name || 'Anonymous',
                    userEmail: user?.email || 'No Email'
                })
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setMessage("");
                    onClose();
                }, 2000);
            } else {
                const data = await res.json();
                setError(data.error || "Failed to send message.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden scale-100 animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">DM to Admin</h3>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {success ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in slide-in-from-bottom-4">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <Send className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">Message Sent!</h4>
                            <p className="text-zinc-500">The admin has received your message.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Your Message <span className="text-zinc-400 font-normal">(Max 500 words)</span>
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full h-40 p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm transition-all"
                                    placeholder="Type your message here..."
                                    required
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <span className={`text-xs ${message.trim().split(/\s+/).length > 500 ? 'text-red-500 font-bold' : 'text-zinc-400'}`}>
                                        {message.trim() ? message.trim().split(/\s+/).length : 0} / 500 words
                                    </span>
                                    {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={sending || !message.trim()}
                                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                            >
                                {sending ? (
                                    <>Sending...</>
                                ) : (
                                    <>Send Message <Send className="w-4 h-4" /></>
                                )}
                            </button>

                            <p className="text-xs text-center text-zinc-400">
                                This message will be sent to <span className="font-medium text-zinc-600 dark:text-zinc-300">admin@dakguru.com</span>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
