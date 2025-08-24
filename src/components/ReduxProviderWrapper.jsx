"use client";
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "@/store";
import { useEffect } from "react";

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

// --- Loader that respects theme ---
function ThemedLoader() {
  return (
    <div className="flex items-center justify-center h-screen gap-2 text-primary transition-colors bg-primary-page-bg">
      <Loader2 className="w-6 h-6 animate-spin" />
      <span className="font-medium text-light">Loading...</span>
    </div>
  );
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
