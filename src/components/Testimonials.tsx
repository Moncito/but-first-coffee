"use client";

import React from "react";
import { Play } from "lucide-react";

const testimonials = [
  {
    type: "text",
    name: "Patrick Nawrocki",
    quote: "\"The lovely team at But First Coffee has provided our startup with significant leverage. Their coffee is exceptionally roasted, and the team is always attentive to our needs, taking the time to understand our flavor profiles and offer valuable direction. Additionally, their delivery times are impressively fast!\"",
    role: "UX Manager at Superhabits",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    type: "video",
    name: "Pri Patel",
    role: "Product Designer at Lightdash",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    videoThumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
  },
  {
    type: "text",
    name: "Rob West",
    quote: "\"But First Coffee has greatly exceeded our expectations. The communication is always excellent, the turnaround is extremely quick, and the espresso blends are fresh, innovative, and spot on!\"",
    role: "CEO of Kingdom Advisors",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    type: "text",
    name: "Sarah Jenkins",
    quote: "\"This subscription is the best investment I've made for my mornings. The seasonal blends are out of this world, and the tasting notes are incredibly accurate. A true premium experience.\"",
    role: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    type: "video",
    name: "Michael Chang",
    role: "Architect at Studio MC",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    videoThumbnail: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
  },
  {
    type: "text",
    name: "Dom Tyler",
    quote: "\"The consistency of their single-origin beans is simply unmatched. We've tried multiple roasters before finding But First Coffee, and they are by far the most reliable partners for our daily operations.\"",
    role: "Founder of BrewTech",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg"
  },
  {
    type: "text",
    name: "Emily Chen",
    quote: "\"I love the transparency and sustainability focus. Knowing exactly which farm my coffee comes from, and seeing the direct-trade impact, makes every sip taste even better.\"",
    role: "Sustainability Consultant",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg"
  },
  {
    type: "text",
    name: "David Rodriguez",
    quote: "\"As a former barista, I have ridiculously high standards for my home setup. But First Coffee meets and exceeds them every single time. Their Ethiopian roast is a masterpiece.\"",
    role: "Cafe Owner",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg"
  }
];

export default function Testimonials() {
  const carouselItems = [...testimonials, ...testimonials];

  return (
    <section id="testimonials-section" className="py-24 bg-[#F5F5F7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-20">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] mb-4">
          Testimonials
        </h2>
        <p className="text-5xl md:text-[4.5rem] font-light text-black tracking-tighter leading-[1.1]">
          Don&apos;t take our word for it!<br />
          Hear it from our partners.
        </p>
      </div>

      <div className="w-full relative group">
        {/* Gradient Fades for depth */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#F5F5F7] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#F5F5F7] to-transparent z-10 pointer-events-none" />

        {/* Animated Marquee */}
        <div className="flex w-max animate-marquee hover:pause-animation">
          {carouselItems.map((t, i) => (
            <div key={i} className="pr-6 shrink-0">
              <div
                className={`relative w-[320px] md:w-[380px] min-h-[480px] rounded-[2rem] p-8 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:-translate-y-1 duration-300 ${
                  t.type === "video" ? "text-white justify-between overflow-hidden" : "bg-white text-black"
                }`}
              >
                {t.type === "video" && t.videoThumbnail && (
                  <>
                    <img 
                      src={t.videoThumbnail} 
                      alt="Video thumbnail" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </>
                )}
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Avatar */}
                  <div className="mb-6">
                    <img 
                      src={t.avatar} 
                      alt={t.name}
                      className={`w-12 h-12 rounded-full object-cover ${t.type === "video" ? "border-2 border-[#D4AF37]" : ""}`}
                    />
                  </div>

                  {/* Content */}
                  {t.type === "text" ? (
                    <p className="text-gray-700 text-[16px] leading-relaxed mb-8 flex-grow">
                      {t.quote}
                    </p>
                  ) : (
                    <div className="flex-grow flex items-center justify-center">
                      <button className="w-16 h-10 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer">
                        <Play className="w-5 h-5 text-white fill-white ml-1" />
                      </button>
                    </div>
                  )}

                  {/* Footer / Signature */}
                  <div className="mt-auto pt-4">
                    <div className="font-signature text-gray-900 leading-none mb-1 text-[2.5rem]">
                      {t.type === "video" ? <span className="text-white">{t.name}</span> : t.name}
                    </div>
                    <div className={`text-sm tracking-wide ${t.type === "video" ? "text-gray-300" : "text-gray-400"}`}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap');
        
        .font-signature {
          font-family: 'Mrs Saint Delafield', cursive;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 70s linear infinite;
        }
        
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
