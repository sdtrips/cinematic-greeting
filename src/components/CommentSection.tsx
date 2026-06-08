'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment { id: string; name: string; message: string; timestamp: Date; }

interface Props {
  accentColor: string;
  scheme: { text: string; muted: string; background: string };
}

export function CommentSection({ accentColor, scheme }: Props) {
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', name: 'سارة', message: 'كل سنة وأنتِ بخير يا قمر! 🌙✨', timestamp: new Date('2026-06-07') },
    { id: '2', name: 'أحمد', message: 'أحلى معايدة شفتها! الله يسعدك 💕', timestamp: new Date('2026-06-07') },
    { id: '3', name: 'ليلى', message: 'يا نور العين! تستاهلين كل خير 🌹', timestamp: new Date('2026-06-08') },
  ]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const addComment = () => {
    if (!name.trim() || !message.trim()) return;
    setComments(prev => [...prev, { id: Date.now().toString(), name: name.trim(), message: message.trim(), timestamp: new Date() }]);
    setName(''); setMessage(''); setShowForm(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-8">
      {/* Section header — film credit style */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} className="text-center mb-16">
        <div className="w-px h-12 mx-auto mb-6" style={{ background: `linear-gradient(180deg, transparent, ${accentColor}50, transparent)` }} />
        <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: scheme.muted }}>Messages from the heart</p>
        <h3 className="text-3xl md:text-4xl font-light" style={{ color: scheme.text, fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
          تعليقات الحضور
        </h3>
        <div className="w-px h-12 mx-auto mt-6" style={{ background: `linear-gradient(180deg, ${accentColor}50, transparent)` }} />
      </motion.div>

      {/* Comments */}
      <div className="space-y-6 mb-12">
        <AnimatePresence>
          {comments.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 1 }}
              className="relative py-6 text-center"
              style={{ borderBottom: `1px solid rgba(255,255,255,0.04)` }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px flex-1 max-w-[40px]" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}30)` }} />
                <span className="text-xs font-medium tracking-wider" style={{ color: accentColor }}>{c.name}</span>
                <div className="h-px flex-1 max-w-[40px]" style={{ background: `linear-gradient(90deg, ${accentColor}30, transparent)` }} />
              </div>
              <p className="text-sm leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Georgia, serif' }}>
                {c.message}
              </p>
              <p className="text-[10px] mt-2 tracking-wider" style={{ color: scheme.muted }}>
                {c.timestamp.toLocaleDateString('ar')}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add comment */}
      {!showForm ? (
        <motion.button
          whileHover={{ scale: 1.01 }}
          onClick={() => setShowForm(true)}
          className="w-full py-4 font-light text-xs tracking-[0.2em] uppercase transition-all"
          style={{ border: `1px solid rgba(255,255,255,0.08)`, color: scheme.muted, background: 'transparent' }}
        >
          ✦ اترك تعليقاً
        </motion.button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="اسمك"
            className="w-full px-5 py-4 text-sm font-light outline-none transition-all"
            style={{ background: 'transparent', color: scheme.text, border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Georgia, serif' }} />
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="رسالتك من القلب..." rows={3}
            className="w-full px-5 py-4 text-sm font-light outline-none resize-none transition-all"
            style={{ background: 'transparent', color: scheme.text, border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Georgia, serif' }} />
          <div className="flex gap-4">
            <button onClick={addComment}
              className="flex-1 py-4 font-light text-xs tracking-[0.15em] uppercase transition-all"
              style={{ border: `1px solid ${accentColor}60`, color: accentColor, background: 'transparent' }}>
              إرسال
            </button>
            <button onClick={() => setShowForm(false)} className="px-6 py-4 text-xs tracking-wider" style={{ color: scheme.muted }}>
              إلغاء
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}