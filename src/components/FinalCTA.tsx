"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-32 bg-[#050505] text-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-12 md:p-24 rounded-[4rem] bg-[#111] overflow-hidden border border-[#D4AF37]/20"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#D4AF37]/10 to-transparent pointer-events-none" />
          
          <h2 className="text-5xl md:text-7xl font-serif mb-8 relative z-10">
            Start Your Ritual.
          </h2>
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-xl mx-auto relative z-10">
            Order the Starter Kit — $24
          </p>
          
          <div className="relative z-10 space-y-6">
            <button className="px-12 py-5 bg-[#D4AF37] text-black font-mono text-lg uppercase tracking-[0.2em] hover:bg-white transition-colors duration-500 rounded-full">
              Order Now
            </button>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest">
              Free shipping on your first bag. Cancel subscriptions anytime.
            </p>
          </div>

          {/* Abstract coffee bean shape decorations or similar could go here */}
        </motion.div>
      </div>
    </section>
  );
}
