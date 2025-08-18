import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "@/libs/storage";


const defaultState = {
    username: "Uzair Asif",
    email: "abc@gmail.com",
    avatar: null,
    theme: "light",
    colorTheme: {
        primary: "#816bff",
        primaryVariants: {
            border: "#b7a6ff",
            pageBg: "#f5f3ff",
            cardBg: "#faf9ff",
        },
    },
    favorites: {
        movies: ["Redemption"],
        books: ["The Catche"],
    },
    sessionHistory: [],
};
// ✅ hydrate directly from localStorage at startup
const initialState = loadFromLocalStorage("userPreferences", defaultState);


// SLices

export const userPreferencesSlice = createSlice({
    name: "userPreferences",
    initialState,
    // list of reducers
    reducers: {
        updateProfile: (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.avatar = action.payload.avatar

        },
        updateTheme: (state, action) => {
            state.theme = action.payload.theme

        },
        // updateColorTheme: (state, action) => {
        //     state.theme = action.payload.theme
        // },

        // Favorites 
        addFavorites: (state, action) => {
            const { category, item } = action.payload;
            if (!state.favorites[category]) {
                state.favorites[category] = []; // initialize if missing
            }
            state.favorites[category].push(item)
            

        },
        removeFavorites: (state, action) => {
            const { category, item } = action.payload;
            if (state.favorites[category]) {
                state.favorites[category] = state.favorites[category].filter(fav => fav !== item)
            }
        },
        removeAllFavorites: (state, action) => {
            const { category } = action.payload;
            if (state.favorites[category]) {
                state.favorites[category] = []
            }
        },


        // setSessionHistory: (state, action) => {
        //     state.theme = action.payload.theme
        // },

    }
})

export const {
    updateProfile,
    updateTheme,
    // updateColorTheme,
    addFavorites,
    removeFavorites,
    removeAllFavorites,
    // setSessionHistory,
    // resetPreferences
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;