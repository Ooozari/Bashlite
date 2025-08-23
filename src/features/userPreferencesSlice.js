import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "@/libs/storage";


const defaultState = {
    username: "Guest1234",
    email: "guest1234@gmail.com",
    avatar: null,
    theme: "light",
    colorScheme: "purple",
    favorites: {
        movies: ["The Shawshank Redemption", "Inception", "The Dark Knight", "Forrest Gump", "Interstellar"],
        books: ["The Catcher in the Rye", "To Kill a Mockingbird", "1984", "The Great Gatsby", "Pride and Prejudice"],
    },
    sessionHistory: [],
};


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
            state.theme = action.payload
        },
        updateColorScheme: (state, action) => {
            state.colorScheme = action.payload
        },

        // Favorites 
        addFavorites: (state, action) => {
            const { category, item } = action.payload;
            if (!state.favorites[category]) {
                state.favorites[category] = []; // initialize if missing
            }
            state.favorites[category].push(item)


        },
        removeFavorites: (state, action) => {
            const { category, index } = action.payload;
            if (state.favorites[category]) {
                state.favorites[category] = state.favorites[category].filter((_, i) => i !== index);
            }
        },
        removeAllFavorites: (state, action) => {
            const { category } = action.payload;
            if (state.favorites[category]) {
                state.favorites[category] = []
            }
        },


        setSessionHistory: (state, action) => {
            state.theme = action.payload
        },
        resetAllPreferences: () => defaultState,

    }
})

export const {
    updateProfile,
    updateTheme,
    updateColorScheme,
    addFavorites,
    removeFavorites,
    removeAllFavorites,
    resetAllPreferences,
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;