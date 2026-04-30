import { motion } from 'framer-motion';
import { Sparkles, Wrench, GraduationCap, MapPin, Server, Clock, Lock, CreditCard, Footprints, Activity, Zap } from 'lucide-react';

const PHASE_1_LINES = [
  {
    icon: Wrench,
    name: 'Solution Scoping + Build',
    amount: '$25,125',
    breakdown: '65 hrs Lead Architect @ $225 + 60 hrs Engineer @ $175  ·  fork of GableLBM tailored to Reed\'s Parity scope (QB integration, inventory, POS, quote/order, AR, dispatch)  ·  every bucket gets ≥10 hrs of both Architect and Engineer',
  },
  {
    icon: MapPin,
    name: 'Onsite Cutover — 2 days @ $1,500/day',
    amount: '$3,000',
    breakdown: '$1,500/day flat day rate (all-in: travel + accommodations)  ·  2 days × $1,500 = $3,000 added to Phase 1 total  ·  hands-on cutover and team enablement at Reed Building Supply',
  },
  {
    icon: GraduationCap,
    name: 'Live Training',
    amount: '$500',
    breakdown: '4 hrs @ $125  ·  2 live sessions during onsite week + recorded follow-up library',
  },
];

const PHASE_2_OPTIONS = [
  { name: 'AIA G702/G703 progress billing' },
  { name: 'AI categorization + reorder predictions' },
  { name: 'Pricing Rules & Tier Configurator' },
  { name: 'Advanced BI dashboards' },
  { name: 'SSO (Google / Microsoft)' },
  { name: 'RFID inventory tagging' },
  { name: 'Contractor self-serve portal', custom: true },
];

