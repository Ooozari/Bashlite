"use client";
import { Toaster } from "sonner";

import { PersistGate } from "redux-persist/integration/react";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "@/store";
import { useEffect } from "react";
import {ThemedLoader} from '@/components/shared'

// --- Hook to sync theme ---
function ThemeSyncer() {
  const theme = useSelector((state) => state.userPreferences.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  return null;
}



export default function ReduxProviderWrapper({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<ThemedLoader />} persistor={persistor}>
        <ThemeSyncer />
        {children}
        <Toaster />
      </PersistGate>
    </Provider>
  );
}
