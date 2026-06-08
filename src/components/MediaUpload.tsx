'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  accentColor: string;
}

export function MediaUpload({ accentColor }: Props) {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploaded(true);
    }
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
        🎬 فيديو أو صورة خاصة
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `2px dashed ${uploaded ? accentColor : 'rgba(255,255,255,0.15)'}`,
          minHeight: '200px',
        }}
      >
        {uploaded ? (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-5xl mb-4"
            >
              ✅
            </motion.div>
            <p className="font-medium mb-1" style={{ color: '#ddd' }}>{fileName}</p>
            <p className="text-sm" style={{ color: '#888' }}>تم الرفع بنجاح</p>
            <button
              onClick={() => { setUploaded(false); setFileName(''); }}
              className="mt-4 text-sm underline"
              style={{ color: accentColor }}
            >
              رفع ملف آخر
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center py-12 px-6 cursor-pointer group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-5xl mb-4 opacity-50 group-hover:opacity-100 transition"
            >
              📹
            </motion.div>
            <p className="font-medium mb-1" style={{ color: '#aaa' }}>اسحب ملفاً هنا أو اضغط للرفع</p>
            <p className="text-xs" style={{ color: '#666' }}>فيديو، صورة، أو صوت — حتى 50 ميغابايت</p>
            <input
              type="file"
              accept="video/*,image/*,audio/*"
              onChange={handleFile}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        )}
      </motion.div>
    </div>
  );
}