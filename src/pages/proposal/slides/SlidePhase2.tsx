import { motion } from 'framer-motion';
import { Zap, Receipt, Sparkles, Tag, BarChart3, Lock, Radio, Globe, ArrowRight } from 'lucide-react';

const PHASE_2_MENU = [
  {
    icon: Receipt,
    name: 'AIA G702/G703 Progress Billing',
    why: 'Standard for $10M+ commercial contracts. Eliminates manual schedule of values.',
  },
  {
    icon: Sparkles,
    name: 'AI Categorization + Reorder Predictions',
    why: 'Auto-categorize new SKUs from vendor catalogs. Predict reorder points from usage history.',
  },
  {
    icon: Tag,
    name: 'Pricing Rules & Tier Configurator',
    why: 'Configurable tiers by customer/volume/project. Margin floor enforcement + override approvals.',
  },
  {
    icon: BarChart3,
    name: 'Advanced BI Dashboards',
    why: 'Sales by rep/customer/region. Vendor margin analysis. Cash-flow forecast.',
  },
  {
    icon: Lock,
    name: 'SSO (Google / Microsoft)',
    why: 'Centralized identity once Reed picks an IDP. Replaces per-user passwords.',
  },
  {
    icon: Radio,
    name: 'RFID Inventory Tagging',
    why: 'Pallet-level real-time inventory. Eliminates physical counts on high-velocity SKUs.',
  },
  {
    icon: Globe,
    name: 'Contractor Self-Serve Portal',
    why: 'GCs see open POs, invoice status, delivery ETAs without calling Reed\'s office. Scoped to Reed\'s preferences (read-only vs. transactional, branding, GC onboarding flow).',
    custom: true,
  },
];

export function SlidePhase2() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-purple-500/30">
          <Zap size={12} /> Run · Phase 2 — Deeper Features (Deferred Menu)
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Add What You <span className="text-purple-400">Actually Need</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          No commitment to Phase 2 until Reed is live and using the system. Pick modules quarterly based on real operational pain — not assumptions on paper. Most features land in the <span className="text-purple-300">$2K–$3K range each in dev hours</span>; most customers commit to 2–3 modules in their first 12 months.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {PHASE_2_MENU.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-purple-500/15 bg-purple-500/[0.04] p-4 flex items-start gap-3 hover:border-purple-500/40 hover:bg-purple-500/[0.08] transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center shrink-0">
              <item.icon size={16} className="text-purple-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 mb-1">
                <h3 className="font-bold text-sm text-white">{item.name}</h3>
                {item.custom && (
                  <span className="text-[9px] font-bold uppercase tracking-widest text-purple-300/80 shrink-0 whitespace-nowrap">Custom scope</span>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug">{item.why}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4"
        >
          <div className="text-[10px] uppercase tracking-widest font-bold text-purple-300 mb-1">Most Modules</div>
          <div className="text-2xl font-bold text-white font-data">~$2K – $3K</div>
          <div className="text-[10px] text-zinc-500 mt-1">in dev hours each · contractor portal scoped to preferences</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-2xl border border-white/5 bg-deep-space/50 p-4"
        >
          <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1">Typical 12mo</div>
          <div className="text-2xl font-bold text-white font-data">$6K – $9K</div>
          <div className="text-[10px] text-zinc-500 mt-1">Across 2–3 modules</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border border-white/5 bg-deep-space/50 p-4"
        >
          <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1">Cadence</div>
          <div className="text-2xl font-bold text-white font-data">Quarterly</div>
          <div className="text-[10px] text-zinc-500 mt-1">Reed picks priorities each Q</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-4 rounded-2xl border border-gable-green/20 bg-gable-green/5 flex items-start gap-3"
      >
        <ArrowRight size={16} className="text-gable-green shrink-0 mt-0.5" />
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          <span className="font-bold text-gable-green">24-month rate lock:</span> Phase 1 hourly rates ($225 LA / $175 Eng / $125 Trainer) hold for any Phase 2 work for 24 months — even if FutureBuild AI raises standard rates in the meantime.
        </p>
      </motion.div>
    </div>
  );
}
