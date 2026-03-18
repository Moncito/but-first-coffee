"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const shopBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Pulse effect for Shop Now button
    gsap.to(shopBtnRef.current, {
      scale: 1.05,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-8 px-8 py-4 rounded-full backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
        <div className="text-sm font-bold tracking-[0.2em] text-white uppercase mr-4">
          But First Coffee
        </div>
        
        <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
          <a href="#" className="hover:text-white transition-colors">The Bean</a>
          <a href="#" className="hover:text-white transition-colors">The Roast</a>
          <a href="#" className="hover:text-white transition-colors">The Ritual</a>
        </div>

        <button
          ref={shopBtnRef}
          className="px-6 py-2 bg-white text-black font-bold text-[10px] uppercase tracking-widest rounded-full hover:bg-[#F5F5F7] transition-colors"
        >
          Shop Now
        </button>
      </div>
    </nav>
  );
}
