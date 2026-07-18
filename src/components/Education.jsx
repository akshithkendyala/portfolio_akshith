"use client";
import React, { useEffect, useRef } from "react";
import { Tag, Calendar, GraduationCap, ChevronRight, Award } from "lucide-react";
import { educationHistory } from "../data/portfolioData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const containerRef = useRef(null);
  const releasesRef = useRef([]);

  useEffect(() => {
    // Release cards drop-in animation
    releasesRef.current.forEach((release, index) => {
      if (!release) return;

      const tagBadge = release.querySelector(".release-tag-badge");
      const releaseContent = release.querySelector(".release-content");

      // Version badge drops into place
      gsap.fromTo(
        tagBadge,
        { y: -60, opacity: 0, scale: 0.7 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: release,
            start: "top 80%"
          }
        }
      );

      // Card body fades and slides up
      gsap.fromTo(
        releaseContent,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: release,
            start: "top 80%"
          }
        }
      );
    });
  }, []);

  return (
    <section id="education" className="py-20 px-4 md:px-8 max-w-4xl mx-auto" ref={containerRef}>
      {/* Title */}
      <div className="flex items-center space-x-3 mb-16">
        <div className="bg-[#2ea44f]/10 p-2.5 rounded-full border border-[#2ea44f]/30">
          <Tag className="h-6 w-6 text-[#3FB950]" />
        </div>
        <div>
          <span className="font-mono text-xs text-[#8B949E] uppercase tracking-wider">Release Tags</span>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[#F0F6FC] leading-none mt-1">
            "git tag -l"
          </h2>
        </div>
      </div>

      {/* Releases container */}
      <div className="space-y-12 relative border-l-2 border-[#30363D] ml-5 md:ml-10 pl-8 md:pl-16">
        
        {educationHistory.map((edu, index) => (
          <div 
            key={edu.version}
            ref={el => releasesRef.current[index] = el}
            className="relative"
          >
            
            {/* Version tag badge (dropping item) */}
            <div 
              className={`absolute -left-[48px] md:-left-[84px] top-1 z-10 font-mono text-xs font-bold border rounded-full px-2.5 py-1.5 shadow-lg select-none release-tag-badge bg-[#161B22] border-[#30363D] text-[#3FB950] ${edu.version === "v3.0" ? "scale-110 ring-2 ring-[#3FB950]/30 shadow-[#3FB950]/20" : ""}`}
            >
              <div className="flex items-center space-x-1">
                <Tag className="h-3 w-3 shrink-0" />
                <span>{edu.version}</span>
              </div>
            </div>

            {/* Release Description Card */}
            <div className="release-content border border-[#30363D] bg-[#161B22] rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:border-[#8B949E]/40">
              
              {/* Header */}
              <div className="bg-[#21262D] px-5 py-4 border-b border-[#30363D] flex items-center justify-between">
                <div className="flex items-center space-x-2 font-mono">
                  <span className="text-[#8B949E]">Release Notes:</span>
                  <span className="text-[#F0F6FC] font-semibold">{edu.stage}</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${edu.badgeColor || "bg-zinc-800 text-zinc-300 border-zinc-700"} select-none`}>
                  {edu.version === "v4.0" ? "Pre-release" : "Latest Release"}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 md:p-6 space-y-4">
                
                {/* Meta details */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#F0F6FC]">
                    {edu.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center text-xs font-mono text-[#8B949E] gap-1 sm:gap-3">
                    <span className="text-[#58A6FF] font-medium">{edu.institution}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{edu.period}</span>
                    </span>
                  </div>
                </div>

                {/* Markdown Changelog notes */}
                <div className="space-y-2 border-t border-[#30363D]/50 pt-4 mt-2">
                  <span className="text-xs font-mono text-[#8B949E] uppercase tracking-wider block">Changelog:</span>
                  <div className="font-mono text-xs md:text-sm text-[#C9D1D9] space-y-1.5 pl-1">
                    <div className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-[#3FB950] shrink-0 mr-1 mt-0.5" />
                      <span>{edu.details}</span>
                    </div>
                    {edu.version === "v3.0" && (
                      <>
                        <div className="flex items-start">
                          <ChevronRight className="h-4 w-4 text-[#3FB950] shrink-0 mr-1 mt-0.5" />
                          <span>Core modules completed: Data Structures, Analysis of Algorithms, Machine Learning.</span>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="h-4 w-4 text-[#3FB950] shrink-0 mr-1 mt-0.5" />
                          <span>Achieved a strong CGPA, placing in the top tiers of the cohort.</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}
