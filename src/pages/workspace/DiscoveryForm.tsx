import { useState, useEffect } from 'react';
import { Send, CheckCircle2, ChevronRight, Database, Server, CreditCard, Layout, ArrowRight, Lock, RotateCcw, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';


const DISCOVERY_SECTIONS = [
  {
    id: 'infra',
    title: 'Infrastructure & Scale',
    icon: <Server className="text-blue-400" size={20} />,
    questions: [
      { id: 'user_seats', category: 'Infrastructure', question: 'Total User Seats', placeholder: 'e.g., 25 user seats' },
      { id: 'locations', category: 'Infrastructure', question: 'Total Branch Locations', placeholder: 'Confirmed Trenton & Kingston' },
      { id: 'internet_setup', category: 'Infrastructure', question: 'Internet Provider & Bandwidth', placeholder: 'Describe your current internet setup and backup lines', type: 'textarea', tip: 'Essential for optimizing cloud performance and offline fallback.' },
      { id: 'hardware_age', category: 'Infrastructure', question: 'Hardware Refresh Status', placeholder: 'Approx age of current servers/workstations', tip: 'Helps us plan the cloud-native transition vs hybrid needs.' },
      { id: 'yard_wifi', category: 'Infrastructure', question: 'Yard WiFi Coverage', placeholder: 'Is there signal in the loading yards?', tip: 'Essential for real-time mobile inventory checks.' },
    ]
  },
  {
    id: 'migration',
    title: 'Data & Migration',
    icon: <Database className="text-emerald-400" size={20} />,
    questions: [
      { id: 'sku_count', category: 'Migration', question: 'Estimated SKU Count', placeholder: 'e.g., 12,000 SKUs' },
      { id: 'db_size', category: 'Migration', question: 'BisTrack Database Size (GB)', placeholder: 'e.g., 45GB SQL database' },
      { id: 'data_health', category: 'Migration', question: 'Data Health / Cleanup Status', placeholder: 'e.g., Describe any known issues with address records, duplicate contacts, etc.', type: 'textarea' },
      { id: 'retention', category: 'Migration', question: 'Data Retention Requirements', placeholder: 'e.g., 7 years for CRA compliance' },
      { id: 'customizations', category: 'Migration', question: 'Custom Tables/Stored Procs', placeholder: 'List any proprietary BisTrack modifications', type: 'textarea', tip: 'Critical for the AI mapping engine rollout.' },
    ]
  },
  {
    id: 'payments',
    title: 'Payments & Revenue',
    icon: <CreditCard className="text-stone-amber" size={20} />,
    questions: [
      { id: 'gmv_volume', category: 'Payments', question: 'Annual Transaction Volume (GMV)', placeholder: 'e.g., $10.5M' },
      { id: 'revenue_split', category: 'Payments', question: 'Percentage Revenue by Type', placeholder: 'e.g., Card: X%, Cash: Y%, Bank Account (including EFT): Z%' },
      { id: 'terminals', category: 'Payments', question: 'Payment Terminal Inventory', placeholder: 'Quantity and models of current hardware', tip: 'Enables GableX payment integration planning.' },
    ]
  },
  {
    id: 'logistics',
    title: 'Logistics & Vision',
    icon: <Layout className="text-purple-400" size={20} />,
    questions: [
      { id: 'truck_count', category: 'Logistics', question: 'Delivery Fleet Size', placeholder: 'Number of dedicated delivery trucks' },
      { id: 'gps_routing', category: 'Logistics', question: 'Current Routing Solution', placeholder: 'Current GPS or routing software in use' },
      { id: 'gp_version', category: 'Accounting', question: 'Great Plains Version', placeholder: 'Current version of Microsoft Great Plains' },
      { id: 'contractor_vision', category: 'Vision', question: 'Contractor Facing Tools Vision', placeholder: 'Describe your vision for integrated contractor account management tools', type: 'textarea', tip: 'Helps us prioritize the contractor portal features.' },
      { id: 'bt_gp_touchpoints', category: 'Accounting', question: 'BT-GP Integration Points', placeholder: 'How do BisTrack and GP talk today?', tip: 'Helps ensure one-click financial reconciliation.' },
    ]
  }
];

const WEBHOOK_URL = "https://chat.googleapis.com/v1/spaces/AAQAzw-J0lI/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=gOXlEiZqKRt6KhXBEQol8sQyG-6jVzikiWbCvgk2GCI";

export function DiscoveryForm() {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('dibbits_discovery_form');
    return saved ? JSON.parse(saved) : {};
  });
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [isFinalized, setIsFinalized] = useState<boolean>(() => {
    return localStorage.getItem('dibbits_discovery_finalized') === 'true';
  });
  const [isSending, setIsSending] = useState<string | null>(null);
  const [isFinalSubmitting, setIsFinalSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem('dibbits_discovery_form', JSON.stringify(values));
  }, [values]);

  const handleSave = async (id: string, force?: boolean) => {
    if (isFinalized && !force) return;
    if (!values[id]) return;
    
    setIsSending(id);
    try {
      // Small simulated delay for local feel
      await new Promise(resolve => setTimeout(resolve, 600));
      setSubmitted(prev => Array.from(new Set([...prev, id])));
    } catch (error) {
      console.error('Failed to save', error);
    } finally {
      setIsSending(null);
    }
  };

  const calculateProgress = () => {
    const total = DISCOVERY_SECTIONS.reduce((acc, section) => acc + section.questions.length, 0);
    const filled = Object.keys(values).filter(k => values[k]?.trim() !== '').length;
    return Math.round((filled / total) * 100);
  };

  const handleFinalSubmit = async () => {
    if (isFinalized) return;
    setIsFinalSubmitting(true);

    // Format the message for Google Chat
    let messageBody = `🚀 *Phase 0 Discovery Audit Completed: Dibbits Landscape Supply*\n\n`;
    
    DISCOVERY_SECTIONS.forEach(section => {
      messageBody += `*${section.title.toUpperCase()}*\n`;
      section.questions.forEach(q => {
        const value = values[q.id] || "*(No response provided)*";
        messageBody += `• *${q.question}:* ${value}\n`;
      });
      messageBody += `\n`;
    });

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ text: messageBody }),
      });

      if (!response.ok) throw new Error('Webhook push failed');

      setIsFinalized(true);
      localStorage.setItem('dibbits_discovery_finalized', 'true');
    } catch (error) {
      console.error('Final submission failed', error);
      alert('Failed to send data to Google Chat. Please check your connection and try again.');
    } finally {
      setIsFinalSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('DEV ONLY: Are you sure you want to reset the entire form and unlock it?')) {
      setValues({});
      setSubmitted([]);
      setIsFinalized(false);
      localStorage.removeItem('dibbits_discovery_form');
      localStorage.removeItem('dibbits_discovery_finalized');
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-stone-amber/30 pb-20">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#111111]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
             <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8 text-white group-hover:text-stone-amber transition-colors">
              <path d="M4 36 L32 8 L60 36" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xl font-bold tracking-tight">Phase 0 <span className="text-stone-amber font-light tracking-widest uppercase text-sm ml-2">Discovery Room</span></span>
          </Link>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Project Progress</span>
            <div className="flex items-center gap-3 w-48">
              <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  className="h-full bg-stone-amber shadow-glow"
                />
              </div>
              <span className="text-[10px] font-mono text-stone-amber">{calculateProgress()}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
           {isFinalized && (
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-lg">
                <Lock size={12} /> Responses Locked
              </div>
           )}
           <Link to="/proposal" className="text-xs text-zinc-500 hover:text-white transition-colors">Return to Proposal</Link>
           <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-widest rounded flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
             Live Sync Active
           </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 pt-12">
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight flex items-center justify-center lg:justify-start gap-4">
            Technical Scoping & Blueprints
            {isFinalized && <Lock className="text-amber-500 opacity-50" size={32} />}
          </h1>
          <p className="text-zinc-400 max-w-2xl leading-relaxed mx-auto lg:mx-0">
            {isFinalized 
              ? "Your discovery audit has been submitted and locked for review. FutureBuildAI team has been notified via secure webhook."
              : "Please complete the following technical audit. This data directly populates your Phase 1 Execution Plan and helps us finalize the server infrastructure and AI training models required for the Dibbits migration."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DISCOVERY_SECTIONS.map((section) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors shadow-xl"
            >
              <div className="px-6 py-4 bg-white/[0.02] flex items-center gap-3 border-b border-white/5">
                {section.icon}
                <h2 className="font-bold text-lg tracking-tight">{section.title}</h2>
              </div>
              
              <div className="p-6 space-y-6">
                {section.questions.map((q) => (
                  <div key={q.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{q.category}</label>
                      {(submitted.includes(q.id) || isFinalized) && values[q.id] && (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold tracking-tight">
                          <CheckCircle2 size={10} /> SAVED
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-white/90">{q.question}</h3>
                    <div className="relative group">
                      {q.type === 'textarea' ? (
                        <textarea
                          value={values[q.id] || ''}
                          onChange={(e) => setValues(prev => ({ ...prev, [q.id]: e.target.value }))}
                          placeholder={q.placeholder}
                          disabled={isFinalized}
                          rows={4}
                          className={cn(
                            "w-full bg-[#111111] border rounded-xl px-4 py-3 text-sm transition-all focus:outline-none resize-none no-scrollbar",
                            isFinalized
                               ? "border-emerald-500/10 text-emerald-400/50 cursor-not-allowed"
                               : "border-white/5 focus:border-stone-amber/50 focus:ring-1 focus:ring-stone-amber/20"
                          )}
                          onBlur={() => handleSave(q.id)}
                        />
                      ) : (
                        <input
                          type="text"
                          value={values[q.id] || ''}
                          onChange={(e) => setValues(prev => ({ ...prev, [q.id]: e.target.value }))}
                          placeholder={q.placeholder}
                          disabled={isFinalized}
                          className={cn(
                            "w-full bg-[#111111] border rounded-xl px-4 py-3 text-sm transition-all focus:outline-none",
                             isFinalized
                               ? "border-emerald-500/10 text-emerald-400/50 cursor-not-allowed"
                               : "border-white/5 focus:border-stone-amber/50 focus:ring-1 focus:ring-stone-amber/20"
                          )}
                          onBlur={() => handleSave(q.id)}
                        />
                      )}
                      
                      {isSending === q.id && (
                         <div className="absolute right-3 top-4">
                           <div className="w-4 h-4 border-2 border-stone-amber/20 border-t-stone-amber rounded-full animate-spin" />
                         </div>
                      )}
                      {!isFinalized && !submitted.includes(q.id) && !isSending && values[q.id] && (
                        <button 
                          onClick={() => handleSave(q.id)}
                          className={cn(
                            "absolute right-2 p-2 hover:bg-stone-amber/10 rounded-lg text-stone-amber transition-all",
                            q.type === 'textarea' ? "top-2" : "top-1/2 -translate-y-1/2"
                          )}
                        >
                          <Send size={16} />
                        </button>
                      )}
                    </div>
                    {q.tip && (
                      <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                        Tip: {q.tip}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="mt-16 flex flex-col items-center gap-6">
           <AnimatePresence mode="wait">
             {!isFinalized ? (
               <motion.div 
                 key="submit-btn"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex flex-col items-center gap-4"
               >
                 <p className="text-zinc-500 text-xs tracking-wide">Ready to send the technical data for review?</p>
                 <button 
                   onClick={handleFinalSubmit}
                   disabled={isFinalSubmitting || calculateProgress() < 10}
                   className="group relative flex items-center gap-3 bg-stone-amber hover:bg-amber-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-deep-earth font-bold px-10 py-4 rounded-2xl transition-all shadow-glow hover:shadow-glow-strong overflow-hidden"
                 >
                   {isFinalSubmitting ? (
                     <>
                        <div className="w-5 h-5 border-2 border-deep-earth/20 border-t-deep-earth rounded-full animate-spin" />
                        Pushing to Google Chat...
                     </>
                   ) : (
                     <>
                        <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                        Submit Final Audit to Roadmap
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </>
                   )}
                 </button>
               </motion.div>
             ) : (
               <motion.div 
                 key="locked-msg"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-emerald-500/10 border border-emerald-500/20 px-8 py-6 rounded-2xl text-center flex flex-col items-center gap-3 max-w-md shadow-2xl"
               >
                 <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={24} />
                 </div>
                 <h2 className="text-xl font-bold text-white tracking-tight">Audit Successfully Logged</h2>
                 <p className="text-zinc-400 text-sm leading-relaxed">
                   The technical data points have been pushed to the FutureBuildAI Google Chat channel. Our engineers are reviewing the specs for the Phase 1 Statement of Work.
                 </p>
                 <Link 
                   to="/proposal" 
                   className="mt-4 text-xs font-bold text-stone-amber hover:text-amber-400 transition-colors uppercase tracking-widest flex items-center gap-2"
                 >
                   Return to Proposal Slide Deck <ArrowRight size={14} />
                 </Link>
               </motion.div>
             )}
           </AnimatePresence>

           <div className="flex items-center gap-4 opacity-30 hover:opacity-100 transition-opacity">
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-[10px] text-zinc-500 hover:text-red-400 transition-colors uppercase tracking-widest font-bold font-mono"
              >
                <RotateCcw size={12} /> Reset Form & Unlock (Dev)
              </button>
           </div>
        </div>
      </main>
    </div>
  );
}
