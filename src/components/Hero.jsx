"use client";
import React, { useState, useEffect, useRef } from "react";
import { Terminal, Copy, Check, Play } from "lucide-react";
import { developerProfile } from "../data/portfolioData";

export default function Hero() {
  const [terminalLines, setTerminalLines] = useState([]);
  const [cmdInput, setCmdInput] = useState("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);
  const terminalEndRef = useRef(null);

  const initialScript = [
    { text: "git clone https://github.com/sai-akshith/portfolio.git", delay: 400, isCommand: true },
    { text: "Cloning into 'portfolio'...", delay: 1000, isSystem: true },
    { text: "remote: Enumerating objects: 100% (247/247), done.", delay: 1500, isSystem: true },
    { text: "remote: Compressing objects: 100% (180/180), done.", delay: 1800, isSystem: true },
    { text: "Receiving objects: 100% (247/247), 1.24 MiB | 5.2 MB/s, done.", delay: 2100, isSystem: true },
    { text: "Resolving deltas: 100% (112/112), done.", delay: 2300, isSystem: true },
    { text: "cd portfolio", delay: 2800, isCommand: true },
    { text: "cat developer_profile.md", delay: 3400, isCommand: true },
    { text: `# ${developerProfile.name}`, delay: 4000, isMarkdown: true, color: "text-[#3FB950] font-bold text-lg" },
    { text: `## ${developerProfile.title}`, delay: 4400, isMarkdown: true, color: "text-[#58A6FF] font-semibold" },
    { text: `### ${developerProfile.subtitle}`, delay: 4800, isMarkdown: true, color: "text-[#BC8CFF]" },
    { text: `> ${developerProfile.bio}`, delay: 5200, isMarkdown: true, color: "text-[#8B949E] italic" },
    { text: "System online. Try running 'help' or 'git log' in the prompt below.", delay: 5800, isSystem: true, color: "text-[#F2C744] text-xs font-semibold" }
  ];

  // Auto scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLines]);

  // Handle typing script
  useEffect(() => {
    let timers = [];
    initialScript.forEach((line) => {
      let t = setTimeout(() => {
        setTerminalLines((prev) => [...prev, line]);
      }, line.delay);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Git Repository Network Animation Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Node configuration
    const nodes = [];
    const nodeCount = 35;
    const colors = ["#2EA44F", "#58A6FF", "#BC8CFF", "#8B949E"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.02 + Math.random() * 0.02
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connect nodes (Git timeline connections)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            // Dynamic opacity based on distance
            ctx.strokeStyle = `rgba(48, 54, 61, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes (Git commits)
      nodes.forEach((node) => {
        node.pulse += node.pulseSpeed;
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset glow

        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Boundary checks
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("git clone https://github.com/sai-akshith/portfolio.git");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cleanCmd = cmdInput.trim().toLowerCase();
    if (!cleanCmd) return;

    let output = [];
    const commandHeader = { text: cmdInput, isCommand: true };

    switch (cleanCmd) {
      case "help":
        output = [
          { text: "Available commands:", isSystem: true, color: "text-[#3FB950] font-semibold" },
          { text: "  help          - Display this command manual", isSystem: true },
          { text: "  ls            - List directories and profile files", isSystem: true },
          { text: "  cat <file>    - Read the contents of a profile markdown file", isSystem: true },
          { text: "  git log       - View commit history of Sai's life and career", isSystem: true },
          { text: "  git status    - Check the working tree status", isSystem: true },
          { text: "  clear         - Clear terminal console history", isSystem: true }
        ];
        break;
      case "ls":
        output = [
          { text: "total 32", isSystem: true },
          { text: "-rw-r--r--   1 akshith  staff   1.2K Jul 18 14:40 about_me.md", isSystem: true, color: "text-[#58A6FF]" },
          { text: "-rw-r--r--   1 akshith  staff   824B Jul 18 14:40 contact_info.md", isSystem: true, color: "text-[#58A6FF]" },
          { text: "-rw-r--r--   1 akshith  staff   2.4K Jul 18 14:40 developer_profile.md", isSystem: true, color: "text-[#58A6FF]" },
          { text: "drwxr-xr-x   8 akshith  staff   256B Jul 18 14:40 experiences/", isSystem: true, color: "text-[#3FB950] font-semibold" },
          { text: "drwxr-xr-x  14 akshith  staff   448B Jul 18 14:40 projects/", isSystem: true, color: "text-[#3FB950] font-semibold" }
        ];
        break;
      case "git status":
        output = [
          { text: "On branch main", isSystem: true },
          { text: "Your branch is up to date with 'origin/main'.", isSystem: true },
          { text: "nothing to commit, working tree clean", isSystem: true, color: "text-[#3FB950]" }
        ];
        break;
      case "git log":
        output = [
          { text: "commit 2f9b10a2 (HEAD -> main, origin/main)", isSystem: true, color: "text-[#F2C744]" },
          { text: "Author: Sai Akshith Kendyala <akshithkendyala@gmail.com>", isSystem: true },
          { text: "Date:   Sat Jul 18 14:40:54 2026 +0530", isSystem: true },
          { text: "    Feat: Added contact portal and interactive terminal hooks", isSystem: true, color: "text-[#C9D1D9]" },
          { text: "\ncommit e45a278d", isSystem: true, color: "text-[#F2C744]" },
          { text: "Author: Sai Akshith Kendyala <akshithkendyala@gmail.com>", isSystem: true },
          { text: "Date:   Wed Jul 15 11:20:10 2026 +0530", isSystem: true },
          { text: "    Feat: Merged feature/subscription-intelligence and feature/legal-ai branches", isSystem: true, color: "text-[#C9D1D9]" }
        ];
        break;
      case "clear":
        setTerminalLines([]);
        setCmdInput("");
        return;
      case "cat developer_profile.md":
        output = [
          { text: `# ${developerProfile.name}`, isMarkdown: true, color: "text-[#3FB950] font-bold" },
          { text: `## ${developerProfile.title}`, isMarkdown: true, color: "text-[#58A6FF] font-semibold" },
          { text: `### ${developerProfile.subtitle}`, isMarkdown: true, color: "text-[#BC8CFF]" },
          { text: `> ${developerProfile.bio}`, isMarkdown: true, color: "text-[#8B949E] italic" }
        ];
        break;
      case "cat about_me.md":
        output = [
          { text: "## About Me", isMarkdown: true, color: "text-[#3FB950] font-bold" },
          { text: "I'm a computer science graduate from VIT specialized in machine learning and scalable web backend pipelines.", isSystem: true },
          { text: "I love exploring systems-level architectures, optimizing deep learning parameters, and designing UI components.", isSystem: true }
        ];
        break;
      case "cat contact_info.md":
        output = [
          { text: "## Contact Info", isMarkdown: true, color: "text-[#3FB950] font-bold" },
          { text: `Email: ${developerProfile.email}`, isSystem: true },
          { text: `LinkedIn: ${developerProfile.linkedin}`, isSystem: true },
          { text: `GitHub: ${developerProfile.github}`, isSystem: true }
        ];
        break;
      default:
        if (cleanCmd.startsWith("cat ")) {
          output = [{ text: `cat: ${cmdInput.substring(4)}: No such file or directory. Try 'ls' to see files.`, isSystem: true, color: "text-red-400" }];
        } else {
          output = [{ text: `bash: ${cleanCmd}: command not found. Type 'help' for options.`, isSystem: true, color: "text-red-400" }];
        }
    }

    setTerminalLines((prev) => [...prev, commandHeader, ...output]);
    setCmdInput("");
  };

  const handleTerminalScroll = () => {
    // Scrolls timeline page down slightly to invite user to scroll
    const element = document.getElementById("about");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-10 px-4 md:px-8 border-b border-[#30363D]">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />
      <div className="absolute inset-0 grid-overlay z-0 opacity-40" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Quick copy clone prompt */}
        <div className="flex items-center space-x-2 bg-[#161B22] border border-[#30363D] px-3.5 py-2 rounded-lg mb-8 font-mono text-xs text-[#8B949E] shadow-lg max-w-full overflow-x-auto whitespace-nowrap">
          <span className="text-[#3FB950] font-semibold">$</span>
          <span className="text-[#C9D1D9] overflow-x-auto">git clone https://github.com/sai-akshith/portfolio.git</span>
          <button 
            onClick={copyToClipboard}
            className="p-1 hover:text-[#C9D1D9] transition-colors ml-2"
            title="Copy command"
          >
            {copied ? <Check className="h-4.5 w-4.5 text-[#3FB950]" /> : <Copy className="h-4.5 w-4.5" />}
          </button>
        </div>

        {/* Immersive Terminal Card */}
        <div className="w-full border border-[#30363D] bg-[#161B22]/95 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden flex flex-col h-[480px]">
          {/* Header */}
          <div className="bg-[#21262D] px-4 py-3 flex items-center justify-between border-b border-[#30363D]">
            <div className="flex space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#8B949E] font-mono select-none">
              <Terminal className="h-4 w-4 text-[#8B949E]" />
              <span>bash - active session</span>
            </div>
            <div className="w-12" /> {/* spacer */}
          </div>

          {/* Terminal Console Output */}
          <div className="p-5 flex-1 overflow-y-auto text-sm space-y-1.5 font-mono text-[#C9D1D9]">
            {terminalLines.map((line, index) => {
              if (line.isCommand) {
                return (
                  <div key={index} className="flex items-start">
                    <span className="text-[#3FB950] mr-2 shrink-0">sai-akshith:~$</span>
                    <span className="text-[#58A6FF] break-all">{line.text}</span>
                  </div>
                );
              }
              return (
                <div 
                  key={index} 
                  className={`leading-relaxed break-words whitespace-pre-wrap ${line.color || "text-[#8B949E]"}`}
                >
                  {line.text}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Form Input */}
          <form onSubmit={handleCommandSubmit} className="bg-[#0D1117] border-t border-[#30363D] px-4 py-3 flex items-center">
            <span className="text-[#3FB950] font-mono text-sm mr-2 shrink-0 select-none">sai-akshith:~$</span>
            <input
              type="text"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              placeholder="type 'help', 'git log' or 'git status'..."
              className="flex-1 bg-transparent text-[#58A6FF] outline-none font-mono text-sm border-none focus:ring-0 p-0"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <button
              type="submit"
              className="p-1 text-[#3FB950] hover:text-[#3FB950]/80 transition-colors shrink-0"
              title="Execute command"
            >
              <Play className="h-4 w-4 fill-current" />
            </button>
          </form>
        </div>

        {/* Scroll helper */}
        <button 
          onClick={handleTerminalScroll}
          className="mt-12 flex flex-col items-center group cursor-pointer transition-all duration-300 font-mono text-xs text-[#8B949E] hover:text-[#C9D1D9]"
        >
          <span className="mb-2 tracking-widest uppercase">Scroll to inspect repository</span>
          <div className="w-5 h-8 border border-[#30363D] rounded-full flex justify-center p-1 group-hover:border-[#3FB950]">
            <div className="w-1.5 h-1.5 bg-[#3FB950] rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
