"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Flame, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Ethically Traded",
    description: "Direct-to-farm partnerships ensuring every bean supports the community that grew it.",
    icon: Leaf,
    className: "md:col-span-2 md:row-span-1",
    bgColor: "bg-[#1a1a1a]",
  },
  {
    title: "Small Batch",
    description: "Roasted every Tuesday in 5lb microlots for precision control.",
    icon: Flame,
    className: "md:col-span-1 md:row-span-2",
    bgColor: "bg-[#8B4513]/10 border border-[#8B4513]/20",
  },
  {
    title: "Nitrogen Sealed",
    description: "Freshness guaranteed for 6 months with our proprietary oxygen-extraction tech.",
    icon: ShieldCheck,
    className: "md:col-span-2 md:row-span-1",
    bgColor: "bg-[#0a0a0a] border border-white/5",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6 bg-[#050505] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">The Three Pillars</h2>
          <p className="text-[#D4AF37] font-mono uppercase tracking-widest text-sm">
            Quality without compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-full md:h-[600px]">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-colors duration-500 ${feature.className} ${feature.bgColor}`}
            >
              <div className="mb-8">
                <feature.icon className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-3xl font-serif mb-4">{feature.title}</h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-sm">
                  {feature.description}
                </p>
              </div>
              <div className="text-[#D4AF37] font-mono text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Learn More &rarr;
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
