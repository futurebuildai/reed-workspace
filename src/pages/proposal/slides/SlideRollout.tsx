import { motion } from 'framer-motion';
import { Calendar, Search, Wrench, Database, Rocket, Heart, CheckCircle2, Flag, Footprints, Activity, Zap } from 'lucide-react';

const PHASES = [
  {
    label: 'Weeks 1–3',
    title: 'Solution Design + Repo Fork + QB Integration Pipeline',
    icon: Wrench,
    deliverables: [
      'Build plan locked, repo forked from GableLBM',
      'Dev/staging environments scaffolded + CI wired',
      'QuickBooks bi-directional sync pipeline + validation',
    ],
    hours: [
      { role: 'Lead Architect', hrs: 30 },
      { role: 'Engineer', hrs: 10 },
    ],
  },
  {
    label: 'Weeks 4–8',
    title: 'Core Build (POS + Run Payments, Quote/Order, AR, Inventory, Dispatch)',
    icon: Database,
    deliverables: [
      'Inventory + reorder thresholds wired',
      'POS terminal + Run Payments integration',
      'Quote → PO → invoice conversion flow',
      'Basic AR + monthly statements + dispatch',
    ],
    hours: [
      { role: 'Lead Architect', hrs: 15 },
      { role: 'Engineer', hrs: 30 },
    ],
  },
  {
    label: 'Weeks 9–10',
    title: 'UAT + Final Testing',
    icon: CheckCircle2,
    deliverables: [
      'Full user acceptance testing with Reed team',
      'QB sync validation under real-world load',
      'Bug bash + final polish before cutover',
    ],
    hours: [
      { role: 'Lead Architect', hrs: 10 },
      { role: 'Engineer', hrs: 10 },
    ],
  },
  {
    label: 'Weeks 11–12',
    title: 'Onsite Cutover + Training + Go-Live',
    icon: Rocket,
    deliverables: [
      '2-day onsite at Reed Building Supply (cutover + hands-on training)',
      'Production go-live + monitoring active',
      'Day-one hypercare coverage',
    ],
    hours: [
      { role: 'Lead Architect', hrs: 10 },
      { role: 'Engineer', hrs: 10 },
      { role: 'Onsite (1 person)', hrs: '2 days' },
      { role: 'Trainer', hrs: 4 },
    ],
  },
  {
    label: 'Post Go-Live',
    title: 'Hypercare + Phase 2 Planning',
    icon: Heart,
    deliverables: [
      'Recorded follow-up Q&A + training library',
      'First month of managed-infra recurring kicks in',
      'Phase 2 module prioritization with Reed leadership',
    ],
    hours: [
      { role: 'Trainer', hrs: 2 },
    ],
    optional: true,
  },
];

const MILESTONES = [
  { label: 'Phase 0 Sign-off' },
  { label: 'Scoping Locked' },
  { label: 'Build Complete' },
  { label: 'Go-Live 🚀' },
];

