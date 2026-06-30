"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Building2 } from "lucide-react";

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

const StickyCard_001 = ({
  i,
  title,
  description,
  imgUrl,
  number,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  description: string;
  imgUrl: string;
  number: string;
  progress: any;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex min-h-screen items-center justify-center px-4 md:px-6 z-10"
    >
      <motion.div
        style={{
          scale,
          top: `calc(10vh + ${i * 24}px)`,
        }}
        className="relative flex flex-col md:flex-row h-[75vh] md:h-[60vh] w-full max-w-4xl origin-top rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Left/Top Content Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-12 z-10 select-none text-white bg-zinc-950">
          <div>
            <span className="text-3xl md:text-5xl font-bold tracking-widest block font-sans text-[#8A78B4]/20 mb-4 md:mb-6">
              {number}
            </span>
            <h3 className="text-xl md:text-3xl font-bold font-display leading-tight text-white mb-3">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-gray-400 font-sans font-light leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A78B4] opacity-80 pt-4 border-t border-white/5 mt-4">
            <Building2 className="w-4 h-4" />
            <span>BT Bright Builders</span>
          </div>
        </div>

        {/* Right/Bottom Image Column */}
        <div className="w-full md:w-1/2 h-[45%] md:h-full relative overflow-hidden bg-black">
          <img 
            src={imgUrl} 
            alt={title} 
            className="w-full h-full object-cover" 
            loading="lazy" 
          />
        </div>
      </motion.div>
    </div>
  );
};

export function ImageRevealSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div className="w-full bg-black text-white py-16 md:py-28 border-t border-white/5">
      <div className="text-center max-w-2xl mx-auto mb-12 px-6">
        <span className="text-xs uppercase tracking-widest text-[#8A78B4] font-semibold block mb-2">// OUR PORTFOLIO</span>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white font-display">Featured Projects</h2>
        <p className="text-gray-400 mt-3 text-sm md:text-base font-light">
          Scroll down to reveal our stacked portfolio projects.
        </p>
      </div>

      <main
        ref={container}
        className="relative flex w-full flex-col items-center justify-center pb-[10vh]"
      >
        {projectsData.map((project, i) => {
          const targetScale = Math.max(
            0.8,
            1 - (projectsData.length - i - 1) * 0.02,
          );
          const rangeStart = i * (1 / projectsData.length);
          return (
            <StickyCard_001
              key={project.id}
              i={i}
              title={project.title}
              description={project.description}
              imgUrl={project.imgUrl}
              number={project.number}
              progress={scrollYProgress}
              range={[rangeStart, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    </div>
  );
}
