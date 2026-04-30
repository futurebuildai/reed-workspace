import { motion } from 'framer-motion';
import { Activity, CheckCircle2, Package, ShoppingCart, FileText, Receipt, Truck, Users, Database, CreditCard } from 'lucide-react';

const PARITY_MODULES = [
  {
    icon: Database,
    name: 'Data Migration',
    items: ['SKU + customer + vendor import from QB Enterprise', 'Live parallel sync (no big-bang cutover)'],
  },
  {
    icon: Package,
    name: 'Inventory & Procurement',
    items: ['Core item master (3K–5K SKUs)', 'Reorder thresholds + supplier lead times'],
  },
  {
    icon: FileText,
    name: 'Quoting & Sales',
    items: ['Bid prep + multi-line quote building', 'Pricing tier application at quote time'],
  },
  {
    icon: ShoppingCart,
    name: 'Order Management',
    items: ['Quote → PO → invoice conversion workflow', 'Project-tied POs + on-account ordering'],
  },
  {
    icon: CreditCard,
    name: 'POS + Payments',
    items: ['POS terminal replacing Clover', 'Run Payments wired (card-present + on-account card-on-file)'],
  },
  {
    icon: Receipt,
    name: 'Invoicing & AR (basic)',
    items: ['Monthly statements + emailed invoices', 'A/R aging + collections workflow'],
  },
  {
    icon: Truck,
    name: 'Logistics (basic)',
    items: ['Truck dispatch + driver app', 'Delivery tickets + electronic POD'],
  },
  {
    icon: Users,
    name: 'Roles & Permissions',
    items: ['Owner / Sales / Yard / Office / Driver tiers', 'Reed-tailored role definitions'],
  },
];

export function SlidePhase1() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gable-green/20 text-gable-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-gable-green/30">
          <Activity size={12} /> Walk · Phase 1 — Parity Go-Live
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Replace QuickBooks &amp; Clover, <span className="text-gable-green">Day One</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          Phase 1 covers Reed's daily operations — nothing more, nothing less. Get off the legacy stack with all core workflows running. Deeper features wait for Phase 2 once Reed sees real usage.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PARITY_MODULES.map((module, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card rounded-2xl p-4 border-white/5 flex flex-col group hover:border-gable-green/30 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-gable-green/10 flex items-center justify-center mb-3">
              <module.icon size={16} className="text-gable-green" />
            </div>
            <h3 className="font-bold text-xs text-white mb-2">{module.name}</h3>
            <ul className="space-y-1 text-[10px] text-zinc-400 leading-snug flex-1">
              {module.items.map((item, j) => (
                <li key={j} className="flex items-start gap-1.5">
                  <CheckCircle2 size={9} className="text-gable-green/70 shrink-0 mt-[3px]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-gable-green/30 bg-gable-green/10 p-4"
        >
          <div className="text-[10px] uppercase tracking-widest font-bold text-gable-green mb-1">Phase 1 Net</div>
          <div className="text-2xl font-bold text-white font-data">$16,500</div>
          <div className="text-[10px] text-gable-green/80 mt-1">After Run Payments referral credit</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-2xl border border-white/5 bg-deep-space/50 p-4"
        >
          <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1">Timeline</div>
          <div className="text-2xl font-bold text-white font-data">~8 weeks</div>
          <div className="text-[10px] text-zinc-500 mt-1">From Phase 0 sign-off to go-live</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border border-white/5 bg-deep-space/50 p-4"
        >
          <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1">Onsite</div>
          <div className="text-2xl font-bold text-white font-data">2 days</div>
          <div className="text-[10px] text-zinc-500 mt-1">McKees Rocks cutover + training</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3"
      >
        <CreditCard size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-200/80 leading-relaxed">
          <span className="font-bold text-amber-300">Why parity-first?</span> Reed's day-to-day keeps running — no broken workflows on go-live day. Advanced features (AIA billing, AI categorization, RFID, Pricing Tier Configurator, advanced BI, SSO, contractor portal) move to Phase 2 where Reed picks priorities based on real-world usage from Phase 1, not assumptions on paper.
        </p>
      </motion.div>
    </div>
  );
}
