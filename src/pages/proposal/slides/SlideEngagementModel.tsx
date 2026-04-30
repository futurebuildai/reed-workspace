import { motion } from 'framer-motion';
import { ShieldCheck, Code2, Users, Coins, Footprints, Activity, Zap } from 'lucide-react';

export function SlideEngagementModel() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">A New Model for <span className="text-gable-green">Software Partnerships</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">We build the foundation, you own the equity. No vendor lock-in, ever.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-8 border-gable-green/10 bg-gable-green/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gable-green/20 rounded-lg">
              <Code2 size={24} className="text-gable-green" />
            </div>
            <h3 className="text-xl font-bold">You Own the Code</h3>
          </div>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Unlike QuickBooks Enterprise, NetSuite, or any SaaS ERP, you aren't renting. You own the source code.
          </p>
          <ul className="space-y-4">
            {[
              'Full code delivery at each milestone',
              'No recurring licensing fees',
              'Freedom to hire any developer in the future',
              'Full data sovereignty',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                <ShieldCheck size={16} className="text-emerald-500 mt-1 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="glass-card rounded-xl p-6 border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Users size={20} className="text-zinc-400" />
              <h3 className="font-semibold italic">No Per-User Seats</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Add every counter person, yard foreman, driver, and even your contractors without seeing your monthly bill increase.
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-6 border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Coins size={20} className="text-zinc-400" />
              <h3 className="font-semibold italic">Zero Hidden Fees</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Transparency by default. You pay for infrastructure costs and implementation effort - not "modules" or "access".
            </p>
          </div>
        </div>
      </div>

      {/* Crawl / Walk / Run pacing strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10"
      >
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3 text-center">
          How we phase the work — Crawl · Walk · Run
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/5 bg-deep-space/40 p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <Footprints size={16} className="text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-0.5">Crawl · Phase 0</div>
              <div className="text-sm font-bold text-white mb-1">Discovery</div>
              <p className="text-[11px] text-zinc-400 leading-snug">$500 setup + $500/mo dev/staging/AI · 10 free Sr Architect hrs</p>
            </div>
          </div>
          <div className="rounded-xl border border-gable-green/30 bg-gable-green/10 p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-gable-green/20 flex items-center justify-center shrink-0">
              <Activity size={16} className="text-gable-green" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest font-bold text-gable-green mb-0.5">Walk · Phase 1</div>
              <div className="text-sm font-bold text-white mb-1">Parity Go-Live</div>
              <p className="text-[11px] text-zinc-300 leading-snug">$18,600 · 10–12 weeks · daily ops running on GableLBM</p>
            </div>
          </div>
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
              <Zap size={16} className="text-purple-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest font-bold text-purple-300 mb-0.5">Run · Phase 2</div>
              <div className="text-sm font-bold text-white mb-1">Deeper Features</div>
              <p className="text-[11px] text-zinc-400 leading-snug">Reed picks modules quarterly · no commitment up front</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-center"
      >
        <span className="text-sm text-zinc-500 italic">
          "The last ERP you'll ever buy. Own your platform, own your future."
        </span>
      </motion.div>
    </div>
  );
}
