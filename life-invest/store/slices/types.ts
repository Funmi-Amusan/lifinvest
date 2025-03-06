export type InitialState = {
    loading: boolean;
    error: boolean;
    message: string | null;
    stockChartInfo: stockChartInfo | null;
    stockQuote: StockQuoteType | null;
    tickers: Ticker[] | [];
};

export type stockChartInfo = {
    data: StockChartData[];
    metaData: stockChartMetaData;
    timestamp: number;
}

export type stockChartMetaData = {
    "1. Information": string;
    "2. Symbol": number;
    "3. Last Refreshed": number;
    "4. Output Size": number;
    "5. Time Zone": number;
}

// export type stockChartMetaData = {
//     symbol: string;
//     name: string;
//     type: string;
//     region: string;
//     marketOpen: string;
//     marketClose: string;
//     timezone: string;
//     currency: string;
//     matchScore: string;
// }

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

export type Ticker = {
    "1. symbol": string,
    "2. name": string,
    "3. type": string,
    "4. region": string,
    "5. marketOpen": string,
    "6. marketClose": string,
    "7. timezone": string,
    "8. currency": string,
    "9. matchScore": string
}