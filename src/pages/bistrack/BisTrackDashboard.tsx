import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Activity, AlertTriangle, CheckCircle, Clock, Database, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { PageTransition } from '../../components/ui/PageTransition';

const API_URL = import.meta.env.VITE_API_URL || '';

interface SyncHealth {
    last_sync_at: string | null;
    last_sync_status: string;
    sync_lag_seconds: number;
    unresolved_count: number;
    confidence_pct: number;
    is_healthy: boolean;
}

interface SyncJob {
    id: string;
    job_type: string;
    direction: string;
    status: string;
    entity_type: string;
    records_total: number;
    records_synced: number;
    records_failed: number;
    error_message: string;
    started_at: string;
    completed_at: string | null;
}

export const BisTrackDashboard = () => {
    const [health, setHealth] = useState<SyncHealth | null>(null);
    const [jobs, setJobs] = useState<SyncJob[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const [healthRes, jobsRes] = await Promise.all([
                fetch(`${API_URL}/api/v1/bistrack/sync/health`),
                fetch(`${API_URL}/api/v1/bistrack/sync/jobs`),
            ]);
            if (healthRes.ok) setHealth(await healthRes.json());
            if (jobsRes.ok) setJobs(await jobsRes.json());
        } catch (err) {
            setError('Failed to load sync data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleStartSync = async () => {
        setSyncing(true);
        try {
            const res = await fetch(`${API_URL}/api/v1/bistrack/sync/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entity_type: 'all' }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error || 'Sync failed to start');
            } else {
                setTimeout(fetchData, 2000);
            }
        } catch {
            setError('Failed to start sync');
        } finally {
            setSyncing(false);
        }
    };

    const formatTime = (ts: string | null) => {
        if (!ts) return 'Never';
        return new Date(ts).toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'medium' });
    };

    const formatLag = (seconds: number) => {
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
        return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
    };

    if (loading) {
        return (
            <PageTransition>
                <div className="space-y-6">
                    <div className="h-8 w-64 bg-white/5 rounded animate-pulse" />
                    <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-display-large text-white flex items-center gap-3">
                            <Database className="w-10 h-10 text-stone-amber" />
                            BisTrack Migration
                        </h1>
                        <p className="text-zinc-500 mt-1 text-lg">
                            Bi-directional sync with Epicor BisTrack ERP.
                        </p>
                    </div>
                    <button
                        onClick={handleStartSync}
                        disabled={syncing}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-amber text-black font-semibold text-sm hover:bg-stone-amber/90 transition-all disabled:opacity-50 active:scale-[0.98]"
                    >
                        <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                        {syncing ? 'Syncing...' : 'Manual Sync'}
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Health Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <HealthCard
                        icon={<Activity className="w-5 h-5" />}
                        label="Sync Status"
                        value={health?.is_healthy ? 'Healthy' : 'Not Configured'}
                        accent={health?.is_healthy ? 'emerald' : 'zinc'}
                    />
                    <HealthCard
                        icon={<Clock className="w-5 h-5" />}
                        label="Last Sync"
                        value={formatTime(health?.last_sync_at ?? null)}
                        sub={health?.sync_lag_seconds ? `Lag: ${formatLag(health.sync_lag_seconds)}` : undefined}
                        accent="blue"
                    />
                    <HealthCard
                        icon={<CheckCircle className="w-5 h-5" />}
                        label="Confidence"
                        value={`${health?.confidence_pct ?? 0}%`}
                        accent={
                            (health?.confidence_pct ?? 0) >= 95 ? 'emerald' :
                            (health?.confidence_pct ?? 0) >= 80 ? 'amber' : 'rose'
                        }
                    />
                    <HealthCard
                        icon={<AlertTriangle className="w-5 h-5" />}
                        label="Unresolved"
                        value={String(health?.unresolved_count ?? 0)}
                        accent={(health?.unresolved_count ?? 0) > 0 ? 'amber' : 'emerald'}
                        link={health?.unresolved_count ? '/erp/bistrack/discrepancies' : undefined}
                    />
                </div>

                {/* Recent Sync Jobs */}
                <div>
                    <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">Recent Sync Jobs</h2>
                    <Card variant="glass" noPadding>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/5 text-zinc-500 text-xs uppercase tracking-wider">
                                        <th className="px-4 py-3 text-left">Entity</th>
                                        <th className="px-4 py-3 text-left">Status</th>
                                        <th className="px-4 py-3 text-right">Records</th>
                                        <th className="px-4 py-3 text-right">Failed</th>
                                        <th className="px-4 py-3 text-left">Started</th>
                                        <th className="px-4 py-3 text-left">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {jobs.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">
                                                No sync jobs yet. Configure BisTrack credentials to enable sync.
                                            </td>
                                        </tr>
                                    ) : (
                                        jobs.map(job => (
                                            <tr key={job.id} className="hover:bg-white/5">
                                                <td className="px-4 py-3 font-mono text-white">{job.entity_type}</td>
                                                <td className="px-4 py-3">
                                                    <StatusBadge status={job.status} />
                                                </td>
                                                <td className="px-4 py-3 text-right font-mono text-zinc-300">
                                                    {job.records_synced}/{job.records_total}
                                                </td>
                                                <td className="px-4 py-3 text-right font-mono text-rose-400">
                                                    {job.records_failed || '-'}
                                                </td>
                                                <td className="px-4 py-3 text-zinc-400">{formatTime(job.started_at)}</td>
                                                <td className="px-4 py-3 text-zinc-400 font-mono">
                                                    {job.completed_at
                                                        ? formatLag(Math.floor((new Date(job.completed_at).getTime() - new Date(job.started_at).getTime()) / 1000))
                                                        : 'Running...'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Discrepancies Link */}
                <Link
                    to="/erp/bistrack/discrepancies"
                    className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-stone-amber/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
                >
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <div className="flex-1">
                        <div className="text-white font-medium">Data Discrepancies</div>
                        <div className="text-zinc-500 text-sm">
                            Review and resolve conflicts between BisTrack and GableXHardscape data.
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-stone-amber transition-colors" />
                </Link>
            </div>
        </PageTransition>
    );
};

const HealthCard = ({ icon, label, value, sub, accent = 'zinc', link }: {
    icon: React.ReactNode; label: string; value: string; sub?: string;
    accent?: string; link?: string;
}) => {
    const colorMap: Record<string, string> = {
        emerald: 'text-emerald-400',
        amber: 'text-amber-400',
        rose: 'text-rose-400',
        blue: 'text-info-blue',
        zinc: 'text-zinc-400',
    };
    const content = (
        <Card variant="glass">
            <CardContent className="p-4">
                <div className="flex items-center gap-2 text-zinc-500 mb-2">
                    {icon}
                    <span className="text-xs uppercase tracking-wider">{label}</span>
                </div>
                <div className={`text-2xl font-mono font-bold ${colorMap[accent] || 'text-white'}`}>
                    {value}
                </div>
                {sub && <div className="text-xs text-zinc-500 mt-1">{sub}</div>}
            </CardContent>
        </Card>
    );
    if (link) return <Link to={link}>{content}</Link>;
    return content;
};

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        completed: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
        running: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
        failed: 'bg-rose-400/10 text-rose-400 border-rose-400/20',
        pending: 'bg-zinc-400/10 text-zinc-400 border-zinc-400/20',
    };
    return (
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
            {status}
        </span>
    );
};
