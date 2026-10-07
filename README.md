# Rohith E — Software Engineering Portfolio

An editorial engineering portfolio and interactive developer dashboard inspired by minimal architectural publications, built for **Rohith E** (`@ROHITHELAYARAJA`).

---

## 🏛️ System Architecture

- **Layout System:** Desktop 3-column editorial grid (`325px | Flexible Main | 351px`) with vertical dashed hairline dividers, collapsing cleanly into a centered responsive layout on tablet and mobile.
- **Typography:**
  - Primary UI: **Cabinet Grotesk** (geometric grotesk via Fontshare CDN)
  - Editorial & Display Titles: **Instrument Serif** (Google Fonts)
  - Technical & Code Values: **Geist Mono** (Google Fonts)
- **Theme Engine:** Zero-flash light and dark mode with neutral, high-contrast semantic CSS tokens (`--color-bg`, `--color-surface`, `--color-ink`, `--color-strong`, etc.) and `localStorage` persistence.
- **Core Technology Stack:** React 18, TypeScript 5, Vite 6, Tailwind CSS 3.4, Framer Motion, Lucide React.

---

## 🚀 Key Features

1. **Flagship Project 01 — Virtual Labs Platform:**
   - Multi-tenant cloud laboratory and continuous evaluation ecosystem engineered for 500–600 engineering students across 4 academic years and 12 core laboratories.
   - In-browser AST step runner and JVM call-stack tracing engine for Data Structures and Algorithms.
   - Spring Boot 3.3 REST API backend with dual Supabase JWT and Firebase Admin token authentication filters.
   - Dedicated Case Study modal with architecture invariants and verified metrics.

2. **AI Application 02 — Blast AI Study Workspace:**
   - Document-aware study workspace parsing searchable PDFs (up to 10 MB / 80 pages), TXT, and Markdown.
   - Bounded token-budget chunking and structured generation schemas producing notes, flashcards, and quizzes.
   - AWS Bedrock in-Region model routing and S3 edge deployment.

3. **Backend System 03 — Bank Management System:**
   - 3-tier enterprise architecture (UI → Service → DAO → MySQL) with BCrypt password hashing.
   - Atomic ACID transaction guarantees with explicit JDBC `commit()` and `rollback()` handling.
   - Enforced domain overdraft rules and SQL injection defense via `PreparedStatement`.

4. **Open Source Milestone — AbacusAI Bot (PR #70):**
   - Merged upstream pull request resolving Windows 8.3 short-path (`RUNNER~1`) canonicalization mismatches against agent security guardrails.
   - Visual 5-stage lifecycle flow (`BUG` → `PATH MISMATCH` → `NORMALIZATION FIX` → `REGRESSION TESTS` → `MERGED UPSTREAM ✓`).

5. **Client Deployments — Rohith Digital X:**
   - Production freelance storefronts including *Cake Lover Namakkal* (sub-0.4s load times, direct WhatsApp cart payloads) and *Anis Creation*.

6. **Interactive Command Palette (`Ctrl + K`):**
   - Accessible keyboard-driven search dialog (`role="dialog"`) with focus trapping, section navigation, project shortcuts, and action triggers.

7. **Engineering Lab:**
   - 4:3 architectural thumbnails for runtime simulators, database schemas, and AI chunking pipelines with an accessible Lightbox modal (keyboard `←`, `→`, and `Esc`).

8. **Playful Engineering Layer:**
   - **RO-Bot:** Original tiny pixel AI robot companion that smoothly glides toward the cursor with context-sensitive reactions (GitHub branch icon, AI visor glow, Java coffee cup, Open Source wrench) and snooze states. Automatically disabled on touch screens and respects `prefers-reduced-motion`.
   - **Bug Hunter:** Interactive QA mini-game near the footer supporting click and keyboard (`Space`) bug squashing with live regression counters and build verification feedback.

---

## 🛠️ Local Development & Build

### Prerequisites
- Node.js >= 18 (Tested on Node.js v24.13.1)
- npm >= 9

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (http://localhost:3000)
npm run dev

# 3. Compile and build for production
npm run build

# 4. Preview the production build locally (http://localhost:4173)
npm run preview
```

---

## 🔒 Security & Privacy Standard
- Client-side code contains zero secrets, API tokens, or sensitive credentials.
- All external links use `rel="noopener noreferrer"`.
- Validated against strict XSS, ARIA accessibility, and Core Web Vitals standards.
