import { motion } from 'framer-motion';
import { FileSignature, Sparkles, ClipboardCheck, Rocket, ArrowRight, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    icon: FileSignature,
    label: 'Step 1 — This Week',
    title: 'Sign Phase 0 Agreement',
    detail: 'One-page scope letter. $500 covers discovery + 30 days of dev/staging infra. No commitment to Phase 1.',
    cta: 'Email PDF agreement',
  },
  {
    icon: Sparkles,
    label: 'Step 2 — Days 1–14',
    title: 'Use Your 10 Sr Architect Hours',
    detail: '2× working sessions with Reed leadership + ops. We lock the per-bucket scope, data model, and integration design.',
    cta: 'Book working sessions',
  },
  {
    icon: ClipboardCheck,
    label: 'Step 3 — Day 14–21',
    title: 'Locked Phase 1 Plan + Quote',
    detail: 'Final fixed-price quote (within $23,250 estimate, $28,000 NTE). Reed reviews and signs to start the 3-month build clock.',
    cta: 'Receive locked plan',
  },
  {
    icon: Rocket,
    label: 'Step 4 — Month 1+',
    title: 'Build Clock Starts',
    detail: 'Phase 1 milestone billing begins (50/30/20). Reed gets weekly demos + a private Slack channel for fast iteration.',
    cta: 'Build phase begins',
  },
];

export function SlideNextSteps() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gable-green/20 text-gable-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-gable-green/30">
          What Happens After Today
        </div>
        <h2 className="text-4xl font-bold mb-4">From Yes to <span className="text-gable-green">Go-Live</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
          A clear, low-friction on-ramp. Phase 0 is intentionally small ($500) and reversible — we earn Phase 1 by delivering a locked plan first.
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
              <ArrowRight size={12} />
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
          <Calendar size={18} className="text-gable-green shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-sm text-white mb-1">Today's Decision</h4>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              Reed agrees to Phase 0 — we send the agreement, you sign, we kick off this week. Total exposure: <span className="text-gable-green font-bold">$500</span> for the locked plan.
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
            <h4 className="font-bold text-sm text-white mb-1">Questions?</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed mb-2">
              Reach out anytime. The discovery checklist captures the inputs we need from Reed for Phase 0.
            </p>
            <Link
              to="/discovery"
              className="inline-flex items-center gap-1.5 text-[11px] text-gable-green hover:text-gable-green/80 font-bold uppercase tracking-widest transition-colors"
            >
              Open Discovery Form <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
