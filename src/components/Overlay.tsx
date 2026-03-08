"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Opacity transitions matching general scroll ranges within the 400vh container
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

  const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.65], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.65], [50, -50]);

  const opacity3 = useTransform(scrollYProgress, [0.6, 0.75, 0.9, 1], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.6, 1], [50, -50]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full z-10">
      <div className="sticky top-0 pointer-events-none flex h-screen w-full flex-col justify-center px-8 md:px-24 mix-blend-difference">
      {/* Section 1 */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-x-0 flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-5xl font-bold tracking-tight text-white md:text-8xl">
          Himanshu Singh.
        </h1>
        <p className="mt-6 text-xl text-gray-300 md:text-3xl font-light tracking-wide">
          Data Scientist & Analyst.
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute left-8 top-1/2 max-w-2xl -translate-y-1/2 md:left-24"
      >
        <h2 className="text-4xl font-bold leading-tight text-white md:text-7xl">
          Transforming data into insights.
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute right-8 top-1/2 max-w-2xl -translate-y-1/2 text-right md:right-24"
      >
        <h2 className="text-4xl font-bold leading-tight text-white md:text-7xl">
          Specializing in ML & AI architectures.
        </h2>
      </motion.div>
      </div>
    </div>
  );
}
