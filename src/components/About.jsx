"use client";
import React, { useEffect, useRef } from "react";
import { GitCommit, User, Calendar, MapPin, Code } from "lucide-react";
import { developerProfile } from "../data/portfolioData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const cardRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    // Scroll entrance animation
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Code blocks lines fade-in sequentially
    const codeLines = codeRef.current.querySelectorAll(".code-line");
    gsap.fromTo(
      codeLines,
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: codeRef.current,
          start: "top 75%"
        }
      }
    );
  }, []);

  const jsonSnippet = {
    name: developerProfile.name,
    role: developerProfile.title,
    focus: developerProfile.subtitle,
    stack: ["Python", "C++", "React", "PyTorch", "SQL"],
    motto: "Building products that solve real-world problems."
  };

  return (
    <section id="about" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex items-center space-x-3 mb-10">
        <div className="bg-[#2EA44F]/10 p-2.5 rounded-full border border-[#2EA44F]/30">
          <GitCommit className="h-6 w-6 text-[#3FB950] animate-pulse" />
        </div>
        <div>
          <span className="font-mono text-xs text-[#8B949E] uppercase tracking-wider">Commit 01</span>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[#F0F6FC] leading-none mt-1">
            "Initial Commit: About Me"
          </h2>
        </div>
      </div>

      <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* GitHub Styled Commit Card */}
        <div className="lg:col-span-7 border border-[#30363D] bg-[#161B22] rounded-lg shadow-xl overflow-hidden flex flex-col justify-between">
          <div className="bg-[#21262D] px-4 py-3 flex items-center justify-between border-b border-[#30363D]">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#8B949E]">
              <User className="h-4 w-4 text-[#8B949E]" />
              <span>commit_details.md</span>
            </div>
            <span className="text-[10px] font-mono bg-[#30363D] text-[#8B949E] px-2 py-0.5 rounded border border-[#8B949E]/20">
              01_init
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-6 font-sans text-[#C9D1D9] leading-relaxed text-base">
            <h3 className="text-xl font-bold text-[#F0F6FC] font-mono">
              Hi, I'm Sai Akshith
            </h3>
            <p>
              I am a dedicated Software Engineer specializing in **Artificial Intelligence** and **Full Stack Development**. 
              My programming journey started with curiosity about how algorithms could make intelligent decisions, 
              leading me to deep dive into machine learning frameworks, data processing backends, and responsive user experiences.
            </p>
            <p>
              Currently, I focus on building high-performance ML pipelines, training convolutional and transformer networks, 
              and crafting robust backend services. I love bridging the gap between theoretical AI models and production-ready applications.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#30363D] pt-6 font-mono text-xs text-[#8B949E] space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2.5">
                <MapPin className="h-4 w-4 text-[#58A6FF]" />
                <span>Hyderabad, India</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Calendar className="h-4 w-4 text-[#BC8CFF]" />
                <span>Available for roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Inspector Card */}
        <div className="lg:col-span-5 border border-[#30363D] bg-[#0D1117] rounded-lg shadow-xl overflow-hidden flex flex-col">
          <div className="bg-[#21262D] px-4 py-3 flex items-center border-b border-[#30363D] font-mono text-xs text-[#8B949E]">
            <Code className="h-4 w-4 mr-2" />
            <span>developer.json</span>
          </div>
          
          <div ref={codeRef} className="p-6 flex-1 font-mono text-xs md:text-sm bg-[#0a0a0a] overflow-auto select-none">
            <div className="code-line text-zinc-500">// Initialize profile configuration</div>
            <div className="code-line"><span className="text-[#F78166]">{`{`}</span></div>
            
            <div className="code-line pl-4">
              <span className="text-[#79C0FF]">"name"</span>: <span className="text-[#A5D6FF]">"{jsonSnippet.name}"</span>,
            </div>
            
            <div className="code-line pl-4">
              <span className="text-[#79C0FF]">"role"</span>: <span className="text-[#A5D6FF]">"{jsonSnippet.role}"</span>,
            </div>
            
            <div className="code-line pl-4">
              <span className="text-[#79C0FF]">"focus"</span>: <span className="text-[#A5D6FF]">"{jsonSnippet.focus}"</span>,
            </div>
            
            <div className="code-line pl-4">
              <span className="text-[#79C0FF]">"stack"</span>: <span className="text-[#F78166]">{`[`}</span>
            </div>
            
            {jsonSnippet.stack.map((tech, idx) => (
              <div key={idx} className="code-line pl-8 text-[#A5D6FF]">
                "{tech}"{idx < jsonSnippet.stack.length - 1 ? "," : ""}
              </div>
            ))}
            
            <div className="code-line pl-4"><span className="text-[#F78166]">{`]`}</span>,</div>
            
            <div className="code-line pl-4">
              <span className="text-[#79C0FF]">"motto"</span>: <span className="text-[#A5D6FF]">"{jsonSnippet.motto}"</span>
            </div>
            
            <div className="code-line"><span className="text-[#F78166]">{`}`}</span></div>
          </div>
        </div>

      </div>
    </section>
  );
}
