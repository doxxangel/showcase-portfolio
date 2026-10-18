# DOXXANGEL STUDIOS — Showcase Portfolio & Digital Identity

[![Production Deployment](https://img.shields.io/badge/Deployment-Vercel-black?style=flat&logo=vercel)](https://your-vercel-url.vercel.app)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014%2B%20App%20Router-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-black?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Audio Engine](https://img.shields.io/badge/Audio-Tone.js-black?style=flat)](https://tonejs.github.io/)
[![License](https://img.shields.io/badge/License-MIT-black?style=flat)]()

An editorial, high-performance digital portfolio engineered as an external showcase for design engineering and front-end development internships. 

Built around a disciplined typographic pairing (*Cormorant Garamond* & *Inter*), high-contrast surface architecture (WCAG AAA), and custom front-end micro-interactions—including an elastic dynamic CSS grid, macOS-style frosted popovers, and tactile ambient Tone.js audio feedback.

---

## ⚡ Live Demos & Deployment

* **Production URL:** [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)
* **Primary Navigation:** 
  * `/` — Landing (Identity, role, selected highlight works)
  * `/archive` — Comprehensive project index with dynamic grid and monograph overlays
  * `/info` — Design engineering philosophy, competencies & timeline
  * `/contact` — Real-time availability widget, direct mail & inquiry form

---

## 🛠 Tech Stack & Architecture Rationale

| Layer | Technology | Engineering Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | Static Site Generation (SSG) for sub-second FCP (<0.8s) and automatic modern image compression (`.webp` / `.avif`). |
| **Styling** | **Tailwind CSS** | Design token synchronization, utility-first constraints, and purge-optimized production stylesheet (<15KB). |
| **Micro-Interactions** | **Tone.js & Web Audio API** | PolySynth sine synthesis providing subtle, tactile auditory feedback on component hover and dispatch. |
| **Icons** | **Lucide Icons** | Clean, lightweight SVG icon package. |
| **CI/CD & Hosting** | **GitHub & Vercel** | Automated git-driven atomic releases, pull request preview URLs, and global edge network caching. |

---

## 📁 Repository Directory Structure

```text
├── app/
│   ├── layout.tsx              # Root HTML shell, fonts & global metadata
│   ├── page.tsx                # Landing view (Hero, selected works, CTA triggers)
│   ├── archive/
│   │   └── page.tsx            # Project archive with dynamic elastic grid & modal overlays
│   ├── info/
│   │   └── page.tsx            # Biography, technical competencies & timeline
│   ├── contact/
│   │   └── page.tsx            # Availability status, timezone clock & contact form
│   └── globals.css             # Tailwind layers, custom CSS variables & keyframes
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Editorial navigation with language toggle & mobile menu
│   │   └── Footer.tsx          # System timestamp, commit hash badge & legal
│   ├── interactive/
│   │   ├── ElasticGrid.tsx     # Client-side dynamic asymmetric grid (fr-expansion)
│   │   ├── MacPopover.tsx      # Frosted glass tooltips with viewport boundary calculations
│   │   ├── AudioToggle.tsx     # Global Tone.js synthesizer toggle pill with acoustic feedback
│   │   └── StatusPulse.tsx     # Real-time Amsterdam timezone clock & status indicator
│   └── ui/
│       ├── Button.tsx          # Editorial action buttons with active micro-states
│       └── VideoCard.tsx       # Media container with frosted glass playhead
│
├── lib/
│   ├── audio.ts                # Tone.js PolySynth initialization & note pitch maps
│   ├── i18n/
│   │   ├── nl.json             # Dutch dictionary & monographs
│   │   └── en.json             # English dictionary & monographs
│   └── projects.ts             # Project metadata, archive records, and media URLs
│
├── public/
│   ├── images/                 # Project assets & photography
│   └── icons/                  # Favicons & Apple Touch Icons
│
├── .env.example                # Example environment variables
├── tailwind.config.ts          # Typography and color design tokens
├── next.config.mjs             # Media domain whitelisting & compiler config
└── package.json
```

---

## 🧩 Architectural Boundaries

To maintain high Lighthouse performance scores and avoid hydration mismatches, components are strictly split across rendering boundaries:

1. **Server Components (Default):** Static page layouts, structural grids, typography, and metadata are rendered at build time (SSG), eliminating unnecessary client-side JavaScript payloads.
2. **Client Components (`'use client'`):** Browser-dependent interactive states are isolated into modular client components:
   * **Tone.js Web Audio:** Initialized only on first user gesture.
   * **Elastic Grid:** Dynamically updates CSS fractional units (`--col-1`, `--row-1`) on hover.
   * **macOS Popovers:** Uses `getBoundingClientRect` to prevent viewport edge clipping on desktop and mobile.
   * **Contact Form:** Asynchronous form validation, character counter, and API dispatch states.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
* Node.js 18.17+ or higher
* `pnpm` (recommended), `npm`, or `yarn`

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/doxxangel-showcase.git
   cd doxxangel-showcase
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   *Add your contact endpoint or form keys inside `.env.local` if required.*

4. **Start the local development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build and lint for production:**
   ```bash
   pnpm build
   pnpm lint
   ```

---

## 🎯 Assessment Alignment (Fontys HBO-ICT / CMD)

This repository serves as tangible code evidence for the following semester Learning Outcomes:
* **LO3: Software Design and Realisation:** Implementation of clean Next.js App Router architecture, responsive CSS Grid transformations, and client/server boundary separation.
* **LO4: Professional Standard:** Adoption of semantic git commits, WCAG AAA color contrast tokens (21:1), automated Vercel CI/CD pipelines, and structured project documentation.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).