"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 120;
const FRAME_PREFIX = "frame_";
const FRAME_SUFFIX = "_delay-0.066s.png";

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll();

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new window.Image();
        const indexStr = i.toString().padStart(3, "0");
        img.src = `/sequence/${FRAME_PREFIX}${indexStr}${FRAME_SUFFIX}`;
        
        img.onload = () => {
            loadedCount++;

            // Set images incrementally so the UI can start working with what's loaded
            setImages([...loadedImages]); 

            // Draw the first frame instantly to avoid blank screen
            if (loadedCount === 1) {
                drawFrame(loadedImages[0]);
            }
        };
        // We push to the array early perfectly in order, but the images will populate lazily
        loadedImages[i] = img;
    }
  }, []);

  const drawFrame = (img?: HTMLImageElement) => {
    if (!img || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle object-fit: cover logically on canvas
    const { width: canvasW, height: canvasH } = canvas;
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasW / canvasH;

    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawW = canvasW;
      drawH = canvasW / imgRatio;
      drawX = 0;
      drawY = (canvasH - drawH) / 2;
    } else {
      drawW = canvasH * imgRatio;
      drawH = canvasH;
      drawX = (canvasW - drawW) / 2;
      drawY = 0;
    }

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  // Resize canvas when window size changes
  useEffect(() => {
    let animationFrameId: number;

    const handleResize = () => {
      if (canvasRef.current) {
        // Set exact pixel dimensions to avoid CSS scaling blur
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        
        // Redraw current frame
        if (images.length > 0) {
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(scrollYProgress.get() * TOTAL_FRAMES)
          );
          // Only draw if the image exists at this index yet (incremental loading)
          if (images[frameIndex]) {
              animationFrameId = requestAnimationFrame(() => drawFrame(images[frameIndex]));
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // trigger once to set initial size

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, [images, scrollYProgress]);

  // Scrub through frames dynamically based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0) return;
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(latest * TOTAL_FRAMES)
    );
    // Only attempt to draw if this specific frame has finished downloading
    if (images[frameIndex] && images[frameIndex].complete) {
        requestAnimationFrame(() => drawFrame(images[frameIndex]));
    }
  });

  return (
    <div className="fixed inset-0 z-0 h-screen w-full bg-[#121212]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full object-cover opacity-80"
      />
    </div>
  );
}
