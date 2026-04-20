import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard,
  Database,
  Workflow,
  FileText,
  Shield,
  LogOut
} from 'lucide-react';
import { DiscoveryBoard } from './DiscoveryBoard';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-gable-green/10 text-gable-green border border-gable-green/20' 
        : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
    }`}
  >
    <Icon size={18} />
    <span className="font-medium text-sm">{label}</span>
    {active && <motion.div layoutId="activeNav" className="ml-auto w-1 h-4 bg-gable-green rounded-full" />}
  </button>
);

export function Phase0Layout() {
  const [activeTab, setActiveTab] = useState('board');
  const [isSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-deep-space text-white font-sans selection:bg-gable-green/30">
      {/* Top Banner */}
      <div className="h-14 border-b border-white/5 bg-deep-space/80 backdrop-blur-xl fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-lg">Reed Building Materials</span>
            <span className="text-zinc-600">×</span>
            <span className="font-bold tracking-tight">GableX<span className="text-gable-green font-light">Hardscape</span></span>
          </div>
          <div className="h-4 w-px bg-white/10 hidden md:block" />
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold hidden md:block">Phase 0 Discovery Room</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-deep-space bg-zinc-800 flex items-center justify-center text-[10px] font-bold">D</div>
            <div className="w-8 h-8 rounded-full border-2 border-deep-space bg-gable-green flex items-center justify-center text-[10px] font-bold text-deep-space">G</div>
          </div>
          <button className="text-zinc-500 hover:text-white transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="flex pt-14 h-screen overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: isSidebarOpen ? 260 : 0, opacity: isSidebarOpen ? 1 : 0 }}
          className="border-r border-white/5 bg-[#0C0D12]/50 backdrop-blur-md overflow-hidden relative"
        >
          <div className="p-4 space-y-2 w-[260px]">
            <div className="mb-8 px-2">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gable-green/50 mb-1">Execution Track</h2>
              <div className="text-xs text-zinc-400">Blueprint & Discovery</div>
            </div>

            <NavItem 
              icon={LayoutDashboard} 
              label="Discovery Board" 
              active={activeTab === 'board'} 
              onClick={() => setActiveTab('board')}
            />
            <NavItem 
              icon={Database} 
              label="Data Schema" 
              active={activeTab === 'data'} 
              onClick={() => setActiveTab('data')}
            />
            <NavItem 
              icon={Workflow} 
              label="Workflow Mapping" 
              active={activeTab === 'workflow'} 
              onClick={() => setActiveTab('workflow')}
            />
            <NavItem 
              icon={FileText} 
              label="Blueprint Assets" 
              active={activeTab === 'assets'} 
              onClick={() => setActiveTab('assets')}
            />
            <div className="pt-4 mt-4 border-t border-white/5">
              <NavItem 
                icon={Shield} 
                label="Security & Staging" 
                active={activeTab === 'security'} 
                onClick={() => setActiveTab('security')}
              />
            </div>
          </div>
          
          <div className="absolute bottom-6 inset-x-0 px-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-gable-green/20 to-transparent border border-gable-green/10">
              <div className="text-[10px] uppercase tracking-wider font-bold text-gable-green mb-2">Phase 0 Status</div>
              <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                <div className="h-full w-1/4 bg-gable-green rounded-full" />
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-zinc-500 font-medium">
                <span>Setup</span>
                <span>25%</span>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/2 to-transparent">
          <div className="max-w-7xl mx-auto p-8 pt-12">
            <AnimatePresence mode="wait">
              {activeTab === 'board' ? (
                <motion.div
                  key="board"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <DiscoveryBoard />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[60vh] flex flex-col items-center justify-center text-center p-12"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <LayoutDashboard size={32} className="text-zinc-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Workspace Initializing</h3>
                  <p className="text-zinc-500 max-w-sm">This track section will unlock as we progress through the Phase 0 discovery timeline.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
