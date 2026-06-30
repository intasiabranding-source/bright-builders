import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
  scrub?: boolean;
  triggerStart?: string;
  triggerEnd?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  triggerStart = "top 80%",
  triggerEnd = "top 30%",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking inside container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [
      (triggerStart.startsWith("top") ? "start" : "end") + " " + triggerStart.split(" ")[1],
      (triggerEnd.startsWith("top") ? "start" : "end") + " " + triggerEnd.split(" ")[1]
    ] as any
  });

  // Smooth out scrub transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001
  });

  // Memoize splitting text to prevent unnecessary layout computations
  const splitData = useMemo(() => {
    const lines = text.split('\n');
    let totalCharIndex = 0;
    let totalWordIndex = 0;

    return lines.map((line) => {
      const words = line.split(' ');
      return {
        words: words.map((word) => {
          const chars = Array.from(word);
          const wordData = {
            chars,
            startCharIdx: totalCharIndex,
            wordIdx: totalWordIndex
          };
          totalCharIndex += chars.length;
          totalWordIndex += 1;
          return wordData;
        }),
      };
    });
  }, [text]);

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {text.split('\n').map((line, idx) => (
          <div key={idx} className="block">
            {line}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`select-none ${className}`}>
      {splitData.map((line, lineIdx) => (
        <span 
          key={lineIdx} 
          className="block overflow-hidden whitespace-nowrap"
          style={{ perspective: '1000px' }}
        >
          {line.words.map((word, wordIdx) => {
            const wordDelay = word.wordIdx * 0.08 + lineIdx * 0.18;
            
            return (
              <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                {word.chars.map((char, charIdx) => {
                  const charDelay = wordDelay + charIdx * 0.03;
                  
                  // Compute scroll thresholds for scrub mapping
                  const thresholdStart = Math.min(charDelay * 0.2, 0.9);
                  const thresholdEnd = Math.min(thresholdStart + 0.3, 1.0);

                  return (
                    <CharacterWrapper
                      key={charIdx}
                      char={char}
                      progress={smoothProgress}
                      start={thresholdStart}
                      end={thresholdEnd}
                    />
                  );
                })}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
};

// Extracted sub-component to prevent calling useTransform hooks dynamically in loops
interface CharacterWrapperProps {
  char: string;
  progress: any;
  start: number;
  end: number;
}

const CharacterWrapper: React.FC<CharacterWrapperProps> = ({ char, progress, start, end }) => {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [80, 0]);
  const blurVal = useTransform(progress, [start, end], [12, 0]);
  const rotateX = useTransform(progress, [start, end], [8, 0]);
  const letterSpacing = useTransform(progress, [start, end], ["0.08em", "0em"]);
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <motion.span
      className="inline-block origin-bottom will-change-[transform,opacity,filter]"
      style={{
        opacity,
        y,
        filter,
        rotateX,
        letterSpacing,
        transformPerspective: 1000,
        transformStyle: "preserve-3d"
      }}
    >
      {char}
    </motion.span>
  );
};
