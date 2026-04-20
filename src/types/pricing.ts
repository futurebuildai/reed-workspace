export type PricingSource = "CONTRACT" | "TIER" | "RETAIL" | "QUANTITY_BREAK" | "JOB_OVERRIDE" | "PROMOTIONAL" | "ACCOUNT_OVERRIDE" | "TIER_CATEGORY" | "TIER_DEFAULT";

export interface CalculatedPrice {
    product_id: string;
    original_price: number;
    final_price: number;
    discount_pct: number;
    source: PricingSource;
    details: string;
}

// --- Product Categories ---

export interface ProductCategory {
    id: string;
    name: string;
    description: string;
    display_order: number;
    default_margin_target: number | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// --- Pricing Tiers ---

export interface PricingTier {
    id: string;
    name: string;
    code: string;
    description: string;
    default_multiplier: number;
    is_active: boolean;
    sort_order: number;
    version: number;
    categories: PricingTierCategory[];
    created_at: string;
    updated_at: string;
}

export interface PricingTierCategory {
    id: string;
    tier_id: string;
    category_id: string;
    category_name: string;
    multiplier: number;
    margin_floor_pct: number | null;
    created_at: string;
    updated_at: string;
}

export interface TierCreateRequest {
    name: string;
    code: string;
    description: string;
    default_multiplier: number;
    categories?: TierCategoryInput[];
}

export interface TierCategoryInput {
    category_id: string;
    multiplier: number;
    margin_floor_pct?: number | null;
}

// --- Account Pricing ---

export interface AccountPricingOverride {
    id: string;
    customer_id: string;
    category_id: string;
    category_name: string;
    multiplier: number;
    margin_floor_pct: number | null;
    notes: string;
    created_by: string | null;
    created_at: string;
    updated_at: string;
}

export interface OverrideInput {
    category_id: string;
    multiplier: number;
    margin_floor_pct?: number | null;
    notes?: string;
}

export interface EffectiveCategoryPrice {
    category_id: string;
    category_name: string;
    multiplier: number;
    source: string;
}

export interface CustomerPricingSummary {
    customer_id: string;
    customer_name: string;
    pricing_tier: PricingTier | null;
    account_overrides: AccountPricingOverride[];
    effective_pricing: EffectiveCategoryPrice[];
}

export interface BulkTierAssignment {
    customer_ids: string[];
    pricing_tier_id: string;
}

// --- Pricing Audit ---

export interface PricingAuditEntry {
    id: string;
    entity_type: string;
    entity_id: string;
    action: string;
    field_name: string;
    old_value: string | null;
    new_value: string | null;
    user_id: string | null;
    created_at: string;
}

// --- Escalator Pricing Types ---

export type EscalationType = "PERCENTAGE" | "INDEX_DELTA";

export interface MarketIndex {
    id: string;
    name: string;
    source: string;
    current_value: number;
    previous_value: number | null;
    unit: string;
    last_updated_at: string;
    created_at: string;
}

export interface EscalationRequest {
    base_price: number;
    escalation_type: EscalationType;
    escalation_rate: number;
    effective_date: string;
    target_date: string;
    market_index_id?: string;
}

export interface EscalationResult {
    base_price: number;
    future_price: number;
    price_delta: number;
    delta_percent: number;
    months_out: number;
    is_stale: boolean;
    stale_delta_pct: number;
    current_index: number | null;
    base_index: number | null;
    escalation_type: string;
    expiration_date: string;
    is_expired: boolean;
}

export interface QuoteLineEscalator {
    enabled: boolean;
    escalation_type: EscalationType;
    escalation_rate: number;
    effective_date: string;
    target_date: string;
    market_index_id?: string;
    result?: EscalationResult;
}

