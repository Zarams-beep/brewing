"use client";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import SplashScreen from "../Splash";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "@/store/store";
export default function MainLayoutSection({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // Match fill duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <ThemeProvider attribute="class">
      <SessionProvider>
        {loading ? <SplashScreen /> : children}
      </SessionProvider>
    </ThemeProvider>
    </PersistGate>
    </Provider>
  );
}
