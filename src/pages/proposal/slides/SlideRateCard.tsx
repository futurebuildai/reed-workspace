import { motion } from 'framer-motion';
import { DollarSign, Clock, Wrench, LayoutDashboard } from 'lucide-react';

export function SlideRateCard() {
  const rates = [
    { service: 'Implementation & dev', rate: '$175/hr', icon: LayoutDashboard, desc: 'Building features, integrations, migrations' },
    { service: 'Workflows & Config', rate: '$150/hr', icon: Wrench, desc: 'Rules, templates, workflow adjustments' },
    { service: 'Project Management', rate: '$150/hr', icon: Clock, desc: 'Agile management, discovery, QA' },
    { service: 'Support & Training', rate: '$125/hr', icon: DollarSign, desc: 'Live training, go-live assistance' },
  ];

  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Transparent <span className="text-stone-amber">Rate Card</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">No confusing licensing tiers. You pay for effort, not access.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rates.map((r, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-6 border-white/5 flex flex-col group hover:border-stone-amber/30 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-stone-amber/10 transition-colors">
              <r.icon size={20} className="text-zinc-400 group-hover:text-stone-amber" />
            </div>
            <h3 className="font-bold text-sm mb-1">{r.service}</h3>
            <div className="text-2xl font-bold text-stone-amber mb-4">{r.rate}</div>
            <p className="text-[11px] text-zinc-500 leading-relaxed border-t border-white/5 pt-4">
              {r.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl border border-white/5 bg-deep-earth/50">
          <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-zinc-500">How Phases are Quoted</h4>
          <p className="text-xs text-zinc-400 leading-relaxed space-y-4">
            Phase 1 and 2 are provided as **fixed-price estimates** based on the discovery findings. We work against these milestones to ensure budget predictability.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-stone-amber">
            <span>SOW → Implementation → Delivery → Next Phase</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-stone-amber/20 bg-stone-amber/5">
          <h4 className="font-bold text-sm mb-4 uppercase tracking-widest text-stone-amber">Founding Customer Discount</h4>
          <p className="text-xs text-stone-amber/80 leading-relaxed italic">
            "As a founding partner, your implementation rates are locked at the lowest tier, and we waive all onboarding fees for the first two years."
          </p>
        </div>
      </div>
    </div>
  );
}
