"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CoffeeCanvasProps {
  frameCount?: number;
}

export default function CoffeeCanvas({ frameCount = 120 }: CoffeeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Ensure we use the correct frame padding (000 to 119)
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

  // GSAP ScrollTrigger for Canvas
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (index: number) => {
      const img = images[Math.floor(index)];
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Canvas animation
    const tl = gsap.to({ frame: 0 }, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: function() {
        render(this.targets()[0].frame);
      },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // Text animations based on percentages
    const textBeats = [
      { id: "beat-1", start: 0, end: 0.2, align: "left", title: "Obsessively Sourced.", sub: "Single-origin beans from the volcanic soil of Ethiopia." },
      { id: "beat-2", start: 0.25, end: 0.45, align: "right", title: "The Perfect Grind.", sub: "Uniformity to the micron for unparalleled extraction." },
      { id: "beat-3", start: 0.5, end: 0.7, align: "left", title: "Artisan Extraction.", sub: "Captured at the peak of the bloom." },
      { id: "beat-4", start: 0.75, end: 0.9, align: "right", title: "But First Coffee.", sub: "Your morning, redefined." },
      { id: "beat-5", start: 0.95, end: 1, align: "center", title: "THE RITUAL BEGINS.", sub: "" },
    ];

    textBeats.forEach((beat) => {
      gsap.fromTo(
        `.${beat.id}`,
        { opacity: 0, y: 50, scale: beat.id === 'beat-5' ? 0.8 : 1 },
        {
          opacity: 1,
          y: 0,
          scale: beat.id === 'beat-5' ? 1.2 : 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${beat.start * 100}% top`,
            end: `${beat.end * 100}% top`,
            scrub: 1,
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isLoaded, images, frameCount]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
      canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-[#0A0A0A] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none"
        />

        {/* Text Beat Elements */}
        <div className="absolute inset-0 z-10 p-12 pointer-events-none flex flex-col justify-center">
          <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col justify-center items-center">
            
            <div className="beat-1 absolute left-0 text-left opacity-0">
              <h2 className="text-6xl font-bold text-white mb-4">Obsessively Sourced.</h2>
              <p className="text-xl text-slate-400 font-mono tracking-widest max-w-sm uppercase">
                Single-origin beans from the volcanic soil of Ethiopia.
              </p>
            </div>

            <div className="beat-2 absolute right-0 text-right opacity-0">
              <h2 className="text-6xl font-bold text-white mb-4">The Perfect Grind.</h2>
              <p className="text-xl text-slate-400 font-mono tracking-widest max-w-sm uppercase ml-auto">
                Uniformity to the micron for unparalleled extraction.
              </p>
            </div>

            <div className="beat-3 absolute left-0 text-left opacity-0">
              <h2 className="text-6xl font-bold text-white mb-4">Artisan Extraction.</h2>
              <p className="text-xl text-slate-400 font-mono tracking-widest max-w-sm uppercase">
                Captured at the peak of the bloom.
              </p>
            </div>

            <div className="beat-4 absolute right-0 text-right opacity-0">
              <h2 className="text-6xl font-bold text-white mb-4">But First Coffee.</h2>
              <p className="text-xl text-slate-400 font-mono tracking-widest max-w-sm uppercase ml-auto">
                Your morning, redefined.
              </p>
            </div>

            <div className="beat-5 text-center opacity-0">
              <h2 className="text-8xl md:text-9xl font-bold text-white tracking-tighter">
                THE RITUAL BEGINS.
              </h2>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
