import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haruka",
  description: "Your personal AI companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50`}>
        <Providers>
          <Toaster richColors closeButton position="top-center" />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
