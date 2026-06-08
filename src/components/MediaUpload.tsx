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
    <div className="w-full max-w-lg mx-auto px-8">
      {/* Section header */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} className="text-center mb-16">
        <div className="w-px h-12 mx-auto mb-6" style={{ background: `linear-gradient(180deg, transparent, ${accentColor}50, transparent)` }} />
        <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: scheme.muted }}>Personal touch</p>
        <h3 className="text-3xl md:text-4xl font-light" style={{ color: scheme.text, fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
          فيديو أو صورة خاصة
        </h3>
        <div className="w-px h-12 mx-auto mt-6" style={{ background: `linear-gradient(180deg, ${accentColor}50, transparent)` }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="relative"
      >
        {uploaded ? (
          <div className="py-16 text-center" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.3 }}
              className="text-4xl mb-6"
            >
              ✓
            </motion.div>
            <p className="font-light text-sm mb-2" style={{ color: scheme.text, fontFamily: 'Georgia, serif' }}>{fileName}</p>
            <p className="text-xs mb-6" style={{ color: scheme.muted }}>تم الرفع بنجاح</p>
            <button onClick={() => { setUploaded(false); setFileName(''); }}
              className="text-xs tracking-wider underline" style={{ color: accentColor }}>
              رفع ملف آخر
            </button>
          </div>
        ) : (
          <label className="block py-16 text-center cursor-pointer group transition-all"
            style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
            <motion.div whileHover={{ scale: 1.05 }}
              className="text-4xl mb-6 opacity-30 group-hover:opacity-60 transition"
            >
              📹
            </motion.div>
            <p className="font-light text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Georgia, serif' }}>
              اسحب ملفاً هنا أو اضغط للرفع
            </p>
            <p className="text-[10px] tracking-wider" style={{ color: scheme.muted }}>فيديو، صورة، أو صوت</p>
            <input type="file" accept="video/*,image/*,audio/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
          </label>
        )}
      </motion.div>
    </div>
  );
}