import { Power, ArrowRight, CheckCircle2 } from 'lucide-react';

export function SlideReplacement() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Consolidating Your <span className="text-gable-green">Core Stack</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">One integrated system replaces multiple siloed legacy tools.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/5 opacity-60 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                <Power size={20} className="text-zinc-500" />
              </div>
              <div>
                <h4 className="font-bold">Clover POS</h4>
                <p className="text-xs text-zinc-500">Retail Sales</p>
              </div>
            </div>
            <XIcon size={20} className="text-red-500/50" />
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/5 opacity-60 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                <Power size={20} className="text-zinc-500" />
              </div>
              <div>
                <h4 className="font-bold">QuickBooks</h4>
                <p className="text-xs text-zinc-500">Accounting & GL</p>
              </div>
            </div>
            <XIcon size={20} className="text-red-500/50" />
          </div>

          <div className="flex justify-center py-2">
            <ArrowRight size={32} className="text-gable-green/50 rotate-90 md:rotate-0" />
          </div>

          <div className="p-6 rounded-2xl border border-gable-green/30 bg-gable-green/5 shadow-glow flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gable-green/20 flex items-center justify-center">
                <CheckCircle2 size={24} className="text-gable-green" />
              </div>
              <div>
                <h4 className="font-bold text-lg">GableLBM Platform</h4>
                <p className="text-xs text-gable-green uppercase font-bold tracking-widest">Unified Cloud ERP + POS</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 border-gable-green/20 bg-gradient-to-br from-gable-green/5 to-transparent relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500">Target ROI</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4 pr-16 text-gable-green">Why GableLBM & FutureBuildAI?</h3>
          <p className="text-sm text-zinc-300 leading-relaxed mb-6">
            Unlike traditional ERPs where you rent software and pay for every customization, the <strong>FutureBuildAI team</strong> uses our <strong>GableLBM open-source core</strong> as a massive head start. We fork the core repo, give you the keys, and use AI-driven development to build your exact required workflows at a fraction of the cost.
          </p>
          <div className="space-y-4">
            <div className="bg-deep-space/50 rounded-xl p-4 border border-white/5">
              <h4 className="font-bold text-lg text-emerald-400 mb-1">Modernization Strategy</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Our goal is to replace your QuickBooks and Clover POS silo with a unified cloud operation, avoiding per-seat licensing, bolt-on subscription tools, and expensive vendor professional services.
              </p>
            </div>
            <div className="bg-deep-space/50 rounded-xl p-4 border border-white/5">
              <h4 className="font-bold text-sm text-zinc-200 mb-1">Massive Down The Road Savings</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Even higher savings occur down the road once custom features are implemented and the ecosystem has been tested in real life and optimized for Reed Building Materials.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function XIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
