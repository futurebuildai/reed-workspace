import type {
    CalculatedPrice, MarketIndex, EscalationRequest, EscalationResult,
    ProductCategory, PricingTier, TierCreateRequest, TierCategoryInput,
    CustomerPricingSummary, AccountPricingOverride, OverrideInput,
    BulkTierAssignment, PricingAuditEntry,
} from '../types/pricing';

const API_URL = import.meta.env.VITE_API_URL || '';

export const PricingService = {
    // --- Core Pricing ---
    calculatePrice: async (customerId: string, productId: string, quantity?: number, jobId?: string): Promise<CalculatedPrice> => {
        const params = new URLSearchParams({
            customer_id: customerId,
            product_id: productId,
        });
        if (quantity && quantity > 0) {
            params.set('quantity', quantity.toString());
        }
        if (jobId) {
            params.set('job_id', jobId);
        }
        const response = await fetch(`${API_URL}/pricing/calculate?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Failed to calculate price');
        }
        return response.json() as Promise<CalculatedPrice>;
    },

    // --- Escalator ---
    getMarketIndices: async (): Promise<MarketIndex[]> => {
        const response = await fetch(`${API_URL}/api/v1/market-indices`);
        if (!response.ok) {
            throw new Error('Failed to fetch market indices');
        }
        return response.json() as Promise<MarketIndex[]>;
    },

    calculateEscalation: async (request: EscalationRequest): Promise<EscalationResult> => {
        const response = await fetch(`${API_URL}/api/v1/pricing/calculate-escalation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error('Failed to calculate escalation');
        }
        return response.json() as Promise<EscalationResult>;
    },

    // --- Product Categories ---
    listCategories: async (): Promise<ProductCategory[]> => {
        const response = await fetch(`${API_URL}/api/v1/product-categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json() as Promise<ProductCategory[]>;
    },

    createCategory: async (data: Partial<ProductCategory>): Promise<ProductCategory> => {
        const response = await fetch(`${API_URL}/api/v1/product-categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create category');
        return response.json() as Promise<ProductCategory>;
    },

    updateCategory: async (id: string, data: Partial<ProductCategory>): Promise<ProductCategory> => {
        const response = await fetch(`${API_URL}/api/v1/product-categories/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update category');
        return response.json() as Promise<ProductCategory>;
    },

    deleteCategory: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/api/v1/product-categories/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete category');
    },

    // --- Pricing Tiers ---
    listTiers: async (): Promise<PricingTier[]> => {
        const response = await fetch(`${API_URL}/api/v1/pricing/tiers`);
        if (!response.ok) throw new Error('Failed to fetch tiers');
        return response.json() as Promise<PricingTier[]>;
    },

    getTier: async (id: string): Promise<PricingTier> => {
        const response = await fetch(`${API_URL}/api/v1/pricing/tiers/${id}`);
        if (!response.ok) throw new Error('Failed to fetch tier');
        return response.json() as Promise<PricingTier>;
    },

    createTier: async (data: TierCreateRequest): Promise<PricingTier> => {
        const response = await fetch(`${API_URL}/api/v1/pricing/tiers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create tier');
        return response.json() as Promise<PricingTier>;
    },

    updateTier: async (id: string, data: TierCreateRequest): Promise<PricingTier> => {
        const response = await fetch(`${API_URL}/api/v1/pricing/tiers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update tier');
        return response.json() as Promise<PricingTier>;
    },

    deleteTier: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/api/v1/pricing/tiers/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || 'Failed to delete tier');
        }
    },

    setTierCategories: async (tierId: string, categories: TierCategoryInput[]): Promise<PricingTier> => {
        const response = await fetch(`${API_URL}/api/v1/pricing/tiers/${tierId}/categories`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categories),
        });
        if (!response.ok) throw new Error('Failed to set tier categories');
        return response.json() as Promise<PricingTier>;
    },

    // --- Customer Pricing ---
    getCustomerPricing: async (customerId: string): Promise<CustomerPricingSummary> => {
        const response = await fetch(`${API_URL}/api/v1/customers/${customerId}/pricing`);
        if (!response.ok) throw new Error('Failed to fetch customer pricing');
        return response.json() as Promise<CustomerPricingSummary>;
    },

    assignTier: async (customerId: string, tierId: string): Promise<void> => {
        const response = await fetch(`${API_URL}/api/v1/customers/${customerId}/pricing/tier`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pricing_tier_id: tierId }),
        });
        if (!response.ok) throw new Error('Failed to assign tier');
    },

    listOverrides: async (customerId: string): Promise<AccountPricingOverride[]> => {
        const response = await fetch(`${API_URL}/api/v1/customers/${customerId}/pricing/overrides`);
        if (!response.ok) throw new Error('Failed to fetch overrides');
        return response.json() as Promise<AccountPricingOverride[]>;
    },

    setOverrides: async (customerId: string, overrides: OverrideInput[]): Promise<void> => {
        const response = await fetch(`${API_URL}/api/v1/customers/${customerId}/pricing/overrides`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(overrides),
        });
        if (!response.ok) throw new Error('Failed to set overrides');
    },

    deleteOverride: async (customerId: string, categoryId: string): Promise<void> => {
        const response = await fetch(`${API_URL}/api/v1/customers/${customerId}/pricing/overrides/${categoryId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete override');
    },

    // --- Bulk Operations ---
    bulkAssignTier: async (data: BulkTierAssignment): Promise<{ customers_updated: number }> => {
        const response = await fetch(`${API_URL}/api/v1/pricing/tiers/bulk-assign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to bulk assign tier');
        return response.json();
    },

    // --- Audit ---
    listAuditEntries: async (entityType?: string, limit?: number): Promise<PricingAuditEntry[]> => {
        const params = new URLSearchParams();
        if (entityType) params.set('entity_type', entityType);
        if (limit) params.set('limit', limit.toString());
        const response = await fetch(`${API_URL}/api/v1/pricing/audit?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch audit entries');
        return response.json() as Promise<PricingAuditEntry[]>;
    },
};
