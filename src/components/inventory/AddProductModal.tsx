import React, { useState } from 'react';
import type { Product, UOM } from '../../types/product';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
}

const UOM_OPTIONS: UOM[] = [
    'PLT', 'PC', 'SF', 'TON', 'LYR', 'CYD',
    'PCS', 'EA', 'LF', 'BF', 'MBF', 'SQ',
    'BOX', 'CTN', 'RL', 'GAL', 'LBS',
    'BAG', 'BUNDLE', 'PAIR', 'SET'
];

const inputClass = "w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-stone-amber/60 focus:border-transparent text-sm";
const labelClass = "block text-sm font-medium text-zinc-400 mb-1";

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave }) => {
    const [sku, setSku] = useState('');
    const [description, setDescription] = useState('');
    const [uom, setUom] = useState<UOM>('PLT');
    const [basePrice, setBasePrice] = useState<number>(0);
    const [vendor, setVendor] = useState('');
    const [upc, setUpc] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [collection, setCollection] = useState('');
    const [color, setColor] = useState('');
    const [finish, setFinish] = useState('');
    const [application, setApplication] = useState('');
    const [dimensionsLwh, setDimensionsLwh] = useState('');
    const [palletCount, setPalletCount] = useState<number>(0);
    const [weightPerUnit, setWeightPerUnit] = useState<number>(0);
    const [piecesPerSf, setPiecesPerSf] = useState<number>(0);
    const [coverageSfPerUnit, setCoverageSfPerUnit] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await onSave({
                sku,
                description,
                uom_primary: uom,
                base_price: basePrice,
                vendor: vendor || undefined,
                upc: upc || undefined,
                average_unit_cost: 0,
                target_margin: 0.30,
                commission_rate: 0.05,
                manufacturer: manufacturer || undefined,
                collection: collection || undefined,
                color: color || undefined,
                finish: finish || undefined,
                application: application || undefined,
                dimensions_lwh: dimensionsLwh || undefined,
                pallet_count: palletCount || undefined,
                weight_per_unit: weightPerUnit || undefined,
                pieces_per_sf: piecesPerSf || undefined,
                coverage_sf_per_unit: coverageSfPerUnit || undefined,
            });
            onClose();
            setSku(''); setDescription(''); setUom('PLT'); setBasePrice(0);
            setVendor(''); setUpc(''); setManufacturer(''); setCollection('');
            setColor(''); setFinish(''); setApplication(''); setDimensionsLwh('');
            setPalletCount(0); setWeightPerUnit(0); setPiecesPerSf(0); setCoverageSfPerUnit(0);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save product');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-zinc-100">Add Product to Pile</h2>
                    <p className="text-zinc-400 text-sm mt-1">Create a new hardscape product in the master catalog.</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-200 rounded text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Core Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>SKU *</label>
                            <input type="text" required value={sku} onChange={e => setSku(e.target.value)}
                                className={`${inputClass} font-mono`} placeholder="e.g. TB-BLU-SLT-PLT" />
                        </div>
                        <div>
                            <label className={labelClass}>Primary UOM</label>
                            <select value={uom} onChange={e => setUom(e.target.value as UOM)} className={inputClass}>
                                {UOM_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Description *</label>
                        <input type="text" required value={description} onChange={e => setDescription(e.target.value)}
                            className={inputClass} placeholder="e.g. Techo-Bloc Blu 60mm Paver — Slate" />
                    </div>

                    {/* Product Attributes */}
                    <div className="border-t border-white/10 pt-4">
                        <h3 className="text-sm font-medium text-stone-amber mb-3">Product Attributes</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Manufacturer</label>
                                <input type="text" value={manufacturer} onChange={e => setManufacturer(e.target.value)}
                                    className={inputClass} placeholder="e.g. Techo-Bloc" />
                            </div>
                            <div>
                                <label className={labelClass}>Collection</label>
                                <input type="text" value={collection} onChange={e => setCollection(e.target.value)}
                                    className={inputClass} placeholder="e.g. Blu" />
                            </div>
                            <div>
                                <label className={labelClass}>Color</label>
                                <input type="text" value={color} onChange={e => setColor(e.target.value)}
                                    className={inputClass} placeholder="e.g. Slate" />
                            </div>
                            <div>
                                <label className={labelClass}>Finish</label>
                                <input type="text" value={finish} onChange={e => setFinish(e.target.value)}
                                    className={inputClass} placeholder="e.g. Smooth" />
                            </div>
                            <div>
                                <label className={labelClass}>Application</label>
                                <input type="text" value={application} onChange={e => setApplication(e.target.value)}
                                    className={inputClass} placeholder="e.g. Patio/Walkway" />
                            </div>
                            <div>
                                <label className={labelClass}>Dimensions (L x W x H)</label>
                                <input type="text" value={dimensionsLwh} onChange={e => setDimensionsLwh(e.target.value)}
                                    className={inputClass} placeholder="e.g. 240x120x60mm" />
                            </div>
                        </div>
                    </div>

                    {/* Unit Conversions */}
                    <div className="border-t border-white/10 pt-4">
                        <h3 className="text-sm font-medium text-stone-amber mb-3">Unit & Coverage</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Pallet Count (pcs/PLT)</label>
                                <input type="number" min="0" value={palletCount || ''} onChange={e => setPalletCount(Number(e.target.value))}
                                    className={`${inputClass} font-mono`} placeholder="540" />
                            </div>
                            <div>
                                <label className={labelClass}>Pieces per SF</label>
                                <input type="number" min="0" step="0.01" value={piecesPerSf || ''} onChange={e => setPiecesPerSf(Number(e.target.value))}
                                    className={`${inputClass} font-mono`} placeholder="5.0" />
                            </div>
                            <div>
                                <label className={labelClass}>Coverage (SF/unit)</label>
                                <input type="number" min="0" step="0.01" value={coverageSfPerUnit || ''} onChange={e => setCoverageSfPerUnit(Number(e.target.value))}
                                    className={`${inputClass} font-mono`} placeholder="0.22" />
                            </div>
                            <div>
                                <label className={labelClass}>Weight per Unit (kg)</label>
                                <input type="number" min="0" step="0.01" value={weightPerUnit || ''} onChange={e => setWeightPerUnit(Number(e.target.value))}
                                    className={`${inputClass} font-mono`} placeholder="3.5" />
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Vendor */}
                    <div className="border-t border-white/10 pt-4">
                        <h3 className="text-sm font-medium text-stone-amber mb-3">Pricing & Vendor</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Base Price ($)</label>
                                <input type="number" min="0" step="0.01" value={basePrice}
                                    onChange={e => setBasePrice(parseFloat(e.target.value))}
                                    className={`${inputClass} font-mono`} />
                            </div>
                            <div>
                                <label className={labelClass}>Vendor</label>
                                <input type="text" value={vendor} onChange={e => setVendor(e.target.value)}
                                    className={inputClass} placeholder="e.g. Techo-Bloc" />
                            </div>
                            <div>
                                <label className={labelClass}>UPC Code</label>
                                <input type="text" value={upc} onChange={e => setUpc(e.target.value)}
                                    className={`${inputClass} font-mono`} placeholder="123456789012" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-4">
                        <button type="button" onClick={onClose}
                            className="px-4 py-2 text-sm text-zinc-300 hover:text-white transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting}
                            className="px-4 py-2 bg-stone-amber hover:bg-stone-amber/90 text-black rounded-lg text-sm font-semibold transition-colors disabled:opacity-50">
                            {isSubmitting ? 'Saving...' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
