import { motion } from 'framer-motion';
import { LayoutGrid, CheckCircle2, Search } from 'lucide-react';

export function SlidePhase1() {
  const modules = [
    { name: 'Core ERP', desc: 'Inventory, Sales, Purchasing, POS' },
    { name: 'Financials', desc: 'GL, AP, AR, Bank Rec, HST Engine' },
    { name: 'Logistics V1', desc: 'Route Planning, Basic Dispatch' },
    { name: 'Governance', desc: 'RFC workflow, Audit logs' },
    { name: 'Migration V1', desc: 'Schema Mapping & Core ETL' },
    { name: 'Infrastructure', desc: 'Production environment (DO + GCP)' },
  ];

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-gable-green text-deep-space px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Now Building
            </div>
            <h2 className="text-4xl font-bold mb-4">Phase 1: <span className="text-gable-green">The Foundation</span></h2>
            <p className="text-zinc-500 leading-relaxed">
              Everything required to replace your core legacy footprint. No functional gaps from day one of sandbox.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modules.map((m, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-start gap-3 group hover:border-gable-green/20 transition-all"
              >
                <div className="mt-1">
                  <CheckCircle2 size={16} className="text-gable-green/60 group-hover:text-gable-green" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{m.name}</h4>
                  <p className="text-[11px] text-zinc-500">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-gable-green/10 bg-gable-green/5 flex items-center gap-4">
            <Search size={24} className="text-gable-green shrink-0" />
            <p className="text-xs text-zinc-400 italic">
              <span className="text-gable-green font-bold">Discovery Focus:</span> We need to finalize your user permission matrix and custom GL account mapping during Phase 1.
            </p>
          </div>
        </div>

        <div className="w-full md:w-[400px] aspect-square glass-card rounded-3xl p-8 border-gable-green/10 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-gable-green/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <LayoutGrid size={80} className="text-gable-green/20 mb-6 group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-center font-bold text-lg mb-2">Live Parallel Sandbox</h3>
          <p className="text-center text-xs text-zinc-500 leading-relaxed px-4">
            Phase 1 concludes with a fully functional environment synced to your BisTrack data for testing.
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gable-green animate-shimmer bg-[length:1000px_100%]" 
               style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(232,167,78,0.4), transparent)' }} />
        </div>
      </div>
    </div>
  );
}
