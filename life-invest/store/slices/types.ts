export type InitialState = {
    loading: boolean;
    error: boolean;
    message: string | null;
    stockChartData: stockChartData[] | [];
    stockQuote: StockQuote | null;
};

export type stockChartData = {
    symbol: string;
    name: string;
    type: string;
    region: string;
    marketOpen: string;
    marketClose: string;
    timezone: string;
    currency: string;
    matchScore: string;
}

export type CachedStockChartData = {
    data: StockChartData;
    timestamp: number;
}

export type StockQuote = {
    open: string;
    high: string;
    low: string;
    price: string;
    volume: string;
    latestTradingDay: string;
    previousClose: string;
    change: string;
    changePercent: string;
}


export interface StockChartData {
    date: string;
    close: number;
}