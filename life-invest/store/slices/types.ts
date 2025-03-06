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
    time: number;
    close: number;
    open: number;
    high: number;
    low: number;
    volume: number;
}

export type StockDataType = {
    "Meta Data": {
        "1. Information": string,
        "2. Symbol": string,
        "3. Last Refreshed": string,
        "4. Output Size": string,
        "5. Time Zone": string
    },
    "Time Series (Daily)": {
        "2025-03-04": {
            "1. open": number,
            "2. high": number,
            "3. low": number,
            "4. close": number,
            "5. volume": number
        }
    }
}