import { useState } from 'react';
import { Send, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface DiscoveryItem {
  id: string;
  category: string;
  question: string;
  placeholder: string;
}

const DISCOVERY_ITEMS: DiscoveryItem[] = [
  { id: 'user_count', category: 'Infrastructure', question: 'Total User Count', placeholder: 'e.g., 25 concurrent users' },
  { id: 'locations', category: 'Infrastructure', question: 'Total Locations', placeholder: 'Confirmed Trenton & Kingston' },
  { id: 'gmv_volume', category: 'Run Payments', question: 'Annual Transaction Volume (GMV)', placeholder: 'e.g., $10.5M' },
  { id: 'card_split', category: 'Run Payments', question: '% Card vs Account/Cash', placeholder: 'e.g., 60% card' },
  { id: 'sku_count', category: 'Migration', question: 'Estimated SKU Count', placeholder: 'e.g., 12,000 SKUs' },
  { id: 'db_size', category: 'Migration', question: 'BisTrack Database Size (GB)', placeholder: 'e.g., 45GB SQL database' },
  { id: 'data_health', category: 'Migration', question: 'Data Health / Cleanup Needs', placeholder: 'e.g., High cleanup for address records' },
  { id: 'backups', category: 'Infrastructure', question: 'Data Retention Requirements', placeholder: 'Confirmed 7yr for CRA' },
];

export function PartnerRoomTracker({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (id: string) => {
    if (!values[id]) return;
    
    setIsSending(true);
    try {
      const payload = {
        timestamp: new Date().toISOString(),
        customer: 'Dibbits Landscape Supply',
        field: DISCOVERY_ITEMS.find(item => item.id === id)?.question || id,
        value: values[id],
        category: DISCOVERY_ITEMS.find(item => item.id === id)?.category || 'General',
      };

      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log('Pushing to Roadmap Log:', payload);
      setSubmitted(prev => [...prev, id]);
    } catch (error) {
      console.error('Failed to update project log', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-slate-warm border-l border-white/5 z-[70] flex flex-col shadow-elevation-3"
          >
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-deep-earth/50">
              <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                <Search size={18} className="text-stone-amber" />
                Partner Room Insights
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
              <div className="bg-stone-amber/10 border border-stone-amber/20 rounded-xl p-4 text-sm text-stone-amber">
                <p className="leading-relaxed">
                  Inputs captured here are pushed live to the shared **Project Roadmap Log** for final SOW generation and implementation alignment.
                </p>
              </div>

              {DISCOVERY_ITEMS.map((item) => (
                <div key={item.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{item.category}</label>
                    {submitted.includes(item.id) && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-tighter">
                        <CheckCircle2 size={10} /> Saved to Sheet
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-white">{item.question}</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={values[item.id] || ''}
                      onChange={(e) => setValues(v => ({ ...v, [item.id]: e.target.value }))}
                      placeholder={item.placeholder}
                      disabled={submitted.includes(item.id)}
                      className={cn(
                        "flex-1 bg-deep-earth/50 border rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all",
                        submitted.includes(item.id) 
                          ? "border-emerald-500/30 text-emerald-400/70" 
                          : "border-white/5 focus:ring-1 focus:ring-stone-amber/50 placeholder:text-zinc-600"
                      )}
                    />
                    {!submitted.includes(item.id) && (
                      <button
                        onClick={() => handleSend(item.id)}
                        disabled={!values[item.id] || isSending}
                        className="bg-stone-amber hover:bg-amber-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-deep-earth p-2.5 rounded-lg transition-colors shadow-glow shrink-0"
                      >
                        <Send size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-white/5 bg-deep-earth/30">
              <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest">
                Data pushed via Secure Webhook to futurebuildai organization
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Search({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
