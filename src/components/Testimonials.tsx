"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Marcus V.",
    text: "The smoothest extraction I've ever had. Truly a premium experience.",
    award: "Verified Roast Master",
  },
  {
    name: "Elena G.",
    text: "But First Coffee has redefined my morning ritual. Those Ethiopian beans are magic.",
    award: "Certified Sommelier",
  },
  {
    name: "James K.",
    text: "The delivery is always on point, and the nitrogen seal really keeps it fresh.",
    award: "Certified Barista",
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect for cards
    const cards = gsap.utils.toArray(".testimonial-card");
    cards.forEach((card: any, i: number) => {
      gsap.to(card, {
        y: -100 * (i + 1),
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <section className="py-32 bg-[#F5F5F7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-20 text-center">
        <h2 className="text-sm font-mono text-slate-400 uppercase tracking-[0.4em] mb-4">
          The Wall of Love
        </h2>
        <p className="text-4xl md:text-5xl font-bold text-black-rich">
          Trusted by Specialists.
        </p>
      </div>

      <div ref={scrollRef} className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="testimonial-card bg-white p-10 rounded-[32px] shadow-sm border border-black/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-black text-black" />
                ))}
              </div>
              <p className="text-black-rich text-xl italic leading-relaxed mb-8">
                "{t.text}"
              </p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-black-rich font-bold block mb-1">{t.name}</span>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400 bg-slate-100 px-2 py-1 rounded">
                  {t.award}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
