# AAROH — The Art of Becoming: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic, Apple-grade luxury fragrance product launch website for **AAROH — The Art of Becoming**, featuring an interactive scroll-driven canvas sequence (240 frames), custom editorial luxury layout, interactive olfactory pyramid, craft deep-dive, and seamless responsive performance across desktop and mobile.

**Architecture:** Modern Vite + React + Tailwind CSS + GSAP ScrollTrigger + Lenis smooth scrolling stack. A high-efficiency HTML5 2D Canvas scrubbing engine with dual-tier buffering (sliding ImageBitmap decode window + eager preloader) feeds into bespoke editorial sections below the film, using Cormorant Garamond and Montserrat/Inter typography, obsidian-to-champagne gold palette, and zero AI-template visual clichés.

**Tech Stack:** React 19, Vite, GSAP 3 (ScrollTrigger), Lenis, Lucide Icons, Tailwind CSS, Python (Pillow + FFmpeg for WebP extraction).

---

### Task 1: Frame Extraction & Multi-Tier Asset Optimization
**Files:**
- Create: `scripts/extract_frames.py`
- Output: `public/frames/manifest.json`, `public/frames/frame_*.webp` (desktop 1600w & mobile 960w)
- Assets: `public/assets/images/start.webp`, `public/assets/images/end.webp`, `public/assets/images/hero_poster.webp`

- [ ] **Step 1: Write frame extraction & optimization script**
  Extract all 240 frames from `VIDEO-ANI/ANIMATED-VID.mp4` using FFmpeg and Pillow. Output WebP at quality 82, dimensions 1600x900 (contain-fit) and 960x540 (mobile tier) with manifest metadata `{ count: 240, pattern: "frames/frame_%04d.webp", aspect: "16:9" }`.
- [ ] **Step 2: Execute script & verify frames and sizes**
  Ensure total sequence payload is under 22MB across all frames, individual frames ~40-80KB.
- [ ] **Step 3: Convert START.png and END.png to optimized WebP**
  Create high-resolution showcase assets for editorial sections.

---

### Task 2: Project Scaffolding & Design System Tokens
**Files:**
- Create: `package.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`
- Create: `src/index.css` (custom design tokens, luxury typography imports, smooth scroll styles, vignette masks)
- Create: `src/types/index.ts`

- [ ] **Step 1: Initialize Vite React TypeScript app with dependencies**
  Install `gsap`, `@studio-freight/lenis` (or `lenis`), `lucide-react`, `clsx`, `tailwind-merge`.
- [ ] **Step 2: Configure fonts and luxury color tokens**
  Import Cormorant Garamond (300, 400, 500, 600) and Montserrat (300, 400, 500). Define obsidian black (`#070707`), deep charcoal (`#141210`), champagne gold (`#C6A36A`), warm ivory (`#F5EFE6`), and muted bronze (`#8B704A`).
- [ ] **Step 3: Verify build setup with `npm run build`**

---

### Task 3: Cinematic Canvas Scroll Engine (AirPods / Apple-style Scrubber)
**Files:**
- Create: `src/hooks/useFrameScrubber.ts` (sliding window ImageBitmap decoder, device memory aware)
- Create: `src/components/canvas/FilmStage.tsx`
- Create: `src/components/canvas/SceneOverlays.tsx`

- [ ] **Step 1: Implement memory-safe frame buffer hook**
  Dual-tier preloading: eager loads initial 36 frames to unblock rendering, background-streams remaining 204 frames in chunks. Decodes max 60 bitmaps in memory window around playhead to avoid mobile browser crashes.
- [ ] **Step 2: Implement Canvas renderer with contain-fit & vignette blend**
  Draws current interpolated frame with devicePixelRatio capping (max 2) and seamless radial vignette mask into obsidian background.
