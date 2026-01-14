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
  title: "Modsen News",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} min-h-screen text-[var(--text)]`}
      >
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
