import { useState, useEffect, useCallback } from 'react';
import type { PricingAuditEntry } from '../../types/pricing';
import { PricingService } from '../../services/pricing.service';

export function PricingAuditPage() {
    const [entries, setEntries] = useState<PricingAuditEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    const load = useCallback(async () => {
        try {
            setLoading(true);
            const data = await PricingService.listAuditEntries(filter || undefined, 200);
            setEntries(data);
        } catch {
            console.error('Failed to load audit log');
        } finally { setLoading(false); }
    }, [filter]);

    useEffect(() => { load(); }, [load]);

    const actionColor = (action: string) => {
        switch (action) {
            case 'CREATE': return '#10b981';
            case 'UPDATE': return '#6366f1';
            case 'DELETE': return '#ef4444';
            case 'TIER_ASSIGNMENT': return '#f59e0b';
            case 'BULK_ASSIGNMENT': return '#8b5cf6';
            default: return '#94a3b8';
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>📋 Pricing Audit Log</h1>
                    <p style={styles.subtitle}>Track all pricing tier and rule changes</p>
                </div>
                <select style={styles.filterSelect} value={filter} onChange={e => setFilter(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="pricing_tier">Pricing Tiers</option>
                    <option value="tier_category">Tier Categories</option>
                    <option value="account_override">Account Overrides</option>
                    <option value="customer">Customer Assignments</option>
                </select>
            </div>

            {loading ? (
                <div style={styles.loading}>Loading audit log...</div>
            ) : entries.length === 0 ? (
                <div style={styles.empty}>No audit entries found</div>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Timestamp</th>
                            <th style={styles.th}>Entity Type</th>
                            <th style={styles.th}>Action</th>
                            <th style={styles.th}>Field</th>
                            <th style={styles.th}>Old Value</th>
                            <th style={styles.th}>New Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map(entry => (
                            <tr key={entry.id} style={styles.tr}>
                                <td style={{...styles.td, fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap'}}>
                                    {new Date(entry.created_at).toLocaleString()}
                                </td>
                                <td style={styles.td}>
                                    <span style={styles.entityBadge}>{entry.entity_type}</span>
                                </td>
                                <td style={styles.td}>
                                    <span style={{...styles.actionBadge, color: actionColor(entry.action)}}>
                                        {entry.action}
                                    </span>
                                </td>
                                <td style={{...styles.td, color: '#94a3b8'}}>{entry.field_name || '—'}</td>
                                <td style={{...styles.td, color: '#ef4444', fontFamily: 'monospace', fontSize: '13px'}}>
                                    {entry.old_value || '—'}
                                </td>
                                <td style={{...styles.td, color: '#10b981', fontFamily: 'monospace', fontSize: '13px'}}>
                                    {entry.new_value || '—'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '24px', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' },
    title: { margin: 0, fontSize: '24px', fontWeight: 700, color: '#f1f5f9' },
    subtitle: { margin: '4px 0 0', fontSize: '14px', color: '#94a3b8' },
    loading: { textAlign: 'center', padding: '60px', color: '#94a3b8' },
    empty: { textAlign: 'center', padding: '60px', color: '#64748b', fontSize: '16px' },
    filterSelect: { padding: '8px 12px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', color: '#f1f5f9', fontSize: '14px', outline: 'none' },
    table: { width: '100%', borderCollapse: 'collapse' as const, background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(148, 163, 184, 0.1)' },
    th: { textAlign: 'left' as const, padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', borderBottom: '1px solid rgba(148, 163, 184, 0.15)', textTransform: 'uppercase' as const, letterSpacing: '0.05em', background: 'rgba(15, 23, 42, 0.3)' },
    tr: { borderBottom: '1px solid rgba(148, 163, 184, 0.06)' },
    td: { padding: '10px 16px', fontSize: '14px', color: '#e2e8f0' },
    entityBadge: { fontSize: '11px', fontWeight: 600, color: '#94a3b8', background: 'rgba(148, 163, 184, 0.1)', padding: '3px 8px', borderRadius: '4px' },
    actionBadge: { fontSize: '12px', fontWeight: 700 },
};
