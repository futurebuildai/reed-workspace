import { useState } from 'react';
import { Check, Shield, Server, Headphones, Info } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface ServiceTier {
  id: string;
  name: string;
  price: number;
  icon: any;
  features: string[];
}

const HOSTING_TIERS: ServiceTier[] = [
  { id: 'h-std', name: 'Standard Hosting', price: 250, icon: Server, features: ['Daily snapshots', 'Multi-tenant cloud', 'Standard SLA'] },
  { id: 'h-pro', name: 'Pro Hosting (HA)', price: 450, icon: Server, features: ['HA cluster', 'Dedicated resources', 'Priority failover'] },
];

const SUPPORT_TIERS: ServiceTier[] = [
  { id: 's-lit', name: 'Lite Support', price: 300, icon: Headphones, features: ['Business hours email', '48hr response', 'Wiki access'] },
  { id: 's-pro', name: 'Pro Support', price: 600, icon: Headphones, features: ['Priority tickets', '4hr response', 'Dedicated CSM'] },
];

const MAINTENANCE_TIERS: ServiceTier[] = [
  { id: 'm-sec', name: 'Security Only', price: 150, icon: Shield, features: ['Patch management', 'Audit logging', 'CVE scans'] },
  { id: 'm-ful', name: 'Platform Evolution', price: 300, icon: Shield, features: ['Wiki updates', 'Minor feature tweaks', 'Perf tuning'] },
];

export function SlideManagedServices() {
  const [selected, setSelected] = useState<Record<string, string>>({
    hosting: 'h-std',
    support: 's-pro',
    maintenance: 'm-sec'
  });

  const tiers = {
    hosting: HOSTING_TIERS,
    support: SUPPORT_TIERS,
    maintenance: MAINTENANCE_TIERS
  };

  const calculateTotal = () => {
    let total = 0;
    Object.entries(selected).forEach(([category, id]) => {
      const tier = (tiers as any)[category].find((t: any) => t.id === id);
      if (tier) total += tier.price;
    });
    return total;
  };

  const total = calculateTotal();

  return (
    <div className="w-full max-w-6xl">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">Build Your <span className="text-gable-green">Managed Service Package</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">Choose the service levels that fit Reed Lumber' operational comfort.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 items-start">
        {Object.entries(tiers).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 px-2">{category}</h3>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(prev => ({ ...prev, [category]: item.id }))}
                className={cn(
                  "w-full text-left p-5 rounded-2xl border transition-all relative overflow-hidden group",
                  selected[category] === item.id 
                    ? "bg-gable-green/10 border-gable-green shadow-glow" 
                    : "bg-white/2 border-white/5 hover:border-white/20"
                )}
              >
                {selected[category] === item.id && (
                  <div className="absolute top-0 right-0 p-2 text-gable-green">
                    <Check size={16} />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    "p-2 rounded-lg",
                    selected[category] === item.id ? "bg-gable-green/20" : "bg-white/5"
                  )}>
                    <item.icon size={18} className={selected[category] === item.id ? "text-gable-green" : "text-zinc-500"} />
                  </div>
                  <div>
                    <h4 className={cn("text-sm font-bold", selected[category] === item.id ? "text-white" : "text-zinc-400")}>
                      {item.name}
                    </h4>
                    <span className="text-xs font-bold text-gable-green/80">${item.price}/mo</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {item.features.map((f, i) => (
                    <li key={i} className="text-[10px] text-zinc-500 flex items-start gap-1.5 leading-tight">
                      <div className="w-1 h-1 rounded-full bg-zinc-700 mt-1 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        ))}

        {/* Summary Card */}
        <div className="lg:sticky lg:top-0 space-y-6">
          <div className="glass-card rounded-3xl p-8 border-gable-green/20 shadow-elevation-3 bg-gable-green/5">
            <h3 className="text-lg font-bold mb-6">Service Summary</h3>
            
            <div className="space-y-4 mb-8">
              {Object.entries(selected).map(([category, id]) => {
                const tier = (tiers as any)[category].find((t: any) => t.id === id);
                return (
                  <div key={category} className="flex justify-between items-end border-b border-white/5 pb-2">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-zinc-600 block">{category}</span>
                      <span className="text-xs font-medium text-white">{tier?.name}</span>
                    </div>
                    <span className="text-xs text-zinc-500">${tier?.price}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold">Total Monthly</span>
              <span className="text-2xl font-bold text-gable-green">${total}</span>
            </div>
            <p className="text-[10px] text-zinc-600 text-center mb-6">CAD per month · Cancel anytime</p>

            <div className="p-3 rounded-xl bg-deep-space/50 border border-white/5 flex gap-3">
              <Headphones size={16} className="text-gable-green shrink-0" />
              <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                Support includes technical troubleshooting and operational guidance via private Chat/Phone.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center gap-3">
            <Info size={16} className="text-zinc-500" />
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              * Infrastructure costs are pass-through. If your volume grows significantly, we scale vertically and adjust accordingly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
