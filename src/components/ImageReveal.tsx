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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <div 
            key={project.id}
            className="flex flex-col bg-zinc-900/40 rounded-2xl overflow-hidden border border-white/5"
          >
            {/* Image Container */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950 relative">
              <img 
                src={project.imgUrl} 
                alt={project.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-white/80">
                {project.number}
              </div>
            </div>

            {/* Narrative Content */}
            <div className="p-6 flex flex-col flex-1 justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold font-display text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2 font-sans font-light leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A78B4] opacity-80 pt-2 border-t border-white/5">
                <Building2 className="w-3.5 h-3.5" />
                <span>BT Bright Builders</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
