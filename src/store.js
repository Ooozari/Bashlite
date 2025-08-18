// store.js
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { combineReducers } from "redux";
import userPreferencesReducer from "@/features/userPreferencesSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userPreferences"], // only persist this slice
};

const rootReducer = combineReducers({
  userPreferences: userPreferencesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // 👈 ignore persist actions
      },
    }),
});

export const persistor = persistStore(store);
