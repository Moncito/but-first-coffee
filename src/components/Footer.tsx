"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="py-20 bg-[#050505] text-white/40 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="space-y-4">
          <div className="text-3xl font-serif text-[#D4AF37] italic">Midnight Roast</div>
          <p className="max-w-sm text-sm font-mono tracking-wider">
            Crafting the ultimate sensory experience for the obsessive coffee lover.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-[10px] font-mono uppercase tracking-[0.2em]">
          <div className="space-y-4 flex flex-col">
            <span className="text-white/20 mb-2">Explore</span>
            <a href="#" className="hover:text-[#D4AF37]">The Roast</a>
            <a href="#" className="hover:text-[#D4AF37]">Origins</a>
            <a href="#" className="hover:text-[#D4AF37]">Brewing</a>
          </div>
          <div className="space-y-4 flex flex-col">
            <span className="text-white/20 mb-2">Support</span>
            <a href="#" className="hover:text-[#D4AF37]">Shipping</a>
            <a href="#" className="hover:text-[#D4AF37]">Returns</a>
            <a href="#" className="hover:text-[#D4AF37]">FAQ</a>
          </div>
          <div className="space-y-4 flex flex-col">
            <span className="text-white/20 mb-2">Social</span>
            <a href="#" className="hover:text-[#D4AF37]">Instagram</a>
            <a href="#" className="hover:text-[#D4AF37]">Twitter</a>
            <a href="#" className="hover:text-[#D4AF37]">Email</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-[8px] font-mono uppercase tracking-widest">
        <span>&copy; 2026 Midnight Roast. All rights reserved.</span>
        <span className="text-[#D4AF37]">Made for the obsessed.</span>
      </div>
    </footer>
  );
}
