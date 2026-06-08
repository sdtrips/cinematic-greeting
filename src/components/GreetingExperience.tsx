'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';
import { TextReveal } from './TextReveal';
import { CommentSection } from './CommentSection';
import { MediaUpload } from './MediaUpload';

const scheme = {
  primary: '#0a0510',
  secondary: '#1a0a2e',
  accent: '#d4a574',
  accentAlt: '#ff3366',
  background: '#050208',
  text: '#faf5ef',
  muted: '#8a7a6a',
};

interface Slide {
  id: string;
  emoji?: string;
  headline: string;
  subtext: string;
  reveal: 'typewriter' | 'fade' | 'slide' | 'scramble';
  bg?: string;
}

const slides: Slide[] = [
  { id: '0', headline: '', subtext: '', reveal: 'fade', emoji: '🎁' },
  { id: '1', headline: 'في يوم ميلادك', subtext: 'كل سنة وأنتِ بألف خير\nيا أجمل هدية من الله لنا', reveal: 'slide' },
  { id: '2', headline: 'أنتِ النور', subtext: 'اللي يضيء كل مكان\nوتبسط كل من حولك بابتسامتك', reveal: 'typewriter' },
  { id: '3', headline: 'من كل القلب', subtext: 'أتمنى لك سنة مليانة\nفرح وصحة وحب ونجاح', reveal: 'fade' },
  { id: '4', headline: '✨', subtext: 'عيد ميلاد سعيد يا نور\nكل سنة وأنتِ بخير', reveal: 'scramble' },
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

  // ─── LANDING ────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: scheme.background }}>
        <ParticleBackground colorScheme={scheme} particleCount={900} speed={0.4} />

        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1, 2, 3].map(i => (
            <motion.div key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.08 }}
              transition={{ delay: i * 0.4, duration: 2, ease: 'easeOut' }}
              className="absolute rounded-full"
              style={{
                width: `${i * 280}px`, height: `${i * 280}px`,
                border: `1px solid ${scheme.accent}`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-xl">
          {/* Crown / Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 1.2, type: 'spring', bounce: 0.3 }}
            className="w-24 h-24 mx-auto mb-10 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${scheme.accent}, ${scheme.accentAlt})`,
              boxShadow: `0 0 100px ${scheme.accent}40, 0 0 200px ${scheme.accentAlt}20`,
            }}
          >
            <span className="text-4xl">👑</span>
          </motion.div>

          {/* Title */}
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-3 leading-tight" style={{ color: scheme.text, fontFamily: 'Georgia, serif' }}>
              معايدة
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{
              background: `linear-gradient(135deg, ${scheme.accent}, ${scheme.accentAlt})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              سينمائية
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.4, duration: 1 }}
            className="text-base md:text-lg mb-12 leading-relaxed"
            style={{ color: scheme.muted, fontFamily: 'Georgia, serif' }}
          >
            تجربة بصرية فريدة تحكي قصة من القلب
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: `0 0 60px ${scheme.accent}50` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setStarted(true)}
            className="relative px-12 py-4 rounded-full font-bold text-lg overflow-hidden"
            style={{ color: scheme.background }}
          >
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${scheme.accent}, ${scheme.accentAlt})` }} />
            <span className="relative z-10">ابدأ التجربة ✦</span>
          </motion.button>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.2, duration: 1.5 }}
            className="mt-12 mx-auto h-px w-40"
            style={{ background: `linear-gradient(90deg, transparent, ${scheme.accent}60, transparent)` }}
          />
        </div>
      </div>
    );
  }

  // ─── ENDING ──────────────────────────────────────────────────────────
  if (ended) {
    return (
      <div className="min-h-screen" style={{ background: scheme.background }}>
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <ParticleBackground colorScheme={scheme} particleCount={500} speed={0.15} />
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 text-center px-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-7xl md:text-8xl mb-8"
            >
              💌
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: scheme.text, fontFamily: 'Georgia, serif' }}>
              شكراً لك
            </h2>
            <div className="mx-auto my-6 h-px w-32" style={{ background: `linear-gradient(90deg, transparent, ${scheme.accent}, transparent)` }} />
            <p className="text-lg" style={{ color: scheme.muted }}>رسالتك وصلت من القلب ❤️</p>
          </motion.div>
        </div>

        <div className="relative z-10 py-20 space-y-20">
          <CommentSection accentColor={scheme.accent} scheme={scheme} />
          <MediaUpload accentColor={scheme.accent} scheme={scheme} />
        </div>

        <div className="py-10 text-center" style={{ color: '#333' }}>
          <div className="mx-auto mb-4 h-px w-24" style={{ background: `linear-gradient(90deg, transparent, ${scheme.accent}30, transparent)` }} />
          <p className="text-xs" style={{ color: scheme.muted }}>صُمم بحب ✦ معايدة سينمائية</p>
        </div>
      </div>
    );
  }

  // ─── SLIDES ──────────────────────────────────────────────────────────
  const slide = slides[currentSlide];

  return (
    <div className="w-screen h-screen relative overflow-hidden cursor-pointer" style={{ background: scheme.background }}
      onClick={goNext} onTouchEnd={(e) => { e.preventDefault(); goNext(); }}
    >
      <ParticleBackground colorScheme={scheme} particleCount={400} speed={0.2} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10"
        >
          {currentSlide === 0 ? (
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.4, duration: 1.2 }}
              className="text-8xl md:text-9xl"
            >
              {slide.emoji}
            </motion.div>
          ) : (
            <div className="max-w-2xl text-center">
              {/* Decorative top line */}
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="mx-auto mb-8 h-px w-20"
                style={{ background: `linear-gradient(90deg, transparent, ${scheme.accent}, transparent)` }}
              />

              {/* Headline */}
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
                style={{ color: scheme.text, fontFamily: 'Georgia, serif' }}
              >
                <TextReveal text={slide.headline} type={slide.reveal} speed={30} direction="up" />
              </motion.h1>

              {/* Subtext */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-2"
              >
                {slide.subtext.split('\n').map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.2 }}
                    className="text-xl md:text-2xl leading-relaxed"
                    style={{ color: scheme.muted, fontFamily: 'Georgia, serif' }}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>

              {/* Decorative bottom line */}
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mx-auto mt-8 h-px w-20"
                style={{ background: `linear-gradient(90deg, transparent, ${scheme.accent}, transparent)` }}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === currentSlide ? 1.3 : 1,
              opacity: i === currentSlide ? 1 : 0.3,
            }}
            className="w-2 h-2 rounded-full"
            style={{ background: i === currentSlide ? scheme.accent : scheme.muted }}
          />
        ))}
      </div>

      {/* Subtle hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 3 }}
        className="absolute bottom-20 left-0 right-0 text-center z-20"
      >
        <p className="text-xs" style={{ color: scheme.muted }}>اضغط للمتابعة</p>
      </motion.div>
    </div>
  );
}