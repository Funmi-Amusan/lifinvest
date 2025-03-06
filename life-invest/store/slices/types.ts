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

export type StockQuoteType = {
    "Global Quote": {
        "01. symbol": string;
        "02. open": number;
        "03. high": number;
        "04. low": number;
        "05. price": number;
        "06. volume": number;
        "07. latest trading day": string;
        "08. previous close": number;
        "09. change": number;
        "10. change percent": string;
    }
}


export interface StockChartData {
    date: string;
    close: number;
}