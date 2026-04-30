import { motion } from 'framer-motion';
import { FileSignature, Sparkles, ClipboardCheck, Rocket, Mail, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    icon: FileSignature,
    label: 'Step 1 — When Reed is ready',
    title: 'Sign Phase 0 Agreement',
    detail: 'One-page scope letter. Reed picks the start date — we move at your pace, not ours.',
    cta: 'Reed-led timing',
  },
  {
    icon: Sparkles,
    label: 'Step 2 — Days 1–14',
    title: 'Use Your 10 Sr Architect Hours',
    detail: '2× working sessions with Reed leadership + ops. We lock the per-bucket scope, data model, and integration design.',
    cta: 'Working sessions',
  },
  {
    icon: ClipboardCheck,
    label: 'Step 3 — End of Phase 0',
    title: 'Locked Phase 1 Plan + Quote',
    detail: 'Final fixed-price quote (within $18,600 estimate, $24,000 NTE). Reed reviews — fully informed — and decides whether to proceed to Phase 1.',
    cta: 'Reed decides',
  },
  {
    icon: Rocket,
    label: 'Step 4 — Only if Reed proceeds',
    title: 'Phase 1 Build Clock Starts',
    detail: 'Phase 1 milestone billing begins (50/30/20). Reed gets weekly demos + a private Slack channel. Or Reed can walk away after Phase 0 — no further obligation.',
    cta: 'Optional next step',
  },
];

export function SlideNextSteps() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gable-green/20 text-gable-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-gable-green/30">
          What Happens Next
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">A Low-Risk <span className="text-gable-green">On-Ramp</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          Phase 0 is intentionally small and reversible. Reed makes a fully-informed Phase 1 decision after seeing the locked plan — never under pressure, never on incomplete information.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-5 border-white/5 flex items-start gap-5 hover:border-gable-green/30 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-gable-green/10 flex items-center justify-center shrink-0 group-hover:bg-gable-green/20 transition-colors">
              <step.icon size={20} className="text-gable-green" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-gable-green mb-1">{step.label}</div>
              <h3 className="font-bold text-base text-white mb-1">{step.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{step.detail}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-zinc-500 shrink-0 self-center">
              <span>{step.cta}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-gable-green/30 bg-gable-green/10 p-5 flex items-start gap-3"
        >
          <ShieldCheck size={18} className="text-gable-green shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-sm text-white mb-1">Total Phase 0 Risk: ~$1,000</h4>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              <span className="text-gable-green font-semibold">$500 setup + $500/mo (~1 month)</span>. Reed can <span className="text-white font-semibold">terminate after Phase 0 completes</span> with no obligation to Phase 1 — keep the locked plan for reference, walk away clean.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border border-white/5 bg-deep-space/50 p-5 flex items-start gap-3"
        >
          <Mail size={18} className="text-zinc-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-sm text-white mb-1">Take Your Time</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              No artificial deadline. When Reed is ready to start Phase 0, we'll send the agreement and get going. Questions in the meantime — reach out anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
