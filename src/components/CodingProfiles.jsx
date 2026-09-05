"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { GitFork, Star, Globe, RefreshCw, ExternalLink, Zap } from "lucide-react";
import { codingProfiles } from "../data/portfolioData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom counting component with GSAP
function Counter({ value }) {
  const [displayValue, setDisplayValue] = useState(value);
  const containerRef = useRef(null);

  useEffect(() => {
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
      duration: 1.2,
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
  const [profiles, setProfiles] = useState(() => {
    return codingProfiles.map(p => ({
      ...p,
      isLiveSynced: false
    }));
  });
  const [isFetching, setIsFetching] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Fetch Live Data for GitHub and LeetCode
  const syncLiveStats = useCallback(async () => {
    setIsFetching(true);
    try {
      // 1. Fetch GitHub Live Stats
      const ghPromise = (async () => {
        try {
          const [userRes, reposRes, contribRes] = await Promise.allSettled([
            fetch("https://api.github.com/users/akshithkendyala"),
            fetch("https://api.github.com/users/akshithkendyala/repos?per_page=100&sort=updated"),
            fetch("https://github-contributions-api.jogruber.de/v4/akshithkendyala?y=last")
          ]);

          let publicRepos = null;
          let followers = null;
          let stars = 0;
          let topLanguages = [];
          let liveContributions = "111+";

          if (userRes.status === "fulfilled" && userRes.value.ok) {
            const userData = await userRes.value.json();
            publicRepos = userData.public_repos;
            followers = userData.followers;
          }

          if (reposRes.status === "fulfilled" && reposRes.value.ok) {
            const repos = await reposRes.value.json();
            if (Array.isArray(repos)) {
              const langMap = {};
              let totalLangCount = 0;

              repos.forEach(repo => {
                stars += (repo.stargazers_count || 0);
                if (repo.language) {
                  langMap[repo.language] = (langMap[repo.language] || 0) + 1;
                  totalLangCount++;
                }
              });

              if (totalLangCount > 0) {
                const colorMap = {
                  Python: "#3572A5",
                  TypeScript: "#3178C6",
                  JavaScript: "#f1e05a",
                  "C++": "#f34b7d",
                  HTML: "#e34c26",
                  CSS: "#563d7c",
                  "Jupyter Notebook": "#DA5B0B"
                };
                topLanguages = Object.entries(langMap)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 4)
                  .map(([name, count]) => ({
                    name,
                    percent: Math.round((count / totalLangCount) * 100),
                    color: colorMap[name] || "#58A6FF"
                  }));
              }
            }
          }

          if (contribRes.status === "fulfilled" && contribRes.value.ok) {
            const contribData = await contribRes.value.json();
            if (contribData && contribData.total && contribData.total.lastYear !== undefined) {
              liveContributions = `${contribData.total.lastYear}+`;
            }
          }

          return {
            id: "github",
            publicRepos,
            followers,
            stars: stars > 0 ? stars : 5,
            liveContributions,
            languages: topLanguages.length > 0 ? topLanguages : null
          };
        } catch (err) {
          console.warn("GitHub live sync fallback active:", err);
          return null;
        }
      })();

      // 2. Fetch LeetCode Live Stats
      const lcPromise = (async () => {
        try {
          const res = await fetch("https://leetcode-api-faisalshohag.vercel.app/JEUlQ5Wqzu");
          if (!res.ok) throw new Error("LeetCode API unavailable");
          const data = await res.json();

          if (data && data.totalSolved !== undefined) {
            const totalSolved = data.totalSolved;
            const easy = data.easySolved ?? 56;
            const medium = data.mediumSolved ?? 47;
            const hard = data.hardSolved ?? 3;

            return {
              id: "leetcode",
              solved: `${totalSolved}+`,
              easy: `${easy}`,
              medium: `${medium}`,
              hard: `${hard}`
            };
          }
        } catch (err) {
          console.warn("LeetCode live sync fallback active:", err);
          return null;
        }
        return null;
      })();

      const [ghData, lcData] = await Promise.all([ghPromise, lcPromise]);

      setProfiles(prev =>
        prev.map(p => {
          if (p.id === "github" && ghData) {
            return {
              ...p,
              isLiveSynced: true,
              stats: {
                ...p.stats,
                repositories: ghData.publicRepos ?? p.stats.repositories,
                contributions: ghData.liveContributions ?? p.stats.contributions,
                stars: ghData.stars ?? p.stats.stars,
                followers: ghData.followers ?? p.stats.followers
              },
              languages: ghData.languages || p.languages
            };
          }

          if (p.id === "leetcode" && lcData) {
            return {
              ...p,
              isLiveSynced: true,
              stats: {
                ...p.stats,
                solved: lcData.solved,
                easy: lcData.easy,
                medium: lcData.medium,
                hard: lcData.hard
              }
            };
          }

          return p;
        })
      );

      setLastSyncTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    } catch (e) {
      console.error("Live profile sync error:", e);
    } finally {
      setIsFetching(false);
    }
  }, []);

  // Initial Sync on Mount
  useEffect(() => {
    syncLiveStats();
  }, [syncLiveStats]);

  // Entrance animations
  useEffect(() => {
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
          delay: index * 0.08,
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
      {/* Header with Live Sync Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#30363D]/60">
        <div className="flex items-center space-x-3">
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

        {/* Live Tracking Status & Sync Button */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="flex items-center space-x-2 bg-[#161B22] border border-[#30363D] px-3 py-1.5 rounded-full text-[#8B949E]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3FB950] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3FB950]" />
            </span>
            <span className="text-[#C9D1D9] font-medium">Live Tracking Active</span>
            {lastSyncTime && (
              <span className="text-[#8B949E] text-[11px] hidden sm:inline">
                ({lastSyncTime})
              </span>
            )}
          </div>

          <button
            onClick={syncLiveStats}
            disabled={isFetching}
            title="Fetch real-time stats from GitHub & LeetCode APIs"
            className="flex items-center space-x-1.5 bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] hover:border-[#58A6FF]/50 text-[#C9D1D9] hover:text-[#58A6FF] px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin text-[#58A6FF]" : ""}`} />
            <span className="text-xs">git fetch</span>
          </button>
        </div>
      </div>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile, index) => {
          // Dynamic star and fork simulation for GitHub styling
          const stars = profile.stats.stars || profile.stats.solved || Math.floor(Math.random() * 50) + 10;
          const forks = profile.stats.repositories || Math.floor(Math.random() * 20) + 5;

          return (
            <a
              key={profile.id}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (cardsRef.current[index] = el)}
              className="group block border border-[#30363D] hover:border-[#58A6FF]/70 bg-[#161B22] rounded-lg shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between relative"
            >
              {/* Card Top Remote Header */}
              <div className="bg-[#21262D] px-4 py-3 border-b border-[#30363D] flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-[#8B949E]">remote</span>
                  <span className="text-[#C9D1D9] font-semibold">{profile.id}</span>
                  {profile.isLiveSynced && (
                    <span className="inline-flex items-center text-[10px] text-[#3FB950] bg-[#3FB950]/10 px-1.5 py-0.2 rounded border border-[#3FB950]/30 ml-1">
                      <Zap className="h-2.5 w-2.5 mr-0.5 inline" />
                      Live
                    </span>
                  )}
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
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-base font-bold text-[#58A6FF] flex items-center group-hover:underline">
                      <span>{profile.name}</span>
                      <ExternalLink className="h-3.5 w-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <span className="text-xs font-normal text-[#8B949E] font-mono group-hover:text-[#C9D1D9] transition-colors">
                      @{profile.handle}
                    </span>
                  </div>

                  {/* Stats list */}
                  <div className="grid grid-cols-2 gap-4 mt-5 text-xs font-mono border-t border-[#30363D]/50 pt-4">
                    {Object.entries(profile.stats).slice(0, 4).map(([key, val]) => (
                      <div key={key} className="flex flex-col space-y-0.5">
                        <span className="text-[#8B949E] capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="text-[#F0F6FC] font-semibold text-sm">
                          <Counter value={val} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages breakdown bar */}
                <div className="border-t border-[#30363D]/40 pt-4">
                  <div className="h-2 w-full bg-[#30363D] rounded-full overflow-hidden flex">
                    {profile.languages.map((lang, lIdx) => (
                      <div
                        key={lIdx}
                        style={{
                          width: `${lang.percent}%`,
                          backgroundColor: lang.color
                        }}
                        className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500"
                        title={`${lang.name}: ${lang.percent}%`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2.5">
                    {profile.languages.slice(0, 4).map((lang, lIdx) => (
                      <div key={lIdx} className="flex items-center space-x-1.5 text-[11px] font-mono text-[#8B949E]">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span>{lang.name}</span>
                        <span className="text-[#C9D1D9] font-medium">{lang.percent}%</span>
                      </div>
                    ))}
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


