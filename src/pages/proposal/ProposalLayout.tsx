import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  LayoutDashboard,
  X,
  Share2,
  Check,
  Presentation,
  Keyboard,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
// import { PartnerRoomTracker } from './PartnerRoomTracker';

// Slides (stub components for now, will create files next)
import { SlideTitle } from './slides/SlideTitle';
import { SlideEngagementModel } from './slides/SlideEngagementModel';
import { SlideReplacement } from './slides/SlideReplacement';
import { SlideCustomizationScope } from './slides/SlideCustomizationScope';
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
import { SlideNextSteps } from './slides/SlideNextSteps';

interface SlideMeta {
  id: string;
  title: string;
  component: React.ComponentType;
  notes: string[];
}

const SLIDES: SlideMeta[] = [
  {
    id: 'title',
    title: 'Introduction',
    component: SlideTitle,
    notes: [
      'Open: who we are (FutureBuild AI / GableLBM) and why a fork makes sense for Reed.',
      'Anchor: this is a strategic partnership, not a SaaS purchase. Reed owns the source.',
      'Set expectation: 12 short slides. We close on Phase 0 today, not Phase 1.',
    ],
  },
  {
    id: 'model',
    title: 'How We Work',
    component: SlideEngagementModel,
    notes: [
      'Three phases: 0 (discovery, $500), 1 (build, ~$23K), 2 (post-launch growth).',
      'Each phase has its own go/no-go. Reed is never on the hook for the next phase until the prior one delivers.',
    ],
  },
  {
    id: 'replacement',
    title: 'What You\'re Replacing',
    component: SlideReplacement,
    notes: [
      'BisTrack (yard) + Great Plains (books) = two systems, manual sync, double entry.',
      'GableLBM collapses both into one data model. Reconciliation step disappears entirely.',
      'No per-seat licensing. Reed owns the source forever.',
    ],
  },
  {
    id: 'scope',
    title: 'Customization Scope',
    component: SlideCustomizationScope,
    notes: [
      'Nine operational buckets we will customize from GableLBM main.',
      'Phase 0 locks the per-bucket scope using the included 10 Sr Architect hours.',
      'Note QB parallel execution + long-term native QB embedding plan.',
    ],
  },
  {
    id: 'rollout',
    title: 'Scope & Rollout',
    component: SlideRollout,
    notes: [
      'Phase 0 is pre-project; the 3-month build clock starts at Phase 0 sign-off.',
      'Month 4 is optional hypercare buffer.',
      'No big-bang cutover — UAT and parallel validation precede every step.',
    ],
  },
  {
    id: 'phase0',
    title: 'Phase 0 Details',
    component: SlidePhase0,
    notes: [
      'Phase 0 = $500 (covers $250 setup + 30 days dev/staging infra).',
      '10 free Sr Architect hours included ($2,250 value) — sufficient to fully scope Phase 1.',
      'If Reed proceeds, Phase 0 cost rolls into Phase 1.',
    ],
  },
  {
    id: 'phase1',
    title: 'Phase 1 Details',
    component: SlidePhase1,
    notes: [
      'Fixed-price build phase. 50/30/20 milestone billing.',
      'Includes 3-day onsite at McKees Rocks for cutover + hands-on training.',
    ],
  },
  {
    id: 'phase2',
    title: 'Phase 2 Details',
    component: SlidePhase2,
    notes: [
      'Post-launch growth: SSO, advanced BI, RFID, Reed-driven roadmap.',
      'Quoted per scope after go-live. Reed prioritizes the queue.',
    ],
  },
  {
    id: 'migration',
    title: 'AI Migration Engine',
    component: SlideMigration,
    notes: [
      'AI-assisted migration from QuickBooks Enterprise — SKUs, customers, vendors, history.',
      'Parallel execution during transition. Long-term: embed QB functionality natively in GableLBM.',
    ],
  },
  {
    id: 'wiki',
    title: 'Wiki & AI Assistant',
    component: SlideWiki,
    notes: [
      'Knowledge base + AI assistant trained on Reed\'s specific workflows.',
      'Reduces onboarding time for new hires; captures tribal knowledge.',
    ],
  },
  {
    id: 'rates',
    title: 'Rate Card',
    component: SlideRateCard,
    notes: [
      'Total: $23,250 one-time + $250–$800/mo recurring. NTE cap $28,000.',
      'Tier 1 ($250) covers DO hosting + daily snapshots + PITR backups.',
      'Tier 2 ($800) adds 4 hrs/mo support, 99.9% SLA, quarterly upstream merges, extended retention.',
      'Founding customer terms: rate lock + 2-year onboarding waive.',
    ],
  },
  {
    id: 'infra',
    title: 'Infrastructure',
    component: SlideInfrastructure,
    notes: [
      'DigitalOcean NYC3 (compute + DB) + GCP us-east4 Virginia (AI). Low latency to McKees Rocks.',
      'Daily volume snapshots + Managed PostgreSQL PITR (7-day window) included in Tier 1.',
      'Tier 2 adds 30-day offsite to DO Spaces + RPO < 1hr / RTO < 4hr SLA.',
    ],
  },
  //  { id: 'msp', title: 'Managed Services', component: SlideManagedServices, notes: [] },
  {
    id: 'discovery',
    title: 'Discovery Checklist',
    component: SlideChecklist,
    notes: [
      'Inputs we need from Reed for Phase 0.',
      'The discovery form (link in CTA) captures these answers and saves as you type.',
    ],
  },
  {
    id: 'next',
    title: 'Next Steps',
    component: SlideNextSteps,
    notes: [
      'Close the meeting here. Today\'s decision is Phase 0 only — $500, locked plan in 2–3 weeks.',
      'Action: send Phase 0 agreement PDF this week. Book first working session.',
      'No commitment to Phase 1 until the locked plan is signed.',
    ],
  },
];

