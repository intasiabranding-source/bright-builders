"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const StickyCard_003 = ({ imgUrl }: { imgUrl: string }) => {
  const vertMargin = 10;
  const container = useRef<HTMLDivElement>(null);
  const [maxScrollY, setMaxScrollY] = useState(Infinity);



  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [maxScrollY, maxScrollY + 300], [1, 0.85]);
  const rotateValue = useTransform(scrollY, [maxScrollY, maxScrollY + 300], [0, 4]);
  const negateRotate = useTransform(rotateValue, (value) => -value);

  const isInView = useInView(container, {
    margin: `0px 0px -${100 - vertMargin}% 0px`,
    once: true,
  });

  useEffect(() => {
    if (isInView) {
      // Pin the scroll position where this card hits the active window margin
      setMaxScrollY(window.scrollY);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={container}
      className="sticky overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-neutral-200"
      style={{
        scale: scale,
        rotate: rotateValue,
        height: `${100 - 2 * vertMargin}vh`,
        top: `${vertMargin}vh`,
        width: "100%",
        maxWidth: "56rem",
      }}
    >
      <motion.img
        src={imgUrl}
        alt="Interior design mockup"
        style={{
          rotate: negateRotate,
        }}
        className="h-full w-full scale-110 object-cover"
      />
    </motion.div>
  );
};

export { StickyCard_003 };
