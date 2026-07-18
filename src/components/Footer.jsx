"use client";
import React from "react";
import { GitBranch, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#30363D] bg-[#161B22] py-12 px-4 md:px-8 font-mono">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-between space-y-6 md:space-y-0 md:flex-row text-xs md:text-sm">
        
        {/* Terminal git status output */}
        <div className="w-full md:w-auto bg-[#0D1117] border border-[#30363D] rounded-lg p-5 text-[#8B949E] space-y-1.5 min-w-[280px] max-w-md shadow-inner select-none">
          <div className="flex items-center text-[#C9D1D9] font-bold">
            <span className="text-[#3FB950] mr-2">$</span>
            <span>git status</span>
          </div>
          <div>On branch main</div>
          <div>Your branch is up to date with 'origin/main'.</div>
          <div className="text-[#3FB950] font-semibold">nothing to commit, working tree clean</div>
          <div className="pt-2 text-xs border-t border-[#30363D]/40 mt-2 text-[#C9D1D9]">
            Thank you for visiting my repository.
          </div>
        </div>

        {/* Brand details and copyright */}
        <div className="flex flex-col items-center md:items-end space-y-2 text-[#8B949E] text-center md:text-right">
          <div className="flex items-center space-x-1">
            <GitBranch className="h-4 w-4 text-[#F78166]" />
            <span className="font-semibold text-[#C9D1D9]">portfolio v1.0.0</span>
          </div>
          <div>
            Built with{" "}
            <Heart className="h-3.5 w-3.5 text-[#FF5F56] fill-current inline-block mx-0.5" />{" "}
            using Next.js & Tailwind CSS.
          </div>
          <div className="text-[10px] text-[#8B949E] mt-2">
            © {currentYear} Sai Akshith Kendyala. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
