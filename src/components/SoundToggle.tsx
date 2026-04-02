"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { analytics } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Create a gentle ambient "coffee shop" white noise + low hum
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Master gain (starts at 0)
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    // Filtered brown noise — warm ambient sound
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Boost
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Bandpass filter — warm coffee-shop tone
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 200;
    filter.Q.value = 0.5;

    source.connect(filter);
    filter.connect(gain);
    source.start();
    noiseSourceRef.current = source;
  }, []);

  // Show toggle once user scrolls into the canvas section
  useEffect(() => {
    ScrollTrigger.create({
      trigger: "canvas",
      start: "top 80%",
      onEnter: () => setIsVisible(true),
    });
  }, []);

  const toggleSound = useCallback(() => {
    if (isMuted) {
      initAudio();
      if (audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume();
      }
      if (gainRef.current) {
        gsap.to(gainRef.current.gain, {
          value: 0.08,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            // GSAP doesn't directly tween AudioParam, so set it manually
          },
        });
        // Use Web Audio API's native ramp
        gainRef.current.gain.linearRampToValueAtTime(
          0.08,
          audioCtxRef.current!.currentTime + 1.5
        );
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(
          0,
          audioCtxRef.current.currentTime + 0.5
        );
      }
    }
    setIsMuted(!isMuted);
    analytics.soundToggled(isMuted);
  }, [isMuted, initAudio]);

  // Cleanup
  useEffect(() => {
    return () => {
      noiseSourceRef.current?.stop();
      audioCtxRef.current?.close();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      ref={buttonRef}
      onClick={toggleSound}
      aria-label={isMuted ? "Enable ambient sound" : "Mute ambient sound"}
      className={`
        fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full backdrop-blur-xl
        border transition-all duration-500 flex items-center justify-center
        group hover:scale-110
        ${isMuted
          ? "bg-white/[0.07] border-white/[0.12] text-white/50"
          : "bg-white/[0.15] border-white/[0.25] text-white"
        }
      `}
    >
      {/* Sound wave icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {!isMuted && (
          <>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="animate-pulse" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className="animate-pulse" style={{ animationDelay: "150ms" }} />
          </>
        )}
        {isMuted && (
          <line x1="23" y1="9" x2="17" y2="15" />
        )}
      </svg>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 rounded-full bg-black/80 text-white text-[10px] font-mono tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {isMuted ? "Enable Sound" : "Mute"}
      </span>
    </button>
  );
}
