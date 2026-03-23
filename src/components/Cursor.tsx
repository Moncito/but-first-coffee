"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const lightSelectors = [
      "#features-section",
      "#testimonials-section",
      "#finalcta-section",
      "#footer-section",
    ];

    const isOverLight = (y: number) => {
      for (const sel of lightSelectors) {
        const el = document.querySelector(sel);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= y && rect.bottom >= y) return true;
        }
      }
      return false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(ringRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });

      // Adapt cursor color based on background
      const overLight = isOverLight(e.clientY);
      const color = overLight ? "#0A0A0A" : "#ffffff";
      gsap.to(cursorRef.current, { backgroundColor: color, duration: 0.3 });
      gsap.to(ringRef.current, { borderColor: color, duration: 0.3 });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const container = target.closest("button") || target.closest("a");
      if (container) {
        const text = container.innerText || container.textContent || "";
        const isShop = text.toLowerCase().includes("shop") || 
                      text.toLowerCase().includes("order");
        setCursorText(isShop ? "ORDER" : "DRINK");
        
        const overLight = isOverLight(e.clientY);
        const hoverBg = overLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.1)";
        const hoverBorder = overLight ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.5)";

        gsap.to(ringRef.current, {
          width: 80,
          height: 80,
          backgroundColor: hoverBg,
          borderColor: hoverBorder,
          duration: 0.3,
        });
        gsap.to(textRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        });
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.2,
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) {
        setCursorText("");
        gsap.to(ringRef.current, {
          width: 40,
          height: 40,
          backgroundColor: "transparent",
          duration: 0.3,
        });
        gsap.to(textRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
        });
        gsap.to(cursorRef.current, {
          opacity: 1,
          duration: 0.2,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main Small Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center backdrop-blur-[2px] hidden md:block"
      >
        <span
          ref={textRef}
          className="text-[8px] font-bold tracking-widest text-white opacity-0 scale-50"
        >
          {cursorText}
        </span>
      </div>
    </>
  );
}
