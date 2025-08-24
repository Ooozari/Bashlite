import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { combineReducers } from "redux";
import userPreferencesReducer from "@/features/userPreferencesSlice";
import blogsReducer from "@/features/blogsSlice";
import productsReducer from "@/features/productsSlice";
import sessionReducer from "@/features/sessionHistorySlice";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userPreferences", "userBlogs", "userProducts", "sessionHistory"],
};

// Combine reducers
const rootReducer = combineReducers({
  userPreferences: userPreferencesReducer,
  userBlogs: blogsReducer,
  userProducts: productsReducer,
  sessionHistory: sessionReducer,
});

// SSR-safe persisted reducer
const isClient = typeof window !== "undefined";
const persistedReducer = isClient ? persistReducer(persistConfig, rootReducer) : rootReducer;

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// SSR-safe persistor
export const persistor = isClient ? persistStore(store) : null;
