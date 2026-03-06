'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Trash2, Loader2, ChevronDown } from 'lucide-react';

const GET_URL  = 'https://spotyflex.com/api/getComments.php';
const POST_URL = 'https://spotyflex.com/api/addComment.php';
const DEL_URL  = 'https://spotyflex.com/api/deleteComment.php';
const OWNER_KEY = 'spotyflex_owner_id';

function getOwnerId() {
  if (typeof window === 'undefined') return null;
  let id = localStorage.getItem(OWNER_KEY);
  if (!id) {
    id = 'anon_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(OWNER_KEY, id);
  }
  return id;
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 1)  return 'just now';
  if (mins  < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days  < 7)  return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const INITIAL_VISIBLE = 5;

export default function Comments({ slug, accent }) {
  const [comments,  setComments]  = useState([]);
  const [text,      setText]      = useState('');
  const [loading,   setLoading]   = useState(true);
  const [submitting,setSubmitting]= useState(false);
  const [deleting,  setDeleting]  = useState(null);
  const [error,     setError]     = useState('');
  const [visible,   setVisible]   = useState(INITIAL_VISIBLE);
  const [ownerId,   setOwnerId]   = useState(null);
  const textareaRef = useRef(null);

  const accentColor  = accent?.color  || '#cfff6a';
  const accentBg     = accent?.bg     || 'rgba(207,255,106,0.08)';
  const accentBorder = accent?.border || 'rgba(207,255,106,0.18)';

  // Init owner ID client-side only
  useEffect(() => { setOwnerId(getOwnerId()); }, []);

  // Fetch comments
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`${GET_URL}?article_slug=${encodeURIComponent(slug)}`)
      .then(r => r.json())
      .then(data => setComments(Array.isArray(data) ? data : []))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !ownerId) return;
    if (trimmed.length < 3)  { setError('Comment is too short.'); return; }
    if (trimmed.length > 1000) { setError('Comment is too long (max 1000 chars).'); return; }

    setSubmitting(true);
    setError('');

    try {
      const res  = await fetch(POST_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          article_slug: slug,
          text:         trimmed,
          date:         new Date().toISOString(),
          ownerId,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to post comment.');
        return;
      }

      setComments(prev => [...prev, data.comment]);
      setText('');
      // Auto-expand to show new comment
      setVisible(prev => Math.max(prev, comments.length + 1));
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!ownerId) return;
    setDeleting(id);
    try {
      const res  = await fetch(DEL_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ id, ownerId }),
      });
      const data = await res.json();
      if (data.success) {
        setComments(prev => prev.filter(c => c.id !== id));
      }
    } catch {}
    finally { setDeleting(null); }
  }

  const visibleComments = comments.slice(0, visible);
  const hasMore = visible < comments.length;

  return (
    <section className="mt-20 pt-16 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-5 h-[2px] rounded-full" style={{ background: accentColor }} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              Discussion
            </span>
          </div>
          <h3 className="text-white leading-tight"
            style={{
              fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontWeight: 900,
              letterSpacing: '-0.025em',
            }}>
            {comments.length > 0
              ? <>{comments.length} <span style={{ color: accentColor }}>Comment{comments.length !== 1 ? 's' : ''}</span></>
              : <>Leave a <span style={{ color: accentColor }}>Comment</span></>
            }
          </h3>
        </div>

        {comments.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em]"
            style={{ background: accentBg, border: `1px solid ${accentBorder}`, color: accentColor }}>
            <MessageSquare className="w-3 h-3" />
            {comments.length}
          </div>
        )}
      </div>

      {/* Comment form */}
      <div className="mb-10 p-6 rounded-2xl border"
        style={{ background: 'linear-gradient(135deg, #141414, #111)', borderColor: 'rgba(255,255,255,0.07)' }}>

        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}22, transparent)` }} />

        <form onSubmit={handleSubmit} className="space-y-3 relative">
          <label className="block text-[9px] font-black uppercase tracking-[0.3em]"
            style={{ color: 'rgba(255,255,255,0.2)' }}>
            Share your thoughts
          </label>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={e => { setText(e.target.value); setError(''); }}
            rows={4}
            placeholder="Write a comment..."
            disabled={submitting}
            className="w-full rounded-xl px-4 py-3.5 text-[14px] text-white placeholder:text-white/15 outline-none transition-all duration-200 resize-none disabled:opacity-50"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: error ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.07)',
              lineHeight: 1.7,
            }}
            onFocus={e => {
              e.target.style.borderColor = `${accentColor}55`;
              e.target.style.boxShadow = `0 0 0 3px ${accentColor}08`;
            }}
            onBlur={e => {
              e.target.style.borderColor = error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.07)';
              e.target.style.boxShadow = 'none';
            }}
          />

          <div className="flex items-center justify-between gap-4">
            {/* Error / char count */}
            <div className="flex-1">
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] font-bold"
                    style={{ color: 'rgba(239,68,68,0.8)' }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
              {!error && text.length > 0 && (
                <p className="text-[9px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: text.length > 900 ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.15)' }}>
                  {text.length} / 1000
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || !text.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200 disabled:opacity-40 hover:-translate-y-0.5"
              style={{ background: accentColor, color: '#080808' }}
            >
              {submitting
                ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Posting...</>
                : <><Send className="w-3.5 h-3.5" />Post</>
              }
            </button>
          </div>
        </form>
      </div>

      {/* Comments list */}
      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-20 rounded-2xl animate-pulse"
              style={{ background: 'rgba(255,255,255,0.02)' }} />
          ))}
        </div>
      ) : comments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-14 text-center rounded-2xl border border-dashed"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <MessageSquare className="w-8 h-8 mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.08)' }} />
          <p className="text-[13px] font-bold" style={{ color: 'rgba(255,255,255,0.2)' }}>
            No comments yet
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-1"
            style={{ color: 'rgba(255,255,255,0.1)' }}>
            Be the first to share your thoughts
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {visibleComments.map((comment, i) => {
              const isOwn = comment.owner_id === ownerId;
              return (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="group relative p-5 rounded-2xl border transition-all duration-200"
                  style={{
                    background: isOwn ? accentBg : 'rgba(255,255,255,0.02)',
                    borderColor: isOwn ? accentBorder : 'rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Header row */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      {/* Avatar */}
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                        style={{ background: isOwn ? accentBg : 'rgba(255,255,255,0.05)', border: `1px solid ${isOwn ? accentBorder : 'rgba(255,255,255,0.08)'}`, color: isOwn ? accentColor : 'rgba(255,255,255,0.3)' }}>
                        {isOwn ? 'You' : 'A'}
                      </div>
                      <div>
                        <p className="text-[11px] font-black"
                          style={{ color: isOwn ? accentColor : 'rgba(255,255,255,0.45)' }}>
                          {isOwn ? 'You' : 'Anonymous'}
                        </p>
                        <p className="text-[9px] font-bold uppercase tracking-[0.15em]"
                          style={{ color: 'rgba(255,255,255,0.15)' }}>
                          {timeAgo(comment.date)}
                        </p>
                      </div>
                    </div>

                    {/* Delete — only own comments */}
                    {isOwn && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        disabled={deleting === comment.id}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-40"
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
                        aria-label="Delete comment"
                      >
                        {deleting === comment.id
                          ? <Loader2 className="w-3 h-3 animate-spin text-red-400" />
                          : <Trash2 className="w-3 h-3 text-red-400" />
                        }
                      </button>
                    )}
                  </div>

                  {/* Comment text */}
                  <p className="text-[13.5px] leading-relaxed whitespace-pre-wrap"
                    style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {comment.text}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Load more */}
          {hasMore && (
            <button
              onClick={() => setVisible(v => v + 5)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200 mt-2"
              style={{ border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.25)' }}
            >
              <ChevronDown className="w-3.5 h-3.5" />
              Show {Math.min(5, comments.length - visible)} more comment{comments.length - visible !== 1 ? 's' : ''}
            </button>
          )}
        </div>
      )}

      {/* Auth upsell */}
      <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: 'rgba(255,255,255,0.1)' }}>
        Comments are anonymous · Account system coming soon
      </p>
    </section>
  );
}