"use client";
import React, { useEffect, useRef, useState } from "react";
import { GitPullRequest, GitMerge, Calendar, Building, ChevronDown, ChevronUp, Plus, CheckCircle2 } from "lucide-react";
import { experiences } from "../data/portfolioData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    // Staggered entrance animations
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%"
          }
        }
      );
    });
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section id="experience" className="py-20 px-4 md:px-8 max-w-4xl mx-auto" ref={containerRef}>
      {/* Title */}
      <div className="flex items-center space-x-3 mb-12">
        <div className="bg-[#BC8CFF]/10 p-2.5 rounded-full border border-[#BC8CFF]/30">
          <GitMerge className="h-6 w-6 text-[#BC8CFF]" />
        </div>
        <div>
          <span className="font-mono text-xs text-[#8B949E] uppercase tracking-wider">Experience Logs</span>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[#F0F6FC] leading-none mt-1">
            "git merge [feature-experience]"
          </h2>
        </div>
      </div>

      {/* Timeline Spans */}
      <div className="relative border-l-2 border-[#30363D] ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
        
        {experiences.map((exp, index) => {
          const isExpanded = expandedIndex === index;
          
          return (
            <div 
              key={index} 
              ref={el => itemsRef.current[index] = el}
              className="relative group"
            >
              
              {/* Timeline Merge Node (SVG/Icon representing Merge) */}
              <div 
                className={`absolute -left-[45px] md:-left-[61px] top-1 z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isExpanded 
                    ? "bg-[#6F42C1] border-[#8A63D2] shadow-[0_0_8px_#BC8CFF]" 
                    : "bg-[#161B22] border-[#30363D] group-hover:border-[#BC8CFF]"
                }`}
                onClick={() => toggleExpand(index)}
                title="Click to toggle merge details"
              >
                {isExpanded ? (
                  <GitMerge className="h-4.5 w-4.5 text-white" />
                ) : (
                  <GitPullRequest className="h-4 w-4 text-[#8B949E] group-hover:text-[#BC8CFF]" />
                )}
              </div>

              {/* Merge Title Block */}
              <div 
                className="border border-[#30363D] bg-[#161B22] rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:border-[#8B949E]/40"
              >
                
                {/* Header Summary */}
                <div 
                  className="bg-[#21262D] px-5 py-4 flex items-center justify-between cursor-pointer select-none"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-1 sm:gap-0 font-mono">
                    <span className="text-xs text-[#BC8CFF] font-semibold flex items-center">
                      Merge commit: {exp.branchName.toLowerCase()}
                    </span>
                    <span className="hidden sm:inline text-[#8B949E]">•</span>
                    <span className="text-sm font-bold text-[#F0F6FC]">{exp.role}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#8B949E] shrink-0">
                    <span className="text-xs hidden md:inline-block font-mono bg-[#30363D] px-2 py-0.5 rounded border border-[#8B949E]/10">
                      resolved
                    </span>
                    {isExpanded ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                  </div>
                </div>

                {/* Collapsible Body */}
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    isExpanded ? "max-h-[800px] border-t border-[#30363D]/60" : "max-h-0"
                  }`}
                >
                  <div className="p-5 md:p-6 space-y-6">
                    {/* Meta info */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs font-mono text-[#8B949E] gap-2 border-b border-[#30363D]/40 pb-4">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4" />
                        <span className="text-[#C9D1D9] font-medium">{exp.company}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Overview description */}
                    <p className="text-sm leading-relaxed text-[#C9D1D9] font-sans">
                      {exp.description}
                    </p>

                    {/* Contribution Diffs */}
                    <div className="space-y-3">
                      <div className="text-xs font-mono text-[#8B949E] uppercase tracking-wider">
                        Changes committed:
                      </div>
                      <div className="bg-[#0D1117] border border-[#30363D] rounded-md font-mono text-xs md:text-sm p-4 overflow-x-auto space-y-2 select-none">
                        {exp.details.map((detail, dIdx) => (
                          <div 
                            key={dIdx} 
                            className="flex items-start text-[#3FB950] bg-[#2ea44f]/5 px-2 py-1.5 rounded border-l-4 border-[#3FB950] leading-relaxed break-words"
                          >
                            <span className="font-bold mr-2.5 select-none shrink-0">+</span>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Branch status */}
                    <div className="flex items-center space-x-2 font-mono text-xs text-[#8B949E] bg-[#30363D]/20 px-3.5 py-2.5 rounded border border-[#30363D]/60">
                      <CheckCircle2 className="h-4 w-4 text-[#3FB950]" />
                      <span>Branch <span className="text-[#BC8CFF] font-semibold">{exp.branchName.toLowerCase()}</span> merged successfully with 0 conflicts.</span>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}
