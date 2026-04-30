import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Wrench, GraduationCap, MapPin, ShieldCheck, Server, Clock, Lock } from 'lucide-react';

const LINE_ITEMS = [
  {
    icon: Sparkles,
    name: 'Phase 0 — Discovery + Dev/Staging Env Setup',
    amount: '$500',
    breakdown: '$250 setup labor + 1 month × $250 infra (rolls into Phase 1 if proceeding)',
    bonus: 'Includes 10 Senior Architect hours — $2,250 value, free. Estimated sufficient to fully scope and lock the Phase 1 build plan.',
  },
  {
    icon: Wrench,
    name: 'Solution Scoping + Software Customization',
    amount: '$17,500',
    breakdown: '50 hrs Lead Architect @ $225 + 36 hrs Engineer @ $175  ·  fork of GableLBM tailored to Reed\'s commercial-supply workflows',
  },
  {
    icon: MapPin,
    name: 'Onsite Implementation (1 person, 2–3 days)',
    amount: '$4,500',
    breakdown: '1 person × 3 days @ $1,500/day flat (all-in: accommodations + travel included)  ·  hands-on cutover and team enablement at McKees Rocks  ·  shorter trip = $3,000 (2 days)',
  },
  {
    icon: GraduationCap,
    name: 'Training & Implementation Support',
    amount: '$750',
    breakdown: '6 hrs @ $125  ·  2 live training sessions during onsite week + recorded follow-up library',
  },
];

const MILESTONES = [
  { pct: '50%', when: 'Scoping sign-off' },
  { pct: '30%', when: 'Phase 1 delivery' },
  { pct: '20%', when: 'Go-live + first month of recurring' },
];

