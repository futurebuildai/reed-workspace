import { useState, useEffect, useCallback } from 'react';
import type { PricingTier, ProductCategory, TierCreateRequest, TierCategoryInput } from '../../types/pricing';
import { PricingService } from '../../services/pricing.service';

export function PricingTiersPage() {
    const [tiers, setTiers] = useState<PricingTier[]>([]);
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const [tiersData, catsData] = await Promise.all([
                PricingService.listTiers(),
                PricingService.listCategories(),
            ]);
            setTiers(tiersData);
            setCategories(catsData);
        } catch (err) {
            setError('Failed to load pricing data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadData(); }, [loadData]);

    const showSuccess = (msg: string) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(null), 3000);
    };

    const handleCreateTier = async (data: TierCreateRequest) => {
        try {
            await PricingService.createTier(data);
            showSuccess(`Tier "${data.name}" created`);
            setIsCreating(false);
            loadData();
        } catch (err) {
            setError('Failed to create tier');
        }
    };

    const handleUpdateTier = async (id: string, data: TierCreateRequest) => {
        try {
            const updated = await PricingService.updateTier(id, data);
            showSuccess(`Tier "${updated.name}" updated`);
            setSelectedTier(updated);
            loadData();
        } catch (err) {
            setError('Failed to update tier');
        }
    };

    const handleDeleteTier = async (id: string) => {
        try {
            await PricingService.deleteTier(id);
            showSuccess('Tier deleted');
            setSelectedTier(null);
            loadData();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to delete tier');
        }
    };

    const handleSaveCategories = async (tierId: string, cats: TierCategoryInput[]) => {
        try {
            const updated = await PricingService.setTierCategories(tierId, cats);
            showSuccess('Category multipliers saved');
            setSelectedTier(updated);
            loadData();
        } catch (err) {
            setError('Failed to save category multipliers');
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Loading pricing tiers...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>💰 Pricing Tiers</h1>
                    <p style={styles.subtitle}>Configure pricing tiers with per-category multipliers</p>
                </div>
                <button style={styles.createBtn} onClick={() => { setIsCreating(true); setSelectedTier(null); }}>
                    + Create Tier
                </button>
            </div>

            {error && <div style={styles.errorBanner}>{error} <button onClick={() => setError(null)} style={styles.dismissBtn}>✕</button></div>}
            {successMsg && <div style={styles.successBanner}>{successMsg}</div>}

            <div style={styles.layout}>
                {/* Tier List Panel */}
                <div style={styles.listPanel}>
                    <h3 style={styles.panelTitle}>Tiers ({tiers.length})</h3>
                    {tiers.map(tier => (
                        <div
                            key={tier.id}
                            style={{
                                ...styles.tierCard,
                                ...(selectedTier?.id === tier.id ? styles.tierCardSelected : {}),
                            }}
                            onClick={() => { setSelectedTier(tier); setIsCreating(false); }}
                        >
                            <div style={styles.tierCardHeader}>
                                <span style={styles.tierName}>{tier.name}</span>
                                <span style={styles.tierCode}>{tier.code}</span>
                            </div>
                            <div style={styles.tierMeta}>
                                Default: {((1 - tier.default_multiplier) * 100).toFixed(0)}% off
                                {tier.categories?.length > 0 && (
                                    <span style={styles.categoryCount}> • {tier.categories.length} categories</span>
                                )}
                            </div>
                            {!tier.is_active && <span style={styles.inactiveBadge}>Inactive</span>}
                        </div>
                    ))}
                </div>

                {/* Detail / Create Panel */}
                <div style={styles.detailPanel}>
                    {isCreating ? (
                        <TierForm
                            categories={categories}
                            onSave={handleCreateTier}
                            onCancel={() => setIsCreating(false)}
                        />
                    ) : selectedTier ? (
                        <TierDetail
                            tier={selectedTier}
                            categories={categories}
                            onUpdate={(data) => handleUpdateTier(selectedTier.id, data)}
                            onDelete={() => handleDeleteTier(selectedTier.id)}
                            onSaveCategories={(cats) => handleSaveCategories(selectedTier.id, cats)}
                        />
                    ) : (
                        <div style={styles.emptyState}>
                            <div style={styles.emptyIcon}>📋</div>
                            <p>Select a tier to view details or create a new one</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Tier Form (Create) ---
function TierForm({ categories, onSave, onCancel }: {
    categories: ProductCategory[];
    onSave: (data: TierCreateRequest) => void;
    onCancel: () => void;
}) {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [defaultMultiplier, setDefaultMultiplier] = useState(0.85);
    const [catOverrides, setCatOverrides] = useState<Record<string, { multiplier: number; margin_floor: number | null }>>({});

    const handleSubmit = () => {
        const cats: TierCategoryInput[] = Object.entries(catOverrides)
            .filter(([, v]) => v.multiplier > 0)
            .map(([catId, v]) => ({
                category_id: catId,
                multiplier: v.multiplier,
                margin_floor_pct: v.margin_floor,
            }));

        onSave({ name, code, description, default_multiplier: defaultMultiplier, categories: cats });
    };

    return (
        <div style={styles.formContainer}>
            <h3 style={styles.formTitle}>Create New Pricing Tier</h3>

            <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Name</label>
                    <input style={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Pro Builder" />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Code</label>
                    <input style={styles.input} value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="e.g. PRO" maxLength={20} />
                </div>
                <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                    <label style={styles.label}>Description</label>
                    <input style={styles.input} value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional description" />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Default Multiplier</label>
                    <div style={styles.multiplierInput}>
                        <input
                            style={styles.input}
                            type="number"
                            step="0.01"
                            min="0.01"
                            max="2.00"
                            value={defaultMultiplier}
                            onChange={e => setDefaultMultiplier(parseFloat(e.target.value) || 1)}
                        />
                        <span style={styles.discountLabel}>{((1 - defaultMultiplier) * 100).toFixed(0)}% off</span>
                    </div>
                </div>
            </div>

            <h4 style={styles.categoryTitle}>Category Multipliers (Optional)</h4>
            <p style={styles.categoryHint}>Override the default for specific product categories</p>

            <CategoryMatrix
                categories={categories}
                overrides={catOverrides}
                onChange={setCatOverrides}
            />

            <div style={styles.formActions}>
                <button style={styles.cancelBtn} onClick={onCancel}>Cancel</button>
                <button style={styles.saveBtn} onClick={handleSubmit} disabled={!name || !code}>
                    Create Tier
                </button>
            </div>
        </div>
    );
}

// --- Tier Detail (Edit) ---
function TierDetail({ tier, categories, onUpdate, onDelete, onSaveCategories }: {
    tier: PricingTier;
    categories: ProductCategory[];
    onUpdate: (data: TierCreateRequest) => void;
    onDelete: () => void;
    onSaveCategories: (cats: TierCategoryInput[]) => void;
}) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(tier.name);
    const [code, setCode] = useState(tier.code);
    const [description, setDescription] = useState(tier.description);
    const [defaultMultiplier, setDefaultMultiplier] = useState(tier.default_multiplier);
    const [catOverrides, setCatOverrides] = useState<Record<string, { multiplier: number; margin_floor: number | null }>>({});
    const [catEditing, setCatEditing] = useState(false);

    useEffect(() => {
        setName(tier.name);
        setCode(tier.code);
        setDescription(tier.description);
        setDefaultMultiplier(tier.default_multiplier);

        const overrides: Record<string, { multiplier: number; margin_floor: number | null }> = {};
        tier.categories?.forEach(tc => {
            overrides[tc.category_id] = { multiplier: tc.multiplier, margin_floor: tc.margin_floor_pct };
        });
        setCatOverrides(overrides);
    }, [tier]);

    const handleSave = () => {
        onUpdate({ name, code, description, default_multiplier: defaultMultiplier });
        setEditing(false);
    };

    const handleSaveCategories = () => {
        const cats: TierCategoryInput[] = Object.entries(catOverrides)
            .filter(([, v]) => v.multiplier > 0)
            .map(([catId, v]) => ({
                category_id: catId,
                multiplier: v.multiplier,
                margin_floor_pct: v.margin_floor,
            }));
        onSaveCategories(cats);
        setCatEditing(false);
    };

    return (
        <div style={styles.formContainer}>
            <div style={styles.detailHeader}>
                <h3 style={styles.formTitle}>{tier.name}</h3>
                <div style={styles.detailActions}>
                    {!editing && (
                        <button style={styles.editBtn} onClick={() => setEditing(true)}>✏️ Edit</button>
                    )}
                    <button style={styles.deleteBtn} onClick={onDelete}>🗑️ Delete</button>
                </div>
            </div>

            {editing ? (
                <>
                    <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name</label>
                            <input style={styles.input} value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Code</label>
                            <input style={styles.input} value={code} onChange={e => setCode(e.target.value.toUpperCase())} />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Default Multiplier</label>
                            <div style={styles.multiplierInput}>
                                <input style={styles.input} type="number" step="0.01" min="0.01" max="2.00" value={defaultMultiplier} onChange={e => setDefaultMultiplier(parseFloat(e.target.value) || 1)} />
                                <span style={styles.discountLabel}>{((1 - defaultMultiplier) * 100).toFixed(0)}% off</span>
                            </div>
                        </div>
                    </div>
                    <div style={styles.formActions}>
                        <button style={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
                        <button style={styles.saveBtn} onClick={handleSave}>Save Changes</button>
                    </div>
                </>
            ) : (
                <div style={styles.infoGrid}>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Code</span>
                        <span style={styles.infoValue}>{tier.code}</span>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Default Multiplier</span>
                        <span style={styles.infoValue}>{tier.default_multiplier} ({((1 - tier.default_multiplier) * 100).toFixed(0)}% off)</span>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Status</span>
                        <span style={{ ...styles.infoValue, color: tier.is_active ? '#10b981' : '#ef4444' }}>{tier.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Version</span>
                        <span style={styles.infoValue}>v{tier.version}</span>
                    </div>
                    {tier.description && (
                        <div style={{ ...styles.infoItem, gridColumn: '1 / -1' }}>
                            <span style={styles.infoLabel}>Description</span>
                            <span style={styles.infoValue}>{tier.description}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Category Matrix */}
            <div style={styles.categorySection}>
                <div style={styles.categorySectionHeader}>
                    <h4 style={styles.categoryTitle}>Category Multipliers</h4>
                    {!catEditing ? (
                        <button style={styles.editBtn} onClick={() => setCatEditing(true)}>✏️ Edit</button>
                    ) : (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={styles.cancelBtn} onClick={() => setCatEditing(false)}>Cancel</button>
                            <button style={styles.saveBtn} onClick={handleSaveCategories}>Save Categories</button>
                        </div>
                    )}
                </div>

                {catEditing ? (
                    <CategoryMatrix categories={categories} overrides={catOverrides} onChange={setCatOverrides} />
                ) : (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Category</th>
                                <th style={styles.th}>Multiplier</th>
                                <th style={styles.th}>Discount %</th>
                                <th style={styles.th}>Margin Floor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tier.categories?.length > 0 ? (
                                tier.categories.map(tc => (
                                    <tr key={tc.id} style={styles.tr}>
                                        <td style={styles.td}>{tc.category_name}</td>
                                        <td style={styles.td}>{tc.multiplier.toFixed(2)}</td>
                                        <td style={styles.td}>{((1 - tc.multiplier) * 100).toFixed(0)}%</td>
                                        <td style={styles.td}>{tc.margin_floor_pct ? `${tc.margin_floor_pct}%` : '—'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td style={{ ...styles.td, fontStyle: 'italic', color: '#94a3b8' }} colSpan={4}>
                                        No category overrides — default multiplier ({tier.default_multiplier}) applies to all
                                    </td>
                                </tr>
                            )}
                            <tr style={{ ...styles.tr, background: 'rgba(99, 102, 241, 0.05)' }}>
                                <td style={{ ...styles.td, fontWeight: 600 }}>─── Default ───</td>
                                <td style={styles.td}>{tier.default_multiplier.toFixed(2)}</td>
                                <td style={styles.td}>{((1 - tier.default_multiplier) * 100).toFixed(0)}%</td>
                                <td style={styles.td}>—</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

// --- Category Multiplier Matrix (Editable) ---
function CategoryMatrix({ categories, overrides, onChange }: {
    categories: ProductCategory[];
    overrides: Record<string, { multiplier: number; margin_floor: number | null }>;
    onChange: (overrides: Record<string, { multiplier: number; margin_floor: number | null }>) => void;
}) {
    const handleToggle = (catId: string, enabled: boolean) => {
        const next = { ...overrides };
        if (enabled) {
            next[catId] = { multiplier: 0.85, margin_floor: null };
        } else {
            delete next[catId];
        }
        onChange(next);
    };

    const handleMultiplier = (catId: string, value: number) => {
        onChange({ ...overrides, [catId]: { ...overrides[catId], multiplier: value } });
    };

    const handleMarginFloor = (catId: string, value: string) => {
        const num = value === '' ? null : parseFloat(value);
        onChange({ ...overrides, [catId]: { ...overrides[catId], margin_floor: num } });
    };

    return (
        <div style={styles.matrixContainer}>
            {categories.filter(c => c.is_active).map(cat => {
                const isSet = cat.id in overrides;
                const override = overrides[cat.id];
                return (
                    <div key={cat.id} style={styles.matrixRow}>
                        <label style={styles.matrixLabel}>
                            <input
                                type="checkbox"
                                checked={isSet}
                                onChange={e => handleToggle(cat.id, e.target.checked)}
                                style={styles.checkbox}
                            />
                            <span>{cat.name}</span>
                        </label>
                        {isSet && override && (
                            <div style={styles.matrixInputs}>
                                <div style={styles.matrixField}>
                                    <span style={styles.matrixFieldLabel}>Mult:</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        max="2.00"
                                        value={override.multiplier}
                                        onChange={e => handleMultiplier(cat.id, parseFloat(e.target.value) || 0.85)}
                                        style={styles.matrixInput}
                                    />
                                    <span style={styles.matrixDiscount}>{((1 - override.multiplier) * 100).toFixed(0)}% off</span>
                                </div>
                                <div style={styles.matrixField}>
                                    <span style={styles.matrixFieldLabel}>Floor:</span>
                                    <input
                                        type="number"
                                        step="1"
                                        min="0"
                                        max="100"
                                        value={override.margin_floor ?? ''}
                                        onChange={e => handleMarginFloor(cat.id, e.target.value)}
                                        placeholder="—"
                                        style={{ ...styles.matrixInput, width: '60px' }}
                                    />
                                    <span style={styles.matrixFieldLabel}>%</span>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}



// --- Styles ---
const styles: Record<string, React.CSSProperties> = {
    container: { padding: '24px', maxWidth: '1400px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' },
    title: { margin: 0, fontSize: '24px', fontWeight: 700, color: '#f1f5f9' },
    subtitle: { margin: '4px 0 0', fontSize: '14px', color: '#94a3b8' },
    loading: { textAlign: 'center', padding: '60px', color: '#94a3b8', fontSize: '16px' },
    createBtn: { padding: '10px 20px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' },
    errorBanner: { padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    successBanner: { padding: '12px 16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', color: '#10b981', marginBottom: '16px' },
    dismissBtn: { background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '16px' },
    layout: { display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' },
    listPanel: { background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(148, 163, 184, 0.1)' },
    panelTitle: { margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
    tierCard: { padding: '12px 16px', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer', border: '1px solid rgba(148, 163, 184, 0.1)', transition: 'all 0.15s', background: 'rgba(15, 23, 42, 0.4)' },
    tierCardSelected: { borderColor: '#6366f1', background: 'rgba(99, 102, 241, 0.1)' },
    tierCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    tierName: { fontWeight: 600, color: '#f1f5f9', fontSize: '15px' },
    tierCode: { fontSize: '11px', fontWeight: 600, color: '#94a3b8', background: 'rgba(148, 163, 184, 0.1)', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.05em' },
    tierMeta: { fontSize: '12px', color: '#94a3b8', marginTop: '4px' },
    categoryCount: { color: '#6366f1' },
    inactiveBadge: { fontSize: '11px', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '2px 8px', borderRadius: '4px' },
    detailPanel: { background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(148, 163, 184, 0.1)', minHeight: '400px' },
    emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: '#94a3b8' },
    emptyIcon: { fontSize: '48px', marginBottom: '12px' },
    formContainer: { },
    formTitle: { margin: '0 0 20px', fontSize: '20px', fontWeight: 600, color: '#f1f5f9' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '13px', fontWeight: 500, color: '#94a3b8' },
    input: { padding: '10px 12px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', color: '#f1f5f9', fontSize: '14px', outline: 'none' },
    multiplierInput: { display: 'flex', alignItems: 'center', gap: '8px' },
    discountLabel: { fontSize: '12px', color: '#6366f1', fontWeight: 600, whiteSpace: 'nowrap' as const },
    categoryTitle: { margin: '0 0 4px', fontSize: '16px', fontWeight: 600, color: '#f1f5f9' },
    categoryHint: { margin: '0 0 12px', fontSize: '13px', color: '#94a3b8' },
    formActions: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(148, 163, 184, 0.1)' },
    cancelBtn: { padding: '8px 16px', background: 'transparent', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' },
    saveBtn: { padding: '8px 20px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' },
    editBtn: { padding: '6px 12px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '6px', color: '#818cf8', cursor: 'pointer', fontSize: '13px' },
    deleteBtn: { padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', color: '#ef4444', cursor: 'pointer', fontSize: '13px' },
    detailHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    detailActions: { display: 'flex', gap: '8px' },
    infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '16px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '8px', marginBottom: '24px' },
    infoItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
    infoLabel: { fontSize: '12px', color: '#94a3b8', fontWeight: 500 },
    infoValue: { fontSize: '14px', color: '#f1f5f9', fontWeight: 500 },
    categorySection: { marginTop: '24px' },
    categorySectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
    table: { width: '100%', borderCollapse: 'collapse' as const },
    th: { textAlign: 'left' as const, padding: '10px 12px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', borderBottom: '1px solid rgba(148, 163, 184, 0.15)', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
    tr: { borderBottom: '1px solid rgba(148, 163, 184, 0.06)' },
    td: { padding: '10px 12px', fontSize: '14px', color: '#e2e8f0' },
    matrixContainer: { display: 'flex', flexDirection: 'column', gap: '8px' },
    matrixRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '6px', border: '1px solid rgba(148, 163, 184, 0.06)' },
    matrixLabel: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#e2e8f0', cursor: 'pointer' },
    checkbox: { accentColor: '#6366f1' },
    matrixInputs: { display: 'flex', gap: '16px', alignItems: 'center' },
    matrixField: { display: 'flex', alignItems: 'center', gap: '4px' },
    matrixFieldLabel: { fontSize: '12px', color: '#94a3b8' },
    matrixInput: { width: '75px', padding: '6px 8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', outline: 'none' },
    matrixDiscount: { fontSize: '11px', color: '#6366f1', fontWeight: 600, minWidth: '50px' },
};
