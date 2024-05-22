import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nunito } from "next/font/google";
import Header from "@/components/header";

const main_font = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerenciador Control iD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={main_font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full h-20 bg-primary"></div>
          <main className="flex min-h-screen max-w-5xl mx-auto flex-col p-8">
            <Header />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
