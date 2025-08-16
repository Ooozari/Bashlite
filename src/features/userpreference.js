import { createSlice } from "@reduxjs/toolkit";

// if there is already data in local storage.
const storePreferences = JSON.parse(localStorage.getItem("userPreferences"))

// initial sate of the store (the || operator take first truly value)
const initialState = storePreferences || {
    //profile seciton
    username: 'Uzair Asif',
    email: 'abc@gmail.com',
    avatar: null,

    // theme secontion
    theme: 'light',
    colorTheme: {
        primary: "#816bff",
        secodary: "#323f9e",
        textColor: {
            heading: " #364A63",
            normal: "#283C55",
            light: "#8094AE",
            dark: "#526484",
        },
    },

    // favorites section
    favorites: {
        movies: ["Redemption"],
        books: ["The Catche"],
    },

    // sessionHistory section
    sessionHistory: [],
}

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
            localStorage.setItem('userPreferences', JSON.stringify(state));
        },
        updateTheme: (state, action) => {
            state.theme = action.payload.theme
            localStorage.setItem('userPreferences', JSON.stringify(state));
        },
        updateColorTheme: (state, action) => {
            state.theme = action.payload.theme
            localStorage.setItem('userPreferences', JSON.stringify(state));
        },

        // Favorites 
        addFavorites: (state, action) => {
            const { category, item } = action.payload;
            if (state.favorites[category]) {
                state.favorites[category].push(item)
            } else {
                state.favorites[category].push(item)
            }
            localStorage.setItem('userPreferences', JSON.stringify(state));
        },
        removeFavorites: (state, action) => {
            const { category, item } = action.payload;
            if (state.favorites[category]) {
                state.favorites[category].push(item) = state.favorites[category].filter(
                    (fav) => ( fav !== item)
                )
            } 
            localStorage.setItem('userPreferences', JSON.stringify(state));
        },
        
        setSessionHistory: (state, action) => {
            state.theme = action.payload.theme
            localStorage.setItem('userPreferences', JSON.stringify(state));
        }

    }
})