"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { analytics } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

interface CoffeeCanvasProps {
  frameCount?: number;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function CoffeeCanvas({ frameCount = 120 }: CoffeeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  // On mobile, only load a handful of keyframes instead of all 240
  const mobileFrameCount = 30;
  const effectiveFrameCount = isMobile ? mobileFrameCount : frameCount;

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    const step = isMobile ? Math.floor(frameCount / mobileFrameCount) : 1;
    const total = isMobile ? mobileFrameCount : frameCount;

    for (let i = 0; i < total; i++) {
      const img = new Image();
      const frameIndex = isMobile ? i * step : i;
      const frameStr = frameIndex.toString().padStart(3, "0");
      img.src = `/assets/coffee-sequence/frame_${frameStr}_delay-0.033s.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded === total) setIsLoaded(true);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount, isMobile]);

  // Unified GSAP Timeline
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (index: number) => {
      const img = images[Math.floor(index)];
      if (!img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Use Math.max for "cover" — fills entire canvas, no black bars
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Draw first frame immediately so canvas isn't blank
    render(0);

    // ── Master ScrollTrigger ──
    // +=600% gives each phrase its own "page" of scroll (less on mobile)
    const scrollEnd = isMobile ? "+=400%" : "+=600%";
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: scrollEnd,
        scrub: 0.6,
        pin: true,
        pinSpacing: true,
      },
    });

    // 1. Canvas frame sequence (spans full 0→1)
    masterTl.to(
      { frame: 0 },
      {
        frame: effectiveFrameCount - 1,
        duration: 1,
        ease: "none",
        onUpdate: function () {
          render(this.targets()[0].frame);
        },
      },
      0
    );

    // ── Scrim: subtle darkening during text beats ──
    const scrim = containerRef.current.querySelector(".text-scrim");
    masterTl.to(scrim, { opacity: 1, duration: 0.03, ease: "power2.inOut" }, 0.03);
    masterTl.to(scrim, { opacity: 0, duration: 0.03, ease: "power2.inOut" }, 0.19);
    masterTl.to(scrim, { opacity: 1, duration: 0.03, ease: "power2.inOut" }, 0.26);
    masterTl.to(scrim, { opacity: 0, duration: 0.03, ease: "power2.inOut" }, 0.42);
    masterTl.to(scrim, { opacity: 1, duration: 0.03, ease: "power2.inOut" }, 0.49);
    masterTl.to(scrim, { opacity: 0, duration: 0.03, ease: "power2.inOut" }, 0.65);
    masterTl.to(scrim, { opacity: 1, duration: 0.03, ease: "power2.inOut" }, 0.72);
    masterTl.to(scrim, { opacity: 0, duration: 0.03, ease: "power2.inOut" }, 0.92);

    // ── Beat animation: minimalistic enter / hold / exit ──
    const animateBeat = (
      beatSel: string,
      headingSel: string,
      subSel: string,
      lineSel: string,
      enter: number,
      exit: number,
    ) => {
      const heading = containerRef.current!.querySelector(headingSel);
      const sub = containerRef.current!.querySelector(subSel);
      const line = containerRef.current!.querySelector(lineSel);
      const holdEnd = exit - 0.06;

      // Container visible
      masterTl.fromTo(beatSel, { opacity: 0 }, { opacity: 1, duration: 0.005 }, enter);

      // Line stretches in
      if (line) {
        masterTl.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.05, ease: "power3.out" },
          enter + 0.005
        );
      }

      // Heading — clean opacity + upward slide
      masterTl.fromTo(
        heading,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.04, ease: "power3.out" },
        enter + 0.01
      );

      // Sub — delayed entrance
      masterTl.fromTo(
        sub,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.03, ease: "power2.out" },
        enter + 0.04
      );

      // ── HOLD — text commands the screen ──

      // Heading exits — fade + drift up
      masterTl.to(
        heading,
        { opacity: 0, y: -30, duration: 0.03, ease: "power2.in" },
        holdEnd
      );

      // Sub exits
      masterTl.to(
        sub,
        { opacity: 0, y: -15, duration: 0.02, ease: "power2.in" },
        holdEnd + 0.01
      );

      // Line retracts from opposite end
      if (line) {
        masterTl.to(
          line,
          { scaleX: 0, transformOrigin: "right center", duration: 0.03, ease: "power2.in" },
          holdEnd + 0.01
        );
      }

      // Container hidden
      masterTl.to(beatSel, { opacity: 0, duration: 0.005 }, exit);
    };

    // ════════════════════════════════════════
    // BEAT 1 — "OBSESSIVELY SOURCED" (0.04 → 0.22)
    // ════════════════════════════════════════
    animateBeat(".beat-1", ".b1-heading", ".b1-sub", ".b1-line", 0.04, 0.22);

    // ════════════════════════════════════════
    // BEAT 2 — "THE PERFECT GRIND" (0.27 → 0.45)
    // ════════════════════════════════════════
    animateBeat(".beat-2", ".b2-heading", ".b2-sub", ".b2-line", 0.27, 0.45);

    // ════════════════════════════════════════
    // BEAT 3 — "ARTISAN EXTRACTION" (0.50 → 0.68)
    // ════════════════════════════════════════
    animateBeat(".beat-3", ".b3-heading", ".b3-sub", ".b3-line", 0.50, 0.68);

    // ════════════════════════════════════════
    // BEAT 4 — "BUT FIRST COFFEE." (0.73 → 0.96)
    // ════════════════════════════════════════
    animateBeat(".beat-4", ".b4-heading", ".b4-sub", ".b4-line", 0.73, 0.96);

    // ── Analytics: track beat views & scroll depth ──
    const beatTracked = [false, false, false, false];
    const beatNames = ["Obsessively Sourced", "The Perfect Grind", "Artisan Extraction", "But First Coffee"];
    const beatStarts = [0.04, 0.27, 0.50, 0.73];
    const depthTracked = { 25: false, 50: false, 75: false, 100: false };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: scrollEnd,
      onUpdate: (self) => {
        const p = self.progress;
        beatStarts.forEach((start, i) => {
          if (p >= start && !beatTracked[i]) {
            beatTracked[i] = true;
            analytics.beatViewed(i + 1, beatNames[i]);
          }
        });
        for (const threshold of [25, 50, 75, 100] as const) {
          if (p * 100 >= threshold && !depthTracked[threshold]) {
            depthTracked[threshold] = true;
            analytics.scrollDepth(threshold);
          }
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isLoaded, images, frameCount]);

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
      canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen bg-[#050505] w-full">
      <div className="h-screen w-full flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full object-contain pointer-events-none" />

        {/* Scrim — subtle darkening during text beats */}
        <div className="text-scrim absolute inset-0 z-[3] pointer-events-none bg-black/40 opacity-0" />

        {/* ── Text Overlay Layer ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full max-w-[90rem] mx-auto flex flex-col justify-center items-center px-8 md:px-16">

            {/* ── BEAT 1: "OBSESSIVELY SOURCED" ── */}
            <div className="beat-1 absolute inset-0 flex flex-col items-center justify-center text-center opacity-0" style={{ backdropFilter: "blur(2px)" }}>
              <div className="b1-line h-[1px] bg-white/20 w-16 mb-8" />
              <h2 className="b1-heading beat-heading text-3xl md:text-[3rem] lg:text-[4.5rem] font-bold text-white tracking-[0.2em] uppercase leading-[1.1]">
                Obsessively Sourced
              </h2>
              <p className="b1-sub beat-sub text-[10px] md:text-xs text-white/40 font-mono tracking-[0.35em] uppercase mt-8">
                Ethiopian Volcanic Soil
              </p>
            </div>

            {/* ── BEAT 2: "THE PERFECT GRIND" ── */}
            <div className="beat-2 absolute inset-0 flex flex-col items-center justify-center text-center opacity-0" style={{ backdropFilter: "blur(2px)" }}>
              <div className="b2-line h-[1px] bg-white/20 w-16 mb-8" />
              <h2 className="b2-heading beat-heading text-3xl md:text-[3rem] lg:text-[4.5rem] font-bold text-white tracking-[0.2em] uppercase leading-[1.1]">
                The Perfect Grind
              </h2>
              <p className="b2-sub beat-sub text-[10px] md:text-xs text-white/40 font-mono tracking-[0.35em] uppercase mt-8">
                Micron Precision
              </p>
            </div>

            {/* ── BEAT 3: "ARTISAN EXTRACTION" ── */}
            <div className="beat-3 absolute inset-0 flex flex-col items-center justify-center text-center opacity-0" style={{ backdropFilter: "blur(2px)" }}>
              <div className="b3-line h-[1px] bg-white/20 w-16 mb-8" />
              <h2 className="b3-heading beat-heading text-3xl md:text-[3rem] lg:text-[4.5rem] font-bold text-white tracking-[0.2em] uppercase leading-[1.1]">
                Artisan Extraction
              </h2>
              <p className="b3-sub beat-sub text-[10px] md:text-xs text-white/40 font-mono tracking-[0.35em] uppercase mt-8">
                Peak Bloom Capture
              </p>
            </div>

            {/* ── BEAT 4: "BUT FIRST COFFEE." ── */}
            <div className="beat-4 absolute inset-0 flex flex-col items-center justify-center text-center opacity-0" style={{ backdropFilter: "blur(2px)" }}>
              <div className="b4-line h-[1px] bg-white/20 w-16 mb-8" />
              <h2 className="b4-heading beat-heading text-4xl md:text-[3.5rem] lg:text-[5.5rem] font-bold text-white tracking-[0.22em] uppercase leading-[1.1]">
                But First Coffee
              </h2>
              <p className="b4-sub beat-sub text-[10px] md:text-sm text-white/40 font-mono tracking-[0.4em] uppercase mt-10">
                Your Ritual Redefined
              </p>
            </div>

          </div>
        </div>

        {/* Film grain overlay — masks low-res frames, adds cinematic texture */}
        <div className="grain-overlay absolute inset-0 z-[8] pointer-events-none opacity-[0.06] mix-blend-overlay" />

        {/* Vignette — stronger center darkening for text readability */}
        <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.65)_100%)]" />

        {/* Steam effect — subtle rising wisps */}
        <div className="steam-container absolute bottom-0 left-1/2 -translate-x-1/2 z-[6] pointer-events-none w-full h-1/2 overflow-hidden opacity-30">
          <div className="steam-wisp steam-wisp-1" />
          <div className="steam-wisp steam-wisp-2" />
          <div className="steam-wisp steam-wisp-3" />
        </div>
      </div>
    </div>
  );
}
