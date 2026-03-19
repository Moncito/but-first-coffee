"use client";

import React from "react";

export default function Footer() {
  return (
    <footer id="footer-section" className="py-20 bg-[#F5F5F7] text-slate-400 px-8 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="space-y-4">
          <div className="text-3xl font-bold text-black-rich tracking-tighter">
            BUT FIRST COFFEE
          </div>
          <p className="max-w-sm text-xs font-mono tracking-widest leading-relaxed">
            Crafting the ultimate sensory experience for the obsessive coffee lover.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-[9px] font-mono uppercase tracking-[0.3em]">
          <div className="space-y-4 flex flex-col">
            <span className="text-black/20 mb-2">Explore</span>
            <a href="#" className="hover:text-black">The Roast</a>
            <a href="#" className="hover:text-black">Origins</a>
            <a href="#" className="hover:text-black">Brewing</a>
          </div>
          <div className="space-y-4 flex flex-col">
            <span className="text-black/20 mb-2">Support</span>
            <a href="#" className="hover:text-black">Shipping</a>
            <a href="#" className="hover:text-black">Returns</a>
            <a href="#" className="hover:text-black">FAQ</a>
          </div>
          <div className="space-y-4 flex flex-col">
            <span className="text-black/20 mb-2">Social</span>
            <a href="#" className="hover:text-black">Instagram</a>
            <a href="#" className="hover:text-black">Twitter</a>
            <a href="#" className="hover:text-black">Email</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-black/5 flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.4em] opacity-50">
        <span>&copy; 2026 But First Coffee.</span>
        <span className="text-black">Obsessively Focused.</span>
      </div>
    </footer>
  );
}
