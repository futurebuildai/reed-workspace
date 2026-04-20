import { motion } from 'framer-motion';

export function SlideTitle() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        className="w-32 h-32 mb-10 text-white"
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
        className="space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          GableX<span className="bg-gradient-to-r from-gable-green to-amber-400 bg-clip-text text-transparent italic">Hardscape</span> OS
        </h1>
        <p className="text-xl md:text-2xl text-zinc-500 font-medium">Pricing & Scope Framework</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-16 flex flex-col items-center gap-2"
      >
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-gable-green/50 to-transparent" />
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-gable-green/60">Prepared for Reed Building Materials</span>
        <div className="text-[10px] text-zinc-600 font-mono mt-4">PRIVATE & CONFIDENTIAL · APRIL 2026</div>
      </motion.div>
    </div>
  );
}
