"use client";

import React, { useState } from "react";
import { analytics } from "@/lib/analytics";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // In production, send to your API / email service
    analytics.newsletterSubscribe();
    setSubscribed(true);
    setEmail("");
  };

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
            <a href="#" className="hover:text-black focus-visible:text-black focus-visible:outline-none transition-colors">The Roast</a>
            <a href="#" className="hover:text-black focus-visible:text-black focus-visible:outline-none transition-colors">Origins</a>
            <a href="#" className="hover:text-black focus-visible:text-black focus-visible:outline-none transition-colors">Brewing</a>
          </div>
          <div className="space-y-4 flex flex-col">
            <span className="text-black/20 mb-2">Support</span>
            <a href="#" className="hover:text-black focus-visible:text-black focus-visible:outline-none transition-colors">Shipping</a>
            <a href="#" className="hover:text-black focus-visible:text-black focus-visible:outline-none transition-colors">Returns</a>
            <a href="#" className="hover:text-black focus-visible:text-black focus-visible:outline-none transition-colors">FAQ</a>
          </div>
          <div className="space-y-4 flex flex-col">
            <span className="text-black/20 mb-2">Social</span>
            <a href="#" className="hover:text-black focus-visible:text-black focus-visible:outline-none transition-colors">Instagram</a>
            <a href="#" className="hover:text-black focus-visible:text-black focus-visible:outline-none transition-colors">Twitter</a>
            <a href="#" className="hover:text-black focus-visible:text-black focus-visible:outline-none transition-colors">Email</a>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="max-w-7xl mx-auto mt-16 pt-10 border-t border-black/5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-bold text-[#2C1810] tracking-tight mb-1">
              Get Brewing Tips & Exclusive Drops
            </h3>
            <p className="text-[10px] font-mono text-black/30 uppercase tracking-[0.2em]">
              Join 12,000+ coffee obsessives. No spam, just good beans.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C1810]/5 text-[#2C1810]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-xs font-bold tracking-wider uppercase">You&apos;re in! Check your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="px-5 py-3 rounded-full bg-white border border-black/10 text-sm text-[#2C1810] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#2C1810]/20 w-full md:w-64 font-mono text-xs tracking-wider"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#2C1810] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#1A0E09] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C1810]/50"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-black/5 flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.4em] opacity-50">
        <span>&copy; 2026 But First Coffee.</span>
        <span className="text-black">Obsessively Focused.</span>
      </div>
    </footer>
  );
}
