"use client";
import React, { useEffect, useRef } from "react";
import { GitBranch, GitMerge, ExternalLink, Award, Code2 } from "lucide-react";
import { Github } from "./SocialIcons";

import { projects } from "../data/portfolioData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom 3D Tilt Wrapper
function TiltCard({ children, className }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation angles (degrees)
    const maxRotateX = 8;
    const maxRotateY = 8;
    
    const rotateX = ((centerY - y) / centerY) * maxRotateX;
    const rotateY = ((x - centerX) / centerX) * maxRotateY;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} transition-transform duration-200 ease-out`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    // Reveal rows on scroll
    rowsRef.current.forEach((row, index) => {
      if (!row) return;
      
      // Animate branch path drawing out
      const path = row.querySelector(".project-branch-path");
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 75%"
          }
        });
      }

      // Animate card slide in
      const card = row.querySelector(".project-card");
      gsap.fromTo(
        card,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 75%"
          }
        }
      );
    });
  }, []);

  return (
    <section id="projects" className="py-20 px-4 md:px-8 max-w-6xl mx-auto" ref={containerRef}>
      {/* Title */}
      <div className="flex items-center space-x-3 mb-16">
        <div className="bg-[#2EA44F]/10 p-2.5 rounded-full border border-[#2EA44F]/30">
          <FolderGit2Icon className="h-6 w-6 text-[#3FB950]" />
        </div>
        <div>
          <span className="font-mono text-xs text-[#8B949E] uppercase tracking-wider">Repository Showcase</span>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[#F0F6FC] leading-none mt-1">
            "git branch --list"
          </h2>
        </div>
      </div>

      {/* Projects Timeline Stack */}
      <div className="space-y-16">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            ref={el => rowsRef.current[index] = el}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Left side: Branch visual spline */}
            <div className="hidden lg:flex lg:col-span-3 h-full items-center justify-center select-none">
              <svg width="180" height="240" viewBox="0 0 180 240" className="w-full">
                {/* Main vertical trunk */}
                <line x1="40" y1="0" x2="40" y2="240" stroke="#8B949E" strokeWidth="4" />
                
                {/* Branch line split & merge */}
                <path 
                  className="project-branch-path"
                  d="M 40 40 C 120 40, 140 80, 140 120 C 140 160, 120 200, 40 200" 
                  stroke="#58A6FF" 
                  strokeWidth="3.5" 
                  fill="none" 
                />

                {/* Commit nodes */}
                {/* Trunk nodes */}
                <circle cx="40" cy="40" r="7" fill="#8B949E" stroke="#0D1117" strokeWidth="2.5" />
                <circle cx="40" cy="200" r="7" fill="#BC8CFF" stroke="#0D1117" strokeWidth="2.5" />

                {/* Feature node */}
                <circle cx="140" cy="120" r="8" fill="#3FB950" stroke="#0D1117" strokeWidth="2.5" className="animate-pulse" />
                <text x="140" y="100" fill="#3FB950" textAnchor="middle" className="text-[10px] font-mono font-bold uppercase">commit</text>
              </svg>
            </div>

            {/* Right side: Expandable Projects Card */}
            <div className="lg:col-span-9">
              <TiltCard className="project-card border border-[#30363D] hover:border-[#3FB950]/50 bg-[#161B22] rounded-lg shadow-xl overflow-hidden flex flex-col justify-between">
                
                {/* Card Header (Repository File Header) */}
                <div className="bg-[#21262D] px-5 py-4 border-b border-[#30363D] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <div className="flex items-center space-x-2 font-mono text-sm">
                    <GitBranch className="h-4.5 w-4.5 text-[#58A6FF]" />
                    <span className="text-[#8B949E]">branch:</span>
                    <span className="text-[#C9D1D9] font-bold">{project.branchName}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-mono select-none">
                    <span className="flex items-center space-x-1 text-[#3FB950] bg-[#2ea44f]/10 px-2 py-0.5 rounded border border-[#2ea44f]/20">
                      <GitMerge className="h-3.5 w-3.5" />
                      <span>Ready to Merge</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8 space-y-6">
                  
                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-sans font-bold text-[#F0F6FC] tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#8B949E] leading-relaxed mt-2.5 font-sans">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span 
                        key={tech}
                        className="flex items-center space-x-1 px-3 py-1 bg-[#30363D]/50 border border-[#30363D] text-[#C9D1D9] font-mono text-xs rounded-full"
                      >
                        <Code2 className="h-3 w-3 text-[#58A6FF]" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>

                  {/* Bullet achievements */}
                  <div className="space-y-2 border-t border-[#30363D]/50 pt-5">
                    <span className="text-xs font-mono text-[#8B949E] uppercase tracking-wider block mb-2">Key Accomplishments</span>
                    <div className="space-y-2 text-xs md:text-sm font-mono text-[#C9D1D9]">
                      {project.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start text-xs leading-relaxed text-[#3FB950] bg-[#2ea44f]/5 px-3 py-2 border border-[#2ea44f]/20 rounded">
                          <Award className="h-4 w-4 mr-2 text-[#3FB950] shrink-0" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-4 border-t border-[#30363D]/50 pt-5">
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] hover:border-[#8B949E] text-white font-mono text-xs rounded-md transition-colors shadow-sm select-none"
                    >
                      <Github className="h-4 w-4" />
                      <span>View Source</span>
                    </a>
                    {project.liveDemoUrl !== "#" && (
                      <a 
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-[#238636] hover:bg-[#2ea44f] border border-[#2ea44f] text-white font-mono text-xs rounded-md transition-colors shadow-sm select-none"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                </div>

              </TiltCard>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Temporary icon resolver
function FolderGit2Icon({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
      <circle cx="12" cy="13" r="2"/>
      <path d="M12 15v3"/>
      <path d="M10 18h4"/>
    </svg>
  );
}
