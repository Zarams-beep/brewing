"use client";

import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import SplashScreen from "../Splash";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";

interface Props {
  children: React.ReactNode;
}

export default function MainLayoutSection({ children }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {loading ? <SplashScreen /> : children}
          </ThemeProvider>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
