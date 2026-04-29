import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, CheckCircle2, ChevronRight, Database, Server, CreditCard, Layout, ArrowRight, Lock, RotateCcw, MessageSquare, AlertCircle, User, Building2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';


const DISCOVERY_SECTIONS = [
  {
    id: 'infra',
    title: 'Infrastructure & Scale',
    icon: <Server className="text-blue-400" size={20} />,
    questions: [
      { id: 'user_seats', category: 'Infrastructure', question: 'Total User Seats', placeholder: 'How many total system users will there be, and what specific roles require access?' },
      { id: 'locations', category: 'Infrastructure', question: 'Total Branch Locations', placeholder: 'Number of active locations' },
      { id: 'ai_layer', category: 'Infrastructure', question: 'Managed AI/API Layer vs Self-Serve', placeholder: 'Would you prefer a managed AI/API layer (one-click out-of-the-box, billed monthly as a single line item) or a self-serve AI/integrations setup (more complexity, more to manage)?', type: 'textarea' },
    ]
  },
  {
    id: 'migration',
    title: 'Data & Migration',
    icon: <Database className="text-emerald-400" size={20} />,
    questions: [
      { id: 'sku_count', category: 'Migration', question: 'Estimated SKU Count', placeholder: 'Active SKUs currently in QuickBooks' },
      { id: 'qb_type', category: 'Accounting', question: 'QuickBooks Environment', placeholder: 'Are you using QuickBooks Desktop or QuickBooks Online?' },
      { id: 'costing_type', category: 'Accounting', question: 'Inventory Costing', placeholder: 'Do you run standard average costing in QuickBooks?' },
    ]
  },
  {
    id: 'payments',
    title: 'Payments & Revenue',
    icon: <CreditCard className="text-gable-green" size={20} />,
    questions: [
      { id: 'gmv_volume', category: 'Run Payments', question: 'Annual Transaction Volume (GMV)', placeholder: 'Estimated annual gross processing volume through Clover', tip: 'Crucial for targeting Run Payments rates.' },
      { id: 'revenue_split', category: 'Payments', question: 'Payment Split', placeholder: 'Percentage split between cash/credit at POS vs. on-account transactions?' },
      { id: 'terminals', category: 'Run Payments', question: 'Physical Checkout Lanes', placeholder: 'How many physical checkout lanes/registers exist to replace the Clover terminals?' },
      { id: 'invoicing_process', category: 'Invoicing', question: 'Invoice/Statement Processes', placeholder: 'How are invoices/statements distributed and collected today?', type: 'textarea' },
    ]
  },
  {
    id: 'logistics',
    title: 'Logistics',
    icon: <Layout className="text-purple-400" size={20} />,
    questions: [
      { id: 'fleet_size', category: 'Fleet & Delivery', question: 'Delivery Fleet Size', placeholder: 'How many delivery vehicles are in the fleet?' },
      { id: 'gps_routing', category: 'Fleet & Delivery', question: 'Current Routing Solution', placeholder: 'How is routing currently handled?' },
    ]
  }
];

const WEBHOOK_URL = import.meta.env.VITE_DISCOVERY_WEBHOOK_URL || '';
const SYNC_DEBOUNCE_MS = 800;

type SaveState = 'saved' | 'failed' | undefined;

interface Identity {
  name: string;
  email: string;
  company: string;
}

