"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-32 bg-[#F5F5F7] px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative p-12 md:p-24 rounded-[4rem] bg-[#0A0A0A] overflow-hidden text-white shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 relative z-10 transition-transform hover:scale-105 duration-700">
            Start Your Ritual.
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-xl mx-auto relative z-10 font-mono uppercase tracking-widest">
            The Starter Kit — $24
          </p>
          
          <div className="relative z-10 space-y-6">
            <button className="px-12 py-5 bg-white text-black font-bold text-lg uppercase tracking-[0.2em] rounded-full hover:bg-[#F5F5F7] transition-all duration-500 scale-110 active:scale-95">
              Order Now
            </button>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">
              Free shipping on your first bag. Cancel subscriptions anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
