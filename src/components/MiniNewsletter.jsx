'use client';

import { useSubscribe } from '@/hooks/use-subscribe';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MiniNewsletter() {
    const { email, setEmail, status, message, subscribe } = useSubscribe();

    return (
        <div className="border border-[#cfff6a]/15 rounded-[18px] bg-[#cfff6a]/[0.03] p-5">
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-4 text-center"
                    >
                        <CheckCircle2 className="w-8 h-8 text-[#cfff6a] mb-3" />
                        <p className="text-white text-[12px] font-bold">You're in! Check your inbox.</p>
                    </motion.div>
                ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <p className="text-white text-[13px] font-extrabold mb-1.5">Weekly Fitness Digest</p>
                        <p className="text-white/35 text-[11px] leading-relaxed mb-4">
                            Best articles delivered to your inbox every Monday.
                        </p>
                        <form onSubmit={subscribe} className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={email || ''}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading'}
                                className="w-full bg-white/[0.05] border border-white/[0.07] rounded-[10px] text-white text-[12px] font-medium px-3.5 py-2.5 outline-none placeholder:text-white/20 focus:border-[#cfff6a]/40 transition-colors"
                                style={
                                    status === 'error' ? { borderColor: 'rgba(239,68,68,0.5)' } :
                                        status === 'already' ? { borderColor: 'rgba(207,255,106,0.5)' } : {}
                                }
                            />

                            <AnimatePresence>
                                {status === 'error' && message && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center justify-center gap-1.5 text-[10.5px] font-bold text-red-500/90 pt-1 overflow-hidden"
                                    >
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{message}</span>
                                    </motion.div>
                                )}
                                {status === 'already' && message && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center justify-center gap-1.5 text-[10.5px] font-bold text-[#cfff6a] pt-1 overflow-hidden"
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                        <span>{message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-[#cfff6a] text-[#0a0a0a] text-[11px] font-black flex justify-center items-center gap-2 px-5 py-2.5 rounded-[10px] hover:bg-white transition-colors disabled:opacity-70 mt-1"
                            >
                                {status === 'loading' ? (
                                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Subscribing...</>
                                ) : (
                                    <>Subscribe →</>
                                )}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
