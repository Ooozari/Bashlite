import { createSlice, nanoid } from "@reduxjs/toolkit";


const defaultState = {
    products: [
    ],
};

const initialState = defaultState;

// SLices
export const ProductsSlice = createSlice({
    name: "userProducts",
    initialState,
    // list of reducers
    reducers: {
        addProduct: (state, action) => {
            const product = {
                id: nanoid(),
                name: action.payload.name,
                price: action.payload.price,
                category: action.payload.category,
                imageURL: action.payload.imageURL,
            }
            state.products.push(product)
        },
        updateProduct: (state, action) => {
            const { id, name, price, category, imageURL } = action.payload;
            const product = state.products.find((product) => product.id === id);
            if (product) {
                product.name = name;
                product.price = price;
                product.category = category;
                product.imageURL = imageURL;
            }
        },

        deleteProduct: (state, action) => {
            state.products = state.products.filter((product) => (product.id !== action.payload))
        },

        clearAllProducts: (state) => {
            state.products = [];
        }
    }
})

export const {
    addProduct,
    updateProduct,
    deleteProduct,
    clearAllProducts,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;