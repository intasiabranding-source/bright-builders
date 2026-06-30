import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [scene, setScene] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const easeBezier = [0.22, 1, 0.36, 1] as any;

  useEffect(() => {
    if (prefersReducedMotion) {
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 1000);
      return () => clearTimeout(exitTimer);
    }

    // Sequence timelines
    const scene2Timer = setTimeout(() => setScene(2), 800);
    const scene3Timer = setTimeout(() => setScene(3), 1600);
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearTimeout(scene2Timer);
      clearTimeout(scene3Timer);
      clearTimeout(exitTimer);
    };
  }, [onComplete, prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ 
          opacity: 0, 
          scale: 0.98, 
          filter: "blur(8px)",
          transition: { duration: 0.65, ease: easeBezier }
        }}
        className="fixed inset-0 bg-[#000000] z-[99999] flex flex-col items-center justify-center select-none overflow-hidden"
        style={{ transformStyle: "preserve-3d", transformPerspective: 1000 }}
      >
        <div className="relative w-full max-w-4xl px-6 text-center flex flex-col items-center justify-center h-full">
          
          {/* Scene 1: HELLO */}
          {scene === 1 && (
            <div className="flex justify-center items-center overflow-hidden py-4">
              {Array.from("HELLO").map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)", rotateX: 6 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: easeBezier,
                    delay: idx * 0.05
                  }}
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900 }}
                  className="text-5xl sm:text-7xl md:text-8xl tracking-tight text-white! text-white inline-block origin-bottom"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          )}

          {/* Scene 2: WELCOME TO */}
          {scene === 2 && (
            <div className="overflow-hidden py-4">
              <motion.h2
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: easeBezier }}
                style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900 }}
                className="text-5xl sm:text-7xl md:text-9xl tracking-wider text-white! text-white uppercase"
              >
                Welcome To
              </motion.h2>
            </div>
          )}

          {/* Scene 3: BRIGHT BUILDERS */}
          {scene === 3 && (
            <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6">
              {/* Hero Moment mask reveal */}
              <div className="overflow-hidden py-2 flex flex-wrap justify-center gap-x-4">
                {["BRIGHT", "BUILDERS"].map((word, wIdx) => (
                  <div key={wIdx} className="flex overflow-hidden py-1">
                    {Array.from(word).map((char, cIdx) => (
                      <motion.span
                        key={cIdx}
                        initial={{ opacity: 0, y: 70, filter: "blur(8px)", scale: 1.05 }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                        transition={{
                          duration: 0.9,
                          ease: easeBezier,
                          delay: wIdx * 0.15 + cIdx * 0.03
                        }}
                        style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900 }}
                        className="text-4xl sm:text-6xl md:text-8xl tracking-tight text-white! text-white inline-block origin-bottom"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </div>

              {/* Subtext display */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: easeBezier, delay: 0.3 }}
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900 }}
                  className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.25em] text-white! text-white flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-2"
                >
                  <span>Designing Spaces</span>
                  <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-white!" />
                  <span>Building Dreams</span>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
