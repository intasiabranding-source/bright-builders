"use client";

import { motion, useInView, useMotionValue, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Building2 } from 'lucide-react';

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
  return (
    <div className="w-full bg-black text-white px-4 md:px-12 lg:px-16 py-20 md:py-28 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-[#8A78B4] font-semibold block mb-2">// OUR PORTFOLIO</span>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white font-display">Featured Projects</h2>
        <p className="text-gray-400 mt-3 text-sm md:text-base font-light">
          A showcase of our premium residential, commercial, and interior design executions.
        </p>
      </div>

      <div className="relative flex w-full flex-col items-center gap-[6vh] py-[4vh]">
        {projectsData.map((project, idx) => (
          <StickyProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </div>
  );
}

const StickyProjectCard = ({ project, index }: { project: ProjectItem; index: number }) => {
  const vertMargin = 12;
  const container = useRef<HTMLDivElement>(null);
  const [maxScrollY, setMaxScrollY] = useState(Infinity);

  const filter = useMotionValue(0);
  const negateFilter = useTransform(filter, (value) => -value);

  const { scrollY } = useScroll({
    target: container,
  });
  // Target window for transition - reduced from 10000 to 1200 to trigger fast quick-view animations
  const rawScale = useTransform(scrollY, [maxScrollY, maxScrollY + 1200], [1, 0]);
  
  // 0.1s high-stiffness spring follow settings for quick views
  const scale = useSpring(rawScale, { stiffness: 450, damping: 28 });
  const filterSpring = useSpring(filter, { stiffness: 450, damping: 28 });

  const isInView = useInView(container, {
    margin: `0px 0px -${75 - vertMargin}% 0px`,
    once: true,
  });

  scrollY.on("change", (latestScrollY) => {
    let animationValue = 1;
    if (latestScrollY > maxScrollY) {
      animationValue = Math.max(0, 1 - (latestScrollY - maxScrollY) / 1200);
    }

    rawScale.set(animationValue);
    filter.set((1 - animationValue) * 8); // Subtler rotation tilt (max 8 degrees)
  });

  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView]);

  return (
    <motion.div
      ref={container}
      className="sticky w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 flex flex-col md:flex-row"
      style={{
        scale: scale,
        rotate: filterSpring,
        height: `calc(${100 - 2 * vertMargin}vh - 30px)`,
        top: `${vertMargin}vh`,
        zIndex: index + 1,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)"
      }}
    >
      {/* Narrative Info Block */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between select-none z-15 bg-zinc-950/80 backdrop-blur-md">
        <div>
          <div className="text-3xl md:text-5xl font-bold tracking-widest text-[#8A78B4]/20 font-sans block mb-4">
            {project.number}
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold font-display text-white mb-4">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-400 font-sans font-light leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A78B4] opacity-80 pt-4 border-t border-white/5 mt-6">
          <Building2 className="w-3.5 h-3.5" />
          <span>BT Bright Builders</span>
        </div>
      </div>

      {/* Image Area */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-black flex-1">
        <motion.img
          src={project.imgUrl}
          alt={project.title}
          style={{
            rotate: negateFilter,
          }}
          className="h-full w-full scale-125 object-cover"
          loading="eager"
        />
      </div>
    </motion.div>
  );
};
