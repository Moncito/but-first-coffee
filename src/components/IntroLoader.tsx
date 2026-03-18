"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete,
          });
        },
      });

      // Split text for stagger if needed, or just stagger the whole block
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power3.in",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A] text-white"
    >
      <div
        ref={textRef}
        className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase mb-8"
      >
        BUT FIRST COFFEE
      </div>
      
      <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden">
        <div
          ref={progressRef}
          className="absolute h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mt-4 font-mono text-[10px] tracking-widest text-white/40 uppercase">
        Brewing Experience... {progress}%
      </div>
    </div>
  );
}
