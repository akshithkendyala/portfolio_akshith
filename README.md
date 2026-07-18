# Immersive Git Timeline Portfolio 🚀

A highly interactive, cinematic, and animation-rich single-page developer portfolio designed around a **Git Repository** concept. Every section represents a commit, branches signify skills or projects, and remote directories depict external profiles.

Live local instance running at: **[http://localhost:3000](http://localhost:3000)**

---

## 🎨 Design Concept & Implemented Features

*   **Terminal Boot Loader**: Plays an initial Git clone sequence typing out logs and matching progress lines before fading out.
*   **Interactive Git Bash Hero Shell**: A mockup terminal where visitors can actually type bash commands (like `ls`, `help`, `git log`, `git status`, or reading individual files with `cat about_me.md`). 
*   **Particle Network Canvas**: Rendered in the background of the hero section, drawing and pulsing connections dynamically like a repository commit graph.
*   **GitHub-styled Navigation Bar**: Smooth scroll anchors that highlight automatically depending on which section is currently active in the viewport.
*   **Coding Platform Remotes**: Renders profile cards (GitHub, LeetCode, CodeChef, etc.) with custom hover states, language ratios, and live commit grid heatmaps.
*   **Interactive SVG Branching Tree**: Displays categories of tools as branching paths splitting off a main Git line. Selecting a branch reveals detailed experience cards.
*   **Merge Commits (Experience)**: Internships, open-source work, and hackathons are listed as branches merging back into `main` with insertion changes formatted as git code lines (`+`).
*   **Feature Branches (Projects)**: Features high-performance mouse-responsive 3D tilt cards, showing tags, achievements, and deploy buttons.
*   **Release version drops (Education)**: Visualizes educational milestones as version tags (`v1.0` - `v4.0`) that drop down on scroll with bounce easing.
*   **Confetti Push Deployment**: Submission triggers a terminal push log (`git push origin main`) that shoots confetti particles upon success.
*   **Git Status Footer**: A final terminal showing working tree clean status.

---

## 🛠️ Technology Stack

*   **Frontend Framework**: Next.js 16 (App Router) + React 19
*   **Styles & Theme**: Tailwind CSS v4 (incorporating custom GitHub Dark tokens)
*   **Animations**: GSAP 3 (ScrollTrigger, Tween)
*   **Icons**: Lucide React + custom inline SVG brand logos
*   **Interactions**: Canvas 2D API (Background Network), HTML5 Form Action, Canvas-Confetti

---

## 📁 File Structure

```
├── app/
│   ├── globals.css      # Core styles, custom animations, GitHub dark theme variables
│   ├── layout.js        # HTML wrapper, font configurations, tab metadata
│   └── page.js          # Boot orchestrator and section coordinates
├── src/
│   ├── components/      # React interface modules (Navbar, Hero, Skills, etc.)
│   │   ├── SocialIcons.jsx # Custom SVG wrappers for Github and Linkedin
│   │   └── ...
│   └── data/
│       └── portfolioData.js # Configurable single source of truth for text data
```

---

## 🚀 Getting Started

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### 3. Build & Run Optimized Production
Compile optimization bundles:
```bash
npm run build
```
Run the compiled server locally:
```bash
npm run start
```

---

## ⚙️ Customization

To swap in your own details, open **`src/data/portfolioData.js`** and modify the JSON export structures.
You can easily edit:
*   Your biography, location, and social URLs.
*   Profile handles and metrics (stars, solved items) for LeetCode, HackerRank, etc.
*   Skills lists (names, proficiency levels, and durations).
*   Experience details and achievements.
*   Project repositories, live links, and tech stacks.

