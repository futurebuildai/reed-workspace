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
import { SlideManagedServices } from './slides/SlideManagedServices';
import { SlideInfrastructure } from './slides/SlideInfrastructure';
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
      'Anchor: strategic partnership, not a SaaS purchase. Reed owns the source.',
      'Set expectation: ~12 short slides. We close on Phase 0 today, not Phase 1.',
    ],
  },
  {
    id: 'model',
    title: 'How We Work',
    component: SlideEngagementModel,
    notes: [
      'Crawl / Walk / Run: Phase 0 (discovery), Phase 1 (Parity Go-Live), Phase 2 (deeper features, deferred).',
      'Each phase has its own go/no-go. Reed is never on the hook for the next phase until the prior one delivers.',
      'Total commitment today is just Phase 0 — $500 setup + $500/mo during implementation.',
    ],
  },
  {
    id: 'replacement',
    title: 'What You\'re Replacing',
    component: SlideReplacement,
    notes: [
      'Reed runs QuickBooks Desktop Enterprise (books + light inventory) and Clover (POS).',
      'Phase 1: Clover replaced by Run Payments. QuickBooks stays as source of truth and integrates bi-directionally with GableLBM.',
      'Phase 2+: QB workloads migrate natively into GableLBM (becomes SOT) — no big-bang risk, Reed in control of pace.',
      'No per-seat licensing. Reed owns the source forever.',
    ],
  },
  {
    id: 'scope',
    title: 'Customization Scope',
    component: SlideCustomizationScope,
    notes: [
      'Nine operational buckets. Each tagged Phase 1 (Walk), Phase 2 (Run), or both.',
      'Walk = parity (daily ops). Run = deeper features Reed picks post-go-live.',
      'AIA billing, AI categorization, Pricing Tier Configurator, advanced BI, SSO, RFID, contractor portal all sit in Phase 2.',
    ],
  },
  {
    id: 'rollout',
    title: 'Scope & Rollout',
    component: SlideRollout,
    notes: [
      'Phase 0 = 1 week setup + 2–3 weeks discovery (3–4 weeks total). Pre-project.',
      'Phase 1 = 8–10 weeks build + 2 weeks final testing & cutover (10–12 weeks total).',
      'During implementation: $500/mo flat covers dev/staging + AI runtime.',
      'No big-bang cutover — UAT + parallel QB sync precede every step.',
    ],
  },
  {
    id: 'phase0',
    title: 'Phase 0 Details',
    component: SlidePhase0,
    notes: [
      'New structure: $500 one-time setup + $500/mo flat during implementation (~3–4 months).',
      'Timeline: 1 week setup + 2–3 weeks discovery = 3–4 weeks total.',
      '$500/mo covers dev/staging environments + AI service runtime — no surprise infra bills.',
      'AI model APIs (OpenAI/Anthropic/Vertex) billed as-incurred — typical < $100/mo, heavy enrichment runs pre-quoted.',
      '10 free Sr Architect hours included ($2,250 value) — should be sufficient to fully scope Phase 1.',
      'TRANSPARENCY: Recommend Reed be comfortable with up to ~10 additional billable scoping hours (~$2,250) depending on Phase 1 goals. All approved in writing before billing.',
      'After go-live, switches to Managed Hosting tier of choice ($250 or $800/mo).',
    ],
  },
  {
    id: 'phase1',
    title: 'Phase 1 — Parity',
    component: SlidePhase1,
    notes: [
      'Walk phase. Net $18,600 after $10,025 "Running with Rowdy" referral credit. Sticker $28,625. NTE $24,000.',
      '10–12 week build (8–10 build + 2 testing/cutover). 50/30/20 milestone billing.',
      'Hours bumped +20% per bucket with ≥10 hr floor on both Architect and Engineer roles → 65 LA + 60 Eng = 125 hrs total.',
      'Onsite: 2 days × $1,500/day flat = $3,000 (added to total).',
      'Clover fully replaced by Run Payments. QuickBooks kept as source of truth + bi-directional sync.',
      'Scope: QB integration, inventory, POS + Run Payments (with offline mode), quote/order, basic AR, dispatch, roles.',
    ],
  },
  {
    id: 'phase2',
    title: 'Phase 2 — Deeper Features',
    component: SlidePhase2,
    notes: [
      'Run phase. Deferred. Reed picks modules quarterly post go-live.',
      'Most features available; ~$2K–$3K each in dev hours to wire up. Contractor portal scoped custom.',
      'Typical 12-month spend: $6K–$9K across 2–3 modules.',
      'Phase 2+ also covers full QB workload migration (GableLBM becomes source of truth).',
      'Founding customer rate lock: Phase 1 hourly rates hold for 24 months.',
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
      'Crawl/Walk/Run pricing. Phase 0: $500 + $500/mo. Phase 1: $18,600 net (after "Running with Rowdy" credit), NTE $24K. Phase 2: ~$2-3K per module, deferred.',
      'Phase 1 line items: Build $25,125 (65 LA + 60 Eng, ≥10 hrs both roles per bucket) + Onsite $3,000 (2 days @ $1,500/day) + Training $500 = $28,625 sticker.',
      'Hourly rates unchanged: LA $225 / Eng $175 / Trainer $125 / PM $150.',
      '"Running with Rowdy" credit: Reed activating Run Payments unlocks $10,025 off Phase 1 (~45 free Sr Architect hrs) — partner referral program.',
      'Run Payments processing: low 2% range card-present (mix-dependent), surcharge available, ACH 0.10% / $1 min / $10 max. Firm rates after merchant statement review.',
      'AI model API usage: pass-through, billed monthly as-incurred, typical < $100/mo, heavy enrichment pre-quoted.',
      'Ongoing MSP tiers detailed on the next slide.',
    ],
  },
  {
    id: 'msp',
    title: 'Managed Services',
    component: SlideManagedServices,
    notes: [
      'Three tiers: Foundation ($250/mo), Active ($800/mo, recommended), Partnership ($1,400/mo).',
      'All tiers include the SAME hosting + backup regimen — only support hours, feature merges, and SLA differ.',
      'Bundled hours: Foundation 0, Active 4/mo, Partnership 8/mo. Roll forward 90 days.',
      'Bundle effective rate: $140/hr (20% off standard $175 Engineer rate).',
      'List prices assume a 2-year service agreement. Month-to-month available at higher rates, quoted on request.',
      'Most customers start at Active and only move to Partnership when Phase 2 modules are actively shipping.',
    ],
  },
  {
    id: 'infra',
    title: 'Infrastructure',
    component: SlideInfrastructure,
    notes: [
      'DigitalOcean NYC3 (compute + DB) + GCP us-east4 Virginia (AI). Low latency to Reed Building Supply.',
      'Run Payments wired into the Primary Stack as the merchant processor.',
      'Offline mode for POS + inventory IS in scope for Phase 1 — local-first writes queue and auto-sync on reconnect.',
      'Same hosting + backup regimen runs across all MSP tiers — never an upcharge for redundancy or recovery.',
    ],
  },
  {
    id: 'next',
    title: 'Next Steps',
    component: SlideNextSteps,
    notes: [
      'Phase 0 total risk: $500 setup + $500/mo (~1 month) = ~$1K, with the option to terminate after Phase 0 — no obligation to Phase 1.',
      'Close: agree to Phase 0 when Reed is ready. No artificial urgency.',
      'After Phase 0, Reed has a locked Phase 1 plan + estimate to make a fully-informed decision.',
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

  // Listen for in-slide advance triggers (e.g. SlideTitle's "Begin" button)
  useEffect(() => {
    const onAdvance = () => nextSlide();
    window.addEventListener('proposal:next', onAdvance);
    return () => window.removeEventListener('proposal:next', onAdvance);
  }, [nextSlide]);

  const CurrentSlideComponent = SLIDES[currentSlide].component;
  const currentNotes = SLIDES[currentSlide].notes;

  return (
    <div className="min-h-screen bg-deep-space text-white font-sans overflow-hidden flex flex-col selection:bg-gable-green/30 selection:text-gable-green">
      {/* Top bar */}
      <header className="h-14 md:h-16 flex items-center justify-between px-3 md:px-6 border-b border-white/5 bg-deep-space/80 backdrop-blur-xl z-50 gap-2">
        <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <svg viewBox="0 0 64 64" fill="none" className="w-6 h-6 text-white group-hover:text-gable-green transition-colors">
              <path d="M4 36 L32 8 L60 36" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-bold tracking-tight hidden md:block">Reed <span className="text-gable-green font-light">Building Supply</span></span>
          </Link>
          <div className="h-4 w-px bg-white/10 hidden md:block shrink-0" />
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="px-2 md:px-3 py-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all flex items-center gap-1.5 md:gap-2 border border-transparent hover:border-white/5 min-w-0"
            >
              <Menu size={16} className="shrink-0" />
              <span className="text-xs md:text-sm font-medium truncate max-w-[110px] sm:max-w-none">{SLIDES[currentSlide].title}</span>
            </button>
            <span className="text-[10px] text-zinc-600 font-mono whitespace-nowrap shrink-0">{currentSlide + 1} / {SLIDES.length}</span>
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
      <main className="flex-1 relative overflow-hidden">
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
            className="absolute inset-0 overflow-y-auto overflow-x-hidden no-scrollbar"
          >
            <div className="min-h-full w-full flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-20 py-6 md:py-10 pb-24">
              <div className="w-full max-w-6xl">
                <CurrentSlideComponent />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-1 sm:px-2 md:px-4 pointer-events-none z-10">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            aria-label="Previous slide"
            className={cn(
              "p-2 md:p-3 rounded-full bg-slate-steel/80 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-slate-steel hover:border-gable-green/40 shadow-elevation-2 transition-all pointer-events-auto",
              currentSlide === 0 && "opacity-0 pointer-events-none"
            )}
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === SLIDES.length - 1}
            aria-label="Next slide"
            className={cn(
              "p-2 md:p-3 rounded-full bg-slate-steel/80 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-slate-steel hover:border-gable-green/40 shadow-elevation-2 transition-all pointer-events-auto",
              currentSlide === SLIDES.length - 1 && "opacity-0 pointer-events-none",
              currentSlide === 0 && "ring-2 ring-gable-green/50 animate-pulse"
            )}
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1 md:gap-1.5 p-1 bg-deep-space/80 backdrop-blur-md rounded-full border border-white/10 w-[80%] sm:w-auto sm:max-w-xs sm:min-w-[200px] z-10">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              onClick={() => {
                setDirection(i > currentSlide ? 1 : -1);
                setCurrentSlide(i);
              }}
              className={cn(
                "h-1 rounded-full flex-1 transition-all cursor-pointer min-w-[6px]",
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
