
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import http from '../../utils/https';

// const alphaApiKey = process.env.REACT_APP_ALPHA_API_KEY;
const alphaApiKey = '3NMNXAVYY6DFQBXJ';

type InitialState = {
    loading: boolean;
    error: boolean;
    message: string | null;
    stockDetail: any;
};

const initialState: InitialState = {
    loading: false,
    error: false,
    message: null,
    stockDetail: null,
}

export const fetchStockFromAlhpa = createAsyncThunk(
    "fetchAllStockFromAlhpa",
    async ({ ticker }: string, { rejectWithValue }) => {
        try {
            const response = await http.get({ url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&datatype=json&apikey=${alphaApiKey}` });
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

        //Fetch a stock info
        builder.addCase(fetchStockFromAlhpa.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchStockFromAlhpa.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.stockDetail = action.payload;
                state.error = false;
            }
        );
        builder.addCase(
            fetchStockFromAlhpa.rejected,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.stockDetail = undefined;
                state.error = true;
            });

    }
});

export default stockSlice.reducer;