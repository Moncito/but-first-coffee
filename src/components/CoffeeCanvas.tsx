"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Manual character splitter ── */
function SplitChars({
  text,
  className = "",
  charClass = "",
}: {
  text: string;
  className?: string;
  charClass?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline" }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className={charClass}
              style={{ display: "inline-block", willChange: "transform, opacity" }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && <span style={{ display: "inline-block" }}>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}



interface CoffeeCanvasProps {
  frameCount?: number;
}

export default function CoffeeCanvas({ frameCount = 120 }: CoffeeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameStr = i.toString().padStart(3, "0");
      img.src = `/assets/coffee-sequence/frame_${frameStr}_delay-0.033s.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded === frameCount) setIsLoaded(true);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount]);

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
    // Use end: "+=300%" for exactly 300vh of scroll distance.
    // No tall container needed — the pin + pinSpacing handles layout.
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 0.6,
        pin: true,
        pinSpacing: true,
      },
    });

    // 1. Canvas frame sequence (spans full 0→1)
    masterTl.to(
      { frame: 0 },
      {
        frame: frameCount - 1,
        duration: 1,
        ease: "none",
        onUpdate: function () {
          render(this.targets()[0].frame);
        },
      },
      0
    );

    // ── Animated text scrim ──
    // Darkens the canvas when text beats are active for readability
    const scrim = containerRef.current.querySelector(".text-scrim");
    // Beat 1 scrim
    masterTl.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.02, ease: "power2.inOut" }, 0.02);
    masterTl.to(scrim, { opacity: 0, duration: 0.01 }, 0.23);
    // Beat 2 scrim
    masterTl.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.02, ease: "power2.inOut" }, 0.25);
    masterTl.to(scrim, { opacity: 0, duration: 0.01 }, 0.48);
    // Beat 3 scrim
    masterTl.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.02, ease: "power2.inOut" }, 0.50);
    masterTl.to(scrim, { opacity: 0, duration: 0.01 }, 0.73);
    // Beat 4 scrim
    masterTl.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.02, ease: "power2.inOut" }, 0.75);
    masterTl.to(scrim, { opacity: 0, duration: 0.02 }, 0.96);

    // ════════════════════════════════════════════════
    // BEAT 1 — "Obsessively Sourced." — 3D cascade (0.02 → 0.24)
    // ════════════════════════════════════════════════
    const b1Chars = containerRef.current.querySelectorAll(".b1-char");
    const b1Sub = containerRef.current.querySelector(".b1-sub");
    const b1Line = containerRef.current.querySelector(".b1-line");

    masterTl.fromTo(".beat-1", { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0.02);

    masterTl.fromTo(
      b1Line,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.08, ease: "power3.out" },
      0.03
    );

    masterTl.fromTo(
      b1Chars,
      { opacity: 0, y: 80, rotateX: -90, scale: 0.5 },
      {
        opacity: 1, y: 0, rotateX: 0, scale: 1,
        duration: 0.12,
        stagger: { amount: 0.06, from: "start" },
        ease: "back.out(1.7)",
      },
      0.04
    );

    masterTl.fromTo(
      b1Sub,
      { opacity: 0, y: 20, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.04, ease: "power2.out" },
      0.13
    );

    masterTl.to(b1Chars, {
      opacity: 0, y: -120, rotateX: 60, scale: 0.3,
      stagger: { amount: 0.04, from: "random" },
      duration: 0.06, ease: "power3.in",
    }, 0.19);
    masterTl.to([b1Sub, b1Line], { opacity: 0, duration: 0.02 }, 0.22);
    masterTl.to(".beat-1", { opacity: 0, duration: 0.01 }, 0.24);

    // ════════════════════════════════════════════════
    // BEAT 2 — "The Perfect Grind." — Magnetic assembly (0.25 → 0.49)
    // ════════════════════════════════════════════════
    const b2Chars = containerRef.current.querySelectorAll(".b2-char");
    const b2Sub = containerRef.current.querySelector(".b2-sub");

    masterTl.fromTo(".beat-2", { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0.25);

    b2Chars.forEach((char) => {
      const rx = (Math.random() - 0.5) * 600;
      const ry = (Math.random() - 0.5) * 400;
      const rr = (Math.random() - 0.5) * 180;
      gsap.set(char, { x: rx, y: ry, rotation: rr, opacity: 0, scale: 0 });
    });

    masterTl.to(b2Chars, {
      x: 0, y: 0, rotation: 0, opacity: 1, scale: 1,
      duration: 0.12,
      stagger: { amount: 0.05, from: "center" },
      ease: "elastic.out(1, 0.5)",
    }, 0.27);

    masterTl.fromTo(
      b2Sub,
      { opacity: 0, letterSpacing: "1em", filter: "blur(4px)" },
      { opacity: 1, letterSpacing: "0.2em", filter: "blur(0px)", duration: 0.06, ease: "power2.out" },
      0.36
    );

    masterTl.to(b2Chars, {
      opacity: 0, scale: 0, x: 0, y: 0,
      stagger: { amount: 0.03, from: "edges" },
      duration: 0.05, ease: "power4.in",
    }, 0.43);
    masterTl.to(b2Sub, { opacity: 0, duration: 0.02 }, 0.46);
    masterTl.to(".beat-2", { opacity: 0, duration: 0.01 }, 0.49);

    // ════════════════════════════════════════════════
    // BEAT 3 — "Artisan Extraction." — Clip-path wipe (0.50 → 0.74)
    // ════════════════════════════════════════════════
    const b3Wrap = containerRef.current.querySelector(".beat-3") as HTMLElement;
    const b3Chars = containerRef.current.querySelectorAll(".b3-char");
    const b3Sub = containerRef.current.querySelector(".b3-sub");

    masterTl.fromTo(".beat-3", { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0.50);

    masterTl.fromTo(
      b3Wrap,
      { clipPath: "inset(50% 50% 50% 50%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.10, ease: "power4.out" },
      0.51
    );

    masterTl.fromTo(
      b3Chars,
      { opacity: 0, filter: "blur(12px)", y: 30 },
      {
        opacity: 1, filter: "blur(0px)", y: 0,
        duration: 0.08,
        stagger: { amount: 0.05, from: "random" },
        ease: "power2.out",
      },
      0.52
    );

    masterTl.fromTo(
      b3Sub,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.05, ease: "power2.out" },
      0.60
    );

    masterTl.to(b3Wrap, {
      clipPath: "inset(50% 0% 50% 0%)",
      duration: 0.06, ease: "power3.in",
    }, 0.68);
    masterTl.to(".beat-3", { opacity: 0, duration: 0.01 }, 0.74);

    // ════════════════════════════════════════════════
    // BEAT 4 — "But First Coffee." — Elastic rise (0.75 → 1.0)
    // Exits at EXACTLY 1.0 — no dead zone
    // ════════════════════════════════════════════════
    const b4Chars = containerRef.current.querySelectorAll(".b4-char");
    const b4Sub = containerRef.current.querySelector(".b4-sub");
    const b4Dot = containerRef.current.querySelector(".b4-dot");

    masterTl.fromTo(".beat-4", { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0.75);

    masterTl.fromTo(
      b4Chars,
      { opacity: 0, y: 150, rotateZ: gsap.utils.wrap([-15, 10, -8, 12, -5, 8]) },
      {
        opacity: 1, y: 0, rotateZ: 0,
        duration: 0.10,
        stagger: { amount: 0.05, from: "start" },
        ease: "elastic.out(1.2, 0.4)",
      },
      0.76
    );

    if (b4Dot) {
      masterTl.fromTo(
        b4Dot,
        { opacity: 0, scale: 0, y: -100 },
        { opacity: 1, scale: 1, y: 0, duration: 0.03, ease: "bounce.out" },
        0.86
      );
    }

    masterTl.fromTo(
      b4Sub,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.03, ease: "power2.out" },
      0.88
    );

    // Exit flush at 1.0
    masterTl.to(b4Chars, {
      opacity: 0, rotateY: 90,
      x: gsap.utils.wrap([-200, 200]),
      stagger: { amount: 0.02, from: "center" },
      duration: 0.04, ease: "power3.in",
    }, 0.93);
    masterTl.to([b4Sub, b4Dot], { opacity: 0, duration: 0.03 }, 0.95);
    masterTl.to(".beat-4", { opacity: 0, duration: 0.02 }, 0.98);

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

        {/* Animated scrim — darkens canvas when text beats are active */}
        <div className="text-scrim absolute inset-0 z-[3] pointer-events-none bg-black/50 opacity-0" />

        {/* ── Text Overlay Layer ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ perspective: "1200px" }}>
          <div className="relative w-full h-full max-w-[90rem] mx-auto flex flex-col justify-center items-center px-8 md:px-16">

            {/* ── BEAT 1: "OBSESSIVELY SOURCED" ── */}
            <div className="beat-1 absolute inset-0 flex flex-col items-center justify-center text-center opacity-0" style={{ transformStyle: "preserve-3d", backdropFilter: "blur(2px)" }}>
              <div className="h-[2px] bg-white/30 w-24 mb-6 b1-line origin-left" />
              <h2 className="beat-heading text-2xl md:text-[2.5rem] lg:text-[3.5rem] font-bold text-white tracking-[0.18em] uppercase leading-[1.15]">
                <SplitChars text="Obsessively Sourced" charClass="b1-char" />
              </h2>
              <p className="b1-sub beat-sub text-[10px] md:text-xs text-white/40 font-mono tracking-[0.35em] uppercase mt-8">
                Ethiopian Volcanic Soil
              </p>
            </div>

            {/* ── BEAT 2: "THE PERFECT GRIND" ── */}
            <div className="beat-2 absolute inset-0 flex flex-col items-center justify-center text-center opacity-0" style={{ transformStyle: "preserve-3d", backdropFilter: "blur(2px)" }}>
              <h2 className="beat-heading text-2xl md:text-[2.5rem] lg:text-[3.5rem] font-bold text-white tracking-[0.18em] uppercase leading-[1.15]">
                <SplitChars text="The Perfect Grind" charClass="b2-char" />
              </h2>
              <p className="b2-sub beat-sub text-[10px] md:text-xs text-white/40 font-mono tracking-[0.35em] uppercase mt-8">
                Micron Precision
              </p>
            </div>

            {/* ── BEAT 3: "ARTISAN EXTRACTION" ── */}
            <div className="beat-3 absolute inset-0 flex flex-col items-center justify-center text-center opacity-0" style={{ transformStyle: "preserve-3d", backdropFilter: "blur(2px)" }}>
              <h2 className="beat-heading text-2xl md:text-[2.5rem] lg:text-[3.5rem] font-bold text-white tracking-[0.18em] uppercase leading-[1.15]">
                <SplitChars text="Artisan Extraction" charClass="b3-char" />
              </h2>
              <p className="b3-sub beat-sub text-[10px] md:text-xs text-white/40 font-mono tracking-[0.35em] uppercase mt-8">
                Peak Bloom Capture
              </p>
            </div>

            {/* ── BEAT 4: "BUT FIRST COFFEE" ── */}
            <div className="beat-4 absolute inset-0 flex flex-col items-center justify-center text-center opacity-0" style={{ transformStyle: "preserve-3d", backdropFilter: "blur(2px)" }}>
              <h2 className="beat-heading text-3xl md:text-[3rem] lg:text-[4rem] font-bold text-white tracking-[0.22em] uppercase leading-[1.15]">
                <SplitChars text="But First Coffee" charClass="b4-char" />
                <span className="b4-dot inline-block">.</span>
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
      </div>
    </div>
  );
}
