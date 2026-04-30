import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function SlideTitle() {
  const handleBegin = () => {
    window.dispatchEvent(new CustomEvent('proposal:next'));
  };

  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        className="w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-10 text-white"
      >
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-glow">
          <path d="M4 36 L32 8 L60 36" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 16 V28" stroke="#E8A74E" strokeWidth="4" strokeLinecap="round" />
          <path d="M22 28 C22 28 22 46 32 46 C42 46 42 28 42 28" stroke="#E8A74E" strokeWidth="4" strokeLinecap="round" fill="none" />
          <rect x="28" y="46" width="8" height="6" rx="1" fill="#E8A74E" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-3 md:space-y-4"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
          Gable<span className="bg-gradient-to-r from-gable-green to-amber-400 bg-clip-text text-transparent italic">LBM</span> OS
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-zinc-500 font-medium">Proposal &amp; Scope</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-10 md:mt-16 flex flex-col items-center gap-2"
      >
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-gable-green/50 to-transparent" />
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-gable-green/60">Prepared for Reed Building Supply</span>
        <div className="text-[10px] text-zinc-600 font-mono mt-3">PRIVATE &amp; CONFIDENTIAL · APRIL 2026</div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={handleBegin}
        className="group mt-10 md:mt-12 inline-flex items-center gap-2 bg-gradient-to-r from-gable-green to-amber-500 text-deep-space font-bold px-7 py-3 rounded-xl shadow-glow hover:shadow-glow-strong transition-all hover:scale-[1.02] text-sm md:text-base"
      >
        Begin Walkthrough
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="text-[10px] text-zinc-600 mt-3"
      >
        or press <kbd className="px-1.5 py-0.5 mx-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-zinc-400">→</kbd> / <kbd className="px-1.5 py-0.5 mx-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-zinc-400">space</kbd>
      </motion.p>
    </div>
  );
}
