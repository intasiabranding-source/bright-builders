import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ProcessTimelineProps {
  steps: {
    step: string;
    title: string;
    desc: string;
  }[];
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook scroll progress on the specific timeline container element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Apply spring physics for smooth scroll drawing transition
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative pl-8 ml-4">
      {/* Background static line */}
      <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-[#8A78B4]/15 rounded-full" />

      {/* Active animated vector path drawing line */}
      <motion.div 
        style={{ scaleY }}
        className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#8A78B4] origin-top rounded-full"
      />

      <div className="space-y-12">
        {steps.map((proc, index) => {
          return (
            <TimelineItem 
              key={index}
              step={proc.step}
              title={proc.title}
              desc={proc.desc}
              index={index}
              scrollYProgress={scrollYProgress}
              total={steps.length}
            />
          );
        })}
      </div>
    </div>
  );
};

interface TimelineItemProps {
  step: string;
  title: string;
  desc: string;
  index: number;
  scrollYProgress: any;
  total: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ step, title, desc, index, scrollYProgress, total }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    return scrollYProgress.on("change", (latest: number) => {
      // Calculate fraction point for active step indicators
      const activationPoint = index / (total - 1);
      // Set active status if scroll height crosses step boundary
      setIsActive(latest >= activationPoint - 0.05);
    });
  }, [scrollYProgress, index, total]);

  return (
    <div ref={itemRef} className="relative transition-opacity duration-500">
      {/* Active circular dot icon indicator with spring animation */}
      <div className="absolute -left-[41px] top-1.5 flex items-center justify-center z-10">
        <motion.div 
          animate={{
            scale: isActive ? 1.25 : 1,
            backgroundColor: isActive ? "#8A78B4" : "#FAF5F0",
            borderColor: isActive ? "#8A78B4" : "#E2D7CE",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-[18px] h-[18px] rounded-full border-[3px] flex items-center justify-center shadow-sm"
        >
          {isActive && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          )}
        </motion.div>
      </div>

      {/* Spacing adjustments to make it bold and visible */}
      <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-[#8A78B4]' : 'text-gray-400'}`}>
        {step}
      </span>
      <h4 className={`text-2xl font-bold tracking-tight mt-1 transition-colors duration-300 ${isActive ? 'text-[#0A0A0A]' : 'text-[#3A3A3A]'}`}>
        {title}
      </h4>
      <p className="text-gray-500 text-sm md:text-base mt-2 leading-relaxed max-w-xl font-light">
        {desc}
      </p>
    </div>
  );
};
