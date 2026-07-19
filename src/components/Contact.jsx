"use client";
import React, { useState, useEffect, useRef } from "react";
import { Mail, FileDown, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Github, Linkedin } from "./SocialIcons";

import { developerProfile } from "../data/portfolioData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [pushLogs, setPushLogs] = useState([]);
  const [isPushing, setIsPushing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Entrance animations
    gsap.fromTo(
      containerRef.current.querySelector(".contact-cards"),
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%"
        }
      }
    );

    gsap.fromTo(
      containerRef.current.querySelector(".contact-form-card"),
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%"
        }
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const executePushSequence = async () => {
    setIsPushing(true);
    setPushLogs([]);
    setHasError(false);

    const logSteps = [
      { text: "git push origin main", delay: 100 },
      { text: "Enumerating objects: 5, done.", delay: 500 },
      { text: "Counting objects: 100% (5/5), done.", delay: 900 },
      { text: "Delta compression using up to 8 threads", delay: 1200 },
      { text: "Compressing objects: 100% (3/3), done.", delay: 1500 },
      { text: "Writing objects: 100% (5/5), 485 bytes | 485.00 KiB/s, done.", delay: 1800 },
      { text: "Total 5 (delta 2), reused 0 (delta 0), pack-reused 0", delay: 2100 },
      { text: "To https://github.com/sai-akshith/portfolio.git", delay: 2400 },
      { text: "   2f9b10a2..7c93fa88  main -> main", delay: 2700 },
      { text: "Branch 'main' set up to track remote branch 'main' from 'origin'.", delay: 2900 },
      { text: "Done. Push complete. Message sent successfully!", delay: 3100, isSuccess: true }
    ];

    for (const step of logSteps) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setPushLogs((prev) => [...prev, step.text]);
          resolve();
        }, step.delay - (logSteps[logSteps.indexOf(step) - 1]?.delay || 0));
      });
    }

    // Trigger Confetti dynamically on client side
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#2ea44f", "#3fb950", "#58a6ff", "#bc8cff"]
      });
    } catch (err) {
      console.log("Confetti load failed", err);
    }

    setIsCompleted(true);
    setIsPushing(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setHasError(true);
      return;
    }
    executePushSequence();
  };

  const contactLinks = [
    { name: "Email", icon: Mail, label: developerProfile.email, url: `https://mail.google.com/mail/?view=cm&fs=1&to=${developerProfile.email}`, color: "text-[#3FB950] bg-[#2ea44f]/5 border-[#2ea44f]/20 hover:border-[#3fb950]/50" },
    { name: "LinkedIn", icon: Linkedin, label: "sai-akshith-kendyala", url: developerProfile.linkedin, color: "text-[#58A6FF] bg-[#58a6ff]/5 border-[#58a6ff]/20 hover:border-[#58a6ff]/50" },
    { name: "GitHub", icon: Github, label: "sai-akshith", url: developerProfile.github, color: "text-[#BC8CFF] bg-[#bc8cff]/5 border-[#bc8cff]/20 hover:border-[#bc8cff]/50" },
    { name: "Location", icon: MapPin, label: developerProfile.location, url: "#", color: "text-[#F2C744] bg-[#f2c744]/5 border-[#f2c744]/20 cursor-default" },
    { name: "Resume", icon: FileDown, label: "Download Resume.pdf", url: developerProfile.resumeUrl, color: "text-white bg-[#30363D]/40 border-[#30363D] hover:border-[#8b949e]/50" }
  ];

  return (
    <section id="contact" className="py-20 px-4 md:px-8 max-w-6xl mx-auto" ref={containerRef}>
      {/* Title */}
      <div className="flex items-center space-x-3 mb-16">
        <div className="bg-[#58a6ff]/10 p-2.5 rounded-full border border-[#58a6ff]/30">
          <Send className="h-6 w-6 text-[#58A6FF]" />
        </div>
        <div>
          <span className="font-mono text-xs text-[#8B949E] uppercase tracking-wider">Deploy Portal</span>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[#F0F6FC] leading-none mt-1">
            "git push origin main"
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Info Links */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 contact-cards">
          <div className="border border-[#30363D] bg-[#161B22] rounded-lg p-6 shadow-xl flex-1 flex flex-col justify-center space-y-4">
            <h3 className="font-mono text-sm text-[#8B949E] border-b border-[#30363D] pb-3 mb-2 flex items-center justify-between">
              <span>Remote Remotes</span>
              <span className="text-[#3FB950] font-semibold text-xs">active link paths</span>
            </h3>

            <div className="space-y-3 font-mono text-xs md:text-sm">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                const isLink = link.url !== "#";
                const Comp = isLink ? "a" : "div";

                return (
                  <Comp
                    key={link.name}
                    href={isLink ? link.url : undefined}
                    target={isLink ? "_blank" : undefined}
                    rel={isLink ? "noopener noreferrer" : undefined}
                    className={`flex items-center space-x-3 p-3.5 border rounded-lg transition-all duration-300 ${link.color}`}
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-[#8B949E] font-medium uppercase tracking-wider">
                        {link.name}
                      </div>
                      <div className="text-[#C9D1D9] truncate font-semibold">
                        {link.label}
                      </div>
                    </div>
                  </Comp>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Push Form */}
        <div className="lg:col-span-7 contact-form-card">
          <div className="border border-[#30363D] bg-[#161B22] rounded-lg shadow-xl overflow-hidden flex flex-col justify-between h-full">
            
            {/* Header */}
            <div className="bg-[#21262D] px-5 py-4 border-b border-[#30363D] flex items-center justify-between font-mono text-xs text-[#8B949E]">
              <span>deployment_form.sh</span>
              <span className="text-[#8B949E] bg-[#30363D] px-2 py-0.5 rounded border border-[#8B949E]/10">
                akshithkendyala.github.io
              </span>
            </div>

            {/* Form / Log sequence body */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
              {!isPushing && !isCompleted ? (
                // Standard contact form
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {hasError && (
                    <div className="flex items-center space-x-2 text-xs font-mono bg-red-950/20 border border-red-800 text-red-400 p-3 rounded-md">
                      <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                      <span>Validation Error: Please fill in name, email, and message.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 font-mono text-xs">
                      <label htmlFor="name" className="text-[#8B949E] font-semibold">COMMIT_AUTHOR</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="w-full bg-[#0D1117] border border-[#30363D] focus:border-[#3FB950] outline-none px-4 py-2.5 rounded text-sm text-[#C9D1D9]"
                        autoComplete="name"
                      />
                    </div>
                    <div className="space-y-1.5 font-mono text-xs">
                      <label htmlFor="email" className="text-[#8B949E] font-semibold">AUTHOR_EMAIL</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full bg-[#0D1117] border border-[#30363D] focus:border-[#3FB950] outline-none px-4 py-2.5 rounded text-sm text-[#C9D1D9]"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs">
                    <label htmlFor="message" className="text-[#8B949E] font-semibold">COMMIT_MESSAGE</label>
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Commit your message details here..."
                      className="w-full bg-[#0D1117] border border-[#30363D] focus:border-[#3FB950] outline-none px-4 py-2.5 rounded text-sm text-[#C9D1D9] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-[#238636] hover:bg-[#2ea44f] border border-[#2ea44f] hover:border-[#3fb950] text-white px-5 py-3 rounded-lg font-mono text-sm font-bold shadow-md transition-all duration-200 cursor-pointer select-none"
                  >
                    <Send className="h-4 w-4" />
                    <span>git push origin main</span>
                  </button>
                </form>
              ) : (
                // Git Push Log Output Sequence
                <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-5 font-mono text-xs md:text-sm h-[260px] overflow-y-auto flex flex-col justify-end space-y-1.5 select-none">
                  {pushLogs.map((log, index) => {
                    const isSuccess = log.includes("Done.") || log.includes("Push complete");
                    return (
                      <div 
                        key={index}
                        className={isSuccess ? "text-[#3FB950] font-bold" : "text-[#8B949E]"}
                      >
                        {log.startsWith("git ") ? (
                          <span>
                            <span className="text-[#3FB950] font-bold">$ </span>
                            {log}
                          </span>
                        ) : (
                          log
                        )}
                      </div>
                    );
                  })}
                  {isPushing && (
                    <div className="flex items-center text-xs text-[#8B949E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#58A6FF] animate-ping mr-2" />
                      <span>Writing socket buffer...</span>
                    </div>
                  )}

                  {isCompleted && (
                    <button
                      onClick={() => setIsCompleted(false)}
                      className="mt-4 self-start flex items-center space-x-1.5 px-3 py-1.5 bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-[#8B949E] hover:text-[#C9D1D9] rounded transition-colors text-xs font-semibold"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#3FB950]" />
                      <span>Write another message</span>
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
