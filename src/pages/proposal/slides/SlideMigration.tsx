import { motion } from 'framer-motion';
import { Database, Zap, Search } from 'lucide-react';

export function SlideMigration() {
  const workflows = [
    { title: 'Schema Discovery', desc: 'Auto-maps BisTrack tables/fields' },
    { title: 'Data Quality Audit', desc: 'Identifies duplicates & orphans' },
    { title: 'Iterative ETL', desc: 'Runs daily during sandbox' },
    { title: 'Validation Engine', desc: '100% record-level verification' },
  ];

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">AI-Powered <span className="text-stone-amber">Migration Engine</span></h2>
            <p className="text-zinc-500 leading-relaxed max-w-xl">
              Don't manually map spreadsheets. We deploy custom Claude Code agents that understand the BisTrack schema to automate mapping and validation.
            </p>
          </div>

          <div className="space-y-4">
            {workflows.map((w, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 group hover:border-stone-amber/20 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-amber/10 flex items-center justify-center shrink-0 group-hover:bg-stone-amber/20 transition-all">
                  <Database size={20} className="text-stone-amber" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-none mb-1">{w.title}</h4>
                  <p className="text-[11px] text-zinc-500">{w.desc}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-zinc-600 font-mono italic">AGENTIFIED</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[450px] space-y-6">
          <div className="glass-card rounded-2xl p-8 border-white/5 relative bg-gradient-to-br from-deep-earth to-slate-warm shadow-elevation-2">
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <Zap size={18} className="text-stone-amber" />
              <h3 className="font-bold uppercase tracking-widest text-[10px] text-zinc-400">Migration Logic - Visualized</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="h-6 w-32 bg-white/5 rounded animate-pulse" />
              </div>
              <div className="ml-1.25 border-l border-dashed border-zinc-800 h-8" />
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-amber shadow-glow" />
                <div className="h-6 w-48 bg-stone-amber/10 border border-stone-amber/20 rounded flex items-center px-2 text-[10px] font-mono text-stone-amber">
                  AUTO_MAP_PROPERTY_LBM_TO_HARD
                </div>
              </div>
              <div className="ml-1.25 border-l border-dashed border-zinc-800 h-8" />
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <div className="h-6 w-40 bg-emerald-500/10 border border-emerald-500/20 rounded flex items-center px-2 text-[10px] font-mono text-emerald-500">
                  RECONCILIATION_PENNY_PERFECT
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 mb-2">
                <span>Migration Progress</span>
                <span>84%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[84%] bg-stone-amber shadow-glow" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-stone-amber/10 bg-stone-amber/5 flex items-center gap-3">
            <Search size={20} className="text-stone-amber" />
            <p className="text-[10px] text-zinc-400 italic">
              "Our agents handle the 'dirty work' of SQL Server schema discovery, finding custom fields NetSuite would miss."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
