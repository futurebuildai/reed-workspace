import { BookOpen, Bot, HelpCircle, Code, FileText } from 'lucide-react';

export function SlideWiki() {
  const sections = [
    { name: 'LBM to Hardscape Research', icon: FileText, color: 'text-blue-400' },
    { name: 'Product Assumptions', icon: BookOpen, color: 'text-purple-400' },
    { name: 'User Stories & Epics', icon: HelpCircle, color: 'text-amber-400' },
    { name: 'Architecture Specs', icon: Code, color: 'text-emerald-400' },
  ];

  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Foundation: <span className="text-gable-green">Product Wiki</span></h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">We've already started documenting your business. This living wiki lays the groundwork for your implementation.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border-white/5 bg-deep-space/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gable-green/10 rounded-lg">
                <BookOpen size={20} className="text-gable-green" />
              </div>
              <h3 className="font-bold">Preliminary Research Log</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {sections.map((s, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/2 hover:border-white/10 transition-colors">
                  <s.icon size={18} className={`${s.color} mb-3`} />
                  <span className="text-xs font-bold text-white">{s.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[11px] text-zinc-500 leading-relaxed italic">
              "We don't start from scratch. Our LBM-to-Hardscape research defines the delta between generic lumber ERPs and your specific yard workflows."
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gable-green/20 bg-gable-green/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gable-green/20 flex items-center justify-center shrink-0">
              <span className="text-lg font-bold text-gable-green">P0</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-1 tracking-tight">Phase 0 Deliverable</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                This foundation proves our understanding of your business and immediately sets the stage for the future Product Agent integration.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 border-white/5 relative bg-slate-steel/40 overflow-hidden group flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-4">
            <div className="flex items-center gap-2 bg-gable-green/10 border border-gable-green/20 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 bg-gable-green rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-gable-green">Future Product Agent</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8 mt-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gable-green/20 to-amber-600/20 border border-gable-green/30 flex items-center justify-center shadow-glow">
              <Bot size={24} className="text-gable-green" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Knowledge Chat</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Embedded Support</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-white/5 rounded-2xl rounded-bl-none text-xs text-zinc-400 max-w-[85%]">
              What assumption did we make about Techo-Bloc pallet weights vs. Unilock?
            </div>
            <div className="p-3 bg-gable-green/10 border border-gable-green/20 rounded-2xl rounded-br-none text-xs text-white max-w-[95%] ml-auto leading-relaxed">
              Based on our <strong>Product Assumptions</strong> log:
              <br/><br/>
              We noted that Techo-Bloc pallets often exceed 3,500 lbs, requiring a different forklift capacity check in the dispatch engine compared to standard Unilock pallets which average closer to 2,800 lbs.
            </div>
            <div className="p-2 border border-blue-400/20 bg-blue-400/5 rounded-lg text-[10px] text-blue-400 text-center cursor-pointer mt-2">
              View Original Assumption Document →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
