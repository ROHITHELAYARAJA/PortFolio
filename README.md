# Rohith E — Software Engineering Portfolio

An editorial engineering portfolio and interactive developer dashboard inspired by minimal architectural design, built for **Rohith E** (`@ROHITHELAYARAJA`).

---

## Architecture & Design

- **Layout System:** Desktop 3-column editorial grid (`325px | Flexible Main | 351px`) with vertical dashed hairline dividers, collapsing cleanly into a centered responsive layout on tablet and mobile.
- **Typography:**
  - Primary UI: **Cabinet Grotesk** (geometric grotesk via Fontshare)
  - Editorial & Display Titles: **Instrument Serif** (Google Fonts)
  - Technical & Code Values: **Geist Mono** (Google Fonts)
- **Theme Engine:** Zero-flash light and dark mode with neutral, high-contrast semantic CSS tokens (`--color-bg`, `--color-surface`, `--color-ink`, `--color-strong`, etc.) and `localStorage` persistence. Defaults to clean white mode.
- **Core Technology Stack:** React 18, TypeScript 5, Vite 6, Tailwind CSS 3.4, Framer Motion, Lucide React.

---

## Featured Systems & Projects

1. **Virtual Labs Platform:**
   - Multi-tenant cloud laboratory and continuous evaluation ecosystem engineered for 500–600 engineering students across 4 academic years and 12 core laboratories.
   - In-browser AST step runner and JVM call-stack tracing engine for Data Structures and Algorithms.
   - Spring Boot 3.3 REST API backend with Supabase PostgreSQL and Row Level Security.
   - Dedicated Case Study modal with architecture invariants and verified metrics.

2. **Blast AI Study Workspace:**
   - Document-aware study workspace parsing searchable PDFs (up to 10 MB / 80 pages), TXT, and Markdown.
   - Bounded token-budget chunking and structured generation schemas producing notes, flashcards, and quizzes.
   - AWS Bedrock in-Region model routing and S3 edge deployment.

3. **Bank Management System:**
   - 3-tier enterprise architecture (UI -> Service -> DAO -> MySQL) with BCrypt password hashing.
   - Atomic ACID transaction guarantees with explicit JDBC `commit()` and `rollback()` handling.
   - Enforced domain overdraft rules and SQL injection defense via `PreparedStatement`.

4. **Open Source Milestone — AbacusAI Bot (PR #70):**
   - Merged upstream pull request resolving Windows 8.3 short-path (`RUNNER~1`) canonicalization mismatches against agent security guardrails.
   - Visual 5-stage lifecycle flow (`BUG` -> `PATH MISMATCH` -> `NORMALIZATION FIX` -> `REGRESSION TESTS` -> `MERGED UPSTREAM ✓`).

5. **Client Deployments — Rohith Digital X:**
   - Production freelance storefronts including *Cake Lover Namakkal* (sub-0.4s load times, direct WhatsApp cart payloads) and *Anis Creation*.

6. **Interactive Command Palette (`Ctrl + K`):**
   - Accessible keyboard-driven search dialog (`role="dialog"`) with focus trapping, section navigation, project shortcuts, and action triggers.

7. **Interactive Cat Cursor Companion:**
   - Responsive sprite runner companion that moves fluidly toward the pointer and settles smoothly once reached. Respects `prefers-reduced-motion`.

---

## Local Development & Build

### Prerequisites
- Node.js >= 18
- npm >= 9

### Commands

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Compile and build for production
npm run build

# Preview the production build locally (http://localhost:4173)
npm run preview
```

---

## Security Standard
- Client-side code contains zero secrets, API tokens, or sensitive credentials.
- All external links use `rel="noreferrer"` or `rel="noopener noreferrer"`.
- Validated against strict XSS, ARIA accessibility, and Core Web Vitals standards.
