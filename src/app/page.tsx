import React from "react";
import Navbar from "@/components/Navbar";
import CoffeeCanvas from "@/components/CoffeeCanvas";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar />
      
      {/* The Scrollytelling Engine */}
      <section className="relative">
        <CoffeeCanvas frameCount={240} />
      </section>

      {/* Post-Animation Sections */}
      <div className="relative z-10 bg-[#050505]">
        <Features />
        <Testimonials />
        <FinalCTA />
      </div>

      <Footer />
    </main>
  );
}
