import { motion } from 'framer-motion';
import { ShieldCheck, Code2, Users, Coins } from 'lucide-react';

export function SlideEngagementModel() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">A New Model for <span className="text-gable-green">Software Partnerships</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">We build the foundation, you own the equity. No vendor lock-in, ever.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-8 border-gable-green/10 bg-gable-green/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gable-green/20 rounded-lg">
              <Code2 size={24} className="text-gable-green" />
            </div>
            <h3 className="text-xl font-bold">You Own the Code</h3>
          </div>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Unlike Bistrack or NetSuite, you aren't renting your ERP. You own the source code.
          </p>
          <ul className="space-y-4">
            {[
              'Full code delivery at each milestone',
              'No recurring licensing fees',
              'Freedom to hire any developer in the future',
              'Full data sovereignty',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                <ShieldCheck size={16} className="text-emerald-500 mt-1 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="glass-card rounded-xl p-6 border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Users size={20} className="text-zinc-400" />
              <h3 className="font-semibold italic">No Per-User Seats</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Add every counter person, yard foreman, driver, and even your contractors without seeing your monthly bill increase.
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-6 border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Coins size={20} className="text-zinc-400" />
              <h3 className="font-semibold italic">Zero Hidden Fees</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Transparency by default. You pay for infrastructure costs and implementation effort - not "modules" or "access".
            </p>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 p-4 rounded-xl bg-white/5 border border-white/10 text-center"
      >
        <span className="text-sm text-zinc-500 italic">
          "The last ERP you'll ever buy. Own your platform, own your future."
        </span>
      </motion.div>
    </div>
  );
}
