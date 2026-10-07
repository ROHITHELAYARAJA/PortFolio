import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MobileHeader } from './components/navigation/MobileHeader';
import { DesktopSidebar } from './components/navigation/Sidebar';
import { HeroVisual } from './components/hero/HeroVisual';
import { HeroProfile } from './components/hero/HeroProfile';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { GitHubSection } from './components/github/GitHubSection';
import { OpenSourceSection } from './components/opensource/OpenSourceSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { EngineeringLabSection } from './components/lab/EngineeringLabSection';
import { WritingSection } from './components/writing/WritingSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/palette/CommandPalette';
import { CaseStudyModal } from './components/projects/CaseStudyModal';
import { ROBotCompanion } from './components/playful/ROBotCompanion';

// 21st.dev inspired scroll reveal animation wrapper
const ScrollSection: React.FC<{
  children: React.ReactNode;
  id?: string;
  className?: string;
}> = ({ children, id, className = '' }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24, filter: 'blur(3px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export const App: React.FC = () => {
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  // Modals state
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);

  // Scroll Progress (21st.dev smooth progress bar)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Sync theme changes to documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleOpenContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-bg text-body transition-colors duration-200 overflow-x-hidden">
      {/* 21st.dev Smooth Reading Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 z-[100] origin-left pointer-events-none"
      />

      {/* Mobile Top Header (on <1280px) */}
      <MobileHeader
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenContact={handleOpenContact}
      />

      {/* Main Page Layout Container: 
          Set to 100% fluid window scaling (w-full max-w-[1728px] mx-auto)
          so every development component fits cleanly without clipping or overflow */}
      <main className="relative mx-auto w-full max-w-[880px] px-4 pb-24 pt-4 sm:px-6 md:px-8 xl:w-full xl:max-w-[1600px] 2xl:max-w-[1728px] xl:px-6 2xl:px-8 xl:pt-10">
        
        {/* SECTION 1: HERO & SIDEBAR */}
        <section className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          {/* Left spacer column on desktop */}
          <div className="hidden xl:block" />

          {/* Central Hero Column */}
          <div className="xl:px-8 2xl:px-[33px]">
            {/* Looping Project Visual Banner (Hero video loop with PiP support) */}
            <HeroVisual />

            {/* Profile Avatar, Title, Social Pill, Bio, Audio Equalizer (Source of Truth API) */}
            <HeroProfile onOpenContact={handleOpenContact} />
          </div>

          {/* Right Sticky Sidebar Column on Desktop */}
          <div className="hidden xl:block xl:pl-6 2xl:pl-8">
            <DesktopSidebar
              isDark={isDark}
              onToggleTheme={toggleTheme}
              onOpenPalette={() => setIsPaletteOpen(true)}
              onOpenContact={handleOpenContact}
            />
          </div>
        </section>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        {/* SECTION 2: EXPERIENCE */}
        <ScrollSection id="experience" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          {/* Left Editorial Label */}
          <div className="xl:pr-6 xl:pt-2">
            <h2 className="font-cabinet text-[26px] font-bold tracking-[-1.5px] text-strong sm:text-[30px]">
              Experience
            </h2>
            <p className="mt-1 font-mono text-[12px] text-[#FF4D36] font-semibold hidden xl:block">
              Engineering & Systems
            </p>
          </div>

          {/* Main Experience Accordion */}
          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <ExperienceSection />
          </div>

          {/* Right Column Spacer */}
          <div className="hidden xl:block" />
        </ScrollSection>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        {/* SECTION 3: ON GITHUB */}
        <ScrollSection id="github" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          {/* Left Editorial Label */}
          <div className="xl:pr-6 xl:pt-2">
            <h2 className="font-instrument text-[36px] font-normal italic leading-tight tracking-[-0.4px] text-strong sm:text-[44px]">
              On GitHub
            </h2>
            <a
              href="https://github.com/ROHITHELAYARAJA"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-cabinet text-[15px] font-bold text-[#0EA5E9] hover:underline transition-colors"
            >
              @ROHITHELAYARAJA →
            </a>
          </div>

          {/* Main GitHub Heatmap & Repos */}
          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <GitHubSection />
          </div>

          {/* Right Column Spacer */}
          <div className="hidden xl:block" />
        </ScrollSection>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        {/* SECTION 4: OPEN SOURCE */}
        <ScrollSection id="open-source" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          {/* Left Editorial Label */}
          <div className="xl:pr-6 xl:pt-2">
            <h2 className="font-instrument text-[36px] font-normal italic leading-tight tracking-[-0.4px] text-strong sm:text-[44px]">
              Open source
            </h2>
            <p className="mt-1 font-mono text-[12px] text-[#8B5CF6] font-semibold hidden xl:block">
              Upstream Contributions
            </p>
          </div>

          {/* Main Open Source Content */}
          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <OpenSourceSection />
          </div>

          {/* Right Column Spacer */}
          <div className="hidden xl:block" />
        </ScrollSection>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        {/* SECTION 5: FEATURED PROJECTS */}
        <ScrollSection id="projects" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          {/* Left Editorial Label */}
          <div className="xl:pr-6 xl:pt-2">
            <h2 className="font-instrument text-[36px] font-normal italic leading-tight tracking-[-0.4px] text-strong sm:text-[44px]">
              Projects
            </h2>
            <p className="mt-1 font-mono text-[12px] text-[#FF4D36] font-semibold hidden xl:block">
              Flagship & Systems
            </p>
          </div>

          {/* Main Projects List */}
          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <ProjectsSection onOpenCaseStudy={(id) => setActiveCaseStudyId(id)} />
          </div>

          {/* Right Column Spacer */}
          <div className="hidden xl:block" />
        </ScrollSection>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        {/* SECTION 6: ENGINEERING LAB */}
        <ScrollSection id="engineering-lab" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          {/* Left Editorial Label */}
          <div className="xl:pr-6 xl:pt-2">
            <h2 className="font-cabinet text-[26px] font-bold tracking-[-1.5px] text-strong sm:text-[30px]">
              Engineering Lab
            </h2>
            <p className="mt-1 font-mono text-[12px] text-[#0EA5E9] font-semibold hidden xl:block">
              Explorations & Architecture
            </p>
          </div>

          {/* Main Engineering Lab Grid */}
          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <EngineeringLabSection />
          </div>

          {/* Right Column Spacer */}
          <div className="hidden xl:block" />
        </ScrollSection>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        {/* SECTION 7: WRITING */}
        <ScrollSection id="writing" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          {/* Left Editorial Label */}
          <div className="xl:pr-6 xl:pt-2">
            <h2 className="font-instrument text-[36px] font-normal italic leading-tight tracking-[-0.4px] text-strong sm:text-[44px]">
              Latest writing
            </h2>
            <p className="mt-1 font-mono text-[12px] text-[#8B5CF6] font-semibold hidden xl:block">
              Essays & Engineering Notes
            </p>
          </div>

          {/* Main Writing Content */}
          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <WritingSection />
          </div>

          {/* Right Column Spacer */}
          <div className="hidden xl:block" />
        </ScrollSection>

        <hr className="my-10 border-0 border-t border-dashed border-line" />

        {/* SECTION 8: CONTACT */}
        <ScrollSection id="contact" className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          {/* Left Editorial Label */}
          <div className="xl:pr-6 xl:pt-2">
            <h2 className="font-instrument text-[36px] font-normal italic leading-tight tracking-[-0.4px] text-strong sm:text-[44px]">
              Get in Touch
            </h2>
            <p className="mt-1 font-mono text-[12px] text-[#FF4D36] font-semibold hidden xl:block">
              Direct Channels
            </p>
          </div>

          {/* Main Contact Content */}
          <div className="mt-4 xl:mt-0 xl:px-8 2xl:px-[33px]">
            <ContactSection />
          </div>

          {/* Right Column Spacer */}
          <div className="hidden xl:block" />
        </ScrollSection>

        {/* FOOTER */}
        <div className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px] 2xl:grid-cols-[325px_minmax(0,1fr)_351px] xl:divide-x xl:divide-dashed xl:divide-line">
          <div className="hidden xl:block" />
          <div className="xl:px-8 2xl:px-[33px]">
            <Footer onOpenContact={handleOpenContact} />
          </div>
          <div className="hidden xl:block" />
        </div>
      </main>

      {/* COMMAND PALETTE (CTRL+K) */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSelectProject={(id) => setActiveCaseStudyId(id)}
        onOpenContact={handleOpenContact}
      />

      {/* DEDICATED CASE STUDY MODAL */}
      <CaseStudyModal
        projectId={activeCaseStudyId}
        onClose={() => setActiveCaseStudyId(null)}
      />

      {/* SMOOTH PLAYFUL CAT COMPANION CURSOR FOLLOWER */}
      <ROBotCompanion />

    </div>
  );
};
