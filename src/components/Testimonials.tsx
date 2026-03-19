"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Marcus V.",
    text: "The smoothest extraction I've ever had. Truly a premium experience that respects the roast.",
    award: "Verified Roast Master",
  },
  {
    name: "Elena G.",
    text: "But First Coffee has redefined my morning ritual. Those Ethiopian beans are absolute magic.",
    award: "Certified Sommelier",
  },
  {
    name: "James K.",
    text: "The delivery is always on point, and the nitrogen seal really keeps the profile alive.",
    award: "Certified Barista",
  },
  {
    name: "Sarah L.",
    text: "Obsessively focused on quality. It's the only brand that handles light roasts this well.",
    award: "Coffee Critic",
  },
  {
    name: "David M.",
    text: "Finally, a luxury tech approach to my daily caffeine. The precision is unmatched.",
    award: "Tech Founder",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Clone items for seamless loop
    const items = Array.from(marquee.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      marquee.appendChild(clone);
    });

    const totalWidth = marquee.scrollWidth / 2;

    const loop = gsap.to(marquee, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    // Pause on hover
    marquee.addEventListener("mouseenter", () => loop.pause());
    marquee.addEventListener("mouseleave", () => loop.play());

    return () => {
      loop.kill();
    };
  }, []);

  return (
    <section id="testimonials-section" className="py-40 bg-[#F5F5F7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <h2 className="text-sm font-mono text-slate-400 uppercase tracking-[0.6em] mb-4">Social Proof</h2>
        <p className="text-5xl md:text-6xl font-bold text-black-rich tracking-tighter">The Wall of Love.</p>
      </div>

      <div className="relative">
        <div 
          ref={marqueeRef}
          className="flex gap-8 whitespace-nowrap px-4"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="inline-block w-[400px] bg-white/40 backdrop-blur-xl border border-black/[0.05] p-10 rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.03)] group transition-all duration-500 hover:bg-white"
            >
              <div className="flex items-center gap-2 mb-8">
                <BadgeCheck className="w-5 h-5 text-black-rich fill-black/10" />
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{t.award}</span>
              </div>
              
              <p className="text-black-rich text-2xl font-serif italic whitespace-normal leading-relaxed mb-10 opacity-80 group-hover:opacity-100 transition-opacity">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center font-bold text-black-rich">
                  {t.name.charAt(0)}
                </div>
                <span className="text-black-rich font-bold tracking-tight">{t.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#F5F5F7] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#F5F5F7] to-transparent z-10" />
      </div>

      <style jsx>{`
        .font-serif {
          font-family: var(--font-inter-tight), serif;
          font-style: italic;
        }
      `}</style>
    </section>
  );
}
