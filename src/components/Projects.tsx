"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useScroll, useTransform, useSpring, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";

// Types and Data
interface Project {
  title: string;
  desc: string;
  link: string;
}

const CASES: Project[] = [
  { title: "git-auto-pro", desc: "Python Automation Tool lowering overhead by 60%", link: "https://github.com/HimanshuSingh-966/git-auto-pro" },
  { title: "WardWatchSystem", desc: "Full-Stack TypeScript Healthcare tracking platform", link: "https://github.com/HimanshuSingh-966/WardWatchSystem" },
  { title: "Datalix-AI", desc: "TypeScript ML Platform analyzing complex datasets", link: "https://github.com/HimanshuSingh-966/Datalix-AI" },
  { title: "InternBeacon", desc: "Automated internship scraper monitoring AICTE/Internshala", link: "https://github.com/HimanshuSingh-966/InternBeacon" },
  { title: "PayLog-AI", desc: "Intelligent AI-powered tracking for personal finance", link: "https://github.com/HimanshuSingh-966/PayLog-AI" },
  { title: "ISL Recognition", desc: "YOLOv8 Deep Learning Model decoding Indian Sign Language", link: "#" }
];

// Reusable Hook for Media Query
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// 1. Mobile Fallback (ProjectCarousel)
function ProjectCarousel({ cases }: { cases: Project[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="mb-4 text-4xl font-medium tracking-tight text-white px-4">
        Selected Work
      </h3>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-8 hide-scrollbar">
        {cases.map((project, i) => (
          <div 
            key={i} 
            className="snap-center shrink-0 w-[85vw] group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/[0.03] p-6 backdrop-blur-xl border border-white/10"
          >
            <div className="relative z-10 flex h-48 items-center justify-center rounded-2xl bg-black/40 mb-6 overflow-hidden">
               <span className="relative z-20 text-white/30 text-lg font-medium tracking-[0.2em] uppercase text-center px-4">
                 {project.title}
               </span>
            </div>
            <div className="relative z-10 flex text-left items-end justify-between">
              <div>
                <h4 className="text-2xl font-semibold text-white tracking-tight">{project.title}</h4>
                <p className="mt-2 text-base text-gray-400 font-light">{project.desc}</p>
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="ml-4 rounded-full bg-white/10 p-3 text-white">
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. Desktop Scroll Engine & UI (Omnitrix Dial)
function DesktopOmnitrix({ cases }: { cases: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // -- A. THE SCROLL ENGINE --
  // Track scroll progress through the massive container (e.g. 400vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Total angular distance to cover. Let's do a full 360 rotation to loop through them.
  // E.g., if index 0 is at 0 degrees, index 1 is at 60 deg (for 6 items), etc.
  const anglePerItem = 360 / cases.length;
  // We want to scroll from 0 to -360 so the wheel turns counter-clockwise and brings 
  // the next items to the top (which is position 0 deg).
  const rawRotation = useTransform(scrollYProgress, [0, 1], [0, -360]);

  // Apply "heavy mechanical" spring physics to the rotation
  const smoothRotation = useSpring(rawRotation, {
    stiffness: 80,
    damping: 15,
    mass: 1.2
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [burstKey, setBurstKey] = useState(0);

  // Monitor the actual spring-animated rotation value to determine what's "snapped" in
  useMotionValueEvent(smoothRotation, "change", (latestRotation) => {
      // Because we rotate negatively (-0 to -360)
      const positiveRot = Math.abs(latestRotation);
      // Determine which index we are closest to
      const preciseIndex = (positiveRot / anglePerItem);
      const nearestIndex = Math.round(preciseIndex) % cases.length;

      if (nearestIndex !== activeIndex) {
          setActiveIndex(nearestIndex);
          // Trigger the lock-in burst animation
          setBurstKey(prev => prev + 1);
      }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[400vh]">
      {/* Sticky Inner Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
         
         {/* THE OMNITRIX SVG DIAL ASSEMBLY */}
         <div className="relative flex items-center justify-center w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
             
            {/* Layer 1: Static Bezel & Tick Marks */}
            <svg className="absolute inset-0 w-full h-full text-white/10 pointer-events-none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 3" />
            </svg>

            {/* Layer 4: Fixed Selector Bracket (Top Center) */}
            <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 text-[#00ffcc] z-20 drop-shadow-[0_0_15px_rgba(0,255,204,0.5)]" viewBox="0 0 100 100">
                <path d="M20,10 L80,10 L90,30 L50,45 L10,30 Z" fill="none" stroke="currentColor" strokeWidth="3" />
                <circle cx="50" cy="45" r="4" fill="currentColor" />
            </svg>

            {/* Active Burst Animation (triggered on activeIndex change) */}
            <AnimatePresence mode="popLayout">
                <motion.div
                   key={`burst-${burstKey}`}
                   initial={{ scale: 0.8, opacity: 1 }}
                   animate={{ scale: 1.5, opacity: 0 }}
                   transition={{ duration: 0.6, ease: "easeOut" }}
                   className="absolute top-[12%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-[#00ffcc] z-10 pointer-events-none"
                />
            </AnimatePresence>

            {/* Layer 2 & 3: Rotating Ring & Project Nodes */}
            <motion.div 
               className="absolute inset-0 w-full h-full"
               style={{ rotate: smoothRotation }}
            >
               {cases.map((project, i) => {
                   // Calculate position around the circle.
                   // We want the first item (i=0) to be at the TOP, so we subtract 90 degrees from the polar angle.
                   const angle = (i * anglePerItem) - 90;
                   // Convert to radians for Math.cos/sin
                   const rad = (angle * Math.PI) / 180;
                   
                   // Radius percentage (distance from center)
                   const r = 43; // relative to a 100x100 viewBox concept

                   // Calculate x,y as percentages (0 to 100)
                   const x = 50 + r * Math.cos(rad);
                   const y = 50 + r * Math.sin(rad);

                   const isActive = i === activeIndex;

                   return (
                       <div 
                         key={i}
                         className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center transition-all duration-300"
                         style={{
                             left: `${x}%`,
                             top: `${y}%`,
                             backgroundColor: isActive ? "rgba(0,255,204,0.2)" : "rgba(255,255,255,0.05)",
                             border: `2px solid ${isActive ? "#00ffcc" : "rgba(255,255,255,0.2)"}`,
                             boxShadow: isActive ? "0 0 20px rgba(0,255,204,0.5)" : "none"
                         }}
                       >
                           {/* Counter-rotate the inner text/icons so they stay upright */}
                           <motion.div 
                             style={{ rotate: useTransform(smoothRotation, v => -v) }}
                             className={`font-mono text-sm ${isActive ? "text-[#00ffcc] font-bold" : "text-white/50"}`}
                           >
                               {String(i + 1).padStart(2, '0')}
                           </motion.div>
                       </div>
                   );
               })}
            </motion.div>

            {/* Center Panel (Framer AnimatePresence) */}
            <div className="absolute z-30 w-72 h-72 rounded-full flex flex-col items-center justify-center text-center p-6 bg-[#121212]/80 backdrop-blur-md border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                 <AnimatePresence mode="wait">
                     <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex flex-col items-center justify-center w-full h-full"
                     >
                         <h4 className="text-2xl font-bold text-white mb-3 tracking-tight leading-tight">
                             {cases[activeIndex].title}
                         </h4>
                         <p className="text-sm text-gray-400 mb-6 font-light line-clamp-3">
                             {cases[activeIndex].desc}
                         </p>
                         <a 
                           href={cases[activeIndex].link} 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="group flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#00ffcc] hover:text-black hover:scale-105 shadow-[0_0_15px_rgba(0,10,0,0)] hover:shadow-[0_0_20px_rgba(0,255,204,0.4)]"
                         >
                            View Case <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                         </a>
                     </motion.div>
                 </AnimatePresence>
            </div>

         </div>
      </div>
    </div>
  );
}

// Main Projects Wrapper
export default function Projects() {
  // SSR safe
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="work" className="relative z-20 bg-[#121212]/60 backdrop-blur-sm">
      {isMobile ? (
        <div className="py-24">
            <ProjectCarousel cases={CASES} />
        </div>
      ) : (
        <DesktopOmnitrix cases={CASES} />
      )}
    </section>
  );
}
