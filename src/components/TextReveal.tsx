'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const scrambleChars = '!<>-_\\/[]{}—=+*^?#@$%&';

function scrambleText(text: string, progress: number): string {
  return text.split('').map((char, i) => {
    const p = (progress * text.length - i) / 3;
    if (p >= 1) return char;
    if (p <= 0) return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    return p > 0.5 ? char : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  }).join('');
}

interface Props {
  text: string;
  type?: 'typewriter' | 'fade' | 'slide' | 'blur' | 'scramble';
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down' | 'center';
  className?: string;
  onComplete?: () => void;
}

export function TextReveal({ text, type = 'fade', speed = 50, direction = 'up', className = '', onComplete }: Props) {
  const [displayText, setDisplayText] = useState('');
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayText('');
    if (type === 'typewriter') {
      let i = 0;
      const tick = (time: number) => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i));
          i++;
          animRef.current = requestAnimationFrame(tick);
        } else { onComplete?.(); }
      };
      animRef.current = requestAnimationFrame(tick);
    } else if (type === 'scramble') {
      const dur = text.length * 40 + 500;
      const start = performance.now();
      const tick = (time: number) => {
        const p = Math.min(1, (time - start) / dur);
        setDisplayText(scrambleText(text, p));
        if (p < 1) animRef.current = requestAnimationFrame(tick);
        else { setDisplayText(text); onComplete?.(); }
      };
      animRef.current = requestAnimationFrame(tick);
    } else {
      setDisplayText(text);
      onComplete?.();
    }
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [text, type, onComplete]);

  const init = direction === 'left' ? { x: -50, opacity: 0 } :
    direction === 'right' ? { x: 50, opacity: 0 } :
    direction === 'up' ? { y: 30, opacity: 0 } :
    direction === 'down' ? { y: -30, opacity: 0 } :
    { opacity: 0, scale: 0.9 };

  return (
    <AnimatePresence mode="wait">
      <motion.span key={displayText} initial={init} animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }} className={className} style={{ display: 'inline-block' }}>
        {displayText || <span style={{ visibility: 'hidden' }}>{text}</span>}
      </motion.span>
    </AnimatePresence>
  );
}