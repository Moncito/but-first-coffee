"use client";

import React, { useState } from "react";
import IntroLoader from "@/components/IntroLoader";
import Navbar from "@/components/Navbar";
import CoffeeCanvas from "@/components/CoffeeCanvas";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="bg-[#0A0A0A] min-h-screen selection:bg-[#F5F5F7] selection:text-black">
      {!isLoaded && <IntroLoader onComplete={() => setIsLoaded(true)} />}
      
      <div className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <Navbar />
        
        {/* The Scrollytelling Engine */}
        <CoffeeCanvas frameCount={240} />

        {/* Post-Animation Sections — flush against canvas */}
        <div className="relative z-10">
          <Features />
          <Testimonials />
          <FinalCTA />
        </div>

        <Footer />
      </div>
    </main>
  );
}
