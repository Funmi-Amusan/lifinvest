
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import http from '../../utils/https';
import { stockChartInfo, InitialState, StockChartData } from "./types";

const alphaApiKey = import.meta.env.VITE_ALPHA_API_KEY;

const initialState: InitialState = {
    loading: false,
    error: false,
    message: null,
    stockChartInfo: null,
    stockQuote: null,
    tickers: []
}

const stockCache: { [key: string]: stockChartInfo } = {};
const cacheExpiryTime = 5 * 60 * 1000


export const fetchTickersByKeyword = createAsyncThunk(
    "fetchTickers",
    async (keywords: string, { rejectWithValue }) => {
        try {
            const response = await http.get({ url: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${alphaApiKey}` });
            return response.bestMatches;
        } catch (err: unknown) {
            if (err instanceof Error && 'response' in err) {
                return rejectWithValue((err as { response: { data: unknown } }).response.data);
            }
            throw err;
        }
    }
);

export const fetchStockFromAlhpa = createAsyncThunk(
    "fetchAllStockFromAlhpa",
    async (ticker: string, { rejectWithValue }) => {
        try {
            const now = Date.now();
            if (
                stockCache[ticker] &&
                now - stockCache[ticker].timestamp < cacheExpiryTime
            ) {
                return stockCache[ticker];
            }
            const response = await http.get({ url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&datatype=json&apikey=${alphaApiKey}` });
            const stockChartData: StockChartData[] = [];
            for (const [key, value] of Object.entries(response['Time Series (Daily)'])) {
                if (value !== null && typeof value === 'object') {
                    const time = new Date(key).getTime()
                    const open = Number((value as Record<string, string>)['1. open'])
                    const high = Number((value as Record<string, string>)['2. high'])
                    const low = Number((value as Record<string, string>)['3. low'])
                    const close = Number((value as Record<string, string>)['4. close'])
                    const volume = Number((value as Record<string, string>)['5. volume'])
                    stockChartData.push({ time, open, high, low, close, volume });
                }
            }
            stockCache[ticker] = { data: stockChartData, metaData: response['Meta Data'], timestamp: now };
            return { data: stockChartData, metaData: response['Meta Data'], timestamp: now };
        } catch (err: unknown) {
            if (err instanceof Error && 'response' in err) {
                return rejectWithValue((err as { response: { data: unknown } }).response.data);
            }
            throw err;
        }
    });

export const fetchStockQuote = createAsyncThunk(
    "fetchStockQuote",
    async (ticker: string, { rejectWithValue }) => {
        try {
            const response = await http.get({ url: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${alphaApiKey}` });
            return response;
        } catch (err: unknown) {
            if (err instanceof Error && 'response' in err) {
                return rejectWithValue((err as { response: { data: unknown } }).response.data);
            }
            throw err;
        }
    }
);


const stockSlice = createSlice({
    name: "stock",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        //Fetch a stock chart data
        builder.addCase(fetchStockFromAlhpa.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchStockFromAlhpa.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.stockChartInfo = action.payload;
                state.error = false;
            }
        );
        builder.addCase(
            fetchStockFromAlhpa.rejected,
            (state) => {
                state.loading = false;
                state.stockChartInfo = null;
                state.error = true;
            });

        //Fetch a stock quote
        builder.addCase(fetchStockQuote.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchStockQuote.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.stockQuote = action.payload;
                state.error = false;
            }
        );
        builder.addCase(
            fetchStockQuote.rejected,
            (state) => {
                state.loading = false;
                state.stockQuote = null;
                state.error = true;
            });

        //Fetch a stock tickers
        builder.addCase(fetchTickersByKeyword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchTickersByKeyword.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.tickers = action.payload;
                state.error = false;
            }
        );
        builder.addCase(
            fetchTickersByKeyword.rejected,
            (state) => {
                state.loading = false;
                state.tickers = [];
                state.error = true;
            });
    }

});

export default stockSlice.reducer;