'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';
import { TextReveal } from './TextReveal';
import { CommentSection } from './CommentSection';
import { MediaUpload } from './MediaUpload';

const scheme = {
  primary: '#1a0a2e',
  secondary: '#2d1b4e',
  accent: '#ff3366',
  background: '#0a0510',
  text: '#f5f5f5',
};

interface Slide {
  id: string;
  headline: string;
  subtext: string;
  reveal: 'typewriter' | 'fade' | 'slide' | 'scramble';
}

const slides: Slide[] = [
  { id: '1', headline: '...', subtext: '', reveal: 'fade' },
  { id: '2', headline: 'في يوم ميلادك', subtext: 'كل سنة وأنتِ بألف خير\nيا أجمل هدية من الله', reveal: 'slide' },
  { id: '3', headline: 'أنتِ النور', subtext: 'اللي يضيء كل مكان\nوتبسط كل من حولك', reveal: 'typewriter' },
  { id: '4', headline: 'من القلب', subtext: 'أتمنى لك سنة مليانة\nفرح وصحة وحب ونجاح', reveal: 'fade' },
  { id: '5', headline: '🎉', subtext: 'عيد ميلاد سعيد يا نور\nكل سنة وأنتِ بخير', reveal: 'scramble' },
];

export function GreetingExperience() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  const goNext = useCallback(() => {
    if (currentSlide >= slides.length - 1) { setEnded(true); return; }
    setCurrentSlide(prev => prev + 1);
  }, [currentSlide]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext]);

  const handleTouch = useCallback(() => { goNext(); }, [goNext]);

  if (!started) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center relative" style={{ background: '#000' }}>
        <ParticleBackground colorScheme={scheme} particleCount={800} speed={0.5} />
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center"
            style={{ background: scheme.accent, boxShadow: `0 0 80px ${scheme.accent}60` }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
          </motion.div>
          <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4" style={{ color: '#f5f5f5' }}
          >
            ✨ معايدة <span style={{ color: scheme.accent }}>سينمائية</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1 }}
            className="text-lg mb-8" style={{ color: '#aaa' }}
          >
            تجربة بصرية فريدة من القلب
          </motion.p>
          <motion.button
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setStarted(true)}
            className="px-10 py-4 rounded-full font-bold text-lg text-white"
            style={{ background: scheme.accent, boxShadow: `0 0 40px ${scheme.accent}40` }}
          >
            ابدأ التجربة
          </motion.button>
        </div>
      </div>
    );
  }

  if (ended) {
    return (
      <div className="min-h-screen" style={{ background: scheme.background }}>
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <ParticleBackground colorScheme={scheme} particleCount={400} speed={0.2} />
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-center px-6"
          >
            <div className="text-7xl mb-6">💌</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#f5f5f5' }}>شكراً لك!</h2>
            <p className="text-lg mb-8" style={{ color: '#aaa' }}>رسالتك وصلت من القلب ❤️</p>
          </motion.div>
        </div>

        <div className="py-16 space-y-16">
          <CommentSection accentColor={scheme.accent} />
          <MediaUpload accentColor={scheme.accent} />
        </div>

        <div className="py-8 text-center" style={{ color: '#444' }}>
          <p className="text-sm">صُمم بحب ❤️ — معايدة سينمائية</p>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="w-screen h-screen relative overflow-hidden" style={{ background: '#000' }}
      onClick={handleTouch} onTouchEnd={handleTouch}
    >
      <ParticleBackground colorScheme={scheme} particleCount={500} speed={0.25} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10"
        >
          {currentSlide === 0 ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
              className="text-8xl"
            >
              🎁
            </motion.div>
          ) : (
            <>
              <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-5xl md:text-7xl font-bold mb-6 text-center"
                style={{ color: scheme.text }}
              >
                <TextReveal text={slide.headline} type={slide.reveal} speed={35} direction="up" />
              </motion.h1>
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 0.8 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl md:text-2xl text-center max-w-xl leading-relaxed"
                style={{ color: scheme.secondary }}
              >
                {slide.subtext.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </motion.p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full transition-all duration-300"
            style={{ background: i === currentSlide ? scheme.accent : 'rgba(255,255,255,0.2)', transform: i === currentSlide ? 'scale(1.5)' : 'scale(1)' }}
          />
        ))}
      </div>
    </div>
  );
}