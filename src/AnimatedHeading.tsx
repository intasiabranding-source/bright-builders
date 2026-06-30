import React, { useEffect, useState } from 'react';

interface AnimatedHeadingProps {
  text: string;
  initialDelay?: number; // starts after 200ms default
  charDelay?: number; // 30ms character delay
  className?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  initialDelay = 200,
  charDelay = 30,
  className = '',
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  const lines = text.split('\n');

  // We need to keep a running count of total characters to calculate correct delays across lines
  let charCounter = 0;

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => {
        const chars = Array.from(line);
        const lineElement = (
          <span key={lineIndex} className="block whitespace-nowrap">
            {chars.map((char, charIndex) => {
              const delay = charCounter * charDelay;
              charCounter++;

              return (
                <span
                  key={charIndex}
                  className="inline-block transition-all duration-[500ms] ease-out"
                  style={{
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateX(0)' : 'translateX(-18px)',
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        );
        return lineElement;
      })}
    </h1>
  );
};
