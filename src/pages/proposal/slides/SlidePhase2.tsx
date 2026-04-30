import { motion } from 'framer-motion';
import { Sparkles, Globe, Smartphone, BarChart3, Radio } from 'lucide-react';

export function SlidePhase2() {
  const features = [
    { name: 'RFID Integration', icon: Radio, desc: 'Real-time inventory via pallet tags' },
    { name: 'Contractor OS & PM', icon: Globe, desc: 'Integrated, whitelabeled project management for contractors' },
    { name: 'Driver Mobile App', icon: Smartphone, desc: 'Proof of delivery & routing' },
    { name: 'Advanced BI', icon: BarChart3, desc: 'Custom reporting & margin analytics' },
  ];

  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          Enhanced Scale
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Phase 2: <span className="text-purple-400">Operational Excellence</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto italic">
          High-margin workflows that differentiate Reed Building Materials from standard yards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            className="glass-card rounded-2xl p-6 border-white/5 flex flex-col items-center text-center group hover:bg-purple-500/5 hover:border-purple-500/20 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <f.icon size={24} className="text-purple-400" />
            </div>
            <h3 className="font-bold text-lg mb-2">{f.name}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-white/2 rounded-2xl border border-white/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <Sparkles className="text-purple-400/20 w-12 h-12" />
        </div>
        <div className="max-w-2xl">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <span className="text-purple-400 font-mono text-xl">02.</span>
            Digital Yard Transformation
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Phase 2 is where we move beyond table stakes. We deploy an **Integrated and whitelabeled Contractor OS & PM Software** built specifically for your contractors, and wire the **Driver Mobile App** for real-time proof-of-delivery back into accounting.
          </p>
        </div>
      </div>
    </div>
  );
}
