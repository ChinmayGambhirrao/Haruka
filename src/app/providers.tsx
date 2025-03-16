"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children, session }: { children: React.ReactNode, session?: any }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="haruka-theme"
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
} 