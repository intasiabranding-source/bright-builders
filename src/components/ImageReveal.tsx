import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

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
  
  // Track scroll progress across the entire projects wrapper container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="w-full bg-black text-white relative">
      
      {/* Creative follow SVG line animation layer */}
      <div className="absolute left-[18px] sm:left-[8%] md:left-[5%] top-0 h-full w-[3px] md:w-[6px] pointer-events-none z-10 block">
        <div className="w-full h-full bg-white/5 relative">
          <motion.div 
            className="w-full bg-[#8A78B4] absolute top-0 origin-top shadow-[0_0_12px_#8A78B4]"
            style={{ 
              scaleY: scrollYProgress,
              height: "100%",
              boxShadow: "0 0 20px #8A78B4, 0 0 40px #8A78B4" 
            }}
          />
        </div>
      </div>

      {/* Scroll-reveal heading wrapper */}
      <div className="text-center max-w-2xl mx-auto py-20 px-6">
        <span className="text-xs uppercase tracking-widest text-[#8A78B4] font-semibold block mb-2">// OUR PORTFOLIO</span>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white font-display">Featured Projects</h2>
        <p className="text-gray-400 mt-3 text-sm md:text-base font-light">
          Scroll down to browse our custom residential and luxury interior designs.
        </p>
      </div>

      {/* Main Full-page Cards Container */}
      <div className="flex flex-col w-full">
        {projectsData.map((project) => (
          <div 
            key={project.id}
            className="w-full min-h-screen h-screen flex flex-col md:flex-row bg-black border border-white/10 sm:border-0 border-b border-white/5 overflow-hidden sticky top-0"
          >
            {/* Left Column: Narrative Content */}
            <div className="w-full md:w-1/2 h-[35vh] md:h-full flex flex-col justify-between p-6 md:p-16 lg:p-24 bg-zinc-950/40 select-none text-white! pl-8 sm:pl-20 md:pl-28">
              {/* Floating Section Number */}
              <div className="h-12 md:h-16 relative">
                <span className="text-3xl md:text-7xl font-bold tracking-widest block font-sans text-[#8A78B4]/20">
                  {project.number}
                </span>
              </div>

              {/* Heading and Narrative info */}
              <div className="space-y-4 md:space-y-6 max-w-md text-white!">
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight font-display text-white!">
                  {project.title}
                </h2>
                <div className="w-12 h-0.5 bg-white opacity-40 my-2" />
                <p className="text-xs sm:text-sm md:text-base text-gray-400 font-sans font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bottom labeling */}
              <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-widest uppercase opacity-90 text-white font-sans font-bold mt-4">
                <span>Portfolio</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A78B4]" />
                <span>BT Bright Builders</span>
              </div>
            </div>

            {/* Right Column: Project Image Area */}
            <div className="w-full md:w-1/2 h-[65vh] md:h-full relative overflow-hidden bg-black">
              <img 
                src={project.imgUrl} 
                alt={project.title} 
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
