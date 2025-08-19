// store.js
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { combineReducers } from "redux";
import userPreferencesReducer from "@/features/userPreferencesSlice";
import blogsReducer from "@/features/blogsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userPreferences","userBlogs"], // only persist this slice
};

const rootReducer = combineReducers({
  userPreferences: userPreferencesReducer,
  userBlogs: blogsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
