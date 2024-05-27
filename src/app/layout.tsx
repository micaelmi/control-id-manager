import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nunito } from "next/font/google";
import Header from "@/components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "@/modules/device/login";

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
          <div className="w-full h-2 bg-primary"></div>
          <main className="flex max-w-5xl mx-auto flex-col p-8 pb-4">
            <Header />
            <Login />
            {children}
            <ToastContainer autoClose={2500} />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
