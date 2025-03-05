
import { configureStore } from "@reduxjs/toolkit";
import stockSlice from "./slices/stockSlice"

const store = configureStore({
    reducer: {
        stockReducer: stockSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
