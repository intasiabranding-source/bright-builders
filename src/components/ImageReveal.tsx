"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  description: string;
  imgUrl: string;
}

const projectsData: ProjectItem[] = [
  {
    id: "p1",
    number: "01",
    title: "Master Teak Bedroom",
    description: "A luxury bedroom layout anchored by a custom solid teak wood bed frame, complemented by minimalist hanging pendant lights and warm ambient side illumination.",
    imgUrl: "/port1.jpg",
  },
  {
    id: "p2",
    number: "02",
    title: "Minimalist Vanity Suite",
    description: "An elegant wash space featuring custom-patterned luxury wall tiling, a round floating mirror, and integrated warm sconce lighting that highlights the circular ceramic wash basin.",
    imgUrl: "/port2.jpg",
  },
  {
    id: "p3",
    number: "03",
    title: "High-Gloss Modular Kitchen",
    description: "A clean U-shaped modular kitchen designed with seamless white acrylic cabinetry, integrated under-cabinet LED lines, and modern bar seating surfaces.",
    imgUrl: "/port3.jpg",
  },
  {
    id: "p4",
    number: "04",
    title: "Modern Dining Space",
    description: "A premium open-plan dining area featuring custom marble-top tables, leather-bound seating, and ambient light drops reflecting off polished surfaces.",
    imgUrl: "/port4.jpg",
  },
  {
    id: "p5",
    number: "05",
    title: "Floating Pooja Altar",
    description: "A serene prayer niche featuring a wall-mounted wooden drawer unit, a circular teak backdrop panel, and polished brass idols set against micro-blind shadows.",
    imgUrl: "/port5.jpg",
  },
  {
    id: "p6",
    number: "06",
    title: "Floating Pooja Altar",
    description: "A serene prayer niche featuring a wall-mounted wooden drawer unit, a circular teak backdrop panel, and polished brass idols set against micro-blind shadows.",
    imgUrl: "/port6.jpg",
  },
  {
    id: "p7",
    number: "07",
    title: "Modern Dining Space",
    description: "A spacious dining room arrangement featuring a polished marble dining table, comfortable chairs, and pendant lighting drop lamps.",
    imgUrl: "/port7.jpg",
  },
  {
    id: "p8",
    number: "08",
    title: "Executive Wash Studio",
    description: "A high-contrast hand-wash alcove featuring vertical tiling, a black ceramic vessel sink, and warm spherical brass pendant lighting.",
    imgUrl: "/port8.jpg",
  },
  {
    id: "p9",
    number: "09",
    title: "Architectural Living Lounge",
    description: "A double-height living room featuring custom Roman blinds, a plush sectional sofa in warm earthy tones, and a sleek marble coffee table.",
    imgUrl: "/port9.jpg",
  },
  {
    id: "p10",
    number: "10",
    title: "Bespoke Dining Corner",
    description: "A luxury dining nook featuring a custom marble-top dining table, leather dining chairs, and a round ceramic vase with green foliage details.",
    imgUrl: "/port10.jpg",
  },
];

