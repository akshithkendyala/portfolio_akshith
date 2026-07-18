"use client";
import React, { useState, useEffect } from "react";
import TerminalBoot from "@/src/components/TerminalBoot";
import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import About from "@/src/components/About";
import CodingProfiles from "@/src/components/CodingProfiles";
import Skills from "@/src/components/Skills";
import Experience from "@/src/components/Experience";
import Projects from "@/src/components/Projects";
import Education from "@/src/components/Education";
import Contact from "@/src/components/Contact";
import Footer from "@/src/components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    if (isBooted) {
      // Fade in the main page content smoothly on boot complete
      gsap.fromTo(
        ".portfolio-main",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [isBooted]);

  return (
    <>
      {!isBooted ? (
        <TerminalBoot onComplete={() => setIsBooted(true)} />
      ) : (
        <div className="portfolio-main min-h-screen bg-[#0D1117] text-[#C9D1D9] font-sans flex flex-col opacity-0">
          {/* Header/Navbar */}
          <Navbar />

          {/* Core Layout */}
          <main className="flex-grow flex flex-col">
            {/* Interactive clone terminal hero */}
            <Hero />

            {/* Git Timeline Container */}
            <div className="relative w-full max-w-7xl mx-auto py-10">
              
              {/* Optional: continuous main branch indicator line in background */}
              <div className="absolute left-8 md:left-16 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#30363D] via-[#3FB950]/30 to-[#30363D] opacity-20 pointer-events-none hidden lg:block" />

              {/* Commit 01: Initial Commit (About) */}
              <About />

              {/* Remotes: Coding Platforms */}
              <CodingProfiles />

              {/* Branches: Skills */}
              <Skills />

              {/* Merge Commits: Experience */}
              <Experience />

              {/* Feature Branches: Projects */}
              <Projects />

              {/* Release Versions: Education */}
              <Education />

              {/* Git Push: Contact */}
              <Contact />
            </div>
          </main>

          {/* Footer: Git status */}
          <Footer />
        </div>
      )}
    </>
  );
}

