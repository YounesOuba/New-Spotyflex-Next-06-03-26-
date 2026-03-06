'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const TOPICS = [
  { id: 'Training Question', label: 'Training Question' },
  { id: 'Collaboration',     label: 'Collaboration'     },
  { id: 'Feedback',          label: 'Feedback'          },
  { id: 'Something Else',    label: 'Something Else'    },
];

const API_URL = 'https://spotyflex.com/api/sendContact.php';

export default function ContactPage() {
  const [topic,   setTopic]   = useState('');
  const [status,  setStatus]  = useState('idle'); // idle | sending | success | error
  const [errMsg,  setErrMsg]  = useState('');
  const [focused, setFocused] = useState(null);
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrMsg('');

    const fd = new FormData(formRef.current);
    const payload = {
      name:    fd.get('name')?.toString().trim()    || '',
      email:   fd.get('email')?.toString().trim()   || '',
      subject: topic || fd.get('subject')?.toString().trim() || 'General',
      message: fd.get('message')?.toString().trim() || '',
    };

    try {
      const res  = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrMsg(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrMsg('Network error. Please check your connection and try again.');
    }
  }

  const inputBase = {
    background:   'rgba(255,255,255,0.03)',
    border:       '1px solid rgba(255,255,255,0.07)',
    borderRadius: 16,
    color:        '#fff',
    width:        '100%',
    padding:      '14px 18px',
    fontSize:     '14px',
    outline:      'none',
    transition:   'border-color 0.2s, box-shadow 0.2s',
  };

  const inputFocused = {
    borderColor: 'rgba(207,255,106,0.35)',
    boxShadow:   '0 0 0 3px rgba(207,255,106,0.06)',
  };

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>

      {/* Grain */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />
      <div className="pointer-events-none fixed top-0 left-0 w-[500px] h-[400px] z-0"
        style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(207,255,106,0.04) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-6 h-[2px] rounded-full bg-[#cfff6a]" />
          <span className="text-[9px] font-black uppercase tracking-[0.45em]"
            style={{ color: 'rgba(255,255,255,0.2)' }}>
            Contact
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-20 items-start">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-white leading-[1.04] mb-6"
              style={{
                fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontWeight: 900,
                letterSpacing: '-0.035em',
              }}>
              Let's talk{' '}
              <span style={{ color: '#cfff6a' }}>fitness.</span>
            </h1>

            <p className="text-[15px] leading-relaxed mb-12 max-w-sm"
              style={{ color: 'rgba(255,255,255,0.38)' }}>
              Have a training question, want to collaborate, or just want to say something? We read every message.
            </p>

            <a href="mailto:support@spotyflex.com"
              className="group inline-flex items-center gap-4 mb-12">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                style={{ background: 'rgba(207,255,106,0.08)', border: '1px solid rgba(207,255,106,0.18)' }}>
                <Mail className="w-4 h-4" style={{ color: '#cfff6a' }} />
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] mb-0.5"
                  style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Email us directly
                </div>
                <div className="text-[14px] font-bold transition-colors duration-200 group-hover:text-[#cfff6a]"
                  style={{ color: 'rgba(255,255,255,0.6)' }}>
                  support@spotyflex.com
                </div>
              </div>
            </a>

            <div className="h-px mb-12" style={{ background: 'rgba(255,255,255,0.05)' }} />

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] mb-5"
                style={{ color: 'rgba(255,255,255,0.18)' }}>
                Or explore the site
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Read our articles',   href: '/articles'          },
                  { label: 'About SpotyFlex',     href: '/about'             },
                  { label: 'Start with Beginner', href: '/category/beginner' },
                ].map(({ label, href }) => (
                  <Link key={label} href={href}
                    className="group flex items-center gap-2 text-[12px] font-bold transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.28)' }}>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                      style={{ color: '#cfff6a', opacity: 0.5 }} />
                    <span className="group-hover:text-white/60 transition-colors">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">

              {/* SUCCESS */}
              {status === 'success' ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative p-10 rounded-3xl border text-center"
                  style={{ background: 'linear-gradient(135deg, #141414, #111111)', borderColor: 'rgba(207,255,106,0.15)' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(207,255,106,0.3), transparent)' }} />

                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'rgba(207,255,106,0.1)', border: '1px solid rgba(207,255,106,0.2)' }}
                  >
                    <CheckCircle2 className="w-7 h-7" style={{ color: '#cfff6a' }} />
                  </motion.div>

                  <h3 className="text-white mb-3"
                    style={{ fontSize: '1.5rem', fontFamily: 'var(--font-playfair), serif', fontWeight: 900 }}>
                    Message sent!
                  </h3>
                  <p className="text-[14px] leading-relaxed mb-8"
                    style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Thanks for reaching out. We'll get back to you at your email address shortly.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setTopic(''); setErrMsg(''); formRef.current?.reset(); }}
                    className="text-[9px] font-black uppercase tracking-[0.3em] transition-colors hover:text-white/40"
                    style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Send another →
                  </button>
                </motion.div>

              ) : (
                /* FORM */
                <motion.div key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="relative p-8 sm:p-10 rounded-3xl border"
                  style={{ background: 'linear-gradient(135deg, #141414 0%, #101010 100%)', borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(207,255,106,0.15), transparent)' }} />

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                    {/* Topic */}
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-[0.3em] mb-3"
                        style={{ color: 'rgba(255,255,255,0.2)' }}>
                        What's this about?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {TOPICS.map(t => (
                          <button key={t.id} type="button" onClick={() => setTopic(t.id)}
                            className="px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200 text-left"
                            style={topic === t.id
                              ? { background: 'rgba(207,255,106,0.1)', border: '1px solid rgba(207,255,106,0.25)', color: '#cfff6a' }
                              : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)' }
                            }>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-[0.3em] mb-2"
                          style={{ color: 'rgba(255,255,255,0.2)' }}>
                          Name
                        </label>
                        <input required name="name" type="text" placeholder="Your name"
                          onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                          style={{ ...inputBase, ...(focused === 'name' ? inputFocused : {}) }}
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-[0.3em] mb-2"
                          style={{ color: 'rgba(255,255,255,0.2)' }}>
                          Email
                        </label>
                        <input required name="email" type="email" placeholder="your@email.com"
                          onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                          style={{ ...inputBase, ...(focused === 'email' ? inputFocused : {}) }}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-[0.3em] mb-2"
                        style={{ color: 'rgba(255,255,255,0.2)' }}>
                        Message
                      </label>
                      <textarea required name="message" rows={5} placeholder="What's on your mind..."
                        onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                        style={{ ...inputBase, resize: 'none', lineHeight: 1.7, ...(focused === 'message' ? inputFocused : {}) }}
                      />
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                      {status === 'error' && errMsg && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2 px-4 py-3 rounded-xl text-[12px] font-bold"
                          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: 'rgba(239,68,68,0.8)' }}
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {errMsg}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button type="submit" disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-60 hover:-translate-y-0.5"
                      style={{
                        background: '#cfff6a',
                        color: '#080808',
                        boxShadow: status !== 'sending' ? '0 12px 32px -8px rgba(207,255,106,0.3)' : 'none',
                      }}>
                      {status === 'sending'
                        ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</>
                        : <><Send className="w-3.5 h-3.5" />Send Message</>
                      }
                    </button>

                    <p className="text-center text-[9px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: 'rgba(255,255,255,0.12)' }}>
                      We typically respond within 24 hours
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}