import { useState, useEffect, useCallback } from 'react';
import { Shield, AlertTriangle, Clock, Plus, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { cn } from '../../lib/utils';

const API_URL = import.meta.env.VITE_API_URL || '';

interface LienNotice {
    id: string;
    account_id: string;
    project_name: string;
    supply_date: string;
    preservation_deadline: string;
    holdback_amount: number;
    invoice_id: string | null;
    status: string;
    notes: string;
    created_at: string;
    updated_at: string;
}

interface LienAlert {
    id: string;
    account_id: string;
    project_name: string;
    supply_date: string;
    preservation_deadline: string;
    holdback_amount: number;
    invoice_id: string | null;
    status: string;
    notes: string;
    created_at: string;
    updated_at: string;
    days_remaining: number;
    severity: string;
}

interface CreateLienForm {
    project_name: string;
    supply_date: string;
    invoice_total: string;
    notes: string;
}

export function LienNoticeTab({ accountId }: { accountId: string }) {
    const [notices, setNotices] = useState<LienNotice[]>([]);
    const [alerts, setAlerts] = useState<LienAlert[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [creating, setCreating] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'active' | 'preserved' | 'expired' | 'released'>('active');
    const [form, setForm] = useState<CreateLienForm>({
        project_name: '',
        supply_date: new Date().toISOString().split('T')[0],
        invoice_total: '',
        notes: '',
    });

    const fetchNotices = useCallback(async () => {
        try {
            const params = new URLSearchParams({ account_id: accountId });
            if (filter !== 'all') params.append('status', filter);
            const res = await fetch(`${API_URL}/api/v1/lien-notices?${params}`);
            if (res.ok) setNotices(await res.json());
        } catch {
            console.error('Failed to load lien notices');
        } finally {
            setLoading(false);
        }
    }, [accountId, filter]);

    const fetchAlerts = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/api/v1/lien-notices/alerts`);
            if (res.ok) {
                const allAlerts: LienAlert[] = await res.json();
                setAlerts(allAlerts.filter(a => a.account_id === accountId));
            }
        } catch {
            console.error('Failed to load lien alerts');
        }
    }, [accountId]);

    useEffect(() => { fetchNotices(); }, [fetchNotices]);
    useEffect(() => { fetchAlerts(); }, [fetchAlerts]);

    const handleCreate = async () => {
        if (!form.project_name || !form.supply_date || !form.invoice_total) return;
        setCreating(true);
        try {
            const res = await fetch(`${API_URL}/api/v1/lien-notices`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    account_id: accountId,
                    project_name: form.project_name,
                    supply_date: new Date(form.supply_date).toISOString(),
                    invoice_total: parseFloat(form.invoice_total),
                    notes: form.notes,
                }),
            });
            if (res.ok) {
                setShowCreate(false);
                setForm({ project_name: '', supply_date: new Date().toISOString().split('T')[0], invoice_total: '', notes: '' });
                fetchNotices();
                fetchAlerts();
            }
        } catch {
            console.error('Failed to create lien notice');
        } finally {
            setCreating(false);
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        setUpdatingId(id);
        try {
            const res = await fetch(`${API_URL}/api/v1/lien-notices/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                fetchNotices();
                fetchAlerts();
            }
        } catch {
            console.error('Failed to update lien status');
        } finally {
            setUpdatingId(null);
        }
    };

    const getDaysRemaining = (deadline: string) => {
        const diff = new Date(deadline).getTime() - Date.now();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const getSeverityStyle = (daysRemaining: number) => {
        if (daysRemaining <= 2) return { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', label: 'CRITICAL' };
        if (daysRemaining <= 5) return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', label: 'URGENT' };
        if (daysRemaining <= 15) return { bg: 'bg-amber-400/10', text: 'text-amber-300', border: 'border-amber-400/20', label: 'WARNING' };
        return { bg: 'bg-blue-400/10', text: 'text-blue-400', border: 'border-blue-400/20', label: 'INFO' };
    };

    const statusStyles: Record<string, string> = {
        active: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
        preserved: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
        expired: 'bg-rose-400/10 text-rose-400 border-rose-400/20',
        released: 'bg-zinc-400/10 text-zinc-400 border-zinc-400/20',
    };

    const formatCAD = (amount: number) =>
        new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);

    return (
        <div className="space-y-6">
            {/* Alert Banner */}
            {alerts.length > 0 && (
                <div className="space-y-2">
                    {alerts.map(alert => {
                        const severity = getSeverityStyle(alert.days_remaining);
                        return (
                            <div
                                key={alert.id}
                                className={cn('flex items-center gap-3 p-3 rounded-lg border', severity.bg, severity.border)}
                            >
                                <AlertTriangle className={cn('w-5 h-5 shrink-0', severity.text)} />
                                <div className="flex-1">
                                    <span className={cn('text-sm font-medium', severity.text)}>
                                        {alert.project_name}
                                    </span>
                                    <span className="text-zinc-400 text-sm ml-2">
                                        — {alert.days_remaining} day{alert.days_remaining !== 1 ? 's' : ''} until preservation deadline
                                    </span>
                                </div>
                                <span className={cn('px-2 py-0.5 rounded text-xs font-bold border', severity.bg, severity.text, severity.border)}>
                                    {severity.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Header + Create */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gable-green" />
                    <h3 className="text-lg font-semibold text-white">Lien Notices</h3>
                    <span className="text-xs text-zinc-500">Ontario Construction Act — 60-day preservation, 10% holdback</span>
                </div>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gable-green/10 text-gable-green border border-gable-green/20 hover:bg-gable-green/20 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Lien Notice
                </button>
            </div>

            {/* Create Form */}
            {showCreate && (
                <Card className="p-5 border border-gable-green/20 bg-gable-green/5">
                    <h4 className="text-sm font-semibold text-white mb-4">Create Lien Notice</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-zinc-500 uppercase block mb-1">Project Name</label>
                            <input
                                type="text"
                                value={form.project_name}
                                onChange={e => setForm({ ...form, project_name: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-gable-green/50 outline-none"
                                placeholder="e.g. 123 Main St Patio"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase block mb-1">Supply Date</label>
                            <input
                                type="date"
                                value={form.supply_date}
                                onChange={e => setForm({ ...form, supply_date: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-gable-green/50 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase block mb-1">Invoice Total (CAD)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.invoice_total}
                                onChange={e => setForm({ ...form, invoice_total: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm font-mono focus:border-gable-green/50 outline-none"
                                placeholder="0.00"
                            />
                            {form.invoice_total && (
                                <p className="text-xs text-zinc-500 mt-1">
                                    Holdback: {formatCAD(parseFloat(form.invoice_total) * 0.10)} (10%)
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase block mb-1">Notes</label>
                            <input
                                type="text"
                                value={form.notes}
                                onChange={e => setForm({ ...form, notes: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white text-sm focus:border-gable-green/50 outline-none"
                                placeholder="Optional notes"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end mt-4">
                        <button
                            onClick={() => setShowCreate(false)}
                            className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreate}
                            disabled={creating || !form.project_name || !form.invoice_total}
                            className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gable-green text-black hover:bg-gable-green/90 transition-colors disabled:opacity-50"
                        >
                            {creating ? 'Creating...' : 'Create Lien Notice'}
                        </button>
                    </div>
                </Card>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2">
                {(['active', 'preserved', 'expired', 'released', 'all'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => { setFilter(f); setLoading(true); }}
                        className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                            filter === f
                                ? 'bg-gable-green/10 text-gable-green border border-gable-green/20'
                                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        )}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Notice List */}
            <Card variant="glass" noPadding>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5 text-zinc-500 text-xs uppercase tracking-wider">
                                <th className="px-4 py-3 text-left">Project</th>
                                <th className="px-4 py-3 text-left">Supply Date</th>
                                <th className="px-4 py-3 text-left">Deadline</th>
                                <th className="px-4 py-3 text-right">Holdback</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-zinc-500 animate-pulse">
                                        Loading lien notices...
                                    </td>
                                </tr>
                            ) : notices.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3 text-zinc-500">
                                            <Shield className="w-8 h-8 text-zinc-600" />
                                            <p>No {filter === 'all' ? '' : filter} lien notices.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                notices.map(n => {
                                    const daysRemaining = getDaysRemaining(n.preservation_deadline);
                                    const isActive = n.status === 'active';
                                    const deadlineSeverity = isActive && daysRemaining <= 15
                                        ? getSeverityStyle(daysRemaining)
                                        : null;

                                    return (
                                        <tr key={n.id} className="hover:bg-white/5">
                                            <td className="px-4 py-3">
                                                <div className="text-white font-medium">{n.project_name || '(unnamed)'}</div>
                                                {n.invoice_id && (
                                                    <div className="text-xs text-zinc-500 font-mono">
                                                        Inv: {n.invoice_id.substring(0, 8)}...
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-zinc-300 font-mono text-xs">
                                                {new Date(n.supply_date).toLocaleDateString('en-CA')}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-zinc-300 font-mono text-xs">
                                                        {new Date(n.preservation_deadline).toLocaleDateString('en-CA')}
                                                    </span>
                                                    {deadlineSeverity && (
                                                        <span className={cn(
                                                            'px-1.5 py-0.5 rounded text-[10px] font-bold border',
                                                            deadlineSeverity.bg, deadlineSeverity.text, deadlineSeverity.border
                                                        )}>
                                                            {daysRemaining}d
                                                        </span>
                                                    )}
                                                    {isActive && daysRemaining > 15 && (
                                                        <span className="text-xs text-zinc-500">
                                                            ({daysRemaining}d)
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <span className="font-mono text-gable-green font-medium">
                                                    {formatCAD(n.holdback_amount)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={cn(
                                                    'inline-flex px-2 py-0.5 rounded-full text-xs font-medium border',
                                                    statusStyles[n.status] || statusStyles.active
                                                )}>
                                                    {n.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                {n.status === 'active' && (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleUpdateStatus(n.id, 'preserved')}
                                                            disabled={updatingId === n.id}
                                                            className="px-2 py-1 rounded text-xs font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 hover:bg-emerald-400/20 transition-colors disabled:opacity-50"
                                                            title="Mark as preserved"
                                                        >
                                                            <CheckCircle className="w-3 h-3 inline mr-1" />
                                                            Preserve
                                                        </button>
                                                        <button
                                                            onClick={() => handleUpdateStatus(n.id, 'released')}
                                                            disabled={updatingId === n.id}
                                                            className="px-2 py-1 rounded text-xs font-medium bg-zinc-400/10 text-zinc-400 border border-zinc-400/20 hover:bg-zinc-400/20 transition-colors disabled:opacity-50"
                                                            title="Release lien"
                                                        >
                                                            <XCircle className="w-3 h-3 inline mr-1" />
                                                            Release
                                                        </button>
                                                    </div>
                                                )}
                                                {n.status === 'preserved' && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(n.id, 'released')}
                                                        disabled={updatingId === n.id}
                                                        className="px-2 py-1 rounded text-xs font-medium bg-zinc-400/10 text-zinc-400 border border-zinc-400/20 hover:bg-zinc-400/20 transition-colors disabled:opacity-50"
                                                    >
                                                        Release
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Summary Footer */}
            {notices.length > 0 && (
                <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{notices.length} notice{notices.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-zinc-400">Total Holdback: </span>
                        <span className="font-mono font-bold text-gable-green">
                            {formatCAD(notices.reduce((sum, n) => sum + (n.status === 'active' || n.status === 'preserved' ? n.holdback_amount : 0), 0))}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
