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
  background: '#000000',
  text: '#f0ebe3',
  muted: '#6a5a4a',
};

interface Slide {
  id: string;
  type: 'opening' | 'title' | 'message' | 'finale';
  headline?: string;
  subtext?: string;
  emoji?: string;
  reveal: 'typewriter' | 'fade' | 'slide' | 'scramble';
  duration: number;
}

const slides: Slide[] = [
  { id: '0', type: 'opening', emoji: '🎬', duration: 3000, reveal: 'fade' },
  { id: '1', type: 'title', headline: 'في يوم ميلادك', duration: 5000, reveal: 'slide' },
  { id: '2', type: 'message', headline: 'أنتِ النور', subtext: 'اللي يضيء كل مكان\nوتبسط كل من حولك', duration: 6000, reveal: 'typewriter' },
  { id: '3', type: 'message', headline: 'من كل القلب', subtext: 'أتمنى لك سنة مليانة\nفرح وصحة وحب', duration: 5000, reveal: 'fade' },
  { id: '4', type: 'finale', headline: 'عيد ميلاد سعيد', subtext: 'كل سنة وأنتِ بخير ✨', emoji: '💌', duration: 4000, reveal: 'scramble' },
];

export function GreetingExperience() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [showBars, setShowBars] = useState(true);

  const goNext = useCallback(() => {
    if (currentSlide >= slides.length - 1) { setEnded(true); return; }
    setCurrentSlide(prev => prev + 1);
  }, [currentSlide]);

  // Auto-advance
  useEffect(() => {
    if (!started || ended) return;
    const timer = setTimeout(goNext, slides[currentSlide].duration);
    return () => clearTimeout(timer);
  }, [started, ended, currentSlide, goNext]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext]);

  // ─── CINEMATIC LANDING ──────────────────────────────────────────────
  if (!started) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: '#000' }}>
        <ParticleBackground colorScheme={scheme} particleCount={300} speed={0.15} />

        {/* Film grain overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
        />

        {/* Letterbox bars */}
        <div className="absolute top-0 left-0 right-0 h-[12vh] bg-black z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-[12vh] bg-black z-20" />

        <div className="relative z-10 text-center px-6 max-w-lg">
          {/* Studio logo style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
            className="mb-12"
          >
            <div className="w-px h-16 mx-auto mb-6" style={{ background: `linear-gradient(180deg, transparent, ${scheme.accent}60, transparent)` }} />
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: scheme.muted }}>A Cinematic Experience</p>
            <div className="w-px h-8 mx-auto mt-6" style={{ background: `linear-gradient(180deg, ${scheme.accent}60, transparent)` }} />
          </motion.div>

          {/* Title */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2 }}>
            <h1 className="text-6xl md:text-8xl font-light mb-2" style={{ color: scheme.text, fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
              معايدة
            </h1>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(90deg, transparent, ${scheme.accent})` }} />
              <span className="text-xs tracking-[0.2em]" style={{ color: scheme.accent }}>✦</span>
              <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(90deg, ${scheme.accent}, transparent)` }} />
            </div>
            <h1 className="text-6xl md:text-8xl font-light" style={{ color: scheme.accent, fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
              سينمائية
            </h1>
          </motion.div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setStarted(true)}
            className="mt-16 px-10 py-3 rounded-none font-light text-sm tracking-[0.15em] uppercase transition-all"
            style={{
              border: `1px solid ${scheme.accent}40`,
              color: scheme.accent,
              background: 'transparent',
            }}
          >
            ▶ شاهد
          </motion.button>
        </div>
      </div>
    );
  }

  // ─── ENDING ──────────────────────────────────────────────────────────
  if (ended) {
    return (
      <div className="min-h-screen" style={{ background: '#000' }}>
        {/* Credits style ending */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <ParticleBackground colorScheme={scheme} particleCount={200} speed={0.1} />

          {/* Film grain */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
          />

          <div className="absolute top-0 left-0 right-0 h-[12vh] bg-black z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-[12vh] bg-black z-20" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="relative z-10 text-center px-6"
          >
            <div className="w-px h-20 mx-auto mb-8" style={{ background: `linear-gradient(180deg, transparent, ${scheme.accent}60, transparent)` }} />
            <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: scheme.muted }}>Fin</p>
            <h2 className="text-4xl md:text-6xl font-light mb-4" style={{ color: scheme.text, fontFamily: 'Georgia, serif' }}>
              شكراً لك
            </h2>
            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${scheme.accent})` }} />
              <span className="text-xs" style={{ color: scheme.accent }}>❤️</span>
              <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${scheme.accent}, transparent)` }} />
            </div>
            <p className="text-sm" style={{ color: scheme.muted }}>رسالتك وصلت من القلب</p>
            <div className="w-px h-20 mx-auto mt-8" style={{ background: `linear-gradient(180deg, ${scheme.accent}60, transparent)` }} />
          </motion.div>
        </div>

        {/* Sections */}
        <div className="relative z-10 py-24 space-y-24">
          <CommentSection accentColor={scheme.accent} scheme={scheme} />
          <MediaUpload accentColor={scheme.accent} scheme={scheme} />
        </div>

        {/* Footer credits */}
        <div className="py-16 text-center border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: scheme.muted }}>صُمم بحب ✦ 2026</p>
        </div>
      </div>
    );
  }

  // ─── CINEMATIC SLIDES ────────────────────────────────────────────────
  const slide = slides[currentSlide];

  return (
    <div className="w-screen h-screen relative overflow-hidden cursor-pointer" style={{ background: '#000' }}
      onClick={goNext}
    >
      <ParticleBackground colorScheme={scheme} particleCount={150} speed={0.1} />

      {/* Film grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-30"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      {/* Letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-[12vh] bg-black z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-[12vh] bg-black z-20" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10"
        >
          {slide.type === 'opening' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="text-8xl md:text-9xl"
            >
              {slide.emoji}
            </motion.div>
          )}

          {slide.type === 'title' && (
            <div className="text-center">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 1.5 }}
                className="mx-auto mb-10 h-px w-24"
                style={{ background: `linear-gradient(90deg, transparent, ${scheme.accent}, transparent)` }}
              />
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl md:text-8xl font-light"
                style={{ color: scheme.text, fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}
              >
                <TextReveal text={slide.headline || ''} type={slide.reveal} speed={25} direction="up" />
              </motion.h1>
            </div>
          )}

          {slide.type === 'message' && (
            <div className="text-center max-w-xl">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-light mb-10"
                style={{ color: scheme.text, fontFamily: 'Georgia, serif', letterSpacing: '0.03em' }}
              >
                <TextReveal text={slide.headline || ''} type={slide.reveal} speed={30} direction="up" />
              </motion.h1>
              {slide.subtext && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 1, duration: 1.5 }}
                >
                  {slide.subtext.split('\n').map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + i * 0.3 }}
                      className="text-lg md:text-xl font-light leading-relaxed"
                      style={{ color: scheme.muted, fontFamily: 'Georgia, serif' }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </motion.div>
              )}
            </div>
          )}

          {slide.type === 'finale' && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.3, duration: 1.5 }}
                className="text-7xl md:text-8xl mb-8"
              >
                {slide.emoji}
              </motion.div>
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.2 }}
                className="text-5xl md:text-7xl font-light mb-6"
                style={{ color: scheme.text, fontFamily: 'Georgia, serif' }}
              >
                <TextReveal text={slide.headline || ''} type={slide.reveal} speed={30} direction="up" />
              </motion.h1>
              {slide.subtext && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 1.5 }}
                  className="text-lg"
                  style={{ color: scheme.muted, fontFamily: 'Georgia, serif' }}
                >
                  {slide.subtext}
                </motion.p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute bottom-[12vh] left-0 right-0 h-px z-20" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          key={currentSlide}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: slides[currentSlide].duration / 1000, ease: 'linear' }}
          className="h-full origin-left"
          style={{ background: scheme.accent }}
        />
      </div>

      {/* Timecode */}
      <div className="absolute bottom-[calc(12vh+12px)] left-8 z-20">
        <p className="text-[10px] tracking-[0.15em] font-mono" style={{ color: scheme.muted }}>
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}