import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  }),
};

export function Landing() {
  return (
    <div className="min-h-screen bg-deep-space text-white font-sans selection:bg-gable-green/30 selection:text-gable-green overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-deep-space/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8 text-white">
              <path d="M4 36 L32 8 L60 36" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M32 16 V28" stroke="#E8A74E" strokeWidth="4" strokeLinecap="round" />
              <path d="M22 28 C22 28 22 46 32 46 C42 46 42 28 42 28" stroke="#E8A74E" strokeWidth="4" strokeLinecap="round" fill="none" />
              <rect x="28" y="46" width="8" height="6" rx="1" fill="#E8A74E" />
            </svg>
            <span className="text-lg font-bold tracking-tight">Gable<span className="text-gable-green font-light tracking-widest">LBM</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/erp" className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-1.5 transition-all">
              Explore ERP →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative">
        {/* Ambient glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gable-green/8 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mb-10"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gable-green/70 mb-4">Strategic Partnership</span>
            <div className="flex items-center gap-6">
               {/* Custom CSS text logo for Reed Building Materials that looks like an established brand */}
               <div className="font-serif italic tracking-tight text-3xl md:text-5xl text-white">
                 Reed Building Materials
               </div>
               <div className="text-xl md:text-2xl text-zinc-600 font-light">×</div>
               <div className="font-sans text-2xl md:text-4xl font-bold tracking-tight flex items-center">
                 Gable<span className="text-gable-green font-light tracking-widest">LBM</span>
               </div>
            </div>
            <div className="h-px w-48 bg-gradient-to-r from-transparent via-gable-green/40 to-transparent mt-8" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            The Modern{' '}
            <span className="bg-gradient-to-r from-gable-green to-amber-400 bg-clip-text text-transparent">
              Operating System
            </span>
            <br />
            for Hardscape Supply
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Replace Bistrack and Great Plains with a single, hardscape-native ERP
            that you own - no licensing fees, no per-user seats, no vendor lock-in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/proposal"
              className="group flex items-center gap-2 bg-gradient-to-r from-gable-green to-amber-500 text-deep-space font-semibold px-8 py-3.5 rounded-xl shadow-glow hover:shadow-glow-strong transition-all hover:scale-[1.02] text-base"
            >
              View Phase 1 Proposal
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/discovery"
              className="group flex items-center gap-2 bg-gradient-to-r from-gable-green to-amber-500 text-deep-space font-semibold px-8 py-3.5 rounded-xl shadow-glow hover:shadow-glow-strong transition-all hover:scale-[1.02] text-base"
            >
              Start Phase 0 Discovery
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/erp"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium px-8 py-3.5 rounded-xl transition-all text-base"
            >
              Explore the Live ERP
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Value Narrative */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-3xl font-bold text-center mb-4"
          >
            Why This <span className="text-gable-green">Matters</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="text-zinc-400 text-center mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            Reed Building Materials runs on two disconnected systems and a lot of manual workarounds. Here is what changes when you own the platform.
          </motion.p>

          <div className="space-y-10">
            {[
              {
                number: '01',
                title: 'One Unified System, Zero Reconciliation',
                body: 'Today, BisTrack handles your yard and Great Plains handles your books. Every transaction requires manual syncing between them. GableLBM collapses both into one platform. Sales, inventory, purchasing, and full GL accounting live in a single data model. The reconciliation step disappears entirely.',
                accent: 'emerald',
              },
              {
                number: '02',
                title: 'You Own Everything. Forever.',
                body: 'There are no per-user licensing fees. No annual renewals. No vendor lock-in. You own the source code outright. When we finish, the system is yours to operate, extend, or hand to any team you choose. The $250/mo infrastructure fee covers hosting and AI services, not permission to use your own software.',
                accent: 'blue',
              },
              {
                number: '03',
                title: 'AI-Native, Not AI-Bolted',
                body: 'Intelligence is built into the foundation, not added as an afterthought. Automated product categorization, predictive reorder points, and smart cost analysis are part of the core architecture. Our Canadian-hosted AI endpoints keep your data on sovereign soil while giving your team intelligent automation from day one.',
                accent: 'purple',
              },
              {
                number: '04',
                title: 'Open Integrations by Default',
                body: 'Every feature in the system is accessible through a free, unlimited REST API. Whether you need to connect your existing tools, feed data to external reporting, or build a custom contractor-facing portal, the platform is designed for easy, open connectivity without silos or API fees.',
                accent: 'amber',
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 2}
                variants={fadeUp}
                className="flex gap-6 items-start"
              >
                <span className={`text-3xl font-bold font-mono shrink-0 mt-1 ${
                  block.accent === 'emerald' ? 'text-emerald-500' :
                  block.accent === 'blue' ? 'text-blue-400' :
                  block.accent === 'purple' ? 'text-purple-400' :
                  'text-gable-green'
                }`}>
                  {block.number}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{block.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{block.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-3xl font-bold mb-4"
          >
            Ready to Walk Through the Details?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="text-zinc-400 mb-8"
          >
            $23,250 one-time + $250–$800/mo recurring. Includes 10 free Sr Architect hours in Phase 0. Full scope, timeline, and MSP options inside.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
          >
            <Link
              to="/proposal"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-gable-green to-amber-500 text-deep-space font-semibold px-8 py-3.5 rounded-xl shadow-glow hover:shadow-glow-strong transition-all hover:scale-[1.02] text-base"
            >
              View Phase 1 Proposal
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-zinc-600">
          <span>© 2026 FutureBuild AI · Confidential</span>
          <span>Prepared for Reed Building Supply · McKees Rocks, PA</span>
        </div>
      </footer>
    </div>
  );
}
