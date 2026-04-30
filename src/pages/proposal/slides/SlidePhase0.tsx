import { motion } from 'framer-motion';
import { Layers, CheckCircle2, Search, Footprints, Sparkles, Server, Clock, Eye } from 'lucide-react';

const TIMELINE_STEPS = [
  { week: 'Week 1', title: 'Setup', desc: 'Repo provisioning · dev/staging environments online · AI services live · access provisioned' },
  { week: 'Weeks 2–3', title: 'Discovery + Scoping', desc: 'Workflow audit · QB chart of accounts mapped · Phase 1 build plan locked using the included 10 Sr Architect hrs' },
];

const MODULES = [
  { name: 'Workflow Discovery Audit', desc: 'Mapping QuickBooks/Clover processes to GableLBM workflows' },
  { name: 'Dev / Staging Environments — 24/7 Reed Access', desc: 'Spun up day one. Reed leadership + team watch the build daily/weekly and feed back early — not surprised at go-live' },
  { name: 'AI Service Layer Provisioned', desc: 'Categorization endpoints + agent runtimes ready for Phase 1' },
  { name: '10 Sr Architect Hours Included', desc: '$2,250 value — sufficient to fully scope and lock the Phase 1 build plan' },
];

export function SlidePhase0() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gable-green/20 text-gable-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-gable-green/30">
          <Footprints size={12} /> Crawl · Phase 0 — Setup &amp; Discovery
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Blueprint &amp; <span className="text-gable-green">Environment Setup</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm leading-relaxed">
          1 week of setup followed by 2–3 weeks of discovery. Reed gets a fully scoped Phase 1 plan and live infrastructure on day one — no big surprises during the build.
        </p>
      </div>

      {/* Pricing pair */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-gable-green/30 bg-gable-green/10 p-5"
        >
          <div className="text-[10px] uppercase tracking-widest font-bold text-gable-green mb-2 flex items-center gap-2">
            <Sparkles size={12} /> One-Time Setup
          </div>
          <div className="text-3xl font-bold text-white font-data mb-2">$500</div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Project kickoff fee. Covers initial provisioning + the dedicated Sr Architect hours allocation. Rolls into nothing — this is the entry ticket.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2 flex items-center gap-2">
            <Server size={12} /> During Implementation
          </div>
          <div className="text-3xl font-bold text-white font-data mb-2">$500<span className="text-base text-zinc-500 font-sans">/mo</span></div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Flat monthly while we build (~3–4 months). Covers dev/staging environments + AI service runtime. After go-live, switches to the Managed Hosting tier of Reed's choice ($250 or $800/mo).
          </p>
          <p className="text-[10px] text-amber-200/70 leading-relaxed mt-2 pt-2 border-t border-white/5">
            <span className="font-bold text-amber-300">Note:</span> AI features leverage model APIs (OpenAI/Anthropic/Vertex) billed as-incurred. Expect <span className="text-white font-semibold">&lt; $100/mo</span> for typical usage (excluding deep product enrichment runs).
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 rounded-2xl border border-white/5 bg-deep-space/40 p-4"
      >
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3 flex items-center gap-2">
          <Clock size={12} /> Phase 0 Timeline — 3–4 weeks total
        </h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {TIMELINE_STEPS.map((step, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-deep-space/60 p-3">
              <div className="text-[10px] uppercase tracking-widest font-bold text-gable-green mb-1">{step.week}</div>
              <div className="text-sm font-bold text-white mb-1">{step.title}</div>
              <p className="text-[11px] text-zinc-400 leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Transparency callout — additional billable scoping hours */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/[0.05] p-5"
      >
        <div className="flex items-start gap-3">
          <Eye size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-amber-300 mb-2 uppercase tracking-widest">Scoping Transparency Note</h4>
            <p className="text-[12px] text-zinc-200 leading-relaxed mb-3">
              The <span className="font-bold text-white">10 included Sr Architect hours</span> should be sufficient to lock Phase 1 scope for our engineering team in most cases. <span className="text-amber-200">However, depending on the goals Reed sets for Phase 1</span>, we recommend Reed be comfortable with up to <span className="font-bold text-white">~10 additional billable scoping hours (~$2,250 at $225/hr)</span> during this phase.
            </p>
            <div className="grid sm:grid-cols-3 gap-2 mb-3">
              <div className="rounded-lg bg-deep-space/60 border border-white/5 p-2.5">
                <div className="text-[9px] uppercase tracking-widest font-bold text-emerald-400/80 mb-0.5">Included</div>
                <div className="text-sm text-white font-mono">10 hrs · $0</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">in Phase 0 fee</div>
              </div>
              <div className="rounded-lg bg-deep-space/60 border border-white/5 p-2.5">
                <div className="text-[9px] uppercase tracking-widest font-bold text-amber-400/80 mb-0.5">Recommended Buffer</div>
                <div className="text-sm text-white font-mono">+ up to 10 hrs</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">~$2,250 if needed</div>
              </div>
              <div className="rounded-lg bg-deep-space/60 border border-white/5 p-2.5">
                <div className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 mb-0.5">Hard Cap</div>
                <div className="text-sm text-white font-mono">Approved in writing</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">no surprise billing</div>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed italic">
              Any work beyond the 10 included hours is approved in writing before it's billed. We're flagging this upfront so there's full transparency — not as a gotcha later.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {MODULES.map((m, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.06 }}
            className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-start gap-3 group hover:border-gable-green/20 transition-all"
          >
            <CheckCircle2 size={16} className="text-gable-green/60 group-hover:text-gable-green shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white">{m.name}</h4>
              <p className="text-[11px] text-zinc-500 leading-snug">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid md:grid-cols-2 gap-4 mb-6"
      >
        <div className="p-4 rounded-2xl border border-gable-green/15 bg-gable-green/5 flex items-start gap-3">
          <Search size={16} className="text-gable-green shrink-0 mt-0.5" />
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            <span className="text-gable-green font-bold">Goal of Phase 0:</span> Reed enters Phase 1 with zero ambiguity about how QuickBooks data maps to GableLBM, what's in scope, and what's deferred to Phase 2.
          </p>
        </div>
        <div className="p-4 rounded-2xl border border-white/5 bg-deep-space/40 flex items-start gap-3">
          <Layers size={16} className="text-zinc-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            <span className="text-white font-bold">Why a flat $500/mo during build?</span> No surprise infrastructure bills. Reed knows exactly what implementation costs from kickoff to go-live.
          </p>
        </div>
      </motion.div>

      {/* Total during Phase 0 + Phase 1 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-4 flex items-start gap-3"
      >
        <Server size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-200/80 leading-relaxed">
          <span className="font-bold text-amber-300">Pre-launch infra total:</span> $500 setup + ~3–4 months × $500 = <span className="font-bold text-white">$2,000–$2,500 across all of Phase 0 + Phase 1</span>. After go-live, this drops to $250/mo (Tier 1) or $800/mo (Tier 2 with SLA).
        </p>
      </motion.div>
    </div>
  );
}