function getOrCreateSubmissionId(): string {
  let id = localStorage.getItem('reed_discovery_id');
  if (!id) {
    id = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : `sub-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem('reed_discovery_id', id);
  }
  return id;
}

export function DiscoveryForm() {
  const [submissionId] = useState(getOrCreateSubmissionId);
  const [identity, setIdentity] = useState<Identity>(() => {
    const saved = localStorage.getItem('reed_discovery_identity');
    return saved ? JSON.parse(saved) : { name: '', email: '', company: '' };
  });
  const [values, setValues] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('reed_discovery_form');
    return saved ? JSON.parse(saved) : {};
  });
  const [submitted, setSubmitted] = useState<Record<string, SaveState>>({});
  const [isFinalized, setIsFinalized] = useState<boolean>(() => {
    return localStorage.getItem('reed_discovery_finalized') === 'true';
  });
  const [isSending, setIsSending] = useState<string | null>(null);
  const [isFinalSubmitting, setIsFinalSubmitting] = useState(false);
  const identitySent = useRef(false);

  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    localStorage.setItem('reed_discovery_form', JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    localStorage.setItem('reed_discovery_identity', JSON.stringify(identity));
  }, [identity]);

  const isIdentityComplete = Boolean(
    identity.name.trim() && identity.email.trim() && identity.company.trim()
  );

  const syncField = useCallback(async (id: string, value: string): Promise<boolean> => {
    if (!WEBHOOK_URL) {
      // No webhook configured (dev or pre-deploy) — fall back to local-only "saved"
      setSubmitted(prev => ({ ...prev, [id]: 'saved' }));
      return true;
    }
    setIsSending(id);
    try {
      const includeIdentity = isIdentityComplete && !identitySent.current;
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission_id: submissionId,
          field: { id, value },
          ...(includeIdentity && { identity }),
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (includeIdentity) identitySent.current = true;
      setSubmitted(prev => ({ ...prev, [id]: 'saved' }));
      return true;
    } catch (err) {
      console.error('Field sync failed', id, err);
      setSubmitted(prev => ({ ...prev, [id]: 'failed' }));
      return false;
    } finally {
      setIsSending(null);
    }
  }, [submissionId, identity, isIdentityComplete]);

  const handleSave = (id: string, force?: boolean) => {
    if (isFinalized && !force) return;
    if (!values[id] || !values[id].trim()) return;

    if (debounceTimers.current[id]) clearTimeout(debounceTimers.current[id]);
    debounceTimers.current[id] = setTimeout(() => {
      void syncField(id, values[id]);
    }, force ? 0 : SYNC_DEBOUNCE_MS);
  };

  const syncIdentity = useCallback(async (next: Identity) => {
    if (!WEBHOOK_URL) return;
    if (!next.name.trim() || !next.email.trim() || !next.company.trim()) return;
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submission_id: submissionId, identity: next }),
      });
      if (response.ok) identitySent.current = true;
    } catch (err) {
      console.warn('Identity sync failed', err);
    }
  }, [submissionId]);

  const updateIdentity = (field: keyof Identity, value: string) => {
    setIdentity(prev => {
      const next = { ...prev, [field]: value };
      if (debounceTimers.current['__identity']) clearTimeout(debounceTimers.current['__identity']);
      debounceTimers.current['__identity'] = setTimeout(() => void syncIdentity(next), SYNC_DEBOUNCE_MS);
      return next;
    });
  };

  const calculateProgress = () => {
    const total = DISCOVERY_SECTIONS.reduce((acc, section) => acc + section.questions.length, 0);
    const filled = Object.keys(values).filter(k => values[k]?.trim() !== '').length;
    return Math.round((filled / total) * 100);
  };

  const handleFinalSubmit = async () => {
    if (isFinalized) return;
    if (!isIdentityComplete) {
      alert('Please fill in your name, email, and company before submitting.');
      return;
    }
    if (!WEBHOOK_URL) {
      alert('Form sync is not configured. Please contact the FutureBuildAI team.');
      return;
    }

    setIsFinalSubmitting(true);
    try {
      // Flush any pending debounced saves
      Object.values(debounceTimers.current).forEach(t => clearTimeout(t));
      const pendingSaves = Object.entries(values)
        .filter(([, v]) => v?.trim() !== '')
        .map(([id, value]) => syncField(id, value));
      await Promise.all(pendingSaves);

      // Then trigger finalize (also includes identity in case it never synced)
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission_id: submissionId,
          identity,
          finalize: true,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setIsFinalized(true);
      localStorage.setItem('reed_discovery_finalized', 'true');
    } catch (error) {
      console.error('Final submission failed', error);
      alert('Submission failed. Your responses are still saved locally and to the sheet — please try again, or contact us if it keeps failing.');
    } finally {
      setIsFinalSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('DEV ONLY: Reset entire form, generate new submission ID, and unlock?')) {
      setValues({});
      setIdentity({ name: '', email: '', company: '' });
      setSubmitted({});
      setIsFinalized(false);
      identitySent.current = false;
      localStorage.removeItem('reed_discovery_form');
      localStorage.removeItem('reed_discovery_identity');
      localStorage.removeItem('reed_discovery_finalized');
      localStorage.removeItem('reed_discovery_id');
      // Force regenerate id by reloading
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-gable-green/30 pb-20">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#111111]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
             <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8 text-white group-hover:text-gable-green transition-colors">
              <path d="M4 36 L32 8 L60 36" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xl font-bold tracking-tight">Phase 0 <span className="text-gable-green font-light tracking-widest uppercase text-sm ml-2">Discovery Room</span></span>
          </Link>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Project Progress</span>
            <div className="flex items-center gap-3 w-48">
              <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  className="h-full bg-gable-green shadow-glow"
                />
              </div>
              <span className="text-[10px] font-mono text-gable-green">{calculateProgress()}%</span>
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
           <div className={cn(
             "px-3 py-1 border text-[10px] uppercase font-bold tracking-widest rounded flex items-center gap-1.5",
             WEBHOOK_URL
               ? "bg-gable-green/10 border-gable-green/20 text-gable-green"
               : "bg-amber-500/10 border-amber-500/20 text-amber-500"
           )}>
             <div className={cn(
               "w-1.5 h-1.5 rounded-full animate-pulse",
               WEBHOOK_URL ? "bg-gable-green" : "bg-amber-500"
             )} />
             {WEBHOOK_URL ? 'Live Sync Active' : 'Local Save Only'}
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
              ? "Your discovery audit has been submitted and locked for review. The FutureBuildAI team has been notified."
              : "Please complete the following technical audit. Each field auto-saves as you type. This data directly populates your Phase 1 Execution Plan."}
          </p>
        </div>

        {/* Identity intro */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 shadow-xl"
        >
          <div className="mb-5">
            <h2 className="text-sm font-bold tracking-tight text-white">Who's filling this out?</h2>
            <p className="text-[11px] text-zinc-500 mt-1">Required so we know whose responses these are. Saves automatically.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <IdentityInput icon={<User size={14} />} label="Your name" value={identity.name} onChange={v => updateIdentity('name', v)} disabled={isFinalized} placeholder="Jane Reed" />
            <IdentityInput icon={<Mail size={14} />} label="Email" value={identity.email} onChange={v => updateIdentity('email', v)} disabled={isFinalized} placeholder="jane@reedbuildingsupply.com" type="email" />
            <IdentityInput icon={<Building2 size={14} />} label="Company" value={identity.company} onChange={v => updateIdentity('company', v)} disabled={isFinalized} placeholder="Reed Building Supply" />
          </div>
        </motion.div>

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
                      {submitted[q.id] === 'saved' && values[q.id] && (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold tracking-tight">
                          <CheckCircle2 size={10} /> SAVED
                        </span>
                      )}
                      {submitted[q.id] === 'failed' && (
                        <span className="flex items-center gap-1 text-[10px] text-rose-400 font-bold tracking-tight">
                          <AlertCircle size={10} /> RETRY
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
                               : "border-white/5 focus:border-gable-green/50 focus:ring-1 focus:ring-gable-green/20"
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
                               : "border-white/5 focus:border-gable-green/50 focus:ring-1 focus:ring-gable-green/20"
                          )}
                          onBlur={() => handleSave(q.id)}
                        />
                      )}

                      {isSending === q.id && (
                         <div className="absolute right-3 top-4">
                           <div className="w-4 h-4 border-2 border-gable-green/20 border-t-gable-green rounded-full animate-spin" />
                         </div>
                      )}
                      {!isFinalized && submitted[q.id] !== 'saved' && !isSending && values[q.id] && (
                        <button
                          onClick={() => handleSave(q.id, true)}
                          className={cn(
                            "absolute right-2 p-2 hover:bg-gable-green/10 rounded-lg text-gable-green transition-all",
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
                 <p className="text-zinc-500 text-xs tracking-wide">
                   {isIdentityComplete
                     ? 'Ready to send the technical data for review?'
                     : 'Fill in name, email, and company above to enable final submit.'}
                 </p>
                 <button
                   onClick={handleFinalSubmit}
                   disabled={isFinalSubmitting || !isIdentityComplete || calculateProgress() < 10}
                   className="group relative flex items-center gap-3 bg-gable-green hover:bg-amber-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-deep-space font-bold px-10 py-4 rounded-2xl transition-all shadow-glow hover:shadow-glow-strong overflow-hidden disabled:shadow-none"
                 >
                   {isFinalSubmitting ? (
                     <>
                        <div className="w-5 h-5 border-2 border-deep-space/20 border-t-deep-space rounded-full animate-spin" />
                        Submitting to Sheet...
                     </>
                   ) : (
                     <>
                        <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                        Submit Final Audit
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
                   Your responses have been written to the FutureBuildAI Discovery Sheet and the team has been notified. We'll be in touch with the Phase 1 Statement of Work shortly.
                 </p>
                 <Link
                   to="/proposal"
                   className="mt-4 text-xs font-bold text-gable-green hover:text-amber-400 transition-colors uppercase tracking-widest flex items-center gap-2"
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

interface IdentityInputProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  placeholder: string;
  type?: string;
}

function IdentityInput({ icon, label, value, onChange, disabled, placeholder, type = 'text' }: IdentityInputProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
        {icon} {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full bg-[#111111] border rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none",
          disabled
            ? "border-emerald-500/10 text-emerald-400/50 cursor-not-allowed"
            : "border-white/5 focus:border-gable-green/50 focus:ring-1 focus:ring-gable-green/20"
        )}
      />
    </div>
  );
}
