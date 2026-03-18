"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-black/10 border-b border-white/5"
    >
      <div className="text-2xl font-serif text-[#D4AF37] italic tracking-tighter">
        Midnight Roast
      </div>
      <div className="hidden md:flex gap-12 text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
        <a href="#" className="hover:text-white transition-colors">The Bean</a>
        <a href="#" className="hover:text-white transition-colors">The Roast</a>
        <a href="#" className="hover:text-white transition-colors">The Ritual</a>
      </div>
      <div>
        <button className="px-6 py-2 bg-[#D4AF37] text-black font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors">
          Shop Now
        </button>
      </div>
    </motion.nav>
  );
}
