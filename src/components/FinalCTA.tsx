"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FinalCTA() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      // Calculate distance
      const dist = Math.sqrt(x*x + y*y);
      if (dist < 150) {
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      id="finalcta-section"
      ref={containerRef}
      className="py-40 bg-[#F5F5F7] px-6"
    >
      <div className="max-w-5xl mx-auto text-center">
        <div className="relative p-16 md:p-32 rounded-[4rem] bg-[#050505] overflow-hidden text-white shadow-3xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-12">
            <h2 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-12">
              Start Your<br/>Ritual.
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-400 font-mono uppercase tracking-[0.4em] mb-12">
              The Starter Kit — $24
            </p>
            
            <button
              ref={buttonRef}
              className="px-16 py-8 bg-white text-black font-bold text-xl uppercase tracking-[0.3em] rounded-full hover:bg-white/90 transition-colors shadow-2xl relative block mx-auto"
            >
              Order Now
            </button>
            
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] max-w-xs mx-auto pt-8">
              Free shipping included. Certified fresh. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
