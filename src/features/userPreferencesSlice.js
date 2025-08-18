import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "@/libs/storage";


const defaultState =  {
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
    name: "storePreferences",
    initialState,
    // list of reducers
    reducers: {
        updateProfile: (state, action) => {
            state.username = action.payload.username || state.username
            state.email = action.payload.email || state.email
            state.avatar = action.payload.avatar || state.avatar

        },
        updateTheme: (state, action) => {
            state.theme = action.payload.theme

        },
        updateColorTheme: (state, action) => {
            state.theme = action.payload.theme

        },

        // Favorites 
        addFavorites: (state, action) => {
            const { category, item } = action.payload;
            if (state.favorites[category]) {
                state.favorites[category].push(item)
            } else {
                state.favorites[category].push(item)
            }

        },
        removeFavorites: (state, action) => {
            const { category, item } = action.payload;
            if (state.favorites[category]) {
                state.favorites[category] = state.favorites[category].filter(fav => fav !== item)

            }
        },

        setSessionHistory: (state, action) => {
            state.theme = action.payload.theme
        }

    }
})

export const {
    updateProfile,
    updateTheme,
    updateColorTheme,
    addFavorite,
    removeFavorite,
    setSessionHistory,
    resetPreferences
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;