- [ ] **Step 3: Synchronize 6 Cinematic Story Chapters**
  - Scene 01 (0-10%): Awakening — dark void, golden particle hint, logo whisper
  - Scene 02 (10-30%): The Reveal — "An essence beyond time. An expression of identity, captured in a single drop."
  - Scene 03 (30-48%): The Liquid Soul — "Beyond the fragrance. Into the feeling."
  - Scene 04 (48-68%): The Anatomy — "Every detail has a purpose." (Cap, flacon, atomizer callouts)
  - Scene 05 (68-85%): The Transformation — "Become unforgettable."
  - Scene 06 (85-100%): The Grand Finale — "AAROH — THE ART OF BECOMING. Not made to be seen. Made to be remembered." CTA "DISCOVER THE FRAGRANCE".

---

### Task 4: Minimal Luxury Editorial Navigation & Loader
**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Loader.tsx`
- Create: `src/components/layout/MobileDrawer.tsx`

- [ ] **Step 1: Build progressive loader with brass hairline progress bar**
  Clean editorial intro with letter-spaced "AAROH", progress percentage, and smooth fade-out.
- [ ] **Step 2: Build floating glass navbar**
  Transparent over dark scroll hero, blurs into luxury frosted dark backdrop (`backdrop-blur-md bg-black/60 border-b border-white/5`) upon reaching editorial sections. Contains brand mark, navigational anchors (The Fragrance, Philosophy, Notes, Craft, Acquisition), and sound toggle.
- [ ] **Step 3: Build responsive mobile drawer**
  Full-screen editorial menu with staggered typography reveal.

---

### Task 5: Editorial Brand Sections (Unslop & Hallmark Refined)
**Files:**
- Create: `src/components/sections/PhilosophySection.tsx`
- Create: `src/components/sections/FragranceNotesSection.tsx`
- Create: `src/components/sections/CraftAnatomySection.tsx`
- Create: `src/components/sections/ProductShowcaseSection.tsx`
- Create: `src/components/sections/EditorialFooter.tsx`

- [ ] **Step 1: Philosophy Section**
  Asymmetrical split layout: "Some fragrances are worn. Others are remembered." with high-fashion typography, deep narrative rhythm, and delicate gold accents.
- [ ] **Step 2: Interactive Olfactory Pyramid (Fragrance Notes)**
  Editorial interactive selector for Opening (Bergamot & Saffron), Heart (Rose & Amber), and Base (Sandalwood & Musk) with olfactory accord descriptions and smooth tab transitions.
- [ ] **Step 3: Craft & Anatomy Showcase**
  Detailed visual exploration using `START.png` and `END.png` high-res crops highlighting crystal hand-blown glass, machined flacon cap, and custom micro-atomizer.
- [ ] **Step 4: Product Showcase (AAROH No. 01)**
  Curated product presentation card with edition details, extraction method, sizing, and VIP allocation discovery modal.
- [ ] **Step 5: Luxury Editorial Footer**
  Minimalist footer with legal, brand manifesto mark, newsletter reservation, and subtle copyright.

---

### Task 6: Motion Polish, Lenis Smooth Scroll & Adaptive Performance
**Files:**
- Modify: `src/App.tsx`
- Create: `src/components/ui/SmoothScrollProvider.tsx`
- Create: `src/utils/performance.ts` (low-end device detection, reduced motion support)

- [ ] **Step 1: Integrate Lenis smooth scrolling with GSAP ticker**
- [ ] **Step 2: Add `prefers-reduced-motion` compliance**
  Graceful fallback to step-by-step editorial presentation if motion is disabled or on severely throttled devices.
- [ ] **Step 3: Test responsive layouts across 375px, 768px, 1024px, 1440px, 2560px**

---

### Task 7: End-to-End Verification & Browser Quality Control
- [ ] **Step 1: Run production build `npm run build` and start preview server**
- [ ] **Step 2: Test complete scroll story from 0% to 100% in browser**
- [ ] **Step 3: Verify all interactions, typography rendering, mobile layouts, and zero console errors**
