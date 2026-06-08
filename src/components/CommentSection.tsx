'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

interface Props {
  accentColor: string;
}

export function CommentSection({ accentColor }: Props) {
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', name: 'سارة', message: 'كل سنة وأنتِ بخير يا قمر! 🌙✨', timestamp: new Date('2026-06-07') },
    { id: '2', name: 'أحمد', message: 'أحلى معايدة شفتها! الله يسعدك 💕', timestamp: new Date('2026-06-07') },
  ]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const addComment = () => {
    if (!name.trim() || !message.trim()) return;
    setComments(prev => [...prev, {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date(),
    }]);
    setName(''); setMessage(''); setShowForm(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-center mb-8"
        style={{ color: '#f5f5f5' }}
      >
        💬 تعليقات الحضور
      </motion.h3>

      <div className="space-y-4 mb-6">
        <AnimatePresence>
          {comments.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-4 backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: accentColor, color: '#fff' }}>
                  {c.name[0]}
                </div>
                <span className="font-medium text-sm" style={{ color: '#ddd' }}>{c.name}</span>
                <span className="text-xs" style={{ color: '#666' }}>{c.timestamp.toLocaleDateString('ar')}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#bbb' }}>{c.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!showForm ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="w-full py-3 rounded-xl font-medium text-sm transition"
          style={{ border: `1px dashed ${accentColor}`, color: accentColor, background: 'transparent' }}
        >
          ✍️ اترك تعليقاً
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 space-y-3"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="اسمك"
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.08)', color: '#f5f5f5', border: '1px solid rgba(255,255,255,0.1)' }}
          />
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="رسالتك..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
            style={{ background: 'rgba(255,255,255,0.08)', color: '#f5f5f5', border: '1px solid rgba(255,255,255,0.1)' }}
          />
          <div className="flex gap-3">
            <button onClick={addComment} className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white" style={{ background: accentColor }}>
              إرسال
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl text-sm" style={{ color: '#888' }}>
              إلغاء
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}