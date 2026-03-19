"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Coffee, Layers, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal header
    gsap.fromTo(".features-header", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        scrollTrigger: {
          trigger: ".features-header",
          start: "top 80%",
        }
      }
    );

    // Progressive card loading
    const cards = gsap.utils.toArray(".bento-card");
    cards.forEach((card: any, i: number) => {
      gsap.fromTo(card, 
        { opacity: 0, scale: 0.95, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

    // Background transition
    gsap.to(containerRef.current, {
      backgroundColor: "#F5F5F7",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 20%",
        scrub: true,
      }
    });

    // Title color transition: white → dark alongside the background
    gsap.to(".features-title", {
      color: "#0A0A0A",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 20%",
        scrub: true,
      }
    });

  }, []);

  return (
    <section 
      id="features-section"
      ref={containerRef}
      className="py-40 bg-[#050505] transition-colors duration-1000 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="features-header mb-32">
          <h2 className="text-sm font-mono text-slate-400 uppercase tracking-[0.5em] mb-4">Engineering the Ritual</h2>
          <p className="features-title text-5xl md:text-7xl font-bold tracking-tighter leading-none text-white">
            Precision in<br/>every molecule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Main Highlight */}
          <div className="bento-card md:col-span-2 md:row-span-2 bg-white p-12 rounded-[2.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-black/[0.03] flex flex-col justify-between group overflow-hidden">
            <div className="relative z-10">
              <div className="w-20 h-20 bg-[#F5F5F7] rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                <Coffee className="w-10 h-10 text-black-rich stroke-[1.2px]" />
              </div>
              <h3 className="text-4xl font-bold text-black-rich mb-6 tracking-tight">Ethically Traded.</h3>
              <p className="text-slate-500 text-lg leading-relaxed max-w-sm">
                Every bean is a pact between the farmer and your cup. Direct sourcing that honors the land.
              </p>
            </div>
            <div className="mt-20 h-64 bg-[#F5F5F7]/50 rounded-2xl relative overflow-hidden">
               <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/[0.02] to-transparent" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[0.5px] border-black/10 rounded-full animate-[pulse_4s_infinite]" />
            </div>
          </div>

          {/* Card 2: Technical Precision */}
          <div className="bento-card md:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-black/[0.03] flex items-center gap-10 group">
             <div className="w-16 h-16 shrink-0 bg-[#F5F5F7] rounded-2xl flex items-center justify-center group-hover:rotate-[15deg] transition-transform duration-500">
                <Layers className="w-8 h-8 text-black-rich stroke-[1.2px]" />
             </div>
             <div>
                <h3 className="text-2xl font-bold text-black-rich mb-2">Micron Grind.</h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  Uniformity measured to the sub-micron for zero bitterness.
                </p>
             </div>
          </div>

          {/* Card 3: Freshness Tech */}
          <div className="bento-card md:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-black/[0.03] flex items-center gap-10 group">
             <div className="w-16 h-16 shrink-0 bg-[#F5F5F7] rounded-2xl flex items-center justify-center group-hover:-rotate-[15deg] transition-transform duration-500">
                <Zap className="w-8 h-8 text-black-rich stroke-[1.2px]" />
             </div>
             <div>
                <h3 className="text-2xl font-bold text-black-rich mb-2">Nitrogen Shield.</h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  Oxygen levels at 0.01% for a profile that never ages.
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