export function SlideRollout() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gable-green/20 text-gable-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-gable-green/30">
          Reed Building Supply — Implementation Timeline
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">10–12 Week <span className="text-gable-green">Parity Build</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          Phase 0 (1 week setup + 2–3 weeks discovery) is pre-project. The 10–12 week Parity build clock — 8–10 weeks of build plus 2 weeks of final testing &amp; cutover — starts at Phase 0 sign-off. Phase 2 deeper features are scheduled separately, post go-live.
        </p>
      </div>

      {/* Crawl/Walk/Run strip */}
      <div className="grid grid-cols-3 gap-2 mb-6 text-center">
        <div className="rounded-xl border border-white/5 bg-deep-space/40 p-3">
          <Footprints size={14} className="text-zinc-400 mx-auto mb-1" />
          <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Crawl</div>
          <div className="text-xs text-white font-semibold">Setup + Discovery</div>
          <div className="text-[10px] text-zinc-600 mt-0.5">3–4 weeks</div>
        </div>
        <div className="rounded-xl border border-gable-green/30 bg-gable-green/10 p-3">
          <Activity size={14} className="text-gable-green mx-auto mb-1" />
          <div className="text-[10px] uppercase tracking-widest font-bold text-gable-green">Walk</div>
          <div className="text-xs text-white font-semibold">Parity Go-Live</div>
          <div className="text-[10px] text-gable-green/80 mt-0.5">10–12 weeks</div>
        </div>
        <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3">
          <Zap size={14} className="text-purple-400 mx-auto mb-1" />
          <div className="text-[10px] uppercase tracking-widest font-bold text-purple-300">Run</div>
          <div className="text-xs text-white font-semibold">Deeper Features</div>
          <div className="text-[10px] text-zinc-500 mt-0.5">rolling, optional</div>
        </div>
      </div>

      {/* Pre-project Phase 0 row */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4 mb-3 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
          <Search size={18} className="text-zinc-500" />
        </div>
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 mb-1">Pre-Project · Crawl</div>
          <h3 className="font-bold text-sm text-zinc-300 mb-1">Phase 0 — Setup &amp; Discovery</h3>
          <p className="text-[11px] text-zinc-500">1 week setup + 2–3 weeks discovery (3–4 weeks total) · $500 setup + $500/mo dev/staging/AI starts at sign-off</p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs font-bold text-zinc-300 font-data">$500</div>
          <div className="text-[10px] text-zinc-500 font-data">+ $500/mo</div>
        </div>
      </motion.div>

      {/* During-implementation infra note */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-amber-500/15 bg-amber-500/[0.03] p-3 mb-5 text-center"
      >
        <p className="text-[11px] text-amber-200/70 leading-relaxed">
          <span className="font-bold text-amber-300">During implementation (~3–4 months total):</span> $500/mo flat covers dev/staging environments + AI service runtime. Drops to standard Managed Hosting tier ($250 or $800/mo) at go-live.
        </p>
      </motion.div>

      {/* Build clock anchor line */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gable-green/40 to-gable-green/40" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gable-green flex items-center gap-2">
          <Flag size={12} /> 10–12 Week Parity Build Clock
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gable-green/40 to-gable-green/40" />
      </div>

      {/* Week bars */}
      <div className="space-y-3 mb-8">
        {PHASES.map((phase, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card rounded-2xl border p-4 transition-all ${
              phase.optional
                ? 'border-white/5 bg-white/[0.02] opacity-70 hover:opacity-100'
                : 'border-white/5 hover:border-gable-green/30'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                phase.optional ? 'bg-white/5 text-zinc-500' : 'bg-gable-green/10 text-gable-green'
              }`}>
                <phase.icon size={18} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1 gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${
                      phase.optional ? 'text-zinc-600' : 'text-gable-green'
                    }`}>{phase.label}</span>
                    {phase.optional && (
                      <span className="text-[9px] uppercase tracking-widest font-bold text-amber-500/70 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Hypercare
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1 shrink-0">
                    <Calendar size={10} /> {phase.label}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mb-2">{phase.title}</h3>

                <div className="grid md:grid-cols-2 gap-3">
                  <ul className="space-y-1 text-[11px] text-zinc-400">
                    {phase.deliverables.map((d, j) => (
                      <li key={j} className="flex items-start gap-1.5">
                        <CheckCircle2 size={10} className="text-gable-green/60 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 content-start">
                    {phase.hours.map((h, j) => (
                      <span
                        key={j}
                        className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-1 rounded bg-white/5 border border-white/5 text-zinc-400"
                      >
                        {h.role}: <span className="text-gable-green font-bold">{h.hrs}h</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Milestone strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-2xl border-white/5 p-4 mb-6"
      >
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3 text-center">Key Milestones</h4>
        <div className="grid grid-cols-4 gap-2 relative">
          <div className="absolute top-3 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-gable-green/20 via-gable-green/40 to-gable-green/20" />
          {MILESTONES.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-2 relative z-10">
              <div className="w-6 h-6 rounded-full bg-deep-space border-2 border-gable-green flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gable-green" />
              </div>
              <span className="text-[10px] font-bold text-center text-zinc-400 uppercase tracking-wider leading-tight">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="rounded-2xl border border-gable-green/20 bg-gable-green/5 p-4 flex items-center gap-3"
      >
        <div className="p-2 bg-gable-green/15 rounded-lg shrink-0">
          <Rocket size={18} className="text-gable-green" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm text-white mb-1">Phase 1 effort: 65 LA + 60 Eng = 125 hrs + 2 onsite days + 4 hrs training</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            From Phase 0 sign-off to Reed running production on GableLBM in <span className="text-gable-green font-bold">10–12 weeks</span> (8–10 build + 2 testing/cutover). No "big bang" — UAT + parallel QB sync precede every cutover. Phase 2 modules scheduled quarterly post-go-live, Reed-prioritized.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