export function SlideRateCard() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gable-green/20 text-gable-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-gable-green/30">
          Reed Building Supply — Crawl · Walk · Run
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Project <span className="text-gable-green">Proposal</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          Built around Reed's pace and budget. Lock the Parity scope first, see real value in production, then add deeper features when Reed chooses — no commitment to Phase 2 until you're ready.
        </p>
      </div>

      {/* Three-phase summary strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <div className="rounded-2xl border border-white/5 bg-deep-space/40 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Footprints size={16} className="text-zinc-400" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Crawl · Phase 0</span>
          </div>
          <div className="text-xl font-bold text-white font-data">$500 + $500<span className="text-sm text-zinc-500 font-sans">/mo</span></div>
          <div className="text-[10px] text-zinc-500 mt-1">Setup + dev/staging/AI during implementation  ·  10 free Sr Architect hrs</div>
        </div>
        <div className="rounded-2xl border border-gable-green/30 bg-gable-green/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-gable-green" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-gable-green">Walk · Phase 1 — Parity Go-Live</span>
          </div>
          <div className="text-xl font-bold text-white font-data">
            $18,600 <span className="text-sm text-zinc-500 line-through font-normal">$28,625</span>
          </div>
          <div className="text-[10px] text-gable-green mt-1">After $10,025 "Running with Rowdy" referral credit</div>
        </div>
        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-purple-400" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-purple-300">Run · Phase 2 — Deeper Features</span>
          </div>
          <div className="text-xl font-bold text-white font-data">~$2K – $3K each</div>
          <div className="text-[10px] text-zinc-500 mt-1">in dev hours per module  ·  contractor portal scoped to Reed's preferences</div>
        </div>
      </div>

      {/* Phase 1 detail */}
      <div className="mb-8">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gable-green mb-3 flex items-center gap-2">
          <Activity size={14} /> Phase 1 — Parity Go-Live (line items)
        </h3>
        <div className="space-y-2.5">
          {PHASE_1_LINES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-4 border-white/5 flex items-start gap-4 hover:border-gable-green/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-gable-green" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-white mb-1">{item.name}</h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed">{item.breakdown}</p>
              </div>
              <div className="text-2xl font-bold text-gable-green font-data shrink-0 self-center">{item.amount}</div>
            </motion.div>
          ))}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-4 border border-amber-500/30 bg-amber-500/[0.04] flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <CreditCard size={18} className="text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-white mb-1">"Running with Rowdy" Referral Credit</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Reed activating <span className="text-amber-300 font-semibold">Run Payments</span> as the POS + on-account processor unlocks our partner program credit (a.k.a. "Running with Rowdy"). Equivalent to <span className="text-amber-300 font-semibold">~45 free Sr Architect hours</span> applied directly to Phase 1. Pricing stays at standard hourly; the credit closes the gap.
              </p>
            </div>
            <div className="text-xl font-bold text-amber-400 font-data shrink-0 self-center">−$10,025</div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl p-5 border border-gable-green/30 bg-gable-green/10 flex items-center justify-between"
          >
            <div>
              <div className="text-sm uppercase tracking-widest font-bold text-gable-green">Phase 1 Net — Estimated</div>
              <div className="text-[10px] text-amber-400/80 uppercase tracking-widest font-bold mt-1">Capped at $24,000 not-to-exceed</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white font-data">$18,600</div>
              <div className="text-[10px] text-amber-400/80 font-data">/ $24,000 max</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="rounded-2xl p-4 border border-white/5 bg-deep-space/40 flex items-start gap-3"
          >
            <Lock size={14} className="text-zinc-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              <span className="font-bold text-white">Hourly rates unchanged.</span> Lead Architect $225  ·  Engineer $175  ·  Trainer $125  ·  PM $150. Bucket allocations beefed +20% (≥10 hrs each role per bucket) to absorb scope drift; the "Running with Rowdy" credit absorbs the increase. Approved scope expansion beyond that bills against the $5,400 NTE buffer at standard rates. Anything beyond $24,000 requires a written change order.
            </p>
          </motion.div>

          {/* Run Payments processing rates */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl p-4 border border-amber-500/15 bg-amber-500/[0.03]"
          >
            <div className="flex items-start gap-3 mb-3">
              <CreditCard size={14} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold text-sm text-white">Run Payments — Indicative Processing Rates</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed mt-0.5">
                  Independent of the project pricing above. Final rates confirmed after Reed's current merchant statements are reviewed for card-type mix.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-2 mb-3">
              <div className="rounded-lg bg-deep-space/60 border border-white/5 p-3">
                <div className="text-[9px] uppercase tracking-widest font-bold text-amber-400/80 mb-1">Card-Present</div>
                <div className="text-sm text-white font-mono">Low 2% range</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">depends on card mix</div>
              </div>
              <div className="rounded-lg bg-deep-space/60 border border-white/5 p-3">
                <div className="text-[9px] uppercase tracking-widest font-bold text-amber-400/80 mb-1">Surcharge Option</div>
                <div className="text-sm text-white font-mono">Available</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">pass card fees to customer</div>
              </div>
              <div className="rounded-lg bg-deep-space/60 border border-white/5 p-3">
                <div className="text-[9px] uppercase tracking-widest font-bold text-amber-400/80 mb-1">ACH</div>
                <div className="text-sm text-white font-mono">0.10% · $1 min · $10 max</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">ideal for on-account billing</div>
              </div>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed italic">
              Send Reed's current merchant statement and we'll return firm rates within 2 business days. Run Payments is the underlying processor; FutureBuild AI does not mark up processing fees.
            </p>
          </motion.div>

          {/* AI model API usage */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="rounded-2xl p-4 border border-purple-500/15 bg-purple-500/[0.03] flex items-start gap-3"
          >
            <Sparkles size={14} className="text-purple-300 shrink-0 mt-0.5" />
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              <span className="font-bold text-purple-300">AI model API usage:</span> AI features call out to model APIs (OpenAI / Anthropic / Vertex) billed as-incurred each month. Expect <span className="text-white font-semibold">&lt; $100/mo</span> for typical usage. Heavy one-off runs (deep product catalog enrichment, bulk reclassification) bill separately and are pre-quoted before execution.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Phase 2 menu */}
      <div className="mb-10">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple-300 mb-3 flex items-center gap-2">
          <Zap size={14} /> Phase 2 — Deeper Features (deferred, Reed-prioritized menu)
        </h3>
        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.04] p-5">
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-4">
            {PHASE_2_OPTIONS.map((opt, i) => (
              <div key={i} className="flex items-center justify-between text-xs border-b border-white/5 pb-2 last:border-0">
                <span className="text-zinc-300">{opt.name}</span>
                {opt.custom && (
                  <span className="text-[9px] font-bold uppercase tracking-widest text-purple-300/70 whitespace-nowrap ml-3">Custom scope</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            Most features here are already available in GableLBM and land in the <span className="text-purple-300 font-semibold">~$2K–$3K range each in dev hours</span> to wire up for Reed. Reed selects modules quarterly post-go-live; typical 12-month spend is $6K–$9K across 2–3 modules. Contractor portal scoped separately based on Reed's preferences.
          </p>
        </div>
      </div>

      {/* Ongoing Partnership — short reference, full detail on next slide */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-10 rounded-2xl border border-white/5 bg-deep-space/40 p-5 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-gable-green/10 flex items-center justify-center shrink-0">
            <Server size={18} className="text-gable-green" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-widest font-bold text-gable-green mb-0.5">Ongoing Partnership — 3 monthly tiers</div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              <span className="text-white font-semibold">$250 / $800 / $1,400 per month</span>. Same hosting + backup regimen across all tiers — only support hours, feature merges, and SLA differ. Full detail on the next slide.
            </p>
          </div>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-widest text-gable-green/70 shrink-0 hidden md:inline">Next slide →</span>
      </motion.div>

      {/* Payment milestones + Founding customer */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-2xl border border-white/5 bg-deep-space/50"
        >
          <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Clock size={14} /> Phase 1 Payment Milestones
          </h4>
          <ul className="space-y-3">
            <li className="flex items-baseline justify-between text-sm">
              <span className="text-zinc-400">Scoping sign-off</span>
              <span className="font-bold text-gable-green font-data">50%</span>
            </li>
            <li className="flex items-baseline justify-between text-sm">
              <span className="text-zinc-400">Parity build complete</span>
              <span className="font-bold text-gable-green font-data">30%</span>
            </li>
            <li className="flex items-baseline justify-between text-sm">
              <span className="text-zinc-400">Go-live + first month of recurring</span>
              <span className="font-bold text-gable-green font-data">20%</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-6 rounded-2xl border border-gable-green/20 bg-gable-green/5"
        >
          <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-gable-green flex items-center gap-2">
            <Sparkles size={14} /> Founding Customer Terms
          </h4>
          <p className="text-xs text-gable-green/80 leading-relaxed italic">
            Phase 1 hourly rates locked for any Phase 2 work for 24 months. Onboarding fees waived. First-customer co-marketing rights (with Reed approval) for case studies and references.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
