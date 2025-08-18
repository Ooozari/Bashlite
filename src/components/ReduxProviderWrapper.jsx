"use client";

import { Loader2 } from "lucide-react"; // lucide icon
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";

export default function ReduxProviderWrapper({ children }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex items-center justify-center h-screen gap-2 text-primary">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-medium">Loading...</span>
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
