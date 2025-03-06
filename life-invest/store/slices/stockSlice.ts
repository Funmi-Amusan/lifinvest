
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import http from '../../utils/https';
import { CachedStockChartData, InitialState } from "./types";

// const alphaApiKey = process.env.REACT_APP_ALPHA_API_KEY;
const alphaApiKey = 'XKLOC9AJUP49NL1Y';

const initialState: InitialState = {
    loading: false,
    error: false,
    message: null,
    stockChartData: [],
    stockQuote: null,
}

const stockCache: { [key: string]: CachedStockChartData } = {};
const cacheExpiryTime = 5 * 60 * 1000


export const fetchTickersByKeyword = createAsyncThunk(
    "fetchTickers",
    async (keywords: string, { rejectWithValue }) => {
        try {
            const response = await http.get({ url: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${alphaApiKey}` });
            console.log("response===========", response);
            return response;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
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
                console.log("Cache hit for ticker:", ticker);
                return stockCache[ticker];
            }
            const response = await http.get({ url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&datatype=json&apikey=${alphaApiKey}` });
            console.log("response===========", response);

            const stockChartData = [];
            for (const [key, value] of Object.entries(response.payload['Time Series (Daily)'])) {
                const time = new Date(key).getTime()
                const price = Number(value['4. close'])
                stockChartData.push({ time, price })
            }

            stockCache[ticker] = { data: response, timestamp: now };

            return response;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchStockQuote = createAsyncThunk(
    "fetchStockQuote",
    async (ticker: string, { rejectWithValue }) => {
        try {
            const response = await http.get({ url: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${alphaApiKey}` });
            console.log("response===========", response);
            return response;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
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
                state.stockChartData = action.payload;
                state.error = false;
            }
        );
        builder.addCase(
            fetchStockFromAlhpa.rejected,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.stockChartData = [];
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
            (state, action: PayloadAction<unknown>) => {
                state.loading = false;
                state.stockQuote = null;
                state.error = true;
            });
    }
});

export default stockSlice.reducer;