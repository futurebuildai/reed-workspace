import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

interface ProposalPasswordProps {
  onAuthenticated: () => void;
}

export function ProposalPassword({ onAuthenticated }: ProposalPasswordProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setError(false);

    // Simulate a brief validation delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 600));

    if (password === 'HowReedWins2026') {
      onAuthenticated();
    } else {
      setError(true);
      setIsValidating(false);
      // Haptic feedback simulation via shake animation
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-deep-space flex items-center justify-center p-6 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gable-green/5 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-gable-green/10 border border-gable-green/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow"
          >
            <Lock className="text-gable-green" size={28} />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Reed Building Materials Partner Portal</h1>
          <p className="text-zinc-500 text-sm">Enter password to access the Reed Building Materials Partner Portal.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
              className={`w-full bg-white/5 border ${error ? 'border-rose-500/50 shadow-rose-500/10' : 'border-white/10 group-hover:border-white/20'} rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 outline-none transition-all focus:border-gable-green/50 focus:ring-4 focus:ring-gable-green/5 shadow-elevation-2 font-mono tracking-widest`}
            />
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500"
              >
                <AlertCircle size={20} />
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            disabled={!password || isValidating}
            className="w-full bg-gable-green hover:bg-amber-500 disabled:opacity-50 disabled:hover:bg-gable-green text-deep-space font-bold py-4 rounded-2xl transition-all shadow-glow flex items-center justify-center gap-2 group overflow-hidden relative"
          >
            <AnimatePresence mode="wait">
              {isValidating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <RefreshCw size={20} className="animate-spin" />
                  <span>Validating...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <ShieldCheck size={20} />
                  <span>Enter Portal</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-rose-500 text-xs font-bold mt-4 uppercase tracking-widest"
            >
              Invalid Password
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-bold">GableLBM | OS &copy; 2026</p>
        </div>
      </motion.div>
    </div>
  );
}

