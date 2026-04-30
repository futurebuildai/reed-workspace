import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle, Database } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { PageTransition } from '../../components/ui/PageTransition';

const API_URL = import.meta.env.VITE_API_URL || '';

interface Discrepancy {
    id: string;
    job_id: string;
    entity_type: string;
    entity_id: string;
    field_name: string;
    quickbooks_value: string;
    native_value: string;
    resolution: string;
    resolved_by: string | null;
    resolved_at: string | null;
    created_at: string;
}

export const DiscrepancyTable = () => {
    const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([]);
    const [loading, setLoading] = useState(true);
    const [resolving, setResolving] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('unresolved');

    const fetchDiscrepancies = useCallback(async () => {
        try {
            const params = filter === 'all' ? '' : `?status=${filter}`;
            const res = await fetch(`${API_URL}/api/v1/quickbooks/discrepancies${params}`);
            if (res.ok) setDiscrepancies(await res.json());
        } catch {
            console.error('Failed to load discrepancies');
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => { fetchDiscrepancies(); }, [fetchDiscrepancies]);

    const handleResolve = async (id: string, resolution: string) => {
        setResolving(id);
        try {
            const res = await fetch(`${API_URL}/api/v1/quickbooks/discrepancies/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resolution }),
            });
            if (res.ok) {
                setDiscrepancies(prev => prev.map(d =>
                    d.id === id ? { ...d, resolution, resolved_at: new Date().toISOString() } : d
                ));
            }
        } catch {
            console.error('Failed to resolve discrepancy');
        } finally {
            setResolving(null);
        }
    };

    return (
        <PageTransition>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/erp/quickbooks"
                        className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-display-large text-white flex items-center gap-3">
                            <AlertTriangle className="w-8 h-8 text-amber-400" />
                            Data Discrepancies
                        </h1>
                        <p className="text-zinc-500 mt-1">
                            Conflicts between QuickBooks and GableLBM data.
                        </p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2">
                    {(['unresolved', 'resolved', 'all'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => { setFilter(f); setLoading(true); }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                filter === f
                                    ? 'bg-gable-green/10 text-gable-green border border-gable-green/20'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <Card variant="glass" noPadding>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5 text-zinc-500 text-xs uppercase tracking-wider">
                                    <th className="px-4 py-3 text-left">Entity</th>
                                    <th className="px-4 py-3 text-left">Field</th>
                                    <th className="px-4 py-3 text-left">QuickBooks Value</th>
                                    <th className="px-4 py-3 text-left">Native Value</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-zinc-500 animate-pulse">
                                            Loading discrepancies...
                                        </td>
                                    </tr>
                                ) : discrepancies.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3 text-zinc-500">
                                                <CheckCircle className="w-8 h-8 text-emerald-400" />
                                                <p>No {filter === 'all' ? '' : filter} discrepancies found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    discrepancies.map(d => (
                                        <tr key={d.id} className="hover:bg-white/5">
                                            <td className="px-4 py-3">
                                                <div className="text-white font-mono text-xs">{d.entity_type}</div>
                                                <div className="text-zinc-500 text-xs truncate max-w-[120px]">{d.entity_id.substring(0, 8)}...</div>
                                            </td>
                                            <td className="px-4 py-3 text-zinc-300">{d.field_name}</td>
                                            <td className="px-4 py-3">
                                                <code className="px-1.5 py-0.5 rounded bg-blue-400/10 text-blue-400 text-xs font-mono">
                                                    {d.quickbooks_value || '(empty)'}
                                                </code>
                                            </td>
                                            <td className="px-4 py-3">
                                                <code className="px-1.5 py-0.5 rounded bg-gable-green/10 text-gable-green text-xs font-mono">
                                                    {d.native_value || '(empty)'}
                                                </code>
                                            </td>
                                            <td className="px-4 py-3">
                                                {d.resolved_at ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                                                        <CheckCircle className="w-3 h-3" />
                                                        {d.resolution}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20">
                                                        Unresolved
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                {!d.resolved_at && (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleResolve(d.id, 'use_quickbooks')}
                                                            disabled={resolving === d.id}
                                                            className="px-2 py-1 rounded text-xs font-medium bg-blue-400/10 text-blue-400 border border-blue-400/20 hover:bg-blue-400/20 transition-colors disabled:opacity-50"
                                                        >
                                                            <Database className="w-3 h-3 inline mr-1" />
                                                            Use QuickBooks
                                                        </button>
                                                        <button
                                                            onClick={() => handleResolve(d.id, 'use_native')}
                                                            disabled={resolving === d.id}
                                                            className="px-2 py-1 rounded text-xs font-medium bg-gable-green/10 text-gable-green border border-gable-green/20 hover:bg-gable-green/20 transition-colors disabled:opacity-50"
                                                        >
                                                            Use Native
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </PageTransition>
    );
};
