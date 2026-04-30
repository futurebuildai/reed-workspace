import { motion } from 'framer-motion';
import { Server, ShieldCheck, Sparkles, CheckCircle2, Clock, Zap, Calendar } from 'lucide-react';

interface Tier {
  level: 'Foundation' | 'Active' | 'Partnership';
  tagline: string;
  price: string;
  bundledHours: string;
  hourValue?: string;
  features: string[];
  bestFor: string;
  recommended?: boolean;
  accent: 'zinc' | 'green' | 'purple';
  icon: typeof Server;
}

const TIERS: Tier[] = [
  {
    level: 'Foundation',
    tagline: 'Keep the lights on',
    price: '$250/mo',
    bundledHours: 'None — billed hourly',
    features: [
      'Reactive bug response (best-effort, business hours)',
      'No formal SLA — 99.5% uptime target',
      'Beyond-hosting work billed at standard rates ($175 Eng / $225 LA)',
    ],
    bestFor: 'Reed runs the system day-to-day, only calls when something needs fixing.',
    accent: 'zinc',
    icon: Server,
  },
  {
    level: 'Active',
    tagline: 'Steady improvement, reliable response',
    price: '$800/mo',
    bundledHours: '4 hours/mo (rolls 90 days)',
    hourValue: '$140/hr effective · 20% off standard',
    features: [
      'Quarterly upstream feature merges from GableLBM core',
      '99.9% uptime SLA · P1 < 4hr · P2 < 1 business day · P3 < 3 business days',
      'Patch management + priority bug queue',
      'Beyond bundle billed at standard hourly',
    ],
    bestFor: "Reed wants regular small improvements + a real SLA they can rely on. Recommended for Reed's first year.",
    recommended: true,
    accent: 'green',
    icon: ShieldCheck,
  },
  {
    level: 'Partnership',
    tagline: 'Growing system, proactive partnership',
    price: '$1,400/mo',
    bundledHours: '8 hours/mo (rolls 90 days)',
    hourValue: '$140/hr effective · 20% off standard',
    features: [
      'Monthly upstream feature merges (vs quarterly)',
      'Quarterly roadmap planning session with Reed leadership',
      'Faster P1 response · priority on feature requests',
      'Beyond bundle billed at standard hourly',
    ],
    bestFor: 'Reed is actively shipping Phase 2 modules and wants a partner moving in lockstep.',
    accent: 'purple',
    icon: Sparkles,
  },
];

const COMMON = [
  'DigitalOcean NYC3 hosting (compute + Managed PostgreSQL HA)',
  'Daily volume snapshots, 30-day retention, offsite copy to DO Spaces',
  'Point-in-time database recovery (7-day window)',
  'Uptime monitoring + alerting',
  'Encrypted at rest (AES-256) + Cloudflare TLS/WAF',
];

const ACCENT_CLASSES = {
  zinc: {
    border: 'border-white/10',
    bg: 'bg-white/[0.02]',
    text: 'text-zinc-400',
    iconBg: 'bg-white/5',
    iconText: 'text-zinc-400',
    eyebrow: 'text-zinc-500',
  },
  green: {
    border: 'border-gable-green/40',
    bg: 'bg-gable-green/[0.07]',
    text: 'text-gable-green',
    iconBg: 'bg-gable-green/20',
    iconText: 'text-gable-green',
    eyebrow: 'text-gable-green',
  },
  purple: {
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/[0.05]',
    text: 'text-purple-300',
    iconBg: 'bg-purple-500/15',
    iconText: 'text-purple-300',
    eyebrow: 'text-purple-300',
  },
};

export function SlideManagedServices() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gable-green/20 text-gable-green px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-gable-green/30">
          Ongoing Partnership · Reed Picks Post-Launch
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Pick Your <span className="text-gable-green">Monthly Tier</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto text-sm leading-relaxed">
          Three tiers, one decision: how much hands-on partnership does Reed want each month? All tiers run on the same infrastructure with the same backups — only support hours, feature merges, and SLA differ.
        </p>
      </div>

      {/* Three-tier cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {TIERS.map((tier, i) => {
          const a = ACCENT_CLASSES[tier.accent];
          return (
            <motion.div
              key={tier.level}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border ${a.border} ${a.bg} p-5 flex flex-col relative ${tier.recommended ? 'shadow-glow' : ''}`}
            >
              {tier.recommended && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gable-green text-deep-space text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                  Recommended for Reed
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg ${a.iconBg} flex items-center justify-center shrink-0`}>
                  <tier.icon size={15} className={a.iconText} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${a.eyebrow}`}>Tier {i + 1}</span>
              </div>
              <h3 className="font-bold text-base text-white mb-1">{tier.level}</h3>
              <p className="text-[11px] text-zinc-500 italic mb-4">{tier.tagline}</p>
              <div className="text-3xl font-bold text-white mb-1 font-data">{tier.price}</div>
              <div className="text-[10px] text-zinc-500 mb-4 font-mono uppercase tracking-wider">{tier.bundledHours}</div>
              {tier.hourValue && (
                <div className={`text-[10px] ${a.text} mb-4 font-medium`}>{tier.hourValue}</div>
              )}
              <ul className="space-y-2 text-[11px] text-zinc-300 leading-snug flex-1">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-1.5">
                    <CheckCircle2 size={11} className={`${a.iconText} shrink-0 mt-0.5`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="text-[9px] uppercase tracking-widest font-bold text-zinc-500 mb-1">Best for</div>
                <p className="text-[11px] text-zinc-400 leading-snug">{tier.bestFor}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* "Same across all tiers" common card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-white/10 bg-deep-space/50 p-5 mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Server size={14} className="text-zinc-400" />
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Included in every tier — never an upcharge</h4>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
          {COMMON.map((item, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-400">
              <CheckCircle2 size={10} className="text-zinc-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bundle math + flexibility */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-4 flex items-start gap-3">
          <Clock size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h5 className="font-bold text-sm text-white mb-1">How the bundled hours work</h5>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              Bundled hours billed at <span className="text-amber-300 font-semibold">$140/hr</span> — a <span className="text-amber-300 font-semibold">20% discount</span> off the standard $175 Engineer rate. Hours <span className="text-white">roll forward 90 days</span> if unused. Anything beyond the bundle bills at standard hourly with no markup.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gable-green/20 bg-gable-green/5 p-4 flex items-start gap-3">
          <Zap size={16} className="text-gable-green shrink-0 mt-0.5" />
          <div className="flex-1">
            <h5 className="font-bold text-sm text-white mb-1">Switch tiers anytime</h5>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              Reed can move up or down between tiers with 30 days notice. Most customers start at <span className="text-gable-green font-semibold">Active</span> and consider Partnership only once Phase 2 modules are actively shipping. No long-term contract.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2-year service agreement note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 p-4 rounded-2xl border border-gable-green/25 bg-gable-green/[0.05] flex items-start gap-3"
      >
        <Calendar size={16} className="text-gable-green shrink-0 mt-0.5" />
        <div className="flex-1">
          <h5 className="font-bold text-sm text-white mb-1">Pricing assumes a 2-year service agreement</h5>
          <p className="text-[11px] text-zinc-300 leading-relaxed">
            Tier prices above are list rates for a <span className="text-gable-green font-semibold">2-year MSP commitment</span>. Reed locks the tier price for the full term — no annual increases. Month-to-month or shorter terms are available at higher rates; we'll quote on request.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
