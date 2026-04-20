import { useEffect, useState } from 'react';
import { ProductService } from '../services/product.service';
import type { Product } from '../types/product';
import { InventoryTable } from '../components/inventory/InventoryTable';
import { AddProductModal } from '../components/inventory/AddProductModal';
import { StockAdjustmentModal } from '../components/inventory/StockAdjustmentModal';
import { InventoryTransferModal } from '../components/inventory/InventoryTransferModal';
import { ProductMarginModal } from '../components/inventory/ProductMarginModal';
import { Plus, Search, Package, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PageTransition } from '../components/ui/PageTransition';
import { Card, CardContent } from '../components/ui/Card';

export const Inventory = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [collection, setCollection] = useState('');
    const [application, setApplication] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');

    const [isStockModalOpen, setIsStockModalOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [isMarginModalOpen, setIsMarginModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const loadProducts = async () => {
        try {
            setIsLoading(true);
            const data = await ProductService.getProducts();
            setProducts(data);
            setError('');
        } catch (err) {
            setError('Failed to load products');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSaveProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
        await ProductService.createProduct(productData);
        await loadProducts(); // Refresh list
    };

    const handleAdjustStock = (product: Product) => {
        setSelectedProduct(product);
        setIsStockModalOpen(true);
    };

    const handleTransferStock = (product: Product) => {
        setSelectedProduct(product);
        setIsTransferModalOpen(true);
    };

    const handleEditMargins = (product: Product) => {
        setSelectedProduct(product);
        setIsMarginModalOpen(true);
    };

    return (
        <PageTransition>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-display-large text-white flex items-center gap-3">
                        <Package className="w-10 h-10 text-gable-green" />
                        The Pile
                    </h1>
                    <p className="text-zinc-500 mt-1 max-w-2xl text-lg">
                        Master Inventory Management & SKU Control Center.
                    </p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="shadow-glow"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                </Button>
            </div>

            <Card variant="glass" className="mb-8" noPadding>
                <CardContent className="p-4 bg-white/5 border-b border-white/5">
                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="relative flex-1 min-w-[200px] max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search SKUs, products, manufacturers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-deep-space/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gable-green/50 placeholder:text-zinc-600 transition-all font-mono"
                            />
                        </div>
                        <select value={manufacturer} onChange={e => setManufacturer(e.target.value)}
                            className="px-3 py-2.5 rounded-lg bg-deep-space/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-gable-green/50 appearance-none">
                            <option value="">All Manufacturers</option>
                            {[...new Set(products.map(p => p.manufacturer).filter(Boolean))].sort().map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        <select value={collection} onChange={e => setCollection(e.target.value)}
                            className="px-3 py-2.5 rounded-lg bg-deep-space/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-gable-green/50 appearance-none">
                            <option value="">All Collections</option>
                            {[...new Set(products.map(p => p.collection).filter(Boolean))].sort().map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <select value={application} onChange={e => setApplication(e.target.value)}
                            className="px-3 py-2.5 rounded-lg bg-deep-space/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-gable-green/50 appearance-none">
                            <option value="">All Applications</option>
                            {[...new Set(products.map(p => p.application).filter(Boolean))].sort().map(a => (
                                <option key={a} value={a}>{a}</option>
                            ))}
                        </select>
                    </div>
                    {(manufacturer || collection || application) && (
                        <div className="flex items-center gap-2 mt-3">
                            <Filter className="w-3.5 h-3.5 text-zinc-500" />
                            {[manufacturer, collection, application].filter(Boolean).map(f => (
                                <span key={f} className="px-2 py-0.5 rounded-full text-xs bg-gable-green/10 text-gable-green border border-gable-green/20">
                                    {f}
                                </span>
                            ))}
                            <button onClick={() => { setManufacturer(''); setCollection(''); setApplication(''); }}
                                className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                                <X className="w-3 h-3" /> Clear
                            </button>
                        </div>
                    )}
                </CardContent>

                {error && (
                    <div className="p-4 bg-rose-500/10 border-b border-rose-500/20 text-rose-400">
                        {error}
                    </div>
                )}

                <div className="p-0">
                    {isLoading ? (
                        <div className="p-12 text-center text-zinc-500 animate-pulse">
                            Loading core inventory...
                        </div>
                    ) : (
                        <InventoryTable
                            products={products.filter(p => {
                                const term = searchTerm.trim().toLowerCase();
                                if (term && !(
                                    p.sku.toLowerCase().includes(term) ||
                                    p.description.toLowerCase().includes(term) ||
                                    (p.vendor && p.vendor.toLowerCase().includes(term)) ||
                                    (p.manufacturer && p.manufacturer.toLowerCase().includes(term))
                                )) return false;
                                if (manufacturer && p.manufacturer !== manufacturer) return false;
                                if (collection && p.collection !== collection) return false;
                                if (application && p.application !== application) return false;
                                return true;
                            })}
                            onAdjustStock={handleAdjustStock}
                            onTransferStock={handleTransferStock}
                            onEditMargins={handleEditMargins}
                        />
                    )}
                </div>
            </Card>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProduct}
            />

            <StockAdjustmentModal
                isOpen={isStockModalOpen}
                onClose={() => setIsStockModalOpen(false)}
                product={selectedProduct}
                onSuccess={() => {
                    loadProducts();
                }}
            />

            <InventoryTransferModal
                isOpen={isTransferModalOpen}
                onClose={() => setIsTransferModalOpen(false)}
                product={selectedProduct}
                onSuccess={() => {
                    loadProducts();
                }}
            />

            <ProductMarginModal
                isOpen={isMarginModalOpen}
                onClose={() => setIsMarginModalOpen(false)}
                product={selectedProduct}
                onSuccess={() => {
                    loadProducts();
                }}
            />
        </PageTransition>
    );
};
