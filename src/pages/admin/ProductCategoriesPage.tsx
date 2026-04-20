import { useState, useEffect, useCallback } from 'react';
import type { ProductCategory } from '../../types/pricing';
import { PricingService } from '../../services/pricing.service';

export function ProductCategoriesPage() {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ name: '', description: '', display_order: 0, default_margin_target: '' });
    const [isCreating, setIsCreating] = useState(false);
    const [createForm, setCreateForm] = useState({ name: '', description: '', display_order: 0, default_margin_target: '' });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const loadCategories = useCallback(async () => {
        try {
            const data = await PricingService.listCategories();
            setCategories(data);
        } catch { setError('Failed to load categories'); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { loadCategories(); }, [loadCategories]);

    const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(null), 3000); };

    const handleCreate = async () => {
        try {
            await PricingService.createCategory({
                name: createForm.name,
                description: createForm.description,
                display_order: createForm.display_order,
                default_margin_target: createForm.default_margin_target ? parseFloat(createForm.default_margin_target) / 100 : null,
                is_active: true,
            });
            showSuccess(`Category "${createForm.name}" created`);
            setIsCreating(false);
            setCreateForm({ name: '', description: '', display_order: 0, default_margin_target: '' });
            loadCategories();
        } catch { setError('Failed to create category'); }
    };

    const handleEdit = (cat: ProductCategory) => {
        setEditingId(cat.id);
        setEditForm({
            name: cat.name,
            description: cat.description,
            display_order: cat.display_order,
            default_margin_target: cat.default_margin_target ? (cat.default_margin_target * 100).toString() : '',
        });
    };

    const handleSave = async (id: string) => {
        try {
            await PricingService.updateCategory(id, {
                name: editForm.name,
                description: editForm.description,
                display_order: editForm.display_order,
                default_margin_target: editForm.default_margin_target ? parseFloat(editForm.default_margin_target) / 100 : null,
                is_active: true,
            });
            showSuccess('Category updated');
            setEditingId(null);
            loadCategories();
        } catch { setError('Failed to update category'); }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Delete category "${name}"? This cannot be undone.`)) return;
        try {
            await PricingService.deleteCategory(id);
            showSuccess('Category deleted');
            loadCategories();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to delete category');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>📦 Product Categories</h1>
                    <p style={styles.subtitle}>Manage product categories used for pricing tier multipliers</p>
                </div>
                <button style={styles.createBtn} onClick={() => setIsCreating(!isCreating)}>
                    {isCreating ? '✕ Cancel' : '+ Add Category'}
                </button>
            </div>

            {error && <div style={styles.errorBanner}>{error} <button onClick={() => setError(null)} style={styles.dismissBtn}>✕</button></div>}
            {success && <div style={styles.successBanner}>{success}</div>}

            {isCreating && (
                <div style={styles.createRow}>
                    <input style={styles.input} placeholder="Category Name" value={createForm.name} onChange={e => setCreateForm({...createForm, name: e.target.value})} />
                    <input style={{...styles.input, flex: 2}} placeholder="Description" value={createForm.description} onChange={e => setCreateForm({...createForm, description: e.target.value})} />
                    <input style={{...styles.input, width: '80px'}} type="number" placeholder="Order" value={createForm.display_order} onChange={e => setCreateForm({...createForm, display_order: parseInt(e.target.value) || 0})} />
                    <input style={{...styles.input, width: '80px'}} type="number" placeholder="Margin %" value={createForm.default_margin_target} onChange={e => setCreateForm({...createForm, default_margin_target: e.target.value})} />
                    <button style={styles.saveBtn} onClick={handleCreate} disabled={!createForm.name}>Save</button>
                </div>
            )}

            {loading ? (
                <div style={styles.loading}>Loading...</div>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Order</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Description</th>
                            <th style={styles.th}>Target Margin</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.id} style={styles.tr}>
                                {editingId === cat.id ? (
                                    <>
                                        <td style={styles.td}><input style={{...styles.input, width: '50px'}} type="number" value={editForm.display_order} onChange={e => setEditForm({...editForm, display_order: parseInt(e.target.value) || 0})} /></td>
                                        <td style={styles.td}><input style={styles.input} value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} /></td>
                                        <td style={styles.td}><input style={styles.input} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} /></td>
                                        <td style={styles.td}><input style={{...styles.input, width: '70px'}} type="number" value={editForm.default_margin_target} onChange={e => setEditForm({...editForm, default_margin_target: e.target.value})} /></td>
                                        <td style={styles.td}>—</td>
                                        <td style={styles.td}>
                                            <button style={styles.actionBtn} onClick={() => handleSave(cat.id)}>💾</button>
                                            <button style={styles.actionBtn} onClick={() => setEditingId(null)}>✕</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td style={styles.td}>{cat.display_order}</td>
                                        <td style={{...styles.td, fontWeight: 600}}>{cat.name}</td>
                                        <td style={{...styles.td, color: '#94a3b8'}}>{cat.description}</td>
                                        <td style={styles.td}>{cat.default_margin_target ? `${(cat.default_margin_target * 100).toFixed(0)}%` : '—'}</td>
                                        <td style={styles.td}>
                                            <span style={{ color: cat.is_active ? '#10b981' : '#ef4444', fontSize: '12px', fontWeight: 600 }}>
                                                {cat.is_active ? '● Active' : '● Inactive'}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <button style={styles.actionBtn} onClick={() => handleEdit(cat)}>✏️</button>
                                            <button style={styles.actionBtn} onClick={() => handleDelete(cat.id, cat.name)}>🗑️</button>
                                        </td>
                                    </>
                                )}
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
    createBtn: { padding: '10px 20px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' },
    errorBanner: { padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' },
    successBanner: { padding: '12px 16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', color: '#10b981', marginBottom: '16px' },
    dismissBtn: { background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' },
    createRow: { display: 'flex', gap: '8px', alignItems: 'center', padding: '16px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', marginBottom: '16px', border: '1px solid rgba(148, 163, 184, 0.1)' },
    input: { padding: '8px 12px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', outline: 'none', flex: 1 },
    saveBtn: { padding: '8px 16px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' },
    table: { width: '100%', borderCollapse: 'collapse' as const, background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(148, 163, 184, 0.1)' },
    th: { textAlign: 'left' as const, padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', borderBottom: '1px solid rgba(148, 163, 184, 0.15)', textTransform: 'uppercase' as const, letterSpacing: '0.05em', background: 'rgba(15, 23, 42, 0.3)' },
    tr: { borderBottom: '1px solid rgba(148, 163, 184, 0.06)', transition: 'background 0.15s' },
    td: { padding: '12px 16px', fontSize: '14px', color: '#e2e8f0' },
    actionBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '4px', marginRight: '4px' },
};
