"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, useSpring, motion, AnimatePresence } from "framer-motion";

interface CoffeeCanvasProps {
  frameCount?: number;
}

export default function CoffeeCanvas({ frameCount = 240 }: CoffeeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // Map scroll progress (0-1) to frame index (0-239)
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameStr = i.toString().padStart(3, "0");
      img.src = `/assets/coffee-sequence/frame_${frameStr}_delay-0.033s.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === frameCount) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount]);

  // Draw frame on canvas
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const render = (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const img = images[Math.floor(index)];
      if (!img) return;

      // Clear and draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Object-fit: contain logic for canvas
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const unsubscribe = frameIndex.on("change", (latest) => {
      render(latest);
    });

    // Initial render
    render(0);

    return () => unsubscribe();
  }, [isLoaded, images, frameIndex]);

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      // Re-render current frame
      const currentFrame = Math.floor(frameIndex.get());
      if (images[currentFrame]) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const img = images[currentFrame];
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-[#050505] w-full">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none"
          style={{ willChange: "transform" }}
        />

        {/* Storyboard Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
          <BeatText progress={smoothProgress} />
        </div>
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#D4AF37]"
          >
            <div className="text-6xl font-serif mb-4 italic">Midnight Roast</div>
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#D4AF37]"
                initial={{ width: 0 }}
                animate={{ width: `${(loadedCount / frameCount) * 100}%` }}
              />
            </div>
            <div className="mt-4 font-mono text-sm uppercase tracking-widest">
              Brewing Experience... {Math.round((loadedCount / frameCount) * 100)}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BeatText({ progress }: { progress: any }) {
  const opacities = [
    useTransform(progress, [0.05, 0.1, 0.2, 0.25], [0, 1, 1, 0]),
    useTransform(progress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]),
    useTransform(progress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]),
    useTransform(progress, [0.8, 0.85, 0.95, 1], [0, 1, 1, 0]),
  ];

  const beats = [
    {
      title: "Obsessively Sourced.",
      sub: "Single-origin beans from the volcanic soil of Ethiopia.",
    },
    {
      title: "The Perfect Grind.",
      sub: "Uniformity to the micron for unparalleled extraction.",
    },
    {
      title: "Artisan Extraction.",
      sub: "Captured at the peak of the bloom.",
    },
    {
      title: "Midnight Roast.",
      sub: "Your morning, redefined.",
    },
  ];

  return (
    <>
      {beats.map((beat, i) => (
        <motion.div
          key={i}
          style={{ opacity: opacities[i] }}
          className="absolute max-w-2xl px-4"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight mb-4 drop-shadow-2xl">
            {beat.title}
          </h2>
          <p className="text-xl md:text-2xl text-[#D4AF37] font-mono uppercase tracking-widest opacity-80 shadow-black drop-shadow-md">
            {beat.sub}
          </p>
        </motion.div>
      ))}
    </>
  );
}