export function ImageRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mouse tilt variables
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smoothed tilt angles (max 4 degrees)
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 25 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 120, damping: 25 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
  });

  // Circular progress calculations
  const strokeDashoffset = useTransform(springProgress, (progress) => {
    const circumference = 2 * Math.PI * 24; // r=24
    return circumference - progress * circumference;
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1);
        const index = Math.min(
          Math.floor(progress * projectsData.length),
          projectsData.length - 1
        );
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse movement capture inside the sticky section
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rightSideRef.current) return;
    const rect = rightSideRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white" style={{ height: "400vh" }}>
      {/* 2-3% Opacity Film Grain Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Sticky container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col md:flex-row bg-black">
        
        {/* Left Column: Narrative Content */}
        <div className="w-full md:w-1/2 h-[30vh] md:h-full flex flex-col justify-between p-6 md:p-16 lg:p-24 z-10 select-none text-white!">
          {/* Floating Section Number */}
          <div className="overflow-hidden h-12 md:h-16 relative">
            <motion.span
              key={activeIndex}
              initial={{ y: 50, rotateX: 45, opacity: 0 }}
              animate={{ y: 0, rotateX: 0, opacity: 0.15 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-7xl font-bold tracking-widest block font-sans text-white/15 text-white!"
            >
              {projectsData[activeIndex].number}
            </motion.span>
          </div>

          {/* Heading with Character-by-Character transition */}
          <div className="space-y-2 md:space-y-6 max-w-md text-white!">
            <div className="overflow-hidden">
              <h2 className="text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight font-display text-white! text-white flex flex-wrap gap-x-2">
                {projectsData[activeIndex].title.split(" ").map((word, wIdx) => (
                  <span key={wIdx} className="inline-block overflow-hidden py-0.5 md:py-1 text-white!">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ 
                         duration: 0.8, 
                         ease: [0.22, 1, 0.36, 1],
                         delay: wIdx * 0.1 
                      }}
                      className="inline-block text-white!"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h2>
            </div>
            
            <div className="overflow-hidden flex flex-col gap-3">
              <motion.p
                key={activeIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 0.95 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="hidden md:block text-xs sm:text-sm md:text-base text-white! font-light leading-relaxed font-sans"
              >
                {projectsData[activeIndex].description}
              </motion.p>
            </div>
          </div>

          {/* Bottom labeling */}
          <div className="hidden md:flex items-center gap-4 text-[10px] md:text-xs tracking-widest uppercase opacity-90 text-white! text-white font-sans font-bold">
            <span>Portfolio</span>
            <span className="w-2 h-2 rounded-full bg-[#8A78B4]" />
            <span>BT Bright Builders</span>
          </div>
        </div>

        {/* Right Column: Visual Stacking Area */}
        <div 
          ref={rightSideRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full md:w-1/2 h-[70vh] md:h-full relative overflow-hidden bg-black cursor-crosshair"
        >
          {/* Soft vignette overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none z-20" />

          {/* Stacking layer images */}
          {projectsData.map((project, idx) => {
            const isCurrent = idx === activeIndex;
            const isPast = idx < activeIndex;

            return (
              <motion.div
                key={project.id}
                initial={false}
                animate={{
                  clipPath: isCurrent 
                    ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
                    : isPast 
                      ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                      : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                  scale: isCurrent ? 1 : isPast ? 0.95 : 1.1,
                  filter: isCurrent ? "blur(0px) brightness(1)" : isPast ? "blur(8px) brightness(0.5)" : "blur(10px) brightness(0.4)",
                  opacity: isCurrent ? 1 : isPast ? 1 : 0,
                  zIndex: idx,
                }}
                style={{
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformPerspective: 1000,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 w-full h-full will-change-transform will-change-[clip-path,filter,opacity]"
              >
                <ParallaxImage 
                  src={project.imgUrl} 
                  alt={project.title} 
                  progress={scrollYProgress} 
                />
              </motion.div>
            );
          })}

          {/* Interactive Circular scroll progress indicator on the right side */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center bg-black/40 rounded-full p-2 backdrop-blur-sm border border-white/10">
            <svg width="56" height="56" viewBox="0 0 56 56" className="transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                className="stroke-white/10"
                strokeWidth="1.5"
                fill="transparent"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="24"
                className="stroke-[#8A78B4]"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 24}
                style={{ strokeDashoffset }}
              />
            </svg>
            <div className="absolute text-[10px] font-bold font-sans tracking-tighter uppercase text-white/60">
              {projectsData[activeIndex].number}
            </div>
          </div>

          {/* Top Right Corner View Details Button */}
          <div className="absolute top-4 right-4 z-30 block md:hidden">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer relative flex items-center justify-center px-5 py-2.5 rounded-full bg-black/60 border border-white/20 text-white font-bold text-[10px] uppercase tracking-wider transition-all duration-[600ms] cubic-bezier(0.23, 1, 0.32, 1) hover:shadow-[0_0_0_4px_rgba(138,120,180,0.38)] focus:outline-none"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(138, 120, 180, 0.25)"
              }}
            >
              View Details
            </button>
          </div>

        </div>

      </div>

      {/* Dynamic Mobile Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-55 bg-black/95 flex flex-col items-center justify-center p-6 md:hidden">
          <div className="max-w-md w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
            <img 
              src={projectsData[activeIndex].imgUrl} 
              alt={projectsData[activeIndex].title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="mt-6 text-center max-w-sm px-4">
            <h3 className="text-xl font-bold font-display text-white">{projectsData[activeIndex].title}</h3>
            <p className="text-xs text-white/70 mt-2 font-sans font-light leading-relaxed mb-6">{projectsData[activeIndex].description}</p>
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer px-6 py-2.5 bg-[#8A78B4] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-[#8A78B4]/80"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  progress: any;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, alt, progress }) => {
  const y = useTransform(progress, [0, 1], [15, -25]);

  return (
    <motion.img
      src={src}
      alt={alt}
      style={{ y }}
      className="w-full h-full object-cover scale-110"
      loading="eager"
    />
  );
}