export function SlideRateCard() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gable-green/20 text-gable-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-gable-green/30">
          Reed Building Supply — Phase 1 Pricing
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Project <span className="text-gable-green">Proposal</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          Fixed-price, milestone-billed, no per-seat licensing. A straightforward fork of GableLBM tailored to Reed's commercial-supply workflows.
        </p>
      </div>

      {/* Hero total */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-3xl p-8 border-gable-green/20 bg-gable-green/5 text-center mb-10"
      >
        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gable-green mb-2">Total Project — Estimated</div>
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 font-data">$23,250</div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-3">
          Do-Not-Exceed Cap: $28,000
        </div>
        <div className="text-xs text-zinc-400">
          one-time, milestone-billed  ·  <span className="text-gable-green">+ $250–$800/mo recurring</span> (tier of your choice)
        </div>
      </motion.div>

      {/* Line items */}
      <div className="space-y-3 mb-12">
        {LINE_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-5 border-white/5 flex items-start gap-4 hover:border-gable-green/20 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
              <item.icon size={18} className="text-gable-green" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-white mb-1">{item.name}</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed">{item.breakdown}</p>
              {item.bonus && (
                <div className="mt-2 inline-flex items-start gap-2 px-2.5 py-1.5 rounded-lg bg-gable-green/10 border border-gable-green/30">
                  <Sparkles size={11} className="text-gable-green shrink-0 mt-0.5" />
                  <span className="text-[10px] text-gable-green/90 leading-snug font-medium">{item.bonus}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col items-end shrink-0 self-center gap-1">
              <div className="text-2xl font-bold text-gable-green font-data">{item.amount}</div>
              {item.bonus && (
                <div className="text-[9px] uppercase tracking-widest font-bold text-gable-green/70 whitespace-nowrap">+ $2,250 free</div>
              )}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-5 border border-gable-green/30 bg-gable-green/10 flex items-center justify-between"
        >
          <div>
            <div className="text-sm uppercase tracking-widest font-bold text-gable-green">Project Total — Estimated</div>
            <div className="text-[10px] text-amber-400/80 uppercase tracking-widest font-bold mt-1">Capped at $28,000 not-to-exceed</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white font-data">$23,250</div>
            <div className="text-[10px] text-amber-400/80 font-data">/ $28,000 max</div>
          </div>
        </motion.div>

        {/* NTE explainer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="rounded-2xl p-4 border border-amber-500/20 bg-amber-500/5 flex items-start gap-3 mt-3"
        >
          <Lock size={14} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-200/80 leading-relaxed">
            <span className="font-bold text-amber-300">How the cap works:</span> If approved scope expands during Phase 1, additional work bills against the $4,750 buffer at standard Pro Services rates. Any work beyond the $28,000 cap requires a written change order signed by both parties — protecting Reed from runaway scope.
          </p>
        </motion.div>
      </div>

      {/* Ongoing Partnership — two tiers */}
      <div className="mb-12">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4 text-center">Ongoing Partnership — Reed selects post-launch</h3>
        <div className="grid md:grid-cols-2 gap-5">
          {/* Tier 1: Managed Hosting */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6 border-white/5 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Server size={16} className="text-zinc-400" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Tier 1</span>
              </div>
            </div>
            <h4 className="font-bold text-base text-white mb-1">Managed Hosting</h4>
            <div className="text-3xl font-bold text-white mb-4 font-data">$250<span className="text-sm text-zinc-500 font-sans">/mo</span></div>
            <ul className="space-y-2 text-xs text-zinc-400 mb-4 flex-1">
              <li className="flex items-start gap-2"><span className="text-gable-green mt-1">•</span>DigitalOcean NYC3 droplets + uptime monitoring</li>
              <li className="flex items-start gap-2"><span className="text-gable-green mt-1">•</span><span><strong className="text-white">Daily volume snapshots</strong> (7-day retention)</span></li>
              <li className="flex items-start gap-2"><span className="text-gable-green mt-1">•</span><span>Managed PostgreSQL with <strong className="text-white">PITR</strong> (point-in-time recovery, 7-day window)</span></li>
              <li className="flex items-start gap-2"><span className="text-gable-green mt-1">•</span>Dev/staging environments included</li>
              <li className="flex items-start gap-2"><span className="text-gable-green mt-1">•</span>Reactive bug response (best-effort)</li>
            </ul>
            <div className="pt-3 border-t border-white/5">
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">No SLA</span>
            </div>
          </motion.div>

          {/* Tier 2: Standard MSP — RECOMMENDED */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-2xl p-6 border-gable-green/30 bg-gable-green/5 flex flex-col shadow-glow relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest text-gable-green bg-gable-green/15 px-2 py-1 rounded border border-gable-green/30">
              Recommended
            </div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={16} className="text-gable-green" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-gable-green">Tier 2</span>
            </div>
            <h4 className="font-bold text-base text-white mb-1">Standard MSP</h4>
            <div className="text-3xl font-bold text-white mb-4 font-data">$800<span className="text-sm text-zinc-500 font-sans">/mo</span></div>
            <ul className="space-y-2 text-xs text-zinc-300 mb-4 flex-1">
              <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-gable-green shrink-0 mt-0.5" />Everything in Tier 1</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-gable-green shrink-0 mt-0.5" /><span><strong className="text-white">4 hrs/mo bundled support</strong> (rolls 90 days)</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-gable-green shrink-0 mt-0.5" /><span><strong className="text-white">Extended retention</strong> — 30-day snapshots + offsite backup to DO Spaces</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-gable-green shrink-0 mt-0.5" /><span><strong className="text-white">Quarterly upstream merges</strong> from GableLBM main</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-gable-green shrink-0 mt-0.5" /><span><strong className="text-white">99.9% uptime SLA</strong> (P1 &lt; 4hr / P2 &lt; 1bd / P3 &lt; 3bd)</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-gable-green shrink-0 mt-0.5" />Patch management + priority bug queue</li>
            </ul>
            <div className="pt-3 border-t border-gable-green/20">
              <span className="text-[10px] text-zinc-400 italic">Beyond 4 hrs/mo billed at Pro Services rates ($175 Dev / $225 Architect / $150 PM / $125 Training)</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payment milestones + Founding customer */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-2xl border border-white/5 bg-deep-space/50"
        >
          <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Clock size={14} /> Payment Milestones
          </h4>
          <ul className="space-y-3">
            {MILESTONES.map((m, i) => (
              <li key={i} className="flex items-baseline justify-between text-sm">
                <span className="text-zinc-400">{m.when}</span>
                <span className="font-bold text-gable-green font-data">{m.pct}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-6 rounded-2xl border border-gable-green/20 bg-gable-green/5"
        >
          <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-gable-green">Founding Customer Terms</h4>
          <p className="text-xs text-gable-green/80 leading-relaxed italic">
            "As a founding partner, your implementation rates are locked at the lowest tier shown, and all onboarding fees are waived for the first two years."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
