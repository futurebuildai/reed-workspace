import { motion } from 'framer-motion';
import { Calendar, Layers, Flag } from 'lucide-react';

export function SlideRollout() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Implementation <span className="text-stone-amber">Roadmap</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">A data-driven transition designed to minimize operational risk.</p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-stone-amber/5 via-stone-amber/20 to-stone-amber/5 -translate-y-1/2 hidden md:block" />

        <div className="grid md:grid-cols-4 gap-6 relative z-10">
          {[
            {
              phase: 'Phase 0',
              title: 'Blueprint & Agent Setup',
              icon: Layers,
              items: ['Workflow Discovery Audit', 'Dedicated Agent Env', 'Security & Staging Setup', '10 Consulting Hours Incl.'],
              status: '1-2 Months / $500',
              active: true,
              detail: '$250 one-time setup labor + $250/mo infra. Monthly fee rolls into Phase 1 if proceeding.'
            },
            {
              phase: 'Phase 1',
              title: 'Foundation & Sandbox',
              icon: Layers,
              items: ['Core ERP Build', 'Live Parallel Sandbox', 'BisTrack Data Migration', 'Open Integration Setup'],
              status: '2-3 Months',
              active: false
            },
            {
              phase: 'Phase 2',
              title: 'Enhanced Ops',
              icon: ZapIcon,
              items: ['Whitelabeled Contractor OS', 'AI-Native Analytics', 'Full Staff Onboarding', 'Customer Success Sync'],
              status: '2 Months',
              active: false
            },
            {
              phase: 'Cutover',
              title: 'Production Transition',
              icon: Flag,
              items: ['Begins during Phase 2', 'Validation Sign-off', 'Hypercare Support', 'Legacy Sunset'],
              status: 'Overlaps Ph 2',
              active: false,
              detail: 'Cutover begins once core Phase 1 features are production-ready with migrated BisTrack data.'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className={`glass-card rounded-2xl p-6 border-white/5 flex flex-col items-center text-center group hover:border-stone-amber/30 transition-all ${item.active ? 'bg-stone-amber/5 ring-1 ring-stone-amber/20' : ''}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${item.active ? 'bg-stone-amber text-deep-earth' : 'bg-white/5 text-zinc-500'}`}>
                <item.icon size={24} />
              </div>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-2 ${item.active ? 'text-stone-amber' : 'text-zinc-600'}`}>{item.phase}</span>
              <h3 className="text-lg font-bold mb-4">{item.title}</h3>
              <ul className="space-y-3 text-xs text-zinc-400 mb-6 flex-1 text-left w-full">
                {item.items.map((li, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-stone-amber mt-1">•</span>
                    {li}
                  </li>
                ))}
              </ul>
              {item.detail && (
                <p className="text-[10px] text-zinc-500 mb-4 italic leading-tight">
                  {item.detail}
                </p>
              )}
              <div className="pt-4 border-t border-white/5 w-full flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                <Calendar size={12} />
                {item.status}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 glass-card rounded-xl p-6 border-white/5 bg-deep-earth/50">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-emerald-500/10 rounded-lg shrink-0">
            <CheckCircle2 size={20} className="text-emerald-500" />
          </div>
          <div>
            <h4 className="font-bold text-sm mb-1">Parallel Sandbox Commitment</h4>
            <p className="text-xs text-zinc-400 leading-relaxed italic">
              "We don't do 'big bang' go-lives. We run a live sandbox in parallel with BisTrack for 60+ days to ensure 100% data integrity before you ever switch your team over."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZapIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function CheckCircle2({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
