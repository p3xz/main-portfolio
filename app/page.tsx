"use client";

import BubbleMenu from "@/components/BubbleMenu";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import GlobalBackground from "@/components/GlobalBackground";

export default function Page() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen overflow-x-hidden bg-[#09090b]">
        {/* Background Grid & Vignette */}
        <GlobalBackground />

        {/* Bubble Menu Navigation */}
        <BubbleMenu
          logo={<span className="font-bold text-[#0a0a0f]">Namish</span>}
          menuBg="#ffffff"
          menuContentColor="#0a0a0f"
          useFixedPosition={true}
        />

        {/* Page Content */}
        <div className="relative z-10">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}