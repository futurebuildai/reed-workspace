export type UOM =
    | 'PCS'
    | 'EA'
    | 'LF'
    | 'SF'
    | 'BF'
    | 'MBF'
    | 'SQ'
    | 'BOX'
    | 'CTN'
    | 'RL'
    | 'GAL'
    | 'LBS'
    | 'BAG'
    | 'BUNDLE'
    | 'PAIR'
    | 'SET'
    | 'PLT'
    | 'TON'
    | 'LYR'
    | 'PC'
    | 'CYD';

export interface Product {
    id: string;
    sku: string;
    description: string;
    uom_primary: UOM;
    base_price: number;
    vendor?: string;
    upc?: string;
    weight_lbs?: number;
    reorder_point?: number;
    reorder_qty?: number;
    total_quantity?: number;
    total_allocated?: number;
    average_unit_cost: number;
    target_margin: number;
    commission_rate: number;

    // Hardscape-specific attributes
    coverage_sf_per_unit?: number;
    manufacturer?: string;
    collection?: string;
    color?: string;
    finish?: string;
    application?: string;
    dimensions_lwh?: string;
    pallet_count?: number;
    weight_per_unit?: number;
    pieces_per_sf?: number;

    created_at: string;
    updated_at: string;
}

export interface ReorderAlert {
    product_id: string;
    sku: string;
    description: string;
    vendor?: string;
    reorder_point: number;
    reorder_qty: number;
    current_stock: number;
    deficit: number;
}

export interface Inventory {
    id: string;
    product_id: string;
    location: string; // Deprecated? Or just path?
    location_id?: string;
    location_name?: string;
    quantity: number;
    allocated?: number;
    updated_at: string;
}
