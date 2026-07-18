"use client";
import React, { useState, useEffect } from "react";

export default function TerminalBoot({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const bootSequence = [
    { text: "git init portfolio", delay: 100 },
    { text: "Initialized empty Git repository in C:/Users/akshi/OneDrive/Desktop/Akshith/Portfolio/.git/", delay: 300 },
    { text: "git remote add origin https://github.com/sai-akshith/portfolio.git", delay: 500 },
    { text: "git fetch origin", delay: 700 },
    { text: "remote: Enumerating objects: 247, done.", delay: 900 },
    { text: "remote: Counting objects: 100% (247/247), done.", delay: 1100 },
    { text: "remote: Compressing objects: 100% (180/180), done.", delay: 1300 },
    { text: "Receiving objects:  45%", delay: 1450, isProgress: true, targetProgress: 45 },
    { text: "Receiving objects:  85%", delay: 1650, isProgress: true, targetProgress: 85 },
    { text: "Receiving objects: 100% (247/247), 1.24 MiB | 4.86 MiB/s, done.", delay: 1850, targetProgress: 100 },
    { text: "Resolving deltas: 100% (112/112), done.", delay: 2050 },
    { text: "From github.com/sai-akshith/portfolio", delay: 2200 },
    { text: " * [new branch]      main     -> origin/main", delay: 2300 },
    { text: "git checkout main", delay: 2500 },
    { text: "Branch 'main' set up to track remote branch 'main' from 'origin'.", delay: 2700 },
    { text: "Already on 'main'", delay: 2800 },
    { text: "Loading profile metadata...", delay: 3000 },
    { text: "Initializing interactive Git timeline UI...", delay: 3200 },
    { text: "Repository ready. Launching portfolio...", delay: 3450 }
  ];

  useEffect(() => {
    let timers = [];
    
    // Add logs one by one based on delays
    bootSequence.forEach((step, index) => {
      let t = setTimeout(() => {
        setLogs(prev => [...prev, step.text]);
        if (step.targetProgress) {
          setProgress(step.targetProgress);
        } else {
          // Increment progress slightly for standard log entries
          setProgress(prev => Math.min(prev + 4, 95));
        }

        // Check if last step
        if (index === bootSequence.length - 1) {
          setProgress(100);
          // Small delay before fading
          let fadeTimer = setTimeout(() => {
            setIsFading(true);
            let completeTimer = setTimeout(() => {
              onComplete();
            }, 600); // match transition duration
            timers.push(completeTimer);
          }, 500);
          timers.push(fadeTimer);
        }
      }, step.delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={`fixed inset-0 bg-[#0D1117] z-50 flex flex-col items-center justify-center font-mono p-4 transition-opacity duration-500 ease-out ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <div className="w-full max-w-3xl border border-[#30363D] bg-[#161B22] rounded-lg shadow-2xl overflow-hidden flex flex-col h-[480px]">
        {/* Terminal Header */}
        <div className="bg-[#21262D] px-4 py-3 flex items-center border-b border-[#30363D]">
          <div className="flex space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-[#8B949E] text-xs mx-auto pr-6 font-semibold select-none">
            sai-akshith@ubuntu: ~/portfolio
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 flex-1 overflow-y-auto text-sm space-y-2 text-[#C9D1D9] flex flex-col justify-end">
          <div className="space-y-1.5 overflow-y-auto max-h-[340px] pr-2">
            {logs.map((log, index) => {
              const isCommand = log.startsWith("git ");
              return (
                <div key={index} className="leading-relaxed break-all">
                  {isCommand ? (
                    <span>
                      <span className="text-[#3FB950]">sai-akshith@ubuntu:~/portfolio$</span>{" "}
                      <span className="text-[#58A6FF]">{log}</span>
                    </span>
                  ) : (
                    <span className={log.includes("ready") ? "text-[#3FB950] font-bold" : "text-[#8B949E]"}>
                      {log}
                    </span>
                  )}
                </div>
              );
            })}
            {logs.length < bootSequence.length && (
              <div className="flex items-center">
                <span className="text-[#3FB950]">sai-akshith@ubuntu:~/portfolio$</span>
                <span className="terminal-cursor" />
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar Footer */}
        <div className="bg-[#0D1117] border-t border-[#30363D] px-6 py-4 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-3 w-full sm:w-2/3">
            <span className="text-xs text-[#8B949E] font-semibold min-w-[36px]">
              {progress}%
            </span>
            <div className="flex-1 bg-[#30363D] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#2EA44F] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_#3FB950]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-[#8B949E] uppercase tracking-wider font-semibold">
            {progress === 100 ? "Sync Completed" : "Downloading Repository..."}
          </span>
        </div>
      </div>
    </div>
  );
}
