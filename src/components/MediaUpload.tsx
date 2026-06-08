'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  accentColor: string;
  scheme: { text: string; muted: string; background: string };
}

export function MediaUpload({ accentColor, scheme }: Props) {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setFileName(file.name); setUploaded(true); }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-6">
      {/* Section title */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <div className="mx-auto mb-4 h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
        <h3 className="text-2xl md:text-3xl font-bold" style={{ color: scheme.text, fontFamily: 'Georgia, serif' }}>
          فيديو أو صورة خاصة
        </h3>
        <p className="text-sm mt-2" style={{ color: scheme.muted }}>أضف لمسة شخصية</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden backdrop-blur-md"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${uploaded ? accentColor + '40' : 'rgba(255,255,255,0.06)'}`,
          minHeight: '220px',
        }}
      >
        {uploaded ? (
          <div className="flex flex-col items-center justify-center py-14 px-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.4 }}
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{ background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`, border: `1px solid ${accentColor}30` }}
            >
              <span className="text-2xl">✓</span>
            </motion.div>
            <p className="font-medium mb-1 text-sm" style={{ color: scheme.text }}>{fileName}</p>
            <p className="text-xs mb-4" style={{ color: scheme.muted }}>تم الرفع بنجاح</p>
            <button onClick={() => { setUploaded(false); setFileName(''); }}
              className="text-xs underline transition-colors" style={{ color: accentColor }}>
              رفع ملف آخر
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center py-14 px-6 cursor-pointer group">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-all group-hover:shadow-lg"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(255,255,255,0.15)',
              }}
            >
              <span className="text-2xl opacity-50 group-hover:opacity-100 transition">📹</span>
            </motion.div>
            <p className="font-medium text-sm mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              اسحب ملفاً هنا أو اضغط للرفع
            </p>
            <p className="text-xs" style={{ color: scheme.muted }}>فيديو، صورة، أو صوت — حتى 50 ميغابايت</p>
            <input type="file" accept="video/*,image/*,audio/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
          </label>
        )}
      </motion.div>
    </div>
  );
}