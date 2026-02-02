import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY;
const BASE_URL = 'https://api.massive.com';

export const api = axios.create({
    baseURL: BASE_URL,
    params: {
        apiKey: API_KEY,
    },
});

export interface PolygonTickerDetails {
    ticker: string;
    name: string;
    market: string;
    locale: string;
    primary_exchange: string;
    type: string;
    active: boolean;
    currency_name: string;
    cik?: string;
    composite_figi?: string;
    share_class_figi?: string;
    market_cap?: number;
    phone_number?: string;
    address?: {
        address1: string;
        city: string;
        state: string;
        postal_code: string;
    };
    description?: string;
    sic_code?: string;
    sic_description?: string;
    ticker_root?: string;
    homepage_url?: string;
    total_employees?: number;
    list_date?: string;
    branding?: {
        logo_url?: string;
        icon_url?: string;
    };
    share_class_shares_outstanding?: number;
    weighted_shares_outstanding?: number;
    round_lot?: number;
}

export interface PolygonSnapshot {
    ticker: string;
    todaysChange: number;
    todaysChangePerc: number;
    updated: number;
    day: {
        o: number; // Open
        h: number; // High
        l: number; // Low
        c: number; // Close
        v: number; // Volume
        vw: number; // Volume Weighted Average Price
    };
    lastTrade: {
        p: number; // Price
        t: number;
        s: number;
        c: number[];
        i: string;
    };
    min: {
        av: number;
        t: number;
        n: number;
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
    };
    prevDay: {
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
    };
}

export interface PolygonSearchResponse {
    results: PolygonTickerDetails[];
    status: string;
    request_id: string;
    count: number;
    next_url?: string;
}

export interface PolygonSnapshotResponse {
    tickers: PolygonSnapshot[];
    status: string;
    request_id: string;
    count: number;
}

export const getTopGainers = async () => {
    const response = await api.get<PolygonSnapshotResponse>('/v2/snapshot/locale/us/markets/stocks/gainers');
    return response.data.tickers;
};

export const getTopLosers = async () => {
    const response = await api.get<PolygonSnapshotResponse>('/v2/snapshot/locale/us/markets/stocks/losers');
    return response.data.tickers;
};

export const searchTicker = async (query: string) => {
    const response = await api.get<PolygonSearchResponse>('/v3/reference/tickers', {
        params: {
            search: query,
            active: true,
            sort: 'ticker',
            order: 'asc',
            limit: 10,
        },
    });
    return response.data.results;
};

export interface PolygonAggregate {
    v: number; // Volume
    vw: number; // Volume Weighted Average Price
    o: number; // Open
    c: number; // Close
    h: number; // High
    l: number; // Low
    t: number; // Timestamp (unix ms)
    n: number; // Number of transactions
}

export interface PolygonAggregatesResponse {
    ticker: string;
    queryCount: number;
    resultsCount: number;
    adjusted: boolean;
    results: PolygonAggregate[];
    status: string;
    request_id: string;
    count: number;
}

export const getTickerHistory = async (ticker: string) => {
    // Calculate dates: 3 months ago to today
    const to = new Date().toISOString().split('T')[0];
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 3);
    const from = fromDate.toISOString().split('T')[0];

    const response = await api.get<PolygonAggregatesResponse>(`/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}`, {
        params: {
            adjusted: true,
            sort: 'asc',
            limit: 50000,
        }
    });
    return response.data.results;
};

export const getTickerDetails = async (ticker: string) => {
    const response = await api.get<{ results: PolygonTickerDetails }>(`/v3/reference/tickers/${ticker}`);
    return response.data.results;
};
export interface PolygonPreviousCloseResponse {
    ticker: string;
    queryCount: number;
    resultsCount: number;
    adjusted: boolean;
    results: PolygonAggregate[]; // Reusing PolygonAggregate as it has standard H/L/O/C
    status: string;
    request_id: string;
    count: number;
}

export const getPreviousClose = async (ticker: string) => {
    const response = await api.get<PolygonPreviousCloseResponse>(`/v2/aggs/ticker/${ticker}/prev`, {
        params: {
            adjusted: true,
        }
    });
    return response.data.results[0]; // Return the single previous day candle
};
