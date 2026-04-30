import { Shield, Cloud, Database, Globe, Zap, HelpCircle, Archive } from 'lucide-react';

export function SlideInfrastructure() {
  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">High-Availability <span className="text-gable-green">Architecture</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">Enterprise-grade infrastructure with multi-cloud redundancy and US East data residency — closest to Reed's McKees Rocks operations.</p>
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

          <div className="glass-card rounded-2xl p-6 border-emerald-500/20 bg-emerald-500/[0.03]">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Archive size={20} className="text-emerald-400" />
              Data Protection & Recovery
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-deep-space/60 rounded-lg p-3 border border-white/5">
                <div className="text-[9px] uppercase tracking-widest font-bold text-emerald-400/80 mb-1">Database PITR</div>
                <div className="text-xs text-white font-mono">7-day window</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">point-in-time restore</div>
              </div>
              <div className="bg-deep-space/60 rounded-lg p-3 border border-white/5">
                <div className="text-[9px] uppercase tracking-widest font-bold text-emerald-400/80 mb-1">Volume Snapshots</div>
                <div className="text-xs text-white font-mono">Daily · 7-day</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">automated, encrypted</div>
              </div>
              <div className="bg-deep-space/60 rounded-lg p-3 border border-white/5">
                <div className="text-[9px] uppercase tracking-widest font-bold text-emerald-400/80 mb-1">Tier 2 Extended</div>
                <div className="text-xs text-white font-mono">30-day offsite</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">DO Spaces archive</div>
              </div>
              <div className="bg-deep-space/60 rounded-lg p-3 border border-white/5">
                <div className="text-[9px] uppercase tracking-widest font-bold text-emerald-400/80 mb-1">RPO / RTO</div>
                <div className="text-xs text-white font-mono">&lt; 1hr / &lt; 4hr</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">tier 2 SLA</div>
              </div>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              All backups encrypted at rest (AES-256). Quarterly restore drills validate recovery procedures. Optional on-prem export sync available for Reed's local archive requirements.
            </p>
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
                  Intelligence is baked in, not bolted on. Our US East LLM endpoints power automated categorization and predictive analytics with low latency to McKees Rocks.
                </p>
              </div>
            </div>
            
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold pt-4">
              uptime commitment: 99.9%
            </p>
          </div>
        </div>
      </div>

      {/* Open Requirements */}
      <div className="mt-10 glass-card rounded-2xl p-6 border-gable-green/20 bg-gable-green/5">
        <h4 className="font-bold text-sm text-gable-green mb-4 flex items-center gap-2">
          <HelpCircle size={16} />
          Open Questions / Requirements
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-deep-space/40 rounded-xl p-4 border border-white/5">
            <span className="text-[10px] font-bold text-gable-green uppercase block mb-2">Offline Mode Operations</span>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Do yard operations require an offline-capable mode for POS or inventory lookup during internet outages? What is the acceptable sync delay when connectivity resumes?
            </p>
          </div>
          <div className="bg-deep-space/40 rounded-xl p-4 border border-white/5">
            <span className="text-[10px] font-bold text-gable-green uppercase block mb-2">SSO / Identity Provider</span>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Does Reed use Google Workspace or Microsoft 365 as the identity backbone? SSO can land in Phase 2 once the user model and role tiers are validated in Phase 1.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
