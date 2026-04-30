import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ClipboardList, CheckSquare, Search, ArrowRight } from 'lucide-react';

export function SlideChecklist() {
  const steps = [
    { title: 'Technical Discovery', items: ['BisTrack database access verification', 'User count & role permission matrix', 'Multi-location network audit'], status: 'Next 2 Weeks' },
    { title: 'Functional Discovery', items: ['GL account mapping review', 'Manufacturer/Vendor SKU cleanup', 'Custom pricing rule logic definition'], status: 'Next 2 Weeks' },
    { title: 'Commercials', items: ['Phase 1 Statement of Work (SOW)', 'Founding customer agreement signature', 'Project kick-off'], status: 'TBD' },
  ];

  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Discovery <span className="text-gable-green">Next Steps</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto italic">Finalizing the data and requirements needed for a firm Phase 1 quote.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            className="glass-card rounded-2xl p-6 border-white/5 bg-deep-space/30 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                <ClipboardList size={16} className="text-zinc-500" />
              </div>
              <h3 className="font-bold text-sm tracking-tight">{step.title}</h3>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              {step.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 group">
                  <div className="p-0.5 rounded border border-white/10 group-hover:border-gable-green/50 transition-colors mt-0.5">
                    <CheckSquare size={12} className="text-transparent group-hover:text-gable-green/50 transition-colors" />
                  </div>
                  <span className="text-xs text-zinc-400 group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-white/5 text-[10px] text-zinc-600 uppercase tracking-widest font-bold flex items-center justify-between">
              <span>Target</span>
              <span className={step.status !== 'TBD' ? 'text-gable-green' : ''}>{step.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="flex-1 p-6 rounded-2xl border border-gable-green/30 bg-gable-green/5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gable-green/20 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-gable-green">1</span>
          </div>
          <div className="flex-1">
            <h4 className="flex items-center gap-2 font-bold text-sm text-gable-green mb-2">
              <Search size={16} /> Complete Discovery Tracker
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              We have provisioned your Phase 0 discovery room. Please access the interactive audit to complete the technical requirements gathering for Phase 1.
            </p>
            <Link 
              to="/discovery"
              className="inline-flex items-center gap-2 bg-gable-green text-deep-space text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg hover:scale-[1.02] transition-all"
            >
              Begin Phase 0 Discovery <ArrowRight size={12} />
            </Link>
          </div>
        </div>
        
        <div className="hidden md:flex items-center justify-center">
          <ArrowRight size={24} className="text-zinc-700" />
        </div>

        <div className="flex-1 p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-emerald-500">2</span>
          </div>
          <div>
            <h4 className="flex items-center gap-2 font-bold text-sm text-emerald-500 mb-2">
              Commercial Review Call
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Once the tracker is complete, we will schedule a follow-up call to review projected budgetary estimates, finalize implementation timelines, and review contractual language.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
