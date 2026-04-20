import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  LayoutDashboard,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
// import { PartnerRoomTracker } from './PartnerRoomTracker';

// Slides (stub components for now, will create files next)
import { SlideTitle } from './slides/SlideTitle';
import { SlideEngagementModel } from './slides/SlideEngagementModel';
import { SlideReplacement } from './slides/SlideReplacement';
import { SlideRollout } from './slides/SlideRollout';
import { SlidePhase0 } from './slides/SlidePhase0';
import { SlidePhase1 } from './slides/SlidePhase1';
import { SlidePhase2 } from './slides/SlidePhase2';
import { SlideMigration } from './slides/SlideMigration';
import { SlideWiki } from './slides/SlideWiki';
import { SlideRateCard } from './slides/SlideRateCard';
import { SlideInfrastructure } from './slides/SlideInfrastructure';
// import { SlideManagedServices } from './slides/SlideManagedServices';
import { SlideChecklist } from './slides/SlideChecklist';

const SLIDES = [
  { id: 'title', title: 'Introduction', component: SlideTitle },
  { id: 'model', title: 'How We Work', component: SlideEngagementModel },
  { id: 'replacement', title: 'What You\'re Replacing', component: SlideReplacement },
  { id: 'rollout', title: 'Scope & Rollout', component: SlideRollout },
  { id: 'phase0', title: 'Phase 0 Details', component: SlidePhase0 },
  { id: 'phase1', title: 'Phase 1 Details', component: SlidePhase1 },
  { id: 'phase2', title: 'Phase 2 Details', component: SlidePhase2 },
  { id: 'migration', title: 'AI Migration Engine', component: SlideMigration },
  { id: 'wiki', title: 'Wiki & AI Assistant', component: SlideWiki },
  { id: 'rates', title: 'Rate Card', component: SlideRateCard },
  { id: 'infra', title: 'Infrastructure', component: SlideInfrastructure },
//  { id: 'msp', title: 'Managed Services', component: SlideManagedServices },
  { id: 'discovery', title: 'Discovery Checklist', component: SlideChecklist },
];

export function ProposalView() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide(s => s + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(s => s - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const CurrentSlideComponent = SLIDES[currentSlide].component;

  return (
    <div className="min-h-screen bg-deep-earth text-white font-sans overflow-hidden flex flex-col selection:bg-stone-amber/30 selection:text-stone-amber">
      {/* Top bar */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-deep-earth/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <svg viewBox="0 0 64 64" fill="none" className="w-6 h-6 text-white group-hover:text-stone-amber transition-colors">
              <path d="M4 36 L32 8 L60 36" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-bold tracking-tight hidden md:block">GableX<span className="text-stone-amber font-light">Hardscape</span></span>
          </Link>
          <div className="h-4 w-px bg-white/10 hidden md:block" />
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setTocOpen(!tocOpen)}
              className="px-3 py-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all flex items-center gap-2 border border-transparent hover:border-white/5"
            >
              <Menu size={16} />
              <span className="text-sm font-medium">{SLIDES[currentSlide].title}</span>
            </button>
            <span className="text-[10px] text-zinc-600 font-mono mt-0.5">{currentSlide + 1} / {SLIDES.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Partner Room Insights moved to standalone discovery page */}
          
          <Link to="/erp" className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors title='Switch to ERP Demo'">
            <LayoutDashboard size={18} />
          </Link>
        </div>
      </header>

      {/* Main Slide Area */}
      <main className="flex-1 relative flex items-center justify-center p-6 md:p-12 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-stone-amber/5 rounded-full blur-[180px] pointer-events-none" />
        
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: dir > 0 ? 500 : -500, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: dir > 0 ? -500 : 500, opacity: 0 })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full h-full max-w-6xl flex items-center justify-center"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-between px-4 pointer-events-none">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={cn(
              "p-4 rounded-full bg-slate-warm/50 border border-white/5 text-white/50 hover:text-white hover:bg-slate-warm/80 transition-all pointer-events-auto",
              currentSlide === 0 && "opacity-0 pointer-events-none"
            )}
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === SLIDES.length - 1}
            className={cn(
              "p-4 rounded-full bg-slate-warm/50 border border-white/5 text-white/50 hover:text-white hover:bg-slate-warm/80 transition-all pointer-events-auto",
              currentSlide === SLIDES.length - 1 && "opacity-0 pointer-events-none"
            )}
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 p-1 bg-white/5 rounded-full border border-white/5 max-w-xs w-full">
          {SLIDES.map((slide, i) => (
            <div 
              key={slide.id}
              onClick={() => {
                setDirection(i > currentSlide ? 1 : -1);
                setCurrentSlide(i);
              }}
              className={cn(
                "h-1 rounded-full flex-1 transition-all cursor-pointer",
                i === currentSlide ? "bg-stone-amber shadow-glow" : "bg-white/10 hover:bg-white/20"
              )}
            />
          ))}
        </div>
      </main>

      {/* Table of Contents Popup */}
      <AnimatePresence>
        {tocOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTocOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="fixed top-20 left-6 w-72 bg-slate-warm border border-white/10 rounded-2xl shadow-elevation-3 z-[110] overflow-hidden"
            >
              <div className="p-4 bg-deep-earth/50 border-b border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Presentation Sections</span>
                <button onClick={() => setTocOpen(false)} className="text-zinc-500 hover:text-white">
                  <X size={14} />
                </button>
              </div>
              <div className="bg-slate-warm p-2 overflow-y-auto max-h-[60vh] no-scrollbar">
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setDirection(i > currentSlide ? 1 : -1);
                      setCurrentSlide(i);
                      setTocOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between group",
                      currentSlide === i 
                        ? "bg-stone-amber text-deep-earth font-bold" 
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{i + 1}. {slide.title}</span>
                    {currentSlide === i && <ArrowRight size={14} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArrowRight({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
