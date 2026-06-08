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
    <div className="w-full max-w-xl mx-auto px-6">
      {/* Section title */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <div className="mx-auto mb-4 h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
        <h3 className="text-2xl md:text-3xl font-bold" style={{ color: scheme.text, fontFamily: 'Georgia, serif' }}>
          تعليقات الحضور
        </h3>
        <p className="text-sm mt-2" style={{ color: scheme.muted }}>كلمات من القلب</p>
      </motion.div>

      {/* Comments list */}
      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {comments.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-2xl p-5 backdrop-blur-md overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Accent line */}
              <div className="absolute top-0 right-0 w-1 h-full" style={{ background: `linear-gradient(180deg, ${accentColor}40, transparent)` }} />

              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}10)`, color: accentColor, border: `1px solid ${accentColor}30` }}>
                  {c.name[0]}
                </div>
                <div>
                  <span className="font-medium text-sm" style={{ color: scheme.text }}>{c.name}</span>
                  <span className="block text-xs" style={{ color: scheme.muted }}>{c.timestamp.toLocaleDateString('ar')}</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed pr-2" style={{ color: 'rgba(255,255,255,0.6)' }}>{c.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add comment */}
      {!showForm ? (
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="w-full py-3.5 rounded-xl font-medium text-sm transition-all"
          style={{
            border: `1px dashed ${accentColor}50`,
            color: accentColor,
            background: `linear-gradient(135deg, ${accentColor}08, ${accentColor}04)`,
          }}
        >
          ✦ اترك تعليقاً
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 space-y-4 backdrop-blur-md"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <input value={name} onChange={e => setName(e.target.value)} placeholder="اسمك"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-1"
            style={{ background: 'rgba(255,255,255,0.05)', color: scheme.text, border: '1px solid rgba(255,255,255,0.08)', ['--tw-ring-color' as string]: accentColor }} />
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="رسالتك من القلب..." rows={3}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all focus:ring-1"
            style={{ background: 'rgba(255,255,255,0.05)', color: scheme.text, border: '1px solid rgba(255,255,255,0.08)' }} />
          <div className="flex gap-3">
            <button onClick={addComment}
              className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}>
              إرسال ✦
            </button>
            <button onClick={() => setShowForm(false)} className="px-5 py-3 rounded-xl text-sm" style={{ color: scheme.muted }}>
              إلغاء
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}