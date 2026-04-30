import { motion } from 'framer-motion';
import { Calendar, Search, Wrench, Database, Rocket, Heart, CheckCircle2, Flag } from 'lucide-react';

const PHASES = [
  {
    label: 'Month 1',
    title: 'Solution Scoping + First-Pass Customization',
    icon: Wrench,
    weeks: 'Weeks 1–4',
    deliverables: [
      'Detailed data model + integration design',
      'Build plan locked, repo forked from GableLBM',
      'Dev/staging environments scaffolded + CI wired',
    ],
    hours: [
      { role: 'Lead Architect', hrs: 30 },
      { role: 'Engineer', hrs: 8 },
    ],
  },
  {
    label: 'Month 2',
    title: 'Core Build + QB→Portal Migration Prep',
    icon: Database,
    weeks: 'Weeks 5–8',
    deliverables: [
      'Reed-tailored customizations forked from GableLBM',
      'QuickBooks data import + validation pipeline',
      'Internal demo + integration smoke tests',
    ],
    hours: [
      { role: 'Lead Architect', hrs: 15 },
      { role: 'Engineer', hrs: 22 },
    ],
  },
  {
    label: 'Month 3',
    title: 'UAT + Onsite Training + Go-Live',
    icon: Rocket,
    weeks: 'Weeks 9–12',
    deliverables: [
      'User acceptance testing with Reed team',
      '3-day onsite at McKees Rocks (cutover + hands-on training)',
      'Production go-live + monitoring active',
    ],
    hours: [
      { role: 'Engineer', hrs: 6 },
      { role: 'Onsite (1 person)', hrs: '3 days' },
      { role: 'Trainer', hrs: 4 },
      { role: 'Lead Architect', hrs: 5 },
    ],
  },
  {
    label: 'Month 4',
    title: 'Hypercare + Phase 2 Planning',
    icon: Heart,
    weeks: 'Optional buffer',
    deliverables: [
      'Recorded follow-up Q&A + training library',
      'First month of managed-infra recurring kicks in',
      'Phase 2 roadmap discussion (RFID, advanced BI, etc.)',
    ],
    hours: [
      { role: 'Trainer', hrs: 2 },
    ],
    optional: true,
  },
];

const MILESTONES = [
  { label: 'Phase 0 Sign-off', position: 0 },
  { label: 'Scoping Locked', position: 1 },
  { label: 'Build Complete', position: 2 },
  { label: 'Go-Live 🚀', position: 3 },
];

export function SlideRollout() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gable-green/20 text-gable-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-gable-green/30">
          Reed Building Supply — Implementation Timeline
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">3-Month <span className="text-gable-green">Build Clock</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          Compressed timeline. Phase 0 (Discovery) is pre-project; the 3-month build kicks off at sign-off. Month 4 is optional hypercare.
        </p>
      </div>

      {/* Pre-project Phase 0 row */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 mb-6 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
          <Search size={18} className="text-zinc-500" />
        </div>
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 mb-1">Pre-Project</div>
          <h3 className="font-bold text-sm text-zinc-300 mb-1">Phase 0 — Discovery & Env Setup</h3>
          <p className="text-[11px] text-zinc-500">2–3 weeks · billed separately ($500) · build clock starts at sign-off</p>
        </div>
        <div className="text-xs font-bold text-zinc-500 font-data shrink-0">$500</div>
      </motion.div>

      {/* Build clock anchor line */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gable-green/40 to-gable-green/40" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gable-green flex items-center gap-2">
          <Flag size={12} /> 3-Month Build Clock Begins
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gable-green/40 to-gable-green/40" />
      </div>

      {/* Month bars */}
      <div className="space-y-4 mb-10">
        {PHASES.map((phase, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.12 }}
            className={`glass-card rounded-2xl border p-5 transition-all ${
              phase.optional
                ? 'border-white/5 bg-white/[0.02] opacity-70 hover:opacity-100'
                : 'border-white/5 hover:border-gable-green/30'
            }`}
          >
            <div className="flex items-start gap-5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                phase.optional ? 'bg-white/5 text-zinc-500' : 'bg-gable-green/10 text-gable-green'
              }`}>
                <phase.icon size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1 gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${
                      phase.optional ? 'text-zinc-600' : 'text-gable-green'
                    }`}>{phase.label}</span>
                    {phase.optional && (
                      <span className="text-[9px] uppercase tracking-widest font-bold text-amber-500/70 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Optional Buffer
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1 shrink-0">
                    <Calendar size={10} /> {phase.weeks}
                  </span>
                </div>
                <h3 className="font-bold text-base text-white mb-3">{phase.title}</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    {phase.deliverables.map((d, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 size={12} className="text-gable-green/60 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 content-start">
                    {phase.hours.map((h, j) => (
                      <span
                        key={j}
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-white/5 border border-white/5 text-zinc-400"
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
        className="glass-card rounded-2xl border-white/5 p-5 mb-8"
      >
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4 text-center">Key Milestones</h4>
        <div className="grid grid-cols-4 gap-3 relative">
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

      {/* Summary card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="rounded-2xl border border-gable-green/20 bg-gable-green/5 p-5 flex items-center gap-4"
      >
        <div className="p-2 bg-gable-green/15 rounded-lg shrink-0">
          <Rocket size={20} className="text-gable-green" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm text-white mb-1">3 months core · 4 months with hypercare</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Total team commitment from Phase 0 sign-off to go-live: <span className="text-gable-green font-bold">~92 hrs</span> (Lead Architect, Engineer, Trainer) <span className="text-gable-green font-bold">+ 3 onsite days</span> at McKees Rocks. No "big bang" — UAT and parallel validation precede every cutover.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
