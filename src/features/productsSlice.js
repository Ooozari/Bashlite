import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "@/libs/storage";

const defaultState = {
    products: [{
        id: "1",
        name: "Organic Mango Juice",
        price: "250",
        category: "Beverages",
        imageURL: null,
    }],
};

const initialState = loadFromLocalStorage("userProducts", defaultState);

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
            const { id, name, price,category,imageURL } = action.payload;
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
    }
})

export const {
    addProduct,
    updateProduct,
    deleteProduct,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;