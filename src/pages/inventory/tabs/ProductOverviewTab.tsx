import React, { useState } from 'react';
import type { ProductDetail, PIMMedia } from '../../../types/pim';
import { Package, Weight, BarChart3, DollarSign, Layers, Tag, Pencil, Palette, Ruler, Grid3X3, Factory } from 'lucide-react';
import { ProductMarginModal } from '../../../components/inventory/ProductMarginModal';

interface Props {
    product: ProductDetail;
    onProductUpdate?: () => void;
}

export const ProductOverviewTab: React.FC<Props> = ({ product, onProductUpdate }) => {
    const [marginModalOpen, setMarginModalOpen] = useState(false);
    const available = (product.total_quantity || 0) - (product.total_allocated || 0);
    const primaryImage = product.media?.find((m: PIMMedia) => m.is_primary) || product.media?.[0];
    const visiblePrice = product.base_price || 0;
    const margin = product.target_margin || 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Primary Image */}
            <div className="lg:col-span-1">
                <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
                    {primaryImage ? (
                        <img src={primaryImage.url} alt={primaryImage.alt_text || product.description} className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center gap-3 text-zinc-500">
                            <Package className="w-16 h-16" />
                            <span className="text-sm">No image</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-2 space-y-6">
                {/* Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <InfoCard icon={<Tag className="w-4 h-4" />} label="SKU" value={product.sku} />
                    <InfoCard icon={<Layers className="w-4 h-4" />} label="UOM" value={product.uom_primary} />
                    <InfoCard icon={<Package className="w-4 h-4" />} label="Vendor" value={product.vendor || 'N/A'} />
                    <InfoCard icon={<Weight className="w-4 h-4" />} label="Weight" value={`${(product.weight_lbs || 0).toFixed(1)} lbs`} />
                    <InfoCard icon={<DollarSign className="w-4 h-4" />} label="Avg Cost" value={`$${(product.average_unit_cost || 0).toFixed(2)}`} accent="emerald" />
                    <InfoCard icon={<DollarSign className="w-4 h-4" />} label="Base Price" value={`$${visiblePrice.toFixed(2)}`} accent="green" />
                    <div className="bg-zinc-900 border border-white/10 rounded-lg p-3 col-span-2 sm:col-span-1">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                                <BarChart3 className="w-4 h-4" />
                                Margin / Commission
                            </div>
                            <button
                                onClick={() => setMarginModalOpen(true)}
                                className="p-1 rounded hover:bg-white/10 text-zinc-500 hover:text-stone-amber transition-colors"
                                title="Edit pricing controls"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-sm font-medium text-white">
                            <span>{margin.toFixed(1)}%</span>
                            <span className="text-zinc-600">/</span>
                            <span>{(product.commission_rate || 0).toFixed(1)}%</span>
                        </div>
                    </div>
                    {product.upc && <InfoCard icon={<Tag className="w-4 h-4" />} label="UPC" value={product.upc} />}
                </div>

                {/* Hardscape Attributes */}
                {(product.manufacturer || product.collection || product.color) && (
                    <div>
                        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">Product Attributes</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {product.manufacturer && <InfoCard icon={<Factory className="w-4 h-4" />} label="Manufacturer" value={product.manufacturer} />}
                            {product.collection && <InfoCard icon={<Grid3X3 className="w-4 h-4" />} label="Collection" value={product.collection} />}
                            {product.color && <InfoCard icon={<Palette className="w-4 h-4" />} label="Color" value={product.color} />}
                            {product.finish && <InfoCard icon={<Layers className="w-4 h-4" />} label="Finish" value={product.finish} />}
                            {product.application && <InfoCard icon={<Tag className="w-4 h-4" />} label="Application" value={product.application} />}
                            {product.dimensions_lwh && <InfoCard icon={<Ruler className="w-4 h-4" />} label="Dimensions" value={product.dimensions_lwh} />}
                        </div>
                    </div>
                )}

                {/* UOM Conversion */}
                {product.pallet_count && product.pallet_count > 0 && (
                    <div className="bg-zinc-900 border border-white/10 rounded-xl p-4">
                        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-2">Unit Conversions</h3>
                        <div className="flex items-center gap-2 text-sm font-mono text-white">
                            <span>1 PLT</span>
                            <span className="text-zinc-600">=</span>
                            <span className="text-stone-amber">{product.pallet_count} PC</span>
                            {product.pieces_per_sf && product.pieces_per_sf > 0 && (
                                <>
                                    <span className="text-zinc-600">=</span>
                                    <span className="text-info-blue">
                                        {(product.pallet_count / product.pieces_per_sf).toFixed(0)} SF
                                    </span>
                                </>
                            )}
                        </div>
                        {product.coverage_sf_per_unit && product.coverage_sf_per_unit > 0 && (
                            <div className="text-xs text-zinc-500 mt-1">
                                Coverage: {product.coverage_sf_per_unit} SF per unit
                            </div>
                        )}
                    </div>
                )}

                {/* Stock Summary */}
                <div>
                    <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">Stock Summary</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <StockCard label="On Hand" value={product.total_quantity || 0} />
                        <StockCard label="Allocated" value={product.total_allocated || 0} color="amber" />
                        <StockCard label="Available" value={available} color={available < 100 ? 'rose' : 'emerald'} />
                    </div>
                </div>

                {/* Reorder Info */}
                {(product.reorder_point || 0) > 0 && (
                    <div className="bg-zinc-900 border border-white/10 rounded-xl p-4">
                        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-2">Reorder Settings</h3>
                        <div className="flex gap-6 text-sm">
                            <div>
                                <span className="text-zinc-500">Reorder Point: </span>
                                <span className="text-white font-mono">{(product.reorder_point || 0).toLocaleString()}</span>
                            </div>
                            <div>
                                <span className="text-zinc-500">Reorder Qty: </span>
                                <span className="text-white font-mono">{(product.reorder_qty || 0).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* PIM Content Preview */}
                {product.content?.short_description && (
                    <div className="bg-zinc-900 border border-white/10 rounded-xl p-4">
                        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-2">Description</h3>
                        <p className="text-zinc-300 text-sm">{product.content.short_description}</p>
                    </div>
                )}
            </div>

            <ProductMarginModal
                isOpen={marginModalOpen}
                onClose={() => setMarginModalOpen(false)}
                product={product}
                onSuccess={() => onProductUpdate?.()}
            />
        </div>
    );
};

const InfoCard: React.FC<{ icon: React.ReactNode; label: string; value: string; accent?: string }> = ({ icon, label, value, accent }) => (
    <div className="bg-zinc-900 border border-white/10 rounded-lg p-3">
        <div className="flex items-center gap-1.5 text-zinc-500 text-xs mb-1">
            {icon}
            {label}
        </div>
        <div className={`font-mono text-sm font-medium ${accent === 'emerald' ? 'text-emerald-400' : accent === 'green' ? 'text-stone-amber' : 'text-white'}`}>
            {value}
        </div>
    </div>
);

const StockCard: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color = 'white' }) => (
    <div className="bg-zinc-900 border border-white/10 rounded-lg p-4 text-center">
        <div className="text-xs text-zinc-500 mb-1">{label}</div>
        <div className={`text-2xl font-mono font-bold ${
            color === 'emerald' ? 'text-emerald-400' :
            color === 'amber' ? 'text-amber-400' :
            color === 'rose' ? 'text-rose-500' :
            'text-white'
        }`}>
            {value.toLocaleString()}
        </div>
    </div>
);
