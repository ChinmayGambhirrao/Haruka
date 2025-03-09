import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function RootLayout({children} : {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
