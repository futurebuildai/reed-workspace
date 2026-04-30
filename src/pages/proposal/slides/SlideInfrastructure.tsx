import { Shield, Cloud, Database, Globe, Zap, HelpCircle, WifiOff } from 'lucide-react';

export function SlideInfrastructure() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">High-Availability <span className="text-gable-green">Architecture</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">Enterprise-grade infrastructure with multi-cloud redundancy and US East data residency — closest to Reed Building Supply operations.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border-white/5 bg-deep-space/30">
            <h3 className="font-bold flex items-center gap-2 mb-6">
              <Cloud size={20} className="text-blue-400" />
              Primary Stack (DigitalOcean — NYC3)
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Compute', val: 'DigitalOcean Premium Droplets' },
                { label: 'Database', val: 'Managed PostgreSQL (HA pair)' },
                { label: 'Object Storage', val: 'DO Spaces (S3-compatible)' },
                { label: 'CDN / Edge', val: 'Cloudflare (TLS, DDoS, WAF)' },
                { label: 'Payments', val: 'Run Payments (POS + on-account + ACH)' },
                { label: 'Integrations', val: 'Open API Layer (REST/JSON)' },
                { label: 'Messaging', val: 'NATS JetStream (Event Bus)' },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-none">
                  <span className="text-xs text-zinc-500">{row.label}</span>
                  <span className="text-xs font-mono text-white">{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border-white/5 bg-deep-space/30">
            <h3 className="font-bold flex items-center gap-2 mb-6">
              <Zap size={20} className="text-purple-400" />
              AI-Native Services (US East)
            </h3>
            <div className="space-y-4">
              {[
                { label: 'AI Inference', val: 'GCP Vertex AI / us-east4 (Virginia)' },
                { label: 'Model APIs', val: 'OpenAI · Anthropic · Vertex (pass-through)' },
                { label: 'Automations', val: 'Easy Flow Integration Engine' },
                { label: 'Audit Logs', val: 'Cloud Logging (Immutable)' },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-none">
                  <span className="text-xs text-zinc-500">{row.label}</span>
                  <span className="text-xs font-mono text-white">{row.val}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-purple-200/70 leading-relaxed mt-3 pt-3 border-t border-white/5">
              <span className="font-bold text-purple-300">Model API usage</span> billed as-incurred each month (typical &lt; $100/mo). Deep enrichment runs pre-quoted separately.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gable-green/5 rounded-full blur-[100px] -z-10" />
          <div className="glass-card rounded-3xl p-8 border-white/10 shadow-elevation-3 text-center space-y-8">
            <div className="flex justify-center flex-wrap gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center gap-2 min-w-[120px]">
                <Shield size={24} className="text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Zero Trust</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center gap-2 min-w-[120px]">
                <Globe size={24} className="text-gable-green" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Open API</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center gap-2 min-w-[120px]">
                <Database size={24} className="text-blue-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Encrypted</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-left">
                <span className="text-[10px] font-bold text-emerald-500 uppercase block mb-1">Open & Easy Integration</span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Our system is built for easy connectivity with existing tools. Whether via our Open API or pre-built connectors, data flows freely without silos.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-left">
                <span className="text-[10px] font-bold text-blue-500 uppercase block mb-1">AI-Native Core</span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Intelligence is baked in, not bolted on. Our US East LLM endpoints power automated categorization and predictive analytics with low latency to Reed Building Supply.
                </p>
              </div>
            </div>
            
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold pt-4">
              uptime commitment: 99.9%
            </p>
          </div>
        </div>
      </div>

      {/* Confirmed Phase 1 inclusion + Open question */}
      <div className="mt-10 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] p-5">
          <div className="flex items-center gap-2 mb-3">
            <WifiOff size={14} className="text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Confirmed in Phase 1 Scope</span>
          </div>
          <h4 className="font-bold text-sm text-white mb-2">Offline Mode for POS + Inventory</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            POS terminals and inventory lookup keep working during internet outages. Local-first writes queue on the device and auto-sync when connectivity resumes — no manual reconciliation required. Acceptable sync delay validated during UAT.
          </p>
        </div>
        <div className="rounded-2xl border border-gable-green/20 bg-gable-green/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle size={14} className="text-gable-green" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gable-green">Open Question</span>
          </div>
          <h4 className="font-bold text-sm text-white mb-2">SSO / Identity Provider</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Does Reed use Google Workspace or Microsoft 365 as the identity backbone? SSO can land in Phase 2 once the user model and role tiers are validated in Phase 1.
          </p>
        </div>
      </div>
    </div>
  );
}
