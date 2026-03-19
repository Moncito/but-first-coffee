"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const shopBtnRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);
  const hasAppeared = useRef(false);

  useEffect(() => {
    // Subtle pulse on shop button
    gsap.to(shopBtnRef.current, {
      scale: 1.05,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Adaptive color logic — checks ALL light sections, not just features
    const lightSelectors = [
      "#features-section",
      "#testimonials-section",
      "#finalcta-section",
      "#footer-section",
    ];

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const navY = 56;
        let overLight = false;

        for (const sel of lightSelectors) {
          const el = document.querySelector(sel);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= navY && rect.bottom >= navY) {
              overLight = true;
              break;
            }
          }
        }

        setIsDark(!overLight);

        // Hide on scroll down, show on scroll up
        const currentY = self.scroll();
        if (currentY < 50) {
          // Stay hidden at the very top (clean hero)
          if (!hasAppeared.current) {
            setVisible(false);
          } else {
            setVisible(true);
          }
        } else if (currentY < lastScrollY.current) {
          hasAppeared.current = true;
          setVisible(true);
        } else if (currentY > lastScrollY.current) {
          // First scroll down past threshold reveals navbar
          if (currentY > 200 && !hasAppeared.current) {
            hasAppeared.current = true;
            setVisible(true);
          } else if (hasAppeared.current) {
            setVisible(false);
          }
        }
        lastScrollY.current = currentY;
      },
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`
        flex items-center gap-6 px-6 py-2.5 rounded-full backdrop-blur-2xl border transition-all duration-500 shadow-lg
        ${isDark
            ? "bg-white/[0.07] border-white/[0.12] text-white shadow-black/20"
            : "bg-white/70 border-black/[0.08] text-[#0A0A0A] shadow-black/[0.06]"
          }
      `}
      >
        <div className="text-xs font-bold tracking-[0.2em] uppercase mr-2 whitespace-nowrap">
          But First Coffee
        </div>

        <div
          className={`
          hidden md:flex gap-6 text-[10px] font-mono uppercase tracking-[0.15em] transition-colors
          ${isDark ? "text-white/50" : "text-black/50"}
        `}
        >
          <a href="#" className="hover:opacity-100 transition-opacity">The Bean</a>
          <a href="#" className="hover:opacity-100 transition-opacity">The Roast</a>
          <a href="#" className="hover:opacity-100 transition-opacity">The Ritual</a>
        </div>

        <button
          ref={shopBtnRef}
          className={`
            px-5 py-1.5 font-bold text-[10px] uppercase tracking-widest rounded-full transition-all duration-500
            ${isDark
              ? "bg-white text-black hover:bg-[#F5F5F7]"
              : "bg-[#0A0A0A] text-white hover:bg-[#2D2D2D]"}
          `}
        >
          Shop Now
        </button>
      </div>
    </nav>
  );
}
