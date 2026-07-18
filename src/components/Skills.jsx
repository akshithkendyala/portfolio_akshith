"use client";
import React, { useEffect, useRef, useState } from "react";
import { GitBranch, Code, ChevronRight, Award } from "lucide-react";
import { skillBranches } from "../data/portfolioData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const [selectedBranch, setSelectedBranch] = useState(skillBranches.branches[0].name);
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const detailCardRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger to animate the branch lines drawing out
    const paths = svgRef.current.querySelectorAll(".branch-path");
    
    paths.forEach((path) => {
      const length = path.getTotalLength();
      
      // Set up initial dash states
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 75%"
        }
      });
    });

    // Animate the commit dots popping into place
    const dots = svgRef.current.querySelectorAll(".commit-dot");
    gsap.fromTo(
      dots,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 70%"
        }
      }
    );
  }, []);

  // Animate detail cards change
  useEffect(() => {
    if (detailCardRef.current) {
      gsap.fromTo(
        detailCardRef.current.children,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [selectedBranch]);

  const activeBranchDetails = skillBranches.branches.find(b => b.name === selectedBranch);

  return (
    <section id="skills" className="py-20 px-4 md:px-8 max-w-6xl mx-auto" ref={containerRef}>
      {/* Title */}
      <div className="flex items-center space-x-3 mb-10">
        <div className="bg-[#BC8CFF]/10 p-2.5 rounded-full border border-[#BC8CFF]/30">
          <GitBranch className="h-6 w-6 text-[#BC8CFF]" />
        </div>
        <div>
          <span className="font-mono text-xs text-[#8B949E] uppercase tracking-wider">Skill Branches</span>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[#F0F6FC] leading-none mt-1">
            "git checkout [branch]"
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Interactive Git Branch Visualizer Tree */}
        <div className="lg:col-span-5 border border-[#30363D] bg-[#161B22] rounded-lg p-6 shadow-xl flex flex-col items-center">
          <h3 className="font-mono text-sm text-[#8B949E] mb-6 self-start w-full border-b border-[#30363D] pb-2 flex items-center justify-between">
            <span>Repository Branch Graph</span>
            <span className="text-[#3FB950] font-semibold text-xs">active branches</span>
          </h3>

          <div className="relative w-full flex justify-center py-2 select-none">
            {/* SVG Git Branch Tree */}
            <svg 
              ref={svgRef} 
              width="240" 
              height="300" 
              viewBox="0 0 240 300" 
              className="font-mono text-xs"
            >
              {/* Definitions for arrow markers and glows */}
              <defs>
                <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Main branch line (vertical line) */}
              <path 
                className="branch-path"
                d="M 40 20 L 40 280" 
                stroke="#8B949E" 
                strokeWidth="4" 
                fill="none" 
              />
              
              {/* Branch 1 splitting to Languages */}
              <path 
                className="branch-path"
                d="M 40 60 C 90 60, 90 80, 160 80" 
                stroke="#58A6FF" 
                strokeWidth="3.5" 
                fill="none" 
              />
              
              {/* Branch 2 splitting to Web Dev */}
              <path 
                className="branch-path"
                d="M 40 120 C 90 120, 90 140, 160 140" 
                stroke="#2EA44F" 
                strokeWidth="3.5" 
                fill="none" 
              />
              
              {/* Branch 3 splitting to AI/ML */}
              <path 
                className="branch-path"
                d="M 40 180 C 90 180, 90 200, 160 200" 
                stroke="#BC8CFF" 
                strokeWidth="3.5" 
                fill="none" 
              />
              
              {/* Branch 4 splitting to DevOps */}
              <path 
                className="branch-path"
                d="M 40 240 C 90 240, 90 260, 160 260" 
                stroke="#F2C744" 
                strokeWidth="3.5" 
                fill="none" 
              />

              {/* Branch commits (interactive nodes) */}
              {/* Main branch trunk commit node */}
              <circle cx="40" cy="30" r="7" fill="#8B949E" stroke="#161B22" strokeWidth="2.5" />
              
              {/* Branches commit nodes */}
              {skillBranches.branches.map((branch, idx) => {
                const cy = 80 + idx * 60;
                const isSelected = selectedBranch === branch.name;
                return (
                  <g 
                    key={branch.name} 
                    className="cursor-pointer group/node"
                    onClick={() => setSelectedBranch(branch.name)}
                  >
                    {/* Hover Glow */}
                    {isSelected && (
                      <circle 
                        cx="160" 
                        cy={cy} 
                        r="9" 
                        fill={branch.color} 
                        opacity="0.4"
                        className="animate-ping"
                      />
                    )}
                    <circle 
                      cx="160" 
                      cy={cy} 
                      r="6.5" 
                      fill={isSelected ? "#FFF" : branch.color}
                      stroke={branch.color}
                      strokeWidth="2.5"
                      className="commit-dot transition-all duration-300 group-hover/node:scale-125"
                    />
                    <text 
                      x="175" 
                      y={cy + 4} 
                      fill={isSelected ? "#FFF" : "#8B949E"} 
                      className={`text-[10px] font-bold transition-colors group-hover/node:fill-[#C9D1D9] ${isSelected ? "font-extrabold" : ""}`}
                    >
                      {branch.name.split("/")[1]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick branch selector buttons */}
          <div className="w-full mt-4 flex flex-col space-y-1.5 font-mono text-xs">
            {skillBranches.branches.map((branch) => {
              const isSelected = selectedBranch === branch.name;
              return (
                <button
                  key={branch.name}
                  onClick={() => setSelectedBranch(branch.name)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded border transition-all duration-200 text-left ${
                    isSelected 
                      ? "bg-[#21262D] border-[#30363D] text-[#FFF] shadow-md" 
                      : "border-transparent text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#21262D]/40"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: branch.color }} 
                    />
                    <span>{branch.name}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isSelected ? "transform translate-x-1" : "opacity-0"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Branch Detailed Skill Cards */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="flex items-center justify-between font-mono text-xs border-b border-[#30363D] pb-3 mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-[#8B949E]">Viewing branch:</span>
              <span className="text-[#58A6FF] font-bold px-2 py-0.5 bg-[#21262D] border border-[#30363D] rounded">
                {selectedBranch}
              </span>
            </div>
            <span className="text-[#8B949E]">
              {activeBranchDetails.skills.length} files changed
            </span>
          </div>

          {/* Skills Cards Container */}
          <div ref={detailCardRef} className="space-y-4">
            {activeBranchDetails.skills.map((skill) => (
              <div 
                key={skill.name}
                className="group border border-[#30363D] bg-[#161B22] rounded-lg p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 hover:border-l-8"
                style={{ borderLeftColor: activeBranchDetails.color }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2 sm:gap-0">
                  <h4 className="font-mono text-base font-bold text-[#F0F6FC] flex items-center space-x-2">
                    <Code className="h-4.5 w-4.5 text-[#8B949E]" />
                    <span>{skill.name}</span>
                  </h4>
                  <div className="flex items-center space-x-3 text-xs font-mono">
                    <span className="flex items-center space-x-1 text-[#F2C744] bg-[#F2C744]/5 px-2 py-0.5 rounded border border-[#F2C744]/20">
                      <Award className="h-3 w-3" />
                      <span>{skill.level}</span>
                    </span>
                    <span className="text-[#8B949E] bg-[#30363D]/50 px-2 py-0.5 rounded border border-[#30363D]/80">
                      {skill.years}
                    </span>
                  </div>
                </div>
                <p className="text-[#8B949E] text-sm leading-relaxed font-sans">
                  {skill.details}
                </p>
              </div>
            ))}
          </div>

          {/* Simulated branch merge display at bottom of card */}
          <div className="border border-[#30363D] border-dashed bg-[#0D1117] rounded-lg p-4 font-mono text-xs flex items-center justify-between text-[#8B949E]">
            <div className="flex items-center space-x-2">
              <span className="text-[#BC8CFF] font-semibold">Merge Info:</span>
              <span>This branch merges cleanly back into <span className="text-[#3FB950] font-bold">main</span>.</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#238636]/15 text-[#2ea44f] px-2 py-0.5 rounded border border-[#2ea44f]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ea44f] animate-ping" />
              <span className="font-bold text-[10px]">No Conflicts</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
