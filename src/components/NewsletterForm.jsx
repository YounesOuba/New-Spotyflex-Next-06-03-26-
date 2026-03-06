'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <section className="relative py-24 px-4 overflow-hidden">
            {/* Background with Gradient and Pattern */}
            <div className="absolute inset-0 bg-[#cfff6a] z-0">
                <div className="absolute inset-0 bg-[radial-gradient(#212121_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#cfff6a] via-transparent to-transparent opacity-50"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-block mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="bg-[#212121]/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#212121]">
                        Stay Ahead
                    </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#212121] tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                    Join the SpotyFlex Community
                </h2>

                <p className="text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto text-[#212121]/80 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    Get weekly fitness tips, exclusive workout plans, and nutrition guides delivered straight to your inbox.
                </p>

                {status === 'success' ? (
                    <div className="bg-[#212121] text-white p-8 rounded-3xl animate-in zoom-in duration-500 inline-flex items-center gap-4 shadow-2xl mx-auto max-w-md w-full">
                        <div className="w-12 h-12 bg-[#cfff6a] rounded-full flex items-center justify-center flex-shrink-0 animate-bounce">
                            <CheckCircle className="w-6 h-6 text-[#212121]" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-xl mb-1">You're in!</h4>
                            <p className="text-white/70 text-sm">Thanks for subscribing. Check your inbox soon.</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <div className="flex-grow relative group">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading'}
                                className="w-full px-6 py-4 rounded-xl bg-white/50 backdrop-blur-md border border-[#212121]/10 focus:border-[#212121] focus:bg-white focus:outline-none text-lg placeholder:text-[#212121]/40 disabled:opacity-70 transition-all font-medium text-[#212121] shadow-sm group-hover:shadow-md"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="px-8 py-4 bg-[#212121] text-white font-bold rounded-xl hover:bg-black hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl whitespace-nowrap"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Subscribe <Send className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                )}

                <p className="mt-6 text-xs font-semibold text-[#212121]/50 animate-in fade-in duration-1000 delay-500">
                    No spam. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
