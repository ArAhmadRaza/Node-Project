import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log("Data in Fetch Products", data);
    return data;
  }
);

export const deleteProductsApiAction = createAsyncThunk(
  "products/deleteProducts",
  async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Product deleted successfully", id);
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    deleteProducts: (state, action) => {
      let id = action.payload;

      let filteredProducts = state.products.filter(
        (product) => product.id !== id
      );
      state.products = filteredProducts;
    },

    addProduct: (state, action) => {
      // const newProduct = action.payload;
      console.log("New Product added successfully", action.payload);

      state.products = [action.payload, ...state.products];

    },

    setProducts: (state, action) => {
      state.products = action.payload;
      console.log("Products in Reducer => ", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log("Action in Builder = >>>>>", action.payload);
      state.products = action.payload;
    });
    builder.addCase(deleteProductsApiAction.fulfilled, (state, action) => {
      console.log("API Action in Builder = >>>>>", action.payload);
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    });
  },
});

export const { deleteProducts, addProduct, setProducts } = productSlice.actions;

export default productSlice.reducer;
