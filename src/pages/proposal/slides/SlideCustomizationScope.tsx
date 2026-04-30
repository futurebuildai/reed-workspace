import { motion } from 'framer-motion';
import {
  FileText,
  ShoppingCart,
  Package,
  Receipt,
  Truck,
  Plug,
  BarChart3,
  Tag,
  Users,
} from 'lucide-react';

type Phase = 'P1' | 'P2' | 'BOTH';

const BUCKETS: Array<{
  icon: typeof FileText;
  title: string;
  phase: Phase;
  items: Array<{ text: string; p2?: boolean }>;
}> = [
  {
    icon: FileText,
    title: 'Sales & Quoting',
    phase: 'P1',
    items: [
      { text: 'Bid prep and multi-line quote building' },
      { text: 'Pricing tier application at quote time' },
      { text: 'Quote → PO → invoice conversion workflow' },
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Order Management',
    phase: 'P1',
    items: [
      { text: 'On-account ordering (~95% of GMV)' },
      { text: 'Project-tied POs and milestones' },
      { text: 'Backorder + partial-ship handling' },
    ],
  },
  {
    icon: Package,
    title: 'Inventory & Procurement',
    phase: 'P1',
    items: [
      { text: 'SKU import from QuickBooks Enterprise' },
      { text: 'Multi-vendor SKU mapping' },
      { text: 'Reorder thresholds + supplier lead times' },
    ],
  },
  {
    icon: Receipt,
    title: 'Accounts Receivable',
    phase: 'BOTH',
    items: [
      { text: 'Monthly statements + emailed invoices' },
      { text: 'A/R aging + collections workflow' },
      { text: 'AIA G702/G703 progress billing', p2: true },
    ],
  },
  {
    icon: Truck,
    title: 'Logistics & Delivery',
    phase: 'P1',
    items: [
      { text: 'Truck dispatch + driver app' },
      { text: 'Delivery tickets + electronic POD' },
    ],
  },
  {
    icon: Plug,
    title: 'QuickBooks Integration & Migration',
    phase: 'BOTH',
    items: [
      { text: 'Phase 1: QuickBooks stays source of truth · bi-directional sync with GableLBM' },
      { text: 'Run Payments wired (POS + on-account + ACH)' },
      { text: 'Phase 2+: migrate QB workloads natively into GableLBM (GableLBM becomes SOT)', p2: true },
    ],
  },
  {
    icon: BarChart3,
    title: 'Reporting & BI',
    phase: 'BOTH',
    items: [
      { text: 'Sales by rep / customer / region' },
      { text: 'A/R aging dashboards' },
      { text: 'Vendor margin analysis + cash-flow forecast', p2: true },
    ],
  },
  {
    icon: Tag,
    title: 'Pricing Rules & Tier Configurator',
    phase: 'P2',
    items: [
      { text: 'Configurable price tiers by customer, volume, or project' },
      { text: 'Product category pricing rules + margin floor enforcement' },
      { text: 'Override workflow with approval controls' },
    ],
  },
  {
    icon: Users,
    title: 'Roles & Permissions',
    phase: 'BOTH',
    items: [
      { text: 'Owner / Sales / Yard / Office / Driver tiers' },
      { text: 'Reed-tailored role definitions' },
      { text: 'SSO (Google/Microsoft)', p2: true },
    ],
  },
];

const PHASE_BADGE: Record<Phase, { label: string; class: string }> = {
  P1: { label: 'Phase 1 · Walk', class: 'bg-gable-green/15 text-gable-green border-gable-green/30' },
  P2: { label: 'Phase 2 · Run', class: 'bg-purple-500/15 text-purple-300 border-purple-500/30' },
  BOTH: { label: 'P1 + P2', class: 'bg-white/5 text-zinc-400 border-white/10' },
};

export function SlideCustomizationScope() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gable-green/20 text-gable-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-gable-green/30">
          Customization Scope — Reed Building Supply
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">What Scoping + Customization Will <span className="text-gable-green">Address</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          Nine operational buckets we'll fork from GableLBM main and tailor to Reed's commercial-supply workflows. <span className="text-gable-green">Phase 0</span> locks the per-bucket scope using the included 10 Senior Architect hours. <span className="text-gable-green">Phase 1</span> builds against that locked plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {BUCKETS.map((bucket, i) => {
          const badge = PHASE_BADGE[bucket.phase];
          return (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.06 }}
              className="glass-card rounded-2xl p-5 border-white/5 flex flex-col group hover:border-gable-green/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-gable-green/10 transition-colors shrink-0">
                  <bucket.icon size={18} className="text-zinc-400 group-hover:text-gable-green transition-colors" />
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${badge.class} whitespace-nowrap`}>
                  {badge.label}
                </span>
              </div>
              <h3 className="font-bold text-sm text-white mb-3">{bucket.title}</h3>
              <ul className="space-y-1.5 text-[11px] text-zinc-400 leading-snug flex-1">
                {bucket.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-1.5">
                    <span className={item.p2 ? 'text-purple-400 mt-0.5' : 'text-gable-green mt-0.5'}>•</span>
                    <span className="flex-1">
                      {item.text}
                      {item.p2 && (
                        <span className="ml-1.5 text-[9px] font-bold uppercase tracking-widest text-purple-300/70">P2</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3"
      >
        <BarChart3 size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-200/80 leading-relaxed">
          <span className="font-bold text-amber-300">Why these buckets?</span> Reed's profile (single-location commercial supply, $10M+ avg contracts, ~95% on-account billing, 1 own truck + 3rd-party freight) drives a different feature mix than GableLBM's default retail-yard configuration. POS-heavy features stay available but de-prioritized; commercial billing + project tracking + integrations get the focus.
        </p>
      </motion.div>
    </div>
  );
}
