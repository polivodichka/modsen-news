import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/widgets/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "Modsen News",
    template: "%s — Modsen News",
  },
  description: "Latest news from around the world",
  openGraph: {
    siteName: "Modsen News",
    type: "website",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} grid-columns-[1fr] grid min-h-screen grid-rows-[auto_1fr_auto] text-[var(--text)]`}
      >
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 py-8">{children}</main>
        <footer className="mt-auto border-t border-gray-200 py-6">
          <p className="text-center text-xs text-[var(--text-info)]">
            © {new Date().getFullYear()} Modsen News
          </p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
