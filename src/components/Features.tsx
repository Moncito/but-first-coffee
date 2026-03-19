"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Flame, Coffee, Leaf, MapPin, Droplet } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal header
    gsap.fromTo(".features-header", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        scrollTrigger: {
          trigger: ".features-header",
          start: "top 80%",
        }
      }
    );

    // Progressive card loading
    const cards = gsap.utils.toArray(".bento-card");
    cards.forEach((card: unknown, i: number) => {
      gsap.fromTo(card as gsap.TweenTarget, 
        { opacity: 0, scale: 0.95, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card as gsap.DOMTarget,
            start: "top 85%",
          }
        }
      );
    });

    // Background transition
    gsap.to(containerRef.current, {
      backgroundColor: "#F7F5F0", // Warm cream coffee background
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 20%",
        scrub: true,
      }
    });

    // Title color transition
    gsap.to(".features-title", {
      color: "#2C1810", // Deep espresso brown
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 20%",
        scrub: true,
      }
    });

  }, []);

  return (
    <section 
      id="features-section"
      ref={containerRef}
      className="py-32 bg-[#050505] transition-colors duration-1000 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="features-header mb-20 text-center">
          <h2 className="text-sm font-semibold text-[#8C7A6B] uppercase tracking-widest mb-4">Sourcing & Craft</h2>
          <p className="features-title text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            The Perfect Extraction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Top Row */}

          {/* Card 1: Single Origin Drops */}
          <div className="bento-card md:col-span-3 bg-white rounded-[2rem] p-8 shadow-sm flex flex-col justify-center items-center">
            <div className="flex gap-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#F5E6D3] flex items-center justify-center border-2 border-white shadow-sm z-30">
                <Leaf className="w-5 h-5 text-[#8C7A6B]" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#E8DCC4] flex items-center justify-center border-2 border-white shadow-sm -ml-4 z-20">
                <MapPin className="w-5 h-5 text-[#8C7A6B]" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#DCD0BA] flex items-center justify-center border-2 border-white shadow-sm -ml-4 z-10">
                <Coffee className="w-5 h-5 text-[#8C7A6B]" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#2C1810] mb-1">3 New Roasts</h3>
            <p className="text-sm text-[#8C7A6B]">Single Origins Added</p>
          </div>

          {/* Card 2: Trending Seasonal Roast */}
          <div className="bento-card md:col-span-6 bg-white rounded-[2rem] p-8 shadow-sm flex items-center justify-between group overflow-hidden relative border border-[#F0EBE1]">
            <div className="relative z-10 p-6 bg-white/60 backdrop-blur-md border border-[#F5E6D3] rounded-3xl shadow-[0_8px_30px_rgb(44,24,16,0.06)] inline-block">
              <div className="w-14 h-14 bg-[#D35400] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#D35400]/20">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-[#8C7A6B] font-medium mb-1">Seasonal Highlight</p>
              <h3 className="text-2xl font-bold text-[#2C1810]">Ethiopian Yirgacheffe</h3>
            </div>
            
            {/* Minimalist Graphic BG */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#E8DCC4] via-white to-white" />
            
            <button className="z-10 w-12 h-12 rounded-full bg-[#F7F5F0] flex items-center justify-center hover:bg-[#E8DCC4] transition-colors">
              <ArrowRight className="w-5 h-5 text-[#2C1810]" />
            </button>
          </div>

          {/* Card 3: Subscription Delivery */}
          <div className="bento-card md:col-span-3 bg-white rounded-[2rem] p-8 shadow-sm flex flex-col justify-between border border-[#F0EBE1]">
            <div>
              <p className="text-[#8C7A6B] font-medium mb-1">Next Delivery</p>
              <h3 className="text-4xl font-light text-[#2C1810] tracking-tight">Mar 19</h3>
            </div>
            <div className="flex items-center gap-3 mt-10">
              <div className="w-10 h-10 rounded-full bg-[#2C1810] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#F7F5F0]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2C1810]">Fresh Batch</p>
                <p className="text-xs text-[#8C7A6B]">In-Transit</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}

          {/* Card 4: Tasting Notes & Profiles (Tall) */}
          <div className="bento-card md:col-span-4 md:row-span-2 bg-white rounded-[2rem] p-8 shadow-sm flex flex-col border border-[#F0EBE1]">
            <h3 className="text-xl font-bold text-[#2C1810] mb-6">Flavor Profiles</h3>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#D35400] flex items-center justify-center border-2 border-white z-30"></div>
                <div className="w-8 h-8 rounded-full bg-[#F5B041] flex items-center justify-center border-2 border-white z-20"></div>
                <div className="w-8 h-8 rounded-full bg-[#F4D03F] flex items-center justify-center border-2 border-white z-10"></div>
              </div>
              <div className="px-4 py-2 rounded-full bg-[#F7F5F0] text-sm font-medium text-[#2C1810] flex items-center gap-2">
                Intensity
                <Droplet className="w-4 h-4 text-[#D35400] fill-[#D35400]" />
              </div>
            </div>

            <div className="border-t border-dashed border-[#E8DCC4] mb-6" />

            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-medium text-[#2C1810]">Current Roasts</h4>
              <span className="text-xs text-[#8C7A6B]">3 origins</span>
            </div>

            <div className="space-y-6 flex-1">
              {[
                { note: "Toasted Caramel", origin: "Colombia • Light Roast", intensity: "80%", color: "bg-[#D35400]" },
                { note: "Bright Citrus", origin: "Kenya • Medium Roast", intensity: "60%", color: "bg-[#F5B041]" },
                { note: "Dark Chocolate", origin: "Brazil • Dark Roast", intensity: "90%", color: "bg-[#2C1810]" },
              ].map((profile, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#2C1810]">{profile.note}</p>
                      <p className="text-xs text-[#8C7A6B]">{profile.origin}</p>
                    </div>
                    <span className="text-xs font-bold text-[#2C1810]">{profile.intensity}</span>
                  </div>
                  <div className="w-full bg-[#F7F5F0] h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${profile.color} rounded-full`} style={{ width: profile.intensity }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 5: Farm-to-Cup Journey */}
          <div className="bento-card md:col-span-8 bg-white rounded-[2rem] p-10 shadow-sm relative overflow-hidden flex items-center border border-[#F0EBE1]">
            <div className="relative z-10 w-full md:w-3/5">
              <h3 className="text-3xl font-medium text-[#2C1810] mb-4 tracking-tight">Farm-to-Cup Journey</h3>
              <p className="text-[#8C7A6B] leading-relaxed mb-8 text-sm max-w-sm">
                Explore the high-altitude farms where our beans are meticulously grown, picked, and processed.
              </p>
              <button className="px-6 py-3 rounded-xl bg-[#2C1810] text-white text-sm font-medium hover:bg-[#1A0E09] transition-colors">
                Explore Sourcing
              </button>
            </div>
            
            {/* Background Image: Coffee Farm */}
            <div className="absolute right-0 top-0 w-full md:w-2/3 h-full overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
               <Image 
                 src="https://images.unsplash.com/photo-1525088553748-01d6e210e00b?auto=format&fit=crop&q=80"
                 alt="Coffee Farm"
                 width={800}
                 height={600}
                 unoptimized
                 className="w-full h-full object-cover opacity-80"
               />
            </div>
          </div>

          {/* Card 6: Barista's Daily Pick */}
          <div className="bento-card md:col-span-4 bg-white rounded-[2rem] p-8 shadow-sm flex flex-col items-center relative border border-[#F0EBE1]">
            <span className="absolute top-6 left-6 text-xs font-bold text-[#D35400] uppercase tracking-wider">Barista Pick</span>
            
            <div className="mt-8 flex flex-col items-center z-10">
              <div className="w-20 h-20 rounded-full mb-4 overflow-hidden border-4 border-white shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=300&q=80" 
                  alt="Latte Art" 
                  width={80}
                  height={80}
                  unoptimized
                  className="w-full h-full object-cover" 
                />
              </div>
              <h4 className="text-base font-bold text-[#2C1810] mb-1">Honey Oat Latte</h4>
              <p className="text-sm text-[#8C7A6B]">
                Perfect morning balance
              </p>
            </div>

            <div className="flex gap-1.5 mt-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D35400]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#E8DCC4]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#E8DCC4]"></div>
            </div>
          </div>

          {/* Card 7: Gear / Equipment */}
          <div className="bento-card md:col-span-4 bg-white rounded-[2rem] p-6 shadow-sm flex flex-col justify-between border border-[#F0EBE1]">
            <div className="mb-4">
              <h4 className="text-sm font-bold text-[#2C1810] mb-1">Equip Your Setup</h4>
              <p className="text-xs text-[#8C7A6B]">Pro-level extraction at home.</p>
            </div>
            
            <div className="h-28 w-full rounded-2xl overflow-hidden mb-4 relative bg-[#F7F5F0]">
              <Image 
                src="https://images.unsplash.com/photo-1582216630806-031e427d1421?auto=format&fit=crop&q=80&w=800" 
                alt="Coffee Pour Over" 
                width={400}
                height={300}
                unoptimized
                className="w-full h-full object-cover opacity-90 mix-blend-multiply"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#8C7A6B] font-medium">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5" />
                  Brew Guides
                </div>
              </div>
              <button className="text-[#D35400] font-bold hover:underline">Shop Gear</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