const SHARE_PASSWORD = 'HowReedWins2026';

export function ProposalView() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [presenterMode, setPresenterMode] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showNavHint, setShowNavHint] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.localStorage.getItem('reed_proposal_nav_hint_dismissed');
  });
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

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

  const dismissNavHint = useCallback(() => {
    setShowNavHint(false);
    try {
      window.localStorage.setItem('reed_proposal_nav_hint_dismissed', '1');
    } catch {
      // ignore storage failures
    }
  }, []);

  const handleShare = useCallback(async () => {
    const shareText = `Reed Building Supply × GableLBM — Confidential Proposal\n\n${window.location.origin}/proposal\nAccess code: ${SHARE_PASSWORD}`;
    try {
      await navigator.clipboard.writeText(shareText);
      setShareCopied(true);
      setShareOpen(true);
      setTimeout(() => {
        setShareCopied(false);
        setShareOpen(false);
      }, 3000);
    } catch {
      setShareOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
        if (showNavHint) dismissNavHint();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
        if (showNavHint) dismissNavHint();
      }
      if (e.key === 'p' || e.key === 'P') {
        setPresenterMode(m => !m);
      }
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        setShortcutsOpen(o => !o);
      }
      if (e.key === 'Escape') {
        setPresenterMode(false);
        setShortcutsOpen(false);
        setShareOpen(false);
        setTocOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, showNavHint, dismissNavHint]);

  // Auto-dismiss nav hint after 8 seconds
  useEffect(() => {
    if (!showNavHint) return;
    const t = setTimeout(() => dismissNavHint(), 8000);
    return () => clearTimeout(t);
  }, [showNavHint, dismissNavHint]);

  const CurrentSlideComponent = SLIDES[currentSlide].component;
  const currentNotes = SLIDES[currentSlide].notes;

  return (
    <div className="min-h-screen bg-deep-space text-white font-sans overflow-hidden flex flex-col selection:bg-gable-green/30 selection:text-gable-green">
      {/* Top bar */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-deep-space/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <svg viewBox="0 0 64 64" fill="none" className="w-6 h-6 text-white group-hover:text-gable-green transition-colors">
              <path d="M4 36 L32 8 L60 36" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-bold tracking-tight hidden md:block">Reed <span className="text-gable-green font-light">Building Supply</span></span>
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPresenterMode(m => !m)}
            title="Toggle presenter notes (P)"
            className={cn(
              "px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 border text-xs font-medium",
              presenterMode
                ? "bg-gable-green/15 text-gable-green border-gable-green/30"
                : "hover:bg-white/5 text-zinc-400 hover:text-white border-transparent hover:border-white/5"
            )}
          >
            <Presentation size={14} />
            <span className="hidden md:inline">Presenter</span>
          </button>

          <button
            onClick={handleShare}
            title="Copy share link + access code"
            className="px-3 py-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all flex items-center gap-2 border border-transparent hover:border-white/5 text-xs font-medium"
          >
            {shareCopied ? <Check size={14} className="text-gable-green" /> : <Share2 size={14} />}
            <span className="hidden md:inline">{shareCopied ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={() => setShortcutsOpen(true)}
            title="Keyboard shortcuts (?)"
            className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
          >
            <Keyboard size={16} />
          </button>

          <a href="https://demo.community/gablelbm.com" target="_blank" rel="noreferrer" title="Switch to ERP Demo" className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors">
            <LayoutDashboard size={18} />
          </a>
        </div>
      </header>

      {/* Share confirmation toast */}
      <AnimatePresence>
        {shareOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-20 right-6 z-[120] bg-slate-steel border border-gable-green/30 rounded-2xl shadow-elevation-3 p-4 max-w-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gable-green/15 flex items-center justify-center shrink-0">
                <Check size={16} className="text-gable-green" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white mb-1">{shareCopied ? 'Link + access code copied' : 'Share details'}</div>
                <div className="text-[11px] text-zinc-400 leading-relaxed font-mono break-all">
                  {window.location.origin}/proposal
                </div>
                <div className="text-[11px] text-zinc-400 leading-relaxed mt-1">
                  Access code: <span className="font-mono text-gable-green">{SHARE_PASSWORD}</span>
                </div>
              </div>
              <button onClick={() => setShareOpen(false)} className="text-zinc-500 hover:text-white shrink-0">
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Slide Area */}
      <main className="flex-1 relative flex items-center justify-center p-6 md:p-12 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gable-green/5 rounded-full blur-[180px] pointer-events-none" />
        
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
              "p-4 rounded-full bg-slate-steel/50 border border-white/5 text-white/50 hover:text-white hover:bg-slate-steel/80 transition-all pointer-events-auto",
              currentSlide === 0 && "opacity-0 pointer-events-none"
            )}
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === SLIDES.length - 1}
            className={cn(
              "p-4 rounded-full bg-slate-steel/50 border border-white/5 text-white/50 hover:text-white hover:bg-slate-steel/80 transition-all pointer-events-auto",
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
                i === currentSlide ? "bg-gable-green shadow-glow" : "bg-white/10 hover:bg-white/20"
              )}
            />
          ))}
        </div>
      </main>

      {/* Navigation hint (first-visit, auto-dismiss) */}
      <AnimatePresence>
        {showNavHint && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[90] bg-slate-steel/95 backdrop-blur-xl border border-gable-green/30 rounded-full shadow-elevation-3 px-5 py-2.5 flex items-center gap-3"
          >
            <span className="text-[11px] text-zinc-300">
              Use <kbd className="px-1.5 py-0.5 mx-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-gable-green">←</kbd>
              <kbd className="px-1.5 py-0.5 mx-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-gable-green">→</kbd>
              or <kbd className="px-1.5 py-0.5 mx-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-gable-green">space</kbd>
              to navigate &middot; <kbd className="px-1.5 py-0.5 mx-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-gable-green">?</kbd> for shortcuts
            </span>
            <button onClick={dismissNavHint} className="text-zinc-500 hover:text-white">
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Presenter notes overlay */}
      <AnimatePresence>
        {presenterMode && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 inset-x-0 z-[95] bg-deep-space/95 backdrop-blur-xl border-t border-gable-green/30 shadow-elevation-3"
          >
            <div className="max-w-5xl mx-auto px-6 py-4">
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex flex-col items-center gap-1 pt-1">
                  <Presentation size={18} className="text-gable-green" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gable-green/70">Notes</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 mb-2">
                    Slide {currentSlide + 1} / {SLIDES.length} &middot; {SLIDES[currentSlide].title}
                  </div>
                  <ul className="space-y-1.5">
                    {currentNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-200 leading-snug">
                        <span className="text-gable-green mt-1">▸</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setPresenterMode(false)}
                  className="text-zinc-500 hover:text-white shrink-0"
                  title="Close presenter notes (P or Esc)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcuts modal */}
      <AnimatePresence>
        {shortcutsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShortcutsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[105]"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[110] bg-slate-steel border border-white/10 rounded-2xl shadow-elevation-3 w-full max-w-md overflow-hidden"
            >
              <div className="p-4 bg-deep-space/50 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Keyboard size={16} className="text-gable-green" />
                  <span className="text-sm font-bold text-white">Keyboard Shortcuts</span>
                </div>
                <button onClick={() => setShortcutsOpen(false)} className="text-zinc-500 hover:text-white">
                  <X size={14} />
                </button>
              </div>
              <div className="p-5 space-y-2.5">
                {[
                  { keys: ['→', 'Space'], desc: 'Next slide' },
                  { keys: ['←'], desc: 'Previous slide' },
                  { keys: ['P'], desc: 'Toggle presenter notes' },
                  { keys: ['?'], desc: 'Show this help' },
                  { keys: ['Esc'], desc: 'Close any overlay' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-300">{s.desc}</span>
                    <div className="flex gap-1">
                      {s.keys.map(k => (
                        <kbd key={k} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-gable-green min-w-[28px] text-center">{k}</kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
              className="fixed top-20 left-6 w-72 bg-slate-steel border border-white/10 rounded-2xl shadow-elevation-3 z-[110] overflow-hidden"
            >
              <div className="p-4 bg-deep-space/50 border-b border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Presentation Sections</span>
                <button onClick={() => setTocOpen(false)} className="text-zinc-500 hover:text-white">
                  <X size={14} />
                </button>
              </div>
              <div className="bg-slate-steel p-2 overflow-y-auto max-h-[60vh] no-scrollbar">
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
                        ? "bg-gable-green text-deep-space font-bold" 
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
