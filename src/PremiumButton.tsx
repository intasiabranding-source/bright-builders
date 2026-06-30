import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface PremiumButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  showArrow?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  onClick,
  children,
  showArrow = true,
  className = '',
  type = 'button',
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic button displacement settings
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Config spring transitions for luxurious feedback response (no jitter)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Relative coordinate of cursor inside button
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    // Magnetic offset calculation (max displacement 12px)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const dragX = (localX - centerX) * 0.15;
    const dragY = (localY - centerY) * 0.25;

    x.set(dragX);
    y.set(dragY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
      className={`
        relative group flex items-center justify-center gap-2.5 px-8 py-3.5 
        rounded-full bg-transparent border-none text-white! font-bold 
        text-sm tracking-wide shadow-none overflow-hidden select-none cursor-pointer
        transition-all duration-[600ms] cubic-bezier(0.23, 1, 0.32, 1)
        hover:text-white hover:shadow-[0_0_0_5px_rgba(138,120,180,0.38)]
        focus:outline-none focus:ring-2 focus:ring-[#8A78B4]/40 focus:ring-offset-2 
        focus:ring-offset-[#FAF5F0] ${className}
      `}
      style={{
        boxShadow: isHovered 
          ? '0 0 0 5px rgba(138, 120, 180, 0.38)' 
          : 'inset 0 0 0 2px rgba(138, 120, 180, 0.25)',
        x: springX,
        y: springY
      }}
    >
      {/* Inner background expanding bubble element */}
      <span 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-[800ms] cubic-bezier(0.23, 1, 0.32, 1) -z-10"
        style={{
          width: isHovered ? '600px' : '20px',
          height: isHovered ? '600px' : '20px',
          backgroundColor: '#8A78B4', // Lavender Accent Bubble
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Button text layout */}
      <span className="relative z-10 font-bold tracking-wide select-none text-white!">{children}</span>

      {/* Slide Arrow layout */}
      {showArrow && (
        <motion.div
          animate={{ x: isHovered ? 6 : 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
          className="relative z-10 flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
};
