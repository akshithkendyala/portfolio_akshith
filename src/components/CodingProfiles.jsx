"use client";
import React, { useEffect, useRef, useState } from "react";
import { GitFork, Star, Globe, Shield, Trophy } from "lucide-react";
import { codingProfiles } from "../data/portfolioData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom counting component
function Counter({ value }) {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Parse target number
    const match = String(value).match(/\d+/);
    if (!match) {
      setDisplayValue(value);
      return;
    }
    const target = parseInt(match[0], 10);
    const suffix = String(value).replace(String(target), "");

    const obj = { val: 0 };
    const trigger = gsap.to(obj, {
      val: target,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%"
      },
      onUpdate: () => {
        setDisplayValue(Math.floor(obj.val) + suffix);
      }
    });

    return () => {
      trigger.kill();
    };
  }, [value]);

  return <span ref={containerRef}>{displayValue}</span>;
}

export default function CodingProfiles() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Entrance animations
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%"
          }
        }
      );
    });
  }, []);

  return (
    <section id="profiles" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Title */}
      <div className="flex items-center space-x-3 mb-10">
        <div className="bg-[#58A6FF]/10 p-2.5 rounded-full border border-[#58A6FF]/30">
          <Globe className="h-6 w-6 text-[#58A6FF]" />
        </div>
        <div>
          <span className="font-mono text-xs text-[#8B949E] uppercase tracking-wider">Remote Repositories</span>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[#F0F6FC] leading-none mt-1">
            "git remote -v"
          </h2>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {codingProfiles.map((profile, index) => {
          // Fake star and fork counts for GitHub aesthetics
          const stars = profile.stats.stars || profile.stats.solved || Math.floor(Math.random() * 50) + 10;
          const forks = profile.stats.repositories || Math.floor(Math.random() * 20) + 5;

          return (
            <a
              key={profile.id}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (cardsRef.current[index] = el)}
              className="group block border border-[#30363D] hover:border-[#58A6FF]/65 bg-[#161B22] rounded-lg shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="bg-[#21262D] px-4 py-3 border-b border-[#30363D] flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-[#8B949E]">remote</span>
                  <span className="text-[#C9D1D9] font-semibold">{profile.id}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-[#8B949E]">
                  <span className="flex items-center space-x-1 group-hover:text-[#58A6FF] transition-colors">
                    <Star className="h-3.5 w-3.5" />
                    <span>{stars}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <GitFork className="h-3.5 w-3.5" />
                    <span>{forks}</span>
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-mono text-base font-bold text-[#58A6FF] flex items-center justify-between group-hover:underline">
                    <span>{profile.name}</span>
                    <span className="text-xs font-normal text-[#8B949E] font-mono group-hover:text-[#C9D1D9]">
                      @{profile.handle}
                    </span>
                  </h3>
                  
                  {/* Stats list */}
                  <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono border-t border-[#30363D]/40 pt-3">
                    {Object.entries(profile.stats).slice(0, 4).map(([key, val]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[#8B949E] capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="text-[#F0F6FC] font-semibold text-sm">
                          <Counter value={val} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages breakdown bar */}
                <div>
                  <div className="h-1.5 w-full bg-[#30363D] rounded-full overflow-hidden flex">
                    {profile.languages.map((lang, lIdx) => (
                      <div
                        key={lIdx}
                        style={{
                          width: `${lang.percent}%`,
                          backgroundColor: lang.color
                        }}
                        className="h-full first:rounded-l-full last:rounded-r-full"
                        title={`${lang.name}: ${lang.percent}%`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                    {profile.languages.slice(0, 3).map((lang, lIdx) => (
                      <div key={lIdx} className="flex items-center space-x-1.5 text-[10px] font-mono text-[#8B949E]">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span>{lang.name}</span>
                        <span className="text-[#C9D1D9] font-medium">{lang.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity grid mapping (simulated contribution blocks) */}
                <div className="border-t border-[#30363D]/40 pt-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8B949E] mb-1.5">
                    <span>Recent contributions</span>
                    <span>More contributions</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1.5">
                    {profile.activityPattern.map((level, actIdx) => {
                      // Color shading based on activity level
                      let bgColor = "bg-[#161B22] border-[#30363D]/30";
                      if (level > 0 && level <= 3) bgColor = "bg-[#0e4429]";
                      else if (level > 3 && level <= 6) bgColor = "bg-[#006d32]";
                      else if (level > 6 && level <= 9) bgColor = "bg-[#26a641]";
                      else if (level > 9) bgColor = "bg-[#39d353]";

                      return (
                        <div
                          key={actIdx}
                          className={`w-full aspect-square rounded-sm border ${bgColor} hover:scale-125 transition-transform duration-150`}
                          title={`Contributions: ${level}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
