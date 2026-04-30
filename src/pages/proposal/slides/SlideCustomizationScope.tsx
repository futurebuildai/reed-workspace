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

const BUCKETS = [
  {
    icon: FileText,
    title: 'Sales & Quoting',
    items: [
      'Bid prep and multi-line quote building',
      'Pricing tier application at quote time',
      'Quote → PO → invoice conversion workflow',
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Order Management',
    items: [
      'On-account ordering (~95% of GMV)',
      'Project-tied POs and milestones',
      'Backorder + partial-ship handling',
    ],
  },
  {
    icon: Package,
    title: 'Inventory & Procurement',
    items: [
      '3,000–5,000 SKU import from QB Enterprise',
      'Multi-vendor SKU mapping',
      'Reorder thresholds + supplier lead times',
    ],
  },
  {
    icon: Receipt,
    title: 'Accounts Receivable',
    items: [
      'AIA G702/G703 progress billing',
      'Monthly statements + emailed invoices',
      'A/R aging + collections workflow',
    ],
  },
  {
    icon: Truck,
    title: 'Logistics & Delivery',
    items: [
      'Single-truck dispatch + driver app',
      '3rd-party freight broker handoff',
      'Delivery tickets + electronic POD',
    ],
  },
  {
    icon: Plug,
    title: 'Integrations & Migration',
    items: [
      'QuickBooks parallel execution during transition — live sync, not big-bang cutover',
      'Freight carrier portal integration',
      'Long-term: embed QB functionality natively in GableLBM — eliminating the external dependency',
    ],
  },
  {
    icon: BarChart3,
    title: 'Reporting & BI',
    items: [
      'Sales by rep / customer / region',
      'Vendor margin analysis',
      'Cash-flow forecast + A/R aging dashboards',
    ],
  },
  {
    icon: Tag,
    title: 'Pricing Rules & Tier Configurator',
    items: [
      'Configurable price tiers by customer, volume, or project',
      'Product category pricing rules + margin floor enforcement',
      'Override workflow with approval controls',
    ],
  },
  {
    icon: Users,
    title: 'Roles & Permissions',
    items: [
      'Reed-tailored role definitions',
      'Owner / Sales / Yard / Office / Driver tiers',
      'SSO-ready (Google/Microsoft) for Phase 2',
    ],
  },
];

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
        {BUCKETS.map((bucket, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card rounded-2xl p-5 border-white/5 flex flex-col group hover:border-gable-green/30 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-gable-green/10 transition-colors">
              <bucket.icon size={18} className="text-zinc-400 group-hover:text-gable-green transition-colors" />
            </div>
            <h3 className="font-bold text-sm text-white mb-3">{bucket.title}</h3>
            <ul className="space-y-1.5 text-[11px] text-zinc-400 leading-snug flex-1">
              {bucket.items.map((item, j) => (
                <li key={j} className="flex items-start gap-1.5">
                  <span className="text-gable-green mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
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
