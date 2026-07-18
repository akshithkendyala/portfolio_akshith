"use client";
import React, { useState, useEffect } from "react";
import { GitBranch, User, Code2, Briefcase, FolderGit2, GraduationCap, Mail, Menu, X, Terminal } from "lucide-react";
import { developerProfile } from "../data/portfolioData";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "about", label: "About", icon: User },
    { id: "profiles", label: "Profiles", icon: Terminal },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Mail }
  ];

  useEffect(() => {
    // Detect scroll for header shadowing
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Setup IntersectionObserver for active section tracking
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // triggers when section is in middle viewport
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-40 w-full border-b transition-all duration-300 font-mono ${
        scrolled 
          ? "bg-[#161B22]/95 backdrop-blur-md border-[#30363D] shadow-lg shadow-[#0D1117]/50" 
          : "bg-[#161B22] border-[#30363D]"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo / Repository Breadcrumb */}
            <div className="flex items-center space-x-3">
              <GitBranch className="h-5 w-5 text-[#3FB950] animate-pulse" />
              <div className="flex items-center space-x-1.5 text-sm font-semibold select-none">
                <a href="#" className="text-[#58A6FF] hover:underline">
                  {developerProfile.name.toLowerCase().replace(/\s+/g, "-")}
                </a>
                <span className="text-[#8B949E]">/</span>
                <span className="text-[#C9D1D9] hover:underline">portfolio</span>
                <span className="ml-2 hidden sm:inline-block px-2 py-0.5 text-xs bg-[#21262D] text-[#8B949E] border border-[#30363D] rounded-full">
                  Public
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1 h-full items-end">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`flex items-center space-x-2 px-3.5 py-3 border-b-2 text-sm font-medium transition-colors select-none ${
                      isActive
                        ? "border-[#F78166] text-[#F0F6FC]"
                        : "border-transparent text-[#8B949E] hover:text-[#C9D1D9] hover:border-[#8B949E]/40"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-[#F78166]" : "text-[#8B949E]"}`} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#30363D]/40 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`fixed inset-0 z-30 transform transition-transform duration-300 ease-in-out lg:hidden ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#0D1117]/85 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        
        {/* Drawer Menu */}
        <div className="absolute top-16 left-0 bottom-0 w-4/5 max-w-sm bg-[#161B22] border-r border-[#30363D] flex flex-col p-6 space-y-4">
          <span className="text-[#8B949E] font-mono text-xs uppercase tracking-wider border-b border-[#30363D] pb-2">
            Repository Navigation
          </span>
          <nav className="flex flex-col space-y-2 font-mono">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#21262D] text-[#3FB950] border-l-4 border-[#3FB950]"
                      : "text-[#8B949E] hover:bg-[#30363D]/20 hover:text-[#C9D1D9]"
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${isActive ? "text-[#3FB950]" : "text-[#8B949E]"}`} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
