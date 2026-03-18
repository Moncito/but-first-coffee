"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Flame, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Background color wipe from Black to Off-white
    gsap.to(sectionRef.current, {
      backgroundColor: "#F5F5F7",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 px-6 bg-[#0A0A0A] transition-colors duration-1000"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-black-rich mb-6 opacity-0 translate-y-10 reveal-text">
            The Three Pillars
          </h2>
          <p className="text-slate-500 font-mono uppercase tracking-[0.2em] text-sm opacity-0 translate-y-10 reveal-text">
            Quality without compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Large - Ethically Traded */}
          <div className="md:col-span-2 bg-white p-12 rounded-[32px] shadow-sm border border-black/5 flex flex-col justify-between group hover:shadow-xl transition-all duration-500">
            <div>
              <div className="w-16 h-16 bg-[#F5F5F7] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Leaf className="w-8 h-8 text-[#0A0A0A]" />
              </div>
              <h3 className="text-4xl font-bold text-black-rich mb-6">Ethically Traded.</h3>
              <p className="text-slate-500 text-xl leading-relaxed max-w-md">
                Direct-to-farm partnerships ensuring every bean supports the community that grew it.
              </p>
            </div>
            <div className="mt-12 overflow-hidden rounded-2xl aspect-[16/9] bg-[#F5F5F7] relative">
               {/* Visual placeholder for "Ethically Traded" image */}
               <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent" />
            </div>
          </div>

          {/* Card 2: Small - Small Batch */}
          <div className="bg-white p-10 rounded-[32px] shadow-sm border border-black/5 flex flex-col justify-between group hover:shadow-xl transition-all duration-500">
            <div>
              <div className="w-14 h-14 bg-[#F5F5F7] rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <Flame className="w-6 h-6 text-[#0A0A0A]" />
              </div>
              <h3 className="text-2xl font-bold text-black-rich mb-4">Small Batch.</h3>
              <p className="text-slate-500 text-base leading-relaxed">
                Roasted every Tuesday in 5lb microlots for precision control.
              </p>
            </div>
            <div className="mt-8 h-32 bg-[#F5F5F7] rounded-xl flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-black/10 rounded-full animate-spin border-t-black" />
            </div>
          </div>

          {/* Card 4 (New Index in Bento) - Column 2-3 Row 2 in complex grid, or just 3rd in simple grid */}
          <div className="bg-white p-10 rounded-[32px] shadow-sm border border-black/5 flex flex-col justify-between group hover:shadow-xl transition-all duration-500 md:col-span-1">
             <div>
              <div className="w-14 h-14 bg-[#F5F5F7] rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#0A0A0A]" />
              </div>
              <h3 className="text-2xl font-bold text-black-rich mb-4">Nitrogen Sealed.</h3>
              <p className="text-slate-500 text-base leading-relaxed">
                Freshness guaranteed for 6 months with proprietary oxygen-extraction tech.
              </p>
            </div>
            <div className="mt-8 p-6 bg-[#F5F5F7] rounded-xl space-y-4">
               <div className="h-1 bg-black/10 w-full rounded-full overflow-hidden">
                 <div className="h-full bg-black w-3/4" />
               </div>
               <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest text-black/40">
                 <span>Oxygen Level</span>
                 <span className="text-black">0.01%</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reveal-text {
          animation: reveal 1s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
          animation-play-state: paused;
        }
        @keyframes reveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
