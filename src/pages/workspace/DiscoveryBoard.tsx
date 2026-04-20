import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Circle, 
  CheckCircle2, 
  Clock, 
  UploadCloud, 
  MoreHorizontal, 
  Plus,
  Server,
  Users,
  Database,
  CreditCard,
  FileSpreadsheet
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'todo' | 'review' | 'done';
  description: string;
  icon: React.ElementType;
}

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Branch Infrastructure Audit',
    category: 'Hosting & Scaling',
    priority: 'High',
    status: 'todo',
    description: 'Provide details on all physical locations (Kingston, Trenton, etc.), total branch count, and local server hardware status.',
    icon: Server
  },
  {
    id: '2',
    title: 'User Access Matrix',
    category: 'Implementation Scope',
    priority: 'Medium',
    status: 'todo',
    description: 'Document total headcount across Counter Sales, Yard Operations, and Backoffice Admin roles for concurrency planning.',
    icon: Users
  },
  {
    id: '3',
    title: 'BisTrack Database Snapshot',
    category: 'Data Migration',
    priority: 'High',
    status: 'todo',
    description: 'Current database size (GB) and historical depth requirements (how many years of history must be live?).',
    icon: Database
  },
  {
    id: '4',
    title: 'Payment Terminal Inventory',
    category: 'Integrated Payments',
    priority: 'Medium',
    status: 'todo',
    description: 'Listing of all current physical payment terminals (Manufacturer/Model) and current gateways used.',
    icon: CreditCard
  },
  {
    id: '5',
    title: 'Chart of Accounts (GL)',
    category: 'Accounting Migration',
    priority: 'High',
    status: 'todo',
    description: 'Export current Great Plains chart of accounts to CSV for mapping to native GableX GL.',
    icon: FileSpreadsheet
  },
  {
    id: '6',
    title: 'Custom BisTrack Fields',
    category: 'Architecture',
    priority: 'High',
    status: 'review',
    description: 'List of all custom fields or proprietary table modifications added to your BisTrack instance.',
    icon: MoreHorizontal
  }
];

export function DiscoveryBoard() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('reed_discovery_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem('reed_discovery_tasks', JSON.stringify(newTasks));
  };

  const filterTasks = (status: string) => tasks.filter(t => t.status === status);

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Discovery <span className="text-gable-green">Tracker</span></h1>
          <p className="text-zinc-500 max-w-xl">Project Phase 0: Blueprints & Technical Scoping. Complete these items to finalize the Phase 1 Statement of Work.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all">
            Filter by Category
          </button>
          <button className="px-4 py-2 rounded-lg bg-gable-green text-deep-space text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-glow">
            Add Discovery Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do (Client Action) */}
        <Column 
          title="To Do (Client Action)" 
          count={filterTasks('todo').length} 
          status="todo"
        >
          {filterTasks('todo').map(task => (
            <TaskCard key={task.id} task={task} onStatusChange={(id, status) => {
              const newTasks = tasks.map(t => t.id === id ? { ...t, status } : t);
              saveTasks(newTasks);
            }} />
          ))}
        </Column>

        {/* Under Review (FutureBuild) */}
        <Column 
          title="Under Review" 
          count={filterTasks('review').length} 
          status="review"
        >
          {filterTasks('review').map(task => (
            <TaskCard key={task.id} task={task} onStatusChange={(id, status) => {
              const newTasks = tasks.map(t => t.id === id ? { ...t, status } : t);
              saveTasks(newTasks);
            }} />
          ))}
        </Column>

        {/* Completed */}
        <Column 
          title="Completed" 
          count={filterTasks('done').length} 
          status="done"
        >
          {filterTasks('done').map(task => (
            <TaskCard key={task.id} task={task} onStatusChange={(id, status) => {
              const newTasks = tasks.map(t => t.id === id ? { ...t, status } : t);
              saveTasks(newTasks);
            }} />
          ))}
        </Column>
      </div>
    </div>
  );
}

function Column({ title, count, children, status }: { title: string, count: number, children: React.ReactNode, status: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${
            status === 'todo' ? 'bg-zinc-500' : status === 'review' ? 'bg-gable-green' : 'bg-emerald-500'
          }`} />
          <h3 className="font-bold text-sm text-zinc-400 uppercase tracking-wider">{title}</h3>
        </div>
        <span className="text-xs font-mono text-zinc-600 font-bold">{count}</span>
      </div>
      <div className="space-y-4 min-h-[500px]">
        {children}
        <button className="w-full h-12 border border-dashed border-white/5 rounded-2xl flex items-center justify-center gap-2 text-zinc-600 hover:text-zinc-400 hover:border-white/10 transition-all">
          <Plus size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">New Question</span>
        </button>
      </div>
    </div>
  );
}

function TaskCard({ task, onStatusChange }: { task: Task, onStatusChange: (id: string, status: 'todo' | 'review' | 'done') => void }) {
  const nextStatus = task.status === 'todo' ? 'review' : task.status === 'review' ? 'done' : 'todo';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group p-5 rounded-2xl bg-[#171921] border border-white/5 hover:border-gable-green/30 transition-all cursor-pointer relative overflow-hidden shadow-sm"
    >
      {/* Category Pill */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase bg-white/5 px-2 py-0.5 rounded">
          {task.category}
        </span>
        <div className={`text-[10px] font-bold px-2 py-0.5 rounded ${
          task.priority === 'High' ? 'text-red-400 bg-red-400/10' : 
          task.priority === 'Medium' ? 'text-gable-green bg-gable-green/10' : 
          'text-zinc-500 bg-zinc-500/10'
        }`}>
          {task.priority}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-deep-space border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-gable-green group-hover:border-gable-green/30 transition-all">
          <task.icon size={20} />
        </div>
        <div className="min-w-0" onClick={() => onStatusChange(task.id, nextStatus)}>
          <h4 className="font-bold text-sm mb-1 group-hover:text-gable-green transition-colors truncate">{task.title}</h4>
          <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{task.description}</p>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2" onClick={(e) => { e.stopPropagation(); onStatusChange(task.id, nextStatus); }}>
          {task.status === 'todo' ? (
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-bold uppercase tracking-widest hover:text-gable-green transition-colors">
              <Clock size={12} /> Pending
            </div>
          ) : task.status === 'review' ? (
            <div className="flex items-center gap-1.5 text-[10px] text-gable-green font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">
              <Circle size={12} className="animate-pulse fill-gable-green/20" /> In Review
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-bold uppercase tracking-widest hover:text-zinc-500 transition-colors">
              <CheckCircle2 size={12} /> Accepted
            </div>
          )}
        </div>
        <button className="flex items-center gap-1.5 text-[10px] text-zinc-500 hover:text-white transition-colors uppercase tracking-widest font-bold">
          <UploadCloud size={12} /> {task.status === 'todo' ? 'Drop File' : 'View Docs'}
        </button>
      </div>
    </motion.div>
  );
}
