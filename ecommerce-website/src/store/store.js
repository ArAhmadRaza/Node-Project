import {configureStore} from '@reduxjs/toolkit'
import productReducer from "./slices/productSlice"


export const store = configureStore({
    reducer:{
        productSlice: productReducer,  // Add your slice reducers here. For example, {product: productReducer}
    }
});
