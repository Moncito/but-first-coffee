"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus V.",
    text: "The smoothest extraction I've ever had. Truly a premium experience.",
    award: "Verified Sommelier",
  },
  {
    name: "Elena G.",
    text: "Midnight Roast has redefined my morning ritual. Those Ethiopian beans are magic.",
    award: "Home Barista Champion",
  },
  {
    name: "James K.",
    text: "The delivery is always on point, and the nitrogen seal really keeps it fresh.",
    award: "Coffee Aficionado",
  },
  {
    name: "Sarah L.",
    text: "Visuals pulled me in, the taste kept me. Best subscription service out there.",
    award: "Verified Buyer",
  },
  {
    name: "David R.",
    text: "I didn't believe the uniformity until I saw it under my macro lens. Incredible.",
    award: "Roast Master",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#050505] overflow-hidden border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <h2 className="text-3xl font-serif text-white/50 tracking-widest uppercase text-sm">
          The Wall of Love
        </h2>
      </div>

      <div className="flex relative items-center">
        {/* Marquee Animation */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[400px] bg-[#111] p-8 rounded-2xl border border-white/5 flex flex-col justify-between"
            >
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-white/80 text-lg italic leading-relaxed whitespace-normal">
                  "{t.text}"
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-serif text-xl">{t.name}</span>
                <span className="text-[10px] font-mono uppercase tracking-tighter bg-[#D4AF37] text-black px-2 py-1 rounded">
                  {t.award}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
